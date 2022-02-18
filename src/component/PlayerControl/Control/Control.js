import { Tooltip } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { next, prev, random, repeat } from '../../../features/queue/queueSlice'
import { PlayerContext } from '../PlayerControl'
import ProgressBar from '../Progress/ProgressBar'
import Volume from '../Volume/Volume'
import styles from './Control.module.scss'

export default function Control({ duration }) {
	const { handlePlayPause, isPlay, loading } = useContext(PlayerContext)
	const dispatch = useDispatch()
	const { currentSong, isRandom, isRepeat } = useSelector(
		(state) => state.queue
	)

	const handleChangeSong = (i) => {
		if (i === -1) {
			console.log('change song')
			dispatch(prev())
		} else {
			console.log('change song')

			dispatch(next())
		}
	}
	const hanleRandom = () => {
		console.log('click')
		dispatch(random(currentSong))
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.center}>
				<div className={styles.action}>
					<Tooltip title='Phát Ngẫu Nhiên' placement='top'>
						<button
							onClick={hanleRandom}
							className={isRandom ? styles.activeControl : ''}>
							<ion-icon name='shuffle-outline'></ion-icon>
						</button>
					</Tooltip>
					<button className={styles.prev} onClick={() => handleChangeSong(-1)}>
						<ion-icon name='play-skip-back-outline'></ion-icon>
					</button>

					<button onClick={handlePlayPause} className={styles.togglePlay}>
						{!loading ? (
							<>
								{isPlay ? (
									<ion-icon name='pause-outline'></ion-icon>
								) : (
									<ion-icon name='play-outline'></ion-icon>
								)}
							</>
						) : (
							<CircularProgress size={20} sx={{ color: 'white' }} />
						)}
					</button>

					<button className={styles.next} onClick={() => handleChangeSong(1)}>
						<ion-icon name='play-skip-forward-outline'></ion-icon>
					</button>

					<Tooltip title='Phát lặp lại ' placement='top'>
						<button
							onClick={() => dispatch(repeat())}
							className={isRepeat ? styles.activeControl : ''}>
							<ion-icon name='repeat-outline'></ion-icon>
						</button>
					</Tooltip>
				</div>
				<div className={styles.progressBar}>
					<ProgressBar duration={duration} />
				</div>
			</div>
			<div className={styles.volume}>
				<Volume />
			</div>
		</div>
	)
}
