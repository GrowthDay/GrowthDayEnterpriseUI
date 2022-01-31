import { isEqual } from 'lodash'
import { useRef } from 'react'

const useDeepCompare = <T>(value: T): T => {
  const latestValue = useRef(value)
  if (!isEqual(latestValue.current, value)) {
    latestValue.current = value
  }
  return latestValue.current
}

export default useDeepCompare
