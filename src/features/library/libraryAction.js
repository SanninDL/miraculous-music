import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore'
import { toggleModal } from '../status/statusSlice'
import { db } from '../../firebase/config'
import store from '../../store/store'

export const addSongToLibrary = async (payload, user) => {
	if (user) {
		const libraryRef = doc(db, 'library', user.uid)
		await updateDoc(libraryRef, {
			songs: arrayUnion(payload),
		})
	} else {
		store.dispatch(toggleModal(true))
	}
}
export const removeSongFromLibrary = async (payload, user) => {
	if (user) {
		const libraryRef = doc(db, 'library', user.uid)

		const librarySnap = await getDoc(libraryRef)
		if (librarySnap.exists()) {
			const prev = [...librarySnap.data().songs]
			const index = prev.findIndex((song) => song.encodeId === payload.encodeId)
			prev.splice(index, 1)
			console.log(prev)
			await updateDoc(libraryRef, {
				songs: prev,
			})
		}
	} else {
		store.dispatch(toggleModal(true))
	}
}
export const addPlayListToLibrary = async (item, user, isCustom = false) => {
	if (user) {
		const libraryRef = doc(db, 'library', user.uid)

		if (isCustom) {
			await updateDoc(libraryRef, {
				customPlaylists: arrayUnion(item),
			})
		} else {
			await updateDoc(libraryRef, {
				playlists: arrayUnion(item),
			})
		}
	} else {
		store.dispatch(toggleModal(true))
	}
}
export const removePlaylistfromLibrary = async (
	item,
	user,
	isCustom = false
) => {
	const libraryRef = doc(db, 'library', user.uid)
	const libratySnap = await getDoc(libraryRef)

	if (isCustom) {
		const customPlaylistRemove = libratySnap
			.data()
			.customPlaylists.find((playlist) => playlist.encodeId === item.encodeId)

		await updateDoc(libraryRef, {
			customPlaylists: arrayRemove(customPlaylistRemove),
		})
	} else {
		const playlistRemove = libratySnap
			.data()
			.playlists.find((playlist) => playlist.encodeId === item.encodeId)

		await updateDoc(libraryRef, {
			playlists: arrayRemove(playlistRemove),
		})
	}
}
export const addSongToCustomPlaylist = async (song, playlistEncodeId, user) => {
	const libraryRef = doc(db, 'library', user.uid)

	const playlistSnap = await getDoc(libraryRef)

	if (playlistSnap.exists()) {
		const customPlaylists = playlistSnap.data().customPlaylists
		const currentPlaylistIndex = customPlaylists.findIndex(
			(playlist) => playlist.encodeId === playlistEncodeId
		)
		const isExist = customPlaylists[currentPlaylistIndex].song.items.find(
			(item) => item.encodeId === song.encodeId
		)
		if (!isExist) {
			customPlaylists[currentPlaylistIndex].song.items.push(song)
			console.log(customPlaylists)
			await updateDoc(libraryRef, {
				customPlaylists: customPlaylists,
			})
		}
	}
}
