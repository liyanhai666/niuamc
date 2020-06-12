import http from './http.js'

export const getData = {
  get: function () {
    return http.get('getData')
  }, // 获取用户地址列表
  post: function (data) {
    return http.post('getData', data)
  }, // 新增用户地址
  put: function (data) {
    return http.put(`getData/${data.id}`, data)
  }, // 修改用户地址
  delete: function (id) {
    return http.delete(`getData/${id}`)
  } // 删除用户地址
}