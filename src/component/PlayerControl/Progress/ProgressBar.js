import { Slider } from '@mui/material'
import React, { useContext, useState } from 'react'
import formatDuration from '../../../store/formatDuration'
import { PlayerContext } from '../PlayerControl'
import styles from './ProgressBar.module.scss'

export default function ProgressBar() {
	const { handleChangeTime, currentTime, duration } = useContext(PlayerContext)
	const [position, setPosition] = useState(0)

	return (
		<div className={styles.progressWrap}>
			<div className={styles.start}>{formatDuration(currentTime)}</div>
			<div className={styles.progress}>
				<Slider
					defaultValue={0}
					aria-label='time-indicator'
					value={position || currentTime}
					min={0}
					max={duration}
					step={1}
					onChange={(_, value) => setPosition(value)}
					onChangeCommitted={(_, value) => {
						handleChangeTime(value)
						setPosition(null)
					}}
					sx={{
						color: '#1ed760',
						padding: '8px 0 !important',
						'& .MuiSlider-thumb': {
							backgroundColor: 'white',
							width: '8px',
							height: '8px',
							transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
						},
					}}
				/>
			</div>
			<div className={styles.end}>{formatDuration(duration)}</div>
		</div>
	)
}
