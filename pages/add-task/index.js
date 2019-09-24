//Page Object
Page({
  data: {
    startDate: "请选择",
    endDate: "请选择",
    taskName: "",
    taskType: "",
    estimateHour: "",
    taskDescription: ""
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
  },
  // 获取任务名称
  getTaskName(event) {
    this.setData({
      taskName: event.detail.value
    });
  },
  // 获取项目类型
  getTaskType(event) {
    this.setData({
      taskType: event.detail.value
    });
  },
  // 获取预计耗时
  getEstimateHour(event) {
    this.setData({
      estimateHour: event.detail.value
    });
  },
  // 获取项目描述
  getTaskDescription(event) {
    this.setData({
      taskDescription: event.detail.value
    });
  },
  // 保存任务
  saveTask() {
    wx.showToast({
      title: "保存成功",
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
