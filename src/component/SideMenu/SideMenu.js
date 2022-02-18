import styles from './SideMenu.module.scss'
import { useSelector } from 'react-redux'

import logo from '../../assets/image/mini_logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	setPendingCreate,
	toggleCreateModal,
	toggleModal,
} from '../../features/status/statusSlice'
import CreateModal from '../Modal/CreateModal/CreateModal'

export default function SideMenu({ sideMenuOpen, setSideMenuOpen }) {
	const path = useLocation().pathname
	const { isShowCreateModal } = useSelector((state) => state.status)
	const { user } = useSelector((state) => state.status)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClickCreate = () => {
		if (user) {
			dispatch(toggleCreateModal(true))
		} else {
			dispatch(setPendingCreate(true))
		}
	}
	const handleGoLibrary = () => {
		if (user) {
			navigate('/ca-nhan')
		} else {
			dispatch(toggleModal(true))
		}
	}

	return (
		<>
			<Link to='/'>
				<div className={styles.homeLink}>
					<div className={styles.logo}>
						<img src={logo} alt='' />
					</div>
					{sideMenuOpen && <h4 className={styles.title}>The Miraculous</h4>}
				</div>
			</Link>
			<div
				className={styles.toggleBtn}
				onClick={() => setSideMenuOpen(!sideMenuOpen)}>
				<button
					className={styles.icon}
					style={sideMenuOpen ? { transform: 'rotate(180deg)' } : {}}>
					<ion-icon name='chevron-forward-outline'></ion-icon>
				</button>
			</div>
			<ul className={styles.nav}>
				<li className={path === '/' ? styles.itemActive : styles.item}>
					<Link to='/'>
						<ion-icon name='home-outline'></ion-icon>
						{sideMenuOpen && <span>Khám Phá</span>}
					</Link>
				</li>
				<li
					className={path === '/ca-nhan' ? styles.itemActive : styles.item}
					onClick={handleGoLibrary}>
					<Link to={user ? '/ca-nhan' : '/'}>
						<ion-icon name='musical-notes-outline'></ion-icon>
						{sideMenuOpen && <span>Cá Nhân</span>}
					</Link>
				</li>
				<li className={path === '/chart' ? styles.itemActive : styles.item}>
					<Link to='/chart'>
						<ion-icon name='analytics-outline'></ion-icon>
						{sideMenuOpen && <span>Chart</span>}
					</Link>
				</li>
			</ul>
			<div className={styles.addPlayList}>
				<button onClick={handleClickCreate}>
					<ion-icon name='create-outline'></ion-icon>
					{sideMenuOpen && <span>Tạo Playlist Mới</span>}
				</button>
				{isShowCreateModal && <CreateModal />}
			</div>
		</>
		// </div>
	)
}
