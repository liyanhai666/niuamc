const app = getApp()
// pages/createBusinessCards/createBusinessCards.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      title: '资产牛人圈',
      showCapsule: true
    },
    seletedStr: "",
    seletedStr1: "",
    seletedStr2: "",
    ajxtrue: true,
    formList: {
      name: {
        label: "姓名",
        placeholder: '请填写姓名',
        name: 'name',
        rType: '1',
        maxlen: '4',
        value: ''
      },
      company: {
        label: "公司",
        placeholder: '请填写公司',
        name: 'company',
        rType: '1',
        maxlen: '25',
        value: ''
      },
      companyno: {
        label: "简称",
        placeholder: '请填写公司简称',
        name: 'companyno',
        rType: '1',
        maxlen: '15',
        value: ''
      },
      position: {
        label: "职位",
        placeholder: '请填写职位',
        name: 'position',
        rType: '1',
        maxlen: '5',
        value: ''
      },
      phone: {
        label: "手机",
        placeholder: '请填写手机号',
        name: 'phone',
        rType: '3',
        maxlen: '11',
        value: ''
      },
      wxno: {
        label: "微信",
        placeholder: '请填写微信号',
        name: 'wxno',
        rType: '2',
        maxlen: '25',
        value: ''
      },
      address: {
        label: "地址",
        placeholder: '请填写地址',
        name: 'address',
        rType: '0',
        maxlen: '30',
        value: ''
      },
      email: {
        label: "邮箱",
        placeholder: '请填写邮箱',
        name: 'email',
        rType: '0',
        maxlen: '30',
        value: ''
      },
      url: {
        label: "网址",
        placeholder: '请填写网址',
        name: 'url',
        rType: '0',
        maxlen: '30',
        value: ''
      }
    },
    checkboxList: [{
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
      },
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

  tsj: function (e) {
    var f = this.data.formList;
    f.wxno.value = f.phone.value;
    this.setData({
      formList: f
    })
  },
  getPhoneNumber(e) {
    var that = this
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) {}
      })
    } else {
      wx.request({
        url: app.globalData.url + '/cbms/wx/queryPhone',
        data: {
          "tel": e.detail, //微信小程序服务器返回的信息
          "openId": app.globalData.openid //openId  注意此处的openId 是我们通过 code(用户登录凭证) 去后台获取到的 openId
        },
        method: "GET",
        dataType: "json",
        success: function (result) {
          //无区号的手机号
          var c = that.data.formList
          c.phone.value = result.data.purePhoneNumber
          that.setData({
            formList: c
          })
        }
      })
    }
  },

  checkboxChange: function (event) {
    console.log('checkbox发生change事件，携带value值为：', event.detail.value)
    var temp = '';
    for (var i = 0; i < event.detail.value.length; i++) {
      if (i != 0) {
        temp += ",";
      }
      temp += event.detail.value[i];
    }

    this.setData({
      seletedStr: temp
    });
  },

  radioChange1: function (event) {
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
  },

  radioChange2: function (event) {
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
  // 自定义事件
  formSubmit: function (e) {
    /** 
    wx.redirectTo({
      url: '/pages/createSuccess/createSuccess'
    })*/
    var that = this
    if (e.detail.value.name === '' || e.detail.value.phone === '' || e.detail.value.company === '' || e.detail.value.companyno === '' || e.detail.value.position === '') {
      if (e.detail.value.name === '') {
        wx.showToast({
          title: '姓名必填',
          image: '/assets/images/error.png',
          duration: 2000
        })
      }
      if (e.detail.value.phone === '') {
        wx.showToast({
          title: '手机必填',
          image: '/assets/images/error.png',
          duration: 2000
        })
      }

      if (e.detail.value.company === '') {
        wx.showToast({
          title: '公司必填',
          image: '/assets/images/error.png',
          duration: 2000
        })
      }

      if (e.detail.value.companyno === '') {
        wx.showToast({
          title: '公司简称必填',
          image: '/assets/images/error.png',
          duration: 2000
        })
      }

      if (e.detail.value.position === '') {
        wx.showToast({
          title: '职位必填',
          image: '/assets/images/error.png',
          duration: 2000
        })
      }
    } else {

      if (e.detail.value.email != '') {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(e.detail.value.email)) {
          that.setData({
            ajxtrue: false
          })
          wx.showToast({
            title: '邮箱错误',
            image: '/assets/images/error.png',
            duration: 2000
          })
        } else {
          that.setData({
            ajxtrue: true
          })
        }
      }

      if (!(/^1[3456789]\d{9}$/.test(e.detail.value.phone))) {
        that.setData({
          ajxtrue: false
        })
        wx.showToast({
          title: '手机号有误',
          image: '/assets/images/error.png',
          duration: 2000
        })
      } else {
        that.setData({
          ajxtrue: true
        })
      }

      if (that.data.ajxtrue == true) {

        wx.request({
          //后台接口地址
          url: app.globalData.url + '/cbms/wx/addUserCard',
          data: {
            wxopenid: app.globalData.openid,
            name: e.detail.value.name,
            company: e.detail.value.company,
            title: e.detail.value.position,
            phone: e.detail.value.phone,
            wxno: e.detail.value.wxno,
            addr: e.detail.value.address,
            mail: e.detail.value.email,
            landline: e.detail.value.tel,
            fax: e.detail.value.companyno,
            web: e.detail.value.url,
            seletedStr: that.data.seletedStr
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.code == '0000') {
              app.globalData.isRegist = true
              app.globalData.name = e.detail.value.name
              app.globalData.isnew = false
              wx.redirectTo({
                url: '/pages/createSuccess/createSuccess'
              })
            } else {
              wx.showToast({
                title: '保存失败',
                image: '/assets/images/error.png',
                duration: 4000
              })
            }
          }
        })
      }
    }
  },
  // 监听输入框
  onInput: function (event) {
    let name = event.currentTarget.dataset.name,
      value = event.detail.value;

    var formList = this.data.formList;
    formList[name].value = value;
    this.setData({
      formList: formList
    });
  }
})