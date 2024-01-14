import request from '@/utils/request'
import qs from 'qs'

// /mfs/open/represent/data
const getRepresent = () => {
  return request({
    url: 'mfs/open/represent/data?page=' + 1 + '&limit=' + 1000,
    method: 'get'
  })
}

export {
  getRepresent
}
