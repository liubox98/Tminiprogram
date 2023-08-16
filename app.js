// app.js
import gulpError from "./utils/gulpError";

App({
  globalData: {
    userInfo: null,
    openId: null,
    imageDialogVisible: false, // 控制对话框的显示
  },

  onLaunch() {
    // 在小程序启动时，设置一个变量控制对话框的显示
    this.globalData.imageDialogVisible = true;

    wx.cloud.init({
      env: "cloud1-3gl3nupz0f3eedfe",
      traceUser: true,
    });
  },

  // 在用户点击按钮时获取用户信息权限
  getUserInfoAndOpenId() {
    // 调用云函数获取用户的 openid
    wx.cloud.callFunction({
      name: "quickstartFunctions", // 使用您的云函数名称
      success: (res) => {
        if (res.result && res.result.userInfo.openId) {
          this.globalData.openId = res.result.userInfo.openId;
        }
      },
      fail: (err) => {
        console.error("获取 openid 失败！", err);
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
