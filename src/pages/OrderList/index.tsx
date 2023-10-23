import React, { useMemo, useState, useEffect } from 'react'
import { message, Card, Input, Table, Tag, Modal, Timeline } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { SearchProps } from 'antd/es/input'
import { ScheduleOutlined, EnvironmentTwoTone } from '@ant-design/icons'
import moment from 'moment'
import { GloBalTitleType, GlobalListQuery } from '../../types/global'
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getOrderListAPI } from '../../services/order'
import type { OrderListType, OrdersGoodsType } from '../../types/order'
import './index.css'

const { Search } = Input

const OrderList: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title

  const [messageApi, contextHolder] = message.useMessage()
  const [orderList, setOrderList] = useState<OrderListType>()
  const [params, setParams] = useState<GlobalListQuery>({
    query: '',
    pagenum: 1,
    pagesize: 5
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // 面包屑配置
  const breadcrumbItems = useMemo(() => {
    return [
      {
        title: (<><ScheduleOutlined /><span>订单管理</span></>)
      },
      {
        title: '订单列表'
      }
    ]
  }, [])
  const newBreadcrumb = useMemo(() => {
    return <MyBreadcrumb items={breadcrumbItems} />
  }, [breadcrumbItems])

  useEffect(() => {
    getOrderList()
  }, [params])

  const columns: ColumnsType<OrdersGoodsType> = [
    {
      title: 'ID',
      dataIndex: 'order_id',
      key: 'order_id'
    },
    {
      title: '订单编号',
      dataIndex: 'order_number',
      key: 'order_number',
      render(text) {
        return <span style={{ color: '#1677ff' }}>{text}</span>
      }
    },
    {
      title: '订单金额',
      dataIndex: 'order_price',
      key: 'order_price'
    },
    {
      title: '是否付款',
      dataIndex: 'order_pay',
      key: 'order_pay',
      render(text) {
        return text === '0'
          ? <Tag color='red'>未付款</Tag>
          : text === '1'
            ? <Tag color='gold'>已付款</Tag>
            : <Tag color='green'>未知</Tag>
      }
    },
    {
      title: '是否发获',
      dataIndex: 'is_send',
      key: 'is_send'
    },
    {
      title: '下单时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render(text) {
        return moment(text).format('L')
      }
    },
    {
      title: '订单物流',
      dataIndex: 'logistics',
      key: 'logistics',
      render() {
        return <span title='订单物流' onClick={onclick}><EnvironmentTwoTone /></span>
      }
    }
  ]

  const pagination: TablePaginationConfig = {
    total: orderList?.total,
    defaultPageSize: 5,
    pageSizeOptions: [5, 15, 20],
    showTotal(total) {
      return <span>Total {total} items</span>
    },
    onChange(page, pageSize) {
      setParams(state => ({ query: state.query, pagenum: page, pagesize: pageSize }))
    }
  }

  const getOrderList = async (): Promise<void | boolean> => {
    try {
      setIsLoading(true)
      const res = await getOrderListAPI(params)
      if (res.meta.status !== 200) return messageApi.info('获取订单列表失败!')
      res.data.goods.forEach(item => {
        item['key'] = item.order_id
      })
      setOrderList(res.data)
      setIsLoading(false)
    } catch (error) {
      messageApi.error('出错了, 请重试!')
    }
  }

  const onSearch: SearchProps['onSearch'] = (value, _, info) => {
    if (info?.source === 'input') {
      setParams({ query: value, pagenum: 1, pagesize: 5 })
    } else {
      setParams({ query: '', pagenum: 1, pagesize: 5 })
    }
  }

  const onclick = () => {

    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (<>
    {contextHolder}
    <section>
      {newBreadcrumb}

      <Card hoverable style={{ marginTop: '20px' }}>
        <div className='order-head' style={{ marginBottom: '20px' }}>
          <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} allowClear />
        </div>
        <Table dataSource={orderList?.goods} columns={columns} pagination={pagination} loading={isLoading} />;
      </Card>
    </section>
    <Modal title="物流信息" width={800} open={isModalOpen} footer={null} onCancel={handleCancel}>
      <Timeline
        mode='left'
        items={[
          {
            label: "2018-05-10 09:39:00",
            children: "已签收,感谢使用顺丰,期待再次为您服务",
          },
          {
            label: "2018-05-10 08:23:00",
            children: "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
          },
          {
            label: "2018-05-10 07:32:00",
            children: "快件到达 [北京海淀育新小区营业点]",
          },
          {
            label: "2018-05-10 02:03:00",
            children: "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
          },
          {
            label: "2018-05-09 23:05:00",
            children: "快件到达 [北京顺义集散中心]",
          },
          {
            label: "2018-05-09 21:21:00",
            children: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
          },
          {
            label: "2018-05-09 13:07:00",
            children: "顺丰速运 已收取快件",
          },
          {
            label: "2018-05-09 12:25:03",
            children: "卖家发货",
          },
          {
            label: "2018-05-09 12:22:24",
            children: "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
          },
          {
            label: "2018-05-08 21:36:04",
            children: "商品已经下单",
          }
        ]}
      />
    </Modal>
  </>)
}

export default OrderList