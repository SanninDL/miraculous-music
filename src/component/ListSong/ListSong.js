import React from 'react'
import styles from './ListSong.module.scss'
import Song from './Song'

export default function ListSong({ album }) {
	return (
		<>
			<div className={styles.title}>Danh sách bài hát</div>
			<div className={styles.list}>
				{album.song.items.map((song, index) => (
					<Song key={index} song={song} album={album} />
				))}
			</div>
		</>
	)
}
