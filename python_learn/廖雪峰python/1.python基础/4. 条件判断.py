# -*- coding: utf-8 -*-

age = 3
if age >= 18:
    print('adult')
elif age >= 6:
    print('teenager')
else:
    print('kid')


# input()读取用户的输入
s = input('birth: ')
birth = int(s)
if birth < 2000:
    print('00前')
else:
    print('00后')    


h = 1.75
fw = 60

result = fw / (h * 2)

print(result)

if result >= 32:
    print('adult')
elif result >= 28 and result < 32:
    print('肥胖')
elif result >= 25 and result < 28:
    print('过重')
elif result >= 18.5 and result < 25:
    print('正常')
else:
    print('过轻')        