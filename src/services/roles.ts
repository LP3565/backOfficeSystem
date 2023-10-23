import http from '../utils/http'
import type { FieldType } from '../pages/UserList'
import type { RoleByIdType, RolesChild, AllRolesListType } from '../types/roles'

/** 获取所有权限 */
export const getAllRolesAPI = () => {
  return http<AllRolesListType[]>('GET', 'rights/list')
}

/** 删除角色的权限 */
export const deleteUserRoleAPI = (id: number, rid: number) => {
  return http('DELETE', `roles/${id}/rights/${rid}`)
}

/** 添加角色 */
export const postAddUserRoleAPI = (data: FieldType) => {
  return http('POST', 'roles', { data })
}

/** 根据id查找角色 */
export const getUserRoleByIdAPI = (id: number) => {
  return http<RoleByIdType>('GET', `roles/${id}`)
}

/** 修改角色 */
export const putUserRoleAPI = (id: number, data: FieldType) => {
  return http('PUT', `roles/${id}`, { data })
}

/** 获取所有权限 */
export const getRolesListAPI = () => {
  return http<RolesChild[]>('GET', 'rights/tree')
}

/** 分配权限 */
export const postUserRoleRightsAPI = (id: number, rids: string) => {
  return http('POST', `roles/${id}/rights`, {
    data: {
      rids,
    },
  })
}

/** 删除角色 */
export const deleteUserRoleById = (id: number) => {
  return http('DELETE', `roles/${id}`)
}
