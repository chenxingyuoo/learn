/*
 * @Description: 这是***页面
 * @Date: 2022-09-06 10:43:30
 * @Author: chenxingyu
 * @LastEditors: chenxingyu
 */
var Koa = require('koa')
var app = new Koa()
var Router = require('koa-router')()
const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const crypto = require('crypto')

Router.get('/cache-control', async ctx => {
  const getResource = () => {
    return new Promise(res => {
      fs.readFile('./a.txt', (err, data) => {
        if (err) {
          return
        }
        console.log('data', data)
        res(data.toString())
      })
    })
  }
  ctx.set('Cache-Control', 'max-age=10') //设置强缓存，过期时间为10秒
  ctx.body = await getResource()
})

Router.get('/expires', async ctx => {
  const getResource = () => {
    return new Promise(res => {
      fs.readFile('./a.txt', function (err, data) {
        if (err) {
          console.log(err)
        }
        res(data)
      })
    })
  }

  let resource = await getResource()

  ctx.set('Expires', new Date(Date.now() + 2592000000).toUTCString())
  ctx.body = resource
})

Router.get('/last-modified', async ctx => {
  const ifModifiedSince = ctx.request.header['if-modified-since']
  const getResource = () => {
    return new Promise(res => {
      fs.stat('./a.txt', (err, stats) => {
        if (err) {
          console.log(err)
        }
        res(stats)
      })
    })
  }
  let resource = await getResource()
  // atime	Access Time	访问时间
  // 最后一次访问文件（读取或执行）的时间
  // ctime	Change Time	变化时间
  // 最后一次改变文件（属性或权限）或者目录（属性或权限）的时间
  // mtime	Modify Time	修改时间
  // 最后一次修改文件（内容）或者目录（内容）的时间
  if (ifModifiedSince === resource.mtime.toGMTString()) {
    //把具体的日期转换为（根据 GMT）字符串
    ctx.status = 304
  }
  ctx.set('Last-Modified', resource.mtime.toGMTString())
  ctx.body = resource
})

function getFileHash(file, algorithm) {
  if (!crypto.getHashes().includes(algorithm)) {
    throw new Error('不支持此哈希函数')
  }

  return new Promise(resolve => {
    const hash = crypto.createHash(algorithm)

    const rs = fs.createReadStream(file)
    rs.on('readable', () => {
      const data = rs.read()
      if (data) {
        hash.update(data)
      }
    })
    rs.on('end', () => {
      resolve(hash.digest('hex'))
    })
  })
}

const getFileBuffer = file => {
  return new Promise(resolve => {
    const rs = fs.createReadStream(file)

    let arr = []

    rs.on('data', chunk => {
      arr.push(chunk)
    })
    rs.on('end', () => {
      resolve(Buffer.concat(arr).toString())
    })
  })
}

Router.get('/etag', async ctx => {
  // 将文件转成传输所需格式
  const parseStatic = dir => {
    return new Promise(resolve => {
      resolve(fs.readFileSync(dir), 'binary')
    })
  }

  const filePath = path.join(__dirname, './a.txt')
  const fileBuffer = await getFileBuffer(filePath)
  // const ifNoneMatch = ctx.request.header['if-none-match']
  // 生产内容hash值
  const hash = crypto.createHash('md5')
  hash.update(fileBuffer)
  const etag = `"${hash.digest('hex')}"`
  // const etag = md5(fileBuffer)

  // const getResource = () => {
  //   return new Promise(res => {
  //     fs.stat(filePath, (err, stats) => {
  //       if (err) {
  //         console.log(err)
  //       }
  //       res(stats)
  //     })
  //   })
  // }

  // let resource = await getResource()

  if (ctx.request.headers['if-none-match'] === etag) {
    ctx.status = 304
  }

  ctx.set('Etag', etag)
  ctx.body = fileBuffer
})

app
  .use(Router.routes()) //启动路由
  .use(Router.allowedMethods())
app.listen(3000)
