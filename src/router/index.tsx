import { lazy } from 'react'
import ControlPanel from '../pages/ControlPanel'
import UserControl from '../pages/UserControl'
import UserList from '../pages/UserList'
import AuthList from '../pages/AuthList'
import GoodsList from '../pages/GoodsList'
import SortingParameter from '../pages/SortingParameter'
import ClassifyGoods from '../pages/ClassifyGoods'
import OrderList from '../pages/OrderList'

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
      },
      {
        path: '/home/users',
        key: 'users',
        title: '用户列表',
        element: UserControl,
      },
      {
        path: '/home/roles',
        key: 'roles',
        title: '角色列表',
        element: UserList,
      },
      {
        path: '/home/rights',
        key: 'rights',
        title: '权限列表',
        element: AuthList,
      },
      {
        path: '/home/rights',
        key: 'rights',
        title: '权限列表',
        element: AuthList,
      },
      {
        path: '/home/goods',
        key: 'goods',
        title: '商品列表',
        element: GoodsList
      },
      {
        path: '/home/params',
        key: 'params',
        title: '分类参数',
        element: SortingParameter,
      },
      {
        path: '/home/categories',
        key: 'categories',
        title: '商品分类',
        element: ClassifyGoods,
      },
      {
        path: '/home/orders',
        key: 'orders',
        title: '订单列表',
        element: OrderList
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