import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './PlaylistLibrary.module.scss'
import Item from '../../Home/PlayList/Item'
import { useNavigate } from 'react-router-dom'
import {
	setPendingCreate,
	toggleCreateModal,
} from '../../../features/status/statusSlice'

export default function PlaylistLibrary({ renderList }) {
	const navigation = useNavigate()
	const { playlists, customPlaylists } = useSelector((state) => state.library)
	const { user } = useSelector((state) => state.status)
	const dispatch = useDispatch()

	const handleCreate = () => {
		if (user) {
			dispatch(toggleCreateModal(true))
		} else {
			dispatch(setPendingCreate(true))
		}
	}

	return (
		<div className={styles.section}>
			<div className={styles.heading}>
				<h3 className={styles.title}>Playlist</h3>
				<div className={styles.control}>
					{renderList &&
						renderList.length < playlists.length + customPlaylists.length && (
							<button
								className={styles.showAll}
								onClick={() => navigation('/ca-nhan/playlist')}>
								<span>Tất cả</span>
								<ion-icon name='chevron-forward-outline'></ion-icon>
							</button>
						)}
				</div>
			</div>
			<div className={styles.content}>
				{renderList && (
					<div className={styles.list}>
						<div className='row'>
							<div className='col-3'>
								<button className={styles.addBtn} onClick={handleCreate}>
									<ion-icon name='add-outline'></ion-icon>

									<span>Tạo Playlist mới</span>
								</button>
							</div>
							{renderList.map((playlist, index) => (
								<div key={index} className='col-3'>
									<Item item={playlist} />
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
