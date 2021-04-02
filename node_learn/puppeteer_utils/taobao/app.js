/*
 * @Description: 这是***页面
 * @Date: 2020-03-18 14:24:48
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 * @LastEditTime: 2020-08-10 16:10:29
 */
const puppeteer = require('puppeteer')

const tmp = require('tmp')
const util = require('util')
const fs = require('fs')
const path = require('path')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()

  await page.goto(
    'https://www.taobao.com/?spm=a2e15.8261149.1581860521.1.608329b4cGCld8',
    { waitUntil: 'networkidle0', timeout: 0 }
  )
  // await browser.close()

  await page.click('.shop-search-tab')
  await page.waitFor(500)
  await page.type('input[id="q"]', '女装')
  await page.waitFor(500)
  // await page.click('.btn-search')
  await page.keyboard.down('Return')
})()
