/**
 * Created on 2017/6/30.
 */

'use strict';

function noop() {

}

function bind(fn, thisArg) {
    return function () {
        fn.apply(thisArg, arguments);
    };
}

function Promise(fn) {
    debugger;
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 'pendign';
    this._value = undefined;
    this._deferreds = [];  //callbacks为数组，因为可能同时有很多个回调

    doResolve(fn, this);

}

//接受
function resolve(self, newValue) {
    debugger;
    try {
        if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                doResolve(bind(then, newValue), self);
                return;
            }
        }

        self._state = 'fulfilled';
        self._value = newValue;
        finale(self);
    } catch (e) {
        reject(self, e);
    }
}

//拒绝
function reject(self, newValue) {
    self._state = 'rejected';
    self._value = newValue;
    finale(self);
}

function finale(self) {
    debugger;

    if (self._state === 'rejected') {
        Promise._immediateFn(function (){
            Promise._unhandledRejectionFn(self._value);
        });
    }

    self._deferreds.forEach(function (deferred) {
        debugger;
        handle(self, deferred);
    });
    self._deferreds = null;
}


function doResolve(fn, self) {
    debugger;
    try {
        fn(function (value) {
            debugger;
            resolve(self, value);
        }, function (reason) {
            debugger;
            reject(self, reason);
        });
    } catch (e){
        reject(self, e);
    }
}


function handle(self, deferred) {
    if (self._state === 'pendign') {
        self._deferreds.push(deferred);
        return;
    }

    Promise._immediateFn(function () {
        var cb = self._state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected;
        var ret;

        if (cb === null) {
            cb = self._state === 'fulfilled' ? resolve : reject;
            cb(deferred.promise, self._value);
            return;
        }

        try {
            ret = cb(self._value);
        } catch (e) {
            reject(deferred.promise, e);
            return;
        }

        resolve(deferred.promise, ret);
    });


}


Promise.prototype.then = function (onFulfilled, onRejected) {
    debugger;
    var promise = new (this.constructor)(noop);

    handle(this, {
        onFulfilled: onFulfilled,
        onRejected: onRejected,
        promise: promise
    });

    return promise;
};

Promise.prototype['catch'] = function (onRejected) {
    debugger;
    return this.then(null, onRejected);
};


Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
    }

    return new Promise(function (resolve) {
        resolve(value);
    });
};

Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
        reject(value);
    });
};

Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve, reject);
        }
    });
};


// Use polyfill for setImmediate for performance gains
Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
        debugger;
        setTimeout(fn, 0);
    };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
};


// Promise.prototype.then = function (onFulfilled, onRejected) {
//   debugger;
//   let self = this;
//
//   return new Promise(function (resolve) {
//     debugger;
//     handle(self, {
//       onFulfilled: onFulfilled || null,
//       resolve: resolve
//     });
//   });
// };


