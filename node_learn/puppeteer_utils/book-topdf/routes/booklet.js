const router = require('koa-router')()
const juejinControl = require('../controllers/juejin')

router.prefix('/booklet-topdf')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a booklet-topdf response!'
})

router.get('/juejin', juejinControl.index)

router.get('/mergePdf', juejinControl.mergePdf)


module.exports = router
