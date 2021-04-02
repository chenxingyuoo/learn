# -*- coding: utf-8 -*-

# 字典 key-value
d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
print(d['Michael'])


# 判断是否存在
print(d.get('Thomas'))
if d.get('Thomas'):
    print(d['Thomas'])

# delete
d.pop('Michael')

# set set和dict类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在set中，没有重复的key。
s = set([1, 2, 3])
print(s)
# {1,2,3}
s.add(4)
s.remove(4)


# set可以看成数学意义上的无序和无重复元素的集合，因此，两个set可以做数学意义上的交集、并集等操作：
s1 = set([1, 2, 3])
s2 = set([2, 3, 4])

s1 & s2 # 2,3
s1 | s2 # 1, 2, 3,4


list = [1,2,3]
s3 = set(list)
print(s3)


# 去重
line = ['a','b','a']

# 合并
line1=['a','b','a']
line2=['a','c']
line3=line1+line2
print(set(line3))
