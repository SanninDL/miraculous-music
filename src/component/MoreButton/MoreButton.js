import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setAnchorOptions } from '../../features/status/statusSlice'
import styles from './MoreButton.module.scss'

export default function MoreButton({ options }) {
	const moreIconRef = useRef(null)
	const dispatch = useDispatch()

	const handleClick = (e) => {
		const rect = {
			x: e.pageX,
			y: e.pageY,
		}
		const payload = {
			anchor: rect,
			options: options,
		}

		dispatch(setAnchorOptions(payload))
	}
	return (
		<button className={styles.more} onClick={handleClick} ref={moreIconRef}>
			<ion-icon name='ellipsis-horizontal-sharp'></ion-icon>
		</button>
	)
}
