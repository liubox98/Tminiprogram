// utils/post.js

import { calculateTimeDiff } from "./timeUtils";
const db = wx.cloud.database();
const app = getApp();

// 点赞处理函数
const handleThumbUp = (item, successCallback, errorCallback) => {
  if (!item.isLiked) {
    const _ = db.command;

    // 更新帖子的点赞用户列表
    db.collection("post")
      .doc(item._id)
      .update({
        data: {
          likers: _.push(app.globalData.openId), // 将当前用户的唯一标识符添加到 likers 数组中
        },
        success: () => {
          // 更新帖子的点赞状态
          item.isLiked = true;
          if (typeof successCallback === "function") {
            successCallback();
          }
        },
        fail: (err) => {
          console.error("点赞失败", err);
          if (typeof errorCallback === "function") {
            errorCallback();
          }
        },
      });
  }
};

// 获取点赞信息
const getPostList = (callback) => {
  db.collection("post")
    .orderBy("createtime", "desc")
    .get({
      success: (res) => {
        const postList = res.data.map((item) => {
          const formattedTime = calculateTimeDiff(item.createtime);
          const isLiked = item.likers.includes(app.globalData.openId);
          const likes = item.likers.length;
          return { ...item, formattedTime, isLiked, likes };
        });
        if (typeof callback === "function") {
          callback(postList);
        }
      },
      fail: (err) => {
        console.error("获取帖子列表失败", err);
      },
    });
};

export { handleThumbUp, getPostList };
