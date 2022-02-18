import { createSlice } from '@reduxjs/toolkit'
import randomList from './randomList'

const storage = JSON.parse(localStorage.getItem('music')) || {
	list: [],
	render: [],
	currentSong: null,
	isRandom: false,
	isRepeat: false,
	volume: 1,
}

const initialState = {
	...storage,
	isPlay: false,
	isFirstRender: true,
}
const queueSlice = createSlice({
	name: 'queue',
	initialState,
	reducers: {
		add: (state, action) => {
			// payload : [song, song]
			const lastSong = state.render[state.render.length - 1]
			// nếu bài hát vừa được thêm, không thêm nữa
			if (!(lastSong === action.payload[0].encodeId)) {
				state.list.push(...action.payload)
				state.render.push(...action.payload)
			}
			// neu currentSong la null
			if (!state.currentSong) {
				state.currentSong = action.payload[0]
				state.isFirstRender = false
			}
		},
		addPlaylist: (state, action) => {
			// add và play lap tuc
			// {album: , song: bai dau tien phat / null , isRandom:}
			const newRender = action.payload.isRandom
				? randomList(action.payload.album)
				: action.payload.album

			state.list = action.payload.album
			state.render = newRender
			state.currentSong = action.payload.isRandom
				? newRender[0]
				: action.payload.song
			state.isFirstRender = false
			if (action.payload.isRandom) {
				state.isRandom = true
			}
		},
		addAndPlay: (state, action) => {
			// add 1 song
			state.list.unshift(action.payload)
			state.render.unshift(action.payload)
			state.currentSong = action.payload
			state.isFirstRender = false
		},
		playInQueue: (state, action) => {
			state.currentSong = action.payload
		},
		remove: (state, action) => {
			//payload : thu tu bai hat
			state.list.splice(action.payload, 1)
			state.render.splice(action.payload, 1)
		},
		next: (state) => {
			const currentIndex = state.render.findIndex(
				(song) => song.encodeId === state.currentSong.encodeId
			)

			if (currentIndex === state.render.length - 1) {
				state.currentSong = state.render[0]
			} else {
				state.currentSong = state.render[currentIndex + 1]
			}
		},
		prev: (state) => {
			const currentIndex = state.render.findIndex(
				(id) => id === state.currentSong
			)
			if (currentIndex === 0) {
				state.currentSong = state.render[state.render.length - 1]
			} else {
				state.currentSong = state.render[currentIndex - 1]
			}
		},
		random: (state, action) => {
			// payload : encodeId
			if (!state.isRandom) {
				// neu dang khong random
				state.isRepeat = false
				state.isRandom = true
				const firstSong = state.list.findIndex(
					(song) => song.encodeId === action.payload
				)

				state.render = randomList(state.list, firstSong)
			} else {
				state.isRandom = false
				state.render = state.list
			}
		},
		repeat: (state) => {
			if (!state.isRepeat) {
				state.isRepeat = true
				state.isRandom = false
			} else {
				state.isRepeat = false
			}
		},
		play: (state) => {
			state.isPlay = true
		},
		pause: (state) => {
			state.isPlay = false
		},
		secondRender: (state) => {
			state.isFirstRender = false
		},
	},
})
const { actions, reducer } = queueSlice
export const {
	add,
	prev,
	next,
	random,
	addAndPlay,
	playInQueue,
	addPlaylist,
	play,
	pause,
	repeat,
	secondRender,
} = actions
export default reducer
