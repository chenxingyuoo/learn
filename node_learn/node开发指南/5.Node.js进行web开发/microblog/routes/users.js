var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/*router.all('/:username', function (req, res, next) {
    console.log(req.params);
    console.log('all methods captured');
    next();
});

router.get('/:username', function (req, res) {
    console.log(req.params);
    res.send('user: ' + req.params.username);
});*/


// router.all是一个非常有用的工具，可以让我们 易地实现中间件，而且还能提高代码的复用程  。例如我们 对一个用户查询信息和修改信息的操作，
// 分别对应了 GET 和 PUT 操作，而 两者共有的一个步骤是  用  是 合法，因此可以通过 next() 方法实现

var users = {
    'byvoid': {
        name: 'Carbo',
        website: 'http://www.byvoid.com'
    }
};

//中间件
router.all('/:username', function (req, res, next) {
    var username = req.params.username;
    if (users[username]) {
        next();
    } else {
        next(new Error(username + ' does not exist.'));
    }
});

//获取用户信息
router.get('/:username', function(req, res) {
    res.send(JSON.stringify(users[req.params.username]));
});

//修改用户信息
router.put('/:username',function (req, res){
    res.send('Done');
});


module.exports = router;
