import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { musicApi } from '../../api/musicApi'
import playBtn from '../../assets/svg/playBtn.svg'
import { add, addPlaylist, playInQueue } from '../../features/queue/queueSlice'
import {
	addToast,
	setPendingDownload,
	toggleAddToPlaylistModal,
} from '../../features/status/statusSlice'
import formatDuration from '../../store/formatDuration'
import Heart from '../Heart/Heart'
import MoreButton from '../MoreButton/MoreButton'
import styles from './Song.module.scss'
import { saveAs } from 'file-saver'

export default function Song({
	song,
	renderInQueue,
	album,
	showQueue,
	prefix,
}) {
	const { currentSong, isPlay } = useSelector((state) => state.queue)

	const dispatch = useDispatch()

	const songRef = useRef(null)

	useEffect(() => {
		if (currentSong?.encodeId === song.encodeId && renderInQueue) {
			if (songRef.current) {
				songRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'nearest',
				})
			}
		}
	}, [currentSong, song, showQueue, renderInQueue])

	const options = [
		{
			icon: <ion-icon name='play-outline'></ion-icon>,
			label: 'Thêm vào danh sách phát',
			onClick: () => {
				dispatch(add([song]))
			},
		},
		{
			icon: <ion-icon name='add-circle-outline'></ion-icon>,
			label: 'Thêm vào playlist',
			onClick: () => {
				dispatch(
					toggleAddToPlaylistModal({
						isOpen: true,
						song: song,
					})
				)
			},
		},
		{
			icon: <ion-icon name='download-outline'></ion-icon>,
			label: 'Tải xuống',
			onClick: () => {
				dispatch(setPendingDownload(true))
				const getAudio = async () => {
					const audio = await musicApi.getSong({ id: song.encodeId })
					if (audio.data) {
						const link = audio.data['128']
						saveAs(link, `${song.title}.mp3`)
					} else {
						dispatch(
							addToast({
								type: 'error',
								message: 'Tải thất bại, bài hát không có ở quốc gia của bạn',
							})
						)
					}
					dispatch(setPendingDownload(false))
				}
				getAudio()
			},
		},
	]

	const onAddAndPlay = () => {
		if (renderInQueue) {
			dispatch(playInQueue(song))
		} else {
			dispatch(
				addPlaylist({
					album: album.song.items,
					song: song,
					isRandom: false,
				})
			)
		}
	}

	return (
		<>
			<div
				className={
					currentSong?.encodeId === song.encodeId
						? `${styles.wrap} ${styles.itemHover}`
						: styles.wrap
				}
				ref={songRef}>
				{!renderInQueue && (
					<div className={styles.songPrefix}>
						{prefix ? (
							<div className={styles.number}>{prefix}</div>
						) : (
							<ion-icon name='musical-notes-outline'></ion-icon>
						)}
					</div>
				)}

				<div className={styles.content}>
					<div className={styles.thumbnail}>
						<img src={song.thumbnail} alt={song.title} />

						{currentSong?.encodeId === song.encodeId && isPlay ? (
							<div className={styles.playBtn}>
								<div className={styles.playingGif}></div>
							</div>
						) : (
							<div className={styles.playBtn} onClick={onAddAndPlay}>
								<button>
									<img src={playBtn} alt='' />
								</button>
							</div>
						)}
					</div>
					<div className={styles.info}>
						<h4 className={styles.title}>{song.title}</h4>
						<p className={styles.artists}>{song.artistsNames}</p>
					</div>
				</div>
				<div className={styles.control}>
					<Heart song={song} />
				</div>
				{!renderInQueue && (
					<div className={styles.end}>
						<span className={styles.time}>{formatDuration(song.duration)}</span>
						<div className={styles.more}>
							<MoreButton options={options} />
						</div>
					</div>
				)}
			</div>
		</>
	)
}
