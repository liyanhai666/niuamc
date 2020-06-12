const app = getApp()
// pages/myCard/myCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      title: '我的名片',
      showCapsule: false
    },
    isRegist: app.globalData.isRegist, // 是否注册
    name: '姓名',
    company: '公司',
    companyno: '',
    position: '职务',
    phone: '手机号',
    wxno: '',
    addr: '',
    reload: false
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      let defaultImageUrl = '',
        imageUrl = '';
      return {
        title: '请加入我的不良资产管理行业精英牛人圈。',
        path: '/pages/cardDetails/cardDetails?share=1&wxopenid=' + app.globalData.openid,
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
        path: '/pages/share/share?wxopenid=' + app.globalData.openid,
        imageUrl: imageUrl || defaultImageUrl,
        success(res) {

        },
        fail: function (res) {
          console.log("转发失败！");
        }
      };
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    let navbarData = this.data.navbarData;
    navbarData.isBack = pages > 1 ? true : false;
    this.setData({
      navbarData: navbarData
    });

    this.setData({
      isRegist: app.globalData.isRegist
    });
    var that = this;
    if (this.data.isRegist || this.data.reload) {
      wx.request({
        //后台接口地址
        url: app.globalData.url + '/cbms/wx/getUerCardInfo',
        data: {
          wxopenid: app.globalData.openid
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let data = res.data
          if (data.code == '0000') {
            app.globalData.name = data.data.name;
            app.globalData.isRegist = true;
            that.setData({
              name: data.data.name,
              company: data.data.company,
              companyno: data.data.fax,
              position: data.data.title,
              phone: data.data.phone,
              wxno: data.data.wxno,
              addr: data.data.addr,
              isRegist: true
            })
          } else {
            wx.showToast({
              title: '查询失败',
              image: '/assets/images/error.png',
              duration: 4000
            })
          }
        }
      });
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
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    this.onLoad(currentPage.options);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      reload: false
    });
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
  // 自定义事件
  toEdit: function () {
    wx.navigateTo({
      url: '/pages/cardEdit/cardEdit'
    })
  },
  onReload: function () {
    this.setData({
      reload: true
    });
  }
})