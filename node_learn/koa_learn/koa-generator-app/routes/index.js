var router = require('koa-router')()

router.get('/', function* (next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  })
})

router.get('/foo', function* (next) {
  yield this.render('index', {
    title: 'Hello World foo!'
  })
})

router.get('/getData', function* (next) {
  var data = [
    // {
    //   s: '1',
    //   x: '2012',
    //   y: 826
    // },
    // {
    //   s: '1',
    //   x: '2013',
    //   y: 826
    // },
    {
      s: '1',
      x: '2014',
      y: 826
    },
    {
      s: '1',
      x: '2015',
      y: 826
    },
    {
      s: '1',
      x: '2016',
      y: 826
    },
    {
      s: '1',
      x: '2017',
      y: 229
    },
    {
      s: '1',
      x: '2018',
      y: 588
    },
    {
      s: '1',
      x: '2019',
      y: 782
    },
    {
      s: '1',
      x: '2020',
      y: 699
    },
    {
      s: '1',
      x: '2021',
      y: 367
    },
    {
      s: '2',
      x: '2014',
      y: 931
    },
    {
      s: '2',
      x: '2015',
      y: 231
    },
    {
      s: '2',
      x: '2016',
      y: 231
    },
    {
      s: '2',
      x: '2017',
      y: 452
    },
    {
      s: '2',
      x: '2018',
      y: 234
    },
    {
      s: '2',
      x: '2019',
      y: 586
    },
    {
      s: '2',
      x: '2020',
      y: 530
    },
    {
      s: '2',
      x: '2021',
      y: 342
    },
    {
      s: '3',
      x: '2014',
      y: 131
    },
    {
      s: '3',
      x: '2015',
      y: 331
    },
    {
      s: '3',
      x: '2016',
      y: 131
    },
    {
      s: '3',
      x: '2017',
      y: 252
    },
    {
      s: '3',
      x: '2018',
      y: 334
    },
    {
      s: '3',
      x: '2019',
      y: 886
    },
    {
      s: '3',
      x: '2020',
      y: 430
    },
    {
      s: '3',
      x: '2021',
      y: 742
    }
    // {
    //   s: '3',
    //   x: '2022',
    //   y: 431
    // },
    // {
    //   s: '3',
    //   x: '2023',
    //   y: 743
    // },
    // {
    //   s: '3',
    //   x: '2024',
    //   y: 432
    // },
    // {
    //   s: '3',
    //   x: '2025',
    //   y: 745
    // }
  ]

  data = data
    .filter(function (item, index) {
      return index % 2 === 0
    })
    .map(function (item, index) {
      return {
        ...item,
        x: Number(item.x) + '年'
      }
    })

  this.body = data
})

module.exports = router
