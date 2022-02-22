import React, { forwardRef, useEffect, useRef } from 'react'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAnchorOptions } from '../../features/status/statusSlice'
import styles from './Popover.module.scss'

function Popover(props, ref) {
	const { anchorOptions } = useSelector((state) => state.status)
	const { anchor, options } = anchorOptions
	const dispatch = useDispatch()
	const popoverRef = useRef(null)

	const windowHeight = window.innerHeight

	const position = {
		top: windowHeight - anchor.y < 100 ? 'unset' : `${anchor.y}px`,
		left: `${anchor.x}px`,
		bottom:
			windowHeight - anchor.y < 100 ? `${windowHeight - anchor.y}px` : 'unset',
	}

	const handleClose = useCallback(() => {
		dispatch(
			setAnchorOptions({
				anchor: null,
				options: null,
			})
		)
	}, [dispatch])
	const handleClickOption = (callback) => {
		handleClose()
		callback()
	}
	useEffect(() => {
		const handleClickOut = (e) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target)) {
				handleClose()
			}
		}
		window.addEventListener('mousedown', handleClickOut, true)
		window.addEventListener('resize', handleClose)
		ref.current.addEventListener('wheel', handleClose)
		const currentRef = ref.current

		return () => {
			window.removeEventListener('mousedown', handleClickOut, true)
			window.removeEventListener('resize', handleClose)

			currentRef.removeEventListener('wheel', handleClose)
		}
	}, [dispatch, ref, handleClose])

	return ReactDOM.createPortal(
		<div style={position} className={styles.wrap} ref={popoverRef}>
			<ul className={styles.options}>
				{options &&
					options.map((option, index) => (
						<li
							key={index}
							onClick={() => handleClickOption(option.onClick)}
							className={styles.option}>
							{option.icon}
							<span>{option.label}</span>
						</li>
					))}
			</ul>
		</div>,
		document.querySelector('body')
	)
}
export default forwardRef(Popover)
