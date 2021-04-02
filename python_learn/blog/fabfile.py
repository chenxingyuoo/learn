#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#import os, re
#from datetime import datetime

# 导入Fabric API:
# from fabric.api import *

# 服务器登录用户名:
#env.user = 'michael'
# sudo用户为root:
#env.sudo_user = 'root'
# 服务器地址，可以有多个，依次部署:
#env.hosts = ['192.168.0.3']

# 服务器MySQL用户名和口令:
#db_user = 'www-data'
#db_password = 'www-data'

from fabric import task

@task
def hello():
    print "Hello Fabric!"