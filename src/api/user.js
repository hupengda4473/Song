import request from '@/utils/request'
import qs from 'qs'

// /mfs/open/represent/data
const getUserInfo = () => {
  return request({
    url: '/mfs/open/api/user/info',
    method: 'get'
  })
}

export {
  getUserInfo
}
