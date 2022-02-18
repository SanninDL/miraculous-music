import React from 'react'
import styles from './Spinner.module.scss'

export default function Spinner() {
	return (
		<div className={styles.wrap}>
			<div className={styles.spinner}>
				<div className={styles.r1}></div>
				<div className={styles.r2}></div>
				<div className={styles.r3}></div>
				<div className={styles.r4}></div>
				<div className={styles.r5}></div>
			</div>
			<div className={styles.text}>Loading ...</div>
		</div>
	)
}
