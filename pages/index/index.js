Page({
  data: {
    inputShowed: false,
    inputVal: "",
    date_y: "",
    temperature: "",
    weather: "",
    wind: "",
    dressing_advice: ""
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  setWeather: function(doc){
   
    this.setData({
     
      date_y: doc.result.today.date_y,
      temperature: doc.result.today.temperature,
      weather: doc.result.today.weather,
      wind: doc.result.today.wind,
      dressing_advice: doc.result.today.dressing_advice
    });
  }
  ,
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  search: function(e) {
    this.setData({
      inputShowed: false
    });
    let that = this; //保留page函数中object的引用，这个地方非常重要
    //如果在下方wx.request中直接写this就变成wx.request()的this了
    //调用天气预报外部查询接口
    wx.request({
      url: "https://v.juhe.cn/weather/index",

      data: {
        format: '2',
        cityname: this.data.inputVal,
        key: 'e0782918e19f066bb3158eebdbeba77d'
      },
      success: function(res) {
        console.log(res.data.result.today); //控制台输出返回的内容
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
      fail: function() {
     
        //console.log(this); //这时候的this不是Page了
        that.setData({ //这个位置应该用page的引用调用
          modalHidden: false, 
          modalErrorText: "wx.request.fail-请求失败,请检测网络！"
        })
      },
      //无论成功与失败,loading都取消
      complete: function() {
    
        console.log("接口请求完成")

      }
    });
  }
});