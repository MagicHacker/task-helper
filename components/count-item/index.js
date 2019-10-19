//Component Object
const util = require("../../utils/util");
const wxCharts = require("../../utils/wxcharts-min");
const api = require("../../api/index");
const baseURI = require("../../api/base");
Component({
  properties: {
    date: {
      type: String,
      value: "周",
      observer: function(value) {
        this.setData({
          isNext: false,
          previousText: value === "年" ? `去${value}` : `上${value}`,
          nextText: value === "年" ? `今${value}` : `本${value}`
        });
        this.fetchData(
          this.handleDay(this.data.previousText),
          this.data.previousText
        ).then(data => {
          this.pintCharts(data);
        });
      }
    }
  },
  data: {
    isNext: false,
    previousText: "上周",
    nextText: "本周",
    itemList: []
  },
  methods: {
    chooseTime(event) {
      const timeDate = event.target.dataset.date;
      const isSwitch = ["本", "今"].some(item => timeDate.includes(item));
      this.setData({
        isNext: isSwitch
      });
      this.fetchData(this.handleDay(timeDate), timeDate).then(data => {
        this.pintCharts(data);
      });
    },
    // 拉取数据
    fetchData(date, dateType) {
      return new Promise((resolve, reject) => {
        api
          .request(
            baseURI + "/count/getLists",
            {
              startDate: date,
              userId: 39442,
              dateType
            },
            "GET"
          )
          .then(res => {
            this.setData({
              itemList: res.data.slice(0, 3)
            });
            if (this.data.itemList.length !== 0) {
              resolve(res.data);
            }
          });
      });
    },
    // 处理日期 TODO: 待优化
    handleDay(dateText) {
      const time = new Date(util.currentDate());
      const month =
        time.getMonth() >= 0 && time.getMonth() <= 8
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      const day = time.getDate() < 9 ? "0" + time.getDate() : time.getDate();
      return dateText === "本周"
        ? util.currentDate()
        : `${time.getFullYear()}-${month}-${
            Number(day) - 7 < 9 ? "0" + (Number(day) - 7) : Number(day) - 7
          }`;
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
        componentInstance: this,
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
    }
  },
  // 组件的生命周期
  lifetimes: {
    created: function() {},
    attached: function() {},
    ready: function() {},
    moved: function() {},
    detached: function() {}
  },
  // 组件所在页面的生命周期
  pageLifetimes: {
    show() {
      this.fetchData(this.handleDay(), "上周").then(data => {
        this.pintCharts(data);
      });
    }
  },
  created: function() {},
  attached: function() {},
  ready: function() {},
  moved: function() {},
  detached: function() {}
});
