import http from '../utils/http'
import { MenuType } from '../types/menu'

/**获取侧边栏数据 */
export const getMenusAPI = () => {
  return http<MenuType[]>('GET', 'menus')
}
