;(() => {
    var modules = {
      "./src/index.js": function(module, exports, _require_) {
        eval(`const printA = _require_("./src/a.js");

printA();`)
      },
"./src/a.js": function(module, exports, _require_) {
        eval(`const printB = _require_("./src/b.js");

module.exports = function printA() {
  console.log('module a!');
  printB();
};`)
      },
"./src/b.js": function(module, exports, _require_) {
        eval(`module.exports = function printB() {
  console.log('module b!');
};`)
      }
    }
    var modules_cache = {}
    var _require_ = function(moduleId) {
      if (modules_cache[moduleId]) return modules_cache[moduleId].exports

      var module = modules_cache[moduleId] = {
        exports: {}
      }
      modules[moduleId](module, module.exports, _require_)
      return module.exports
    }

    _require_('./src/index.js')
  })()