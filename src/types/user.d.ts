/**登录参数类型 */
export interface LoginData {
  username: string
  password: string
}

/**用户信息类型 */
export interface UserInfo {
  id: number
  rid: number
  username: string
  mobile: string
  email: string
  token: string
}
