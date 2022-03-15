import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import axiosStrapi from '../axios/axiosStrapi'
import accessTokenState from '../recoil/atoms/accessTokenState'
import parseError from '../utils/parseError'
import useModifiedRecoilState from './useModifiedRecoilState'

const useAxiosInterceptors = () => {
  const [accessToken, , removeAccessToken] = useModifiedRecoilState(accessTokenState)
  const [axiosReady, setAxiosReady] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const requestInterceptor = axiosGrowthDay.interceptors.request.use((req) => {
      if (!req.headers) {
        req.headers = {}
      }
      if (accessToken) {
        req.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return req
    })
    const responseInterceptor = axiosGrowthDay.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error?.response?.status === 401) {
          removeAccessToken()
        }
        const message = parseError(error)
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
  }, [removeAccessToken, navigate, accessToken])
  return axiosReady
}

export default useAxiosInterceptors
