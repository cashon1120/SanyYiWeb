
import axios from 'axios'
import Promise from 'es6-promise'
import { message } from 'antd'
import { DEV_MODEL } from '../config'
Promise.polyfill()
message.config({ maxCount: 1 }) // message 同时最多只显示一条
const request = axios.create()
if(DEV_MODEL === 1){
  axios.defaults.baseURL = ''
}else{
  axios.defaults.baseURL = '/api' 
}
request.defaults.timeout = 10000
request.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
request.interceptors.request.use(
  (config) => {
    if (config.data && config.data.$skipAuthHandler) {
      config.$skipAuthHandler = true
      delete config.data.$skipAuthHandler
    }
    if (config.params && config.params.$skipAuthHandler) {
      config.$skipAuthHandler = true
      delete config.params.$skipAuthHandler
    }
    let contentType = 'application/json; charset=utf-8'
    // 导出文件时候需要用formData格式请求
    if(config.url.indexOf('downloadFailureModel') > 0){
      contentType = 'application/x-www-form-urlencoded'
    }
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '**',
      'sany-token': localStorage.getItem('token') || '',
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);

request.interceptors.response.use(response => { 
    if (!response.data.code) {
      return response.data
    }
    if (response.data.code === 400) {
      window.location.href = '/login'
    } else {
      const { token } = response.headers
      if (token) {
        localStorage.setItem('token', `sany-kn;${token}`);
      }
      return response
    }
  },
  error => {
    const err = error.response;
    return Promise.reject(err)
  }
);

export default request