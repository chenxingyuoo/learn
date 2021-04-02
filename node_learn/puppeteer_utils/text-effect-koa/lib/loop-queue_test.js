var Queue = require('./loop-queue')
var queue = new Queue({
  runtimeCount: 20
})
var ks = new Date().getTime()//记时

var fn1 = function (val) {//函数1
    return new Promise((resolve, reject) => {
      setTimeout(function () {//延迟500ms后执行
        resolve('数据1')
        console.log(val)
        
        console.log(new Date().getTime() - ks)
      }, 500)
    })
}

var fn3 = function (val) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {//延迟500ms后执行
      resolve('数据3')
      console.log(val)

      console.log(new Date().getTime() - ks)

    }, 500)
  })
}

var fn2 = function (val) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {//延迟500ms后执行
      resolve('数据2')
      console.log(val)

      console.log(new Date().getTime() - ks)

      setTimeout(() => {
        queue.push({
          fn: fn3,
          options: '数据3'
        })
        queue.push({
          fn: fn3,
          options: '数据31'
        })
        queue.push({
          fn: fn3,
          options: '数据32'
        })
        queue.push({
          fn: fn3,
          options: '数据33'
        })
      }, 1000)

    }, 500)
  })
}

queue.push({
  fn: fn1,
  options: '数据1'
}).push({
  fn: fn2,
  options: '数据2'
}).run()