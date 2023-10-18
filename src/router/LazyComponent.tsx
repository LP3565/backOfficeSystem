import { Suspense } from 'react'
import type { ReactNode } from 'react'

const LazyComponent = (element: ReactNode) => {
  return (<Suspense fallback={'加载中..'}>
    {element}
  </Suspense>)
}

export default LazyComponent