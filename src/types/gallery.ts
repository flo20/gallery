export type GalleryImage = {
	id: string
	name: string
	image: string
	tags: string | null
	created_at: string
}

export type NewGalleryImage = {
	name: string
	image: string
	tags: string | null
}