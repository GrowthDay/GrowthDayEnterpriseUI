import { saveAs } from 'file-saver'
import moment from 'moment'
import { SnackbarKey, useSnackbar } from 'notistack'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import Loading from '../../components/Loading'
import { CsvFileType, XlsxFileType } from '../../utils/sheetsUtil'
import { ExportType, OrganizationUsersRequest } from '../queries/useOrganizationUsersQuery'

export const EXPORT_ORGANIZATION_USERS_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'EXPORT_ORGANIZATION_USERS']

const useExportOrganizationUsersMutation = (
  options: Omit<
    UseMutationOptions<Blob, unknown, ExportType, typeof EXPORT_ORGANIZATION_USERS_MUTATION_KEY>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  const snackbarKey = useRef<SnackbarKey>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  return useMutation(
    EXPORT_ORGANIZATION_USERS_MUTATION_KEY,
    async (exportType: ExportType) =>
      axiosGrowthDay.get<Blob>('/organizationUsers/download', {
        params: { offset: 0, limit: 0, exportType } as OrganizationUsersRequest,
        responseType: 'blob',
        headers: {
          Accept: exportType === ExportType.CSV ? XlsxFileType : CsvFileType
        }
      }),
    {
      ...options,
      onMutate: (...rest) => {
        snackbarKey.current = enqueueSnackbar('Downloading...', {
          autoHideDuration: null,
          action: () => <Loading size={24} position="static" />
        })
        return options.onMutate?.(...rest)
      },
      onSuccess: (data, variables, ...rest) => {
        closeSnackbar(snackbarKey.current)
        saveAs(data, `growthday-enterprise-users-${moment().format('DD-MM-YY-HH-mm-ss')}.${variables.toLowerCase()}`)
        return options.onSuccess?.(data, variables, ...rest)
      }
    }
  )
}

export default useExportOrganizationUsersMutation
