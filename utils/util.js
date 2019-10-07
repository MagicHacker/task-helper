const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
// 生成6位随机数
const createUUid = () => {
  return Math.floor(Math.random() * 100000 + 1);
};
// 获取当前时间
const currentDate = () => {
  const date = new Date();
  const month =
    date.getMonth() >= 0 && date.getMonth() <= 8
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
  return `${date.getFullYear()}-${month}-${day}`;
};
module.exports = {
  formatTime,
  createUUid,
  currentDate
};
