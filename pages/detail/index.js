//Page Object
Page({
  data: {
    detailList: [
      {
        date: "06月09日星期六",
        hour: 8,
        itemList: [{ title: "沟通需求" }]
      },
      {
        date: "06月08日星期五",
        hour: 8,
        itemList: [
          { title: "原型-首页模块" },
          { title: "原型-首页模块" },
          { title: "原型-首页模块" }
        ]
      },
      {
        date: "06月07日星期四",
        hour: 8,
        itemList: [{ title: "原型-首页模块" }, { title: "原型-首页模块" }]
      }
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
