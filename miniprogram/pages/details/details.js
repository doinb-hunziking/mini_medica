// miniprogram/pages/details/details.js

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    store:"阴间",
    medicine_info: { id: 1,name: "药品名称", price: '100', yunfei: 0, stock: 100, sales: 1, desc:'药品详情'},
    // medicine_img: [
    //   {'img': ''},
    //   {'img': '' },
    //   {'img': '' },
    //   {'img': '' },
    //   ],
    // indicatorDots: true,
    // autoplay: true,
    // interval: 5000,
    // duration: 1000,
  },
 
 
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist// 需要预览的图片http链接列表  
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  
onLoad: function (options) {
  var that = this
  that.setData({
    id:options.id
  })
  console.log(this.data.id)
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
  }
})