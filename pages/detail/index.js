//Page Object
const api = require("../../api/index");
Page({
  data: {
    detailLists: [],
    date: "选择时间"
  },
  //options(Object)
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {
    api
      .request("http://localhost:8080/detail/getLists", {}, "GET")
      .then(res => {
        const { detailLists } = res.data;
        const hour = detailLists.map(val => {
          return val.lists.reduce((total, currentVal) => {
            return (
              (total.actualHours ? total.actualHours : total) +
              currentVal.actualHours
            );
          });
        });
        const lists = detailLists.map((item, index) => {
          return Object.assign({}, item, { hour: hour[index] });
        });
        this.setData({
          detailLists: lists
        });
      });
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
  }
});
