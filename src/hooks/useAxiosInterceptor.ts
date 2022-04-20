import { SnackbarKey, useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import axiosStrapi from '../axios/axiosStrapi'
import accessTokenState, { AccessTokenStateType } from '../recoil/atoms/accessTokenState'
import organizationIdState, { OrganizationIdStateType } from '../recoil/atoms/organizationIdState'
import parseError from '../utils/parseError'
import useModifiedRecoilState from './useModifiedRecoilState'

const useAxiosInterceptors = () => {
  const snackbarKey = useRef<SnackbarKey>()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const organizationId = useRecoilValue(organizationIdState)
  const [accessToken, , resetAccessToken] = useModifiedRecoilState(accessTokenState)
  const resetOrganizationId = useResetRecoilState(organizationIdState)
  const [axiosReady, setAxiosReady] = useState(false)

  const paramsRef = useRef<{ organizationId: OrganizationIdStateType; accessToken: AccessTokenStateType }>({
    accessToken,
    organizationId
  })

  paramsRef.current = {
    accessToken,
    organizationId
  }

  useEffect(() => {
    const requestInterceptor = axiosGrowthDay.interceptors.request.use((req) => {
      if (!req.headers) {
        req.headers = {}
      }
      if (paramsRef.current.accessToken) {
        req.headers['Authorization'] = `Bearer ${paramsRef.current.accessToken}`
      }
      if (paramsRef.current.organizationId) {
        req.headers['organization-id'] = paramsRef.current.organizationId
      }
      return req
    })
    const responseInterceptor = axiosGrowthDay.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (snackbarKey.current) {
          closeSnackbar(snackbarKey.current)
        }
        const message = parseError(error)
        if (error?.response?.status === 401) {
          resetAccessToken()
          resetOrganizationId()
        } else if (message) {
          snackbarKey.current = enqueueSnackbar(message, { variant: 'error' })
        }
        return Promise.reject({ ...error, message })
      }
    )
    const responseInterceptor2 = axiosStrapi.interceptors.response.use((response) => response.data)
    setAxiosReady(true)
    return () => {
      axiosGrowthDay.interceptors.request.eject(requestInterceptor)
      axiosGrowthDay.interceptors.response.eject(responseInterceptor)
      axiosStrapi.interceptors.response.eject(responseInterceptor2)
    }
  }, [closeSnackbar, enqueueSnackbar, resetAccessToken, resetOrganizationId])

  return axiosReady
}

export default useAxiosInterceptors
