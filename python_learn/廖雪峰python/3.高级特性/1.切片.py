#!/usr/bin/env python
# -*- coding: utf-8 -*-

# 切片方法实现、去掉首尾字符串
def trim(s):
    if s[:1] != ' ' and s[-1:] != ' ':
        return s
    elif s[:1] == ' ':
        return trim(s[1:])
    else:
        return trim(s[:-1]



str = trim(' hello ')

print(str)