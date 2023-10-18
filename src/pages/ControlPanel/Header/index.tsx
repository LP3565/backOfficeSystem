import React from "react";
import styles from '../index.module.css'

const ControlHeader: React.FC = () => {
  return (
    <>
      {/* 面板欢迎 */}
      <div className={styles.headerBox}>
        <div className={styles.welcomeBox}>
          <figure>
            <img src="https://demo.buildadmin.com/assets/header-1-2575ae78.svg" alt="欢迎" />
          </figure>
          <div className={styles.welcomeText}>Admin下午好！欢迎回来！</div>
        </div>
        <div className={styles.workBox}>
          <figure>
            <img src="https://demo.buildadmin.com/assets/coffee-d68d7748.svg" alt="欢迎" />
          </figure>
          <div className={styles.workTime}>您今天已经工作了2小时40分钟50秒</div>
        </div>
      </div>
    </>
  )
}

export default ControlHeader