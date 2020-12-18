// miniprogram/pages/userinfo/userinfo.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addr:"",
    name:"",
    desc:"",

  },

  getlocalpath: function(){
    var that = this
    wx.chooseLocation({
      success: function(res){
        that.setData({addr:res.address});
        console.log(res)
        wx.setStorage({
          data: {x:res.latitude, y:res.longitude},
          key: 'xy',
        })
      }
    })
  },

  bindnameInput: function(e){
    this.setData({name:e.detail.value})
  },

  bindaddrInput: function(e){
    this.setData({addr:e.detail.value})

  },

  binddescInput: function(e){
    this.setData({desc:e.detail.value})

  },

  onClickSubmit:function(e){
    if (app.globalData.userInfo==null){
      wx.showToast({
        title: '未登录，请先登录',
        icon:"none"
      })
      wx.navigateTo({
        url: '../auth/auth',
      })
    }else{
      if (this.data.name == ""|| this.data.addr =="") {
        wx.showToast({
          title: '姓名和收货地址不能为空',
          icon:"none"
        })
      }else{
        wx.request({
          url: "http://127.0.0.1:8000/user/edit/",
          data: { name: this.data.name, addr: this.data.addr, desc: this.data.desc, token:app.globalData.userInfo.token}, 
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            if (res.data.status) {
              wx.showToast({ title: "修改完成", icon: 'none' });

              // var pages = getCurrentPages();
              // prevPage = pages[pages.length-2];
              // 跳转会上一级页面
              wx.navigateBack({});
            } else {
              wx.showToast({ title: "修改失败", icon: 'none' });
            }
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  }
})