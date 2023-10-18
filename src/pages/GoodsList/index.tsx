import React from 'react'
import { GloBalTitleType } from '../../types/global'

const GoodsList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (<>
    商品列表
  </>)
}

export default GoodsList