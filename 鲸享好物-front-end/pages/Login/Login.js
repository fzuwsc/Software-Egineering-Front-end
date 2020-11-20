// pages/firstPage/firstPage.js

//登录成功的页面跳转还没完成

Page({
  data: {
    //电话号码的值
    TeleNumber: '',
    //验证码的值
    CodeNumber: '',

    btnValue: '获取验证',
    btnDisabled: false,
    second: 60
  },
  //得到输入的内容
  TeleNumberInput: function (e) {
    this.setData({ TeleNumber: e.detail.value })
  },
  //得到验证码
  CodeNumberInput: function (e) {
    this.setData({ CodeNumber: e.detail.value })
  },
  //发送验证码
  SendCode: function () {
    console.log('请求验证码')
    var num=this.data.TeleNumber;
    var flg=0;
    //检查手机号码是否合法
    if(num.length==0){
      flg==1;
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        success ( res ) {
          if ( res.confirm ) {
            console.log( '用户点击确定' )
          } else if ( res.cancel ) {
            console.log( '用户点击取消' )
          }
        }
      })
    }
    else if( !(/^1[3456789]\d{9}$/.test( num )) ){ 
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码',
        success ( res ) {
          if ( res.confirm ) {
            console.log( '用户点击确定' )
          } else if ( res.cancel ) {
            console.log( '用户点击取消' )
          }
        }
      })
      flg=1;
    }
    //调用后端接口
    if( !flg ){
      var that=this;
      wx.request({
        url: 'http://106.14.209.11:11451/user/sendCode',
        data: {
          phone: num
        },
        method: 'GET',
        success: function( res ) {
          if( res.data.status==200 ){
            console.log( res.data )
            that.timer();
          }
        },
        fail: function( res ) {
          if( res.data.status!=200 ){
            wx.showModal({
              title: '提示',
              content: res.data,
              success ( res ) {
                if ( res.confirm ) {
                  console.log( '用户点击确定' )
                } else if ( res.cancel ) {
                  console.log( '用户点击取消' )
                }
              }
            })
          }
        }
      })
    }
  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second+'s',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  Login: function () {
    console.log('请求登录')
    var num=this.data.TeleNumber;
    var code=this.data.CodeNumber;
    var flg=0;
    //验证手机号码和验证码
    if (num.length == 0) { 
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        success ( res ) {
          if ( res.confirm ) {
            console.log( '用户点击确定' )
          } else if ( res.cancel ) {
            console.log( '用户点击取消' )
          }
        }
      })
      flg=1;
    }
    if(num.length!=0&&code.length==0){
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        success ( res ) {
          if ( res.confirm ) {
            console.log( '用户点击确定' )
          } else if ( res.cancel ) {
            console.log( '用户点击取消' )
          }
        }
      })
      flg=1;
    }
    if(!flg){
      wx.request({
        url: 'http://106.14.209.11:11451/user/login/phone ',
        data: {
          phone: num,    //用户手机号
          code: code            //短信验证码
        },
        method: 'POST',
        header: {
          Authorization: wx.getStorageSync("token")
        },
        success: function ( res ) {
          if( res.data.status==200 ){
            wx.setStorageSync("token", res.header.Authorization);
            console.log(res.data)
            wx.switchTab({
              url: '../explorePage/explorePage'
            })
          }
        },
        fail: function ( res ) {
          if( res.data.status!=200 ){
            wx.showModal({
              title: '提示',
              content: res.data,
              success ( res ) {
                if ( res.confirm ) {
                  console.log( '用户点击确定' )
                } else if ( res.cancel ) {
                  console.log( '用户点击取消' )
                }
              }
            })
          }
        }
      })
    }
 }
})