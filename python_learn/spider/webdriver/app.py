#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
from selenium import webdriver

browser = webdriver.Chrome()              # 打开Google浏览器
browser.get("https://search.jd.com/Search?keyword=吉他&enc=utf-8")

# 滚动页面到底部
browser.execute_script('window.scrollTo(0, document.body.scrollHeight)')

time.sleep(1)

glList = browser.find_elements_by_class_name('gl-item')
print('type', type(glList))
print('len', len(glList))

for item in glList:
  img = item.find_element_by_css_selector('.p-img img')
  a = item.find_element_by_css_selector('.p-name a')
  price = item.find_element_by_css_selector('.p-price strong')
  print('name',a.text)
  print('price',price.text)
  print('src',img.get_attribute('source-data-lazy-img'))
  print('src',img.get_attribute('data-lazy-img'))
  print('src',img.get_attribute('src'))