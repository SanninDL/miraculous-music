import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToast } from '../../features/status/statusSlice'
import Toast from './Toast'
import styles from './Toast.module.scss'

export default function Toasts() {
	const { toasts } = useSelector((state) => state.status)
	const dispatch = useDispatch()

	const handleAdd = (toast) => {
		dispatch(addToast(toast))
	}
	return (
		<div>
			<button
				onClick={() =>
					handleAdd({ type: 'succes', message: 'Them bai hat thanh cong' })
				}>
				add Toast 1
			</button>
			<button
				onClick={() =>
					handleAdd({ type: 'error', message: 'Them bai hat that bai' })
				}>
				add Toast 2
			</button>
			<div className={styles.wrap}>
				<ul>
					{toasts.map((toast, index) => (
						<Toast toast={toast} key={index} />
					))}
				</ul>
			</div>
		</div>
	)
}
