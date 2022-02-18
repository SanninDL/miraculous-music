import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeToast } from '../../features/status/statusSlice'
import styles from './Toast.module.scss'

export default function Toast({ toast }) {
	const dispatch = useDispatch()
	const className =
		toast.type === 'error' ? styles.errorToast : styles.succesToast

	useEffect(() => {
		const timeOut = setTimeout(() => {
			dispatch(removeToast(toast.id))
		}, 5000)
		return () => {
			clearTimeout(timeOut)
		}
	}, [dispatch, toast])

	return (
		<li className={className}>
			<span className={styles.icon}>
				{toast.type === 'error' ? (
					<ion-icon name='alert-circle-outline'></ion-icon>
				) : (
					<ion-icon name='checkmark-circle-outline'></ion-icon>
				)}
			</span>
			<span className={styles.message}>{toast.message}</span>
			<button
				onClick={() => dispatch(removeToast(toast.id))}
				className={styles.closeBtn}>
				<ion-icon name='close-outline'></ion-icon>
			</button>
		</li>
	)
}
