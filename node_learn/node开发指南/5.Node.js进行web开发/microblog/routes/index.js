var express = require('express');
var router = express.Router();
var controlIndex = require('../controller/index');

// request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。
// response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。


router.get('/', controlIndex.index);

router.get('/user/:user', controlIndex.user);

router.post('/post', controlIndex.post);

router.get('/reg', controlIndex.checkNotLogin, controlIndex.reg);

router.post('/reg', controlIndex.checkNotLogin, controlIndex.doReg);

router.get('/login', controlIndex.checkNotLogin, controlIndex.login);

router.post('/login', controlIndex.checkNotLogin, controlIndex.doLogin);

// router.get('/logout', controlIndex.checkLogin);
router.get('/logout', controlIndex.checkLogin, controlIndex.logout);


module.exports = router;
