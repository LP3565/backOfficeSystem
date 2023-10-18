import React from 'react'
import { GloBalTitleType } from '../../types/global'

const OrderList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (<>
    订单列表
  </>)
}

export default OrderList