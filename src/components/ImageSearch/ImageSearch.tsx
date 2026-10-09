import React, { FormEvent, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

import NavBar from '../NavBar/NavBar'
import ImageBackground from '../ImageBackground/ImageBackground'

import styles from './ImageSearch.module.scss'

type ImageSearchProps = {
	onSearch: (term: string) => void
	loading: boolean
}

const ImageSearch = ({ onSearch, loading }: ImageSearchProps) => {
	const [searchValue, setSearchValue] = useState('')

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSearch(searchValue.trim())
	}

	return (
		<>
			<NavBar />

			<ImageBackground>
				<div className={styles.heroContent}>
					<h1 className={styles.heading}>Explore your imagination</h1>

					<p className={styles.description}>
						Discover beautiful images shared by our community.
					</p>

					<div className={styles.imageSearch}>
						<form
							onSubmit={handleSubmit}
							className={styles.form}
							role="search">
							<div className={styles.inputWrapper}>
								<FiSearch
									className={styles.searchIcon}
									aria-hidden="true"
								/>

								<input
									type="search"
									name="searchValue"
									autoComplete="off"
									placeholder="Search by name or tags..."
									aria-label="Search gallery images"
									value={searchValue}
									onChange={(event) => setSearchValue(event.target.value)}
								/>
							</div>

							<button
								type="submit"
								className={styles.searchButton}
								disabled={loading}>
								{loading ? 'Searching...' : 'Search'}
							</button>
						</form>
					</div>

					<div className={styles.capture}>Find inspiration in every image.</div>
				</div>
			</ImageBackground>
		</>
	)
}

export default ImageSearch
