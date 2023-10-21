import http from '../utils/http'
import type {
  UserByIdType,
  UserListType,
  UserQuery,
} from '../types/userControl'
import { FieldType, InitialValuesType } from '../pages/UserControl'
import { RolesDataType } from '../types/roles'

/** 获取用户列表 */
export const getUsersAPI = (data: UserQuery) => {
  return http<UserListType>('GET', 'users', { params: data })
}

/** 修改用户状态 */
export const putUserState = (id: number, type: boolean) => {
  return http('PUT', `users/${id}/state/${type}`)
}

/** 添加用户 */
export const postUserAPI = (data: FieldType) => {
  return http('POST', 'users', { data })
}

/** 根据 id 获取用户信息 */
export const getUserById = (id: number) => {
  return http<UserByIdType>('GET', `users/${id}`)
}

/** 根据 id 修改用户信息 */
export const putUserById = (data: InitialValuesType) => {
  return http('PUT', `users/${data.id}`, {
    data: { email: data.email, mobile: data.mobile },
  })
}

/** 根据 id 删除用户 */
export const deleteUserById = (id: number) => {
  return http('DELETE', `users/${id}`)
}

/** 获取权限数据 */
export const getRolesAPI = () => {
  return http<RolesDataType[]>('GET', 'roles')
}

/** 分配角色 */
export const putUserRoleAPI = (id: number, rid: number) => {
  return http('PUT', `users/${id}/role`, { data: { rid } })
}
