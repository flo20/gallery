import React, { ReactNode } from 'react'
import Nature from '../Video/nature.mp4'

import styles from './ImageBackground.module.scss'

type ImageBackgroundProps = {
	children?: ReactNode
}

const ImageBackground = ({ children }: ImageBackgroundProps) => {
	return (
		<section className={styles.background}>
			<video
				className={styles.video}
				autoPlay
				loop
				muted
				playsInline>
				<source
					src={Nature}
					type="video/mp4"
				/>
			</video>

			<div className={styles.overlay} />

			<div className={styles.content}>{children}</div>
		</section>
	)
}

export default ImageBackground
