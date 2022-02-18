import React from 'react'
import styles from './QueueList.module.scss'
import { useSelector } from 'react-redux'
import Song from '../ListSong/Song'

export default function QueueList({ setShowQueue, showQueue }) {
	const { render } = useSelector((state) => state.queue)

	return (
		<div className={styles.wrap}>
			<div className={styles.heading}>
				<h4>Danh sách phát</h4>
				<button onClick={() => setShowQueue(false)}>
					<ion-icon name='close-circle-outline'></ion-icon>
				</button>
			</div>
			<ul className={styles.list}>
				{render.map((song, index) => (
					<Song
						key={index}
						song={song}
						renderInQueue={true}
						showQueue={showQueue}
					/>
				))}
			</ul>
		</div>
	)
}
