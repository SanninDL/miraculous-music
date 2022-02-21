import styles from './NotFound.module.scss'
import notFoundImg from '../../assets/image/404-img.png'
import { Link } from 'react-router-dom'
export default function NotFound() {
	return (
		<div className={styles.wrap}>
			<div className={styles.shap}>
				<span className={styles.number}>4</span>

				<img src={notFoundImg} alt='' />
				<span className={styles.number}>4</span>
			</div>
			<p className={styles.text}>
				The page you were looking for was moved or doesn't exist
			</p>
			<div className={styles.btn}>
				<Link to='/'>
					<button className='button'>Back Home</button>
				</Link>
			</div>
		</div>
	)
}
