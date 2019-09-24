//Page Object
Page({
  data: {
    hour: 8,
    itemList: [
      { title: "原型-首页模块", hour: 8 },
      { title: "原型-首页模块", hour: 8 },
      { title: "原型-首页模块", hour: 8 }
    ],
    date: "2019-09-09"
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
  // 时间选择
  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  }
});
