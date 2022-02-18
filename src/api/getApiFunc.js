import { musicApi } from './musicApi'
import musicAxiosClient from './musicAxiosClient'

export default async function getApiFunc(type, params) {
	try {
		const res = await musicApi[type](params)
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}
