import axios from 'axios'
import config from '../config'

const axiosStrapi = axios.create({
  baseURL: config.strapiUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

export default axiosStrapi
