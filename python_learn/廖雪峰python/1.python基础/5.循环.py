names = ['Michael', 'Bob', 'Tracy']
for name in names:
    print(name)




sum = 0
for x in range(101):
    sum = sum + x
print(sum)


print(list(range(5)))



n = 1
while n <= 100:
    if n > 10: # 当n = 11时，条件满足，执行break语句
        break # break语句会结束当前循环
    print(n)
    n = n + 1
print('END')