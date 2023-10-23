import http from '../utils/http'
import type { GlobalListQuery } from '../types/global'
import type { GoodsListDataType } from '../types/Goods'

/** 获取所有商品列表 */
export const getGoodsListAPI = (data: GlobalListQuery) => {
  return http<GoodsListDataType>('GET', 'goods', { params: data })
}

/** 根据 id 删除商品 */
export const deleteGoodsById = (id: number) => {
  return http('DELETE', `goods/${id}`)
}
