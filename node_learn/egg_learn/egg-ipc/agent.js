'use strict';

//Agent 作用：后台运行工作（长连接客户端）

const Subscriber = require('./lib/subscriber');
// const dgram = require('dgram');
// const server = dgram.createSocket('udp4');

const WebSocket = require('ws');
const SocketIo = require('socket.io')

const APIClient = require('./some-client');

module.exports = agent => {
  console.log('agent', agent)

  agent.logger.info('init subscriber');

  agent.messenger.on('egg-ready', () => {
    var chat = SocketIo(8050)
        .of('/chat')
        .on('connection', function (socket) {
          console.log('client connect server, ok!')
          socket.on('chatEvent', function (data){
            console.log('chatEvent', data)
          });
        });

    /*const wss = new WebSocket.Server({ port: 8050 });
    //连接
    wss.on('connection', (ws, req) => {
      //接受客户端信息回调
      ws.on('message', (message) => {
        console.log('received: %s', message);
      });

      //连接关闭回调
      ws.on('close', (message) => {
        console.log('mylog', 'close')
        ws.close();
      });

      //连接错误回调
      ws.on('error', (message) => {
        console.log('mylog', 'error')
        ws.close();
      });
      // //向客户端发送一条信息
      // ws.send(JSON.stringify(data));
    });*/
  })


  const config = agent.config.apiClient;
  agent.apiClient = new APIClient(Object.assign({}, config, { cluster: agent.cluster }))

  agent.beforeStart(async () => {
    await agent.apiClient.ready();
    agent.coreLogger.info('registry client is ready');
  });

  // const subscriber = new Subscriber();
  // subscriber.on('changed', () => agent.messenger.sendToApp('refresh', 'push'));
  // subscriber.on('error', err => agent.logger.error(err));
};
