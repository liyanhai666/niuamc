const app = getApp()
// components/circle/circle.js
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
    toView: '',
    navHeight: app.globalData.navHeight,
    letters: [],
    groups: [],
    seletedStr: "",
    seletedStr1: "",
    seletedStr2: "",
    navHeight: app.globalData.navHeight,
    checkboxList: [{
        name: '找资金',
        value: 'zzc',
        checked: ''
      },
      {
        name: '找资产',
        value: 'zzj',
        checked: ''
      },
      {
        name: '招人',
        value: 'zgz',
        checked: ''
      },
      {
        name: '找工作',
        value: 'zr',
        checked: ''
      }
    ],
    radioList1: [{
      name: '找资金',
      value: '找资金',
      checked: '',
      id: 'zzj'
    },
    {
      name: '找资产',
      value: '找资产',
      checked: '',
      id: 'zzc'
    }
  ],
  radioList2: [
  {
    name: '招人',
    value: '招人',
    checked: '',
    id: 'zr'
  },
  {
    name: '找工作',
    value: '找工作',
    checked: '',
    id: 'zgz'
  }
]
  },

  created: function () {
    wx.showToast({
      title: '数据加载中',
      duration: 2500
    })
  },
  attached: function () {
    var that = this;
    wx.request({
      //后台接口地址
      url: app.globalData.url + '/cbms/wx/getNrqInfo',
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

          var f = that.data.groups
          var c = that.data.letters

          c = data.data.letters
          f = data.data.groups

          that.setData({
            letters: c,
            groups: f
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
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickScroll: function (e) {
      var id = e.currentTarget.dataset.id;
      this.setData({
        toView: id
      })
    },
    scroll: function (e) {

    },
    checkboxChange: function (event) {
      var that = this

      // if (event.detail.value ='zzc' && event.detail.checked) {
      //   this.data.checkboxList.
      // }
     // event.d
     console.log('checkbox发生change事件，携带value值为：', that)

      console.log('checkbox发生change事件，携带value值为：', event.detail.value)
      var temp = '';
      for (var i = 0; i < event.detail.value.length; i++) {
        if (i != 0) {
          temp += ",";
        }
        temp += event.detail.value[i];
      }

      console.log('checkbox发生change事件，携带temp值为：', temp)

      this.setData({
        seletedStr: temp
      });

      wx.request({
        //后台接口地址
        url: app.globalData.url + '/cbms/wx/getNrqInfo',
        data: {
          wxopenid: app.globalData.openid,
          seletedStr: that.data.seletedStr
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let data = res.data
          if (data.code == '0000') {

            var f = that.data.groups
            var c = that.data.letters

            c = data.data.letters
            f = data.data.groups

            that.setData({
              letters: c,
              groups: f
            })
          }
        }
      });
    },

    radioChange1: function (event) {
      var that = this
      console.log('checkbox发生change事件，携带value值为：', event.detail.value)
      var temp = '';
      if (this.data.seletedStr2 === ''){
        temp = event.detail.value;
      }else{
        temp = this.data.seletedStr2 +',' +event.detail.value;
      }
      this.data.seletedStr1 = event.detail.value;
      console.log('checkbox发生change事件，携带temp值为：',temp)
      this.setData({
        seletedStr: temp
      });

      wx.request({
        //后台接口地址
        url: app.globalData.url + '/cbms/wx/getNrqInfo',
        data: {
          wxopenid: app.globalData.openid,
          seletedStr: that.data.seletedStr
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let data = res.data
          if (data.code == '0000') {

            var f = that.data.groups
            var c = that.data.letters

            c = data.data.letters
            f = data.data.groups

            that.setData({
              letters: c,
              groups: f
            })
          }
        }
      });

    },
  
    radioChange2: function (event) {
      var that = this
      console.log('checkbox发生change事件，携带value值为：', event.detail.value)
      var temp = '';
      if (this.data.seletedStr1 === ''){
        temp = event.detail.value;
      }else{
        temp = this.data.seletedStr1 +',' +event.detail.value;
      }
      this.data.seletedStr2 = event.detail.value;
      console.log('checkbox发生change事件，携带temp值为：',temp)
      this.setData({
        seletedStr: temp
      });

      wx.request({
        //后台接口地址
        url: app.globalData.url + '/cbms/wx/getNrqInfo',
        data: {
          wxopenid: app.globalData.openid,
          seletedStr: that.data.seletedStr
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let data = res.data
          if (data.code == '0000') {

            var f = that.data.groups
            var c = that.data.letters

            c = data.data.letters
            f = data.data.groups

            that.setData({
              letters: c,
              groups: f
            })
          }
        }
      });
    },

    handleClick: function (event) {
      var data = event.currentTarget.dataset
      wx.navigateTo({
        url: '/pages/cardDetails/cardDetails?wxopenid=' + data.id
      })
    }
  }
})