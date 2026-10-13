import React, { useState } from 'react'
import type { GalleryImage } from '../../types/gallery'
import GalleryActions from '../GalleryActions/GalleryActions'

import styles from './ImageDisplay.module.scss'

type ImageDisplayProps = {
	image: GalleryImage
	canManage?: boolean
	onChanged?: () => Promise<void>
}

const ImageDisplay = ({
	image,
	canManage = false,
	onChanged,
}: ImageDisplayProps) => {
	const [imageError, setImageError] = useState(false)

	const tagList = (image.tags ?? '')
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean)

	return (
		<article className={styles.card}>
			<div className={styles.imageWrapper}>
				{imageError || !image ? (
					<div className={styles.imageFallback}>
						<span>Image unavailable</span>
					</div>
				) : (
					<img
						src={image.image}
						alt={image.name}
						className={styles.image}
						loading="lazy"
						onError={() => setImageError(true)}
					/>
				)}
				{canManage && onChanged && (
					<GalleryActions
						image={image}
						onChanged={onChanged}
					/>
				)}
			</div>

			<div className={styles.details}>
				<h3 className={styles.name}>{image.name}</h3>

				{image.caption && <p className={styles.caption}>{image.caption}</p>}

				{tagList.length > 0 && (
					<div className={styles.tags}>
						{tagList.map((tag, index) => (
							<span
								key={`${tag}-${index}`}
								className={styles.tag}>
								#{tag.replace(/^#/, '')}
							</span>
						))}
					</div>
				)}
			</div>
		</article>
	)
}

export default ImageDisplay
