/**
 * Created by chenxingyu on 2017/2/12.
 */
// require('./check-versions')()
require('shelljs/global');

const path = require('path');
const ora = require('ora');
const chalk = require('chalk')
const webpack = require('webpack');
const prodWebpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

const assetsPath = prodWebpackConfig.output.path;
//永久删除文件
rm('-rf', assetsPath);
//新建文件
mkdir('-p', assetsPath);

webpack(prodWebpackConfig, function (err, stats) {
    spinner.stop();
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');

   console.log(chalk.cyan('  Build complete.\n'))
   console.log(chalk.yellow(
     '  Tip: built files are meant to be served over an HTTP server.\n' +
     '  Opening index.html over file:// won\'t work.\n'
   )) 
});