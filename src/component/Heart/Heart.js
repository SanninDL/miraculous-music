import { Tooltip } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import {
	addPlayListToLibrary,
	addSongToLibrary,
	removePlaylistfromLibrary,
	removeSongFromLibrary,
} from '../../features/library/libraryAction'

export default function Heart({ song, album }) {
	const { user } = useSelector((state) => state.status)
	const { songs, playlists } = useSelector((state) => state.library)

	const handleHeartClick = () => {
		if (song) {
			if (!songs.find((s) => s.encodeId === song.encodeId)) {
				addSongToLibrary(song, user)
			} else {
				removeSongFromLibrary(song, user)
			}
		} else {
			if (!playlists.find((p) => p.encodeId === album.encodeId)) {
				addPlayListToLibrary(album, user)
			} else {
				removePlaylistfromLibrary(album, user)
			}
		}
	}
	return (
		<button onClick={handleHeartClick}>
			{songs?.find((s) => s.encodeId === song?.encodeId) ||
			playlists.find((p) => p.encodeId === album?.encodeId) ? (
				<Tooltip title='Xóa khỏi thư viện' placement='top'>
					<ion-icon name='heart-circle-outline'></ion-icon>
				</Tooltip>
			) : (
				<Tooltip title='Thêm vào thư viện' placement='top'>
					<ion-icon name='heart-outline'></ion-icon>
				</Tooltip>
			)}
		</button>
	)
}
