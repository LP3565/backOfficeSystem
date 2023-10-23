import React, { useEffect, useMemo, useState } from 'react'
import { Table, Popconfirm, Card, message, Row, Button, Modal, Form, Input, TreeProps, Tree } from 'antd'
import { SecurityScanOutlined, DeleteTwoTone, EditTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons'
import RolesCard from './RolesCard'
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getRolesAPI } from '../../services/userControl'
import { deleteUserRoleById, getRolesListAPI, getUserRoleByIdAPI, postAddUserRoleAPI, postUserRoleRightsAPI, putUserRoleAPI } from '../../services/roles'
import type { ColumnsType } from 'antd/es/table'
import type { GloBalTitleType } from '../../types/global'
import type { RolesChild, RolesDataType } from '../../types/roles'
import type { ExpandableConfig } from 'antd/es/table/interface'
import type { DataNode } from 'antd/es/tree'

// 表格data类型
interface NewRolesListType {
  id: number;
  roleDesc: string;
  roleName: string
  key?: number;
  length?: number;
}

// 表单项
export interface FieldType {
  roleName?: string;
  roleDesc?: string;
  id?: number
}

// 角色列表组件
const UserList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title

  const [messageApi, contextholder] = message.useMessage()
  const [newRolesList, setNewRolesList] = useState<NewRolesListType[]>()
  const [rolesList, setRolesList] = useState<RolesDataType[]>()
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState<boolean>(false)
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState<boolean>(false)
  const [isAllocationRoleModalOpen, setIsAllocationRoleModalOpen] = useState<boolean>(false)
  const [treeData, setTreeData] = useState<DataNode[]>()
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<string[]>([])
  const [id, setId] = useState<number>()
  const [form] = Form.useForm()

  // 面包屑配置
  const breadcrumbItems = useMemo(() => {
    return [
      {
        title: (<><SecurityScanOutlined /><span>权限管理</span></>)
      },
      {
        title: '角色列表'
      }
    ]
  }, [])
  const newBreadcrumb = useMemo(() => {
    return <MyBreadcrumb items={breadcrumbItems} />
  }, [breadcrumbItems])


  // 处理表格
  const columns: ColumnsType<NewRolesListType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      render(text) {
        return <span style={{ color: '#1677ff' }}>{text}</span>
      }
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      key: 'roleDesc',
    },
    // 操作
    {
      title: '操作',
      key: 'operator',
      dataIndex: 'operator',
      render: (_, record) => {
        return (
          <>
            <span style={{ marginRight: '20px' }} title="编辑" onClick={() => onEditClick(record.id)}><EditTwoTone /></span>
            <span style={{ marginRight: '20px' }} title="分配权限" onClick={() => onAssignRolesClick(record.id)}><SafetyCertificateTwoTone /></span>

            <Popconfirm
              title="删除用户"
              description="确定删除此用户吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDeleteRole(record.id)}
            >
              <span title="删除"><DeleteTwoTone /></span>
            </Popconfirm>
          </>
        )
      }
    }
  ];
  // 处理展开行
  const expandable: ExpandableConfig<NewRolesListType> = {
    expandedRowRender: (record) => {
      const roleItem = rolesList?.find(item => item.id === record.id)
      return <div key={record.id}><RolesCard children={roleItem!.children} id={record.id} refresh={getRolesList} key={record.id} /> </div>
    },
    rowExpandable: (record) => record.length !== 0,
  }

  useEffect(() => {
    getRolesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 获取所有权限
  const getRolesList = async (): Promise<void | boolean> => {
    try {
      const res = await getRolesAPI()
      if (res.meta.status !== 200) return messageApi.error('获取角色数据失败!')
      res.data.forEach(item => {
        item['key'] = item.id
      })
      const newRolesListObj: NewRolesListType[] = []
      res.data.forEach(item => {
        const newObj: NewRolesListType = {
          id: item.id,
          roleDesc: item.roleDesc,
          roleName: item.roleName,
          key: item.id,
          length: item.children.length
        }
        newRolesListObj.push(newObj)
      })
      setNewRolesList(newRolesListObj)
      setRolesList(res.data)
    } catch (e) {
      messageApi.error('出错了, 请重试!')
    }
  }

  // 模态框类型
  enum ModalType {
    ADD = 'ADD',
    EDIT = 'EDIT',
    ROLES = 'ROLES'
  }

  // // 模态框确定操作
  const handleOk = async (type: ModalType): Promise<void | boolean> => {
    if (type === ModalType.ADD || type === ModalType.EDIT) {
      form.submit()
    } else {
      try {
        const newKey = defaultCheckedKeys.join(',')
        const { meta } = await postUserRoleRightsAPI(id!, newKey)
        if (meta.status !== 200) return messageApi.info('分配失败!')
        messageApi.success('分配成功!')
        setDefaultCheckedKeys([])
        setId(0)
        setTreeData([])
        getRolesList()
        setIsAllocationRoleModalOpen(false)
      } catch (e) {
        messageApi.error('出错了, 请重试!')
      }
    }
  }

  // 模态框取消操作
  const handleCancel = (type: ModalType) => {
    if (type === ModalType.ADD) {
      form.resetFields()
      setIsAddRoleModalOpen(false)
    } else if (type === ModalType.EDIT) {
      form.resetFields()
      setIsEditRoleModalOpen(false)
    } else {
      setId(0)
      setTreeData([])
      setDefaultCheckedKeys([])
      setIsAllocationRoleModalOpen(false)
    }
  }

  // 添加角色
  const onAddRoleFinish = async (value: FieldType): Promise<void | boolean> => {
    try {
      const { meta } = await postAddUserRoleAPI(value)
      if (meta.status !== 201) return messageApi.info('添加角色失败!')
      messageApi.success('添加角色成功!')
      getRolesList()
      form.resetFields()
      setIsAddRoleModalOpen(false)
    } catch (e) {
      messageApi.error('出错了, 请重试!')
    }
  }

  // 数据回显
  const onEditClick = async (id: number): Promise<void | boolean> => {
    try {
      const { data, meta } = await getUserRoleByIdAPI(id)
      if (meta.status !== 200) return messageApi.info('出错了,请重试!')
      setIsEditRoleModalOpen(true)
      form.setFieldsValue({
        id: data.roleId,
        roleName: data.roleName,
        roleDesc: data.roleDesc
      })
    } catch (error) {
      messageApi.error('出错了,请重试!')
    }
  }

  // 编辑角色
  const onEditRoleFinish = async (value: FieldType): Promise<void | boolean> => {
    try {
      const { meta } = await putUserRoleAPI(value.id!, { roleName: value.roleName, roleDesc: value.roleDesc })
      if (meta.status !== 200) return messageApi.info('修改失败!')
      getRolesList()
      messageApi.success('修改成功!')
      form.resetFields()
      setIsEditRoleModalOpen(false)
    } catch (e) {
      messageApi.error('出错了, 请重试!')
    }
  }

  // 递归替换所有数据
  const dgTree = (value: RolesChild[]) => {
    const arr: DataNode[] = []
    value.forEach(item => {
      if (item.children && item.children.length !== 0) {
        const obj = { title: item.authName, key: item.id + '', children: dgTree(item.children) }
        arr.push(obj)
      } else {
        arr.push({ title: item.authName, key: item.id + '' })
      }
    })
    return arr
  }

  // 递归获取第三级选中项
  const arr: string[] = []
  const dbTressTherr = (value: RolesChild[]) => {
    value.forEach(item => {
      if (!item.children || item.children.length === 0) return arr.push(item.id + '')
      item.children?.forEach(child => {
        dbTressTherr(child.children!)
      })
    })
    return arr
  }

  // 分配角色数据回显
  const onAssignRolesClick = async (id: number): Promise<void | boolean> => {
    try {
      setId(id)
      const res = await getRolesListAPI()
      if (res.meta.status !== 200) return messageApi.info('出错了,请重试!')
      const newU = rolesList?.find(item => item.id === id)
      const dfKeys = dbTressTherr(newU!.children)
      setDefaultCheckedKeys(dfKeys)
      setTreeData(dgTree(res.data))
      setIsAllocationRoleModalOpen(true)
    } catch (error) {
      messageApi.error('出错了,请重试!')
    }
  }

  // 选中项
  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    setDefaultCheckedKeys(checkedKeys as string[])
  }

  // 删除角色
  const onDeleteRole = async (id: number): Promise<void | boolean> => {
    try {
      const { meta } = await deleteUserRoleById(id)
      if (meta.status !== 200) return messageApi.info('删除失败')
      messageApi.success('删除成功!')
      getRolesList()
    } catch (error) {
      messageApi.error('出错了, 稍后再试!')
    }
  }

  return (
    <>
      {contextholder}
      <section>
        {
          newBreadcrumb
        }
        <Card style={{ marginTop: '20px' }} hoverable>
          <Row><Button type='primary' icon={<SecurityScanOutlined />} onClick={() => setIsAddRoleModalOpen(true)}>添加</Button></Row>
          <Table dataSource={newRolesList} columns={columns} expandable={expandable} pagination={false} style={{ marginTop: '20px' }} />
        </Card>
      </section>
      <Modal title="添加权限" okText="确定" cancelText="取消" open={isAddRoleModalOpen} onOk={() => handleOk(ModalType.ADD)} onCancel={() => handleCancel(ModalType.ADD)}>
        <Form
          name="basic"
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onAddRoleFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label="权限名称"
            name="roleName"
            rules={[{ required: true, message: '请输入权限名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="权限描述"
            name="roleDesc"
            rules={[{ required: true, message: '请输入权限描述!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="编辑权限" okText="确定" cancelText="取消" open={isEditRoleModalOpen} onOk={() => handleOk(ModalType.EDIT)} onCancel={() => handleCancel(ModalType.EDIT)}>
        <Form
          name="basic"
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onEditRoleFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label="ID"
            name="id"
            rules={[{ required: true, message: '请输入ID!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            label="权限名称"
            name="roleName"
            rules={[{ required: true, message: '请输入权限名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="权限描述"
            name="roleDesc"
            rules={[{ required: true, message: '请输入权限描述!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="分配权限" okText="确定" cancelText="取消" open={isAllocationRoleModalOpen} onOk={() => handleOk(ModalType.ROLES)} onCancel={() => handleCancel(ModalType.ROLES)}>
        <Tree
          checkable
          checkedKeys={defaultCheckedKeys}
          onCheck={onCheck}
          treeData={treeData}
        />
      </Modal>
    </>
  )
}

export default UserList