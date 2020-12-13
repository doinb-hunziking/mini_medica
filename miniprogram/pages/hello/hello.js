// miniprogram/pages/hello/hello.js

Page({
  data:{
    emotions: ['serene', 'hehe', 'ecstatic', 'sad', 'terrified'],
colors: {
  serene: '#64d9fe',
  hehe: '#d3fc1e',
  ecstatic: '#f7dc0e',
  sad: '#ec238a',
  terrified: '#ee1aea'
},
    firstTime:'0',
    flag:true
  },
  onBindTap:function(){
    var D=(new Date()).getDate().toString();
    if(D != wx.getStorageSync('D')){
      wx.setStorageSync('D', D);
      wx.setStorage({
        key: 'FirstTime',
        data: (parseInt(this.data.firstTime) + 1).toString(),
      })
      var that = this;
      var firstTime = wx.getStorage({
        key: 'FirstTime',
        success: function (res) {
          that.setData({
            firstTime: res.data,
            flag:false
          })
          wx.showToast({
            title: '签到成功！',
            icon: 'success',
            duration: 1200,
            mask: true
          })
        },
      })
    }else{
      wx.showToast({
        title: '今日打卡已完成！',
        icon:'loading',
        duration:1200,
        mask:true
      })
    }
  },
  onShow:function(options){
    var that = this;
    var firstTime = wx.getStorage({
      key: 'FirstTime',
      success: function (res) {
        that.setData({
          firstTime: res.data
        })
      },
    })
    var D = (new Date()).getDate().toString();
    if (D != wx.getStorageSync('D')){
      this.setData({
        flag:true
      })
    }else{
      this.setData({
        flag:false
      })
    }
  },
  setCalendarColor(year, month) {
    year = year || new Date().getFullYear()
    month = month || new Date().getMonth() + 1
    // 从数据库读取数据
    getEmotionByOpenidAndDate(this.data.openid, year, month)
      .then((r) => {
        const data = r.data || []
        const styles = []
        const now = new Date()
        const today = dateFormat(now)
        let todayEmotion = ''
        let colors = this.data.colors
        // 遍历日期，存在表情的日期则设置对应的颜色
        data.forEach((v) => {
          let ts = v.tsModified
          let date = new Date(ts)
          let day = date.getDate()
          if (today === dateFormat(date)) {
            todayEmotion = v.emotion || ''
          }
          styles.push({
            month: 'current',
            day,
            color: 'black',
            background: colors[v.emotion]
          })
        })
        // 设置 daysStyle
        this.setData({
          lastMonth: `${year}-${('00' + month).slice(-2)}`,
          showPublish: true,
          todayEmotion,
          daysStyle: styles
        })
      })
      .catch((e) => {
        wx.showToast({
          title: '加载已签数据失败，请稍后再试',
          icon: 'none',
          duration: 3000
        })
      })
  }
})