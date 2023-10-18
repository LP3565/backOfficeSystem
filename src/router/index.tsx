import { lazy } from 'react'
import ControlPanel from '../pages/ControlPanel'

type Routes = {
  path: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: any;
  guard?: boolean;
  title?: string;
  children?: Routes[]
}

export const routes: Routes[] = [
  {
    path: 'login',
    key: 'login',
    title: '登录',
    element: lazy(() => import('../pages/Login')),
    guard: false
  },
  {
    path: 'home',
    key: 'home',
    element: lazy(() => import('../pages/Home')),
    guard: true,
    children: [
      {
        path: '/home/controlpanel',
        key: 'controlpanel',
        title: '控制模板',
        element: ControlPanel,
      }
    ]
  },
  {
    path: '*',
    key: '404',
    title: '404',
    element: lazy(() => import('../pages/NotFound')),
    guard: false
  }
]