#!/usr/bin/env python
# -*- coding: utf-8 -*-

# 导入socket库:
import socket
import threading
import time

# 创建一个socket:
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind(('127.0.0.1', 9999))
s.listen(5)
print('Waiting for connection...')

def tcplink(sock, addr):
    print('Accept new connection from %s:%s...' % addr)
    sock.send(b'Welcome!')
    while True:
        # 接收客户端传输过来的数据
        data = sock.recv(1024)
        time.sleep(1)
        # 是否跳出循环
        if not data or data.decode('utf-8') == 'exit':
            break
        # 发送数据到客户端    
        sock.send(('Hello, %s!' % data.decode('utf-8')).encode('utf-8'))
    sock.close()
    print('Connection from %s:%s closed.' % addr)

while True:
    # 接受一个新连接:
    sock, addr = s.accept()
    # 创建新线程来处理TCP连接:
    t = threading.Thread(target=tcplink, args=(sock, addr))
    t.start()