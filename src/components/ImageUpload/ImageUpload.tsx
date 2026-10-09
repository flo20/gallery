import React, { ChangeEvent, FormEvent, useState } from 'react'
import results from '../../axios-gallery'
import NavBar from '../NavBar/NavBar'

import { uploadGalleryImage } from '../../lib/gallery'

import styles from './ImageUpload.module.scss'

type FormData = {
	name: string
	image: string
	tags: string
}

const ImageUpload = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
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

	const postDataHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (isSubmitting) return

		setIsSubmitting(true)
		setMessage('')
		setErrorMessage('')

		try {
			await uploadGalleryImage({
				name: formData.name.trim(),
				image: formData.image.trim(),
				tags: formData.tags.trim() || null,
			})

			setMessage('Your image has been uploaded successfully!')

			setFormData({
				name: '',
				image: '',
				tags: '',
			})
		} catch (error) {
			console.error('Upload failed:', error)

			setErrorMessage(
				error instanceof Error
					? error.message
					: 'Unable to upload image. Please try again.',
			)
		} finally {
			setIsSubmitting(false)
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
								disabled={isSubmitting}
								className={styles.uploadButton}>
								{isSubmitting ? 'Uploading...' : 'Upload image'}
							</button>
							{message && <p role="status">{message}</p>}
							{errorMessage && <p role="alert">{errorMessage}</p>}
						</form>
					</div>
				</section>
			</main>
		</div>
	)
}

export default ImageUpload
