#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging

try:
    print('try...')
    r = 10 / int('2')
    print('result:', r)
except ValueError as e:
    print('ValueError:', e)
except ZeroDivisionError as e:
    print('ZeroDivisionError:', e)
else:
    print('no error!')
finally:
    print('finally...')
print('END')



def foo(s):
    return 10 / int(s)

def bar(s):
    return foo(s) * 2

def main():
    try:
        bar('0')
    except Exception as e:
        print('Error:', e)
        logging.exception(e)
        raise ValueError('invalid value: %s' % e)  # 主动抛出异常
    finally:
        print('finally...')

main()
