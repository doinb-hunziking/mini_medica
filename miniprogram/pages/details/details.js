// miniprogram/pages/details/details.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    id:'1',
    store:"阴间",
    medicine_info: { id: 1,name: "药品名称", price: '100', yunfei: 0, stock: 100, sales: 1, desc:'药品详情',image:''}

  },
 
  GoodsInfo: {},

 
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this
    that.setData({
      id:options.id
    })
    
    wx.request({
      url: "http://127.0.0.1:8000/goods/detail",
      data: {id:this.data.id },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data.medicine_info)
        that.setData({medicine_info:res.data.medicine_info,store:res.data.store})
      }
    })//获取参数,当用户通过分享进来页面时获取到id，根据id获取产品的信息
  },

  onReady:function(){
    let history = wx.getStorageSync("history") || [];
    history.push({id:this.data.id})
    wx.setStorage({
      data: history,
      key: 'history',
    })
    
  },
  // 点击 商品收藏图标
  handleCollect(){
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    this.GoodsInfo = this.data.medicine_info
    // 2 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.id === this.GoodsInfo.id);
    // 3 当index！=-1表示 已经收藏过 
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
        
    }else{
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })
      
      
  },

onShareAppMessage: function (res) {
  var that = this;
  var id=that.data.id;//获取产品id
  var name=that.data.name;//获取产品标题
  var img=that.data.goods_img;//产品图片
  if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: name,
        path: '/page/details?id=' +id,
        imageUrl:img //不设置则默认为当前页面的截图
      }
    }
},

// 点击 加入购物车
  buy() {
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    this.GoodsInfo = this.data.medicine_info
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.id === this.GoodsInfo.id);
    if (index === -1) {
      //3  不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 4 已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    })
  }
})