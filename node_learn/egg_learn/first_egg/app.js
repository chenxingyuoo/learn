'use strict';

module.exports = app => {

  app.beforeStart(async () => {
    // 示例：启动的时候去读取 信息
    // const result = await app.curl('http://b26eb968.ngrok.io/user/wxCallback', {
    //   dataType: 'json',
    //   method: 'POST',
    //    data: {
    //     dataJson: '{"userId":"5bbada9919873715dfbe546e","socketId":"LsI37W9Vjj3FyXNFAAAT"}',
    //     userInfo: '{"userId":"5bbada9919873715dfbe546e","socketId":"LsI37W9Vjj3FyXNFAAAT"}',
    //     openId : 111111
    //   },
    // });
    
    // console.log(result)
  });
};
