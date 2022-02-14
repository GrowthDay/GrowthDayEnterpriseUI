import axios from 'axios'
import { forEach, sample } from 'lodash-es'
import { useQuery } from 'react-query'
import config from '../config'
import { ReportData } from '../routes/Reports/types'
import colors from '../routes/Reports/utils/colors'

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
      cacheTime: 1000 * 60 * 60,
      select: (apiData: any) => {
        const series = apiData?.series
        const data: ReportData = []
        forEach(series, (value, key) => {
          if ('all' in value) {
            if (key !== '$overall') {
              data.push({
                key,
                value: value.all,
                color: sample(colors)
              })
            }
          } else {
            forEach(value, (nestedValue, nestedKey) => {
              if ('all' in nestedValue && nestedKey !== '$overall') {
                data.push({
                  key: nestedKey,
                  value: nestedValue.all,
                  color: sample(colors)
                })
              }
            })
          }
        })
        return data
      }
    }
  )

export default useMixpanelApi
