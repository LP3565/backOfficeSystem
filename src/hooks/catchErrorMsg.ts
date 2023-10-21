import { message } from 'antd'

export const useCatchErrorMsg = () => {
  const [messageApi] = message.useMessage()
  function showCatchError() {
    messageApi.error('出错了,请重启再试!')
  }
  return { showCatchError }
}
