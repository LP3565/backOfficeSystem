import React, { useEffect, useState } from 'react';
// antd
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
  SecurityScanOutlined,
  ShoppingOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd'
// 路由
import { Outlet, useNavigate } from 'react-router-dom';
// 仓库
import { selectUser } from '../../store/reducers/user'
import { useAppSelector } from '../../hooks/appStore';
// 服务
import { getMenusAPI } from '../../services/home'
import type { MenuType } from '../../types/menu'
// 样式
import './index.css'

const { Header, Sider, Content } = Layout;

// 侧边栏的类型
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type IconKey = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
const MenuIcons: IconKey = {
  '125': <UsergroupAddOutlined />,
  '103': <SecurityScanOutlined />,
  '101': <ShoppingOutlined />,
  '102': <ScheduleOutlined />,
}

// 格式化侧边栏数据
function formattingMenu(data: MenuType[]): MenuItem[] {
  const newMenuList: MenuItem[] = [
    {
      label: '控制台',
      key: 'controlpanel',
      icon: <BarChartOutlined />
    }
  ]
  data.forEach(item => {
    if (item.id !== 145) {
      const newid = String(item.id)
      const newMenuItme = getItem(
        item.authName,
        item.id,
        MenuIcons[newid],
        item.children.map(child => {
          return getItem(child.authName, child.path)
        })
      )
      newMenuList.push(newMenuItme)
    }
  })
  return newMenuList
}


const Home: React.FC = () => {

  const navigate = useNavigate()
  const { userInfo } = useAppSelector(selectUser)
  // 控制侧边栏
  const [collapsed, setCollapsed] = useState(false)
  // 全局信息 api
  const [messageApi, contextHolder] = message.useMessage()
  // 侧边栏数据
  const [menuList, setMenuList] = useState<MenuItem[]>()
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string>(sessionStorage.getItem('SELECTMENUKEY') || 'controlpanel')
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string>(sessionStorage.getItem('OPENKEY') || 'controlpanel')

  // 用户信息
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (<section>名&nbsp;称：{userInfo.username}</section>)
    },
    {
      key: '2',
      label: (<section>手机号：{userInfo.mobile}</section>)
    },
    {
      key: '3',
      label: (<section>邮&nbsp;箱：{userInfo.email}</section>)
    }
  ]

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getMenuList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 获取侧边栏
  const getMenuList = async (): Promise<void | boolean> => {
    const res = await getMenusAPI()
    if (res.meta.status !== 200) messageApi.error('出错了，请重试！')
    const newMenu = formattingMenu(res.data)
    setMenuList(newMenu)
  }

  // 点击侧边栏
  const onMenuItemClick: MenuProps['onClick'] = (e) => {
    navigate(`/home/${e.key}`)
    setDefaultSelectedKeys(e.key)
    setDefaultOpenKeys(e.keyPath[1])
    sessionStorage.setItem('OPENKEY', e.keyPath[1])
    sessionStorage.setItem('SELECTMENUKEY', e.key)
  }

  return (
    <>
      {contextHolder}
      <Layout style={{ height: 100 + 'vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: '#fff' }}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            onClick={onMenuItemClick}
            defaultOpenKeys={[defaultOpenKeys]}
            defaultSelectedKeys={[defaultSelectedKeys]}
            items={menuList}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className='user-box'>
              <Dropdown menu={{ items }} placement="bottom">
                <div className='user-title'><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {userInfo.username}</div>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Home