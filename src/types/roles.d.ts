export interface RolesDataType {
  id: number
  roleDesc: string
  roleName: string
  children: RolesChild[]
  [key: string]: string | number
}

export interface RolesChild {
  authName: string
  children?: RolesChild[]
  id: number
  path: string
}

/** 根据 id 回来的角色数据类型 */
export interface RoleByIdType {
  roleDesc: string
  roleName: string
  roleId: number
  rolePermissionDesc: string
}

export type AllRolesListType = RolesChild & {
  level: string
  pid: number
  [key: string]: number
}
