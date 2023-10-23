import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { routes } from './router/index'
import { RouterGuard } from './router/RouterGuard'
import LazyComponent from './router/LazyComponent'
import useFromPath from './hooks/useFromPath';

function App() {

  const location = useLocation()
  const preLocation = useFromPath(location)

  return (
    <>
      {/* 注册路由 */}
      <Routes>
        {
          routes.map(route => {
            if (route.guard) {
              return (
                // 守卫模块
                <Route element={<RouterGuard />} key={route.key}>
                  <Route path={route.path} element={LazyComponent(<route.element title={route.title} />)} key={route.key}>
                    {
                      route.children ? route.children.map(child => {
                        if (!child.isLazy) {
                          return <Route path={child.path} element={<child.element title={child.title} />} key={child.key} />
                        } else {
                          return <Route path={child.path} element={LazyComponent(<child.element title={child.title} />)} key={child.key} />
                        }
                      }) : ''
                    }
                    <Route path='/home' element={<Navigate to="/home/controlpanel" />} />
                  </Route>
                </Route>
              )
            } else {
              // 公共模块
              return <Route path={route.path} element={<route.element title={route.title} fromPath={preLocation?.pathname} />} key={route.key} />
            }
          })
        }
      </Routes>
    </>
  )
}

export default App
