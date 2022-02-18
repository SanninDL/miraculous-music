import musicAxiosClient from './musicAxiosClient'

export const musicApi = {
	getHome: (params) => {
		const url = '/home'
		return musicAxiosClient.get(url, { params })
	},
	getSong: (params) => {
		const url = '/song'
		return musicAxiosClient.get(url, { params })
	},
	getSongInfo: (params) => {
		const url = '/info'
		return musicAxiosClient.get(url, { params })
	},
	getPlaylist: (params) => {
		const url = '/playlist'
		return musicAxiosClient.get(url, { params })
	},
	getSearch: (params) => {
		const url = '/search'
		return musicAxiosClient.get(url, { params })
	},
	getCharthome: (params) => {
		const url = '/chart-home'
		return musicAxiosClient.get(url, { params })
	},
}
