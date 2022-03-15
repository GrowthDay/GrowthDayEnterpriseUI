import { useEffect, useState } from 'react'

type WindowDimension = {
  width: number
  height: number
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowDimension>({
    width: window.innerWidth,
    height: window.innerHeight
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

export default useWindowSize
