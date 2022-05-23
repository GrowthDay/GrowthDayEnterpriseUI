import { useMemo, useReducer } from 'react'
import { PaginationParams } from '../types/ui/pagination'

const defaultPageParams: PaginationParams = { page: 0, size: 10 }

const usePageParams = (initialPageParams?: PaginationParams) => {
  const [pageParams, setPageParams] = useReducer(
    (prevState: PaginationParams, input: Partial<PaginationParams>) => ({ ...prevState, ...input }),
    { ...defaultPageParams, ...initialPageParams }
  )
  return useMemo(() => ({ defaultPageParams, pageParams, setPageParams }), [pageParams, setPageParams])
}

export default usePageParams
