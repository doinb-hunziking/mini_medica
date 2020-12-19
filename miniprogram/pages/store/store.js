Page({
    data: {
        
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'a'
    },
    onLoad: function (options) {
      // 判断进入路由参数，进行相应路由渲染
        var that = this
        wx.getStorage({
            key: 'xy',
            success:function(res){
                that.setData({xy:res.data})
                console.log(that.data)
              wx.request({
                url: "http://127.0.0.1:8000/store/store_li/",
                data: res.data,
                method: 'POST',
                dataType: 'json',
                success: function (res) {
                    that.setData({
                        category: [
                        { name: '推荐', id: 'a' },
                        { name: '500米内', id: 'b' },
                        { name: '1000米内', id: 'c' },
                        { name: '1500米内', id: 'd' },
                        { name: '2000米内', id: 'e' },
                        { name: '2500米内', id: 'f' },
                        ],
                        detail: [
                        {
                            id: 'a',
                            cate: '推荐',
                            detail: res.data.stlist
                        },
                        {
                            id: 'b',
                            cate: '500米内',
                            detail: res.data.stlist0
                        },
                        {
                            id: 'c',
                            cate: '1000米内',
                            detail: res.data.stlist1
                        },
                        {
                            id: 'd',
                            cate: '1500米内',
                            detail: res.data.stlist2
                        },
                        {
                            id: 'e',
                            cate: '2000米内',
                            detail: res.data.stlist3
                        },
                        {
                            id: 'f',
                            cate: '2500米内',
                            detail: res.data.stlist4
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

    bindSearchInput: function (e) {
      this.setData({ search: e.detail.value });
    },
    onClickSearch:function(){
      var that = this
      wx.request({
        url: "http://127.0.0.1:8000/store/store_li/",
        data: { search_text:this.data.search, x:that.data.xy.x, y:that.data.xy.y},
        method: 'POST',
        dataType: 'json',
        success: function (res) {
            that.setData({
                category: [
                { name: '推荐', id: 'a' },
                { name: '500米内', id: 'b' },
                { name: '1000米内', id: 'c' },
                { name: '1500米内', id: 'd' },
                { name: '2000米内', id: 'e' },
                { name: '2500米内', id: 'f' },
                ],
                detail: [
                {
                    id: 'a',
                    cate: '推荐',
                    detail: res.data.stlist
                },
                {
                    id: 'b',
                    cate: '500米内',
                    detail: res.data.stlist0
                },
                {
                    id: 'c',
                    cate: '1000米内',
                    detail: res.data.stlist1
                },
                {
                    id: 'd',
                    cate: '1500米内',
                    detail: res.data.stlist2
                },
                {
                    id: 'e',
                    cate: '2000米内',
                    detail: res.data.stlist3
                },
                {
                    id: 'f',
                    cate: '2500米内',
                    detail: res.data.stlist4
                },
                ]
            })
            console.log(that.data)
          
            if (res.data.stlist[0]){
                wx.showToast({ title: "搜到了", icon:"success" });
            }
            else{
                wx.showToast({ title: "搜不到哦", icon:"none" });
            }
        }
      })
    },
    onShow:function(e){
        this.onLoad();
    },
    
})