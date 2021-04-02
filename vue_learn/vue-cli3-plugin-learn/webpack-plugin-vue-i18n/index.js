const pluginName = Symbol('webpackPluginVueI18n')
const fs = require('fs')
const path = require('path')
const resolve = f => path.resolve(process.cwd(), f)

function getTranslateKey (source) {
  let result = {}
  const reg = /\$t\(('|")([^('|")]+)('|")(,(.*))?\)/gm
  let matchKey

  while (matchKey = reg.exec(source)) {
    result[matchKey[2]] = matchKey[2]
  }

  return result
}

class webpackPluginVueI18n {
  constructor (output) {
    console.log('xxx')
    this.output = output
    this.__cache = {}
  }
  apply (compiler) {
    // 指定一个挂载到 webpack 自身的事件钩子。
    compiler.plugin('emit', (compilation /* 处理 webpack 内部实例的特定数据。 */, callback) => {
      const chunks = compilation.chunks
      const files = []
      chunks.forEach(chunk => {
        files.push(...chunk.files)
      })

      files.forEach(file => {
        const asset = compilation.assets[file]
        if (asset) {
          const content = asset.source()
          const result = getTranslateKey(content)
          Object.keys(result).forEach(key => {
            this.__cache[key] = result[key]
          })
          console.log('result', result)
        }
      })

      this.writeTranslateKeyFile()

      // 功能完成后调用 webpack 提供的回调。
      callback()
    })
  }

  writeTranslateKeyFile () {
    let content = JSON.stringify(this.__cache, null, 2)

    const file = resolve(this.output)
    if (fs.existsSync(file)) {
      const fileContent = fs.readFileSync(file, 'utf8')
      content = fileContent.replace(/\/\*\s?i18n\s?\*\/([^\*]*)\/\*\s?i18n\s?end\s?\*\//gm, `/* i18n */${content}/* i18n end */`)
    } else {
      content = `export default /* i18n */${content}/* i8n end */`
    }

    fs.writeFileSync(file, content)
  }
}

module.exports = webpackPluginVueI18n
