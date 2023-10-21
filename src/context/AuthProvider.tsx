import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useToken } from '../hooks/token'

export interface AuthStateType {
  token?: string;
  roles?: number[];
}

// 创建祖孙通信的上下文
export const AuthContext = createContext({})

// 创建传值组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useToken()

  // 传出权限信息
  const [auth, setAuth] = useState<AuthStateType>({
    token: token!
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}