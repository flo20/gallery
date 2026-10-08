import React from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../NavBar/NavBar'
import ImageFetched from '../ImageFetched/ImageFetched'

import styles from './ResultDisplayed.module.scss'

const ResultDisplayed = () => {
	return (
		<div className={styles.page}>
			<NavBar />

			<main className={styles.main}>
				<header className={styles.header}>
					<div className={styles.titleGroup}>
						<span className={styles.eyebrow}>YOUR COLLECTION</span>

						<h1 className={styles.heading}>My Gallery</h1>

						<p className={styles.description}>
							A collection of the images you've saved and loved.
						</p>
					</div>

					<Link
						to="/upload"
						className={styles.addButton}>
						Add a photo
					</Link>
				</header>

				<section className={styles.gallery}>
					<ImageFetched />
				</section>
			</main>
		</div>
	)
}

export default ResultDisplayed
