#!/usr/bin/env python
# -*- coding: utf-8 -*-

import socket

# 服务器地址（主机，端口）
address = ('127.0.0.1', 9999)
# 初始化socket
s = socket.socket()
# 连接服务器
print('【开始连接服务器 %s:%s】' % address)
s.connect(address)
while True:
    print('Server: %s' % s.recv(1024).decode('utf-8'))
    msg = input('Client: ')
    if not msg or msg == 'exit':
        break
    s.send(msg.encode('utf-8'))
# 断开连接
s.close()
print('【断开连接】')