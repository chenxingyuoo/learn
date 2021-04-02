!function (t) {
  function i(e) {
    if (n[e]) return n[e].exports;
    var a = n[e] = {exports: {}, id: e, loaded: !1};
    return t[e].call(a.exports, a, a.exports, i), a.loaded = !0, a.exports
  }

  var e = window.webpackJsonp;
  window.webpackJsonp = function (n, o) {
    for (var r, s, h = 0, u = []; h < n.length; h++) s = n[h], a[s] && u.push.apply(u, a[s]), a[s] = 0;
    for (r in o) t[r] = o[r];
    for (e && e(n, o); u.length;) u.shift().call(null, i)
  };
  var n = {}, a = {1: 0};
  return i.e = function (t, e) {
    if (0 === a[t]) return e.call(null, i);
    if (void 0 !== a[t]) a[t].push(e); else {
      a[t] = [e];
      var n = document.getElementsByTagName("head")[0], o = document.createElement("script");
      o.type = "text/javascript", o.charset = "utf-8", o.async = !0, o.src = i.p + "" + ({}[t] || t) + ".js?5b8967b7852f1526fe3c", n.appendChild(o)
    }
  }, i.m = t, i.c = n, i.p = "//staticbj.im20.com.cn/VML_INTERNAL/vml_show/v1514287687!/impublic/zwj/built/", i(0)
}({
  0: function (t, i, e) {
    (function (t, i, n) {
      e(15), e(1), e(2), e(8), e(4), e(25);
      var a, o, r, s = e(24), h = e(3), u = e(20), l = t.extend({}, t.Events, {
        init: function () {
          this.$main = $("#main"), h.init(), u.init(this.$main), this.stage = new i.Stage({el: $("#three")[0]}), this.stage.size(640, window.innerHeight).update(), this.root = new i.Sprite, this.root.position(0, 0, -600).update(), this.stage.addChild(this.root), s.init(this.root), this.resize(), this.ready()
        }, isReady: !1, ready: function () {
          if (!this.isReady) {
            this.isReady = !0;
            var t = this;
            if (ua.android) {
              var i = function () {
                $("#bgm")[0].play(), $("body").off("touchend", i)
              };
              $("body").on("touchend", i)
            } else $("#bgm")[0].play();
            s["in"](), !function () {
              e.e(0, function (i) {
                var e = [i(21), i(22), i(23)];
                (function (i, e, n) {
                  a = i, o = e, r = n, t.complete()
                }).apply(null, e)
              })
            }(e)
          }
        }, complete: function () {
          function t() {
            p = !1, e()
          }

          function i() {
            p = !0, A && cancelAnimationFrame(A)
          }

          function e() {
            A = requestAnimationFrame(e);
            var t = (d.lon + f.lon + c.lon) % 360,
              i = .35 * (d.lat + f.lat + c.lat);
            t - l.root.panoBg.rotationY > 180 && (l.root.panoBg.rotationY += 360),
            t - l.root.panoBg.rotationY < -180 && (l.root.panoBg.rotationY -= 360);
            var n = t - l.root.panoBg.rotationY,
              a = i - l.root.panoBg.rotationX;
            Math.abs(n) < .1 ?
              l.root.panoBg.rotationY = t : l.root.panoBg.rotationY += .3 * n,
              Math.abs(a) < .1 ?
              l.root.panoBg.rotationX = i : l.root.panoBg.rotationX += .15 * a, l.root.panoBg.updateT(),
              l.root.panoDots.rotationY = l.root.panoBg.rotationY,
              l.root.panoDots.rotationX = l.root.panoBg.rotationX,
              l.root.panoDots.updateT(),
              l.root.panoSky.rotationY = l.root.panoBg.rotationY - 90,
              l.root.panoSky.rotationX = l.root.panoBg.rotationX,
              l.root.panoSky.updateT(),
            t - l.root.panoItems.rotationY > 180 && (l.root.panoItems.rotationY += 360),
            t - l.root.panoItems.rotationY < -180 && (l.root.panoItems.rotationY -= 360);
            var o = t - l.root.panoItems.rotationY, r = i - l.root.panoItems.rotationX;
            Math.abs(o) < .1 ?
              l.root.panoItems.rotationY = t : l.root.panoItems.rotationY += .25 * o, Math.abs(r) < .1 ?
              l.root.panoItems.rotationX = i : l.root.panoItems.rotationX += .15 * r,
              l.root.panoItems.updateT();
            var s = -150 - 20 * Math.abs(n);
            l.root.z += .1 * (s - l.root.z),
              l.root.updateT(),
              h(l.root.panoDots.rotationY)
          }

          function h(t) {
            var i = (-180 - t) % 360;
            i = i > 0 ? i - 360 : i;
            for (var e = 0, a = l.root.panoDots.children.length; a > e; e++) {
              var o = l.root.panoDots.children[e];
              o.r0 > i - 5 && o.r0 < i + 25 ? 0 == o.label.width && (n.kill(o.label), n.to(o.label, .3, {
                width: o.w0,
                ease: n.Quad.Out,
                onUpdate: function () {
                  this.target.updateS()
                }
              })) : o.label.width == o.w0 && (n.kill(o.label), n.to(o.label, .3, {
                width: 0,
                ease: n.Quad.Out,
                onUpdate: function () {
                  this.target.updateS()
                }
              }))
            }
          }

          var l = this;
          a.init(this.$main), r.init(this.$main), s.out(), o.init(l.root), s.on("out", function () {
            n.to(l.root, 4, {
              z: -150, ease: n.Quad.InOut, onUpdate: function () {
                this.target.updateT()
              }
            }), n.to(l.stage.camera, 4, {
              fov: 60, ease: n.Quad.InOut, onUpdate: function () {
                this.target.updateT()
              }
            }), o["in"]()
          }), a.on("navOn", function () {
            i(), n.to(l.stage.el, .3, {x: -200, ease: n.Quad.Out})
          }), a.on("navOff", function () {
            t(), n.to(l.stage.el, .3, {x: 0, ease: n.Quad.Out})
          }), a.on("item", function (t) {
            r.popOn(t)
          }), o.on("over", function () {
            t(), a.$el.css({display: "block"}), "invitation" == window.ups.act && r.popOn(1)
          }), o.on("dot", function (t) {
            r.popOn(t)
          }), r.on("popOn", function () {
            i()
          }), r.on("popOff", function () {
            t()
          });
          var c = {lon: 0, lat: 0};
          u.on("move", function (t) {
            p || (c.lon = (c.lon - .2 * t.ax) % 360, c.lat = Math.max(-90, Math.min(90, c.lat + .2 * t.ay)))
          });
          var A, d = {lat: 0, lon: 0}, f = {lon: 0, lat: 0}, p = !0, g = new Orienter;
          g.handler = function (t) {
            d.lat = t.lat, d.lon = -t.lon, p && (f.lat = -d.lat, f.lon = -d.lon)
          }, g.init()
        }, resize: function () {
          var t = this;
          setTimeout(function () {
            t.stage.size(640, window.innerHeight).update()
          }, 500)
        }, shareOn: function () {
          var t = $("#share");
          t.css({display: "block"}), n.to(t, .3, {opacity: 1})
        }, shareOff: function () {
          var t = $("#share");
          n.to(t, .3, {
            opacity: 0, onEnd: function () {
              this.target.style.display = "none"
            }
          })
        }
      });
      l.init()
    }).call(i, e(1), e(4), e(2))
  }, 1: function (t, i, e) {
    var n, a;
    (function (o) {/*!
	 * VERSION: 0.2.0
	 * DATE: 2015-03-31
	 * GIT:https://github.com/shrekshrek/bone
	 *
	 * @author: Shrek.wang, shrekshrek@gmail.com
	 **/
      !function (r) {
        var s = "object" == typeof self && self.self == self && self || "object" == typeof o && o.global == o && o;
        n = [e(15), i], a = function (t, i) {
          s.Bone = r(s, i, t)
        }.apply(i, n), !(void 0 !== a && (t.exports = a))
      }(function (t, i, e) {
        var n = t.Bone, a = [].slice;
        i.VERSION = "0.2.0", i.$ = e, i.noConflict = function () {
          return t.Bone = n, this
        };
        var o = function (t) {
          return "function" == typeof t || !1
        }, r = function (t, i, e) {
          var n = null == t ? void 0 : t[i];
          return void 0 === n && (n = e), o(n) ? n.call(t) : n
        }, s = function (t) {
          return Function.prototype.bind.apply(t, a.call(arguments, 1))
        };
        i.bind = s;
        var h = function (t) {
          var i = arguments.length;
          if (2 > i || null == t) return t;
          for (var e = 1; i > e; e++) for (var n = arguments[e], a = u(n), o = a.length, r = 0; o > r; r++) {
            var s = a[r];
            t[s] = n[s]
          }
          return t
        };
        i.extend = h;
        var u = function (t) {
          var i = [];
          for (var e in t) i.push(e);
          return i
        }, l = function (t) {
          return null == t ? 0 : void 0 !== t.length ? t.length : u(t).length
        }, c = function (t) {
          return null == t ? !0 : void 0 !== t.length ? 0 === t.length : 0 === u(t).length
        }, A = 0, d = function (t) {
          var i = ++A + "";
          return t ? t + i : i
        }, f = i.Events = {}, p = /\s+/, g = function (t, i, e, n, a) {
          var o, r = 0;
          if (e && "object" == typeof e) {
            void 0 !== n && "context" in a && void 0 === a.context && (a.context = n);
            for (o = u(e); r < o.length; r++) i = t(i, o[r], e[o[r]], a)
          } else if (e && p.test(e)) for (o = e.split(p); r < o.length; r++) i = t(i, o[r], n, a); else i = t(i, e, n, a);
          return i
        };
        f.on = function (t, i, e) {
          return v(this, t, i, e)
        };
        var v = function (t, i, e, n, a) {
          if (t._events = g(m, t._events || {}, i, e, {context: n, ctx: t, listening: a}), a) {
            var o = t._listeners || (t._listeners = {});
            o[a.id] = a
          }
          return t
        };
        f.listenTo = function (t, i, e) {
          if (!t) return this;
          var n = t._listenId || (t._listenId = d("l")), a = this._listeningTo || (this._listeningTo = {}), o = a[n];
          if (!o) {
            var r = this._listenId || (this._listenId = d("l"));
            o = a[n] = {obj: t, objId: n, id: r, listeningTo: a, count: 0}
          }
          return v(t, i, e, this, o), this
        };
        var m = function (t, i, e, n) {
          if (e) {
            var a = t[i] || (t[i] = []), o = n.context, r = n.ctx, s = n.listening;
            s && s.count++, a.push({callback: e, context: o, ctx: o || r, listening: s})
          }
          return t
        };
        f.off = function (t, i, e) {
          return this._events ? (this._events = g(E, this._events, t, i, {
            context: e,
            listeners: this._listeners
          }), this) : this
        }, f.stopListening = function (t, i, e) {
          var n = this._listeningTo;
          if (!n) return this;
          for (var a = t ? [t._listenId] : u(n), o = 0; o < a.length; o++) {
            var r = n[a[o]];
            if (!r) break;
            r.obj.off(i, e, this)
          }
          return c(n) && (this._listeningTo = void 0), this
        };
        var E = function (t, i, e, n) {
          if (t) {
            var a, o = 0, r = n.context, s = n.listeners;
            if (i || e || r) {
              for (var h = i ? [i] : u(t); o < h.length; o++) {
                i = h[o];
                var c = t[i];
                if (!c) break;
                for (var A = [], d = 0; d < c.length; d++) {
                  var f = c[d];
                  e && e !== f.callback && e !== f.callback._callback || r && r !== f.context ? A.push(f) : (a = f.listening, a && 0 === --a.count && (delete s[a.id], delete a.listeningTo[a.objId]))
                }
                A.length ? t[i] = A : delete t[i]
              }
              return l(t) ? t : void 0
            }
            for (var p = u(s); o < p.length; o++) a = s[p[o]], delete s[a.id], delete a.listeningTo[a.objId]
          }
        };
        f.once = function (t, i, e) {
          var n = g(y, {}, t, i, s(this.off, this));
          return this.on(n, void 0, e)
        }, f.listenToOnce = function (t, i, e) {
          var n = g(y, {}, i, e, s(this.stopListening, this, t));
          return this.listenTo(t, n)
        };
        var y = function (t, i, e, n) {
          if (e) {
            var a = t[i] = function () {
              n(i, a), e.apply(this, arguments)
            };
            a._callback = e
          }
          return t
        };
        f.trigger = function (t) {
          if (!this._events) return this;
          for (var i = Math.max(0, arguments.length - 1), e = Array(i), n = 0; i > n; n++) e[n] = arguments[n + 1];
          return g(I, this._events, t, void 0, e), this
        };
        var I = function (t, i, e, n) {
          if (t) {
            var a = t[i], o = t.all;
            a && o && (o = o.slice()), a && C(a, n), o && C(o, [i].concat(n))
          }
          return t
        }, C = function (t, i) {
          var e, n = -1, a = t.length, o = i[0], r = i[1], s = i[2];
          switch (i.length) {
            case 0:
              for (; ++n < a;) (e = t[n]).callback.call(e.ctx);
              return;
            case 1:
              for (; ++n < a;) (e = t[n]).callback.call(e.ctx, o);
              return;
            case 2:
              for (; ++n < a;) (e = t[n]).callback.call(e.ctx, o, r);
              return;
            case 3:
              for (; ++n < a;) (e = t[n]).callback.call(e.ctx, o, r, s);
              return;
            default:
              for (; ++n < a;) (e = t[n]).callback.apply(e.ctx, i);
              return
          }
        };
        h(i, f);
        var w = i.Class = function () {
          this.initialize.apply(this, arguments)
        };
        h(w.prototype, f, {
          initialize: function () {
          }
        });
        var V = i.View = function (t) {
          this.cid = d("view"), t || (t = {});
          for (var i in R) t[R[i]] && (this[R[i]] = t[R[i]]);
          this._ensureElement(), this.initialize.apply(this, arguments)
        }, b = /^(\S+)\s*(.*)$/, R = ["el", "id", "attributes", "className", "tagName", "events"];
        h(V.prototype, f, {
          tagName: "div", $: function (t) {
            return this.$el.find(t)
          }, initialize: function () {
          }, render: function () {
            return this
          }, remove: function () {
            return this._removeElement(), this.stopListening(), this
          }, _removeElement: function () {
            this.$el.remove()
          }, setElement: function (t) {
            return this.undelegateEvents(), this._setElement(t), this.delegateEvents(), this
          }, _setElement: function (t) {
            this.$el = t instanceof i.$ ? t : i.$(t), this.el = this.$el[0]
          }, delegateEvents: function (t) {
            if (t || (t = r(this, "events")), !t) return this;
            this.undelegateEvents();
            for (var i in t) {
              var e = t[i];
              if (o(e) || (e = this[e]), e) {
                var n = i.match(b);
                this.delegate(n[1], n[2], s(e, this))
              }
            }
            return this
          }, delegate: function (t, i, e) {
            return this.$el.on(t + ".delegateEvents" + this.cid, i, e), this
          }, undelegateEvents: function () {
            return this.$el && this.$el.off(".delegateEvents" + this.cid), this
          }, undelegate: function (t, i, e) {
            return this.$el.off(t + ".delegateEvents" + this.cid, i, e), this
          }, _createElement: function (t) {
            return document.createElement(t)
          }, _ensureElement: function () {
            if (this.el) this.setElement(r(this, "el")); else {
              var t = h({}, r(this, "attributes"));
              this.id && (t.id = r(this, "id")), this.className && (t["class"] = r(this, "className")), this.setElement(this._createElement(r(this, "tagName"))), this._setAttributes(t)
            }
          }, _setAttributes: function (t) {
            this.$el.attr(t)
          }
        });
        var P = i.Router = function (t) {
          t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
        }, T = /\((.*?)\)/g, S = /(\(\?)?:\w+/g, x = /\*\w+/g, j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        h(P.prototype, f, {
          initialize: function () {
          }, route: function (t, e, n) {
            t = this._routeToRegExp(t), o(e) && (n = e, e = ""), n || (n = this[e]);
            var a = this;
            return i.history.route(t, function (o) {
              var r = a._extractParameters(t, o);
              a.execute(n, r, e) !== !1 && (a.trigger.apply(a, ["route:" + e].concat(r)), a.trigger("route", e, r), i.history.trigger("route", a, e, r))
            }), this
          }, execute: function (t, i) {
            t && t.apply(this, i)
          }, navigate: function (t, e) {
            return i.history.navigate(t, e), this
          }, _bindRoutes: function () {
            if (this.routes) for (var t, i = u(this.routes); null != (t = i.pop());) this.route(t, this.routes[t])
          }, _routeToRegExp: function (t) {
            return t = t.replace(j, "\\$&").replace(T, "(?:$1)?").replace(S, function (t, i) {
              return i ? t : "([^/?]+)"
            }).replace(x, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
          }, _extractParameters: function (t, i) {
            var e = t.exec(i).slice(1), n = [];
            for (var a in e) {
              var o = e[a];
              n[a] = a === e.length - 1 ? o || null : o ? decodeURIComponent(o) : null
            }
            return n
          }
        });
        var Q = i.History = function () {
          this.handlers = [], this.checkUrl = s(this.checkUrl, this), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
        }, M = /^[#\/]|\s+$/g, U = /^\/+|\/+$/g, B = /#.*$/;
        Q.started = !1, h(Q.prototype, f, {
          atRoot: function () {
            var t = this.location.pathname.replace(/[^\/]$/, "$&/");
            return t === this.root && !this.getSearch()
          }, matchRoot: function () {
            var t = this.decodeFragment(this.location.pathname), i = t.slice(0, this.root.length - 1) + "/";
            return i === this.root
          }, decodeFragment: function (t) {
            return decodeURI(t.replace(/%25/g, "%2525"))
          }, getSearch: function () {
            var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
            return t ? t[0] : ""
          }, getHash: function (t) {
            var i = (t || this).location.href.match(/#(.*)$/);
            return i ? i[1] : ""
          }, getPath: function () {
            var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
            return "/" === t.charAt(0) ? t.slice(1) : t
          }, getFragment: function (t) {
            return null == t && (t = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash()), t.replace(M, "")
          }, start: function (t) {
            if (Q.started) throw new Error("Bone.history has already been started");
            if (Q.started = !0, this.options = h({root: "/"}, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._hasHashChange = "onhashchange" in window, this._useHashChange = this._wantsHashChange && this._hasHashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.history || !this.history.pushState), this._usePushState = this._wantsPushState && this._hasPushState, this.fragment = this.getFragment(), this.root = ("/" + this.root + "/").replace(U, "/"), this._wantsHashChange && this._wantsPushState) {
              if (!this._hasPushState && !this.atRoot()) {
                var i = this.root.slice(0, -1) || "/";
                return this.location.replace(i + "#" + this.getPath()), !0
              }
              this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {replace: !0})
            }
            var e = window.addEventListener || function (t, i) {
              return attachEvent("on" + t, i)
            };
            return this._usePushState ? e("popstate", this.checkUrl, !1) : this._useHashChange && e("hashchange", this.checkUrl, !1), this.options.silent ? void 0 : this.loadUrl()
          }, stop: function () {
            var t = window.removeEventListener || function (t, i) {
              return detachEvent("on" + t, i)
            };
            this._usePushState ? t("popstate", this.checkUrl, !1) : this._useHashChange && t("hashchange", this.checkUrl, !1), this._checkUrlInterval && clearInterval(this._checkUrlInterval), Q.started = !1
          }, route: function (t, i) {
            this.handlers.unshift({route: t, callback: i})
          }, checkUrl: function () {
            var t = this.getFragment();
            return t === this.fragment ? !1 : void this.loadUrl()
          }, loadUrl: function (t) {
            if (!this.matchRoot()) return !1;
            t = this.fragment = this.getFragment(t);
            for (var i in this.handlers) {
              var e = this.handlers[i];
              if (e.route.test(t)) return e.callback(t), !0
            }
          }, navigate: function (t, i) {
            if (!Q.started) return !1;
            i && i !== !0 || (i = {trigger: !!i}), t = t.replace(B, "");
            var e = this.root;
            ("" === t || "?" === t.charAt(0)) && (e = e.slice(0, -1) || "/");
            var n = e + t;
            if (t = this.decodeFragment(t.replace(B, "")), this.fragment !== t) {
              if (this.fragment = t, this._usePushState) this.history[i.replace ? "replaceState" : "pushState"]({}, document.title, n); else {
                if (!this._wantsHashChange) return this.location.assign(n);
                this._updateHash(this.location, t, i.replace)
              }
              return i.trigger ? this.loadUrl(t) : void 0
            }
          }, _updateHash: function (t, i, e) {
            if (e) {
              var n = t.href.replace(/(javascript:|#).*$/, "");
              t.replace(n + "#" + i)
            } else t.hash = "#" + i
          }
        }), i.history = new Q;
        var X = function (t, i) {
          var e, n = this;
          e = t && Object.prototype.hasOwnProperty.call(t, "constructor") ? t.constructor : function () {
            return n.apply(this, arguments)
          }, h(e, n, i);
          var a = function () {
            this.constructor = e
          };
          return a.prototype = n.prototype, e.prototype = new a, t && h(e.prototype, t), e.__super__ = n.prototype, e
        };
        return P.extend = Q.extend = w.extend = V.extend = X, i
      })
    }).call(i, function () {
      return this
    }())
  }, 2: function (t, i, e) {
    var n, a;
    (function (e) {/*!
	 * VERSION: 0.6.0
	 * DATE: 2016-6-26
	 * GIT:https://github.com/shrekshrek/jstween
	 *
	 * @author: Shrek.wang, shrekshrek@gmail.com
	 **/
      !function (o) {
        var r = "object" == typeof self && self.self == self && self || "object" == typeof e && e.global == e && e;
        n = [i], a = function (t) {
          r.JT = o(r, t)
        }.apply(i, n), !(void 0 !== a && (t.exports = a))
      }(function (t, i) {
        function e(t, i) {
          for (var e in i) t[e] = i[e]
        }

        function n(t, i) {
          if ("function" == typeof t) i.call(t, 0, t); else if (void 0 === t.length) i.call(t, 0, t); else for (var e = 0; e < t.length; e++) i.call(t[e], e, t[e])
        }

        function a(t) {
          return t.replace(/([A-Z])/g, "-$1").toLowerCase()
        }

        function o(t) {
          return t.replace(/\b(\w)|\s(\w)/g, function (t) {
            return t.toUpperCase()
          })
        }

        function r(t) {
          return Math.round(1e3 * t) / 1e3
        }

        function s(t) {
          return t ? Y + o(t) : Y
        }

        function h(t) {
          if (!t) throw"target is undefined, can't tween!!!";
          return "string" == typeof t ? "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t) : t
        }

        function u(t, i) {
          return "rotation" == i || "scale" == i ? i : void 0 !== t._jt_obj[i] ? i : void 0 !== t.style[i] ? i : (i = s(i), void 0 !== t.style[i] ? i : void 0)
        }

        function l(t, i, e, n) {
          var a = {};
          if (i instanceof Array) {
            a.num = [];
            for (var o in i) {
              var r = c(t, i[o]);
              a.num[o] = r.num, a.unit = r.unit
            }
            void 0 != e && (n ? a.num.push(e.num) : a.num.unshift(e.num))
          } else a = c(t, i);
          return a
        }

        function c(t, i) {
          var e = d(i);
          "rem" == t.unit && "rem" != e.unit ? (C(), t.num = r(t.num * H), t.unit = "px") : "rem" != t.unit && "rem" == e.unit && (C(), t.num = r(t.num / H), t.unit = "rem");
          var n;
          switch (e.ext) {
            case"+=":
              n = t.num + e.num;
              break;
            case"-=":
              n = t.num - e.num;
              break;
            default:
              n = e.num
          }
          return {num: n, unit: e.unit || t.unit}
        }

        function A(t) {
          void 0 == t._jt_obj && (t._jt_obj = {
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            skewX: 0,
            skewY: 0
          })
        }

        function d(t) {
          var i = /(\+=|-=|)(-|)(\d+\.\d+|\d+)(e[+-]?[0-9]{0,2}|)(rem|px|)/i, e = i.exec(t);
          return e ? {num: r(e[2] + e[3] + e[4]), unit: e[5], ext: e[1]} : {num: 0, unit: "px", ext: ""}
        }

        function f(t) {
          var i = /\S\s+\S/g;
          return i.test(t)
        }

        function p(t, i) {
          switch (i) {
            case"x":
            case"y":
            case"z":
            case"rotationX":
            case"rotationY":
            case"rotationZ":
            case"scaleX":
            case"scaleY":
            case"scaleZ":
            case"skewX":
            case"skewY":
              return t._jt_obj[i];
            case"rotation":
              return t._jt_obj.rotationZ;
            case"scale":
              return t._jt_obj.scaleX;
            default:
              return g(t, i)
          }
        }

        function g(t, i) {
          if (t.style[i]) return t.style[i];
          if (document.defaultView && document.defaultView.getComputedStyle) {
            var e = a(i), n = document.defaultView.getComputedStyle(t, "");
            return n && n.getPropertyValue(e)
          }
          return t.currentStyle ? t.currentStyle[i] : null
        }

        function v(t, i, e) {
          switch (i) {
            case"x":
            case"y":
            case"z":
            case"rotationX":
            case"rotationY":
            case"rotationZ":
            case"scaleX":
            case"scaleY":
            case"scaleZ":
            case"skewX":
            case"skewY":
              return t._jt_obj[i] = e, !0;
            case"rotation":
              return t._jt_obj.rotationZ = e, !0;
            case"scale":
              return t._jt_obj.scaleX = e, t._jt_obj.scaleY = e, !0;
            default:
              return m(t, i, e), !1
          }
        }

        function m(t, i, e) {
          t.style[i] = e
        }

        function E(t) {
          return "object" == typeof t && 1 === t.nodeType
        }

        function y(t) {
          var i = "";
          (t._jt_obj.x || t._jt_obj.y || t._jt_obj.z) && (i += "translate3d(" + I(t._jt_obj.x) + "," + I(t._jt_obj.y) + "," + I(t._jt_obj.z) + ") "), t._jt_obj.rotationX && (i += "rotateX(" + t._jt_obj.rotationX % 360 + "deg) "), t._jt_obj.rotationY && (i += "rotateY(" + t._jt_obj.rotationY % 360 + "deg) "), t._jt_obj.rotationZ && (i += "rotateZ(" + t._jt_obj.rotationZ % 360 + "deg) "), (1 != t._jt_obj.scaleX || 1 != t._jt_obj.scaleY || 1 != t._jt_obj.scaleZ) && (i += "scale3d(" + t._jt_obj.scaleX + ", " + t._jt_obj.scaleY + ", " + t._jt_obj.scaleZ + ") "), (t._jt_obj.skewX || t._jt_obj.skewY) && (i += "skew(" + t._jt_obj.skewX + "deg," + t._jt_obj.skewY + "deg) "), t.style[s("transform")] = i
        }

        function I(t) {
          return t + ("number" == typeof t ? "px" : "")
        }

        function C() {
          z || (z = document.createElement("div"), z.style.cssText = "border:0 solid; position:absolute; line-height:0px;"), k || (k = document.getElementsByTagName("body")[0]), k.appendChild(z), z.style.borderLeftWidth = "1rem", H = parseFloat(z.offsetWidth), k.removeChild(z)
        }

        function w() {
          K = !0;
          var t, i, e = G.length, n = q.length;
          if (0 === e && 0 === n) return void(K = !1);
          var a = X(), o = a - D;
          for (D = a, t = e - 1; t >= 0; t--) if (G[t] && !G[t]._update(o)) {
            var r = G.splice(t, 1)[0];
            r.onUpdate && r.onUpdate.apply(r, r.onUpdateParams), r.onEnd && r.onEnd.apply(r, r.onEndParams), r.target = null
          }
          for (i = n - 1; i >= 0; i--) if (q[i] && !q[i]._update(o)) {
            var s = q.splice(i, 1)[0];
            s.onEnd && s.onEnd.apply(s, s.onEndParams)
          }
          L(w)
        }

        function V() {
          this.initialize.apply(this, arguments)
        }

        function b(t, i) {
          var e = h(t), a = G.length;
          n(e, function (t, e) {
            for (var n = a - 1; n >= 0; n--) {
              var o = G[n];
              o.target === e && o[i]()
            }
          })
        }

        function R(t) {
          for (var i = G.length, e = i - 1; e >= 0; e--) {
            var n = G[e];
            n[t]()
          }
        }

        function P() {
          this.initialize.apply(this, arguments)
        }

        function T(t, i) {
          var e = t, a = q.length;
          n(e, function (t, e) {
            for (var n = a - 1; n >= 0; n--) {
              var o = q[n];
              o.onEnd === e && o[i]()
            }
          })
        }

        function S(t) {
          for (var i = q.length, e = i - 1; e >= 0; e--) {
            var n = q[e];
            n[t]()
          }
        }

        function x(t) {
          t.bezier && (j(t, t.bezier), t.interpolation = M, delete t.bezier), t.through && (j(t, t.through), t.interpolation = U, delete t.through), t.linear && (j(t, t.linear), t.interpolation = Q, delete t.linear)
        }

        function j(t, i) {
          for (var e in i) for (var n in i[e]) 0 == e ? t[n] = [i[e][n]] : t[n].push(i[e][n])
        }

        function Q(t, i) {
          var e = t.length - 1, n = e * i, a = Math.floor(n), o = F.Linear;
          return 0 > i ? o(t[0], t[1], n) : i > 1 ? o(t[e], t[e - 1], e - n) : o(t[a], t[a + 1 > e ? e : a + 1], n - a)
        }

        function M(t, i) {
          var e, n = 0, a = t.length - 1, o = Math.pow, r = F.Bernstein;
          for (e = 0; a >= e; e++) n += o(1 - i, a - e) * o(i, e) * t[e] * r(a, e);
          return n
        }

        function U(t, i) {
          var e = t.length - 1, n = e * i, a = Math.floor(n), o = F.Through;
          return t[0] === t[e] ? (0 > i && (a = Math.floor(n = e * (1 + i))), o(t[(a - 1 + e) % e], t[a], t[(a + 1) % e], t[(a + 2) % e], n - a)) : 0 > i ? t[0] - (o(t[0], t[0], t[1], t[1], -n) - t[0]) : i > 1 ? t[e] - (o(t[e], t[e], t[e - 1], t[e - 1], n - e) - t[e]) : o(t[a ? a - 1 : 0], t[a], t[a + 1 > e ? e : a + 1], t[a + 2 > e ? e : a + 2], n - a)
        }

        Date.now = Date.now || function () {
          return (new Date).getTime()
        };
        var B = Date.now(), X = function () {
          return Date.now() - B
        }, Y = "";
        !function () {
          var t = document.createElement("div"), i = ["Webkit", "Moz", "Ms", "O"];
          for (var e in i) if (i[e] + "Transform" in t.style) {
            Y = i[e];
            break
          }
        }();
        var k, z, H,
          L = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            window.setTimeout(t, 1e3 / 60)
          }, G = [], K = !1, D = 0;
        e(V.prototype, {
          initialize: function (t, e, n, a, o) {
            this.fromVars = n, this.curVars = {}, this.toVars = a, this.target = t, this.duration = 1e3 * Math.max(e, 0), this.ease = a.ease || i.Linear.None, this.delay = 1e3 * Math.max(a.delay || 0, 0), this.yoyo = a.yoyo || !1, this.repeat = this.curRepeat = Math.floor(a.repeat || 0), this.repeatDelay = 1e3 * Math.max(a.repeatDelay || 0, 0), this.onStart = a.onStart || null, this.onStartParams = a.onStartParams || [], this.onRepeat = a.onRepeat || null, this.onRepeatParams = a.onRepeatParams || [], this.onEnd = a.onEnd || null, this.onEndParams = a.onEndParams || [], this.onUpdate = a.onUpdate || null, this.onUpdateParams = a.onUpdateParams || [], this.isPlaying = a.isPlaying || !0, this.interpolation = a.interpolation || null, this.isReverse = !1, this.isDom = o, this.curTime = 0, this.isStart = !1, this.startTime = this.delay, this.endTime = this.startTime + this.repeatDelay + this.duration, 0 != this.delay && (this._updateProp(), this.onUpdate && this.onUpdate.apply(this, this.onUpdateParams)), G.push(this), K || (D = X(), w())
          }, _update: function (t) {
            if (!this.isPlaying) return !0;
            if (this.curTime += t, this.curTime < this.startTime) return !0;
            if (this.isStart || (this.isStart = !0, this.onStart && this.onStart.apply(this, this.onStartParams), this.repeat == this.curRepeat && (this.curTime += this.repeatDelay)), this.curTime < this.startTime + this.repeatDelay) return !0;
            if (this.curTime < this.endTime) this._updateProp(), this.onUpdate && this.onUpdate.apply(this, this.onUpdateParams); else {
              if (0 == this.curRepeat) return this._updateProp(), !1;
              this.yoyo && (this.isReverse = !this.isReverse);
              var i = (this.curTime - this.endTime) % (this.duration + this.repeatDelay);
              0 == this.repeatDelay ? (this.curTime = this.startTime + i, this._updateProp()) : (this._updateProp(), this.curTime = this.startTime + i), this.onUpdate && this.onUpdate.apply(this, this.onUpdateParams), this.onRepeat && this.onRepeat.apply(this, this.onRepeatParams), this.curRepeat > 0 && this.curRepeat--
            }
            return !0
          }, _updateProp: function () {
            var t = 0 == this.duration ? 1 : (this.curTime - this.startTime - this.repeatDelay) / this.duration;
            t = Math.max(0, Math.min(1, t)), this.isReverse && (t = 1 - t);
            var i = this.ease(t), e = !1;
            for (var n in this.fromVars) {
              var a, o = this.fromVars[n], s = this.toVars[n];
              a = s.num instanceof Array ? this.interpolation(s.num, i) : o.num + (s.num - o.num) * i, a = r(a), this.curVars[n] = {
                num: a,
                unit: s.unit
              }, this.isDom ? (Math.abs(s.num - o.num) > 20 && (a = Math.round(a)), v(this.target, n, a + (s.unit || 0)) && (e = !0)) : this.target[n] = a + (s.unit || 0)
            }
            e && y(this.target)
          }, play: function () {
            this.target && (this.isPlaying = !0)
          }, pause: function () {
            this.target && (this.isPlaying = !1)
          }, destroy: function (t) {
            if (this.target) {
              var i = G.indexOf(this);
              if (-1 !== i) {
                var e = G.splice(i, 1)[0];
                t && e.onEnd && e.onEnd.apply(e, e.onEndParams), this.target = null
              }
            }
          }
        }), e(i, {
          get: function (t, i) {
            var e = h(t);
            if (void 0 !== e.length && (e = e[0]), E(e)) {
              A(e);
              var n = u(e, i);
              return n ? p(e, n) : null
            }
            return e[i]
          }, set: function (t, i) {
            var e = h(t);
            n(e, function (t, e) {
              if (E(e)) {
                A(e);
                var n = !1;
                for (var a in i) {
                  var o = u(e, a);
                  if (o) if (f(i[a])) v(e, o, i[a]); else {
                    var r = l(d(p(e, o)), i[a]);
                    v(e, o, r.num + (r.unit || 0)) && (n = !0)
                  }
                }
                n && y(e)
              } else for (var s in i) {
                var r = l(d(e[s]), i[s]);
                e[s] = r.num + (r.unit || 0)
              }
            })
          }, fromTo: function (t, i, e, a) {
            x(a);
            var o = h(t), r = [];
            return n(o, function (t, n) {
              var o = {}, s = {}, h = E(n);
              if (h) {
                A(n);
                for (var c in a) {
                  var f = u(n, c);
                  if (f) {
                    var g = d(p(n, f));
                    o[f] = l(g, e[c]), s[f] = l(g, a[c], o[f], !1)
                  } else s[c] = a[c]
                }
              } else for (var c in a) if (void 0 !== n[c]) {
                var g = d(n[c]);
                o[c] = l(g, e[c]), s[c] = l(g, a[c], o[c], !1)
              } else s[c] = a[c];
              var v = new V(n, i, o, s, h);
              r.push(v)
            }), 1 == r.length ? r[0] : r
          }, from: function (t, i, e) {
            x(e);
            var a = h(t), o = [];
            return n(a, function (t, n) {
              var a = {}, r = {}, s = E(n);
              if (s) {
                A(n);
                for (var h in e) {
                  var c = u(n, h);
                  if (c) {
                    var f = d(p(n, c));
                    a[c] = l(f, e[h], f, !0), r[c] = f
                  } else r[h] = e[h]
                }
              } else for (var h in e) if (void 0 !== n[h]) {
                var f = d(n[h]);
                a[h] = l(f, e[h], f, !0), r[h] = f
              } else r[h] = e[h];
              var g = new V(n, i, a, r, s);
              o.push(g)
            }), 1 == o.length ? o[0] : o
          }, to: function (t, i, e) {
            x(e);
            var a = h(t), o = [];
            return n(a, function (t, n) {
              var a = {}, r = {}, s = E(n);
              if (s) {
                A(n);
                for (var h in e) {
                  var c = u(n, h);
                  if (c) {
                    var f = d(p(n, c));
                    a[c] = f, r[c] = l(f, e[h], f, !1)
                  } else r[h] = e[h]
                }
              } else for (var h in e) if (void 0 !== n[h]) {
                var f = d(n[h]);
                a[h] = f, r[h] = l(f, e[h], f, !1)
              } else r[h] = e[h];
              var g = new V(n, i, a, r, s);
              o.push(g)
            }), 1 == o.length ? o[0] : o
          }, kill: function (t, i) {
            var e = h(t);
            n(e, function (t, e) {
              for (var n = G.length, a = n - 1; a >= 0; a--) {
                var o = G[a];
                o.target === e && (G.splice(a, 1), i && o.onEnd && o.onEnd.apply(o, o.onEndParams), o.target = null)
              }
            })
          }, killAll: function (t) {
            if (!t) return void(G = []);
            for (var i = G.length, e = i - 1; e >= 0; e--) {
              var n = G.splice(e, 1);
              t && n.onEnd && n.onEnd.apply(n, n.onEndParams), n.target = null
            }
          }, play: function (t) {
            b(t, "play")
          }, playAll: function () {
            R("play")
          }, pause: function (t) {
            b(t, "pause")
          }, pauseAll: function () {
            R("pause")
          }, isTweening: function (t) {
            var i = h(t), e = !1;
            return n(i, function (t, i) {
              for (var n = G.length, a = n - 1; a >= 0; a--) {
                var o = G[a];
                if (o.target === i) return void(e = !0)
              }
            }), e
          }
        });
        var q = [];
        e(P.prototype, {
          initialize: function (t, i, e, n) {
            this.delay = 1e3 * t, this.onEnd = i || null, this.onEndParams = e || [], this.curTime = 0, this.endTime = this.delay, this.isPlaying = n || !0, q.push(this), K || (D = X(), w())
          }, _update: function (t) {
            return this.isPlaying ? (this.curTime += t, this.curTime < this.endTime) : !0
          }, play: function () {
            this.isPlaying = !0
          }, pause: function () {
            this.isPlaying = !1
          }, destroy: function (t) {
            var i = q.indexOf(this);
            if (-1 !== i) {
              var e = q.splice(i, 1)[0];
              t && e.onEnd && e.onEnd.apply(e, e.onEndParams)
            }
          }
        }), e(i, {
          call: function (t, i, e) {
            return new P(t, i, e)
          }, killCall: function (t, i) {
            var e = t, a = q.length;
            n(e, function (t, e) {
              for (var n = a - 1; n >= 0; n--) {
                var o = q[n];
                o.onEnd === e && (q.splice(n, 1), i && o.onEnd && o.onEnd.apply(o, o.onEndParams))
              }
            })
          }, killAllCalls: function (t) {
            if (!t) return void(q = []);
            for (var i = q.length, e = i - 1; e >= 0; e--) {
              var n = q.splice(e, 1);
              t && n.onEnd && n.onEnd.apply(n, n.onEndParams)
            }
          }, playCall: function (t) {
            T(t, "play")
          }, playAllCalls: function () {
            S("play")
          }, pauseCall: function (t) {
            T(t, "pause")
          }, pauseAllCalls: function () {
            S("pause")
          }
        }), e(i, {
          path: function (t) {
            x(t);
            for (var e, n = t.ease || i.Linear.None, a = t.step || 1, o = [], r = 0; a >= r; r++) {
              e = n(r / a);
              var s = {};
              for (var h in t) t[h] instanceof Array && (s[h] = t.interpolation(t[h], e));
              o.push(s)
            }
            return o
          }
        });
        var F = {
          Linear: function (t, i, e) {
            return (i - t) * e + t
          }, Bernstein: function (t, i) {
            var e = F.Factorial;
            return e(t) / e(i) / e(t - i)
          }, Factorial: function () {
            var t = [1];
            return function (i) {
              var e, n = 1;
              if (t[i]) return t[i];
              for (e = i; e > 1; e--) n *= e;
              return t[i] = n
            }
          }(), Through: function (t, i, e, n, a) {
            var o = .5 * (e - t), r = .5 * (n - i), s = a * a, h = a * s;
            return (2 * i - 2 * e + o + r) * h + (-3 * i + 3 * e - 2 * o - r) * s + o * a + i
          }
        };
        return e(i, {
          Linear: {
            None: function (t) {
              return t
            }
          }, Quad: {
            In: function (t) {
              return t * t
            }, Out: function (t) {
              return t * (2 - t)
            }, InOut: function (t) {
              return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }
          }, Cubic: {
            In: function (t) {
              return t * t * t
            }, Out: function (t) {
              return --t * t * t + 1
            }, InOut: function (t) {
              return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            }
          }, Quart: {
            In: function (t) {
              return t * t * t * t
            }, Out: function (t) {
              return 1 - --t * t * t * t
            }, InOut: function (t) {
              return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            }
          }, Quint: {
            In: function (t) {
              return t * t * t * t * t
            }, Out: function (t) {
              return --t * t * t * t * t + 1
            }, InOut: function (t) {
              return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }
          }, Sine: {
            In: function (t) {
              return 1 - Math.cos(t * Math.PI / 2)
            }, Out: function (t) {
              return Math.sin(t * Math.PI / 2)
            }, InOut: function (t) {
              return .5 * (1 - Math.cos(Math.PI * t))
            }
          }, Expo: {
            In: function (t) {
              return 0 === t ? 0 : Math.pow(1024, t - 1)
            }, Out: function (t) {
              return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            }, InOut: function (t) {
              return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
            }
          }, Circ: {
            In: function (t) {
              return 1 - Math.sqrt(1 - t * t)
            }, Out: function (t) {
              return Math.sqrt(1 - --t * t)
            }, InOut: function (t) {
              return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }
          }, Elastic: {
            In: function (t) {
              var i, e = .1, n = .4;
              return 0 === t ? 0 : 1 === t ? 1 : (!e || 1 > e ? (e = 1, i = n / 4) : i = n * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - i) * Math.PI / n)))
            }, Out: function (t) {
              var i, e = .1, n = .4;
              return 0 === t ? 0 : 1 === t ? 1 : (!e || 1 > e ? (e = 1, i = n / 4) : i = n * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * t) * Math.sin(2 * (t - i) * Math.PI / n) + 1)
            }, InOut: function (t) {
              var i, e = .1, n = .4;
              return 0 === t ? 0 : 1 === t ? 1 : (!e || 1 > e ? (e = 1, i = n / 4) : i = n * Math.asin(1 / e) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * e * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - i) * Math.PI / n) : e * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - i) * Math.PI / n) * .5 + 1)
            }
          }, Back: {
            In: function (t) {
              var i = 1.70158;
              return t * t * ((i + 1) * t - i)
            }, Out: function (t) {
              var i = 1.70158;
              return --t * t * ((i + 1) * t + i) + 1
            }, InOut: function (t) {
              var i = 2.5949095;
              return (t *= 2) < 1 ? .5 * t * t * ((i + 1) * t - i) : .5 * ((t -= 2) * t * ((i + 1) * t + i) + 2)
            }
          }, Bounce: {
            In: function (t) {
              return 1 - i.Bounce.Out(1 - t)
            }, Out: function (t) {
              return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, InOut: function (t) {
              return .5 > t ? .5 * i.Bounce.In(2 * t) : .5 * i.Bounce.Out(2 * t - 1) + .5
            }
          }
        }), i.now = X, i
      })
    }).call(i, function () {
      return this
    }())
  }, 3: function (t, i, e) {
    (function (i) {
      var e = i.extend({}, i.Events, {
        init: function () {
        }, getRandom: function (t, i) {
          return t + Math.floor(Math.random() * (i - t) * 100) / 100
        }
      });
      t.exports = e
    }).call(i, e(1))
  }, 4: function (t, i, e) {
    var n, a;
    (function (e) {/*!
	 * VERSION: 0.7.0
	 * DATE: 2015-12-20
	 * GIT:https://github.com/shrekshrek/css3d-engine
	 *
	 * @author: Shrek.wang, shrekshrek@gmail.com
	 **/
      !function (o) {
        var r = "object" == typeof self && self.self == self && self || "object" == typeof e && e.global == e && e;
        n = [i], a = function (t) {
          r.C3D = o(r, t)
        }.apply(i, n), !(void 0 !== a && (t.exports = a))
      }(function (t, i) {
        function e(t) {
          return Math.round(t)
        }

        function n(t) {
          return Math.round(100 * t) / 100
        }

        function a(t) {
          return t.replace(/\b(\w)|\s(\w)/g, function (t) {
            return t.toUpperCase()
          })
        }

        function o(t) {
          var e;
          switch (t.type) {
            case"sprite":
              e = new i.Sprite(t.el ? {el: t.el} : void 0);
              break;
            case"plane":
              e = new i.Plane(t.el ? {el: t.el} : void 0);
              break;
            case"cube":
              e = new i.Cube(t.el ? {el: t.el} : void 0)
          }
          if (void 0 != t.size && e.size.apply(e, t.size), void 0 != t.position && e.position.apply(e, t.position), void 0 != t.rotation && e.rotation.apply(e, t.rotation), void 0 != t.scale && e.scale.apply(e, t.scale), void 0 != t.origin && e.origin.apply(e, t.origin), void 0 != t.visibility && e.visibility.apply(e, t.visibility), void 0 != t.material && e.material.apply(e, t.material), void 0 != t.filter && e.filter.apply(e, t.filter), void 0 != t.name && e.name.apply(e, [t.name]), e.update(), t.children) for (var n = 0, a = t.children.length; a > n; n++) {
            var r = t.children[n], s = o(r);
            e.addChild(s)
          }
          return e
        }

        var r = function (t) {
          var i = [];
          for (var e in t) i.push(e);
          return i
        }, s = function (t) {
          var i = arguments.length;
          if (2 > i || null == t) return t;
          for (var e = 1; i > e; e++) for (var n = arguments[e], a = r(n), o = a.length, s = 0; o > s; s++) {
            var h = a[s];
            t[h] = n[h]
          }
          return t
        }, h = function (t, i) {
          var e, n = this;
          e = t && Object.prototype.hasOwnProperty.call(t, "constructor") ? t.constructor : function () {
            return n.apply(this, arguments)
          }, s(e, n, i);
          var a = function () {
            this.constructor = e
          };
          return a.prototype = n.prototype, e.prototype = new a, t && s(e.prototype, t), e.__super__ = n.prototype, e
        }, u = "";
        return function () {
          var t = document.createElement("div"), i = ["Webkit", "Moz", "Ms", "O"];
          for (var e in i) if (i[e] + "Transform" in t.style) {
            u = i[e];
            break
          }
        }(), i.getRandomColor = function () {
          return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).slice(-6)
        }, i.rgb2hex = function (t, i, e) {
          return (t << 16 | i << 8 | e).toString(16)
        }, i.hex2rgb = function (t) {
          var i = Math.floor("0x" + t), e = i >> 16 & 255, n = i >> 8 & 255, a = 255 & i;
          return [e, n, a]
        }, i.Object = function () {
          this.initialize.apply(this, arguments)
        }, s(i.Object.prototype, {
          x: 0,
          y: 0,
          z: 0,
          position: function (t, i, e) {
            switch (arguments.length) {
              case 1:
                this.x = t, this.y = t, this.z = t;
                break;
              case 2:
                this.x = t, this.y = i;
                break;
              case 3:
                this.x = t, this.y = i, this.z = e
            }
            return this
          },
          move: function (t, i, e) {
            switch (arguments.length) {
              case 1:
                this.x += t, this.y += t, this.z += t;
                break;
              case 2:
                this.x += t, this.y += i;
                break;
              case 3:
                this.x += t, this.y += i, this.z += e
            }
            return this
          },
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          rotation: function (t, i, e) {
            switch (arguments.length) {
              case 1:
                this.rotationX = t, this.rotationY = t, this.rotationZ = t;
                break;
              case 2:
                this.rotationX = t, this.rotationY = i;
                break;
              case 3:
                this.rotationX = t, this.rotationY = i, this.rotationZ = e
            }
            return this
          },
          rotate: function (t, i, e) {
            switch (arguments.length) {
              case 1:
                this.rotationX += t, this.rotationY += t, this.rotationZ += t;
                break;
              case 2:
                this.rotationX += t, this.rotationY += i;
                break;
              case 3:
                this.rotationX += t, this.rotationY += i, this.rotationZ += e
            }
            return this
          },
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
          scale: function (t, i, e) {
            switch (arguments.length) {
              case 1:
                this.scaleX = t, this.scaleY = t, this.scaleZ = t;
                break;
              case 2:
                this.scaleX = t, this.scaleY = i;
                break;
              case 3:
                this.scaleX = t, this.scaleY = i, this.scaleZ = e
            }
            return this
          },
          width: 0,
          height: 0,
          depth: 0,
          size: function (t, i, e) {
            switch (arguments.length) {
              case 1:
                this.width = t, this.height = t, this.depth = t;
                break;
              case 2:
                this.width = t, this.height = i;
                break;
              case 3:
                this.width = t, this.height = i, this.depth = e
            }
            return this
          },
          originX: 0,
          originY: 0,
          originZ: 0,
          _orgO: {x: 0, y: 0, z: 0},
          _orgT: {x: 0, y: 0, z: 0},
          _orgF: {x: 0, y: 0, z: 0},
          origin: function (t, i, e) {
            switch (arguments.length) {
              case 1:
                this.originX = t, this.originY = t, this.originZ = t;
                break;
              case 2:
                this.originX = t, this.originY = i;
                break;
              case 3:
                this.originX = t, this.originY = i, this.originZ = e
            }
            return this
          },
          _name: "",
          name: function (t) {
            return this._name = t, "" == t ? delete this.el.dataset.name : this.el.dataset.name = t, this
          },
          initialize: function () {
            this.x = 0, this.y = 0, this.z = 0, this.rotationX = 0, this.rotationY = 0, this.rotationZ = 0, this.scaleX = 1, this.scaleY = 1, this.scaleZ = 1, this.width = 0, this.height = 0, this.depth = 0, this.originX = "50%", this.originY = "50%", this.originZ = "0px", this._orgO = {
              x: "50%",
              y: "50%",
              z: "0px"
            }, this._orgT = {x: "-50%", y: "-50%", z: "0px"}, this._orgF = {
              x: 0,
              y: 0,
              z: 0
            }, this.children = [], this._name = ""
          },
          parent: null,
          children: null,
          addChild: function (t) {
            if (null != t.parent && t.parent.removeChild(t), "" != t._name) {
              if (void 0 !== this[t._name]) throw t._name + " already exist!";
              this[t._name] = t
            }
            return this.children.push(t), t.parent = this, this
          },
          removeChild: function (t) {
            for (var i = this.children.length - 1; i >= 0; i--) if (this.children[i] === t) return "" != t._name && delete this[t._name], this.children.splice(i, 1), t.parent = null, this;
            return this
          },
          removeAllChild: function () {
            for (var t = this.children.length - 1; t >= 0; t--) {
              var i = this.children[t];
              "" != i._name && delete this[i._name], i.parent = null
            }
            return this.children = [], this
          },
          remove: function () {
            return null != this.parent && this.parent.removeChild(this), this
          }
        }), i.Object.extend = h, i.Sprite = i.Object.extend({
          el: null,
          alpha: 1,
          visible: !0,
          mat: null,
          initialize: function (t) {
            i.Sprite.__super__.initialize.apply(this, [t]), this.alpha = 1, this.visible = !0;
            var e;
            if (t && t.el) switch (typeof t.el) {
              case"string":
                e = document.createElement("div"), e.innerHTML = t.el;
                break;
              case"object":
                1 === t.el.nodeType && (e = t.el)
            }
            e || (e = document.createElement("div")), e.style.position = "absolute", e.style[u + "Transform"] = "translateZ(0px)", e.style[u + "TransformStyle"] = "preserve-3d", this.el = e, e.le = this
          },
          update: function () {
            return this.updateS(), this.updateM(), this.updateO(), this.updateT(), this.updateV(), this
          },
          updateS: function () {
            return this
          },
          updateM: function () {
            if (!this.mat) return this;
            for (var t in this.mat) switch (t) {
              case"bothsides":
                this.el.style[u + "BackfaceVisibility"] = this.mat[t] ? "visible" : "hidden";
                break;
              case"image":
                this.el.style["background" + a(t)] = "" !== this.mat[t] ? "url(" + this.mat[t] + ")" : "";
                break;
              default:
                this.el.style["background" + a(t)] = this.mat[t]
            }
            return this
          },
          updateO: function () {
            if ("number" == typeof this.originX) {
              var t = e(this.originX - this._orgF.x);
              this._orgO.x = t + "px", this._orgT.x = -t + "px"
            } else this._orgO.x = this.originX, this._orgT.x = "-" + this.originX;
            if ("number" == typeof this.originY) {
              var i = e(this.originY - this._orgF.y);
              this._orgO.y = i + "px", this._orgT.y = -i + "px"
            } else this._orgO.y = this.originY, this._orgT.y = "-" + this.originY;
            if ("number" == typeof this.originZ) {
              var n = e(this.originZ - this._orgF.z);
              this._orgO.z = n + "px", this._orgT.z = -n + "px"
            } else this._orgO.z = this._orgT.z = "0px";
            return this.el.style[u + "TransformOrigin"] = this._orgO.x + " " + this._orgO.y + " " + this._orgO.z, this
          },
          updateT: function () {
            return this.el.style[u + "Transform"] = "translate3d(" + this._orgT.x + ", " + this._orgT.y + ", " + this._orgT.z + ") translate3d(" + n(this.x) + "px," + n(this.y) + "px," + n(this.z) + "px) rotateX(" + n(this.rotationX) % 360 + "deg) rotateY(" + n(this.rotationY) % 360 + "deg) rotateZ(" + n(this.rotationZ) % 360 + "deg) scale3d(" + n(this.scaleX) + ", " + n(this.scaleY) + ", " + n(this.scaleZ) + ") ", this
          },
          updateV: function () {
            return this.el.style.opacity = this.alpha, this.el.style.display = this.visible ? "block" : "none", this
          },
          addChild: function (t) {
            return i.Sprite.__super__.addChild.apply(this, [t]), this.el && t.el && this.el.appendChild(t.el), this
          },
          removeChild: function (t) {
            for (var i = this.children.length - 1; i >= 0; i--) if (this.children[i] === t) return "" != t._name && delete this[t._name], this.children.splice(i, 1), t.parent = null, this.el.removeChild(t.el), this;
            return this
          },
          removeAllChild: function () {
            for (var t = this.children.length - 1; t >= 0; t--) {
              var i = this.children[t];
              "" != i._name && delete this[i._name], i.parent = null, this.el.removeChild(i.el)
            }
            return this.children = [], this
          },
          on: function (t) {
            if ("object" == typeof t) for (var i in t) this.el.addEventListener(i, t[i], !1); else 2 === arguments.length ? this.el.addEventListener(arguments[0], arguments[1], !1) : 3 === arguments.length && this.el.addEventListener(arguments[0], arguments[1], arguments[2]);
            return this
          },
          off: function (t) {
            if ("object" == typeof t) for (var i in t) this.el.removeEventListener(i, t[i], !1); else 2 === arguments.length && this.el.removeEventListener(arguments[0], arguments[1], !1);
            return this
          },
          buttonMode: function (t) {
            return this.el.style.cursor = t ? "pointer" : "auto", this
          },
          material: function (t) {
            return this.mat = t, this
          },
          visibility: function (t) {
            return void 0 !== t.visible && (this.visible = t.visible), void 0 !== t.alpha && (this.alpha = t.alpha), this
          }
        }), i.Stage = i.Sprite.extend({
          camera: null, fov: null, __rfix: null, __pfix: null, initialize: function (t) {
            i.Stage.__super__.initialize.apply(this, [t]), t && t.el || (this.el.style.top = "0px", this.el.style.left = "0px", this.el.style.width = "0px", this.el.style.height = "0px"), this.el.style[u + "Perspective"] = "800px", this.el.style[u + "TransformStyle"] = "flat", this.el.style[u + "Transform"] = "", this.el.style.overflow = "hidden", this.__rfix = new i.Sprite, this.el.appendChild(this.__rfix.el), this.__pfix = new i.Sprite, this.__rfix.el.appendChild(this.__pfix.el), this.setCamera(new i.Camera)
          }, updateS: function () {
            return this.el.style.width = e(this.width) + "px", this.el.style.height = e(this.height) + "px", this
          }, updateT: function () {
            return this.fov = e(.5 / Math.tan(.5 * this.camera.fov / 180 * Math.PI) * this.height), this.el.style[u + "Perspective"] = this.fov + "px", this.__rfix.position(e(this.width / 2), e(this.height / 2), this.fov).rotation(-this.camera.rotationX, -this.camera.rotationY, -this.camera.rotationZ).updateT(), this.__pfix.position(-this.camera.x, -this.camera.y, -this.camera.z).updateT(), this
          }, addChild: function (t) {
            return this.__pfix.addChild(t), this
          }, removeChild: function (t) {
            return this.__pfix.removeChild(t), this
          }, setCamera: function (t) {
            return this.camera && (this.camera.stage = null), this.camera = t, this.camera.stage = this, this
          }
        }), i.Camera = i.Object.extend({
          fov: null, stage: null, initialize: function (t) {
            i.Camera.__super__.initialize.apply(this, [t]), this.fov = 75
          }, update: function () {
            return this.updateT(), this
          }, updateS: function () {
            return this
          }, updateM: function () {
            return this
          }, updateT: function () {
            return this.stage && this.stage.updateT(), this
          }, updateV: function () {
            return this
          }
        }), i.Plane = i.Sprite.extend({
          flt: null, initialize: function (t) {
            i.Plane.__super__.initialize.apply(this, [t])
          }, update: function () {
            return i.Plane.__super__.update.apply(this), this.updateF(), this
          }, updateS: function () {
            return this.el.style.width = e(this.width) + "px", this.el.style.height = e(this.height) + "px", this
          }, updateF: function () {
            if (!this.flt) return this;
            var t = "";
            for (var i in this.flt) t += "" !== this.flt[i] ? i + "(" + this.flt[i].join(",") + ")" : "";
            return "" !== t && (this.el.style[u + "Filter"] = t), this
          }, filter: function (t) {
            return this.flt = t, this
          }
        }), i.Cube = i.Sprite.extend({
          front: null,
          back: null,
          left: null,
          right: null,
          up: null,
          down: null,
          flt: null,
          initialize: function (t) {
            i.Cube.__super__.initialize.apply(this, [t]), this.front = new i.Plane, this.addChild(this.front), this.back = new i.Plane, this.addChild(this.back), this.left = new i.Plane, this.addChild(this.left), this.right = new i.Plane, this.addChild(this.right), this.up = new i.Plane, this.addChild(this.up), this.down = new i.Plane, this.addChild(this.down)
          },
          update: function () {
            return i.Cube.__super__.update.apply(this), this.updateF(), this
          },
          updateS: function () {
            var t = e(this.width), i = e(this.height), n = e(this.depth);
            return this._orgF.x = this.width / 2, this._orgF.y = this.height / 2, this._orgF.z = this.depth / 2, this.front.size(t, i, 0).position(0, 0, -n / 2).rotation(0, 0, 0).updateS().updateT(), this.back.size(t, i, 0).position(0, 0, n / 2).rotation(0, 180, 0).updateS().updateT(), this.left.size(n, i, 0).position(-t / 2, 0, 0).rotation(0, 90, 0).updateS().updateT(), this.right.size(n, i, 0).position(t / 2, 0, 0).rotation(0, -90, 0).updateS().updateT(), this.up.size(t, n, 0).position(0, -i / 2, 0).rotation(-90, 0, 0).updateS().updateT(), this.down.size(t, n, 0).position(0, i / 2, 0).rotation(90, 0, 0).updateS().updateT(), this
          },
          updateM: function () {
            if (!this.mat) return this;
            for (var t in this.mat) switch (t) {
              case"front":
              case"back":
              case"left":
              case"right":
              case"up":
              case"down":
                this[t].material({image: this.mat[t]}).updateM();
                break;
              default:
                this.front.material(this.mat).updateM(), this.back.material(this.mat).updateM(), this.left.material(this.mat).updateM(), this.right.material(this.mat).updateM(), this.up.material(this.mat).updateM(), this.down.material(this.mat).updateM()
            }
            return this
          },
          updateF: function () {
            return this.flt ? (this.front.filter(this.flt).updateF(), this.back.filter(this.flt).updateF(), this.left.filter(this.flt).updateF(), this.right.filter(this.flt).updateF(), this.up.filter(this.flt).updateF(), this.down.filter(this.flt).updateF(), this) : this
          },
          filter: function (t) {
            return this.flt = t, this
          }
        }), i.create = function (t) {
          var i;
          switch (typeof t) {
            case"array":
              i = {type: "sprite", children: t};
              break;
            case"object":
              i = t;
              break;
            default:
              return
          }
          return o(i)
        }, i
      })
    }).call(i, function () {
      return this
    }())
  }, 8: function (t, i, e) {
    var n, a;
    (function (o) {/*!
	 * VERSION: 0.2.0
	 * DATE: 2016-6-26
	 * GIT:https://github.com/shrekshrek/jstween
	 *
	 * @author: Shrek.wang, shrekshrek@gmail.com
	 **/
      !function (r) {
        var s = "object" == typeof self && self.self == self && self || "object" == typeof o && o.global == o && o;
        n = [e(2), i], a = function (t, i) {
          s.JTL = r(s, i, t)
        }.apply(i, n), !(void 0 !== a && (t.exports = a))
      }(function (t, i, e) {
        function n(t, i) {
          for (var e in i) t[e] = i[e]
        }

        function a(t) {
          var i = /(^[a-zA-Z]\w*|)(\+=|-=|)(\d*\.\d*|\d*)/, e = i.exec(t);
          return {label: e[1], ext: e[2], num: parseFloat(e[3])}
        }

        function o() {
          u = !0;
          var t = h.length;
          if (0 === t) return void(u = !1);
          var i = e.now(), n = i - l;
          l = i;
          for (var a = t - 1; a >= 0; a--) h[a]._update(n);
          s(o)
        }

        function r() {
          this.initialize.apply(this, arguments)
        }

        var s = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
          window.setTimeout(t, 1e3 / 60)
        }, h = [], u = !1, l = 0;
        return n(r.prototype, {
          initialize: function () {
            this.labels = [], this.labelTime = 0, this.anchors = [], this.anchorId = 0, this.tweens = [], this.isPlaying = !1, this.curTime = 0
          }, _update: function (t) {
            return this.isPlaying ? (this.curTime += t, void this._checkHandler()) : !0
          }, _addSelf: function () {
            h.push(this), u || (l = e.now(), o())
          }, _removeSelf: function () {
            var t = h.indexOf(this);
            -1 !== t && h.splice(t, 1)
          }, _checkHandler: function () {
            var t = this.anchors.length;
            if (!(this.anchorId >= t)) {
              var i = this.anchors[this.anchorId];
              this.curTime >= 1e3 * i.time && (this.anchorId == t - 1 ? (this._removeSelf(), this.isPlaying = !1, i.handler.apply()) : (i.handler.apply(), this.anchorId++, this._checkHandler()))
            }
          }, _parseTweenTime: function (t, i, e) {
            var n = Math.max(t, 0), a = Math.max(i.delay || 0, 0), o = Math.max(0, Math.floor(i.repeat || 0)),
              r = Math.max(i.repeatDelay || 0, 0), s = a + n + (r + n) * o, h = this._parsePosition(e);
            return this.labelTime = Math.max(this.labelTime, h + s), h
          }, _parsePosition: function (t) {
            if (void 0 == t) return this.labelTime;
            var i = a(t), e = 0;
            if (i.label) switch (e = this.getLabelTime(i.label), i.ext) {
              case"+=":
                e += i.num;
                break;
              case"-=":
                e -= i.num
            } else e = i.num;
            return e
          }, _addAnchor: function (t, i) {
            var e = this.anchors.length;
            if (0 == e) return void this.anchors.push({time: i, handler: t});
            if (e > 0) for (var n = e - 1; n >= 0; n--) {
              var a = this.anchors[n];
              if (i >= a.time) return void this.anchors.splice(n + 1, 0, {time: i, handler: t})
            }
          }, _addTween: function (t) {
            if (void 0 != t.length) for (var i in t) this.tweens.push(t[i]); else this.tweens.push(t)
          }, _removeTween: function (t) {
            var i = this.tweens.indexOf(t);
            -1 !== i && this.tweens.splice(i, 1)
          }, fromTo: function (t, i, n, a, o) {
            var r = this, s = a.onEnd;
            a.onEnd = function (t) {
              r._removeTween(this), s && s.apply(this, t)
            };
            var h = function () {
              var o = e.fromTo(t, i, n, a);
              r._addTween(o)
            }, u = this._parseTweenTime(i, a, o);
            return this._addAnchor(h, u), this
          }, from: function (t, i, n, a) {
            var o = this, r = n.onEnd;
            n.onEnd = function (t) {
              o._removeTween(this), r && r.apply(this, t)
            };
            var s = function () {
              var a = e.from(t, i, n);
              o._addTween(a)
            }, h = this._parseTweenTime(i, n, a);
            return this._addAnchor(s, h), this
          }, to: function (t, i, n, a) {
            var o = this, r = n.onEnd;
            n.onEnd = function (t) {
              o._removeTween(this), r && r.apply(this, t)
            };
            var s = function () {
              var a = e.to(t, i, n);
              o._addTween(a)
            }, h = this._parseTweenTime(i, n, a);
            return this._addAnchor(s, h), this
          }, kill: function (t, i) {
            var n = function () {
              e.kill(t, !0)
            }, a = this._parseTweenTime(0, {}, i);
            return this._addAnchor(n, a), this
          }, add: function (t, i) {
            var e = this._parsePosition(i);
            switch (typeof t) {
              case"function":
                this._addAnchor(t, e);
                break;
              case"string":
                this.addLabel(t, e);
                break;
              default:
                throw"add action is wrong!!!"
            }
            return this
          }, addLabel: function (t, i) {
            this.removeLabel(t);
            var e = this._parsePosition(i);
            return this.labels.push({name: t, time: e}), this
          }, removeLabel: function (t) {
            for (var i = this.labels.length, e = i - 1; e >= 0; e--) {
              var n = this.labels[e];
              if (t == n.name) return this.labels.splice(e, 1), this
            }
            return this
          }, getLabelTime: function (t) {
            for (var i = this.labels.length, e = i - 1; e >= 0; e--) {
              var n = this.labels[e];
              if (t == n.name) return n.time
            }
            return this.labelTime
          }, totalTime: function () {
            return this.labelTime
          }, play: function (t) {
            if (!this.isPlaying) {
              for (var i = this.tweens.length, e = i - 1; e >= 0; e--) this.tweens[e].play();
              this._addSelf(), this.isPlaying = !0, void 0 !== t && this.seek(t)
            }
          }, pause: function () {
            if (this.isPlaying) {
              for (var t = this.tweens.length, i = t - 1; i >= 0; i--) this.tweens[i].pause();
              this._removeSelf(), this.isPlaying = !1
            }
          }, seek: function (t) {
            var i = this._parsePosition(t);
            this.curTime = 1e3 * i;
            for (var e = this.anchors.length, n = 0; e > n; n++) {
              var a = this.anchors[n];
              if (1e3 * a.time >= this.curTime) return void(this.anchorId = n)
            }
          }, clear: function () {
            for (var t = this.tweens.length, i = t - 1; i >= 0; i--) this.tweens[i].kill();
            this.tweens = [], this.curTime = 0, this.labels = [], this.labelTime = 0, this.anchors = [], this.anchorId = 0
          }
        }), n(i, {
          create: function () {
            return new r
          }, kill: function (t) {
            t.destroy()
          }
        }), i
      })
    }).call(i, function () {
      return this
    }())
  }, 15: function (t, i) {
    t.exports = $
  }, 20: function (t, i, e) {
    (function (i) {
      var e = i.extend({}, i.Events, {
        START: "start",
        END: "end",
        MOVE: "move",
        stage: null,
        originTouchPos: {x: 0, y: 0},
        oldTouchPos: {x: 0, y: 0},
        newTouchPos: {x: 0, y: 0},
        firstDir: "",
        originTime: 0,
        oldTime: 0,
        newTime: 0,
        dx: 0,
        dy: 0,
        ax: 0,
        ay: 0,
        time: 0,
        init: function (t) {
          this.stage = t,
            this.onTouchStart = this.onTouchStart.bind(this),
            this.onTouchMove = this.onTouchMove.bind(this),
            this.onTouchEnd = this.onTouchEnd.bind(this),
            this.stage.on("touchstart", this.onTouchStart)
        },
        clear: function () {
          this.stage.off("touchstart", this.onTouchStart), this.stage.off("touchmove", this.onTouchMove), this.stage.off("touchend", this.onTouchEnd)
        },
        onTouchStart: function (t) {
          this.firstDir = "",
            t = t.changedTouches[0],
            this.originTouchPos.x = this.oldTouchPos.x = this.newTouchPos.x = t.clientX,
            this.originTouchPos.y = this.oldTouchPos.y = this.newTouchPos.y = t.clientY,
            this.originTime = this.oldTime = this.newTime = Date.now(),
            this.dx = this.dy = this.ax = this.ay = 0,
            this.stage.on("touchmove", this.onTouchMove),
            this.stage.on("touchend", this.onTouchEnd),
            this.trigger(this.START)
        },
        onTouchMove: function (t) {
          return t = t.changedTouches[0],
            this.newTouchPos.x = t.clientX,
            this.newTouchPos.y = t.clientY,
            this.newTime = Date.now(),
            this.checkGesture(),
            this.oldTouchPos.x = this.newTouchPos.x,
            this.oldTouchPos.y = this.newTouchPos.y,
            this.oldTime = this.newTime, !1
        },
        onTouchEnd: function () {
          this.newTime = Date.now();
          var t = (this.newTime - this.oldTime) / 1e3;
          this.trigger(this.END, {
            dx: this.dx,
            dy: this.dy,
            ax: 2 * this.time > t ? this.ax : 0,
            ay: 2 * this.time > t ? this.ay : 0,
            dir: this.firstDir
          }),
            this.stage.off("touchmove", this.onTouchMove), this.stage.off("touchend", this.onTouchEnd)
        },
        checkGesture: function () {
          this.dx = this.fixed2(this.newTouchPos.x - this.originTouchPos.x),
            this.dy = this.fixed2(this.newTouchPos.y - this.originTouchPos.y),
            this.ax = this.fixed2(this.newTouchPos.x - this.oldTouchPos.x),
            this.ay = this.fixed2(this.newTouchPos.y - this.oldTouchPos.y),
            this.time = (this.newTime - this.oldTime) / 1e3,
          "" == this.firstDir && (Math.abs(this.ax) > Math.abs(this.ay) ? this.firstDir = "x" : Math.abs(this.ax) < Math.abs(this.ay) && (this.firstDir = "y")),
            this.trigger(this.MOVE, {
            dx: this.dx,
            dy: this.dy,
            ax: this.ax,
            ay: this.ay,
            dir: this.firstDir
          })
        },
        fixed2: function (t) {
          return Math.floor(100 * t) / 100
        }
      });
      t.exports = e
    }).call(i, e(1))
  }, 24: function (t, i, e) {
    (function (i, n, a, o) {
      var r = e(3);
      t.exports = i.extend({}, i.Events, {
        isOut: !1, init: function (t) {
          function i() {
            a.kill(f);
            for (var t = f.children.length, e = 0, n = 0; t > n; n++) {
              var o = r.getRandom(0, 1.5);
              a.to(f.children[n], .6, {
                scaleX: o, scaleY: 1.5 - o, ease: a.Elastic.Out, onUpdate: function () {
                  this.target.updateT()
                }, onEnd: function () {
                  a.to(this.target, 1.4, {
                    scaleX: .2, scaleY: .2, ease: a.Quad.In, onUpdate: function () {
                      this.target.updateT()
                    }, onEnd: function () {
                      e++, e >= t && s(f, function () {
                        d.isOut ? d.tl2.play() : i()
                      })
                    }
                  })
                }
              })
            }
            a.fromTo(f, 3, {rotationY: 0}, {
              rotationY: 540, onUpdate: function () {
                this.target.updateT()
              }
            }), h(), u(1)
          }

          function s(t, i) {
            a.to({n: 0}, 1, {
              n: 3600, ease: a.Quad.In, onUpdate: function () {
                t.x = Math.floor(Math.sin(this.curVars.n.num / 180 * Math.PI) * this.curVars.n.num / 1800 * 100) / 100, t.y = Math.floor(Math.sin(this.curVars.n.num / 180 * Math.PI / 2) * this.curVars.n.num / 1800 * 100) / 100, t.updateT()
              }, onEnd: function () {
                i && i()
              }
            })
          }

          function h() {
            a.kill(v), a.to(v, .2, {
              scaleX: 1, scaleY: 1, ease: a.Quad.Out, onUpdate: function () {
                this.target.updateT()
              }, onEnd: function () {
                a.to(this.target, 2, {
                  scaleX: 0, scaleY: 0, ease: a.Quad.In, onUpdate: function () {
                    this.target.updateT()
                  }
                })
              }
            });
            var t = r.getRandom(30, -30);
            a.fromTo(v, 2.2, {rotationZ: 0, rotationY: -90}, {
              rotationZ: t, rotationY: 90, onUpdate: function () {
                this.target.updateT()
              }
            })
          }

          function u(t) {
            a.kill(C);
            for (var i = C.children.length, e = 0; i > e; e++) {
              var n = 6 > e ? r.getRandom(50, 150) * t : r.getRandom(150, 250) * t, o = r.getRandom(0, 360),
                s = o / 180 * Math.PI, h = 1 == t ? r.getRandom(-10, 10) : r.getRandom(-80, 80), u = h / 180 * Math.PI,
                l = Math.sin(u) * n, c = Math.abs(Math.cos(u) * n);
              C.children[e].position(Math.cos(s) * c, l, Math.sin(s) * c).updateT()
            }
            a.to(C, .5, {
              scaleX: 1, scaleY: 1, scaleZ: 1, ease: a.Quad.Out, onUpdate: function () {
                this.target.updateT()
              }, onEnd: function () {
                a.to(this.target, 1, {
                  scaleX: 0, scaleY: 0, scaleZ: 0, ease: a.Quad.In, onUpdate: function () {
                    this.target.updateT()
                  }
                })
              }
            }), a.fromTo(C, 2, {rotationY: 0}, {
              rotationY: 360, onUpdate: function () {
                this.target.updateT()
              }
            }), a.fromTo(C.children, 2, {rotationY: 0}, {
              rotationY: -360, onUpdate: function () {
                this.target.updateT()
              }
            })
          }

          function l() {
            a.kill(f);
            for (var t = f.children.length, i = 0, e = 0; t > e; e++) {
              var n = r.getRandom(0, 1.5), o = r.getRandom(400, 600), h = r.getRandom(0, 360), l = h / 180 * Math.PI,
                c = r.getRandom(-80, 80), A = c / 180 * Math.PI, d = Math.sin(A) * o, p = Math.abs(Math.cos(A) * o);
              a.to(f.children[e], .6, {
                scaleX: n,
                scaleY: 1.5 - n,
                x: Math.cos(l) * p,
                y: d,
                z: Math.sin(l) * p,
                ease: a.Quad.Out,
                onUpdate: function () {
                  this.target.updateT()
                },
                onEnd: function () {
                  a.to(this.target, 1.4, {
                    scaleX: .2,
                    scaleY: .2,
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: a.Quad.In,
                    onUpdate: function () {
                      this.target.updateT()
                    },
                    onEnd: function () {
                      i++, i >= t && s(f)
                    }
                  })
                }
              })
            }
            a.fromTo(f, 3, {rotationY: 0}, {
              rotationY: 540, onUpdate: function () {
                this.target.updateT()
              }
            }), u(2)
          }

          function c(t) {
            d.stage.addChild(t), a.to(t, .2, {
              scaleX: 1, scaleY: 1, ease: a.Quad.Out, onUpdate: function () {
                this.target.updateT()
              }, onEnd: function () {
                a.to(this.target, 2, {
                  scaleX: 0, scaleY: 0, ease: a.Quad.In, onUpdate: function () {
                    this.target.updateT()
                  }, onEnd: function () {
                    this.target.remove()
                  }
                })
              }
            }), a.fromTo(t, 2.2, {rotationY: -90}, {
              rotationY: 90, onUpdate: function () {
                this.target.updateT()
              }
            }), a.to($("#bg"), 1, {
              opacity: 1, onEnd: function () {
                a.to($("#bg"), 1, {opacity: 0, delay: .5})
              }
            }), a.fromTo($("#bg"), 2.5, {scale: 1}, {scale: 1.2})
          }

          function A() {
            a.kill(b);
            for (var t = b.children.length, i = 0; t > i; i++) {
              var e = r.getRandom(200, 800), n = r.getRandom(0, 360), o = n / 180 * Math.PI, s = r.getRandom(-25, 25),
                h = s / 180 * Math.PI, u = Math.sin(h) * e, l = Math.abs(Math.cos(h) * e);
              b.children[i].position(Math.cos(o) * l, u, Math.sin(o) * l).scale(1.5).updateT()
            }
            a.to(b, .8, {
              scaleX: 1, scaleY: 1, scaleZ: 1, ease: a.Quad.Out, onUpdate: function () {
                this.target.updateT()
              }, onEnd: function () {
                a.to(this.target, 1, {
                  scaleX: 1.5, scaleY: 1.5, scaleZ: 1.5, ease: a.Quad.In, onUpdate: function () {
                    this.target.updateT()
                  }
                })
              }
            }), a.fromTo(b, 2, {rotationY: 0}, {
              rotationY: 360, onUpdate: function () {
                this.target.updateT()
              }, onEnd: function () {
                this.target.remove()
              }
            }), a.fromTo(b.children, 2, {rotationY: 0}, {
              rotationY: -360, onUpdate: function () {
                this.target.updateT()
              }
            })
          }

          var d = this;
          this.stage = t;
          var f = new n.Sprite;
          f.position(0, 0, 0).update();
          for (var p = 0; 6 > p; p++) {
            var g = new n.Plane;
            g.size(100, 100).rotation(r.getRandom(-180, 180), r.getRandom(-180, 180), r.getRandom(-180, 180)).scale(.01).material({image: e(14)}).update(), f.addChild(g)
          }
          var v = new n.Sprite;
          v.position(0, 0, 0).scale(.01).update();
          for (var p = 0; 3 > p; p++) {
            var g = new n.Plane, m = 60, E = 120, y = p * E + 90, I = y / 180 * Math.PI;
            g.size(2, 210).position(Math.floor(Math.cos(I) * m * 100) / 100, Math.floor(Math.sin(I) * m * 100) / 100, 0).rotation(0, 0, y).material({color: "#fff"}).update(), v.addChild(g)
          }
          var C = new n.Sprite;
          C.position(0, 0, 0).scale(.01).update();
          for (var w = [{w: 100, h: 100, url: e(157)}, {w: 100, h: 100, url: e(158)}, {
            w: 100,
            h: 100,
            url: e(159)
          }, {w: 205, h: 120, url: e(154)}, {w: 205, h: 120, url: e(155)}, {
            w: 205,
            h: 120,
            url: e(156)
          }], p = 0; 10 > p; p++) {
            var V = 5 > p ? p % 3 : (p - 3) % 3 + 3, g = new n.Plane;
            g.size(w[V].w, w[V].h).scale(.5).material({image: w[V].url}).update(), C.addChild(g)
          }
          var b = new n.Sprite;
          b.position(0, 0, 0).scale(.01).update();
          for (var p = 0; 8 > p; p++) {
            var V = p % 3 + 3, g = new n.Plane;
            g.size(w[V].w, w[V].h).scale(.5).material({image: w[V].url}).update(), b.addChild(g)
          }
          var R = n.create({
            type: "sprite",
            scale: [.1],
            children: [{
              type: "plane",
              size: [388, 501],
              position: [0, 0, -10],
              material: [{image: e(28)}]
            }, {type: "plane", size: [388, 501], position: [0, 0, 10], material: [{image: e(29)}]}, {
              type: "plane",
              size: [388, 501],
              position: [0, 0, 0],
              material: [{image: e(30)}]
            }, {type: "plane", size: [388, 501], position: [0, 0, 0], material: [{image: e(31)}]}, {
              type: "plane",
              size: [400, 507],
              position: [0, 0, -100],
              material: [{image: e(32)}]
            }]
          }), P = n.create({
            type: "sprite",
            scale: [.1],
            children: [{type: "plane", size: [487, 79], material: [{image: e(160)}]}]
          });
          this.stage.addChild(f), this.stage.addChild(v), this.stage.addChild(C), this.tl = o.create(), this.tl.add("l1", .5), this.tl.add(function () {
            i()
          }, "l1"), this.tl2 = o.create(), this.tl2.add("l1", .5), this.tl2.add(function () {
            v.remove(), l(), c(R)
          }, "l1"), this.tl2.add(function () {
            l(), c(P)
          }, "l1+=3"), this.tl2.add(function () {
            f.remove(), C.remove(), d.stage.addChild(b), A(), d.trigger("out")
          }, "l1+=6")
        }, "in": function () {
          this.tl.play()
        }, out: function () {
          this.isOut = !0
        }
      })
    }).call(i, e(1), e(4), e(2), e(8))
  }, 25: function (t, i, e) {
    var n, a;
    (function (e) {/*!
	 * VERSION: 0.1.0
	 * DATE: 2015-12-20
	 * GIT:https://github.com/shrekshrek/orienter
	 *
	 * @author: Shrek.wang, shrekshrek@gmail.com
	 **/
      !function (o) {
        var r = "object" == typeof self && self.self == self && self || "object" == typeof e && e.global == e && e;
        n = [i], a = function (t) {
          r.Orienter = o(r, t)
        }.apply(i, n), !(void 0 !== a && (t.exports = a))
      }(function (t, i) {
        function e(t, i) {
          for (var e in i) t[e] = i[e]
        }

        return i = function () {
          this.initialize.apply(this, arguments)
        }, e(i.prototype, {
          lon: 0, lat: 0, direction: 0, fix: 0, os: "", initialize: function () {
            switch (this.lon = 0, this.lat = 0, this.direction = window.orientation || 0, this.direction) {
              case 0:
                this.fix = 0;
                break;
              case 90:
                this.fix = -270;
                break;
              case-90:
                this.fix = -90
            }
            navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? this.os = "ios" : this.os = navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") ? "android" : ""
          }, init: function () {
            this._orient = this.orientHandler.bind(this),
              window.addEventListener("deviceorientation", this._orient, !1),
              this._change = this.changeHandler.bind(this),
              window.addEventListener("orientationchange", this._change, !1)
          }, destroy: function () {
            window.removeEventListener("deviceorientation", this._orient, !1), window.removeEventListener("orientationchange", this._change, !1)
          }, changeHandler: function (t) {
            this.direction = window.orientation
          }, orientHandler: function (t) {
            switch (this.os) {
              case"ios":
                switch (this.direction) {
                  case 0:
                    this.lon = t.alpha + t.gamma, t.beta > 0 && (this.lat = t.beta - 90);
                    break;
                  case 90:
                    t.gamma < 0 ? this.lon = t.alpha - 90 : this.lon = t.alpha - 270, t.gamma > 0 ? this.lat = 90 - t.gamma : this.lat = -90 - t.gamma;
                    break;
                  case-90:
                    t.gamma < 0 ? this.lon = t.alpha - 90 : this.lon = t.alpha - 270, t.gamma < 0 ? this.lat = 90 + t.gamma : this.lat = -90 + t.gamma
                }
                break;
              case"android":
                switch (this.direction) {
                  case 0:
                    this.lon = t.alpha + t.gamma + 30, t.gamma > 90 ? this.lat = 90 - t.beta : this.lat = t.beta - 90;
                    break;
                  case 90:
                    this.lon = t.alpha - 230, t.gamma > 0 ? this.lat = 270 - t.gamma : this.lat = -90 - t.gamma;
                    break;
                  case-90:
                    this.lon = t.alpha - 180, this.lat = -90 + t.gamma
                }
            }
            this.lon += this.fix, this.lon %= 360, this.lon < 0 && (this.lon += 360), this.lon = Math.round(this.lon), this.lat = Math.round(this.lat), this.handler && this.handler.apply(this, [{
              a: Math.round(t.alpha),
              b: Math.round(t.beta),
              g: Math.round(t.gamma),
              lon: this.lon,
              lat: this.lat,
              dir: this.direction
            }])
          }
        }), i
      })
    }).call(i, function () {
      return this
    }())
  }
});