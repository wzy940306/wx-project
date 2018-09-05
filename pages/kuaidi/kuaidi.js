Page({
  data: {
    inputVal:'',
    datetime: "",
    remark: "",
    inputShowed: false,
    accounts: ["顺丰", "申通", "圆通", "韵达", "天天", "EMS", "中通", "汇通"],
    accountIndex: 0,
    nowpick :"sf"
  },

  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    var index = e.detail.value
  
    var p = ""
    switch (index){
      case "0": p = "sf" ;break; 
      case "1": p = "st"; break; 
      case "2": p = "yt"; break; 
      case "3": p = "yd"; break; 
      case "4": p = "tt"; break; 
      case "5": p = "EMS"; break; 
      case "6": p = "zt"; break; 
      case "7": p = "ht"; break; 
    }

    this.setData({
      accountIndex: e.detail.value,
      nowpick : p
     
    })


  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });

  },
  setWeather: function (doc) {
    var list = doc.result.list
    var list1 = list[list.length - 1]
    console.log(list1)
    this.setData({

      datetime: list1.datetime,
      remark: list1.remark,
   
      
    });
  } , bindKeyInput: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  
  search: function (e) {
    console.log(this.data.inputVal)
    this.setData({
      inputShowed: false
    });
    let that = this; 
    wx.request({
      url: "https://v.juhe.cn/exp/index",

      data: {

        com: this.data.nowpick,
        no: this.data.inputVal,
        key:"bf4c028915997a74a8f3ed0d47ea2d73"
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
    });}
});