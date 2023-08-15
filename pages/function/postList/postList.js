// pages/function/postList/postList.js

import { calculateTimeDiff } from "../../../utils/timeUtils";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    postList: null,
  },
  handleClick() {
    wx.navigateTo({
      url: "/pages/function/post/post",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  navigateToPostDetail(event) {
    const index = event.currentTarget.dataset.index;
    const post = this.data.postList[index];
    wx.navigateTo({
      url: `/pages/function/postDetail/postDetail?post=${JSON.stringify(
        post
      )}`,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const db = wx.cloud.database();
    db.collection("post")
      .orderBy("createtime", "desc")
      .get({
        success: (res) => {
          const postList = res.data.map((item) => {
            const formattedTime = calculateTimeDiff(item.createtime);
            return { ...item, formattedTime }; // 使用对象展开运算符添加 formattedTime 属性
          });
          this.setData({
            postList: postList,
          });
          console.log('postList', postList)
        },
      });
  },

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
