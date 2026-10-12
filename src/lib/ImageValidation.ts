export const validateImageUrl = async (
	value: string,
): Promise<string | null> => {
	const imageUrl = value.trim()

	if (!imageUrl) {
		return 'Please enter an image URL.'
	}

	let parsedUrl: URL

	try {
		parsedUrl = new URL(imageUrl)
	} catch {
		return 'Please enter a valid image URL.'
	}

	if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
		return 'Please enter an HTTP or HTTPS image URL.'
	}

	const hostname = parsedUrl.hostname.toLowerCase()

	// These are photo-sharing webpages, not direct image files.
	if (
		hostname === 'unsplash.com' ||
		hostname === 'www.unsplash.com' ||
		hostname === 'share.google' ||
		hostname === 'photos.google.com'
	) {
		return 'This is a webpage link, not a direct image URL. Copy the image address instead, or download the photo and use Upload File.'
	}

	// Check whether the browser can load it as an image.
	return new Promise((resolve) => {
		const image = new Image()
		let settled = false

		const finish = (error: string | null) => {
			if (settled) return

			settled = true
			clearTimeout(timeout)
			image.onload = null
			image.onerror = null
			resolve(error)
		}

		const timeout = setTimeout(() => {
			finish('The image took too long to load. Please try another URL.')
		}, 10000)

		image.onload = () => finish(null)

		image.onerror = () => {
			finish(
				'This link does not load as an image. Please use a direct image URL or Upload File.',
			)
		}

		image.src = imageUrl
	})
}
