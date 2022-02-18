import { FormControl, MenuItem, Modal, Select } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAddToPlaylistModal } from '../../../features/status/statusSlice'
import styles from './AddToPlaylistModal.module.scss'
import wrapStyles from '../WrapStyles.module.scss'
import playlistIcon from '../../../assets/svg/playlist.svg'
import { addSongToCustomPlaylist } from '../../../constant'

export default function AddToPlaylistModal() {
	const { isShowAddToPlaylistModal, songNeedAdd, user } = useSelector(
		(state) => state.status
	)
	const dispatch = useDispatch()

	const { customPlaylists } = useSelector((state) => state.library)
	const [playlist, setPlaylist] = useState(customPlaylists[0].encodeId)

	const renderOptionsEle = customPlaylists.map((item, index) => (
		<MenuItem key={index} value={item.encodeId}>
			{item.title}
		</MenuItem>
	))

	const handleClose = () => {
		dispatch(
			toggleAddToPlaylistModal({
				isOpen: false,
				song: null,
			})
		)
	}

	const handleChangeSelect = (e) => {
		setPlaylist(e.target.value)
	}
	const handleAdd = async () => {
		await addSongToCustomPlaylist(songNeedAdd, playlist, user)
		handleClose()
	}

	return (
		<div>
			<Modal open={isShowAddToPlaylistModal} onClose={handleClose}>
				<div className={wrapStyles.content}>
					<button className={wrapStyles.closeBtn} onClick={handleClose}>
						<ion-icon name='close-circle-outline'></ion-icon>
					</button>
					<div className={wrapStyles.left}>
						<img src={playlistIcon} alt='' />
					</div>
					<div className={wrapStyles.right}>
						<h2 className={wrapStyles.title}>Thêm vào Playlist</h2>
						<div className={styles.form}>
							<FormControl fullWidth>
								<Select
									id='playlist-select'
									value={playlist}
									sx={{
										backgroundColor: 'white',
										textAlign: 'left',
									}}
									onChange={handleChangeSelect}>
									{/* <MenuItem value={10}>Ten</MenuItem> */}
									{renderOptionsEle}
								</Select>
								<div className={wrapStyles.control}>
									<button className='buttonTransparent' onClick={handleAdd}>
										Thêm
									</button>
									<button className='buttonTransparent'>
										Tạo Playlist mới
									</button>
								</div>
							</FormControl>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}
