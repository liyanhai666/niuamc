import {
  config
} from './http.config.js'

function getHeader() {
  if (wx.getStorageSync('token')) {
    return {
      'content-type': 'application/json',
      'x-token': wx.getStorageSync('token')
    }
  }
  return {
    'content-type': 'application/json'
  }
}

function showErrToast(e) {
  wx.showToast({
    title: e,
    icon: 'none',
    duration: 1500
  })
}

function getPromise(url, data, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.baseUrl}${url}`,
      header: getHeader(),
      method: method,
      data: data,
      success: function (res) {
        if (res.data.code === "200") {
          resolve(res)
        } else {
          reject(res.data.message)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  }).catch(function (e) {
    showErrToast(e)
  })
}

const http = {
  get: (url, data) => {
    return getPromise(url, data, 'GET')
  },
  post: (url, data) => {
    return getPromise(url, data, 'POST')
  },
  put: (url, data) => {
    return getPromise(url, data, 'PUT')
  },
  delete: (url, data) => {
    return getPromise(url, data, 'DELETE')
  }
}

export default http