import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { musicApi } from '../../api/musicApi'
import Heart from '../../component/Heart/Heart'
import ListSong from '../../component/ListSong/ListSong'
import MoreButton from '../../component/MoreButton/MoreButton'
import NoSong from '../../component/NoSong/NoSong'
import Spinner from '../../component/Spinner/Spinner'
import { add, addPlaylist } from '../../features/queue/queueSlice'
import styles from './Album.module.scss'

export default function Album() {
	const { customPlaylists, playlists } = useSelector((state) => state.library)
	const { encodeId } = useParams()
	const dispatch = useDispatch()
	const [album, setAlbum] = useState(null)
	const search = useLocation().search
	const isPrivate = new URLSearchParams(search).get('isPrivate')

	useEffect(() => {
		const getApi = async () => {
			try {
				if (!isPrivate) {
					const params = {
						id: encodeId,
					}
					const res = await musicApi.getPlaylist(params)
					setAlbum(res.data)
				} else {
					const playlist = customPlaylists.find(
						(item) => item.encodeId === encodeId
					)
					setAlbum(playlist)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getApi()
	}, [encodeId, isPrivate, customPlaylists])

	const options = [
		{
			icon: <ion-icon name='add-circle-outline'></ion-icon>,
			label: 'Thêm vào danh sách phát',
			onClick: () => {
				dispatch(add(album.song.items))
			},
		},
		{
			icon: <ion-icon name='share-social-outline'></ion-icon>,
			label: 'Chia sẻ',
			onClick: () => {
				console.log('chia se')
			},
		},
	]

	return (
		<>
			{album ? (
				<div className={styles.wrap}>
					<div className='row'>
						<div className='col-lg-4'>
							<div className={styles.left}>
								<div className={styles.thumbnail}>
									<img src={album.thumbnailM} alt='' />
								</div>
								<h2 className={styles.title}>{album.title}</h2>
								<p className={styles.artists}>
									{album.artistsNames
										? album.artistsNames
										: `Tạo bởi ${album.userName}`}
								</p>
								<p className={styles.like}>
									{album.like ? `${album.like} người yêu thích` : 'Riêng tư'}
								</p>

								<div className={styles.playBtn}>
									<button
										className='button'
										onClick={() =>
											dispatch(
												addPlaylist({
													album: album.song.items,
													song: null,
													isRandom: true,
												})
											)
										}>
										<ion-icon name='play-outline'></ion-icon>
										<span>Phát Ngẫu Nhiên</span>
									</button>
								</div>
								<div className={styles.control}>
									{!album.isPrivate && <Heart album={album} />}
									<MoreButton options={options} />
								</div>
							</div>
						</div>
						<div className='col-lg-8'>
							<div className={styles.right}>
								{album.song.items ? (
									<ListSong album={album} />
								) : (
									<NoSong message='Chưa có bài hát trong playlist của bạn' />
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</>
	)
}
