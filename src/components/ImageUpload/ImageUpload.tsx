import React, { ChangeEvent, FormEvent, useState } from 'react'
import results from '../../axios-gallery'
import NavBar from '../NavBar/NavBar'

import styles from './ImageUpload.module.scss'

type FormData = {
	name: string
	image: string
	tags: string
}

const ImageUpload = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		image: '',
		tags: '',
	})

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target

		setFormData((previousData) => ({
			...previousData,
			[name]: value,
		}))
	}

	const postDataHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			await results.post('./gallery.json', formData)

			window.alert('Your image has been saved in My Gallery.')

			setFormData({
				name: '',
				image: '',
				tags: '',
			})
		} catch (error) {
			console.error('Unable to upload image:', error)
			window.alert('We could not save your image. Please try again.')
		}
	}

	return (
		<div className={styles.page}>
			<NavBar />

			<main className={styles.main}>
				{/* Keep original decorative SVG/image design */}
				<img
					src="/mail.png"
					alt=""
					className={styles.mailLeft}
					aria-hidden="true"
				/>

				<img
					src="/mail.png"
					alt=""
					className={styles.mailRight}
					aria-hidden="true"
				/>

				<img
					src="/swirl .png"
					alt=""
					className={styles.swirlLeft}
					aria-hidden="true"
				/>

				<img
					src="/swirl .png"
					alt=""
					className={styles.swirlRight}
					aria-hidden="true"
				/>

				<section className={styles.content}>
					<div className={styles.intro}>
						<span className={styles.eyebrow}>BUILD YOUR COLLECTION</span>

						<h1 className={styles.heading}>
							Create a personalized
							<span> image library.</span>
						</h1>

						<p className={styles.description}>
							Save the images that inspire you and build a collection that feels
							uniquely yours.
						</p>

						<blockquote className={styles.quote}>
							“Photography is a way of feeling, of touching, of loving. What you
							have caught on film is captured forever… It remembers little
							things, long after you have forgotten everything.”
							<cite>— Aaron Siskind</cite>
						</blockquote>
					</div>

					<div className={styles.uploadCard}>
						<div className={styles.cardHeader}>
							<h2>Add to your gallery</h2>
							<p>Enter the details of an image you want to save.</p>
						</div>

						<form
							onSubmit={postDataHandler}
							className={styles.form}>
							<div className={styles.formGroup}>
								<label htmlFor="name">Name</label>

								<input
									id="name"
									name="name"
									type="text"
									placeholder="e.g. Mountain sunset"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="image">Image link</label>

								<input
									id="image"
									name="image"
									type="url"
									placeholder="https://example.com/image.jpg"
									value={formData.image}
									onChange={handleChange}
									required
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor="tags">Tags</label>

								<input
									id="tags"
									name="tags"
									type="text"
									placeholder="nature, mountains, sunset"
									value={formData.tags}
									onChange={handleChange}
								/>

								<span className={styles.hint}>
									Separate multiple tags with commas.
								</span>
							</div>

							<button
								type="submit"
								className={styles.uploadButton}>
								Upload image
							</button>
						</form>
					</div>
				</section>
			</main>
		</div>
	)
}

export default ImageUpload
