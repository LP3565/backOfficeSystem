import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
import { routes } from './router/index'
import { RouterGuard } from './router/RouterGuard'
import LazyComponent from './router/LazyComponent'

function App() {

  return (
    <>
      {/* 注册路由 */}
      <Routes>
        <Route path='/' element={<Layout />}>
          {
            routes.map(route => {
              if (route.guard) {
                return (
                  // 守卫模块
                  <Route element={<RouterGuard />} key={route.key}>
                    <Route path={route.path} element={LazyComponent(<route.element title={route.title} />)} key={route.key}>
                      {
                        route.children ? route.children.map(child => <Route path={child.path} element={LazyComponent(<child.element title={child.title} />)} key={child.key} />) : ''
                      }
                      <Route path='/home' element={<Navigate to="/home/controlpanel" />} />
                    </Route>
                  </Route>
                )
              } else {
                // 公共模块
                return <Route path={route.path} element={LazyComponent(<route.element title={route.title} />)} key={route.key} />
              }
            })
          }
          <Route path='/' element={<Navigate to="/login" />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
