// pages/index/index.js

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    dataList:[
      {
        id:1,
        name:'商品标题1',
        img:'',
        sales:'0',
        price:'60'
      },{
        goods_id:2,
        name:'商品标题2',
        img:'',
        sales:'0',
        price:'70'
      }
    ],
  },

   /**
   * 生命周期函数--监听页面加载(第一次打开时会执行)
   */
  onLoad: function () {
    var that  =this
    wx.request({
      url: "http://127.0.0.1:8000/goods/index/",
      data: { },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data.dataList)
        that.setData({dataList:res.data.dataList})

      }
    })
  }
})