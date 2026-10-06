import React from 'react'
import ImageFetched from '../ImageFetched/ImageFetched'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

import './ResultDisplayed.css'

const ResultDisplayed = () => {
	return (
		<div>
			<NavBar />
			<div className="backs">
				<Link
					to="/"
					style={{
						textDecoration: 'none',
						border: 'none',
						fontFamily: 'Raleway',
						color: 'rgb(252, 127, 105)',
					}}>
					Back to upload
				</Link>
			</div>
			<h1 id="heads">
				Compile your images for later... <br />
			</h1>
			<ImageFetched />
		</div>
	)
}

export default ResultDisplayed
