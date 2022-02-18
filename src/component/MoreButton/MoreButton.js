import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnchorOptions } from '../../features/status/statusSlice'
import styles from './MoreButton.module.scss'

export default function MoreButton({ options }) {
	const moreIconRef = useRef(null)
	const dispatch = useDispatch()
	// const { anchorOptions } = useSelector((state) => state.status)
	const isShowRef = useRef(false)

	const handleClick = () => {
		if (isShowRef.current) {
			dispatch(setAnchorOptions({ anchor: null, options: null }))
			isShowRef.current = false
		} else {
			const moreIcon = moreIconRef.current
			const rect = moreIcon.getBoundingClientRect()
			const payload = {
				anchor: rect,
				options: options,
			}
			isShowRef.current = true
			dispatch(setAnchorOptions(payload))
		}
	}
	return (
		<button className={styles.more} onClick={handleClick} ref={moreIconRef}>
			<ion-icon name='ellipsis-horizontal-sharp'></ion-icon>
		</button>
	)
}
