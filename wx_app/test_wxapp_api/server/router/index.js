/**
 * Created on 2017/6/15.
 */

'use strict'

const router = require('koa-router')()
const viewControl = require('../controller/views')
const userControl = require('../controller/user')

//首页
router.get('/', viewControl.index)


/**
 * 用户模块
 */

//用户注册
router.post('/userSignup', userControl.userSignup)
//用户登录
router.post('/userSignin', userControl.userSignin)
//用户退出登录
router.post('/userSignout', userControl.userSignout)

module.exports = router
