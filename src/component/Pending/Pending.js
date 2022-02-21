import { CircularProgress } from '@mui/material'
import styles from './Pending.module.scss'

export default function Pending() {
	return (
		<div className={styles.wrap}>
			<span className={styles.icon}>
				<CircularProgress size={20} sx={{ color: 'white' }} />
			</span>
			<span className={styles.message}>Downloading ...</span>
		</div>
	)
}
