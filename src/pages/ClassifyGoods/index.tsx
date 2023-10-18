import React from 'react'
import { GloBalTitleType } from '../../types/global'

const ClassifyGoods: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  return (<>
    商品分类
  </>)
}

export default ClassifyGoods