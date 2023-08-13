Page({
  data: {
    content: "",
    fileList: [],
  },

  handleContentInput(e) {
    console.log("123", e);
    this.setData({
      content: e.detail.value,
    });
  },

  handleAdd(e) {
    const { fileList } = this.data;
    const { files } = e.detail;

    this.setData({
      fileList: [...fileList, ...files],
    });

    files.forEach((file) => {
      this.onUpload(file);
    });
  },

  onUpload(file) {
    const fileList = this.data.fileList;
    const length = fileList.length;
    const randomSuffix = Math.floor(Math.random() * 1000000);
    wx.cloud.uploadFile({
      cloudPath: `${file.type}/${Date.now()}-${randomSuffix}-${file.name}`,

      filePath: file.url,
      success: (res) => {
        const fileId = res.fileID;
        this.setData({
          [`fileList[${length - 1}].status`]: "done",
          [`fileList[${length - 1}].fileId`]: fileId,
        });
      },
      fail: (error) => {
        console.error("上传失败：", error);
        this.setData({
          [`fileList[${length - 1}].status`]: "failed",
        });
      },
    });
  },

  handleRemove(e) {
    const { index } = e.detail;
    const fileList = this.data.fileList;
    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },

  handleSubmit() {
    console.log(this.data);
    const db = wx.cloud.database();
    const userInfo = {
      name: "刘博",
      avatar: "/images/avatar.png",
    };
    const selectedImages = this.data.fileList.map((file) => file.fileId);

    db.collection("post").add({
      data: {
        author: userInfo.name,
        avatar: userInfo.avatar,
        content: this.data.content,
        file: selectedImages,
        createtime: new Date().getTime(),
        likes: 0,
        comments: 0,
        views: 0,
      },
      success: (res) => {
        wx.showToast({
          title: "发帖成功",
          icon: "success",
          duration: 2000,
          success: () => {
            setTimeout(() => {
              wx.navigateBack();
            }, 2000);
          },
        });
      },
    });
  },
});
