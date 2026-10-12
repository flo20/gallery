import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

type ProtectedRouteProps = RouteProps & {
	component: React.ComponentType<any>
}

const ProtectedRoute = ({
	component: Component,
	...rest
}: ProtectedRouteProps) => {
	const { user, loading } = useAuth()

	return (
		<Route
			{...rest}
			render={(props) => {
				if (loading) {
					return <div role="status">Checking your session...</div>
				}

				if (!user) {
					return (
						<Redirect
							to={{
								pathname: '/signin',
								state: {
									from: props.location,
								},
							}}
						/>
					)
				}

				return <Component {...props} />
			}}
		/>
	)
}

export default ProtectedRoute
