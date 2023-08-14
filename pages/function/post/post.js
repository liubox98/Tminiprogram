Page({
  data: {
    content: "",
    fileList: [],
    selectedCity: "", // 用于记录用户最后一次选择的城市值
    citys: [
      { label: "# 新用户送19", value: "# 新用户送19" },
      { label: "# 新用户送29", value: "# 新用户送29" },
      { label: "# 新用户送39", value: "# 新用户送39" },
      { label: "# 新用户送49", value: "# 新用户送49" },
      { label: "# 新用户送99", value: "# 新用户送99" },
    ],
  },

  handleContentInput(e) {
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

  onColumnChange(e) {
    console.log("picker pick:", e);
  },

  onPickerChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      selectedCity: value.join(" "), // 记录用户最后一次选择的城市值
      cityText: value.join(" "), // 更新cityText显示选择的城市值
      [`${key}Visible`]: false,
    });
  },

  onPickerCancel(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onCityPicker() {
    this.setData({ cityVisible: true });
  },

  onSeasonPicker() {
    this.setData({ dateVisible: true });
  },

  handleSubmit() {
    wx.getUserProfile({
      desc: "获取你的昵称、头像等信息", // 向用户说明授权用途
      success: (res) => {
        const userInfo = res.userInfo; // 获取用户信息

        const db = wx.cloud.database();
        const selectedImages = this.data.fileList.map((file) => file.fileId);

        db.collection("post").add({
          data: {
            author: userInfo.nickName,
            avatar: userInfo.avatarUrl,
            content: this.data.content,
            file: selectedImages,
            tags: this.data.selectedCity,
            createtime: new Date().getTime(),
            likes: 0,
            comments: 0,
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
  },
});
