// 设置token和获取token
export const useToken = () => {
  const token = sessionStorage.getItem('ACCESS_TOKEN')

  function setToken(value?: string) {
    sessionStorage.setItem('ACCESS_TOKEN', value!)
  }

  return {
    token,
    setToken,
  }
}
