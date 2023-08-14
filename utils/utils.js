module.exports = {
  navigateToPage(targetPage) {
    wx.navigateTo({
      url: `/pages/function/${targetPage}/${targetPage}`,
    });
  },
  redirectToTab(targetPage) {
    wx.redirectTo({
      url: `/pages/${targetPage}/${targetPage}`,
    });
  },
};
