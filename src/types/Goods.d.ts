/** 商品列表返回结果类型 */
export interface GoodsListDataType {
  pagenum: number
  total: number
  goods: GoodsListType[]
}
/** 商品列表类型 */
export interface GoodsListType {
  goods_id: number
  cat_id?: any
  goods_name: string
  goods_price: number
  goods_number: number
  goods_weight: number
  goods_state?: any
  add_time: number
  upd_time: number
  hot_mumber: number
  is_promote: boolean
  cat_one_id?: any
  cat_two_id?: any
  cat_three_id?: any
  [key: string]: any
}
