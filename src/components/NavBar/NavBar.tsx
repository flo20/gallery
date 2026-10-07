import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'

import styles from './NavBar.module.scss'

const NavBar = () => {
	const [openHamburger, setOpenHamburger] = useState<boolean>(false)

	const handleToggle = (): void => {
		setOpenHamburger((prev) => !prev)
	}

	return (
		<div className={styles.wrap}>
			<div>
				<Link
					to="/"
					className={styles.logo}>
					GALLERY
				</Link>
			</div>

			<div
				className={
					openHamburger ? `${styles.head} ${styles.active}` : styles.head
				}>
				<div className={styles.navMenu}>
					<NavLink
						exact
						to="/"
						className={styles.links}
						activeClassName={styles.activeLink}>
						Explore
					</NavLink>
				</div>

				<div className={styles.navMenu}>
					<NavLink
						to="/upload"
						className={styles.links}
						activeClassName={styles.activeLink}>
						Upload
					</NavLink>
				</div>

				<div className={styles.navMenu}>
					<NavLink
						to="/myGallery"
						className={styles.links}
						activeClassName={styles.activeLink}>
						MyGallery
					</NavLink>
				</div>

				<NavLink
					to="/signin"
					className={styles.signIn}>
					Sign In
				</NavLink>
			</div>

			{openHamburger ? (
				<GrClose
					className={styles.hamburgerMenu}
					onClick={handleToggle}
				/>
			) : (
				<GiHamburgerMenu
					className={styles.hamburgerMenu}
					onClick={handleToggle}
				/>
			)}
		</div>
	)
}

export default NavBar
