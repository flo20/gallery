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
	// 1. Validate the file type.
	const extension = ALLOWED_FILE_TYPES[file.type]

	if (!extension) {
		throw new Error(
			'Unsupported file format. Please upload a JPG, PNG, or WebP image.',
		)
	}

	// 2. Validate the file size.
	if (file.size > MAX_FILE_SIZE) {
		throw new Error('Image exceeds the maximum file size of 5 MB.')
	}

	// 3. Verify the authenticated user.
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Please sign in to upload an image.')
	}

	// 4. Generate a unique filename.
	const filename = `${crypto.randomUUID()}.${extension}`

	// Each user uploads into their own folder.
	const path = `${user.id}/${filename}`

	// 5. Upload to Supabase Storage.
	const { data, error } = await supabase.storage
		.from(STORAGE_BUCKET)
		.upload(path, file, {
			contentType: file.type,
			upsert: false,
		})

	if (error) {
		console.error('Supabase Storage upload failed:', error)
		throw new Error(error.message)
	}

	// 6. Get the public image URL.
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
		.select('id, name, image, tags, caption, user_id, created_at')
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
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Please sign in to publish an image.')
	}

	const { error } = await supabase.from('gallery').insert([
		{
			...imageData,
			user_id: user.id,
		},
	])

	if (error) {
		throw new Error(error.message)
	}
}

export type GalleryImageChanges = {
	name: string
	caption: string | null
	tags: string | null
}

export const updateGalleryImage = async (
	id: string,
	changes: GalleryImageChanges,
): Promise<void> => {
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Please sign in to edit a photo.')
	}

	const name = changes.name.trim()

	if (!name) {
		throw new Error('Photo name is required.')
	}

	const { data, error } = await supabase
		.from('gallery')
		.update({
			name,
			caption: changes.caption?.trim() || null,
			tags: changes.tags?.trim() || null,
		})
		.eq('id', id)
		.eq('user_id', user.id)
		.select('id')
		.maybeSingle()

	if (error) throw new Error(error.message)

	if (!data) {
		throw new Error('Photo not found or you do not have permission to edit it.')
	}
}

export const removeGalleryImage = async (
	image: GalleryImage,
): Promise<void> => {
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser()

	if (authError || !user) {
		throw new Error('Please sign in to delete a photo.')
	}

	// Delete the database record only if the user owns it.
	const { data, error } = await supabase
		.from('gallery')
		.delete()
		.eq('id', image.id)
		.eq('user_id', user.id)
		.select('id')
		.maybeSingle()

	if (error) throw new Error(error.message)

	if (!data) {
		throw new Error(
			'Photo not found or you do not have permission to delete it.',
		)
	}

	// External image links must never be deleted from Storage.
	// For files hosted in our public bucket, derive the object path.
	const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`

	try {
		const imageUrl = new URL(image.image)
		const expectedOrigin = new URL(process.env.REACT_APP_SUPABASE_URL!).origin

		if (
			imageUrl.origin !== expectedOrigin ||
			!imageUrl.pathname.startsWith(marker)
		) {
			return
		}

		const encodedPath = imageUrl.pathname.slice(marker.length)
		const storagePath = decodeURIComponent(encodedPath)

		// Only remove files from this user's folder.
		if (!storagePath.startsWith(`${user.id}/`)) {
			return
		}

		await deleteGalleryFile(storagePath)
	} catch (cleanupError) {
		// The gallery record has already been deleted.
		// Log Storage cleanup failures without claiming
		// the database deletion failed.
		console.error('Photo deleted, but Storage cleanup failed:', cleanupError)
	}
}
