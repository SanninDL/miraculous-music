import { configureStore } from '@reduxjs/toolkit'
import queueSlice from '../features/queue/queueSlice'
import statusSlice from '../features/status/statusSlice'
import librarySlice from '../features/library/librarySlice'

const store = configureStore({
	reducer: {
		queue: queueSlice,
		status: statusSlice,
		library: librarySlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})
export default store
