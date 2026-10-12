import React, { FormEvent, useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'

import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import NavBar from '../NavBar/NavBar'

import styles from './Auth.module.scss'

type LocationState = {
	from?: {
		pathname: string
		search?: string
	}
}

const SignIn = () => {
	const history = useHistory()
	const location = useLocation<LocationState>()
	const { user, loading } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')

	const destination = location.state?.from
		? `${location.state.from.pathname}${location.state.from.search ?? ''}`
		: '/upload'

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setSubmitting(true)
		setError('')

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password,
			})

			if (error) throw error

			history.replace(destination)
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Unable to sign in. Please try again.',
			)
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) return <div role="status">Loading...</div>
	if (user) return <Redirect to={destination} />

	return (
		<div className={styles.page}>
			<NavBar />

			<main className={styles.main}>
				<div className={styles.card}>
					<span className={styles.eyebrow}>WELCOME BACK</span>

					<h1>Sign in to Gallery</h1>

					<p className={styles.description}>
						Sign in to upload and share your favourite images.
					</p>

					<form
						onSubmit={handleSubmit}
						className={styles.form}>
						<div className={styles.field}>
							<label htmlFor="signin-email">Email address</label>
							<input
								id="signin-email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
							/>
						</div>

						<div className={styles.field}>
							<label htmlFor="signin-password">Password</label>
							<input
								id="signin-password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="current-password"
								required
							/>
						</div>

						{error && (
							<p
								className={styles.error}
								role="alert">
								{error}
							</p>
						)}

						<button
							type="submit"
							className={styles.submitButton}
							disabled={submitting}>
							{submitting ? 'Signing in...' : 'Sign in'}
						</button>
					</form>

					<p className={styles.footer}>
						Don't have an account? <Link to="/signup">Create an account</Link>
					</p>
				</div>
			</main>
		</div>
	)
}

export default SignIn
