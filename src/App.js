import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './component/Header/Header'
import AddToPlaylistModal from './component/Modal/AddToPlaylistModal/AddToPlaylistModal'
import PlayerControl from './component/PlayerControl/PlayerControl'
import Popover from './component/Popover/Popover'
import SideMenu from './component/SideMenu/SideMenu'
import Toasts from './component/Toast/Toasts'
import { setLibrary } from './features/library/librarySlice'
import {
	setIsRender,
	setPendingCreate,
	setUser,
} from './features/status/statusSlice'
import { auth, db } from './firebase/config'
import Album from './page/Album/Album'
import ChartPage from './page/ChartPage/ChartPage'
import Home from './page/Home/Home'
import Library from './page/Library/Library'
import MobilePage from './page/NotFound/MobilePage/MobilePage'
import NotFound from './page/NotFound/NotFound'
import Search from './page/Search/Search'

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
		isRender,
	} = useSelector((state) => state.status)
	// check width of window first time
	useEffect(() => {
		const w = window.innerWidth
		if (w < 992) {
			dispatch(setIsRender(false))
		} else {
			dispatch(setIsRender(true))
		}
	}, [dispatch])

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
	//  check window width
	useEffect(() => {
		const resizeListener = () => {
			const w = window.innerWidth
			if (w < 992) {
				dispatch(setIsRender(false))
			} else {
				dispatch(setIsRender(true))
			}
		}
		window.addEventListener('resize', resizeListener)
	}, [dispatch])

	return (
		<>
			{isRender ? (
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
									sideMenuOpen
										? { paddingLeft: '200px' }
										: { paddingLeft: '80px' }
								}>
								<Header />
							</div>
							{toasts.length > 0 && <Toasts />}
							<div className='main'>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='*' element={<NotFound />} />
									<Route path='/album/:encodeId' element={<Album />} />
									<Route path='/tim-kiem/:query' element={<Search />} />
									<Route path='/ca-nhan/*' element={<Library />} />
									<Route path='/chart' element={<ChartPage />} />
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
			) : (
				<MobilePage />
			)}
		</>
	)
}
