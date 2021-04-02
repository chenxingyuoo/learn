#!/usr/bin/env python
# -*- coding: utf-8 -*-
 
import pymongo
 
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]

mycol = mydb["sites"]
 
mydict = { "name": "RUNOOB", "alexa": "10000", "url": "https://www.runoob.com" }
 
x = mycol.insert_one(mydict) 
print(x)