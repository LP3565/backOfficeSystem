import React from 'react'
import styles from './index.module.css'
import { GloBalTitleType } from '../../types/global'

const NotFound: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (<>
    <div className={styles.notFound}>404 Not Found!</div>
  </>)
}
export default NotFound