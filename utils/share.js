
function onShareAppMessage(title, path, callback, imageUrl) {
  //设置一个默认分享背景图片
  let defaultImageUrl = '';
  return {
    title: title,
    path: path,
    imageUrl: imageUrl || defaultImageUrl,
    success(res) {
      console.log("转发成功！");
      if (!res.shareTickets) {
        //分享到个人
        api.shareFriend().then(() => {
          console.warn("shareFriendSuccess!");
          //执行转发成功以后的回调函数
          callback && callback();
        });
      } else {
        //分享到群
        let st = res.shareTickets[0];
        wx.getShareInfo({
          shareTicket: st,
          success(res) {
            let iv = res.iv
            let encryptedData = res.encryptedData;
            api.groupShare(encryptedData, iv).then(() => {
              console.warn("groupShareSuccess!");
              //执行转发成功以后的回调函数
              callback && callback();
            });
          }
        });
      }
    },
    fail: function (res) {
      console.log("转发失败！");
    }
  };
};

//将其方法导出
module.exports = {
  onShareAppMessage: onShareAppMessage
}