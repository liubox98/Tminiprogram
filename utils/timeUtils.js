module.exports = {
  calculateTimeDiff(timeStamp) {
    const now = new Date();
    const postTime = new Date(timeStamp);
    const timeDiff = now - postTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}天前`;
    } else if (hours > 0) {
      return `${hours}小时前`;
    } else if (minutes > 0) {
      return `${minutes}分钟前`;
    } else {
      return `${seconds}秒前`;
    }
  },
};
