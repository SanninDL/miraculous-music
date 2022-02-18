import axios from 'axios'
import queryString from 'query-string'

const musicAxiosClient = axios.create({
	baseURL: 'https://miraculous-music.herokuapp.com/api',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000',
	},

	paramsSerializer: (params) => queryString.stringify(params),
})

musicAxiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data
		} else {
			return response
		}
	},
	(error) => {
		throw error
	}
)

export default musicAxiosClient
