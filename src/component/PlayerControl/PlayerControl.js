import { Tooltip } from '@mui/material'
import { createContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { musicApi } from '../../api/musicApi'
import {
	next,
	pause,
	play,
	secondRender,
} from '../../features/queue/queueSlice'
import { addToast } from '../../features/status/statusSlice'
import QueueList from '../QueueList/QueueList'
import Control from './Control/Control'
import Media from './Media/Media'
import styles from './PlayerControl.module.scss'

export const PlayerContext = createContext()
export default function PlayerControl() {
	const { currentSong, isPlay, isFirstRender, isRepeat } = useSelector(
		(state) => state.queue
	)

	const dispatch = useDispatch()
	const [audio, setAudio] = useState(null)
	// const [song, setSong] = useState(null)
	const [showQueue, setShowQueue] = useState(false)
	// ====
	const [currentTime, setCurrentTime] = useState(0)
	const [loading, setLoading] = useState(true)
	const duration = currentSong?.duration

	const audioRef = useRef(null)

	useEffect(() => {
		setCurrentTime(0)
	}, [currentSong])

	useEffect(() => {
		setLoading(true)
		setCurrentTime(0)
		if (audioRef.current) {
			audioRef.current?.pause()
		}
		const getApi = async () => {
			try {
				// const song = await musicApi.getSongInfo({ id: currentSong })
				// if (song.data) {
				// 	setSong(song.data)
				// }
				const audio = await musicApi.getSong({ id: currentSong.encodeId })
				if (audio.data) {
					if (!isFirstRender) {
						dispatch(play())
					}
					setAudio(audio.data['128'])
					setLoading(false)
					if (isFirstRender) {
						dispatch(secondRender)
					}
				} else {
					dispatch(next())
					setLoading(false)
					dispatch(
						addToast({
							type: 'error',
							message:
								'Bài hát không có ở quốc gia của bạn, vui lòng chọn bài khác',
						})
					)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getApi()
		return () => {
			setCurrentTime(0)
		}
	}, [currentSong, dispatch, isFirstRender])

	useEffect(() => {
		if (audioRef.current) {
			if (isPlay) {
				audioRef.current?.play()
			} else {
				audioRef.current?.pause()
			}
		}
	}, [isPlay, audio])

	const handlePlayPause = () => {
		if (isPlay) {
			dispatch(pause())
		} else {
			dispatch(play())
		}
	}
	const handleChangeTime = (time) => {
		audioRef.current.currentTime = time
		setCurrentTime(time)
	}
	const handleChangeVolume = (volume) => {
		audioRef.current.volume = volume
	}
	const handleEnd = () => {
		console.log('end')
		if (!isRepeat) {
			dispatch(next())
		}
	}

	return (
		<PlayerContext.Provider
			value={{
				handlePlayPause,
				handleChangeTime,
				handleChangeVolume,
				currentTime,
				duration,
				isPlay,
				audio,
				currentSong,
				loading,
			}}>
			{currentSong && (
				<div className={styles.wrap}>
					<Media song={currentSong} />
					<div className={styles.control}>
						<Control duration={currentSong.duration} />
					</div>

					<div className={styles.queue}>
						<Tooltip title='Danh sách phát' placement='top'>
							<button
								className={styles.btn}
								onClick={() => setShowQueue(!showQueue)}>
								<ion-icon name='list-circle-outline'></ion-icon>
							</button>
						</Tooltip>

						<div className='queue' style={showQueue ? { right: '0' } : {}}>
							<QueueList setShowQueue={setShowQueue} showQueue={showQueue} />
						</div>
					</div>
					{audio && (
						<audio
							onTimeUpdate={() => {
								setCurrentTime(audioRef.current?.currentTime)
							}}
							// autoPlay={false}
							onEnded={handleEnd}
							ref={audioRef}
							loop={isRepeat}
							src={audio}></audio>
					)}
				</div>
			)}
		</PlayerContext.Provider>
	)
}
