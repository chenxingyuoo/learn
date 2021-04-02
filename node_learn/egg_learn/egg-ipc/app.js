'use strict'

const WebSocket = require('ws');
const SocketIo = require('socket.io')

// const RegistryClient = require('./some-client/registry_client');
const APIClient = require('./some-client');


module.exports = app => {
  const config = app.config.apiClient;
  app.apiClient = new APIClient(Object.assign({}, config, { cluster: app.cluster }))

  app.beforeStart(async () => {

    await app.apiClient.ready();
    app.coreLogger.info('registry client is ready');

    // 调用 subscribe 进行订阅
    // app.apiClient.subscribe({
    //   dataId: 'demo.DemoService',
    // }, val => {
    //   console.log('valvalvalval', val)
    //   // ...
    // });
    //
    // // 调用 publish 发布数据
    app.apiClient.publish({
      dataId: 'demo.DemoService',
      publishData: 'xxx'
    });

    // 调用 getConfig 接口
    const res = await app.apiClient.get('foo');
    console.log(res);

    // 保证应用启动监听端口前数据已经准备好了
    // 后续数据的更新由定时任务自动触发
    await app.runSchedule('force_refresh');
  });




  // 注意，只有在 egg-ready 事件拿到之后才能发送消息
  // app.messenger.once('egg-ready', () => {
  //   app.messenger.sendToAgent('app-init', app)
  // })
  app.once('server', server => {
    // websocket

    // var chat = SocketIo(server)
    //     .of('/chat')
    //     .on('connection', function (socket) {
    //       console.log('client connect server, ok!')
    //     });


  //   console.log('server', server)
    // const wss = new WebSocket.Server({ server: server });
    //
    // //连接
    // wss.on('connection', (ws, req) => {
    //   //接受客户端信息回调
    //   ws.on('message', (message) => {
    //     console.log('received: %s', message);
    //   });
    //
    //   //连接关闭回调
    //   ws.on('close', (message) => {
    //     console.log('mylog', 'close')
    //     ws.close();
    //   });
    //
    //   //连接错误回调
    //   ws.on('error', (message) => {
    //     console.log('mylog', 'error')
    //     ws.close();
    //   });
    //   // //向客户端发送一条信息
    //   // ws.send(JSON.stringify(data));
    // });

    // app.messenger.sendToAgent('app-init-server', server)
  })


  app.messenger.on('refresh', by => {
    app.logger.info('start update by %s', by);
    // create an anonymous context to access service
    const ctx = app.createAnonymousContext();
    ctx.runInBackground(async () => {
      await ctx.service.source.update();
      app.lastUpdateBy = by;
    });
  });
};