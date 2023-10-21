import { useContext } from 'react'
import { AuthContext, AuthStateType } from '../context/AuthProvider'

interface AuthProviderType {
  auth: AuthStateType
  setAuth(data: AuthStateType): void
}

// 获取权限信息
export const useAuth = (): AuthProviderType => {
  return useContext(AuthContext) as AuthProviderType
}
