import React, { useEffect, useState } from 'react'
import { musicApi } from '../../api/musicApi'
import styles from './ChartPage.module.scss'
import ChartSection from './ChartSection/ChartSection'

export default function ChartPage() {
	const [chart, setChart] = useState(null)
	const [weekChart, setWeekChart] = useState(null)

	useEffect(() => {
		const getApi = async () => {
			try {
				const res = await musicApi.getCharthome()
				setWeekChart(res.data.weekChart)
				setChart(res.data.RTChart.items)
			} catch (error) {
				console.log(error)
			}
		}
		getApi()
	}, [])

	const titleWeekchart = (key) => {
		switch (key) {
			case 'vn':
				return 'Việt Nam'
			case 'us':
				return 'US-UK'
			case 'korea':
				return 'K-Pop'

			default:
				break
		}
	}

	return (
		<div>
			<div className={styles.section}>
				<div className={styles.heading}>Zing Chart</div>

				{chart && <ChartSection list={chart} title='#zingchart' />}
			</div>
			{weekChart && (
				<div className={styles.section}>
					<div className={styles.heading}>Bảng Xếp Hạng Tuần</div>
					{Object.keys(weekChart).map((key, index) => (
						<ChartSection
							key={index}
							list={weekChart[key].items}
							title={titleWeekchart(key)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
