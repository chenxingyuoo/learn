const puppeteer = require('puppeteer')

let htmlBody = ''

/**
 * 预览
 */
exports.preview = async (ctx, next) => {
  if (!htmlBody) {
    console.log('preview htmlBody is empty!')
  }
  await ctx.render('text-preview', {
    body: htmlBody
  })
}

/**
 * 截图
 */
let id = 0
exports.screenshot = async (ctx, next) => {
  const body = ctx.request.body
  htmlBody = body.htmlBody

  if (!htmlBody) {
    console.log('screenshot htmlBody is empty!')
    return
  }
  
  const browser = await puppeteer.launch({
    headless: false
  })
  // const browser = await puppeteer.connect({
  //   headless: false,
  //   browserWSEndpoint: 'ws://localhost:3000'
  // })
  const page = await browser.newPage()
  page._emulationManager._client.send(
    'Emulation.setDefaultBackgroundColorOverride',
    { color: { r: 0, g: 0, b: 0, a: 0 } }
  )

  await page.goto('http://127.0.0.1:8000/text-effects/preview', { waitUntil: 'networkidle0', timeout: 300000 })
  page.setViewport({ width: 680, height: 130 })

  id++
  let path = `example${id}.png`
  await page.screenshot({ path: path, fullPage: true })
  await browser.close()
  // await browser.disconnect()

  htmlBody = ''
  ctx.body = 'success'
}