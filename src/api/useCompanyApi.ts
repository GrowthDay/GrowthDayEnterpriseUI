import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import { ICompanyRequest } from '../types/company'

export const COMPANY_QUERY_KEY = 'GROWTHDAY:COMPANY'

const useCompanyApi = (
  options: Omit<
    UseMutationOptions<void, unknown, ICompanyRequest, typeof COMPANY_QUERY_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => useMutation(COMPANY_QUERY_KEY, (input: ICompanyRequest) => axiosGrowthDay.post<void>('/company', input), options)
export default useCompanyApi
