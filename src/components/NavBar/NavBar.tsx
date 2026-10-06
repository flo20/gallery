import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
				<Link to="/" className={styles.logo}>
					GALLERY
				</Link>
			</div>

			<div
				className={
					openHamburger ? `${styles.head} ${styles.active}` : styles.head
				}>
				<div className={styles.navMenu}>
					<Link to="/explore" className={styles.links}>
						Explore
					</Link>
				</div>

				<div className={styles.navMenu}>
					<Link to="/upload" className={styles.links}>
						Upload
					</Link>
				</div>

				<div className={styles.navMenu}>
					<Link to="/myGallery" className={styles.links}>
						MyGallery
					</Link>
				</div>

				<div className={styles.navMenu}>
					<Link to="/signin">Sign In</Link>
				</div>
			</div>

			{openHamburger ? (
				<GrClose className={styles.hamburgerMenu} onClick={handleToggle} />
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
