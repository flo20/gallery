import React, { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import type { Session, User } from '@supabase/supabase-js'

import { supabase } from '../lib/supabase'

type AuthContextType = {
	user: User | null
	loading: boolean
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let mounted = true

		const loadSession = async () => {
			const { data, error } = await supabase.auth.getSession()

			if (error) {
				console.error('Unable to load session:', error)
			}

			if (mounted) {
				setUser(data.session?.user ?? null)
				setLoading(false)
			}
		}

		loadSession()

		const { data } = supabase.auth.onAuthStateChange(
			(_event, session: Session | null) => {
				if (mounted) {
					setUser(session?.user ?? null)
					setLoading(false)
				}
			},
		)

		return () => {
			mounted = false
			data.subscription.unsubscribe()
		}
	}, [])

	const signOut = async () => {
		const { error } = await supabase.auth.signOut()

		if (error) {
			throw error
		}
	}

	return (
		<AuthContext.Provider value={{ user, loading, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}

	return context
}
