Page({
    data: {
        
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onLoad: function (options) {
      // 判断进入路由参数，进行相应路由渲染
        var that = this
        wx.getStorage({
            key: 'userInfo',
            success:function(res){
              that.setData({phone:res.data.phone})
              console.log(that.data)
              wx.request({
                url: "http://127.0.0.1:8000/orders/order_li/",
                data: {phone:that.data.phone},
                method: 'POST',
                dataType: 'json',
                success: function (res) {
                    that.setData({
                        category: [
                        { name: '全部', id: 'a' },
                        { name: '待支付', id: 'b' },
                        { name: '待配送', id: 'c' },
                        { name: '已送达', id: 'd' },
                        { name: '待评价', id: 'e' },
                        { name: '已完成', id: 'f' },
                        ],
                        detail: [
                        {
                            id: 'a',
                            cate: '全部',
                            detail: res.data.orderlist
                        },
                        {
                            id: 'b',
                            cate: '待支付',
                            detail: res.data.orderlist0
                        },
                        {
                            id: 'c',
                            cate: '待配送',
                            detail: res.data.orderlist1
                        },
                        {
                            id: 'd',
                            cate: '已送达',
                            detail: res.data.orderlist2
                        },
                        {
                            id: 'e',
                            cate: '待评价',
                            detail: res.data.orderlist3
                        },
                        {
                            id: 'f',
                            cate: '已完成',
                            detail: res.data.orderlist4
                        },
                        ]
                    })
                    console.log(that.data)
                }
            
            })
        
        }
    })
    },
    onReady(){
        // var self = this;
        // wx.request({
        //     url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
        //     success(res){
        //         self.setData({
        //             detail : res.data
        //         })
        //     }
        // });
        
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
    
})