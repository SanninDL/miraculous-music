import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Song from '../../../component/ListSong/Song'
import { addPlaylist } from '../../../features/queue/queueSlice'
import styles from './ChartSection.module.scss'

export default function ChartSection({ list, title }) {
	const [renderList, setRenderList] = useState([...list].splice(0, 10))
	const dispatch = useDispatch()

	const handleViewAll = () => {
		setRenderList(list)
	}
	const handleClickPlay = () => {
		dispatch(
			addPlaylist({
				album: list,
				song: null,
				isRandom: true,
			})
		)
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.heading}>
				<h2 className={styles.title}>{title}</h2>

				<button className={styles.playBtn} onClick={handleClickPlay}>
					<ion-icon name='play-outline'></ion-icon>
				</button>
			</div>
			<div className={styles.list}>
				{renderList.map((song, index) => (
					<Song key={index} song={song} prefix={index + 1} />
				))}
			</div>
			{renderList.length <= 10 && (
				<div className={styles.viewAllBtn}>
					<button className='button' onClick={handleViewAll}>
						Xem tất cả
					</button>
				</div>
			)}
		</div>
	)
}
