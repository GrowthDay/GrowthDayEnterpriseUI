import { saveAs } from 'file-saver'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { OrganizationUsersRequest } from '../queries/useOrganizationUsersQuery'

export const EXPORT_ORGANIZATION_USERS_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'EXPORT_ORGANIZATION_USERS']

const useExportOrganizationUsersMutation = (
  options: Omit<
    UseMutationOptions<Blob, unknown, void, typeof EXPORT_ORGANIZATION_USERS_MUTATION_KEY>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  const { enqueueSnackbar } = useSnackbar()
  return useMutation(
    EXPORT_ORGANIZATION_USERS_MUTATION_KEY,
    () =>
      axiosGrowthDay.get<Blob>('/organizationUsers/download', {
        params: { offset: 0, limit: 0, invitationPending: false } as OrganizationUsersRequest,
        responseType: 'blob',
        headers: {
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      }),
    {
      ...options,
      onMutate: (...rest) => {
        enqueueSnackbar('Downloading...')
        return options.onMutate?.(...rest)
      },
      onSuccess: (data, ...rest) => {
        saveAs(data, `growthday-enterprise-users-${moment().format('DD-MM-YY-HH-mm-ss')}.xlsx`)
        return options.onSuccess?.(data, ...rest)
      }
    }
  )
}

export default useExportOrganizationUsersMutation
