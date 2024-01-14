import request from '@/utils/request'
import qs from 'qs'

const sendLoginCode = data => {
  return request({
    url: '/mfs/open/sendLoginCode',
    method: 'post',
    data
  })
}
const phoneLogin = data => {
  return request({
    url: '/mfs/open/phoneLogin',
    method: 'post',
    data
  })
}

export {
  sendLoginCode,
  phoneLogin
}

