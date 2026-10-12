import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react'

import {
	deleteGalleryFile,
	uploadGalleryFile,
	uploadGalleryImage,
} from '../../lib/gallery'
import { validateImageUrl } from '../../lib/ImageValidation'
import NavBar from '../NavBar/NavBar'

import styles from './ImageUpload.module.scss'

type UploadMode = 'file' | 'url'

type FormData = {
	name: string
	image: string
	tags: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const ImageUpload = () => {
	const [mode, setMode] = useState<UploadMode>('file')

	const [formData, setFormData] = useState<FormData>({
		name: '',
		image: '',
		tags: '',
	})

	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [filePreview, setFilePreview] = useState('')
	const [previewError, setPreviewError] = useState(false)

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [message, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const fileInputRef = useRef<HTMLInputElement>(null)

	// Create and clean up the preview URL for uploaded files.
	useEffect(() => {
		if (!selectedFile) {
			setFilePreview('')
			return
		}

		const objectUrl = URL.createObjectURL(selectedFile)
		setFilePreview(objectUrl)

		return () => {
			URL.revokeObjectURL(objectUrl)
		}
	}, [selectedFile])

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target

		setFormData((previousData) => ({
			...previousData,
			[name]: value,
		}))

		setMessage('')

		if (name === 'image') {
			setPreviewError(false)
			setErrorMessage('')
		}
	}

	// Validate selected files immediately.
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] ?? null

		setMessage('')
		setErrorMessage('')
		setPreviewError(false)
		setSelectedFile(null)

		if (!file) return

		if (!ALLOWED_TYPES.includes(file.type)) {
			setErrorMessage(
				'Unsupported file format. Please upload a JPG, PNG, or WebP image.',
			)

			event.target.value = ''
			return
		}

		if (file.size > MAX_FILE_SIZE) {
			setErrorMessage(
				'This image is too large. Please choose an image that is 5 MB or smaller.',
			)

			event.target.value = ''
			return
		}

		setSelectedFile(file)
	}

	const changeMode = (nextMode: UploadMode) => {
		if (isSubmitting) return

		setMode(nextMode)
		setMessage('')
		setErrorMessage('')
		setPreviewError(false)
	}

	const postDataHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (isSubmitting) return

		setMessage('')
		setErrorMessage('')

		if (!formData.name.trim()) {
			setErrorMessage('Please enter a name for your photo.')
			return
		}

		if (mode === 'file' && !selectedFile) {
			setErrorMessage('Please choose an image to upload.')
			return
		}

		setIsSubmitting(true)

		let uploadedPath: string | null = null

		try {
			let imageUrl = formData.image.trim()

			if (mode === 'file') {
				if (!selectedFile) {
					throw new Error('Please choose an image to upload.')
				}

				// Validate again before sending to Supabase.
				if (!ALLOWED_TYPES.includes(selectedFile.type)) {
					throw new Error(
						'Unsupported file format. Please upload a JPG, PNG, or WebP image.',
					)
				}

				if (selectedFile.size > MAX_FILE_SIZE) {
					throw new Error('This image is too large. Maximum file size is 5 MB.')
				}

				const uploaded = await uploadGalleryFile(selectedFile)

				imageUrl = uploaded.url
				uploadedPath = uploaded.path
			} else {
				// Validate external image links.
				const validationError = await validateImageUrl(imageUrl)

				if (validationError) {
					throw new Error(validationError)
				}
			}

			// Save the image URL and metadata in the gallery table.
			await uploadGalleryImage({
				name: formData.name.trim(),
				image: imageUrl,
				tags: formData.tags.trim() || null,
			})

			setMessage('Your photo has been published successfully!')

			setFormData({
				name: '',
				image: '',
				tags: '',
			})

			setSelectedFile(null)
			setPreviewError(false)

			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
		} catch (error) {
			console.error('Upload failed:', error)

			// Remove orphaned Storage files if database insert fails.
			if (uploadedPath) {
				try {
					await deleteGalleryFile(uploadedPath)
				} catch (cleanupError) {
					console.error('Unable to clean up uploaded file:', cleanupError)
				}
			}

			setErrorMessage(
				error instanceof Error
					? error.message
					: 'Unable to publish your photo. Please try again.',
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	const previewUrl = mode === 'file' ? filePreview : formData.image.trim()

	return (
		<div className={styles.page}>
			<NavBar />

			<main className={styles.main}>
				{/* Decorative images */}
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
							<h2>Add a photo</h2>
							<p>Share an image with your gallery.</p>
						</div>

						<form
							className={styles.form}
							onSubmit={postDataHandler}>
							{/* Name */}
							<div className={styles.formGroup}>
								<label htmlFor="name">
									Name <span>(required)</span>
								</label>

								<input
									id="name"
									name="name"
									type="text"
									placeholder="Morning over the valley"
									value={formData.name}
									onChange={handleChange}
									disabled={isSubmitting}
									required
								/>
							</div>

							{/* Upload method */}
							<div className={styles.formGroup}>
								<span className={styles.fieldLabel}>Image</span>

								<div
									className={styles.uploadTabs}
									role="group"
									aria-label="Choose image upload method">
									<button
										type="button"
										className={mode === 'file' ? styles.activeTab : styles.tab}
										onClick={() => changeMode('file')}
										aria-pressed={mode === 'file'}
										disabled={isSubmitting}>
										Upload file
									</button>

									<button
										type="button"
										className={mode === 'url' ? styles.activeTab : styles.tab}
										onClick={() => changeMode('url')}
										aria-pressed={mode === 'url'}
										disabled={isSubmitting}>
										Image link
									</button>
								</div>

								{/* File upload */}
								{mode === 'file' ? (
									<div className={styles.fileUpload}>
										<input
											ref={fileInputRef}
											id="image-file"
											type="file"
											accept="image/jpeg,image/png,image/webp"
											onChange={handleFileChange}
											disabled={isSubmitting}
											className={styles.fileInput}
											aria-describedby="file-hint"
										/>

										<label
											htmlFor="image-file"
											className={styles.dropZone}>
											<svg
												width="44"
												height="44"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="1.8"
												strokeLinecap="round"
												strokeLinejoin="round"
												aria-hidden="true">
												<path d="M12 16V4" />
												<path d="m7 9 5-5 5 5" />
												<path d="M20 16.5a4.5 4.5 0 0 0-2.5-8.2A6 6 0 0 0 6 9.7a4 4 0 0 0-1 7.8" />
											</svg>

											<strong>
												{selectedFile
													? selectedFile.name
													: 'Click to choose an image'}
											</strong>

											<span id="file-hint">JPG, PNG or WebP · Max 5 MB</span>
										</label>

										{/* Immediate file validation error */}
										{errorMessage && (
											<p
												className={styles.errorMessage}
												role="alert">
												{errorMessage}
											</p>
										)}
									</div>
								) : (
									/* Image URL upload */
									<div className={styles.linkField}>
										<label
											htmlFor="image"
											className={styles.visuallyHidden}>
											Direct image URL
										</label>

										<input
											id="image"
											name="image"
											type="url"
											placeholder="https://images.unsplash.com/photo-..."
											value={formData.image}
											onChange={handleChange}
											disabled={isSubmitting}
											required
										/>

										<span className={styles.hint}>
											Use a direct image URL, not a photo-sharing webpage.
										</span>
									</div>
								)}
							</div>

							{/* Image preview */}
							{previewUrl && !previewError && (
								<div className={styles.imagePreview}>
									<img
										key={previewUrl}
										src={previewUrl}
										alt="Preview"
										onError={() => setPreviewError(true)}
									/>
								</div>
							)}

							{previewError && (
								<p
									className={styles.previewWarning}
									role="alert">
									This image could not be displayed. Please try another image or
									direct link.
								</p>
							)}

							{/* Tags */}
							<div className={styles.formGroup}>
								<label htmlFor="tags">
									Tags <span>(optional)</span>
								</label>

								<input
									id="tags"
									name="tags"
									type="text"
									placeholder="travel, mountains, dawn"
									value={formData.tags}
									onChange={handleChange}
									disabled={isSubmitting}
								/>

								<span className={styles.hint}>
									Separate multiple tags with commas.
								</span>
							</div>

							{/* URL upload errors */}
							{errorMessage && mode === 'url' && (
								<p
									className={styles.errorMessage}
									role="alert">
									{errorMessage}
								</p>
							)}

							{message && (
								<p
									className={styles.successMessage}
									role="status">
									{message}
								</p>
							)}

							<button
								type="submit"
								className={styles.uploadButton}
								disabled={isSubmitting}>
								{isSubmitting ? 'Publishing...' : 'Publish photo'}
							</button>
						</form>
					</div>
				</section>
			</main>
		</div>
	)
}

export default ImageUpload
