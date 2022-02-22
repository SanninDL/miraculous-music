import { Modal } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import registerImg from '../../../assets/image/register_img.png'
import { signInWithPopup } from 'firebase/auth'
import styles from './LoginModal.module.scss'
import wrapStyles from '../WrapStyles.module.scss'
import { auth, db, provider } from '../../../firebase/config'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { toggleModal } from '../../../features/status/statusSlice'

export default function LoginModal() {
	const { isShowLoginModal } = useSelector((state) => state.status)
	const dispatch = useDispatch()

	const handleClose = () => {
		dispatch(toggleModal(false))
	}
	const handleLogin = async () => {
		const { _tokenResponse, user } = await signInWithPopup(auth, provider)
		try {
			dispatch(toggleModal(false))
			// lưu vào firestore nếu là user mới
			if (_tokenResponse.isNewUser) {
				console.log('la user moi')
				await addDoc(collection(db, 'users'), {
					uid: user.uid,
					email: user.email,
					photoURL: user.photoURL,
					displayName: user.displayName,
					providerId: user.providerData[0].providerId,
				})
				//
				const libraryRef = collection(db, 'library')

				await setDoc(doc(libraryRef, user.uid), {
					songs: [],
					playlists: [],
					customPlaylists: [],
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Modal open={isShowLoginModal} onClose={handleClose}>
				<div className={wrapStyles.content}>
					<div className={wrapStyles.left}>
						<img src={registerImg} alt='' />
					</div>
					<div className={wrapStyles.right}>
						<h4 className={styles.title}>
							Vui lòng đăng nhập để sử dụng đầy đủ các tính năng của Miraculous
							Music
						</h4>

						<button className='buttonTransparent' onClick={handleLogin}>
							<ion-icon name='logo-google'></ion-icon>
							<span>Login with Google</span>
						</button>
					</div>
				</div>
			</Modal>
		</>
	)
}
