export interface RolesDataType {
  id: number
  roleDesc: string
  roleName: string
  children: RolesChild[]
}

export interface RolesChild {
  authName: string
  children?: RolesChild[]
  id: number
  path: string
}
