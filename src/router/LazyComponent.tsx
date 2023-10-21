import { Suspense } from 'react'
import { Spin } from 'antd'
import type { ReactNode } from 'react'

const LazyComponent = (element: ReactNode) => {
  return (<Suspense fallback={<Spin />}>
    {element}
  </Suspense>)
}

export default LazyComponent