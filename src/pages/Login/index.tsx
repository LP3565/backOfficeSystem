import React from 'react'
import { Form, Input, Button, message } from 'antd'
import type { FormRule } from 'antd'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch } from '../../hooks/appStore'
import type { LoginData } from '../../types/user';
import styles from './index.module.css'
import { useAuth } from '../../hooks/useAuth';
import { useToken } from '../../hooks/token';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../services/user'
import { getUserInfo } from '../../store/reducers/user';
import { GloBalTitleType } from '../../types/global';

const Login: React.FC<GloBalTitleType> = ({ title }) => {
  document.title = title

  // 派发事件的方法
  const dispatch = useAppDispatch()
  const naviagte = useNavigate()
  const { setAuth } = useAuth()
  const { setToken } = useToken()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (values: LoginData): Promise<void | boolean> => {
    try {
      // 登录
      const res = await loginAPI(values)
      // 登录失败提示
      if (res.meta.status !== 200) return messageApi.error('账号或密码错误！')
      // 登录成功
      setAuth({ token: res.data.token })
      setToken(res.data.token)
      sessionStorage.setItem('USERINFO', JSON.stringify(res.data))
      dispatch(getUserInfo(res.data))
      messageApi.success('登录成功！')
      setTimeout(() => {
        naviagte('/home', { replace: true })
      }, 500)
    } catch (e) {
      messageApi.error(`${e}`)
    }
  };

  const usernameRule: FormRule[] = [
    { required: true, message: '请输入用户名！' }
  ]
  const passwordRule: FormRule[] = [
    { required: true, message: '请输入密码！' }
  ]


  return (
    <>
      {contextHolder}
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginBg}></div>
          <div className={styles.loginFormContainer}>
            <div className={styles.loginFormBox}>
              <Form
                name="normal_login"
                className={styles.loginForm}
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={usernameRule}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={passwordRule}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 100 + '%' }}>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
