import React, { FormEvent, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'

import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import NavBar from '../NavBar/NavBar'

import styles from './Auth.module.scss'

const SignUp = () => {
	const history = useHistory()
	const { user, loading } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setError('')
		setSuccess('')

		if (password !== confirmPassword) {
			setError('Passwords do not match.')
			return
		}

		if (password.length < 8) {
			setError('Password must contain at least 8 characters.')
			return
		}

		setSubmitting(true)

		try {
			const { data, error } = await supabase.auth.signUp({
				email: email.trim(),
				password,
				options: {
					emailRedirectTo: `${window.location.origin}/signin`,
				},
			})

			if (error) throw error

			if (data.session) {
				history.replace('/upload')
				return
			}

			setSuccess(
				'Account created. Check your email to confirm your address, then sign in.',
			)
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Unable to create your account.',
			)
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) return <div role="status">Loading...</div>
	if (user) return <Redirect to="/upload" />

	return (
		<div className={styles.page}>
			<NavBar />

			<main className={styles.main}>
				<div className={styles.card}>
					<span className={styles.eyebrow}>JOIN GALLERY</span>

					<h1>Create an account</h1>

					<p className={styles.description}>
						Create your account to start sharing images.
					</p>

					<form
						onSubmit={handleSubmit}
						className={styles.form}>
						<div className={styles.field}>
							<label htmlFor="signup-email">Email address</label>
							<input
								id="signup-email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
							/>
						</div>

						<div className={styles.field}>
							<label htmlFor="signup-password">Password</label>
							<input
								id="signup-password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
								minLength={8}
								required
							/>
						</div>

						<div className={styles.field}>
							<label htmlFor="signup-confirm">Confirm password</label>
							<input
								id="signup-confirm"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								autoComplete="new-password"
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
						{success && (
							<p
								className={styles.success}
								role="status">
								{success}
							</p>
						)}

						<button
							type="submit"
							className={styles.submitButton}
							disabled={submitting}>
							{submitting ? 'Creating account...' : 'Create account'}
						</button>
					</form>

					<p className={styles.footer}>
						Already have an account? <Link to="/signin">Sign in</Link>
					</p>
				</div>
			</main>
		</div>
	)
}

export default SignUp
