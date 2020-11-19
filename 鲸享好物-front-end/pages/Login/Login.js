// pages/firstPage/firstPage.js

//登录成功的页面跳转还没完成

Page({
  data: {
    //电话号码的值
    TeleNumber: '',
    //验证码的值
    CodeNumber: '',
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
      wx.request({
        url: '/user/sendCode',
        data: {
          phone: num
        },
        method: 'GET',
        success: function( res ) {
          console.log( res.data )
        },
        fail: function( res ) {
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
      })
    }
  },
  Login: function () {
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
        url: '/user/login/phone',
        data: {
          "phone": num,    //用户手机号
          "code": code            //短信验证码
        },
        header: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJST0xFIjoiUk9MRV9WSVNJVCxST0xFX1VTRVIiLCJpc3MiOiJGb3Jlc3RqQ2xpbWIiLCJpYXQiOjE1ODU3NDU0NjEsInN1YiI6ImFkbWluIiwiZXhwIjoxNTg1NzQ5MDYxfQ.YMbyRcFZnwKv4veuWfR248E5trGESHiCwcdxaHRQnao"
        },
        success: function ( res ) {
          console.log(res.data)
        },
        fail: function ( res ) {
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
      })
    }
  }
})