import { useRef, useEffect } from 'react'
import type { Location } from 'react-router-dom'

const useFromPath = (value: Location) => {
  const ref = useRef<Location>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default useFromPath
