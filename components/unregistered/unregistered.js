const app = getApp()
// components/null/null.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    sysInfo: '',
    code:'',
  },
  created:function(){
    var that = this
    wx.getSystemInfo({
      success(res) {
        that.data.sysInfo = res
      }
    }),
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId
        if (res.code) {
          that.data.code = res.code
        }
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toRegist() {
      // 去制作名片
      if(app.globalData.isauth){
        wx.navigateTo({
          url: '/pages/createBusinessCards/createBusinessCards'
        })
      }
    },
    bindGetUserInfo(e) {
    
      var that = this
      if (e.detail.userInfo && !app.globalData.isauth) {
        
        wx.request({
          //后台接口地址
          url: app.globalData.url + '/cbms/wx/wxAuth',
          data: {
            code: that.data.code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sysinfo: that.data.sysInfo,
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            app.globalData.isauth = true;
            let data = res.data;
            app.globalData.userInfo = e.detail.userInfo;
            app.globalData.openid = data.data.openid;
            /**
            var uL = '/pages/index/index'
            wx.switchTab({
              url: uL,
              success:function(e){
                var page = getCurrentPages().pop();
                if(page ==undefined || page == null){
                  return;
                }
        
                page.onLoad();
              }
            })
            wx.navigateTo({
              url: uL
            }) */

            wx.navigateTo({
              url: '/pages/createBusinessCards/createBusinessCards'
            })
  
          }
        })
      }
  }
}
})