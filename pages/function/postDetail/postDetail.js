// pages/function/postDetail/postDetail.js
import { getPostList, handleThumbUp } from "../../../utils/post";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    post: null,
    videoPath: null,
  },

  handleThumbUp() {
    const post = this.data.post;

    handleThumbUp(
      post,
      () => {
        // 更新点赞数量和点赞状态
        post.likes += 1;
        post.isLiked = true;

        this.setData({
          post: post,
        });
        console.log("点赞成功");
      },
      () => {
        console.error("点赞失败");
      }
    );
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const post = JSON.parse(options.post);
    const videoPath = post.file.find((item) => item.includes(".mp4"));
    this.setData({
      post: post,
      videoPath: videoPath || "",
    });

    // 在详情页加载时重新获取帖子信息，以确保点赞状态和数量正确
    getPostList((postList) => {
      const updatedPost = postList.find((item) => item._id === post._id);
      this.setData({
        post: updatedPost,
      });
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
