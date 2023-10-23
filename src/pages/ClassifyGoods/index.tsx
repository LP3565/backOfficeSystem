import React, { useEffect, useMemo, useState } from 'react'
import { Card, message, Table, Tag, Popconfirm } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { ShoppingOutlined, CheckCircleFilled, CloseCircleFilled, DeleteTwoTone } from '@ant-design/icons'
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { deleteClassifyGoodsById, getClassifyGoodsAPI } from '../../services/goods'
import type { GloBalTitleType } from '../../types/global'
import type { ClassifyGoodsResultType, ClassifyGoodsType } from '../../types/Goods'


const ClassifyGoods: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title

  const [messageApi, contextHandol] = message.useMessage()
  const [classGoodsList, setClassGoodsList] = useState<ClassifyGoodsType>()
  const [params, setParams] = useState<{ pagenum: number, pagesize: number }>({
    pagenum: 1,
    pagesize: 5
  })

  // 面包屑配置
  const breadcrumbItems = useMemo(() => {
    return [
      {
        title: (<><ShoppingOutlined /><span>权限管理</span></>)
      },
      {
        title: '商品分类'
      }
    ]
  }, [])
  const newBreadcrumb = useMemo(() => {
    return <MyBreadcrumb items={breadcrumbItems} />
  }, [breadcrumbItems])

  const columns: ColumnsType<ClassifyGoodsResultType> = [
    {
      title: 'ID',
      dataIndex: 'cat_id',
      key: 'cat_id'
    },
    {
      title: '分类列表',
      dataIndex: 'cat_name',
      key: 'cat_name',
      render(text) {
        return <span style={{ color: '#1677ff' }}>{text}</span>
      }
    },
    {
      title: '是否有效',
      dataIndex: 'cat_deleted',
      key: 'cat_deleted',
      render(text) {
        return !text ? <CheckCircleFilled style={{ color: 'gold' }} /> : <CloseCircleFilled style={{ color: 'red' }} />
      }
    },
    {
      title: '排序',
      dataIndex: 'cat_level',
      key: 'cat_level',
      render(text) {
        return (
          text === 0
            ? <Tag color='blue'>一级</Tag>
            : text === 1
              ? <Tag color='gold'>二级</Tag>
              : text === 2
                ? <Tag color='green'>三级</Tag>
                : text
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      render(_, record) {
        return (
          <>
            <Popconfirm
              title="删除用户"
              description="确定删除此商品吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDeleteHandle(record.cat_id)}
            >
              <span title="删除"><DeleteTwoTone /></span>
            </Popconfirm>
          </>
        )
      }
    }
  ]

  const pagination: TablePaginationConfig = {
    defaultPageSize: 5,
    total: classGoodsList?.total,
    pageSizeOptions: [5, 15, 20],
    showTotal(total) {
      return <span>Total {total} items</span>
    },
    onChange(page: number, pageSize: number) {
      setParams({ pagenum: page, pagesize: pageSize })
    }
  }

  useEffect(() => {
    getClassifyGoodsList()
  }, [params])

  const dgKeys = (data: ClassifyGoodsResultType[]) => {
    data.forEach(item => {
      if (item.children && item.children.length !== 0) {
        item['key'] = item.cat_id
        dgKeys(item.children)
      } else {
        item['key'] = item.cat_id
        return
      }
    })
  }

  const getClassifyGoodsList = async (): Promise<void | boolean> => {
    try {
      const { data, meta } = await getClassifyGoodsAPI(params)
      if (meta.status !== 200) return messageApi.info('获取商品分类失败!')
      dgKeys(data.result)
      setClassGoodsList(data)
    } catch (e) {
      messageApi.error('出错了, 请重试!')
    }
  }

  const onDeleteHandle = async (id: number): Promise<void | boolean> => {
    try {
      const { meta } = await deleteClassifyGoodsById(id)
      if (meta.status !== 200) return messageApi.info('删除失败!')
      messageApi.success('删除成功!')
      getClassifyGoodsList()
    } catch (e) {
      messageApi.error('出错了, 请重试!')
    }
  }

  return (
    <>
      {contextHandol}
      <section>
        {newBreadcrumb}
        <Card hoverable style={{ marginTop: '20px' }}>
          <Table columns={columns} dataSource={classGoodsList?.result} pagination={pagination} />;
        </Card>
      </section>
    </>
  )
}

export default ClassifyGoods