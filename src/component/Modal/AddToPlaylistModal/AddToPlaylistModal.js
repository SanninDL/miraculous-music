import { FormControl, MenuItem, Modal, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
	toggleAddToPlaylistModal,
	toggleCreateModal,
} from '../../../features/status/statusSlice'
import styles from './AddToPlaylistModal.module.scss'
import wrapStyles from '../WrapStyles.module.scss'
import playlistIcon from '../../../assets/svg/playlist.svg'
import { addSongToCustomPlaylist } from '../../../constant'
import { useMemo } from 'react'

export default function AddToPlaylistModal(props) {
	const { isShowAddToPlaylistModal, songNeedAdd, user } = useSelector(
		(state) => state.status
	)
	const { customPlaylists } = useSelector((state) => state.library)
	const dispatch = useDispatch()
	const [playlist, setPlaylist] = useState('')

	// const customPlaylists = props.customPlaylists
	useEffect(() => {
		if (customPlaylists.length > 0) {
			setPlaylist(customPlaylists[0].encodeId)
		}
	}, [customPlaylists])

	const renderOptionsEle = useMemo(
		() =>
			customPlaylists.map((item, index) => (
				<MenuItem key={index} value={item.encodeId}>
					{item.title}
				</MenuItem>
			)),
		[customPlaylists]
	)

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
	const handleCreateNew = () => {
		dispatch(toggleCreateModal(true))
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
								{customPlaylists.length > 0 ? (
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
								) : (
									<p className={styles.message}>
										Chưa có playlist trong thư viện của bạn
									</p>
								)}
								<div className={wrapStyles.control}>
									{customPlaylists.length > 0 && (
										<button className='buttonTransparent' onClick={handleAdd}>
											Thêm
										</button>
									)}
									<button
										className='buttonTransparent'
										onClick={handleCreateNew}>
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

// function mapStateToProps(state, ownProps) {
// 	return {
// 		customPlaylists: state.library.customPlaylists,
// 	}
// }

// export default connect(mapStateToProps)(AddToPlaylistModal)
