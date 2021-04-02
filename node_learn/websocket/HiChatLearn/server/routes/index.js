/**
 * Created by chenxingyu on 2016/12/7.
 */

module.exports = function (app) {
    app.use('/',function (req, res) {
        //模型下的fetch 方法 ， 查找数据库所有数据
        res.render('index',{
            title : 'hiChat'
        });
    })
}