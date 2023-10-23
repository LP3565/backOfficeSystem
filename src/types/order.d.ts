/** 订单参数类型 */
export interface OrderListType {
  pagenum: number | string
  total: number
  goods: OrdersGoodsType[]
}

export interface OrdersGoodsType {
  order_id: number
  user_id: number
  order_number: string
  order_price: number
  order_pay: string
  is_send: string
  trade_no: string
  order_fapiao_title: string
  order_fapiao_company: string
  order_fapiao_content: string
  consignee_addr: string
  pay_status: string
  create_time: number
  update_time: number
  key?: number | string
}
