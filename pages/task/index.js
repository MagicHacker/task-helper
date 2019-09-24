//Page Object
Page({
  data: {
    taskList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    // taskList: []
  },
  //options(Object)
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
