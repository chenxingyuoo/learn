class Animal(object):
    pass

# 大类:
class Mammal(Animal):
    pass

class Bird(Animal):
    pass

# 跑
class Runnable(object):
    def run(self):
        print('Running...')

# 飞
class Flyable(object):
    def fly(self):
        print('Flying...')

# 多重继承， 逗号隔开
class Dog(Mammal, Runnable):
    pass

class Bat(Mammal, Flyable):
    pass    