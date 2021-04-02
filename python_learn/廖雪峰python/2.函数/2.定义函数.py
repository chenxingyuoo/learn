#!/usr/bin/env python
# -*- coding: utf-8 -*-

from abstest import my_abs
import math


print(my_abs(-10))

print(abs(-10))

# 空函数
def nop():
    pass  #占位符

def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny    

x, y = move(100, 100, 60, math.pi / 6)

print(x, y)


# 一元二次方程
def quadratic(a,b,c):
  if a == 0:
    raise TypeError('a不能为0')
  if not isinstance(a,(int,float)) or not isinstance(b,(int,float)) or not isinstance(c,(int,float)):
    raise TypeError('Bad operand type')
  delta = math.pow(b,2) - 4*a*c
  if delta < 0:
    return '无实根'
  x1= (math.sqrt(delta)-b)/(2*a)
  x2=-(math.sqrt(delta)+b)/(2*a)
  return x1,x2
a = input("请输入a")
b=input("请输入b")
c=input("请输入c")

print(quadratic(a,b,c))