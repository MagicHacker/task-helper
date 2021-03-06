//Page Object
const api = require("../../api/index");
Page({
  data: {
    taskList: [],
    taskId: 0
  },
  //options(Object)
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {
    const userId = wx.getStorageSync("userId");
    api
      .request("http://localhost:8080/task/getLists", { userId }, "GET")
      .then(res => {
        this.setData({
          taskList: res.data
        });
      });
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  onPageScroll: function() {},
  onTabItemTap: function(item) {},
  // 跳转到详情页
  navigateToDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/task-detail/index?id=" + id
    });
  },
  // 添加任务
  addTask() {
    // 添加之前先校验用户是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          wx.navigateTo({
            url: "/pages/add-task/index"
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "只有允许授权才能进一步使用，请允许授权哦~",
            showCancel: false,
            cancelText: "取消",
            confirmText: "确定",
            confirmColor: "#f37c7c",
            success: result => {},
            fail: () => {}
          });
        }
      },
      fail: () => {}
    });
  }
});
