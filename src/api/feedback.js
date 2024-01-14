import request from '@/utils/request'

const sendFeedbackCode = data => {
  return request({
    url: '/mfs/open/api/feedback/sendFeedbackCode',
    method: 'post',
    data
  })
}
const feedbackSave = data => {
  return request({
    url: '/mfs/open/api/feedback/save',
    method: 'post',
    data
  })
}
const getFeedbackList = status => {
  return request({
    url: '/mfs/open/api/feedback/data?page=1&limit=1000' + status,
    method: 'get'
  })
}
const getFeedbackInfo = id => {
  return request({
    url: '/mfs/open/api/feedback/info?id=' + id,
    method: 'get'
  })
}

export {
  sendFeedbackCode,
  feedbackSave,
  getFeedbackList,
  getFeedbackInfo
}

