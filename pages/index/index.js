import { redirectToTab, navigateToPage } from "../../utils/utils";
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    console.log('url', url)
    navigateToPage(url)
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
