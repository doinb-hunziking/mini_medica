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
        that.setData(res.data)
      }       
    })
    wx.getStorage({
      key: 'orderlist',
      success: function (res) {
        that.setData({orderlist:res.data})
      }
    })
    console.log(that.data)
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
            var c =wx.getStorageSync('cart')
            console.log(c)
            var nc = []
            for(var j = 0,len=c.length; j < len; j++){
              if (c[j].checked===false){
                nc.push(c[j])
              }
            }
            wx.setStorage({
              data: nc,
              key: 'cart',
            })
            wx.switchTab({
              url: '../orderlist/orderlist',
            })
          }
    })  
  },

  onUnload:function(){
    wx.removeStorage({key:'order'})
    wx.removeStorage({key:'orderlist'})
    this.setData({orderlist:[]})
  }

})
