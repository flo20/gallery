import React from 'react'
import Nature from '../Video/nature.mp4'

import styles from './ImageBackground.module.scss'

const ImageBackground = () => {
	return (
		<div className={styles.background}>
			<video className={styles.video} autoPlay loop muted playsInline>
				<source src={Nature} type="video/mp4" />
			</video>

			<div className={styles.back_cont} />
		</div>
	)
}

export default ImageBackground
