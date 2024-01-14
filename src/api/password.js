import request from '@/utils/request'
import qs from 'qs'

export function emailPush(params) {
  return request({
    url: 'push/email?email=' + params,
    method: 'get'
  })
}

export function outlookPush(data) {
  return request({
    url: '/push/user',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function pinPush(data) {
  return request({
    url: '/pin/push',
    method: 'post',
    data
  })
}
