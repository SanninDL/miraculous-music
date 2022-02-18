export const refreshTokenSetup = (res) => {
	console.log('refresh')
	let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000
	const refreshToken = async () => {
		const newAuthRes = await res.reloadAuthResponse()
		refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000

		console.log('newAuth', newAuthRes)

		// set the other time after the first
		setTimeout(refreshToken, refreshTiming)
	}

	//set first refresh timer
	setTimeout(refreshToken, refreshTiming)
}
