const api = require("../../api/index");
const baseURI = require("../../api/base");
const util = require("../../utils/util");
Page({
  data: {
    avatarUrl: null,
    nickName: "",
    userId: 0
  },
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  onPageScroll: function() {},
  //item(index,pagePath,text)
  onTabItemTap: function(item) {},
  // 获取用户授权信息
  getUserInfo() {
    const uuid = util.createUUid();
    // 点击获取授权信息时将userId保存
    wx.setStorage({
      key: "userId",
      data: uuid,
      success: result => {},
      fail: () => {},
      complete: () => {}
    });

    wx.getUserInfo({
      success: res => {
        // 向数据库插入一条用户数据
        api
          .request(
            baseURI + "/task/add/user",
            {
              userId: uuid,
              avatar: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
              gender: res.userInfo.gender
            },
            "POST"
          )
          .then(resData => {
            if (resData.data) {
              this.setData({
                userId: uuid,
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              });
            }
          });
      }
    });
  }
});
