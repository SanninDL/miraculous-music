import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { musicApi } from '../../../api/musicApi'
import { addAndPlay } from '../../../features/queue/queueSlice'
import styles from './Banner.module.scss'

export default function Banner({ banner }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleClickBanner = (item) => {
		if (item.type === 1) {
			// type la bai hat
			const getApi = async () => {
				try {
					const song = await musicApi.getSongInfo({ id: item.encodeId })
					console.log(song)
					dispatch(addAndPlay(song.data))
				} catch (error) {
					console.log(error)
				}
			}
			getApi()
		} else {
			//type la alnum
			navigate(`/album/${item.encodeId}`)
		}
	}

	const [currentSlide, setcurrentSlide] = useState(0)
	const carouselRef = useRef(null)

	const onSlide = (i) => {
		const n = banner.length
		const firstEle = carouselRef.current?.firstChild
		const width = firstEle?.clientWidth
		const count = Math.round(carouselRef.current?.clientWidth / width)

		if (
			!(
				(i === -1 && currentSlide + i < 0) ||
				(i === 1 && currentSlide + count >= n)
			)
		) {
			firstEle.style.marginLeft = `${-width * (currentSlide + i)}px`
			firstEle.style.transition = 'all 0.2s linear'
			setcurrentSlide(currentSlide + i)
		}
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.carousel}>
				<button className={styles.prev} onClick={() => onSlide(-1)}>
					<ion-icon name='chevron-back-outline'></ion-icon>
				</button>
				<button className={styles.next} onClick={() => onSlide(1)}>
					<ion-icon name='chevron-forward-outline'></ion-icon>
				</button>

				<div className={styles.content} ref={carouselRef}>
					{banner.map((item, index) => (
						<div
							key={index}
							className={styles.item}
							onClick={() => handleClickBanner(item)}>
							<img src={item.banner} alt='' />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
