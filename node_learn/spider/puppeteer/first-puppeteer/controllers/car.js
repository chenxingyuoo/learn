/**
 * 获取瓜子二手车汽车信息
 * @author chenxingyu<2731173104@qq.com>
 */
const fs = require("fs");
const puppeteer = require("puppeteer");
module.exports = {
  async getCarData(ctx, next) {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
  
    // 进入页面
    await page.goto("https://www.guazi.com/hz/buy/");
  
    // 获取页面标题
    let title = await page.title();
    console.log(title);
  
    // 获取汽车品牌
    const BRANDS_INFO_SELECTOR = ".dd-all.clearfix.js-brand.js-option-hid-info";
    const brands = await page.evaluate(sel => {
      const ulList = Array.from($(sel).find("ul li p a"));
      const ctn = ulList.map(v => {
        return v.innerText.replace(/\s/g, "");
      });
      return ctn;
    }, BRANDS_INFO_SELECTOR);
    console.log("汽车品牌: ", JSON.stringify(brands));
    let writerStream = fs.createWriteStream("car_brands.json");
    writerStream.write(JSON.stringify(brands, undefined, 2), "UTF8");
    writerStream.end();
    // await bodyHandle.dispose();
  
    // 获取车源列表
    const CAR_LIST_SELECTOR = "ul.carlist";
    const carList = await page.evaluate(sel => {
      const catBoxs = Array.from($(sel).find("li a"));
      const ctn = catBoxs.map(v => {
        const title = $(v)
          .find("h2.t")
          .text();
        const subTitle = $(v)
          .find("div.t-i")
          .text()
          .split("|");
        return {
          title: title,
          year: subTitle[0],
          milemeter: subTitle[1]
        };
      });
      return ctn;
    }, CAR_LIST_SELECTOR);
  
    console.log(
      `总共${carList.length}辆汽车数据: `,
      JSON.stringify(carList, undefined, 2)
    );
  
    // 将车辆信息写入文件
    writerStream = fs.createWriteStream("car_info_list.json");
    writerStream.write(JSON.stringify(carList, undefined, 2), "UTF8");
    writerStream.end();
  
    browser.close();
  }
}