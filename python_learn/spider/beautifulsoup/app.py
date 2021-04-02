#!/usr/bin/env python3
# -*- coding: utf-8 -*-
 
import re

import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver


heads = {}
heads['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
response = requests.get('https://search.jd.com/Search', headers=heads, params={'keyword': '吉他', 'enc': 'utf-8'})
response.encoding = "utf-8"
# print(response.text)  #以文本形式打印网页源码
# print(response.content) #以字节流形式打印

html_doc = response.text


chrome = webdriver.Chrome()              # 打开Google浏览器
chrome.get("https://www.baidu.com") 

#创建一个BeautifulSoup解析对象
soup = BeautifulSoup(html_doc,"html.parser",from_encoding="utf-8")

#获取所有的链接
gllist = soup.select('.gl-item')
for item in gllist:
  img = item.select_one('.p-img img')
  a = item.select_one('.p-name a')
  price = item.select_one('.p-price strong')
  print('name: ' , a.get_text())
  print('price: ' , price.get_text())
  print('img src: ' , img.attrs['source-data-lazy-img'])


# #获取所有的链接
# links = soup.find_all('a')
# print('所有的链接')
# for link in links:
#     print(link.name,link['href'],link.get_text())
 
# print "获取特定的URL地址"
# link_node = soup.find('a',href="http://example.com/elsie")
# print link_node.name,link_node['href'],link_node['class'],link_node.get_text()
 
# print "正则表达式匹配"
# link_node = soup.find('a',href=re.compile(r"ti"))
# print link_node.name,link_node['href'],link_node['class'],link_node.get_text()
 
# print "获取P段落的文字"
# p_node = soup.find('p',class_='story')
# print p_node.name,p_node['class'],p_node.get_text()