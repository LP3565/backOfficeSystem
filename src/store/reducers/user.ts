import { createSlice } from '@reduxjs/toolkit'

import { UserInfo } from '../../types/user'
import type { RootState } from '../index.ts'

type InitialState = {
  userInfo: UserInfo
}
// 初始化state
const initialState: InitialState = {
  userInfo:
    JSON.parse(sessionStorage.getItem('USERINFO') as string) ||
    ({} as UserInfo),
}

// 创建服务
const userSlice = createSlice({
  // 仓库的命名
  name: 'user',
  // 初始状态
  initialState,
  // 更新状态的方法对象
  reducers: {
    getUserInfo(state, { payload }) {
      state.userInfo = payload
    },
  },
})

export const { getUserInfo } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer
