module.exports = {
  name : 'loading',
  data: function () {
    return {
      text: `正在努力加载! (●'◡'●)...`
    }
  },
  template: `
    <flexbox-layout flexDirection="column" justifyContent="center" alignItems="center">
      <image style="height: 40; width:40" src="../images/lemon-loading.gif"></image>
      <label :text="text"></label>
    </flexbox-layout>
  `
};