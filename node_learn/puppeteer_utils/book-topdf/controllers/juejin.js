/*
 * 掘金小册
 * @Author: chenxingyu
 * @Date: 2019-05-22 12:23:28
 * @Last Modified by: chenxingyu
 * @Last Modified time: 2019-05-26 18:48:09
 */

const fs = require('fs')
const os = require('os')
const path = require('path')
// const pdftk = require("node-pdftk");
const puppeteer = require('puppeteer')
const rp = require('request-promise')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const pathStr = path.join(os.tmpdir(), 'pdf')
if (!fs.existsSync(pathStr)) {
  fs.mkdirSync(pathStr)
}

// pdftk.configure({
//   bin: '/usr/local/bin',
//   Promise: require('bluebird'),
//   ignoreWarnings: true,
// });

exports.mergePdf = async (ctx, next) => {
  let files = fs.readdirSync(pathStr)
  let pdfFiles = []
  files.map((filename) => {
    pdfFiles.push(pathStr + '/' + filename)
  })

  const result = await rp({
    method: 'POST',
    uri: 'http://127.0.0.1:5000/mergePdf',
    body: {
      pdfFiles: pdfFiles
    },
    json: true // Automatically stringifies the body to JSON
  })

  // try {
  //   pdftk
  //   .input({
  //     A: resolve('./1.pdf'),
  //     B: resolve('./2.pdf'),
  // })
  // .cat('A B')
  //     // .output(resolve('./pagefile.pdf'))
  //     // .output('./path/to/output.pdf')
  //     .output('./a.pdf')
  //     .then(buffer => {
  //       debugger
  //       // Do stuff with the output buffer
  //       console.log('buffer', buffer);

  //   })
  //   .catch(err => {
  //     debugger
  //     console.log('err', err);

  //       // handle errors
  //   });
  // } catch (e) {

  //   console.log('e', e);

  // }

  ctx.body = 'success'
}

exports.index = async (ctx, next) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
    headless: true,
    defaultViewport: {
      width: 1333,
      height: 1000
    }
  })
  const page = await browser.newPage()

  // 进入页面
  await page.goto(
    'https://juejin.im/book/5c526902e51d4543805ef35e/section/5c5269026fb9a049f1549e4a',
    {
      waitUntil: 'networkidle0',
      timeout: 0
    }
  )

  const title = 'chrome-dev'
  // const path = resolve(`/public/images/${title}`)
  // if (!fs.existsSync(path)) {
  //    fs.mkdirSync(path)
  // }

  // 登录
  // await page.click('.login')
  // await page.click('.clickable')
  // await page.type('.input[name="loginPhoneOrEmail"]', '15622243679')
  // await page.type('.input[name="loginPassword"]', 'zxcvbnmo')
  // await page.click('.auth-form .btn')

  // 页面刷新等待2秒
  await page.waitFor(2000)

  const urls = await page.evaluate(async (x) => {
    const p = []
    const action = (el, i) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          el.click()

          setTimeout(() => {
            resolve(window.location.href)
          }, 0)
        }, 100 * i)
      })
    }

    let sectionList = document.querySelectorAll('.section')
    console.log('sectionList', sectionList)
    sectionList.forEach((item, i) => {
      p.push(action(item, i + 1))
    })

    const urls = await Promise.all(p)

    return Promise.resolve(urls)
  }, 7)

  console.log('urls', urls)

  const proms = []
  urls.map((url, index) => {
    const p = new Promise(async (resolve, reject) => {
      try {
        const currentPage = await browser.newPage()

        // 进入页面
        await currentPage.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 0
        })

        // 截图
        // await currentPage.screenshot({
        //   path: resolve(`/public/images/${title}/${index + 1}.png`),
        //   fullPage: true
        // })

        currentPage.waitFor(100)

        const path = `${pathStr}/${index + 1}.pdf`

        await currentPage.pdf({
          path: path,
          format: 'A4'
        })

        await currentPage.close()

        resolve(path)
      } catch (error) {
        console.log('currentPage.pdf error', error)
        reject(error)
      }
    })

    proms.push(p)
  })

  try {
    const pdfFiles = await Promise.all(proms)

    const result = await rp({
      method: 'POST',
      uri: 'http://127.0.0.1:5000/mergePdf',
      body: {
        pdfFiles: pdfFiles
      },
      json: true
    })
  } catch (error) {
    console.log('Promise.all error', error)
  }

  await browser.close()
}
