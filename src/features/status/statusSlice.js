import { createSlice } from '@reduxjs/toolkit'
import createToast from './createToast'

const initialState = {
	isShowLoginModal: false,
	isShowCreateModal: false,
	isShowAddToPlaylistModal: false,
	songNeedAdd: null,
	isPendingCreate: false,
	user: null,
	toasts: [],
	anchorOptions: { anchor: null, options: null },
	isRender: window.innerWidth < 992 ? false : true,
}
const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		toggleModal: (state, action) => {
			state.isShowLoginModal = action.payload
		},
		toggleCreateModal: (state, action) => {
			state.isShowCreateModal = action.payload
		},
		toggleAddToPlaylistModal: (state, action) => {
			// isOpen : , song:
			if (action.payload.isOpen) {
				state.isShowAddToPlaylistModal = true
				state.songNeedAdd = action.payload.song
			} else {
				state.isShowAddToPlaylistModal = false
				state.songNeedAdd = null
			}
		},
		setUser: (state, action) => {
			state.user = action.payload
		},
		setPendingCreate: (state, action) => {
			if (action.payload) {
				state.isPendingCreate = true
				state.isShowLoginModal = true
			} else {
				state.isPendingCreate = false
				state.isShowCreateModal = true
			}
		},
		setAnchorOptions: (state, action) => {
			state.anchorOptions = action.payload
		},
		addToast: (state, action) => {
			// payload : {type: ..., message: ....}
			const toast = createToast(action.payload)
			state.toasts.push(toast)
		},
		removeToast: (state, action) => {
			//payload : id
			state.toasts = state.toasts.filter(
				(toast) => !(toast.id === action.payload)
			)
		},
		setIsRender: (state, action) => {
			state.isRender = action.payload
		},
	},
})

const { actions, reducer } = statusSlice
export const {
	toggleModal,
	setUser,
	toggleCreateModal,
	setPendingCreate,
	toggleAddToPlaylistModal,
	setAnchorOptions,
	addToast,
	removeToast,
	setIsRender,
} = actions
export default reducer
