import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './component/Header/Header'
import SideMenu from './component/SideMenu/SideMenu'
import { setLibrary } from './features/library/librarySlice'
import { setPendingCreate, setUser } from './features/status/statusSlice'
import { auth, db } from './firebase/config'
import Album from './page/Album/Album'
import Home from './page/Home/Home'
import Library from './page/Library/Library'
import Search from './page/Search/Search'
import PlayerControl from './component/PlayerControl/PlayerControl'
import NotMatch from './page/NotMatch/NotMatch'
import AddToPlaylistModal from './component/Modal/AddToPlaylistModal/AddToPlaylistModal'
import ChartPage from './page/ChartPage/ChartPage'
import Spinner from './component/Spinner/Spinner'
import Toasts from './component/Toast/Toasts'
import axios from 'axios'
import Popover from './component/Popover/Popover'
import { useRef } from 'react'

export default function App() {
	const dispatch = useDispatch()
	const sectionRef = useRef()
	const [sideMenuOpen, setSideMenuOpen] = useState(true)
	const { render, list, isRepeat, isRandom, currentSong } = useSelector(
		(state) => state.queue
	)
	const {
		user,
		isPendingCreate,
		isShowAddToPlaylistModal,
		toasts,
		anchorOptions,
	} = useSelector((state) => state.status)

	useEffect(() => {
		const value = {
			render,
			list,
			isRepeat,
			isRandom,
			currentSong,
		}

		localStorage.setItem('music', JSON.stringify(value))
	}, [render, list, isRepeat, isRandom, currentSong])

	useEffect(() => {
		onAuthStateChanged(auth, (currentuser) => {
			if (currentuser) {
				const payload = {
					uid: currentuser.uid,
					email: currentuser.email,
					photoURL: currentuser.photoURL,
					displayName: currentuser.displayName,
					providerId: currentuser.providerData[0].providerId,
				}
				dispatch(setUser(payload))
			} else {
				// User is signed out
				console.log('User is signed out')
				// ...
			}
		})
	}, [dispatch])

	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, 'library', user.uid), (doc) => {
				dispatch(setLibrary(doc.data()))
			})
			if (isPendingCreate) {
				dispatch(setPendingCreate(false))
			}
			return () => {
				unsub()
			}
		}
	}, [user, dispatch, isPendingCreate])

	return (
		<div className='app'>
			{anchorOptions.options && <Popover ref={sectionRef} />}
			<div className='section'>
				<div
					className={currentSong ? 'side-menu' : 'side-menu--full'}
					style={sideMenuOpen ? { width: '200px' } : { width: '80px' }}>
					<SideMenu
						setSideMenuOpen={setSideMenuOpen}
						sideMenuOpen={sideMenuOpen}
					/>
				</div>
				<div
					ref={sectionRef}
					className='content'
					style={
						sideMenuOpen ? { marginLeft: '200px' } : { marginLeft: '80px' }
					}>
					<div
						className='header'
						style={
							sideMenuOpen ? { paddingLeft: '200px' } : { paddingLeft: '80px' }
						}>
						<Header />
					</div>
					{toasts.length > 0 && <Toasts />}
					<div className='main'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/album/:encodeId' element={<Album />} />
							<Route path='/tim-kiem/:query' element={<Search />} />
							<Route path='/ca-nhan/*' element={<Library />} />
							<Route path='/chart' element={<ChartPage />} />
							{/* <Route path='/no' element={<Toasts />} /> */}
						</Routes>
					</div>
				</div>
			</div>
			{currentSong && (
				<div className='player'>
					<PlayerControl />
				</div>
			)}

			{isShowAddToPlaylistModal && <AddToPlaylistModal />}
		</div>
	)
}
