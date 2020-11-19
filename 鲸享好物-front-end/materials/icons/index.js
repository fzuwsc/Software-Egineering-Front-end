//index.js
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    pickerHidden: true,
    chosen: ''
  },

  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let vo = e.detail.value
    wx.request({
      url: 'http://106.14.209.11:11451/user/login/username',
      data: vo,
      method: "POST",
      success(res){
        console.log(res)
      }
    })
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
})
