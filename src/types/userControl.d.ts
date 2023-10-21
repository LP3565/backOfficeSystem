/** 获取用户列表的参数类型 */
export interface UserQuery {
  query?: string
  pagenum: number
  pagesize: number
}

/** 用户列表类型 */
export interface UserListType {
  pagenum: number
  total: number
  users: UserListUsers[]
}

export interface UserListUsers {
  create_time: number
  email: string
  id: number
  mg_state: boolean
  mobile: string
  role_name: string
  username: string
  [key: string]: string | number
}

export interface UserByIdType {
  email: string
  id: number
  mobile: string
  rid: number
  username: string
}
