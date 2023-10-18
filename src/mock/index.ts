import * as mockJs from 'mockjs'

export const controlpanelList = mockJs.mock('/mock/control', 'get', () => {
  const res = mockJs.mock([
    {
      id: 1,
      title: '用户注册量',
      count: 5600,
      rise: 14,
    },
    {
      id: 2,
      title: '商品发布量',
      count: 8000,
      rise: 24,
    },
    {
      id: 3,
      title: '商品交易量',
      count: 12000,
      rise: 20,
    },
    {
      id: 4,
      title: '交易失败量',
      count: 1000,
      rise: 10,
    },
  ])

  return {
    data: res,
    meta: {
      status: 200,
      msg: '获取成功',
    },
  }
})
