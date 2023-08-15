// pages/function/postDetail/postDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    post: null,
    videoPath: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const post = JSON.parse(options.post);
    const videoPath = post.file.find((item) => item.includes(".mp4"));
    this.setData({
      post: post,
      videoPath: videoPath || "", // 如果不存在视频，则置为空字符串
    });
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
