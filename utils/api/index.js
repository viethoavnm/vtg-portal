/**
 * Genarate common requestor
 * Author: viethoavnm
 */
import Axios from 'axios'
import api from './api'
import { BASE_URL } from 'consts'

const services = Axios.create({
  baseURL: BASE_URL,
  withCredentials: false
})
addInterceptors(services)

/**
 * Genarate interceptors for axios instantce
 */
function addInterceptors(instance) {
  return instance.interceptors.response.use(function (response) {
    try {
      if (response.config.noAuth) {
        return response.data
      }
      if (response.data.value) {
        return response.data.value
      }
      return Promise.reject()
    } catch (error) {
      return Promise.reject(error)
    }
  }, function (error) {
    return Promise.reject(error)
  })
}

/**
 * 
 */
export default api(services)