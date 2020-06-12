const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sysInfo: '',
    code:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var prePage = wx.getStorageSync('page');
    if (!prePage) {
      prePage = 'app';
    }

    console.log('********auth.js*************');
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

  bindGetUserInfo(e) {
    
    var that = this
    var prePage = wx.getStorageSync('page');
    if (!prePage) {
      prePage = 'app';
    }
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      
      wx.request({
        //后台接口地址
        url: app.globalData.url + '/cbms/wx/wxAuth',
        data: {
          code: that.data.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sysinfo: that.data.sysInfo,
          invcode:that.data.yqrinvcode,
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
          var uL = '../index/index';
          if (prePage == 'app') {
            uL = '../index/index'
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
          } else if (prePage == 'personCenter') {
            uL = '../bindPhone/bindPhone'
          }
          wx.navigateTo({
            url: uL
          })

        }
      })
    } else {
      var uL = '../index/index';
      if (prePage == 'app') {
        uL = '../index/index'
        wx.switchTab({
          url: uL
        })
      }
      /** else if (prePage == 'personCenter') {
        uL = '../personalCenter/personalCenter'
        wx.switchTab({
          url: uL
        })
      }*/
      wx.navigateTo({
        url: uL
      })
    }
  },

  cancel(e) {
    var prePage = wx.getStorageSync('page');
    if (!prePage) {
      prePage = 'app';
    }
    var uL = '../index/index';
    if (prePage == 'app') {
      uL = '../index/index'
      wx.switchTab({
        url: uL
      })
    }
    /** else if (prePage == 'personCenter') {
      uL = '../personalCenter/personalCenter'
      wx.switchTab({
        url: uL
      })
     }*/
    wx.navigateTo({
      url: uL
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.globalShare();
  }
})