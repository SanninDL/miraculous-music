import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Song from '../../../component/ListSong/Song'
import NoSong from '../../../component/NoSong/NoSong'
import { addPlaylist } from '../../../features/queue/queueSlice'
import styles from './SongsLibrary.module.scss'

export default function SongsLibrary({ renderSongs }) {
	const dispatch = useDispatch()
	const navigation = useNavigate()
	const { songs } = useSelector((state) => state.library)

	const handlePlayAll = () => {
		dispatch(
			addPlaylist({
				album: songs,
				song: songs[0],
				isRandom: false,
			})
		)
	}

	return (
		<div className={styles.section}>
			<div className={styles.heading}>
				<h3 className={styles.title}>Bài hát</h3>
				<div className={styles.control}>
					{renderSongs && renderSongs.length < songs.length && (
						<button
							className={styles.showAll}
							onClick={() => navigation('/ca-nhan/song')}>
							<span>Tất cả</span>
							<ion-icon name='chevron-forward-outline'></ion-icon>
						</button>
					)}
					<button className='buttonSmall' onClick={handlePlayAll}>
						<ion-icon name='play-outline'></ion-icon>
						<span>Phát tất cả</span>
					</button>
				</div>
			</div>
			<div className={styles.songContent}>
				{renderSongs && renderSongs.length > 0 ? (
					<div className={styles.list}>
						{renderSongs.map((song, index) => (
							<Song song={song} key={index} />
						))}
					</div>
				) : (
					<NoSong message='Chưa có bài hát trong thư viện của bạn' />
				)}
			</div>
		</div>
	)
}
