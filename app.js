//app.js
App({
  onLaunch: function (object) {
    //this.toLogin();
    this.globalData.fwurl = object.path;

    // 获取手机系统信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
      },
      fail(err) {
        this.globalData.navHeight = 66;
      }
    });
  },
  toLogin: function () {
    if (this.globalData.fwurl != '/pages/cardDetails/cardDetails' || this.globalData.fwurl != '/pages/share/share') {
      var that = this;
      return new Promise(function (resolve, reject) {
        console.log('********app.js*************');
        that.globalData.isexe = false
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId
            if (res.code) {
              var lcode = res.code
              wx.getSetting({
                success(res) {
                  that.globalData.isexe = true;
                  if (!that.globalData.issubex) {
                    if (res.authSetting['scope.userInfo']) {
                      that.globalData.isauth = true;
                      wx.getUserInfo({
                        withCredentials: true,
                        success: function (res_user) {
                          wx.request({

                            url: that.globalData.url + '/cbms/wx/getWxUerInfo',
                            data: {
                              code: lcode,
                              encryptedData: res_user.encryptedData,
                              iv: res_user.iv
                            },
                            method: 'GET',
                            header: {
                              'content-type': 'application/json'
                            },
                            success: function (res) {
                              let data = res.data;

                              if (data.code == '0000' && data.isnrq == '0') {
                                that.globalData.userInfo = res_user.userInfo;
                                that.globalData.openid = data.data.openid;
                                that.globalData.isnew = true;
                                wx.switchTab({
                                  url: '/pages/index/index'
                                })
                              } else if (data.code == '0000' && data.isnrq == '1') {
                                that.globalData.userInfo = res_user.userInfo;
                                that.globalData.openid = data.openid;
                                that.globalData.isRegist = true;
                                wx.switchTab({
                                  url: '/pages/index/index'
                                })
                              } else if (data.code == '0001') {
                                that.globalData.isnew = true;
                                that.globalData.isauth = false;
                                that.globalData.openid = data.openid;
                                wx.switchTab({
                                  url: '/pages/index/index'
                                })
                              } else {
                                /**
                                wx.redirectTo({
                                  url: '../auth/auth'
                                }) */
                                that.globalData.isauth = false
                                wx.switchTab({
                                  url: '/pages/index/index'
                                })
                              }
                            }
                          })
                        }
                      })
                    } else {
                      /**
                      wx.redirectTo({
                        url: '../auth/auth'
                      }) */
                      wx.request({

                        url: that.globalData.url + '/cbms/wx/getWxUerInfo',
                        data: {
                          code: lcode
                        },
                        method: 'GET',
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (res) {
                          let data = res.data;

                          if (data.code == '0000' && data.isnrq == '0') {
                            that.globalData.openid = data.data.openid;
                            that.globalData.isnew = true;
                            wx.switchTab({
                              url: '/pages/index/index'
                            })
                          } else if (data.code == '0000' && data.isnrq == '1') {
                            that.globalData.openid = data.openid;
                            that.globalData.isRegist = true;
                            wx.switchTab({
                              url: '/pages/index/index'
                            })
                          } else if (data.code == '0001') {
                            that.globalData.isnew = true;
                            that.globalData.isauth = false;
                            that.globalData.openid = data.openid;
                            wx.switchTab({
                              url: '/pages/index/index'
                            })
                          } else {
                            /**
                            wx.redirectTo({
                              url: '../auth/auth'
                            }) */
                            that.globalData.isauth = false;
                            wx.switchTab({
                              url: '/pages/index/index'
                            })
                          }
                        }
                      })
                      that.globalData.isauth = false
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    }
                  }
                }
              })

              if (!that.globalData.isexe) {

                that.globalData.issubex = true;
                wx.request({

                  url: that.globalData.url + '/cbms/wx/getWxUerInfo',
                  data: {
                    code: lcode
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    let data = res.data;

                    if (data.code == '0000' && data.isnrq == '0') {
                      that.globalData.openid = data.data.openid;
                      that.globalData.isnew = true;
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    } else if (data.code == '0000' && data.isnrq == '1') {
                      that.globalData.openid = data.openid;
                      that.globalData.isRegist = true;
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    } else if (data.code == '0001') {
                      that.globalData.isnew = true;
                      that.globalData.isauth = false;
                      that.globalData.openid = data.openid;
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    } else {
                      /**
                      wx.redirectTo({
                        url: '../auth/auth'
                      }) */
                      that.globalData.isauth = false
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    }
                  }
                })
                that.globalData.isauth = false
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            }
          },
          fail: res => {
            console.info(res);
          }
        })
      })
    }
  },
  globalData: {
    issubex: false,
    isexe: false,
    userInfo: null,
    // url: 'http://103.43.184.155:18088',
    url: 'https://www.niuamc.com',
    openid: null,
    isRegist: false,
    isauth: false,
    name: '',
    fwurl: "pages/load/load",
    isnew: false,
    navHeight: 0
  },
  // 设置自定义头部左侧按钮
  setNavIcon: function (self) {
    const pages = getCurrentPages();
    let navbarData = self.data.navbarData;
    navbarData.isBack = pages.length > 1 ? true : false;
    self.setData({
      navbarData: navbarData
    });
  }
})