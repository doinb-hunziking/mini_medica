// miniprogram/pages/orderconfirm/orderconfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{receiver:"tyc"},
    orderlist:[
      {med_name:'aaa',med_price:6,med_count:2},
      {med_name:'aaa',med_price:6,med_count:2}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onReady()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.getStorage({
      key: 'order',
      success: function (res) {
        that.setData({order:res.data.order})
      }       
    })
    wx.getStorage({
      key: 'orderlist',
      success: function (res) {
        that.setData({orderlist:res.data})
      }
    })
  },

  doConfirm: function(){
    wx.request({
      url: "http://127.0.0.1:8000/orders/order_add/",
      data: { phone:this.data.order.phone,list:this.data.orderlist,pay_method:1},
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            wx.showToast({
              title: '好耶',
            })
            wx.removeStorage({key:'order'})
            wx.removeStorage({key:'orderlist'})
            wx.switchTab({
              url: '../index/index',
            })
          }
    })  
  }
})
