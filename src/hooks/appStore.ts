import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '../store'

// 二次封装 useDispatch 和 useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
