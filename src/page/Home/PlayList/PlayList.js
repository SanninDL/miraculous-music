import React, { useRef, useState } from 'react'
import Item from './Item'
import styles from './PlayList.module.scss'

export default function PlayList({ list }) {
	const [currentSlide, setcurrentSlide] = useState(0)
	const carouselRef = useRef(null)

	const onSlide = (i) => {
		const n = list.items?.length || list.length
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
			<div className={styles.heading}>
				<h3 className={styles.title}>{list.title || 'Playlist/Album'}</h3>
				<div className={styles.control}>
					<button className={styles.prev} onClick={() => onSlide(-1)}>
						<ion-icon name='chevron-back-outline'></ion-icon>
					</button>
					<button className={styles.next} onClick={() => onSlide(1)}>
						<ion-icon name='chevron-forward-outline'></ion-icon>
					</button>
				</div>
			</div>
			<div className={styles.content}>
				<div className={`row ${styles.carousel}`} ref={carouselRef}>
					{list.items
						? list.items.map((item, index) => (
								<div key={index} className='col-4 col-lg-3'>
									<Item item={item} />
								</div>
						  ))
						: list.map((item, index) => (
								<div key={index} className='col-4 col-lg-3'>
									<Item item={item} />
								</div>
						  ))}
				</div>
			</div>
		</div>
	)
}
