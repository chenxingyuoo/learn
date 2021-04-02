#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Animal(object):
    def run(self):
        print('Animal is running...')

class Dog(Animal):
    pass

class Cat(Animal):
    def run(self):
        print('Cat is running...') 


# 先查找子类有没有这个方法调用，再查找父类
dog = Dog()
dog.run()

cat = Cat()
cat.run()        

print(isinstance(dog, Dog))    # true
print(isinstance(dog, Animal)) # true
print(isinstance(cat, Cat))    # true

class Dog1(Animal):
    def run(self):
        print('Dog is running...')
    def eat(self):
        print('Eating meat...')

class Tortoise(Animal):
    def run(self):
        print('Tortoise is running slowly...')

def run_twice(animal):
    animal.run()
    animal.run()

run_twice(Dog1())    
# Dog is running...
# Dog is running...

run_twice(Cat())    
# Cat is running...
# Cat is running...

run_twice(Tortoise()) 
# Tortoise is running slowly...
# Tortoise is running slowly...



# super().__init__
class FooParent(object):
    def __init__(self):
        self.parent = 'I\'m the parent.'
        print ('Parent')
    
    def bar(self,message):
        print ("%s from Parent" % message)
 
class FooChild(FooParent):
    def __init__(self):
        # super(FooChild,self) 首先找到 FooChild 的父类（就是类 FooParent），然后把类B的对象 FooChild 转换为类 FooParent 的对象
        super(FooChild,self).__init__()    
        print ('Child')
        
    def bar(self,message):
        super(FooChild, self).bar(message)
        print ('Child bar fuction')
        print (self.parent)
 
if __name__ == '__main__':
    fooChild = FooChild()
    fooChild.bar('HelloWorld')