let id = 0
export default function createToast(toast) {
	return {
		...toast,
		id: id++,
	}
}
