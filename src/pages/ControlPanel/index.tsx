import React, { useMemo } from 'react'
import ControlHeader from './Header'
import { GloBalTitleType } from '../../types/global'
import styles from './index.module.css'
import Cars from './Cars'
import Chart from './Chart'

const ControlPanel: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  const newCars = useMemo(() => {
    return <Cars />
  }, [])
  return (<>
    <div className={styles.controlPanel}>
      {/* 面板欢迎 */}
      <ControlHeader />

      {/* 面板数据统计 */}
      {newCars}

      {/* 图表 */}
      <Chart />
    </div>
  </>)
}

export default ControlPanel