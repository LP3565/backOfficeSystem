import axios from 'axios'
import '../mock/index'
import type { ControlDataType } from '../types/control'

/**获取控制台用户数据的模拟接口 */
export const getControlAPI = () => {
  return axios.get<ControlDataType>('/mock/control')
}
