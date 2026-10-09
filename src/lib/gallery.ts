import { supabase } from './supabase'
import type { GalleryImage, NewGalleryImage } from '../types/gallery'

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