import React from 'react'
import styles from './NoSong.module.scss'

export default function NoSong({ message }) {
	return (
		<div className={styles.noSong}>
			<div className={styles.icon}>
				<ion-icon name='musical-notes-outline'></ion-icon>
			</div>
			<span>{message}</span>
		</div>
	)
}
