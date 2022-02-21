import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAddToPlaylistModal } from '../../../features/status/statusSlice'
import Heart from '../../Heart/Heart'
import MoreButton from '../../MoreButton/MoreButton'
import styles from './Media.module.scss'

export default function Media({ song }) {
	const { isPlay } = useSelector((state) => state.queue)
	const dispatch = useDispatch()

	const options = [
		{
			icon: <ion-icon name='add-circle-outline'></ion-icon>,
			label: 'Thêm vào playlist',
			onClick: () => {
				console.log('them vao playlist')
				dispatch(
					toggleAddToPlaylistModal({
						isOpen: true,
						song: song,
					})
				)
			},
		},
		{
			icon: <ion-icon name='download-outline'></ion-icon>,
			label: 'Tải xuống',
			onClick: () => {
				console.log('click')
			},
		},
		{
			icon: <ion-icon name='share-social-outline'></ion-icon>,
			label: 'Chia sẻ',
			onClick: () => {
				console.log('click')
			},
		},
	]

	const titleRef = useRef(null)
	useEffect(() => {
		if (titleRef.current) {
			const wrapTitle = titleRef.current
			const item = wrapTitle.querySelector(`.${styles.item}`)
			const title = wrapTitle.querySelector(`.${styles.title}`)
			const cloneItem = title.querySelector(`.${styles.cloneItem}`)
			if (isPlay) {
				if (item.offsetWidth > wrapTitle.offsetWidth) {
					cloneItem.style.display = 'block'
					title.classList.add(`${styles.effect}`)
				}
			} else {
				title.classList.remove(`${styles.effect}`)
				cloneItem.style.display = 'none'
			}
		}
	}, [isPlay])

	return (
		<div className={styles.song}>
			<div className={styles.thumnail}>
				<img src={song.thumbnail} alt='' />
			</div>
			<div className={styles.info}>
				<div className={styles.titleWrap} ref={titleRef}>
					<div className={styles.title}>
						<h3 className={styles.item}>{song.title}</h3>
						<h3 className={styles.cloneItem}>{song.title}</h3>
					</div>
				</div>
				<p className={styles.artists}>{song.artistsNames}</p>
			</div>
			<div className={styles.control}>
				<Heart song={song} />
				<div className={styles.more}>
					<MoreButton options={options} />
				</div>
			</div>
		</div>
	)
}
