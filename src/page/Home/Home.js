import React, { useEffect, useState } from 'react'
import { musicApi } from '../../api/musicApi'
import Spinner from '../../component/Spinner/Spinner'
// import { playLists } from '../../api/music'
import Banner from './Banner/Banner'
import PlayList from './PlayList/PlayList'

export default function Home() {
	const [playlist, setPlaylist] = useState(null)
	const [banner, setBanner] = useState(null)

	useEffect(() => {
		const getApi = async () => {
			try {
				const getPage = async (page) => {
					const res = await musicApi.getHome({ page: page })
					return res
				}

				const page1 = await getPage(1)
				const banner = page1.data.items.find(
					(item) => item.sectionType === 'banner'
				).items

				const pages = [2, 3, 4]
				const allResult = await Promise.all(pages.map(getPage))

				const allPage = allResult.reduce(
					(total, page) => [...total, ...page.data.items],
					[...page1.data.items]
				)
				const playlist = allPage.filter(
					(item) => item.sectionType === 'playlist'
				)
				setBanner(banner)

				setPlaylist(playlist)
			} catch (error) {
				console.log(error)
			}
		}
		getApi()
	}, [])

	return (
		<div className='home'>
			{!(banner || playlist) && <Spinner />}
			{banner && <Banner banner={banner} />}
			{playlist &&
				playlist.map((playlist, index) => (
					<PlayList key={index} list={playlist} />
				))}
		</div>
	)
}
