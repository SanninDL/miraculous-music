import { Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import playlistIcon from '../../../assets/svg/playlist.svg'
import { addPlayListToLibrary } from '../../../constant'
import { toggleCreateModal } from '../../../features/status/statusSlice'
import styles from './CreateModal.module.scss'
import wrapStyles from '../WrapStyles.module.scss'

// import albumDefault from '../../assets/image/album_default.png'

export default function CreateModal() {
	const { isShowCreateModal, user } = useSelector((state) => state.status)
	const [message, setMessage] = useState(false)
	const [input, setInput] = useState('')

	const dispatch = useDispatch()

	const handleClose = () => {
		dispatch(toggleCreateModal(false))
	}

	const handleInputChange = (e) => {
		setInput(e.target.value)
	}

	const handleCreate = () => {
		if (input) {
			console.log('value ', input)
			const id = uuidv4()
			const playlist = {
				encodeId: id,
				title: input,
				userName: user.displayName,
				thumbnailM: 'https://photo-zmp3.zadn.vn/album_default.png',
				thumbnail: 'https://photo-zmp3.zadn.vn/album_default.png',
				isPrivate: true,
				song: {
					items: [],
				},
			}
			addPlayListToLibrary(playlist, user, true)
			dispatch(toggleCreateModal(false))
		} else {
			setMessage('Vui lòng nhập tên')
		}
	}
	return (
		<div>
			<Modal open={isShowCreateModal} onClose={handleClose}>
				<div className={wrapStyles.content}>
					<button className={wrapStyles.closeBtn} onClick={handleClose}>
						<ion-icon name='close-circle-outline'></ion-icon>
					</button>
					<div className={wrapStyles.left}>
						<img src={playlistIcon} alt='' />
					</div>
					<div className={wrapStyles.right}>
						<h4 className={wrapStyles.title}>Tạo Playlist mới</h4>

						<div className={styles.form}>
							<div className={styles.inputControl}>
								<input
									type='text'
									placeholder='Nhập tên playlist'
									onChange={handleInputChange}
									onFocus={() => setMessage(false)}
								/>
								<div className={styles.error}>
									{message && (
										<>
											<ion-icon name='alert-circle-outline'></ion-icon>
											<span>Vui lòng nhập tên playlist !</span>
										</>
									)}
								</div>
							</div>
							<div className={wrapStyles.control}>
								<button onClick={handleCreate} className='buttonTransparent'>
									Tạo mới
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}
