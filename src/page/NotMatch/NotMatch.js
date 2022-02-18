import axios from 'axios'
import React, { useEffect } from 'react'

export default function NotMatch() {
	useEffect(() => {
		const getApi = async () => {
			try {
				const res = axios.get(
					'http://api.mp3.zing.vn/api/streaming/bai-hat/ZZU7CFZ9/128'
				)
				console.log(res)
			} catch (error) {
				console.log(error)
			}
		}
		getApi()
	}, [])

	return <div>Not Match</div>
}
