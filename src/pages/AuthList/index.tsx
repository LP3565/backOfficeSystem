import React, { useEffect, useMemo, useState } from "react"
import { Card, message, Table, Tag } from 'antd'
import { SecurityScanOutlined } from '@ant-design/icons'
import MyBreadcrumb from "../../components/MyBreadcrumb"
import { getAllRolesAPI } from "../../services/roles"
import { AllRolesListType } from "../../types/roles"
import type { GloBalTitleType } from "../../types/global"
import type { ColumnsType } from "antd/es/table"

const AuthList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title

  const [messageApi, contextHandol] = message.useMessage()
  const [allRolesList, setAllRolesList] = useState<AllRolesListType[]>([])
  const breadcrumbItems = useMemo(() => ([
    {
      title: <><SecurityScanOutlined /> <span>权限管理</span></>
    },
    {
      title: '权限列表'
    }
  ]), [])
  const newBreadcrumb = useMemo(() => {
    return <MyBreadcrumb items={breadcrumbItems} />
  }, [breadcrumbItems])

  const columns: ColumnsType<AllRolesListType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限',
      dataIndex: 'authName',
      key: 'authName',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '权限等级',
      dataIndex: 'level',
      key: 'level',
      render: (value) => {
        return value === '0'
          ? <Tag color="blue">一级</Tag>
          : value === '1'
            ? <Tag color="gold">二级</Tag>
            : value === '2'
              ? <Tag color="green">三级</Tag>
              : value
      }
    }
  ];

  useEffect(() => {
    getAllRolesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 获取所有权限列表
  const getAllRolesList = async (): Promise<void | boolean> => {
    try {
      const { data, meta } = await getAllRolesAPI()
      if (meta.status !== 200) return messageApi.info('获取权限列表失败')
      data.forEach(item => {
        item['key'] = item.id
      })
      setAllRolesList(data)
    } catch (e) {
      messageApi.error('出错了, 请重试!')
    }
  }

  return (
    <>
      {contextHandol}
      <section>
        {newBreadcrumb}
        <Card style={{ marginTop: '20px' }} hoverable>
          <Table dataSource={allRolesList} columns={columns} pagination={false} />
        </Card>
      </section>
    </>
  )
}

export default AuthList