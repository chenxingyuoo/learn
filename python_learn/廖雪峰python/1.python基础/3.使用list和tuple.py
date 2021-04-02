# list 初始化后可以修改
classmates = ['Michael', 'Bob', 'Tracy']
print(classmates)
len(classmates)
print(classmates[0])
print(classmates[-1])

classmates.append('Adam')

classmates.insert(1, 'Jack')
print(classmates)

classmates.pop()
classmates.pop(1)
print(classmates)  


s = ['python', 'java', ['asp', 'php'], 'scheme']
print(s[2][1])

# tuple 初始化后不可以修改
c = ('Michael', 'Bob', 'Tracy')

t = ('a', 'b', ['A', 'B'])
t[2][0] = 'X'
t[2][1] = 'Y'
print(t)
# ('a', 'b', ['X', 'Y'])  虽然改变了，但是只是第2个元素list改变了

# 表面上看，tuple的元素确实变了，但其实变的不是tuple的元素，而是list的元素。
# tuple一开始指向的list并没有改成别的list，所以，tuple所谓的“不变”是说，tuple的每个元素，指向永远不变。即指向'a'，就不能改成指向'b'，指向一个list，就不能改成指向其他对象，但指向的这个list本身是可变的！



# 练习
L = [
    ['Apple', 'Google', 'Microsoft'],
    ['Java', 'Python', 'Ruby', 'PHP'],
    ['Adam', 'Bart', 'Lisa']
]
print(L[0][0])
print(L[1][1])
print(L[2][2])