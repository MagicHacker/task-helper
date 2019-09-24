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
          url: "/pages/task/index",
          success: result => {},
          fail: () => {},
          complete: () => {}
        });
      },
      fail: () => {},
      complete: () => {}
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
      },
      fail: () => {},
      complete: () => {}
    });
  }
});
