import { lazy } from 'react'
import Login from '../pages/Login'
import ControlPanel from '../pages/ControlPanel'

type Routes = {
  path: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: any;
  guard?: boolean;
  title?: string;
  isLazy?: boolean;
  children?: Routes[];
}

export const routes: Routes[] = [
  {
    path: '/*',
    key: 'login',
    title: '登录',
    element: Login,
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
        isLazy: false
      },
      {
        path: '/home/users',
        key: 'users',
        title: '用户列表',
        element: lazy(() => import('../pages/UserControl')),
        isLazy: true
      },
      {
        path: '/home/roles',
        key: 'roles',
        title: '角色列表',
        element: lazy(() => import('../pages/UserList')),
        isLazy: true
      },
      {
        path: '/home/rights',
        key: 'rights',
        title: '权限列表',
        element: lazy(() => import('../pages/AuthList')),
        isLazy: true
      },
      {
        path: '/home/goods',
        key: 'goods',
        title: '商品列表',
        element: lazy(() => import('../pages/GoodsList')),
        isLazy: true
      },
      {
        path: '/home/params',
        key: 'params',
        title: '分类参数',
        element: lazy(() => import('../pages/SortingParameter')),
        isLazy: true
      },
      {
        path: '/home/categories',
        key: 'categories',
        title: '商品分类',
        element: lazy(() => import('../pages/ClassifyGoods')),
        isLazy: true
      },
      {
        path: '/home/orders',
        key: 'orders',
        title: '订单列表',
        element: lazy(() => import('../pages/OrderList')),
        isLazy: true
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