/**
 * Created by mac on 15/12/29.
 */

var Module = require('./Module');
var module = new Module(filename, parent);
    console.log('modules.id: ', module.id);
console.log('module.id: ', module.id);
console.log('module.exports: ', module.exports);
console.log('module.parent: ', module.parent);
console.log('module.filename: ', module.filename);
console.log('module.loaded: ', module.loaded);
console.log('module.children: ', module.children);
console.log('module.paths: ', module.paths);
