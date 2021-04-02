/**
 * 获取京东手机列表
 * @Author: chenxingyu 
 * @Date: 2019-04-12 11:35:04 
 * @Last Modified by: chenxingyu
 * @Last Modified time: 2019-04-12 11:48:16
 */


 
const fs = require("fs");
const puppeteer = require("puppeteer");
module.exports = {
  async getPhoneData(ctx, next) {
    const browser = await puppeteer.launch({
      // waitUntil: 'networkidle',
      headless: false
    });
    const page = await browser.newPage();

    // 进入页面
    await page.goto("https://www.jd.com/");

    // 点击搜索框拟人输入 手机
    const keyName = "手机";
    await page.type("#key", keyName, { delay: 0 });

    // 搜索
    await page.keyboard.press("Enter");

    // 等待2秒加载数据
    await page.waitFor(5000);

    // 执行方法
    await page.evaluate(e => {
      const glList = $(".gl-item");
      const data = glList.map((index, v) => {
        const $el = $(v);
        const title = $el.find(".p-name em").text();
        const imgSrc =
          $el.find(".p-img img")[0]["src"] ||
          $el.find(".p-img img")[0].getAttribute("data-lazy-img");
        return {
          title: title,
          imgSrc: imgSrc
        };
      });
      console.log("data", data);
    });
    // browser.close();
  }
};
