import http from '../utils/http'
import type { LoginData, UserInfo } from '../types/user'

/** 登录 */
export const loginAPI = (data: LoginData) => {
  return http<UserInfo>('POST', 'login', { data })
}
