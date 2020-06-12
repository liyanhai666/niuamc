const app = getApp()
// pages/cardDetails/cardDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      title: '名片详情',
      showCapsule: true
    },
    cur: 0,
    tabs: [{
      field: 'phone',
      icon: 'iconshouji',
      txt: '',
      type: '1'
    }, {
      field: 'wxno',
      icon: 'iconweixin',
      txt: '',
      type: '2'
    }, {
      field: 'email',
      icon: 'iconduanxin',
      txt: '',
      type: '2'
    }, {
      field: 'addr',
      icon: 'iconbangonglou',
      txt: '',
      type: '2'
    }],
    name: '',
    company: '',
    companyno: '',
    position: '',
    phone: '',
    wxno: '',
    addr: '',
    play: '',
    share: 'none',
    btn2: 'none',
    btn3: 'none',
    id: '',
    sysInfo: '',
    code: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavIcon(this);

    if (options.share == '1111') {
      this.setData({
        share: ''
      })
    }

    if (app.globalData.isnew == true) {
      this.setData({
        btn2: ''
      })
    }

    var wxopenid = options.wxopenid

    if (wxopenid != app.globalData.openid) {
      this.setData({
        btn3: ''
      })
    }

    this.setData({
      id: options.wxopenid
    })
    var that = this
    wx.request({
      //后台接口地址
      url: app.globalData.url + '/cbms/wx/getUerCardInfo',
      data: {
        wxopenid: wxopenid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data

        if (data.code == '0000') {
          var f = that.data.tabs
          f[0].txt = data.data.phone
          f[1].txt = data.data.wxno
          f[2].txt = data.data.mail
          f[3].txt = data.data.addr
          //f[4].txt = data.data.landline
          that.setData({
            name: data.data.name,
            company: data.data.company,
            companyno: data.data.fax,
            position: data.data.title,
            phone: data.data.phone,
            wxno: data.data.wxno,
            addr: data.data.addr,
            tabs: f
          })
        } else {
          wx.showToast({
            title: '查询失败',
            image: '/assets/images/error.png',
            duration: 3000
          })

          if (app.globalData.isnew) {
            wx.navigateTo({
              url: '/pages/load/load'
            })
          }
        }

      }
    })

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
  onShareAppMessage: function (res) {
    console.log(res.from);


    if (res.from === 'button') {
      let defaultImageUrl = '',
        imageUrl = '';
      return {
        title: '请加入我的不良资产管理行业精英牛人圈。',
        path: '/pages/cardDetails/cardDetails?share=1&wxopenid=' + this.data.id,
        imageUrl: imageUrl || defaultImageUrl,
        success(res) {

        },
        fail: function (res) {
          console.log("转发失败！");
        }
      };
    } else {
      let defaultImageUrl = '/assets/images/share/share.png',
        imageUrl = '';
      return {
        title: '请加入我的不良资产管理行业精英牛人圈。',
        path: '/pages/share/share?wxopenid=' + this.data.id,
        imageUrl: imageUrl || defaultImageUrl,
        success(res) {

        },
        fail: function (res) {
          console.log("转发失败！");
        }
      };
    }
  },
  // 自定义事件
  tabChange: function (e) {
    let f = this.data.tabs;
    let txt = f[e.currentTarget.dataset.index].txt;
    if (txt === '') {
      // this.setData({
      //   play: 'none'
      // })
      // wx.showToast({
      //   title: 'Ta没留下联系方式',
      //   duration: 2000
      // })
    } else {
      this.setData({
        cur: e.currentTarget.dataset.index
      });
    }
  },
  // 复制
  copy: function () {
    var data = this.data.tabs[this.data.cur].txt;
    if (data != '') {
      wx.setClipboardData({
        data: data,
        success(res) {
          wx.showToast({
            title: '复制成功',
            duration: 2000
          })
        }
      })
    }
  },
  // 呼叫
  call: function () {
    var phone = this.data.tabs[this.data.cur].txt;
    if (phone != '') {
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    }
  },
  index: function () {
    wx.navigateTo({
      url: '/pages/load/load'
    })
  }
})