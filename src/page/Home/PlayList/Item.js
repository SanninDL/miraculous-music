import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { musicApi } from '../../../api/musicApi'
import playBtn from '../../../assets/svg/playBtn.svg'
import MoreButton from '../../../component/MoreButton/MoreButton'
import {
	addPlayListToLibrary,
	removePlaylistfromLibrary,
} from '../../../constant'
import { add } from '../../../features/queue/queueSlice'
import styles from './Item.module.scss'

export default function Item({ item }) {
	const [showOptions, setshowOptions] = useState(false)
	const { playlists, customPlaylists } = useSelector((state) => state.library)
	const { user } = useSelector((state) => state.status)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const itemRef = useRef(null)

	document.onmousedown = (e) => {
		const target = e.target
		if (itemRef.current) {
			if (!itemRef.current.contains(target)) {
				if (showOptions) {
					const overlayBox = itemRef.current.querySelector(`.${styles.overlay}`)
					setshowOptions(false)
					overlayBox.classList.remove(`${styles.showOverlay}`)
				}
			}
		}
	}
	const onClickItem = (e, encodeId) => {
		const moreEle = e.target.closest(`.${styles.more}`)
		const overlayBox = itemRef.current.querySelector(`.${styles.overlay}`)
		if (moreEle) {
			if (!showOptions) {
				overlayBox.classList.add(`${styles.showOverlay}`)
				setshowOptions(true)
			} else {
				setshowOptions(false)
				overlayBox.classList.remove(`${styles.showOverlay}`)
			}
		} else {
			if (item.isPrivate) {
				navigate(`/album/${encodeId}?isPrivate=true`)
			} else {
				navigate(`/album/${encodeId}`)
			}
		}
	}
	const isOwner =
		playlists.find((i) => i.encodeId === item.encodeId) ||
		customPlaylists.find((i) => i.encodeId === item.encodeId)

	const options = [
		{
			icon: <ion-icon name='heart-outline'></ion-icon>,
			label: isOwner ? 'Xóa khỏi thư viện' : 'Thêm vào thư viện',
			onClick: () => {
				if (isOwner) {
					removePlaylistfromLibrary(item, user, Boolean(item.isPrivate))
				} else {
					addPlayListToLibrary(item, user)
				}
			},
		},
		{
			icon: <ion-icon name='add-circle-outline'></ion-icon>,
			label: 'Thêm vào danh sách phát',
			onClick: async () => {
				try {
					const res = await musicApi.getPlaylist({ id: item.encodeId })
					const playlist = res.data.song.items
					if (playlist) {
						dispatch(add(playlist))
					}
				} catch (error) {
					console.log(error)
				}
			},
		},
	]

	return (
		<div
			className={styles.item}
			ref={itemRef}
			onClick={(e) => onClickItem(e, item.encodeId)}>
			<div className={styles.img}>
				<img src={item.thumbnail} alt='' />

				<div className={styles.overlay}>
					<div className={styles.box}>
						<div className={styles.play}>
							<img src={playBtn} alt='' />
						</div>
					</div>
					<div className={styles.more}>
						<MoreButton options={options} />
					</div>
				</div>
			</div>
			<div className={styles.info}>
				<Link to={`/album/${item.encodeId}`}>
					<h4 className={styles.name}>{item.title}</h4>
				</Link>
				<span className={styles.desc}>
					{item.sortDescription
						? item.sortDescription
						: item.artistsNames || item.userName}
				</span>
			</div>
		</div>
	)
}
