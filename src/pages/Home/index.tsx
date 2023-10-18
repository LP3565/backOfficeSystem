import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd'

import { selectUser } from '../../store/reducers/user'
import './index.css'
import { useAppSelector } from '../../hooks/appStore';
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {

  const { userInfo } = useAppSelector(selectUser)
  // 控制侧边栏
  const [collapsed, setCollapsed] = useState(false);

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

  return (
    <>
      <Layout style={{ height: 100 + 'vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: '#fff' }}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
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