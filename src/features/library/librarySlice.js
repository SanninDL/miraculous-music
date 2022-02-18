import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	songs: [],
	playlists: [],
	customPlaylists: [],
}

const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {
		setLibrary: (state, action) => {
			state.songs = action.payload.songs
			state.playlists = action.payload.playlists
			state.customPlaylists = action.payload.customPlaylists
		},
	},
})
const { actions, reducer } = librarySlice
export const { setLibrary } = actions
export default reducer
