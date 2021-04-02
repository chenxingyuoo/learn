const puppeteer = require('puppeteer');

const fileUrl = require('file-url');
const tmp = require('tmp');
const util = require('util');
const fs = require('fs');
const path = require('path');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// const _tempFile = Symbol('tempFile');

// const html = "<div>hello</div>"
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="stylesheet" crossorigin="anonymous" href="http://localhost:8081/css/piublish.css">
  </head>
  <body>
  <div class="effects-item" style="top: 300px; left: 50px; width: 680px; height: 130px; transform: rotate(0deg); color: rgb(74, 74, 74); font-size: 100px; font-family: fnsyhtHeavy; font-weight: normal; line-height: 1.3; letter-spacing: 0px; text-align: center; writing-mode: horizontal-tb; opacity: 1;"><div data-v-48d9b7fc="" style="position: relative;"><div data-v-48d9b7fc="" class="text-content"><div data-v-1b097161="" data-v-48d9b7fc="" class="effects-box"><div data-v-1b097161="" class="effects-layer" style="position: absolute; width: 100%; height: 100%; top: 2.4925px; left: -3.988px;"><div data-v-1b097161="" class="effects-text" style="font-size: 100px; white-space: pre-wrap; overflow-wrap: break-word; -webkit-text-stroke: 3.988px rgb(43, 249, 241);">双击编辑文字</div></div><div data-v-1b097161="" class="effects-layer" style="position: absolute; width: 100%; height: 100%; top: 2.4925px; left: -3.988px;"><div data-v-1b097161="" class="effects-text" style="font-size: 100px; white-space: pre-wrap; overflow-wrap: break-word; -webkit-text-fill-color: rgb(0, 0, 0);">双击编辑文字</div></div><div data-v-1b097161="" class="effects-layer" style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;"><div data-v-1b097161="" class="effects-text" style="font-size: 100px; white-space: pre-wrap; overflow-wrap: break-word; -webkit-text-stroke: 3.988px rgb(255, 171, 255);">双击编辑文字</div></div><div data-v-1b097161="" class="effects-layer" style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;"><div data-v-1b097161="" class="effects-text" style="font-size: 100px; white-space: pre-wrap; overflow-wrap: break-word; -webkit-text-fill-color: rgb(0, 0, 0);">双击编辑文字</div></div></div></div></div></div>
  </body>
</html>
`

const getTempFile = () => {
  // if (this[_tempFile]) {
  //   return Promise.resolve(this[_tempFile]);
  // }

  return new Promise((resolve, reject) => {
    tmp.file({ prefix: 'convert-svg-', postfix: '.html' }, (error, filePath, fd, cleanup) => {
      if (error) {
        reject(error);
      } else {
        // this[_tempFile] = { path: filePath, cleanup };

        // resolve(this[_tempFile]);
        resolve({ path: filePath, cleanup })
      }
    });
  });
}



(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  page._emulationManager._client.send(
    'Emulation.setDefaultBackgroundColorOverride',
    { color: { r: 0, g: 0, b: 0, a: 0 } }
  )

  const tempFile = await getTempFile();

  fs.writeFileSync(tempFile.path, html)
  // await writeFile(tempFile.path, html);

  await page.goto(fileUrl(tempFile.path), { waitUntil: 'networkidle2', timeout: 300000 })
  page.setViewport({ width: 680, height: 130 })
  let path = 'example2.png'
  await page.screenshot({ path: path, fullPage: true })
  // await browser.close()
})()
