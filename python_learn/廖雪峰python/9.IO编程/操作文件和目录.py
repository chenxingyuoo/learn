#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

print(os.uname())

# 环境变量
print(os.environ)

# 查看当前目录的绝对路径:
print(os.path.abspath('.'))
# '/Users/xingyuchen/my_learn/python_learn/廖雪峰python/9.IO编程'
# 在某个目录下创建一个新目录，首先把新目录的完整路径表示出来:
os.path.join('/Users/xingyuchen/my_learn/python_learn/廖雪峰python/9.IO编程', 'testdir')
# '/Users/xingyuchen/my_learn/python_learn/廖雪峰python/9.IO编程/testdir'
# 然后创建一个目录:
os.mkdir('/Users/xingyuchen/my_learn/python_learn/廖雪峰python/9.IO编程/testdir')
# 删掉一个目录:
# os.rmdir('/Users/xingyuchen/my_learn/python_learn/廖雪峰python/9.IO编程/testdir')