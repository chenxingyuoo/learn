# -*- coding: utf-8 -*-

# 求绝对值
def my_abs(x):
    if not isinstance(x, (int, float)):
         raise TypeError("bad operand type for abs(): 'str'")
    if x >= 0:
        return x
    else:
        return -x
