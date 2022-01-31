import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import config from '../config'
import accessTokenState from '../recoil/atoms/accessTokenState'
import parseError from '../utils/parseError'
import useModifiedRecoilState from './useModifiedRecoilState'

axios.defaults.baseURL = config.apiUrl
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

const useAxiosInterceptors = () => {
  const [accessToken, _, removeAccessToken] = useModifiedRecoilState(accessTokenState)
  const [axiosReady, setAxiosReady] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((req) => {
      if (!req.headers) {
        req.headers = {}
      }
      if (accessToken) {
        req.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return req
    })
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error?.response?.status === 401) {
          removeAccessToken()
        }
        const message = parseError(error)
        return Promise.reject({ ...error, message })
      }
    )
    setAxiosReady(true)
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [navigate, accessToken])
  return axiosReady
}

export default useAxiosInterceptors
