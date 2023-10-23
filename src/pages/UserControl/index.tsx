import React, { useEffect, useMemo, useState } from "react";
import { UsergroupAddOutlined, UserAddOutlined, EditTwoTone, DeleteTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons'
import { Card, Input, Button, Table, message, Switch, Popconfirm, Modal, Form, Select } from "antd";
import moment from 'moment'
import type { GloBalTitleType } from "../../types/global";
import MyBreadcrumb from "../../components/MyBreadcrumb";
import { deleteUserById, getRolesAPI, getUserById, getUsersAPI, postUserAPI, putUserById, putUserRoleAPI, putUserState } from '../../services/userControl'
import type { UserListType, UserListUsers, UserQuery } from '../../types/userControl'
import './index.css'

import type { SearchProps } from 'antd/es/input/Search'
const { Search } = Input

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

export type FieldType = {
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  mobile?: string;
}

export type InitialValuesType = {
  id: number | string;
  email: string;
  mobile: string;
}

type RolesData = {
  id: number;
  name: string;
  role: string;
  rolesList: { value: number, label: string }[]
}

// 用户列表页面
const UserControl: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title
  const [messageApi, contextHolder] = message.useMessage()
  // 用户列表数据
  const [userList, setUserList] = useState({} as UserListType)
  // 请求参数
  const [params, setParams] = useState<UserQuery>({
    query: '',
    // 页码值
    pagenum: 1,
    // 每页显示多少条数据
    pagesize: 5
  })
  // 控制表格 loading 的显示
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // 控制添加用户对话框的显示隐藏
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  // 控制修改用户对话框的显示隐藏
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // 控制权限分配对话框的显示隐藏
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false)
  const [rolesData, setRolesData] = useState<RolesData>()
  const [role, setRole] = useState<number>()
  // 表单实例
  const [form] = Form.useForm()

  // 面包屑数据
  const breadcrumbItems = useMemo(() => ([
    {
      title: (<><UsergroupAddOutlined /><span>用户管理</span></>)
    },
    {
      title: '用户列表'
    }
  ]), [])
  // 缓存面包屑组件
  const newMyBreadcrumb = useMemo(() => <MyBreadcrumb items={breadcrumbItems} />, [breadcrumbItems])

  // 处理表头和每一列数据
  const columns: ColumnsType<UserListUsers> = [
    // id
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    // 姓名
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <span style={{ color: '#1677ff' }}>{text}</span>,
    },
    // 职位
    {
      title: '权限',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    // 邮箱
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    // 手机号
    {
      title: '手机号',
      key: 'mobile',
      dataIndex: 'mobile'
    },
    // 注册时间
    {
      title: '注册时间',
      key: 'create_time',
      dataIndex: 'create_time',
      render: (text) => moment(text).format('L')
    },
    // 状态
    {
      title: '状态',
      key: 'mg_state',
      dataIndex: 'mg_state',
      render: (text, record) => {
        return <Switch checked={text} size="small" onChange={(e) => onChange(e, record.id)} />;
      }
    },
    // 操作
    {
      title: '操作',
      key: 'operator',
      dataIndex: 'operator',
      render: (_, record) => {
        return (
          <>
            <span style={{ marginRight: '20px' }} onClick={() => isModalOpen(ModalType.EDIT, record.id)} title="编辑"><EditTwoTone /></span>
            <span style={{ marginRight: '20px' }} title="分配权限" onClick={() => isModalOpen(ModalType.ROLES, record.id, record)}><SafetyCertificateTwoTone /></span>

            <Popconfirm
              title="删除用户"
              description="确定删除此用户吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDeleteHandle(record.id)}
            >
              <span title="删除"><DeleteTwoTone /></span>
            </Popconfirm>
          </>
        )
      }
    }
  ];

  // 分页器配置
  const pagination: TablePaginationConfig = {
    total: userList.total,
    defaultCurrent: 1,
    defaultPageSize: 5,
    showSizeChanger: true,
    size: 'small',
    showTotal(total) {
      return (<span>Total&nbsp;<i style={{ color: '#1677ff' }}>{total}</i>&nbsp;items</span>)
    },
    pageSizeOptions: [5, 15, 20, 30],
    onChange(pagenum: number, pagesize: number) {
      setIsLoading(true)

      setParams({ pagenum, pagesize })
    }
  }

  // 页面初始化获取数据
  useEffect(() => {
    getUserList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  // 获取用户列表
  async function getUserList(): Promise<void | boolean> {
    try {
      const res = await getUsersAPI(params)
      if (res.meta.status !== 200) return messageApi.error('用户列表获取错误!')
      res.data.users.forEach(item => {
        item['key'] = item.id
      })
      setUserList(res.data)
      setIsLoading(false)
    } catch (e) {
      messageApi.error('出错了,请重启再试!')
    }
  }

  // 模态框的功能类型
  enum ModalType {
    /**添加用户 */
    ADD = 'ADD',
    /**编辑用户 */
    EDIT = 'EDIT',
    /**分配权限 */
    ROLES = 'ROLES'
  }

  // 打开和关闭模态框
  const isModalOpen = async (type: ModalType, id?: number, userItem?: UserListUsers): Promise<void | boolean> => {
    if (type === ModalType.ADD) {
      setIsAddModalOpen(true)
    } else if (type === ModalType.EDIT) {
      const { data, meta } = await getUserById(id!)
      if (meta.status !== 200) return messageApi.error('获取用户信息失败,请稍后再试!')
      setIsEditModalOpen(true)
      // 数据回显
      form.setFieldsValue({
        id: data.id,
        email: data.email,
        mobile: data.mobile
      })
    } else {
      const { meta, data } = await getRolesAPI()
      if (meta.status !== 200) return messageApi.info('获取角色列表失败!')
      const newRoleData: RolesData = {
        id: id!,
        name: userItem!.username,
        role: userItem!.role_name,
        rolesList: data.map(item => ({ value: item.id, label: item.roleName }))
      }
      setRolesData(newRoleData)
      setIsRolesModalOpen(true)
    }
  }

  // 确定并关闭对话框
  const handleOk = async (type: ModalType): Promise<void | boolean> => {
    if (type === ModalType.ADD) {
      form.submit()
    } else if (type === ModalType.EDIT) {
      form.submit()
    } else {
      if (!role) return messageApi.info('请选择角色!')
      const res = await putUserRoleAPI(rolesData!.id, role!)
      if (res.meta.status !== 200) return messageApi.info('分配角色失败!')
      messageApi.success('分配角色成功!')
      getUserList()
      setIsRolesModalOpen(false)
    }
  }
  // 取消并关闭对话框
  const handleCancel = (type: ModalType) => {
    // 添加操作
    if (type === ModalType.ADD) {
      form.resetFields()
      setIsAddModalOpen(false)
    } else if (type === ModalType.EDIT) {
      form.resetFields()
      setIsEditModalOpen(false)
    } else {
      setRole(undefined)
      setIsRolesModalOpen(false)
    }
  }

  // 表单验证成功的回调
  const onFinish = async (value: FieldType): Promise<void | boolean> => {
    try {
      const res = await postUserAPI(value)
      if (res.meta.status !== 201) return messageApi.info(res.meta.msg)
      messageApi.success('添加成功!')
      form.resetFields()
      setIsAddModalOpen(false)
    } catch (error) {
      messageApi.error('出错了,请重启再试!')
    }
  }

  // 修改表单验证成功回调
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishEdit = async (value: InitialValuesType): Promise<void | boolean> => {
    try {
      const { meta } = await putUserById(value)
      if (meta.status !== 200) return messageApi.info('修改失败!')
      messageApi.success('修改成功!')
      getUserList()
      setIsEditModalOpen(false)
    } catch (error) {
      messageApi.error('出错了,请重启再试!')
    }
  }

  // 状态的切换
  const onChange = async (checked: boolean, id: number): Promise<void | boolean> => {
    try {
      const res = await putUserState(id, checked)
      if (res.meta.status !== 200) return message.error('修改失败!')
      message.success('修改成功!')
      getUserList()
    } catch (e) {
      messageApi.error('出错了,请重启再试!')
    }
  }

  // 搜索功能
  const onSearch: SearchProps['onSearch'] = (value, _, info) => {
    if (info?.source === 'input') {
      // setUserList({} as UserListType)
      setParams(state => ({ query: value, pagenum: state.pagenum, pagesize: state.pagesize }))

    } else {
      // setUserList({} as UserListType)
      setParams(state => ({ query: value, pagenum: state.pagenum, pagesize: state.pagesize }))
    }
  }

  // 删除
  const onDeleteHandle = async (id: number): Promise<void | boolean> => {
    const { meta } = await deleteUserById(id)
    if (meta.status !== 200) return messageApi.info('删除失败!')
    messageApi.success('删除成功!')
    getUserList()
  }

  // 选择框
  const onSelectChange = (value: number) => {
    const rid = rolesData?.rolesList.find(item => item.value === value)
    setRole(rid?.value)
  }

  return (
    <>
      {contextHolder}
      <section className="user-control">
        {
          newMyBreadcrumb
        }
        <Card hoverable style={{ marginTop: '20px' }}>
          <div className="find-add" style={{ width: '100%' }}>
            <Search placeholder="input search text" allowClear={true} onSearch={onSearch} style={{ width: '200px' }} />
            <Button type="primary" icon={<UserAddOutlined />} style={{ float: 'right' }} onClick={() => isModalOpen(ModalType.ADD)}>添加</Button>
          </div>
          <div className="user-list" style={{ width: '100%', marginTop: '20px' }}>
            <Table columns={columns} dataSource={userList.users} pagination={pagination} loading={isLoading} />
          </div>
        </Card>
      </section>
      <Modal title="添加用户" open={isAddModalOpen} okText="确定" cancelText="取消" onOk={() => handleOk(ModalType.ADD)} onCancel={() => handleCancel(ModalType.ADD)} width={'600px'}>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }, { max: 10, min: 6, message: '用户名长度6-10位!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: '请输入手机号!' }, { pattern: /^1[3-9][0-9]{9}$/, message: '无效的手机号!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }, { max: 10, min: 6, message: '密码长度6-10位!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }, { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '无效的邮箱!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="修改用户" open={isEditModalOpen} okText="确定" cancelText="取消" onOk={() => handleOk(ModalType.EDIT)} onCancel={() => handleCancel(ModalType.EDIT)} width={'600px'}>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinishEdit}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label="ID"
            name="id"
            rules={[{ required: true, message: 'id必填' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: '请输入手机号!' }, { pattern: /^1[3-9][0-9]{9}$/, message: '无效的手机号!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }, { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '无效的邮箱!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="分配权限" open={isRolesModalOpen} okText="确定" cancelText="取消" onOk={() => handleOk(ModalType.ROLES)} onCancel={() => handleCancel(ModalType.ROLES)} width={'600px'}>
        <div className="roles-item"><span className="left">姓名:</span>{rolesData?.name}</div>
        <div className="roles-item"><span className="left">角色:</span>{rolesData?.role}</div>
        <div className="roles-item"><span className="left">分配角色:</span>
          <Select
            style={{ width: 120 }}
            allowClear
            value={role}
            placeholder='请选择角色'
            placement="bottomLeft"
            onChange={onSelectChange}
            options={rolesData?.rolesList}
          />
        </div>
      </Modal>
    </>
  )
}

export default UserControl