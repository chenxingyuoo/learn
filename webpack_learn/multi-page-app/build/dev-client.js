/**
 * Created by chenxingyu on 2017/2/10.
 */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})
