import axios from 'axios'
import config from '../config'

const axiosGrowthDay = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export default axiosGrowthDay
