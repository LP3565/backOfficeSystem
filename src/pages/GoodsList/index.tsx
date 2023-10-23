import React, { useEffect, useMemo, useState } from 'react'
import { Card, message, Input, Button, Table, Popconfirm } from 'antd'
import { ShoppingOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { deleteGoodsById, getGoodsListAPI } from '../../services/goods'
import moment from 'moment'
import type { GloBalTitleType, GlobalListQuery } from '../../types/global'
import type { GoodsListDataType, GoodsListType } from '../../types/Goods'
import type { SearchProps } from 'antd/es/input'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'

const { Search } = Input

const GoodsList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title

  const [messageApi, contextHandole] = message.useMessage()
  // 商品列表数据
  const [goodsList, setGoodsList] = useState<GoodsListDataType>({
    pagenum: 1,
    total: 0,
    goods: []
  })
  const [params, setParams] = useState<GlobalListQuery>({
    query: '',
    pagenum: 1,
    pagesize: 10
  })
  const [isLoading, setLoading] = useState<boolean>(false)

  // 处理表格
  const columns: ColumnsType<GoodsListType> = [
    {
      title: 'ID',
      dataIndex: 'goods_id',
      key: 'goods_id',
    },
    {
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
      render(text) {
        return <span style={{ color: '#1677ff' }}>{text}</span>
      }
    },
    {
      title: '商品价格',
      dataIndex: 'goods_price',
      key: 'goods_price',
    },
    {
      title: '商品重量',
      dataIndex: 'goods_weight',
      key: 'goods_weight'
    },
    {
      title: '发布时间',
      dataIndex: 'add_time',
      key: 'add_time',
      render(value) {
        return moment(value).format('L')
      }
    },
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      render(_, record) {
        return (
          <>
            <span style={{ marginRight: '20px' }} title="编辑"><EditTwoTone /></span>
            <Popconfirm
              title="删除用户"
              description="确定删除此商品吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDeleteHandle(record.goods_id)}
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
    pageSizeOptions: [10, 20, 30, 40],
    total: goodsList.total,
    size: 'small',
    showTotal(total: number) {
      return <span>Total {total} items</span>
    },
    onChange(page: number, pageSize: number) {
      setParams({ query: '', pagenum: page, pagesize: pageSize })
    }
  }

  // 面包屑配置
  const breadcrumbItems = useMemo(() => {
    return [
      {
        title: (<><ShoppingOutlined /><span>权限管理</span></>)
      },
      {
        title: '角色列表'
      }
    ]
  }, [])
  const newBreadcrumb = useMemo(() => {
    return <MyBreadcrumb items={breadcrumbItems} />
  }, [breadcrumbItems])

  useEffect(() => {
    getGoodsList()
  }, [params])

  const getGoodsList = async (): Promise<void | boolean> => {
    try {
      setLoading(true)
      const { meta, data } = await getGoodsListAPI(params)
      if (meta.status !== 200) return messageApi.info('获取商品列表失败!')
      data.goods.forEach(item => {
        item['key'] = item.goods_id
      })
      setGoodsList(data)
      setLoading(false)
    } catch (error) {
      messageApi.error('出错了,请重试!')
    }
  }

  const onSearch: SearchProps['onSearch'] = (value, _, info) => {
    if (info?.source === 'input') {
      setParams({ query: value, pagenum: 1, pagesize: 10 })
    } else {
      setParams({ query: '', pagenum: 1, pagesize: 10 })
    }
  }

  const onDeleteHandle = async (id: number): Promise<void | boolean> => {
    try {
      const res = await deleteGoodsById(id)
      if (res.meta.status !== 200) return messageApi.info('删除失败!')
      messageApi.success('删除成功!')
      getGoodsList()
    } catch (e) {
      messageApi.error('出错了, 请重试!')
    }
  }

  return (<>
    {contextHandole}
    <section>
      {newBreadcrumb}
      <Card style={{ marginTop: '20px' }} hoverable>
        <div className='goods-head' style={{ width: '100%', marginBottom: '20px' }}>
          <Search placeholder="input search text" onSearch={onSearch} allowClear style={{ width: 200 }} />
          <Button type='primary' icon={<ShoppingOutlined />} style={{ float: 'right' }}>添加</Button>
        </div>

        <Table columns={columns} dataSource={goodsList.goods} pagination={pagination} loading={isLoading} />
      </Card>
    </section>
  </>)
}

export default GoodsList