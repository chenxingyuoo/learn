const puppeteer = require('puppeteer');
// (async () => {    
//     const browser = await puppeteer.launch({   
//              headless: true    
//     })  
//     const page = await browser.newPage()  
//     await page.goto('https://www.jianshu.com/p/56babda610f9')  
//     await page.screenshot({        path: '/Users/xingyuchen/Desktop/baidu.png'    })
// })()


async function printPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.jianshu.com', {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({ path: 'a.pdf',format: 'A4' });
   
    await browser.close();
    return pdf
}
  

   printPDF()
  