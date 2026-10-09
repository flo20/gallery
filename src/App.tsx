import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ImageSearch from './components/ImageSearch/ImageSearch'
import ImageDisplay from './components/ImageDisplay/ImageDisplay'

import { getGalleryImages, galleryHasUploads } from './lib/gallery'
import type { GalleryImage } from './types/gallery'

import styles from './App.module.scss'

const App = () => {
	const [images, setImages] = useState<GalleryImage[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const [hasUploads, setHasUploads] = useState(false)

	const fetchImages = useCallback(async (term: string) => {
		setLoading(true)
		setError(null)

		try {
			const [results, latestImage] = await Promise.all([
				getGalleryImages(term),
				galleryHasUploads(),
			])

			setImages(results)
			setHasUploads(latestImage)
		} catch (err) {
			console.error('Gallery request failed:', err)
			setError('Unable to load images. Please try again.')
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchImages('')
	}, [fetchImages])

	const handleSearch = (term: string) => {
		setSearchTerm(term)
		fetchImages(term)
	}

	return (
		<div className={styles.page}>
			<ImageSearch
				onSearch={handleSearch}
				loading={loading}
			/>

			<main className={styles.main}>
				<header className={styles.sectionHeader}>
					<div>
						<span className={styles.eyebrow}>
							DISCOVER & EXPLORE
						</span>

						<h2 className={styles.heading}>
							{searchTerm
								? `Results for "${searchTerm}"`
								: 'Explore photos'}
						</h2>

						<p className={styles.description}>
							{searchTerm
								? 'Images matching your search'
								: 'Discover the latest images from our gallery.'}
						</p>
					</div>

					{searchTerm && (
						<button
							type="button"
							className={styles.clearButton}
							onClick={() => handleSearch('')}
						>
							Clear search
						</button>
					)}
				</header>

				{loading ? (
					<div className={styles.status} role="status">
						Loading images...
					</div>
				) : error ? (
					<div className={styles.emptyState} role="alert">
						<h3>Something went wrong</h3>
						<p>{error}</p>

						<button
							className={styles.actionButton}
							onClick={() => fetchImages(searchTerm)}
						>
							Try again
						</button>
					</div>
				) : !hasUploads ? (
					<div className={styles.emptyState}>
						<h3>No photos yet</h3>
						<p>
							Our gallery is waiting for its first image.
							Be the first to share something inspiring.
						</p>

						<Link
							to="/upload"
							className={styles.actionButton}
						>
							Upload your first photo
						</Link>
					</div>
				) : images.length === 0 ? (
					<div className={styles.emptyState}>
						<h3>No images found</h3>
						<p>
							We couldn't find any images matching
							"{searchTerm}". Try another keyword.
						</p>

						<button
							className={styles.actionButton}
							onClick={() => handleSearch('')}
						>
							View all photos
						</button>
					</div>
				) : (
					<div className={styles.imageGrid}>
						{images.map((image) => (
							<ImageDisplay
								key={image.id}
								name={image.name}
								image={image.image}
								tags={image.tags ?? ''}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	)
}

export default App