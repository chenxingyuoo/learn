#!/usr/bin/env python
# -*- coding: utf-8 -*-

# 默认参数
def power(x, n = 2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s


# 可变参数
def product(*numbers):
    sum = 1
    for n in numbers:
        sum = sum * n
    return sum    

print(product(2,2,2))   #8