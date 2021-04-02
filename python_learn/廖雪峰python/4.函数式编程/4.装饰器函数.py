#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper


@log
def now(time):
    print(time)   

now('2015-3-28')



# 打印自定义文本
def log1(text):
    def decorator(func):
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator


# 装饰器调用法
@log1('ptint log1')
def now1(time):
    print(time)       

now1('2018-10-10')   

# 函数调用法
log1('ptint log1')(now1)('2018-12-12')