import http from '../utils/http'
import type { GlobalListQuery } from '../types/global'
import type { ClassifyGoodsType, GoodsListDataType } from '../types/Goods'

/** 获取所有商品列表 */
export const getGoodsListAPI = (data: GlobalListQuery) => {
  return http<GoodsListDataType>('GET', 'goods', { params: data })
}

/** 根据 id 删除商品 */
export const deleteGoodsById = (id: number) => {
  return http('DELETE', `goods/${id}`)
}

/** 获取商品分类列表 */
export const getClassifyGoodsAPI = (data: {
  pagenum: number
  pagesize: number
}) => {
  return http<ClassifyGoodsType>('GET', 'categories', { params: data })
}

/** 根据 id 删除分类 */
export const deleteClassifyGoodsById = (id: number) => {
  return http('DELETE', `categories/${id}`)
}
