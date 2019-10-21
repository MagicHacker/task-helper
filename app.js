//app.js
const api = require("./api/index");
const baseURI = require("./api/base");
App({
  onLaunch: function() {
    // 小程序一加载就静默登录
    // 先校验是否存在登录信息
    if (wx.getStorageSync("userId")) {
      // 校验登录态是否过期
      wx.checkSession({
        success: res => {
          // 未过期
        },
        fail: () => {
          // 已过期，重新登录
          this.wxLogin();
        }
      });
    } else {
      this.wxLogin();
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  },
  // 小程序登录逻辑
  wxLogin() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          api
            .request(baseURI + "/task/login", { code: res.code }, "GET")
            .then(({ data }) => {
              const { openId, sessionKey } = data;
              wx.setStorage({
                key: "userId",
                data: openId
              });
              wx.setStorage({
                key: "sessionKey",
                data: sessionKey
              });
            });
        }
      }
    });
  }
});
