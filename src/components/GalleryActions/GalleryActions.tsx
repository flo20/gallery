import React, { FormEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import type { GalleryImage } from '../../types/gallery'
import { removeGalleryImage, updateGalleryImage } from '../../lib/gallery'

import styles from './GalleryActions.module.scss'

type Props = {
	image: GalleryImage
	onChanged: () => Promise<void>
}

type ModalType = 'edit' | 'delete' | null

const GalleryActions = ({ image, onChanged }: Props) => {
	const [modal, setModal] = useState<ModalType>(null)
	const [name, setName] = useState(image.name)
	const [caption, setCaption] = useState(image.caption ?? '')
	const [tags, setTags] = useState(image.tags ?? '')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (!modal) return

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && !loading) {
				setModal(null)
			}
		}

		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [modal, loading])

	const openEdit = () => {
		setName(image.name)
		setCaption(image.caption ?? '')
		setTags(image.tags ?? '')
		setError('')
		setModal('edit')
	}

	const openDelete = () => {
		setError('')
		setModal('delete')
	}

	const closeModal = () => {
		if (!loading) {
			setModal(null)
			setError('')
		}
	}

    const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (!name.trim()) {
				setError('Please enter a photo name.')
				return
			}

			setLoading(true)
			setError('')

			try {
				console.log('[Gallery] Starting photo update')

				await updateGalleryImage(image.id, {
					name,
					caption,
					tags,
				})

				console.log('[Gallery] Database update succeeded')

				setModal(null)

				try {
					await onChanged()
					console.log('[Gallery] Gallery refresh succeeded')
				} catch (refreshError) {
					console.error('[Gallery] Refresh failed:', refreshError)
				}
			} catch (err) {
				console.error('[Gallery] Photo update failed:', err)

				setError(
					err instanceof Error ? err.message : 'Unable to update the photo.',
				)
			} finally {
				setLoading(false)
			}
		}

	// const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault()

	// 	if (!name.trim()) {
	// 		setError('Please enter a photo name.')
	// 		return
	// 	}

	// 	setLoading(true)
	// 	setError('')

	// 	try {
	// 		await updateGalleryImage(image.id, {
	// 			name,
	// 			caption,
	// 			tags,
	// 		})

	// 		setModal(null)
	// 		await onChanged()
	// 	} catch (err) {
	// 		setError(
	// 			err instanceof Error ? err.message : 'Unable to update the photo.',
	// 		)
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }

	const handleDelete = async () => {
		setLoading(true)
		setError('')

		try {
			await removeGalleryImage(image)
			setModal(null)
			await onChanged()
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Unable to delete the photo.',
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className={styles.actions}>
				<button
					type="button"
					className={styles.iconButton}
					onClick={openEdit}
					aria-label={`Edit ${image.name}`}
					title="Edit photo">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true">
						<path d="M12 20h9" />
						<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
					</svg>
				</button>

				<button
					type="button"
					className={`${styles.iconButton} ${styles.deleteIcon}`}
					onClick={openDelete}
					aria-label={`Delete ${image.name}`}
					title="Delete photo">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true">
						<path d="M3 6h18" />
						<path d="M8 6V4h8v2" />
						<path d="M5 6l1 15h12l1-15" />
						<path d="M10 10v7M14 10v7" />
					</svg>
				</button>
			</div>

			{modal &&
				createPortal(
					<div
						className={styles.backdrop}
						onMouseDown={(event) => {
							if (event.target === event.currentTarget) {
								closeModal()
							}
						}}>
						<div
							className={styles.modal}
							role="dialog"
							aria-modal="true"
							aria-labelledby="gallery-modal-title">
							<button
								type="button"
								className={styles.closeButton}
								onClick={closeModal}
								disabled={loading}
								aria-label="Close dialog">
								×
							</button>

							{modal === 'edit' ? (
								<>
									<h2 id="gallery-modal-title">Edit photo</h2>

									<form
										onSubmit={handleEdit}
										className={styles.form}>
										<label htmlFor={`name-${image.id}`}>Name</label>
										<input
											id={`name-${image.id}`}
											type="text"
											value={name}
											onChange={(event) => setName(event.target.value)}
											required
											disabled={loading}
											autoFocus
										/>

										<label htmlFor={`caption-${image.id}`}>Caption</label>
										<textarea
											id={`caption-${image.id}`}
											value={caption}
											onChange={(event) => setCaption(event.target.value)}
											rows={3}
											disabled={loading}
										/>

										<label htmlFor={`tags-${image.id}`}>
											Tags (comma separated)
										</label>
										<input
											id={`tags-${image.id}`}
											type="text"
											value={tags}
											onChange={(event) => setTags(event.target.value)}
											placeholder="nature, travel, photography"
											disabled={loading}
										/>

										{error && (
											<p
												className={styles.error}
												role="alert">
												{error}
											</p>
										)}

										<div className={styles.footer}>
											<button
												type="button"
												className={styles.cancelButton}
												onClick={closeModal}
												disabled={loading}>
												Cancel
											</button>

											<button
												type="submit"
												className={styles.primaryButton}
												disabled={loading}>
												{loading ? 'Saving...' : 'Save changes'}
											</button>
										</div>
									</form>
								</>
							) : (
								<>
									<h2 id="gallery-modal-title">Delete this photo?</h2>

									<p className={styles.description}>
										“{image.name}” will be removed permanently.
									</p>

									{error && (
										<p
											className={styles.error}
											role="alert">
											{error}
										</p>
									)}

									<div className={styles.footer}>
										<button
											type="button"
											className={styles.cancelButton}
											onClick={closeModal}
											disabled={loading}>
											Cancel
										</button>

										<button
											type="button"
											className={styles.dangerButton}
											onClick={handleDelete}
											disabled={loading}>
											{loading ? 'Deleting...' : 'Delete'}
										</button>
									</div>
								</>
							)}
						</div>
					</div>,
					document.body,
				)}
		</>
	)
}

export default GalleryActions
