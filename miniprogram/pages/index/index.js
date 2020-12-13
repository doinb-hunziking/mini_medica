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
        image:'',
        sales:'0',
        price:'60'
      },{
        id:2,
        name:'商品标题2',
        image:'',
        sales:'0',
        price:'70'
      }
    ],
    search:"",
  },

   /**
   * 生命周期函数--监听页面加载(第一次打开时会执行)
   */
  onLoad: function () {
    var that = this
    wx.request({
      url: "http://127.0.0.1:8000/goods/index/",
      data: { },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({dataList:res.data.dataList})
      }
    })
  },
  bindSearchInput: function (e) {
    this.setData({ search: e.detail.value });
  },
  onClickSearch:function(){
    var that = this
    wx.request({
      url: "http://127.0.0.1:8000/goods/search/",
      data: { name:this.data.search },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        
        if (res.data.status){
          that.setData({dataList:res.data.dataList});
          wx.showToast({ title: "搜到了", icon:"success" });
        }
        else{
          wx.showToast({ title: "搜不到哦", icon:"none" });
        }
      }
    })
  }
})