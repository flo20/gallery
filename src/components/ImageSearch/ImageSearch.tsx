import React from 'react'
import NavBar from '../NavBar/NavBar'
import ImageBackground from '../ImageBackground/ImageBackground'

import { FiSearch } from 'react-icons/fi'

import styles from './ImageSearch.module.scss'

type ImageSearchProps = {
	handleGetRequest: React.FormEventHandler<HTMLFormElement>
}

const ImageSearch = ({ handleGetRequest }: ImageSearchProps ) => {
	return (
		<>
			<NavBar />

			<ImageBackground>
				<div className={styles.heroContent}>
					<h1 className={styles.heading}>Explore your imagination</h1>

					<p className={styles.description}>
						Browse through amazing images captured for you
					</p>

					<div className={styles.imageSearch}>
						<form
							onSubmit={handleGetRequest}
							className={styles.form}>
							<div className={styles.inputWrapper}>
								<FiSearch
									className={styles.searchIcon}
									aria-hidden="true"
								/>
								<input
									type="text"
									autoComplete="off"
									name="searchValue"
									placeholder="Search mountains, portraits, golden hour..."
								/>
							</div>
							<button
								className={styles.searchButton}
								type="submit">
								Search
							</button>
						</form>
					</div>

					<div className={styles.capture}>
						Home to millions of photo lovers,
						<br />
						Over 1.8 million+ high quality stock images shared by our talented
						community.
					</div>
				</div>
			</ImageBackground>
		</>
	)
}

export default ImageSearch
