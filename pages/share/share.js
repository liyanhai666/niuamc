let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      title: '资产牛人圈',
      showCapsule: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavIcon(this);
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

  index: function () {
    wx.navigateTo({
      url: '/pages/load/load'
    })
  }
})