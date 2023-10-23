import http from '../utils/http'
import type { GlobalListQuery } from '../types/global'
import { OrderListType } from '../types/order'

/** 获取所有订单 */
export const getOrderListAPI = (data: GlobalListQuery) => {
  return http<OrderListType>('GET', 'orders', { params: data })
}

/** 获取物流信息 */
export const getOrderMessageAPI = (id: number) => {
  return http('GET', `kuaidi/${id}`)
}
