
const path = require('path');
const fs = require('fs');
const router = require('koa-router')()
const xlsx = require('node-xlsx');
const nodeExcel = require('excel-export');
const http = require('http')
const Excel = require('exceljs');
const { accMultiply, accAdd } = require('../common/math')
const dayjs = require('dayjs')
// 引入相关的库
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// 创建目录
const mkdirPath = (targetPath) => {
  // 检查目录是否存在
  fs.access(targetPath, (err) => {
    if (err) {
      // 创建目录
      fs.mkdir(targetPath, {
        // 指定创建父文件夹
        recursive: true
      }, (err)=>{
        if(err){
          logger.error(err)
        }
      })
    }
  });
}

const todayStr = dayjs().format('YYYY-MM-DD');  
  

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'hello world'
  });
})

router.get('/getjs', async (ctx, next) => {
  const  request = async (url) => { 
    return new Promise((resolve,reject)=>{
      const req = http.request(url, function (res) {
        let postbody = [];
        res.on("data", chunk => {
            postbody.push(chunk);
        })
        res.on("end", () => {
            let postbodyBuffer = Buffer.concat(postbody);
            resolve(postbodyBuffer)
        })
      })
      req.end()
    })
   }

  const res = await request('http://localhost:3000/javascripts/a.js')
  const res2 = await request('http://localhost:3000/javascripts/b.js')
  debugger

  // console.log('res', res)

  ctx.body = Buffer.concat([res, res2])
})

router.get('/getxls', async (ctx, next) => {
  const target = path.join(__dirname, '../public/10.xls');

  let parseDta = xlsx.parse(target);
  const sheet1Data = parseDta[0].data
  const resultPhones = []

  sheet1Data.map((item) => {
    const phone = item['4']
    if (phone) {
      resultPhones.push(Number(phone))
    }
  })

  const conf = {}
  conf.name = 'sheet1'
  const data = []
  let phoneobj = {}

  sheet1Data.map((item) => {
    const name = item['0']
    const phone = Number(item['1'])

    if (!phoneobj[phone]) {
      phoneobj[phone] = 1
    } else {
      phoneobj[phone] += 1
    }
    
    if (name) {
      if (resultPhones.includes(phone) && phoneobj[phone] === 1) {
        const arr = []
        arr.push(name)
        arr.push(phone)
        data.push(arr)
      }
    }
  })

  sheet1Data.map((item) => {
    const name2 = item['2']
    const phone2 = Number(item['3'])

    if (!phoneobj[phone2]) {
      phoneobj[phone2] = 1
    } else {
      phoneobj[phone2] += 1
    }

    if (name2) {
      if (resultPhones.includes(phone2) && phoneobj[phone2] === 1) {
        const arr = []
        arr.push(name2)
        arr.push(phone2)
        data.push(arr)
      }
    }
  })
  
  // 决定列名和类型
  conf.cols = [
    {
      caption: '姓名',
      type: 'string',
    },
    {
      caption: '手机',
      type: 'number',
      width: 20
    }
  ]
  
  conf.rows = data;// 填充数据
  const result = nodeExcel.execute(conf)
  const newData = new Buffer(result, 'binary')
  const name = encodeURI('用户列表')
  ctx.set('Content-Type', 'application/vnd.openxmlformats;charset=utf-8')
  ctx.set('Content-Disposition', 'attachment; filename=' + name + '.xls')

  ctx.body = newData
})



router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
