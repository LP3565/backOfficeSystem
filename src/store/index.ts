import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'

// 创建仓库
export const store = configureStore({
  // 配置 reducer 模块
  reducer: {
    user: userReducer,
  },
})

// 从 store 本身推断出 RootState 和 AppDispatch
export type RootState = ReturnType<typeof store.getState>
// 推断出类型
export type AppDispatch = typeof store.dispatch
