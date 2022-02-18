export default function formatDuration(time) {
	const m = Math.floor(Number(time) / 60).toFixed()
	const s = (time - m * 60).toFixed()
	const min = m < 10 ? `0${m}` : `${m}`
	const sec = s < 10 ? `0${s}` : `${s}`

	return `${min}:${sec}`
}
