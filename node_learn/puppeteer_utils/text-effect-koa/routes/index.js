const users = require('./users')
const textEffects = require('./text-effects')

// 初始路由
module.exports = function(app) {
  app.use(users.routes(), users.allowedMethods())
  app.use(textEffects.routes(), textEffects.allowedMethods())
}