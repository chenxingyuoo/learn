#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var os = require('os');
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var sortedObject = require('sorted-object');

var _exit = process.exit;
var eol = os.EOL;
var pkg = require('../package.json');

var version = pkg.version;

// Re-assign process.exit because of commander
// TODO: Switch to a different command framework
process.exit = exit

// CLI

before(program, 'outputHelp', function () {
  this.allowUnknownOption();
});

program
  .version(version)
  .usage('[options] [dir]')
  .option('-e, --ejs', 'add ejs engine support (defaults to pug/jade)')
  .option('    --hbs', 'add handlebars engine support')
  .option('-n, --nunjucks', 'add nunjucks engine support')
  .option('-H, --hogan', 'add hogan.js engine support')
  .option('-c, --css <engine>', 'add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)')
  .option('    --git', 'add .gitignore')
  .option('-f, --force', 'force on non-empty directory')
  .parse(process.argv);

if (!exit.exited) {
  main();
}

/**
 * Install a before function; AOP.
 */

function before(obj, method, fn) {
  var old = obj[method];

  obj[method] = function () {
    fn.call(this);
    old.apply(this, arguments);
  };
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm(msg, callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(msg, function (input) {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
}

/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */

function createApplication(app_name, path) {
  var wait = 5;

  console.log();
  function complete() {
    if (--wait) return;
    var prompt = launchedFromCmd() ? '>' : '$';

    console.log();
    console.log('   install dependencies:');
    console.log('     %s cd %s && npm install', prompt, path);
    console.log();
    console.log('   run the app:');

    if (launchedFromCmd()) {
      console.log('     %s SET DEBUG=koa* & npm start', prompt, app_name);
    } else {
      console.log('     %s DEBUG=%s:* npm start', prompt, app_name);
    }

    console.log();
  }

  // JavaScript
  var app = loadTemplate('js/app.js');
  var www = loadTemplate('js/www');
  var index = loadTemplate('js/routes/index.js');
  var users = loadTemplate('js/routes/users.js');

  // CSS
  var css = loadTemplate('css/style.css');
  var less = loadTemplate('css/style.less');
  var stylus = loadTemplate('css/style.styl');
  var compass = loadTemplate('css/style.scss');
  var sass = loadTemplate('css/style.sass');

  mkdir(path, function(){
    mkdir(path + '/public');
    mkdir(path + '/public/javascripts');
    mkdir(path + '/public/images');
    mkdir(path + '/public/stylesheets', function(){
      switch (program.css) {
        case 'less':
          write(path + '/public/stylesheets/style.less', less);
          break;
        case 'stylus':
          write(path + '/public/stylesheets/style.styl', stylus);
          break;
        case 'compass':
          write(path + '/public/stylesheets/style.scss', compass);
          break;
        case 'sass':
          write(path + '/public/stylesheets/style.sass', sass);
          break;
        default:
          write(path + '/public/stylesheets/style.css', css);
      }
      complete();
    });

    mkdir(path + '/routes', function(){
      write(path + '/routes/index.js', index);
      write(path + '/routes/users.js', users);
      complete();
    });

    mkdir(path + '/views', function(){
      switch (program.template) {
        case 'ejs':
          copy_template('ejs/index.ejs', path + '/views/index.ejs');
          copy_template('ejs/error.ejs', path + '/views/error.ejs');
          break;
        case 'nunjucks':
          copy_template('nunjucks/index.nunjucks', path + '/views/index.nunjucks');
          copy_template('nunjucks/layout.nunjucks', path + '/views/layout.nunjucks');
          copy_template('nunjucks/error.nunjucks', path + '/views/error.nunjucks');
          break;
        case 'jade':
        case 'pug':
          copy_template('jade/index.pug', path + '/views/index.pug');
          copy_template('jade/layout.pug', path + '/views/layout.pug');
          copy_template('jade/error.pug', path + '/views/error.pug');
          break;
        case 'hjs':
          copy_template('hogan/index.hjs', path + '/views/index.hjs');
          copy_template('hogan/error.hjs', path + '/views/error.hjs');
          break;
        case 'hbs':
          copy_template('hbs/index.hbs', path + '/views/index.hbs');
          copy_template('hbs/layout.hbs', path + '/views/layout.hbs');
          copy_template('hbs/error.hbs', path + '/views/error.hbs');
          break;
      }
      complete();
    });

    // CSS Engine support
    switch (program.css) {
      case 'less':
        app = app.replace('{css}', eol + 'app.use(require(\'less-middleware\')(path.join(__dirname, \'public\')));');
        break;
      case 'stylus':
        app = app.replace('{css}', eol + 'app.use(require(\'stylus\').middleware(path.join(__dirname, \'public\')));');
        break;
      case 'compass':
        app = app.replace('{css}', eol + 'app.use(require(\'node-compass\')({mode: \'expanded\'}));');
        break;
      case 'sass':
        app = app.replace('{css}', eol + 'app.use(require(\'node-sass-middleware\')({\n  src: path.join(__dirname, \'public\'),\n  dest: path.join(__dirname, \'public\'),\n  indentedSyntax: true,\n  sourceMap: true\n}));');
        break;
      default:
        app = app.replace('{css}', '');
    }

    // package.json
    var pkg = {
        name: app_name
      , version: '0.1.0'
      , private: true
      , "scripts": {
        "start": "node bin/www",
        "dev": "./node_modules/.bin/nodemon bin/www",
        "prd": "pm2 start bin/www",
        "test": "echo \"Error: no test specified\" && exit 1"
      }
      , "dependencies": {
        "debug": "^2.6.3",
        "koa": "^2.2.0",
        "koa-bodyparser": "^3.2.0",
        "koa-convert": "^1.2.0",
        "koa-json": "^2.0.2",
        "koa-logger": "^2.0.1",
        "koa-onerror": "^1.2.1",
        "koa-router": "^7.1.1",
        "koa-static": "^3.0.0",
        "koa-views": "^5.2.1"
      }
      , "devDependencies": {
        "nodemon": "^1.8.1"
      }
    }

    // Template support
    switch (program.template) {
      case 'jade':
      case 'pug':
        pkg.dependencies['pug'] = '^2.0.0-rc.1';
        break;
      case 'ejs':
        pkg.dependencies['ejs'] = '~2.3.3';
        break;
      case 'nunjucks':
        pkg.dependencies['nunjucks'] = '~3.0.0 ';
        break;
      case 'hjs':
        pkg.dependencies['hjs'] = '~0.0.6';
        break;
      case 'hbs':
        pkg.dependencies['handlebars'] = '~4.0.5';
        app = app.replace('\'{views}\'', '\'{views}\',\n  map: { hbs: \'handlebars\' }');
        break;
      default:
    }

    app = app.replace('{views}', program.template);

    // CSS Engine support
    switch (program.css) {
      case 'less':
        pkg.dependencies['less-middleware'] = '1.0.x';
        break;
      case 'compass':
        pkg.dependencies['node-compass'] = '0.2.3';
        break;
      case 'stylus':
        pkg.dependencies['stylus'] = '0.42.3';
        break;
      case 'sass':
        pkg.dependencies['node-sass-middleware'] = '0.8.0';
        break;
      default:
    }

    // sort dependencies like npm(1)
    pkg.dependencies = sortedObject(pkg.dependencies);

    // write files
    write(path + '/package.json', JSON.stringify(pkg, null, 2));
    write(path + '/app.js', app);
    mkdir(path + '/bin', function(){
      www = www.replace('{name}', app_name);
      write(path + '/bin/www', www, 0755);

      complete();
    });

    if (program.git) {
      write(path + '/.gitignore', fs.readFileSync(__dirname + '/../templates2/js/gitignore', 'utf-8'));
    }

    complete();
  });
}

function copy_template(from, to) {
  from = path.join(__dirname, '..', 'templates2', from);
  write(to, fs.readFileSync(from, 'utf-8'));
}

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}

/**
 * Graceful exit for async STDIO
 */

function exit(code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done() {
    if (!(draining--)) _exit(code);
  }

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  exit.exited = true;

  streams.forEach(function(stream){
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });

  done();
}

/**
 * Determine if launched from cmd.exe
 */

function launchedFromCmd() {
  return process.platform === 'win32'
    && process.env._ === undefined;
}

/**
 * Load template file.
 */

function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates2', name), 'utf-8');
}

/**
 * Main program.
 */

function main() {
  // Path
  var destinationPath = program.args.shift() || '.';

  // App name
  var appName = path.basename(path.resolve(destinationPath));

  // Template engine
  program.template = 'pug';
  if (program.ejs) program.template = 'ejs';
  if (program.jade) program.template = 'pug';
  if (program.hogan) program.template = 'hjs';
  if (program.hbs) program.template = 'hbs';
  if (program.nunjucks) program.template = 'nunjucks';

  // Generate application
  emptyDirectory(destinationPath, function (empty) {
    if (empty || program.force) {
      createApplication(appName, destinationPath);
    } else {
      confirm('destination is not empty, continue? [y/N] ', function (ok) {
        if (ok) {
          process.stdin.destroy();
          createApplication(appName, destinationPath);
        } else {
          console.error('aborting');
          exit(1);
        }
      });
    }
  });
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}