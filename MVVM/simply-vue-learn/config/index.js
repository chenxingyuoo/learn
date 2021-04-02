/**
 * Created by chenxingyu on 2016/11/25.
 */
module.exports = {
    port : 9999,
    devServer : {
        // contentBase: './src/',  //指定webpack-dev-server 服务的文件夹 ， 不设置就是默认根目录
        // historyApiFallback: true,
        inline: true,
        hot: true, //开启热更新
        port: 9999,
        publicPath: '/assets/',
        noInfo: false
    }
};