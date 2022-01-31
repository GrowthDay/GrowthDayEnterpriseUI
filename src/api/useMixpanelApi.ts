import axios from 'axios'
import { keys, values } from 'lodash-es'
import { useQuery } from 'react-query'
import config from '../config'

export const MIXPANEL_QUERY_KEY = 'MIXPANEL'

const axiosMixpanel = axios.create({
  baseURL: config.mixpanel.apiUrl,
  params: {
    project_id: config.mixpanel.projectId
  },
  auth: {
    username: config.mixpanel.username,
    password: config.mixpanel.password
  }
})
axiosMixpanel.interceptors.response.use((response) => response.data)

const useMixpanelApi = <T = any>(bookmark_id: number | string) =>
  useQuery(
    [MIXPANEL_QUERY_KEY, bookmark_id],
    () =>
      axiosMixpanel.get<T>('/insights', {
        params: { bookmark_id }
      }),
    {
      select: (apiData: any) => ({
        title: keys(apiData?.series)[0],
        data: values(apiData?.series)[0] ?? {}
      })
    }
  )

export default useMixpanelApi
