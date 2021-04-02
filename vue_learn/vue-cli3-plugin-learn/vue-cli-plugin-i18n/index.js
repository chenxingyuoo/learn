const WebpackPluginVueI18n = require('../webpack-plugin-vue-i18n/')

module.exports = (api, projectOptions) => {
  api.chainWebpack(webpackConfig => {
    console.log('sss')

    // 通过 webpack-chain 修改 webpack 配置
    webpackConfig.plugin('webpack-plugin-vue-i18n')
      .use(new WebpackPluginVueI18n(projectOptions.pluginOptions.i18n.output))
  })

  api.configureWebpack(webpackConfig => {
    // 修改 webpack 配置
    // 或返回通过 webpack-merge 合并的配置对象
  })

  api.registerCommand('i18n', args => {
    // 注册 `vue-cli-service i18n`
    console.log('i18n 命令注册成功')
    // projectOptions 拿到的是 vue.config.js 文件暴露出来的配置
    console.log(projectOptions.pluginOptions.i18n.param)
  })
}
