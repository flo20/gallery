
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getGalleryImages } from '../../lib/gallery'
import type { GalleryImage } from '../../types/gallery'

import ImageDisplay from '../ImageDisplay/ImageDisplay'

import styles from './ImageFetched.module.scss'

const ImageFetched = () => {
	const [images, setImages] = useState<GalleryImage[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true

		const fetchImages = async () => {
			try {
				setLoading(true)
				setError(null)

				const results = await getGalleryImages()

				if (mounted) {
					setImages(results)
				}
			} catch (err) {
				console.error('Failed to fetch images:', err)

				if (mounted) {
					setError(
						'Unable to load your gallery. Please try again.'
					)
				}
			} finally {
				if (mounted) {
					setLoading(false)
				}
			}
		}

		fetchImages()

		return () => {
			mounted = false
		}
	}, [])

	if (loading) {
		return (
			<div className={styles.status} role="status">
				Loading your gallery...
			</div>
		)
	}

	if (error) {
		return (
			<div className={styles.status} role="alert">
				{error}
			</div>
		)
	}

	if (images.length === 0) {
		return (
			<div className={styles.emptyState}>
				<h2>Your gallery is empty</h2>

				<p>
					No images have been uploaded yet.
					Be the first to share something beautiful.
				</p>

				<Link to="/upload" className={styles.emptyButton}>
					Upload your first photo
				</Link>
			</div>
		)
	}

	return (
		<div className={styles.displayWrapper}>
			{images.map((item) => (
				<ImageDisplay
					key={item.id}
					name={item.name}
					image={item.image}
					tags={item.tags ?? ''}
				/>
			))}
		</div>
	)
}

export default ImageFetched
