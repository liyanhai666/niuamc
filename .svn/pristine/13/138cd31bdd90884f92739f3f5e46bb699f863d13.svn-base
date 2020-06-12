const app = getApp()
Component({
  properties: {
    navbarData: { //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {}
    }
  },
  data: {

  },
  attached: function () {
    // 定义导航栏的高度   方便对齐
    this.setData({
      navHeight: app.globalData.navHeight
    })
  },
  methods: {
    // 返回上一页面
    _navback: function () {
      wx.navigateBack()
    },
    //返回到首页
    _backhome: function () {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})