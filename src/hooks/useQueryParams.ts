import { parse } from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const useQueryParams = <T = Record<string, any>>(): T => {
  const { search } = useLocation()
  return useMemo(
    () =>
      parse(search, {
        parseBooleans: true,
        parseNumbers: true
      }) as unknown as T,
    [search]
  )
}

export default useQueryParams
