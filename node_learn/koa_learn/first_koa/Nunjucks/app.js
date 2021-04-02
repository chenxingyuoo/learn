/**
 * Created on 2017/6/2.
 */

'use strict';

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const nunjucks = require('nunjucks');

const app = new Koa();

app.use(bodyParser());

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

// var s = env.render('hello.html', { name: '小明' });
// console.log(s);

nunjucks.configure('views', { autoescape: true });
var s = nunjucks.render('hello.html', {
    header: 'Hello',
    body: 'bla bla bla...'
});
console.log(s);

app.listen(3000);
console.log('app started alst port 3000...');