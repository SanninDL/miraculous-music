export default function randomList(list, firstSong) {
	const first = firstSong || Math.floor(Math.random() * list.length)
	const newRender = [list[first]]

	const a = [first]
	for (var i = 0; i < list.length - 1; i++) {
		let t
		do {
			t = Math.floor(Math.random() * list.length)
		} while (a.includes(t))

		a.push(t)
		newRender.push(list[t])
	}
	return newRender
}
