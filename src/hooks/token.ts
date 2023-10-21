// 设置token和获取token
export const useToken = () => {
  function setToken(value?: string) {
    sessionStorage.setItem('ACCESS_TOKEN', value!)
  }
  const token = sessionStorage.getItem('ACCESS_TOKEN')
  return { token, setToken }
}
