const wxCharts = require("../../utils/wxcharts-min.js");
Page({
  data: {},
  //options(Object)
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {
    new wxCharts({
      canvasId: "count-hours",
      type: "line",
      width: 350,
      height: 250,
      dataPointShape: "circle",
      dataLabel: true,
      legend: true,
      categories: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      series: [
        {
          name: "预计耗时",
          data: [4, 7, 6, 4, 3, 10, 6]
        },
        {
          name: "实际耗时",
          data: [6, 9, 8, 6, 5, 12, 8]
        }
      ],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: "小时",
        min: 0
      }
    });
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  onPageScroll: function() {},
  //item(index,pagePath,text)
  onTabItemTap: function(item) {}
});
