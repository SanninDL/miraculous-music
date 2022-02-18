import { useNavigate } from 'react-router-dom'
import styles from './HistoryControl.module.scss'

export default function HistoryControl() {
	const navigate = useNavigate()
	console.log(navigate)

	return (
		<div className={styles.wrap}>
			<button onClick={() => navigate(1)}>
				<ion-icon name='arrow-forward-outline'></ion-icon>
			</button>
			<button onClick={() => navigate(-1)}>
				<ion-icon name='arrow-back-outline'></ion-icon>
			</button>
		</div>
	)
}
