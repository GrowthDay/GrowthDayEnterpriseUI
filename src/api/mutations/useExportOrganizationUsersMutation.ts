import { saveAs } from 'file-saver'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { PagedResultOrganizationUser } from '../../types/api'
import { jsonToXlsxFile } from '../../utils/sheetsUtil'

export const EXPORT_ORGANIZATION_USERS_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'EXPORT_ORGANIZATION_USERS']

const useExportOrganizationUsersMutation = (
  options: Omit<
    UseMutationOptions<PagedResultOrganizationUser, unknown, void, typeof EXPORT_ORGANIZATION_USERS_MUTATION_KEY>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  const { enqueueSnackbar } = useSnackbar()
  return useMutation(
    EXPORT_ORGANIZATION_USERS_MUTATION_KEY,
    () => axiosGrowthDay.get<PagedResultOrganizationUser>('/organizationUsers', { params: { offset: 0, limit: 0 } }),
    {
      ...options,
      onMutate: (...rest) => {
        enqueueSnackbar('Downloading...')
        return options.onMutate?.(...rest)
      },
      onSuccess: (data, ...rest) => {
        if (data.results?.length) {
          const file = jsonToXlsxFile(data.results ?? [])
          saveAs(file, `growthday-enterprise-users-${moment().format('DD-MM-YY-HH-mm-ss')}.xlsx`)
        }
        return options.onSuccess?.(data, ...rest)
      }
    }
  )
}

export default useExportOrganizationUsersMutation
