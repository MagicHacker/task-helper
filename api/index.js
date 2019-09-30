// 封装request
const request = (
  url,
  params = {},
  method,
  header = { "content-type": "application/json" }
) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: params,
      method,
      header,
      success: data => {
        resolve(data);
      }
    });
  });
};
module.exports = {
  request
};
