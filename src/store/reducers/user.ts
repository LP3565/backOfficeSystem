import { createSlice } from '@reduxjs/toolkit'

import { UserInfo } from '../../types/user'
import type { RootState } from '../index.ts'

type InitialState = {
  userInfo: UserInfo
  defaultSelectedKeys: string
  defaultOpenKeys: string
}

type MenuKeysPayload = {
  selectKey?: string
  openKey: string
}

// 初始化state
const initialState: InitialState = {
  userInfo:
    JSON.parse(sessionStorage.getItem('USERINFO') as string) ||
    ({} as UserInfo),
  defaultSelectedKeys:
    sessionStorage.getItem('SELECTMENUKEY') || 'controlpanel',
  defaultOpenKeys: sessionStorage.getItem('OPENKEY') || 'controlpanel',
}

// 创建服务
const userSlice = createSlice({
  // 仓库的命名
  name: 'user',
  // 初始状态
  initialState,
  // 更新状态的方法对象
  reducers: {
    // 修改用户信息
    getUserInfo(state, { payload }) {
      state.userInfo = payload
    },
    // 修改菜单栏激活项
    setMenuActive(state, { payload }: { payload: MenuKeysPayload }) {
      state.defaultSelectedKeys = payload.selectKey!
      state.defaultOpenKeys = payload.openKey
      sessionStorage.setItem('OPENKEY', payload.openKey)
      sessionStorage.setItem('SELECTMENUKEY', payload.selectKey!)
    },
    // 清除数据
    clearState(state) {
      state.userInfo = {} as UserInfo
      state.defaultOpenKeys = 'controlpanel'
      state.defaultSelectedKeys = 'controlpanel'
    },
  },
})

export const { getUserInfo, setMenuActive, clearState } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer
