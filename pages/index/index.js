import { redirectToTab, navigateToPage } from "../../utils/utils";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageDialogVisible: false, // 控制对话框的显示
    current: 2,
    autoplay: true,
    duration: 500,
    interval: 5000,
    paginationPosition: "bottom-right",
    swiperList: [], // Initialize as an empty array
    navigation: {
      type: "fraction",
    },
    value: "index",
    list: [
      { value: "index", icon: "home", ariaLabel: "首页" },
      { value: "app", icon: "app", ariaLabel: "软件" },
      { value: "chat", icon: "chat", ariaLabel: "聊天" },
      { value: "user", icon: "user", ariaLabel: "我的" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从全局数据获取是否要显示对话框
    const app = getApp();
    if (app.globalData.imageDialogVisible) {
      this.setData({
        imageDialogVisible: true,
      });
    }

    const imageCdn = "https://tdesign.gtimg.com/miniprogram/images";
    const swiperList = [
      `${imageCdn}/swiper1.png`,
      `${imageCdn}/swiper2.png`,
      `${imageCdn}/swiper1.png`,
      `${imageCdn}/swiper2.png`,
      `${imageCdn}/swiper1.png`,
    ];

    this.setData({
      swiperList, // Set swiperList in the data using setData
    });
  },
  handleConfirm() {
    // 用户点击确认后，弹出获取用户信息权限申请
    wx.getUserProfile({
      desc: "获取你的昵称、头像等信息", // 向用户说明授权用途
      success: (res) => {
        console.log("用户已授权获取用户信息", res.userInfo);
        const userInfo = res.userInfo;
        const app = getApp();
        app.globalData.userInfo = userInfo;
      },
      fail: (err) => {
        console.error("获取用户信息失败", err);
      },
    });

    // 关闭对话框，并更新全局数据
    this.setData({
      imageDialogVisible: false,
    });
    const app = getApp();
    app.globalData.imageDialogVisible = false;
  },

  closeDialog() {
    // 关闭对话框，并更新全局数据
    this.setData({
      imageDialogVisible: false,
    });
    const app = getApp();
    app.globalData.imageDialogVisible = false;
  },

  onChange(e) {
    const newValue = e.detail.value;
    const currentPath = getCurrentPages().slice(-1)[0].route;

    if (newValue !== this.data.value || currentPath !== newValue) {
      this.setData({ value: newValue });
      redirectToTab(newValue);
    }
  },
  toPage(event) {
    const url = event.currentTarget.dataset.url;
    console.log("url", url);
    navigateToPage(url);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
