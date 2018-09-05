Page({
  data: {
    inputShowed: false,
    inputVal: "",
    city: "",
    AQI: "",
    date: "",
    quality:""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false

    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  setWeather: function (doc) {

    this.setData({

      city: doc.result[0].citynow.city,
      AQI: doc.result[0].citynow.AQI,
      date: doc.result[0].citynow.date,
      quality: doc.result[0].citynow.quality,
    
    });
  }
  ,
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  search: function (e) {
    this.setData({
      inputShowed: false
    });
    let that = this; //保留page函数中object的引用，这个地方非常重要
    //如果在下方wx.request中直接写this就变成wx.request()的this了
    //调用天气预报外部查询接口
    wx.request({
      url: "http://web.juhe.cn:8080/environment/air/cityair",

      data: {
       
        city: this.data.inputVal,
        key: '4768a6a9d0197278d2c4436651a5a4a8'
      },
      success: function (res) {
        console.log(res.data); //控制台输出返回的内容
        if (res.data.resultcode == 200) {
          console.log('1')
          that.setWeather(res.data)
        } else {
          that.setData({ //这个位置应该用page的引用调用
            modalHidden: false,
            modalErrorText: '查询失败：' + res.data.desc
          });
        }

      },
      //失败,弹出modal
      fail: function () {

        //console.log(this); //这时候的this不是Page了
        that.setData({ //这个位置应该用page的引用调用
          modalHidden: false,
          modalErrorText: "wx.request.fail-请求失败,请检测网络！"
        })
      },
      //无论成功与失败,loading都取消
      complete: function () {

        console.log("接口请求完成")

      }
    });
  }
});