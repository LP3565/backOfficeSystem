/**侧边栏数据类型 */
export interface MenuType {
  authName: string
  children: MenuType[]
  id: number
  order: number | null
  path: string
}
