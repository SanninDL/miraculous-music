import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setAnchorOptions } from '../../features/status/statusSlice'
import styles from './MoreButton.module.scss'

export default function MoreButton({ options }) {
	const moreIconRef = useRef(null)
	const dispatch = useDispatch()
	const isShowRef = useRef(false)

	const handleClick = (e) => {
		// console.log([moreIconRef.current])
		if (isShowRef.current) {
			dispatch(setAnchorOptions({ anchor: null, options: null }))
			isShowRef.current = false
		} else {
			// const moreIcon = moreIconRef.current
			const moreIcon = e.target
			console.log(e.pageX)
			console.log(e.pageY)
			const rect = {
				x: e.pageX,
				y: e.pageY,
			}
			// const rect = moreIcon.getBoundingClientRect()
			console.log(rect)
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
