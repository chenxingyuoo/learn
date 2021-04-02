/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}

/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}

/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}


/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "52bd030eb5e68ee74d85"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}

/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},

/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}

/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}

/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chenxingyu on 2016/11/25.
	 */
	var _compile = __webpack_require__(2);
	var compileRoot = _compile.compileRoot;
	var compile = _compile.compile;
	var observe = __webpack_require__(8);
	var Directive = __webpack_require__(5);

	// import Directive from './directive';

	window.Vue = Vue;

	function Vue(options) {
	    this._init(options);
	}

	//初始化
	Vue.prototype._init = function (options) {
	    this.$options = options;
	    this._directives = [];
	    this._watchers = [];
	    this._isVue = true;

	    this._initState();
	    this.$mount(options.el);
	};

	Vue.prototype._initState = function () {
	    this._initProp();
	    this._initData();
	};

	Vue.prototype._initProp = function () {
	    var options = this.$options;
	    options.el = document.querySelector(options.el);
	};

	Vue.prototype._initData = function () {
	    debugger;
	    var data = this._data = this.$options.data || {};
	    Object.keys(this._data).forEach(function (key) {
	        this._proxy(key);
	    }, this);

	    observe(data, this);
	};

	//在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。
	Vue.prototype._proxy = function (key) {
	    var self = this;
	    Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	            return self._data[key];
	        },
	        set: function proxySetter(val) {
	            self._data[key] = val;
	        }
	    });
	};

	Vue.prototype.$mount = function (el) {
	    this._compile(el);
	};

	Vue.prototype._compile = function (el) {
	    var original = el;
	    compileRoot(el)(this, el);
	    compile(el)(this, el);
	};

	Vue.prototype._bindDir = function (descriptor, node) {
	    debugger;
	    //实力化 Directive
	    this._directives.push(new Directive(descriptor, this, node));
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chenxingyu on 2016/11/25.
	 */
	var directives = __webpack_require__(3);
	var toArray = __webpack_require__(4).toArray;
	var replace = __webpack_require__(4).replace;

	// debugger;

	var regTag = /{{([^{}]+)}}/g;

	exports.compileRoot = function compileRoot(el, options) {
	    return function rootLinkFn(vm, el) {
	        // TODO
	    };
	};

	//编译
	exports.compile = function compile(el, options) {
	    // debugger;
	    var nodeLinkFn = compileNode(el, options); //编译节点
	    var childLinkFn = el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null; //如果该节点下面还有子节点 ， 编译节点列表

	    return function compositeLinkFn(vm, el) {
	        debugger;
	        var childNodes = [].slice.call(el.childNodes);
	        linkAndCapture(function compositeLinkCapturer() {
	            debugger;
	            if (nodeLinkFn) nodeLinkFn(vm, el);
	            if (childLinkFn) childLinkFn(vm, childNodes);
	        }, vm);
	    };
	};

	//链接和捕获
	function linkAndCapture(linker, vm) {
	    debugger;
	    var originalDirCount = vm._directives.length;
	    linker();
	    var dirs = vm._directives.slice(originalDirCount);
	    dirs.forEach(function (dir) {
	        dir._bind();
	    });
	    return dirs;
	}

	//编译节点
	function compileNode(node, options) {
	    // debugger;
	    if (node.nodeType === 1) {
	        return compileElement(node, options);
	    } else if (node.nodeType === 3) {
	        return compileTextNode(node, options);
	    } else {
	        return null;
	    }
	}

	//编译htm节点
	function compileElement(node, options) {
	    // debugger;
	    // 只处理 input[type="text"][v-model]
	    if (node.tagName === 'INPUT' && node.hasAttribute('v-model')) {
	        var exp = node.getAttribute('v-model').trim();
	        return makeNodeLinkFn({
	            name: 'model',
	            exp: exp,
	            def: directives.model
	        });
	    } else {
	        return null;
	    }
	}

	//编译文本
	function compileTextNode(node, options) {

	    var tokens = parseText(node.wholeText);
	    if (tokens) {
	        // debugger;
	        var frag = document.createDocumentFragment();
	        tokens.forEach(function (token) {
	            debugger;
	            var el = token.tag ? processTextToken(token) : document.createTextNode(token.value);
	            frag.appendChild(el);
	        });
	        return makeTextNodeLinkFn(tokens, frag);
	    }
	}

	//编译节点列表
	function compileNodeList(nodeList, options) {
	    // debugger;
	    var linkFns = [];
	    var nodeLinkFn, childLinkFn, node;
	    for (var i = 0, l = nodeList.length; i < l; i++) {
	        node = nodeList[i];
	        nodeLinkFn = compileNode(node, options); //编译节点
	        childLinkFn = node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null; //如果该节点下面还有子节点 ， 递归编译节点列表
	        linkFns.push(nodeLinkFn, childLinkFn);
	    }
	    return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	//使节点链接到 nodeLinkFn
	function makeNodeLinkFn(dir) {
	    // debugger;
	    return function nodeLinkFn(vm, el) {
	        // debugger;
	        vm._bindDir(dir, el);
	    };
	}

	//使子节点节点链接到 childLinkFn
	function makeChildLinkFn(linkFns) {
	    // debugger;
	    return function childLinkFn(vm, nodes) {
	        // debugger;
	        var node, nodeLinkFn, childrenLinkFn;
	        for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	            node = nodes[n];
	            nodeLinkFn = linkFns[i++];
	            childrenLinkFn = linkFns[i++];
	            if (nodeLinkFn) nodeLinkFn(vm, node);
	            if (childrenLinkFn) childrenLinkFn(vm, toArray(node.childNodes));
	        }
	    };
	}

	//使文本节点链接到 textNodeLinkFn
	function makeTextNodeLinkFn(tokens, frag) {
	    // debugger;
	    return function textNodeLinkFn(vm, el) {
	        // debugger;
	        var fragClone = frag.cloneNode(true);
	        var childNodes = toArray(fragClone.childNodes);
	        tokens.forEach(function (token, i) {
	            var value = token.value;
	            if (token.tag) {
	                var node = childNodes[i];
	                vm._bindDir(token.descriptor, node);
	            }
	        });
	        replace(el, fragClone);
	    };
	}

	//过程文本标记
	function processTextToken(token) {
	    // debugger;
	    var el = document.createTextNode(' ');
	    // 简化，双向绑定，text 模式
	    token.descriptor = {
	        name: 'text',
	        exp: token.value,
	        def: directives.text
	    };
	    return el;
	}

	//解析 {{ }} 文本
	function parseText(text) {

	    //正则表达式匹配
	    if (!regTag.test(text)) {
	        return;
	    }

	    var tokens = [];
	    var lastIndex = regTag.lastIndex = 0;
	    var match, index, value;

	    while (match = regTag.exec(text)) {

	        index = match.index;

	        // push text token
	        if (index > lastIndex) {
	            tokens.push({
	                value: text.slice(lastIndex, index)
	            });
	        }

	        value = match[1];

	        tokens.push({
	            tag: true,
	            value: value.trim()
	        });

	        lastIndex = index + match[0].length;
	    }

	    if (lastIndex < text.length) {
	        tokens.push(JSON.stringify(text.slice(lastIndex)));
	    }

	    // debugger;

	    return tokens;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2016/11/25.
	 */
	exports.model = {
	    bind: function () {
	        debugger;
	        var self = this;
	        this.on('change', function () {
	            self.set(self.el.value);
	        });
	    },
	    update: function (value) {
	        debugger;
	        this.el.value = value;
	    }
	};

	exports.text = {
	    bind: function () {
	        // do nothing
	    },
	    update: function (value) {
	        debugger;
	        this.el.textContent = value;
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	exports.replace = function replace(target, el) {
		debugger;
		target.parentNode.replaceChild(el, target);
	};

	exports.toArray = function toArray(list) {
		debugger;
		var l = list.length;
		var ret = new Array(l);
		while (l--) {
			ret[l] = list[l];
		}
		return ret;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chenxingyu on 2016/11/25.
	 */

	var Watcher = __webpack_require__(6);

	module.exports = Directive;

	function Directive(descriptor, vm, el) {
	    debugger;
	    this.vm = vm;
	    this.el = el;
	    this.descriptor = descriptor;
	    this.name = descriptor.name;
	    this.expression = descriptor.exp;
	}

	//执行 descriptor 对象里面 bind 、 update 方法 ，  实例化 Watcher
	Directive.prototype._bind = function () {
	    debugger;
	    var name = this.name;
	    var descriptor = this.descriptor;

	    if (this.el && this.el.removeAttribute) {
	        this.el.removeAttribute(descriptor.attr || 'v-' + name);
	    }

	    var def = descriptor.def;
	    this.update = def.update;
	    this.bind = def.bind;
	    if (this.bind) this.bind();

	    //传给 Watcher 的回调函数
	    this._update = function (val) {
	        this.update(val);
	    }.bind(this);

	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update);
	    this.update(watcher.value);
	};

	//
	Directive.prototype.set = function (value) {
	    debugger;
	    this._watcher.set(value);
	};

	//事件绑定
	Directive.prototype.on = function (event, handler) {
	    debugger;
	    this.el.addEventListener(event, handler, false);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chenxingyu on 2016/11/25.
	 */

	var Dep = __webpack_require__(7);

	module.exports = Watcher;

	function Watcher(vm, exp, cb) {
	    debugger;
	    this.vm = vm;
	    vm._watchers.push(this);
	    this.exp = exp;
	    this.cb = cb;
	    this.deps = [];
	    this.depIds = {};
	    this.getter = function (vm) {
	        debugger;
	        return vm[exp]; //获取vm里面的属性 ，如果该属性是 Object.defineProperty方法定义的 ，并且有定义 get 方法 ， 则会自动执行 get 方法
	    };
	    this.setter = function (vm, value) {
	        vm[exp] = value;
	    };

	    this.value = this.get();
	}

	Watcher.prototype.get = function () {
	    debugger;
	    Dep.target = this;
	    var value = this.getter.call(this.vm, this.vm);
	    Dep.target = null;
	    return value;
	};

	Watcher.prototype.set = function (value) {
	    debugger;
	    this.setter.call(this.vm, this.vm, value);
	};

	Watcher.prototype.addDep = function (dep) {
	    debugger;
	    var id = dep.id;
	    if (!this.depIds[id]) {
	        dep.addSub(this);
	        this.depIds[id] = true;
	        this.deps.push(dep);
	    }
	};

	Watcher.prototype.update = function () {
	    debugger;
	    this.run();
	};

	Watcher.prototype.run = function () {
	    debugger;
	    var value = this.get();
	    if (this.value !== value) {
	        var oldValue = this.value;
	        this.value = value;
	        this.cb.call(this.vm, value, oldValue);
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by chenxingyu on 2016/11/25.
	 */
	var uid = 0;

	module.exports = Dep;

	function Dep() {
	    debugger;
	    this.id = uid++;
	    this.subs = [];
	}

	Dep.target = null;

	Dep.prototype.addSub = function (sub) {
	    debugger;
	    this.subs.push(sub);
	};

	Dep.prototype.depend = function () {
	    debugger;
	    Dep.target.addDep(this);
	};

	Dep.prototype.notify = function () {
	    debugger;
	    this.subs.forEach(function (sub) {
	        debugger;
	        sub.update();
	    });
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chenxingyu on 2016/11/28.
	 */
	var Dep = __webpack_require__(7);

	module.exports = function observe(value, vm) {
	    debugger;
	    var ob;
	    if (value.hasOwnProperty('__ob__')) {
	        ob = value.__ob__;
	    } else {
	        ob = new Observer(value);
	    }
	    if (ob && vm) {
	        ob.addVm(vm);
	    }
	    return vm;
	};

	function Observer(value) {
	    debugger;
	    this.value = value;
	    Object.defineProperty(value, '__ob__', {
	        value: this,
	        enumerable: false,
	        writable: true,
	        configurable: true
	    });

	    this.walk(value);
	}

	Observer.prototype.walk = function (obj) {
	    debugger;
	    Object.keys(obj).forEach(function (key) {
	        debugger;
	        this.convert(key, obj[key]);
	    }, this);
	};

	Observer.prototype.convert = function (key, value) {
	    debugger;
	    defineReactive(this.value, key, value);
	};

	Observer.prototype.addVm = function (vm) {
	    debugger;
	    (this.vms || (this.vms = [])).push(vm);
	};

	function defineReactive(obj, key, value) {
	    debugger;
	    var dep = new Dep();
	    Object.defineProperty(obj, key, {
	        enumerable: true,
	        configurable: true,
	        get: function reactiveGetter() {
	            debugger;
	            if (Dep.target) {
	                dep.depend();
	            }
	            return value;
	        },
	        set: function reactiveSetter(newVal) {
	            debugger;
	            if (value === newVal) {
	                return;
	            } else {
	                value = newVal;
	                dep.notify();
	            }
	        }
	    });
	}

/***/ }
/******/ ]);