const api = require("../../api/index");
const baseURI = require("../../api/base");
const util = require("../../utils/util");
Page({
  data: {
    avatarUrl: null,
    nickName: "",
    userId: ""
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
  // 在未授权的情况下获取用户授权信息
  getUserInfo() {
    const userId = wx.getStorageSync("userId");
    const userInfo = wx.getStorageSync("userInfo");
    wx.getUserInfo({
      success: res => {
        // storage没有数据就添加，并且向数据库插入一条用户数据
        if (!userInfo) {
          api
            .request(
              baseURI + "/task/add/user",
              {
                userId: userId.substring(0, 6),
                avatar: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName,
                gender: res.userInfo.gender
              },
              "POST"
            )
            .then(resData => {
              if (resData.data) {
                this.setData({
                  userId: userId.substring(0, 6),
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName
                });
                wx.setStorage({
                  key: "userInfo",
                  data: JSON.stringify({
                    userId: userId.substring(0, 6),
                    ...res.userInfo
                  }),
                  success: result => {},
                  fail: () => {},
                  complete: () => {}
                });
              }
            });
        } else {
          this.setData({
            userId: JSON.parse(userInfo).userId,
            avatarUrl: JSON.parse(userInfo).avatarUrl,
            nickName: JSON.parse(userInfo).nickName
          });
        }
      },
      fail: res => {
        wx.showModal({
          title: "提示",
          content: "只有允许授权才能进一步使用，请允许授权哦~",
          showCancel: false,
          cancelText: "取消",
          cancelColor: "#000000",
          confirmText: "确定",
          confirmColor: "#f37c7c",
          success: result => {},
          fail: () => {},
          complete: () => {}
        });
      }
    });
  }
});
