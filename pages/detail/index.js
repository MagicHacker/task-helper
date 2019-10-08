//Page Object
const api = require("../../api/index");
const util = require("../../utils/util");
Page({
  data: {
    detailLists: [],
    date: "",
    exceptedHours: 0,
    actualHours: 0
  },
  //options(Object)
  onLoad: function(options) {
    this.setData({
      date: util.currentDate()
    });
  },
  onReady: function() {},
  onShow: function() {
    this.fetchData();
  },
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
    this.fetchData();
  },
  // 拉取数据
  fetchData() {
    const userId = wx.getStorageSync("userId");
    api
      .request(
        "http://localhost:8080/detail/getLists",
        { startDate: this.data.date, userId },
        "GET"
      )
      .then(res => {
        let excepted_hours = 0;
        let actual_hours = 0;
        res.data.forEach(item => {
          excepted_hours += item.task_hour;
          actual_hours += item.actual_hour;
        });
        this.setData({
          detailLists: res.data,
          exceptedHours: excepted_hours,
          actualHours: actual_hours
        });
      });
  }
});
