//Page Object
const api = require("../../api/index");
const baseURI = require("../../api/base");
Page({
  data: {
    startDate: "请选择",
    endDate: "请选择",
    taskId: 0,
    taskName: "",
    taskType: "",
    taskHour: 0,
    actualHour: 0,
    taskDes: ""
  },
  //options(Object)
  onLoad: function(options) {
    this.setData({
      taskId: options.id
    });
  },
  onReady: function() {},
  onShow: function() {
    api
      .request(baseURI + "/task/getDetails", { id: this.data.taskId }, "GET")
      .then(res => {
        this.setData({
          taskName: res.data[0].task_name,
          startDate: res.data[0].start_date,
          endDate: res.data[0].end_date,
          taskType: res.data[0].task_type,
          taskHour: res.data[0].task_hour,
          actualHour: res.data[0].actual_hour,
          taskDes: res.data[0].task_des
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
  },
  // 获取任务名称
  getTaskName(event) {
    this.setData({
      taskName: event.detail.value
    });
  },
  // 获取任务类型
  getTaskType(event) {
    this.setData({
      taskType: event.detail.value
    });
  },
  // 获取预计耗时
  getTaskHour(event) {
    this.setData({
      taskHour: event.detail.value
    });
  },
  // 获取实际耗时
  getActualHour(event) {
    this.setData({
      actualHour: event.detail.value
    });
  },
  // 获取任务描述
  getTaskDes(event) {
    this.setData({
      taskDes: event.detail.value
    });
  },
  // 保存任务
  saveTask() {
    api
      .request(
        baseURI + "/task/changeDetails",
        {
          taskName: this.data.taskName,
          taskType: this.data.taskType,
          taskHour: Number(this.data.taskHour),
          taskDes: this.data.taskDescription,
          id: Number(this.data.taskId),
          startDate: this.data.startDate,
          endDate: this.data.endDate,
          actualHour: Number(this.data.actualHour)
        },
        "POST"
      )
      .then(res => {
        if (res.data) {
          wx.showToast({
            title: "保存成功",
            icon: "success",
            image: "",
            duration: 1500,
            mask: false,
            success: result => {
              wx.reLaunch({
                url: "/pages/task/index",
                success: result => {},
                fail: () => {},
                complete: () => {}
              });
            },
            fail: () => {},
            complete: () => {}
          });
        }
      });
  },
  //删除任务
  deleteTask() {
    wx.showModal({
      title: "提示",
      content: "是否删除？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: result => {
        if (result.confirm) {
          api
            .request(
              baseURI + "/task/delete/taskItem",
              { id: this.data.taskId },
              "DELETE"
            )
            .then(res => {
              if (res.data) {
                wx.showToast({
                  title: "删除成功",
                  icon: "success",
                  image: "",
                  duration: 1500,
                  mask: false,
                  success: result => {
                    wx.reLaunch({
                      url: "/pages/task/index"
                    });
                  },
                  fail: () => {},
                  complete: () => {}
                });
              }
            });
        }
      },
      fail: () => {},
      complete: () => {}
    });
  }
});
