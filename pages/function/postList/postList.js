// pages/function/postList/postList.js
import { getPostList, handleThumbUp } from "../../../utils/post";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: "", // 搜索关键词
    postList: [], // 原始帖子列表数据
    filteredPostList: [], // 过滤后的帖子列表数据
  },
  handleClick() {
    wx.navigateTo({
      url: "/pages/function/post/post",
    });
  },

  // 使用封装的函数
  handleThumbUp(event) {
    const index = event.currentTarget.dataset.index;
    const postList = this.data.postList;
    const item = postList[index];

    handleThumbUp(item, () => {
      // 更新点赞状态
      item.likes += 1;
      item.isLiked = true;

      // 更新过滤后的帖子列表
      const filteredPostList = this.data.filteredPostList.map((post) => {
        if (post._id === item._id) {
          return { ...post, likes: item.likes, isLiked: true };
        }
        return post;
      });

      this.setData({
        postList: postList,
        filteredPostList: filteredPostList,
      });

      console.log("点赞成功");
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  // 输入框输入事件
  handleSearchInput(event) {
    const keyword = event.detail.value.trim().toLowerCase();

    // 根据关键词过滤帖子列表
    const filteredPostList = this.data.postList.filter(
      (post) =>
        post.content.toLowerCase().includes(keyword) ||
        post.tags.includes(keyword)
    );

    this.setData({
      value: keyword,
      filteredPostList: filteredPostList,
    });
  },

  navigateToPostDetail(event) {
    const index = event.currentTarget.dataset.index;
    const post = this.data.postList[index];
    wx.navigateTo({
      url: `/pages/function/postDetail/postDetail?post=${JSON.stringify(post)}`,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  // 在onShow函数中加载帖子列表时检查点赞状态
  onShow() {
    // 在页面显示时重新获取帖子列表数据并更新
    getPostList((postList) => {
      this.setData({
        postList: postList,
        filteredPostList: postList,
      });
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
