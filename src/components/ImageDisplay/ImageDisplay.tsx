import React, { useState } from 'react'
import styles from './ImageDisplay.module.scss'

type ImageDisplayProps = {
	name: string
	image: string
	tags?: string | null
}

const ImageDisplay = ({ name, image, tags }: ImageDisplayProps) => {
	const [imageError, setImageError] = useState(false)

	const tagList = (tags ?? '')
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
						src={image}
						alt={name}
						className={styles.image}
						loading="lazy"
						onError={() => setImageError(true)}
					/>
				)}
			</div>

			<div className={styles.details}>
				<h3 className={styles.name}>{name}</h3>

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
