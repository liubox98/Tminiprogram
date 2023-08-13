import gulpError from "./utils/gulpError";
App({
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-3gl3nupz0f3eedfe", // 小程序云开发环境ID
      traceUser: true, // 记录用户访问数据
    });
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },

  onShow() {
    if (gulpError !== "gulpErrorPlaceHolder") {
      wx.redirectTo({
        url: `/pages/gulp-error/index?gulpError=${gulpError}`,
      });
    }
  },
});
