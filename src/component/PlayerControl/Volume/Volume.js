import { Slider } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { PlayerContext } from '../PlayerControl'
import styles from './Volume.module.scss'

export default function Volume() {
	const [position, setPosition] = useState(1)
	const { handleChangeVolume } = useContext(PlayerContext)
	const [showVolume, setShowVolume] = useState(false)
	const prevVolumeRef = useRef(1)
	const wrapRef = useRef(null)

	document.onclick = (event) => {
		if (!wrapRef.current.contains(event.target)) {
			setShowVolume(false)
		}
	}

	const onChangeVolume = (value) => {
		handleChangeVolume(value)
		setPosition(value)
	}
	const handleClickVolume = () => {
		if (!showVolume) {
			setShowVolume(true)
		} else {
			if (position === 0) {
				onChangeVolume(prevVolumeRef.current)
			} else {
				prevVolumeRef.current = position
				onChangeVolume(0)
			}
		}
	}

	return (
		<div className={styles.wrap} ref={wrapRef}>
			<div className={styles.icon}>
				<button onClick={handleClickVolume}>
					{position === 0 ? (
						<ion-icon name='volume-mute-outline'></ion-icon>
					) : (
						<ion-icon name='volume-high-outline'></ion-icon>
					)}
				</button>
			</div>
			{showVolume && (
				<div className={styles.bar}>
					<Slider
						aria-label='Volume'
						defaultValue={1}
						value={position}
						min={0}
						max={1}
						step={0.1}
						onChange={(_, value) => onChangeVolume(value)}
						sx={{
							color: '#1ed760',
							// backgroundColor: '#aebed3',
							padding: ' 0 !important',
							boxSizing: 'content-box !important',
							'& .MuiSlider-thumb': {
								backgroundColor: 'white',
								width: '8px',
								height: '8px',
								transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
							},
						}}
					/>
				</div>
			)}
		</div>
	)
}
