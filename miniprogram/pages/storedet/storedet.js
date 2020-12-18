// miniprogram/pages/orderdet/orderdet.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        that.setData({
            id:options.id
        })

        wx.request({
            url: "http://127.0.0.1:8000/store/store_det/",
            data: {id:that.data.id },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                that.setData({
                    name:res.data.name,
                    category: [
                    { name: '热销', id: 'a' },
                    { name: '全部', id: 'b' },
                    ],
                    detail: [
                    {
                        id: 'a',
                        cate: '热销',
                        detail: res.data.medlist
                    },
                    {
                        id: 'b',
                        cate: '全部',
                        detail: res.data.medlist0
                    },
                    ]
                })
                console.log(that.data)
            }
        })
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
    switchTab(e){
        const self = this;
        this.setData({
          isScroll: true
        })
        setTimeout(function(){
          self.setData({
            toView: e.target.dataset.id,
            curIndex: e.target.dataset.index
          })
        },0)
        setTimeout(function () {
          self.setData({
            isScroll: false
          })
        },1)
      },
  
      bindSearchInput: function (e) {
        this.setData({ search: e.detail.value });
      },
      onClickSearch:function(){
        var that = this
        wx.request({
          url: "http://127.0.0.1:8000/store/store_det/",
          data: { search_text:this.data.search,id:that.data.id},
          method: 'POST',
          dataType: 'json',
          success: function (res) {
              that.setData({
                    name:res.data.name,
                    category: [
                    { name: '本店', id: 'a' },
                    //   { name: '附近其他店铺', id: 'b' },
                    ],
                    detail: [
                    {
                        id: 'a',
                        cate: '本店',
                        detail: res.data.medlist
                    },
                    ]
              })
              console.log(that.data)
            
              if (res.data.medlist[0]){
                  wx.showToast({ title: "搜到了", icon:"success" });
              }
              else{
                  wx.showToast({ title: "搜不到哦", icon:"none" });
              }
          }
        })
      }
})