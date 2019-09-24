//Page Object
Page({
  data: {
    startDate: "请选择",
    endDate: "请选择"
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
  // 选择开始时间
  chooseStartDate(event) {
    this.setData({
      startDate: event.detail.value
    });
  },
  // 选择结束时间
  chooseEndDate(event) {
    this.setData({
      endDate: event.detail.value
    });
  }
});
