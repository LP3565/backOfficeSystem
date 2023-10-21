import React, { useEffect, useState } from 'react'
import styles from '../index.module.css'
import { message } from 'antd'
import { FundTwoTone, ShoppingTwoTone, AccountBookTwoTone, CloseSquareTwoTone } from '@ant-design/icons'
import { getControlAPI } from '../../../services/control'
import type { DataType } from '../../../types/control'
import Counter from '../Counter'

type IconType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
const icons: IconType = {
  '1': <FundTwoTone />,
  '2': <ShoppingTwoTone />,
  '3': <AccountBookTwoTone />,
  '4': <CloseSquareTwoTone />
}

const Cars: React.FC = () => {
  const [cars, setCars] = useState<DataType[]>([])
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    async function getData() {
      const res = await getControlAPI()
      if (res.data.meta.status !== 200) return messageApi.error('数据获取错误!')
      const newCars = res.data.data.map(item => ({ id: item.id, title: item.title, count: item.count, icon: icons[String(item.id)], rise: item.rise }))
      setCars(newCars)
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {contextHolder}
      <div className={styles.dataCarBox}>
        {
          cars.map(item => {
            return (
              <div key={item.id}>
                <div className={styles.minBox}>
                  <h4>{item.title}</h4>
                  <div className={styles.dataDetail}>
                    <div className={styles.dataCount}>
                      <span>{item.icon}</span>&nbsp;
                      <span className='count'><Counter counts={item.count} /></span>
                    </div>
                    <span className={styles.dataRise}>
                      <i>+</i>
                      <i className={styles.rise}><Counter counts={item.rise} /></i>
                      %
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Cars