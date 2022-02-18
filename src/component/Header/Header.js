import { Avatar, Menu, MenuItem } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser, toggleModal } from '../../features/status/statusSlice'
import { auth } from '../../firebase/config'
import HistoryControl from '../HistoryControl/HistoryControl'
import LoginModal from '../Modal/LoginModal/LoginModal'
import styles from './Header.module.scss'

export default function Header() {
	const { user, isShowLoginModal } = useSelector((state) => state.status)
	const inputRef = useRef(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleSearch = () => {
		const value = inputRef.current.value
		console.log(encodeURI(value))
		navigate(`/tim-kiem/${encodeURI(value)}`)
	}
	const handleOpenModal = () => {
		dispatch(toggleModal(true))
	}
	const handleLogout = () => {
		setAnchorEl(null)
		signOut(auth)
			.then(() => {
				dispatch(setUser(null))
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div className={styles.wrap}>
			<HistoryControl />

			<div className={styles.search}>
				<input
					className={styles.inputControl}
					type='text'
					placeholder='Search Music Here...'
					ref={inputRef}
				/>

				<div className={styles.btn}>
					<button onClick={handleSearch}>
						<ion-icon name='search-outline'></ion-icon>
					</button>
				</div>
			</div>
			{user ? (
				<div className={styles.user}>
					<div className={styles.info}>
						<button onClick={handleClick} className={styles.avatar}>
							<Avatar src={user.photoURL} />
						</button>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}>
							<MenuItem onClick={handleClose}>
								<Link to='ca-nhan'>Cá Nhân</Link>
							</MenuItem>
							<MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
						</Menu>
					</div>
				</div>
			) : (
				<div className={styles.auth}>
					<button className='button'>Register</button>
					<button className='button' onClick={handleOpenModal}>
						Login
					</button>
					{isShowLoginModal && <LoginModal />}
				</div>
			)}
		</div>
	)
}
