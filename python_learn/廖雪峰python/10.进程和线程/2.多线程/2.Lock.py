#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time, threading

# 假定这是你的银行存款:
balance = 0

def change_it(n):
    # 先存后取，结果应该为0:
    global balance
    balance = balance + n
    balance = balance - n

def run_thread(n):
    for i in range(100000):
        change_it(n)

t1 = threading.Thread(target=run_thread, args=(5,))
t2 = threading.Thread(target=run_thread, args=(8,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)  # 理论上结果应该为0，但不一定等于0，由于线程的调度是由操作系统决定的，当t1、t2交替执行时，只要循环次数足够多，balance的结果就不一定是0了。


# 创建一个锁

balance1 = 0
lock = threading.Lock()

def change_it1(n):
    # 先存后取，结果应该为0:
    global balance1
    balance1 = balance1 + n
    balance1 = balance1 - n

def run_thread1(n):
    for i in range(100000):
        # 先要获取锁:
        lock.acquire()
        try:
            # 放心地改吧:
            change_it(n)
        finally:
            # 改完了一定要释放锁:
            lock.release()


t3 = threading.Thread(target=run_thread1, args=(5,))
t4 = threading.Thread(target=run_thread1, args=(8,))
t3.start()
t4.start()
t3.join()
t4.join()            
print(balance1)