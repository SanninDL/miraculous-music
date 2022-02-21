import styles from './MobilePage.module.scss'
import notSupportImg from '../../../assets/image/unsupported.png'

export default function MobilePage() {
	return (
		<div className={styles.wrap}>
			<div className={styles.text}>
				<p>We sorry but</p>
				<p>
					<strong>your browser isn't supported.</strong>
				</p>
			</div>
			<div className={styles.img}>
				<img src={notSupportImg} alt='' />
			</div>
			<p className={styles.message}>
				To enjoy our website, try using a orther browser with width greater than
				or equal to 992px
				<br />
				(like Tablet, Laptop, ...)
			</p>
		</div>
	)
}
