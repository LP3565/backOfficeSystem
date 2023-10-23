import React from 'react'
import type { FC } from 'react'
import { Row, Col, Tag, Divider, message } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import type { RolesChild } from '../../../types/roles'
import '../index.css'
import { deleteUserRoleAPI } from '../../../services/roles'

const RolesCard: FC<{ children: RolesChild[], id: number, refresh(): Promise<void | boolean> }> = ({ children, id, refresh }) => {
  const [messageApi, contextHolder] = message.useMessage()

  // 删除权限
  const onClose = async (e: React.MouseEvent<HTMLElement>, rid: number): Promise<void | boolean> => {
    e.preventDefault()
    const res = await deleteUserRoleAPI(id, rid)
    if (res.meta.status !== 200) return messageApi.info('删除权限失败!')
    refresh()
    messageApi.success('删除权限成功!')
  }

  return (
    <>
      {
        contextHolder
      }
      {
        children.map((item, i) => {
          return (
            <>
              <Row key={item.id}>
                <Col span={4} className='stair'>
                  <Tag color='blue' closeIcon={<CloseCircleOutlined />} onClose={(e) => onClose(e, item.id)} key={item.id}>
                    {item.authName}
                  </Tag>
                </Col>
                <Col span={20}>
                  {
                    item.children?.map((item2, i) => {
                      return (
                        <>
                          <Row key={item2.id}>
                            <Col span={4} >
                              <Tag color='gold' closeIcon={<CloseCircleOutlined />} onClose={(e) => onClose(e, item2.id)}>
                                {item2.authName}
                              </Tag>
                            </Col>
                            <Col span={20}>
                              {
                                item2.children?.map((item3) => {
                                  return (
                                    <>
                                      <Tag color='green' closeIcon={<CloseCircleOutlined />} onClose={(e) => onClose(e, item3.id)} key={item3.id}>
                                        {item3.authName}
                                      </Tag>
                                    </>
                                  )
                                })
                              }
                            </Col>
                          </Row>
                          {
                            i === item.children!.length - 1 ? '' : <Divider key={i + 1} />
                          }
                        </>
                      )
                    })
                  }
                </Col>
              </Row>
              {
                i === children.length - 1 ? '' : <Divider key={i} />
              }
            </>
          )
        })
      }
    </>
  )
}
export default RolesCard