import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { musicApi } from '../../api/musicApi'
import Song from '../../component/ListSong/Song'
import PlayList from '../Home/PlayList/PlayList'
import styles from './Search.module.scss'

export default function Search() {
	const { query } = useParams()
	const [songs, setSongs] = useState(null)
	const [playlist, setPlaylist] = useState(null)

	useEffect(() => {
		const getApi = async () => {
			try {
				const params = {
					keyword: query,
				}
				const res = await musicApi.getSearch(params)
				console.log(res.data)
				setSongs(res.data.songs)
				setPlaylist(res.data.playlists)
			} catch (error) {}
		}
		getApi()
	}, [query])

	return (
		<div>
			<p className={styles.label}>
				Top kết quả <span>"{query}"</span>
			</p>
			<div className={styles.result}>
				{songs && (
					<div className={styles.songList}>
						<h3 className={styles.title}>Bài hát</h3>
						<div className={styles.list}>
							{songs.map((song, index) => (
								<Song song={song} key={index} />
							))}
						</div>
					</div>
				)}
				{playlist && (
					<div className={styles.playlist}>
						<PlayList list={playlist} />
					</div>
				)}
			</div>
		</div>
	)
}
