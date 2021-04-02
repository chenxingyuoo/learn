/**
 * Created by mac on 16/3/21.
 */
(function() {
    var es = function(selector) {
        return new es.prototype.init(selector);
    };

    es.domReady = function(fn) {
        document.addEventListener('DOMContentLoaded', function() {
            fn && fn();
        }, false);

    };

    es.each = function(obj, cb) {
        var ret, i = 0;
        if (obj.length === +obj.length) { //鸭辩
            while(obj.length !== i) {
                ret = cb.call(obj[i], i, obj[i]);
                if (ret === 'break') {
                    break;
                }
                if (ret !== undefined) {
                    return ret;
                }
                i++;
            }
        }

        else if (obj instanceof Object) {
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    ret = cb.call(obj[k], k, obj[k]);
                    if (ret === 'break') {
                        break;
                    }
                    if (ret !== undefined) {
                        return ret;
                    }
                }
            }
        }
    };

    es.event = function() {
        var events = [];
        var types = ['click']
        return {
            on: function(type, cb) {
                var arr = events[type] = events[type] || [];

                if (types.indexOf(type) !== -1) {
                    es.each(this, function(i, el) {
                        el.addEventListener(type, cb);
                    });
                }

                if (arr.indexOf(cb) === -1) {
                    arr.push(cb);
                }
                return this;
            },
            off: function(type, cb) {
                var arr = events[type] = events[type] || [], i = 0;

                //传统事件
                if (types.indexOf(type) !== -1) {
                    es.each(this, function(i, el) {
                        cb && el.removeEventListener(type, cb);
                        if (!cb) {
                            es.each(events[type], function(i, cb) {
                                el.removeEventListener(type, cb);
                            });
                        }
                    });
                }

                if(!cb) events[type] = [];
                cb && es.each(arr, function(i, fn) {
                    if (fn === cb) {
                        arr.splice(i, 1);
                        return 'break';
                    }
                });

                return this;
            },
            emit: function(type) {
                var arr = events[type] = events[type] || [], self = this, argv = arguments;
                es.each(arr, function(i, fn) {
                    fn.apply(self, [].slice.call(argv, 1));
                });
            }
        }
    }();

    es.ajax = function (opt) {
        var callback = opt.callback || function() {};
        var type = opt.type || 'GET';
        var req = new XMLHttpRequest();
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.open(type, URL, true);
        req.onreadystatechange = function() {
            if (req.status === 200) {
                callback(null, req.responseText);
            } else {
                callback(new Error(req.statusText), req.response);
            }
        };
        req.onerror = function() {
            callback(new Error(req.statusText));
        };
        req.send(opt.data ? opt.data : null);
    };

    es.get = function(url, data, callback) {
        es.ajax({
            url : url,
            data: data,
            callback : callback
        });
    };

    es.post = function(url, callback) {
        es.ajax({
            type: 'POST',
            data: data,
            callback: callback
        });
    };

    var oo = es.prototype = {
        constructor: es,
        splice: [].splice,
        shift: [].shift,
        push: [].push,
        length: 0,
    };


    oo.init = function(selector) {
        var els;

        if (typeof selector === 'string') {
            els = document.querySelectorAll(selector), els = [].slice.call(els, 0);
        } else if(selector instanceof HTMLElement) {
            els = [selector];
        } else if (selector instanceof es) {
            return es;
        } else if (selector instanceof Array) {
            els = selector;
        }

        while(els[0]) {
            this.push(els.shift());
        }
    };

    oo.init.prototype = oo;

    oo.each = function(cb) {
        return es.each(this, function(i, el) {
            return cb.call(el, i, el);
        });
    };

    oo.is = function(name) {
        return es.each(this, function(i, el) {
            if (name.slice(0, 1) === '#') {
                return el.id === name.slice(1);
            }
            else if(name.slice(0, 1) === '.') {
                return el.classList.contains(name.slice(1));
            }
            else {
                return el.tagName.toLowerCase() === name.toLowerCase()
            }
        });
    };

    oo.addClass = function(cls) {
        es.each(this, function(i, el) {
            el.classList.add(cls);
        });
        return this;
    };

    oo.removeClass = function(cls) {
        es.each(this, function(i, el) {
            el.classList.remove(cls);
        });
        return this;
    };

    oo.addStyle = function(cssText) {
        es.each(this, function(i, el) {
            el.style.cssText = cssText;
        });
        return this;
    };

    oo.next = function() {
        var self = this;
        es.each(this, function(i, el) {
            self[i] = el.nextElementSibling;
        });
        return this;
    };


    oo.prev = function() {
        var self = this;
        es.each(this, function(i, el) {
            self[i] = el.previousElementSibling;
        });
        return this;
    };

    oo.parent = function(selector) {
        var parent = [];
        es.each(this, function(i, el) {
            if (parent.indexOf(el.parentNode) === -1) {
                parent.push(el.parentNode);
            }
        });

        this.length = 0;
        while(parent[0]) {
            var el = parent.shift();
            if (selector) {
                es(el).is(selector) && this.push(el);
            } else {
                this.push(el);
            }
        };
        return this;
    };

    oo.children = function(selector) {
        var children = [], el;
        es.each(this, function(i, el) {
            children = children.concat([].slice.call(el.children, 0));
        });

        this.length = 0;

        while(children[0]) {
            el = children.shift();
            if (!selector) {
                this.push(el);
            }
            if (selector && es(el).is(selector)) {
                this.push(el);
            }
        }
        return this;
    };

    oo.find = function(selector) {
        var all = [];
        es.each(this, function(i, el) {
            all = all.concat([].slice.call(el.querySelectorAll(selector), 0));
        });

        this.length = 0;
        while(all[0]) {
            this.push(all.shift());
        }
        return this;
    };

    oo.first = function() {
        return es(this[0]);
    };

    oo.last = function() {
        return es(this[this.length - 1]);
    };

    oo.attr = function(key, value) {
        if (value === undefined) {
            return es.each(this, function(i, el) {
                return el.getAttribute(key);
            });
        }

        es.each(this, function(i, el) {
            el.setAttribute(key, value);
        });
        return this;
    };

    es.insert = function (arr, pos, str) {
        es.each(arr, function(i, el) {
            el.insertAdjacentHTML(pos, str);
        });
    };

    oo.append = function(str) {
        if (typeof str === 'string') {
            es.insert(this, 'beforeend', str);
        }

        if (str instanceof HTMLElement) {
            es.each(this, function(i, el) {
                el.appendChild(str);
                return 'break';
            });
        }
        return this;
    };

    oo.after = function(str) {
        es.insert(this, 'afterend', str);
        return this;
    };

    oo.before = function(str) {
        es.insert(this, 'beforebegin', str);
        return this;
    };

    oo.prepend = function(str) {
        es.insert(this, 'afterbegin', str);
        return this;
    };

    oo.on = es.event.on;
    oo.off = es.event.off;
    oo.emit = es.event.emit;

    window.es = es;

})();