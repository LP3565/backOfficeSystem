/**页面标题类型 */
export interface GloBalTitleType {
  title: string
}

/** 获取列表的参数类型 */
export interface GlobalListQuery {
  query?: string
  pagenum: number
  pagesize: number
}
