#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()              # 打开Google浏览器
# driver.get("http://dev.user2.kuaizi.co/video-pro/preview/?creative_id=7755841&copy_combination_id=450&unique_key=7755841_11470&type=video3")
driver.get("http://172.20.10.8:8080/test1.html")

locator = (By.ID,"render-complete")

# 智能等待10s之后获取元素，获取的是多个元素
def find_elements(driver, locator):
    WebDriverWait(driver,10).until(EC.presence_of_element_located(locator))

try:
    ele = find_elements(driver, locator)
    print('ele')
    driver.save_screenshot('./img/test1.png')
    print(ele)
    time.sleep(1) #为了看效果
except:
    print("ele can't find")
finally:
    driver.quit()
