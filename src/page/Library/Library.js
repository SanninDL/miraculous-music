import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import styles from './Library.module.scss'
import PlaylistLibrary from './PlaylistLibrary/PlaylistLibrary'
import SongsLibrary from './SongsLibrary/SongsLibrary'

export default function Library() {
	const { user } = useSelector((state) => state.status)
	const { songs, playlists, customPlaylists } = useSelector(
		(state) => state.library
	)

	const [renderSongs, setRenderSongs] = useState(null)
	const [renderList, setRenderList] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/')
		} else {
			if (songs) {
				const clone = [...songs]

				if (clone.length <= 20) {
					setRenderSongs(clone)
				} else {
					const render = clone.splice(0, 20)
					setRenderSongs(render)
				}
			}
			if (playlists || customPlaylists) {
				const clone = [...customPlaylists, ...playlists]
				if (clone.length > 0 && clone.length <= 3) {
					setRenderList(clone)
				} else {
					const render = clone.splice(0, 3)
					setRenderList(render)
				}
			}
		}
	}, [songs, playlists, user, navigate, customPlaylists])
	const Main = () => (
		<>
			<SongsLibrary renderSongs={renderSongs} />
			<PlaylistLibrary renderList={renderList} />
		</>
	)

	return (
		<>
			{user && (
				<>
					<div className={styles.profile}>
						<div className={styles.avatar}>
							<Avatar sx={{ width: 100, height: 100 }} src={user.photoURL} />
						</div>
						<div className={styles.name}>
							<h3>{user.displayName}</h3>
						</div>
					</div>
					<Routes>
						<Route path='' element={<Main />} />
						<Route path='song' element={<SongsLibrary renderSongs={songs} />} />
						<Route
							path='playlist'
							element={
								<PlaylistLibrary
									renderList={[...customPlaylists, ...playlists]}
								/>
							}
						/>
					</Routes>
				</>
			)}
		</>
	)
}
