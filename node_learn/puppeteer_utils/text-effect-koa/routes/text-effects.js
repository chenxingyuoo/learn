const router = require('koa-router')()
const controller = require('../controller/text-effects')

router.prefix('/text-effects')

router.get('/preview', controller.preview)
router.post('/screenshot', controller.screenshot)

module.exports = router