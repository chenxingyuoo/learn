#!/bin/bash
your_name="陈星宇"
echo $your_name
echo ${your_name}

for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done

str='this is a string'

your_name='qinjx'
str="Hello, I know your are \"$your_name\"! \n"

echo ${str}

#拼接字符串
your_name="qinjx"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1


#获取字符串长度
string="abcd"
echo ${#string} #输出 4

#提取子字符串
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo

#查找子字符串
strings="runoob is a great company"
echo `expr index "$strings" is`  # 输出 8

#定义数组
array_name=('value0' 'value1' 'value2' 'value3')
three=${array_name[3]}
echo ${three}


#获取数组长度
length=${#array_name[n]}
echo ${length}
length=${#array_name[*]}
echo ${length}



