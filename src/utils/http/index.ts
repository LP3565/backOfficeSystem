import axios from 'axios'
import {
  CreateAxiosDefaults,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from 'axios'
import { useToken } from '../../hooks/token'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 数据返回的基本数据类型
interface Data<T> {
  data: T
  meta: {
    msg: string
    status: number
  }
}

const httConfig: CreateAxiosDefaults = {
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 5000,
}

class HttpClient {
  constructor() {
    this.requestInterceptors()
    this.responseInterptors()
  }

  static axiosInstance: AxiosInstance = axios.create(httConfig)

  // 请求拦截器
  private requestInterceptors() {
    HttpClient.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 设置token
        const { token } = useToken()
        if (token) config.headers.Authorization = token

        // 开启加载条
        NProgress.start()

        return config
      },
      (e: AxiosError) => console.log(e)
    )
  }

  // 响应拦截器
  private responseInterptors() {
    HttpClient.axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 关闭加载条
        NProgress.done()

        return res
      },
      (e: AxiosError) => console.log(e)
    )
  }

  // 封装请求方法
  request<T>(
    method: Method,
    url: string,
    params?: AxiosRequestConfig,
    options?: InternalAxiosRequestConfig
  ): Promise<Data<T>> {
    const config = { method, url, ...params, ...options }
    return new Promise((resolve, reject) => {
      HttpClient.axiosInstance
        .request(config)
        .then((res: AxiosResponse<Data<T>>) => resolve(res.data))
        .catch((e) => reject(e))
    })
  }
}

const http = new HttpClient().request
export default http
