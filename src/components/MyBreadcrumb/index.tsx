import React from 'react'
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../hooks/appStore';
import { setMenuActive } from '../../store/reducers/user'
import './index.css'


interface PropsType {
  items: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    title: string | any,
  }[]
}

const MyBreadcrumb: React.FC<PropsType> = ({ items }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // 面包屑数据
  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      onClick() {
        navigate('/home')
        dispatch(setMenuActive({ selectKey: 'controlpanel', openKey: 'controlpanel' }))
      }
    },
    ...items
  ]
  return (<>
    <Breadcrumb items={breadcrumbItems} />
  </>)
}

export default MyBreadcrumb