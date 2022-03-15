import { useReducer } from 'react'

const useForceUpdate = () => useReducer(() => ({}), {})[1]

export default useForceUpdate
