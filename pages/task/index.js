//Page Object
const api = require("../../api/index");
Page({
  data: {
    taskList: []
  },
  //options(Object)
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {
    api.request("http://localhost:8080/task/getLists", {}, "GET").then(res => {
      this.setData({
        taskList: res.data.taskLists
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
  navigateToDetail() {
    wx.navigateTo({
      url: "/pages/task-detail/index"
    });
  },
  // 添加任务
  addTask() {
    wx.navigateTo({
      url: "/pages/add-task/index"
    });
  }
});
