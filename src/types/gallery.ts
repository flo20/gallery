export type GalleryImage = {
	id: string
	name: string
	image: string
	tags: string | null
	created_at: string
	caption: string | null
	user_id: string | null
}

export type NewGalleryImage = {
	name: string
	image: string
	tags: string | null
}