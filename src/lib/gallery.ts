import { supabase } from './supabase'
import type { GalleryImage, NewGalleryImage } from '../types/gallery'

const STORAGE_BUCKET = 'gallery-images'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

const ALLOWED_FILE_TYPES: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
}

// Upload an image file to Supabase Storage.
export const uploadGalleryFile = async (
	file: File,
): Promise<{ url: string; path: string }> => {
	// 1. Validate MIME type.
	const extension = ALLOWED_FILE_TYPES[file.type]

	if (!extension) {
		throw new Error(
			'Unsupported file format. Please upload a JPG, PNG, or WebP image.',
		)
	}

	// 2. Validate file size.
	if (file.size > MAX_FILE_SIZE) {
		throw new Error('Image exceeds the maximum file size of 5 MB.')
	}

	// 3. Verify that the user is authenticated.
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Please sign in to upload an image.')
	}

	// 4. Generate a unique filename in the user's folder.
	const filename = `${Date.now()}-${Math.random()
		.toString(36)
		.slice(2)}.${extension}`

	const path = `${user.id}/${filename}`

	// 5. Upload the file to Supabase Storage.
	const { data, error } = await supabase.storage

		.from(STORAGE_BUCKET)
		.upload(path, file, {
			contentType: file.type,
			upsert: false,
		})

	if (error) {
		throw new Error(error.message)
	}

	// 6. Retrieve the public URL.
	const { data: publicUrlData } = supabase.storage
		.from(STORAGE_BUCKET)
		.getPublicUrl(data.path)

	return {
		url: publicUrlData.publicUrl,
		path: data.path,
	}
}

// Delete a previously uploaded file from Supabase Storage.
export const deleteGalleryFile = async (path: string): Promise<void> => {
	const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path])

	if (error) {
		throw new Error(error.message)
	}
}

export const getGalleryImages = async (
	searchTerm = '',
): Promise<GalleryImage[]> => {
	const term = searchTerm.trim()

	let query = supabase
		.from('gallery')
		.select('id, name, image, tags, created_at')
		.order('created_at', { ascending: false })

	if (term) {
		// Search name and tags without case sensitivity.
		// Escape characters that would interfere with the filter.
		const safeTerm = term.replace(/[%_,().\\]/g, ' ').trim()

		if (!safeTerm) {
			return []
		}

		query = query.or(`name.ilike.%${safeTerm}%,tags.ilike.%${safeTerm}%`)
	}

	const { data, error } = await query

	if (error) {
		throw new Error(error.message)
	}

	return (data ?? []) as GalleryImage[]
}

export const galleryHasUploads = async (): Promise<boolean> => {
	const { count, error } = await supabase
		.from('gallery')
		.select('id', { count: 'exact', head: true })

	if (error) throw error

	return (count ?? 0) > 0
}

export const uploadGalleryImage = async (
	imageData: NewGalleryImage,
): Promise<void> => {
	const { error } = await supabase.from('gallery').insert([imageData])

	if (error) {
		throw new Error(error.message)
	}
}
