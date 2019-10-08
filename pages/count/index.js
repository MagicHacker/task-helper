const wxCharts = require("../../utils/wxcharts-min.js");
const api = require("../../api/index");
const baseURI = require("../../api/base");
const util = require("../../utils/util");
Page({
  data: {
    date: "周",
    timeDate: "上周",
    itemList: []
  },
  //options(Object)
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {
    this.fetchData(this.handleDate()).then(data => {
      this.pintCharts(data);
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
  // 切换导航栏
  chooseDate(event) {
    this.setData({
      date: event.target.dataset.date
    });
  },
  // TODO: 待优化
  chooseTime(event) {
    this.setData({
      timeDate: event.target.dataset.date
    });
    this.fetchData(this.handleDate()).then(data => {
      this.pintCharts(data);
    });
  },
  // 绘制charts
  pintCharts(data) {
    let taskHour = [];
    let actualHour = [];
    data.forEach(item => {
      taskHour.push(item.task_hour);
      actualHour.push(item.actual_hour);
    });
    new wxCharts({
      canvasId: "count-hours",
      type: "line",
      width: 350,
      height: 250,
      dataPointShape: "circle",
      dataLabel: true,
      legend: true,
      categories: [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日"
      ].slice(0, data.length),
      series: [
        {
          name: "预计耗时",
          data: taskHour
        },
        {
          name: "实际耗时",
          data: actualHour
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
  // 拉取数据
  fetchData(date) {
    return new Promise((resolve, reject) => {
      api
        .request(
          baseURI + "/count/getLists",
          {
            startDate: date,
            userId: 39442
          },
          "GET"
        )
        .then(res => {
          this.setData({
            itemList: res.data.slice(0, 3)
          });
          resolve(res.data);
        });
    });
  },
  // 处理日期 TODO: 待优化
  handleDate() {
    const time = new Date(util.currentDate());
    const month =
      time.getMonth() >= 0 && time.getMonth() <= 8
        ? "0" + (time.getMonth() + 1)
        : time.getMonth() + 1;
    const day = time.getDate() < 9 ? "0" + time.getDate() : time.getDate();
    return this.data.timeDate === "本周"
      ? util.currentDate()
      : `${time.getFullYear()}-${month}-${
          Number(day) - 7 < 9 ? "0" + (Number(day) - 7) : Number(day) - 7
        }`;
  }
});
