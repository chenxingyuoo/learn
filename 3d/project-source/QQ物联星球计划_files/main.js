function Template(e) {
  for (var t, i, r = ["var r=[];\nvar _html = function (str) { return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };"], n = /\{\s*([a-zA-Z\.\_0-9()]+)(\s*\|\s*safe)?\s*\}/m, o = function (e) {
    r.push("r.push('" + e.replace(/\'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r") + "');")
  }; i = n.exec(e);) i.index > 0 && o(e.slice(0, i.index)), i[2] ? r.push("r.push(String(this." + i[1] + "));") : r.push("r.push(_html(String(this." + i[1] + ")));"), e = e.substring(i.index + i[0].length);
  o(e), r.push("return r.join('');"), t = new Function(r.join("\n")), this.render = function (e) {
    return t.apply(e)
  }
}

window.UA = function (e) {
  e = e || {};
  var t = navigator.userAgent;
  return t.indexOf("Android") > -1 ? e.platform = "android" : /iPhone|iPad|iPod/.test(t) ? e.platform = "ios" : /Windows Phone|WPDesktop/.test(t) ? e.platform = "winphone" : e.platform = "pc", e[e.platform] = !0, e.qqVersion = function () {
    var e = t.match(/QQ\/([\d\.]+)/);
    return e ? e[1] : "0"
  }(), e.wxVersion = function () {
    var e = t.match(/MicroMessenger\/([\d\.]+)/);
    return e ? e[1] : "0"
  }(), e.qqVersion > "0" ? e.client = "qq" : e.wxVersion > "0" ? e.client = "wx" : e.client = "browser", e[e.client] = !0, e.compareVersion = function (e, t) {
    e = String(e).split("."), t = String(t).split(".");
    try {
      for (var i = 0, r = Math.max(e.length, t.length); r > i; i++) {
        var n = isFinite(e[i]) && Number(e[i]) || 0, o = isFinite(t[i]) && Number(t[i]) || 0;
        if (o > n) return -1;
        if (n > o) return 1
      }
    } catch (a) {
      return -1
    }
    return 0
  }, e.compareQQ = function (t) {
    return e.compareVersion(e.qqVersion, t)
  }, e.compareWX = function (t) {
    return e.compareVersion(e.wxVersion, t)
  }, e
}(window.UA), !function (e, t) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
  function i(e) {
    var t = e.length, i = ne.type(e);
    return "function" === i || ne.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
  }

  function r(e, t, i) {
    if (ne.isFunction(t)) return ne.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== i
    });
    if (t.nodeType) return ne.grep(e, function (e) {
      return e === t !== i
    });
    if ("string" == typeof t) {
      if (pe.test(t)) return ne.filter(t, e, i);
      t = ne.filter(t, e)
    }
    return ne.grep(e, function (e) {
      return ne.inArray(e, t) >= 0 !== i
    })
  }

  function n(e, t) {
    do e = e[t]; while (e && 1 !== e.nodeType);
    return e
  }

  function o(e) {
    var t = Te[e] = {};
    return ne.each(e.match(ye) || [], function (e, i) {
      t[i] = !0
    }), t
  }

  function a() {
    fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (fe.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
  }

  function s() {
    (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (a(), ne.ready())
  }

  function l(e, t, i) {
    if (void 0 === i && 1 === e.nodeType) {
      var r = "data-" + t.replace(we, "-$1").toLowerCase();
      if (i = e.getAttribute(r), "string" == typeof i) {
        try {
          i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : He.test(i) ? ne.parseJSON(i) : i
        } catch (n) {
        }
        ne.data(e, t, i)
      } else i = void 0
    }
    return i
  }

  function h(e) {
    var t;
    for (t in e) if (("data" !== t || !ne.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    return !0
  }

  function c(e, t, i, r) {
    if (ne.acceptData(e)) {
      var n, o, a = ne.expando, s = e.nodeType, l = s ? ne.cache : e, h = s ? e[a] : e[a] && a;
      if (h && l[h] && (r || l[h].data) || void 0 !== i || "string" != typeof t) return h || (h = s ? e[a] = Y.pop() || ne.guid++ : a), l[h] || (l[h] = s ? {} : {toJSON: ne.noop}), ("object" == typeof t || "function" == typeof t) && (r ? l[h] = ne.extend(l[h], t) : l[h].data = ne.extend(l[h].data, t)), o = l[h], r || (o.data || (o.data = {}), o = o.data), void 0 !== i && (o[ne.camelCase(t)] = i), "string" == typeof t ? (n = o[t], null == n && (n = o[ne.camelCase(t)])) : n = o, n
    }
  }

  function u(e, t, i) {
    if (ne.acceptData(e)) {
      var r, n, o = e.nodeType, a = o ? ne.cache : e, s = o ? e[ne.expando] : ne.expando;
      if (a[s]) {
        if (t && (r = i ? a[s] : a[s].data)) {
          ne.isArray(t) ? t = t.concat(ne.map(t, ne.camelCase)) : t in r ? t = [t] : (t = ne.camelCase(t), t = t in r ? [t] : t.split(" ")), n = t.length;
          for (; n--;) delete r[t[n]];
          if (i ? !h(r) : !ne.isEmptyObject(r)) return
        }
        (i || (delete a[s].data, h(a[s]))) && (o ? ne.cleanData([e], !0) : ie.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
      }
    }
  }

  function p() {
    return !0
  }

  function d() {
    return !1
  }

  function f() {
    try {
      return fe.activeElement
    } catch (e) {
    }
  }

  function m(e) {
    var t = Ne.split("|"), i = e.createDocumentFragment();
    if (i.createElement) for (; t.length;) i.createElement(t.pop());
    return i
  }

  function E(e, t) {
    var i, r, n = 0,
      o = typeof e.getElementsByTagName !== be ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== be ? e.querySelectorAll(t || "*") : void 0;
    if (!o) for (o = [], i = e.childNodes || e; null != (r = i[n]); n++) !t || ne.nodeName(r, t) ? o.push(r) : ne.merge(o, E(r, t));
    return void 0 === t || t && ne.nodeName(e, t) ? ne.merge([e], o) : o
  }

  function g(e) {
    Ae.test(e.type) && (e.defaultChecked = e.checked)
  }

  function v(e, t) {
    return ne.nodeName(e, "table") && ne.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function y(e) {
    return e.type = (null !== ne.find.attr(e, "type")) + "/" + e.type, e
  }

  function T(e) {
    var t = qe.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function x(e, t) {
    for (var i, r = 0; null != (i = e[r]); r++) ne._data(i, "globalEval", !t || ne._data(t[r], "globalEval"))
  }

  function R(e, t) {
    if (1 === t.nodeType && ne.hasData(e)) {
      var i, r, n, o = ne._data(e), a = ne._data(t, o), s = o.events;
      if (s) {
        delete a.handle, a.events = {};
        for (i in s) for (r = 0, n = s[i].length; n > r; r++) ne.event.add(t, i, s[i][r])
      }
      a.data && (a.data = ne.extend({}, a.data))
    }
  }

  function b(e, t) {
    var i, r, n;
    if (1 === t.nodeType) {
      if (i = t.nodeName.toLowerCase(), !ie.noCloneEvent && t[ne.expando]) {
        n = ne._data(t);
        for (r in n.events) ne.removeEvent(t, r, n.handle);
        t.removeAttribute(ne.expando)
      }
      "script" === i && t.text !== e.text ? (y(t).text = e.text, T(t)) : "object" === i ? (t.parentNode && (t.outerHTML = e.outerHTML), ie.html5Clone && e.innerHTML && !ne.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === i && Ae.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === i ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === i || "textarea" === i) && (t.defaultValue = e.defaultValue)
    }
  }

  function H(t, i) {
    var r, n = ne(i.createElement(t)).appendTo(i.body),
      o = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(n[0])) ? r.display : ne.css(n[0], "display");
    return n.detach(), o
  }

  function w(e) {
    var t = fe, i = Je[e];
    return i || (i = H(e, t), "none" !== i && i || (Ze = (Ze || ne("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Ze[0].contentWindow || Ze[0].contentDocument).document, t.write(), t.close(), i = H(e, t), Ze.detach()), Je[e] = i), i
  }

  function _(e, t) {
    return {
      get: function () {
        var i = e();
        return null != i ? i ? void delete this.get : (this.get = t).apply(this, arguments) : void 0
      }
    }
  }

  function S(e, t) {
    if (t in e) return t;
    for (var i = t.charAt(0).toUpperCase() + t.slice(1), r = t, n = pt.length; n--;) if (t = pt[n] + i, t in e) return t;
    return r
  }

  function M(e, t) {
    for (var i, r, n, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = ne._data(r, "olddisplay"), i = r.style.display, t ? (o[a] || "none" !== i || (r.style.display = ""), "" === r.style.display && Me(r) && (o[a] = ne._data(r, "olddisplay", w(r.nodeName)))) : (n = Me(r), (i && "none" !== i || !n) && ne._data(r, "olddisplay", n ? i : ne.css(r, "display"))));
    for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
    return e
  }

  function C(e, t, i) {
    var r = lt.exec(t);
    return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
  }

  function A(e, t, i, r, n) {
    for (var o = i === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === i && (a += ne.css(e, i + Se[o], !0, n)), r ? ("content" === i && (a -= ne.css(e, "padding" + Se[o], !0, n)), "margin" !== i && (a -= ne.css(e, "border" + Se[o] + "Width", !0, n))) : (a += ne.css(e, "padding" + Se[o], !0, n), "padding" !== i && (a += ne.css(e, "border" + Se[o] + "Width", !0, n)));
    return a
  }

  function L(e, t, i) {
    var r = !0, n = "width" === t ? e.offsetWidth : e.offsetHeight, o = et(e),
      a = ie.boxSizing && "border-box" === ne.css(e, "boxSizing", !1, o);
    if (0 >= n || null == n) {
      if (n = tt(e, t, o), (0 > n || null == n) && (n = e.style[t]), rt.test(n)) return n;
      r = a && (ie.boxSizingReliable() || n === e.style[t]), n = parseFloat(n) || 0
    }
    return n + A(e, t, i || (a ? "border" : "content"), r, o) + "px"
  }

  function D(e, t, i, r, n) {
    return new D.prototype.init(e, t, i, r, n)
  }

  function P() {
    return setTimeout(function () {
      dt = void 0
    }), dt = ne.now()
  }

  function F(e, t) {
    var i, r = {height: e}, n = 0;
    for (t = t ? 1 : 0; 4 > n; n += 2 - t) i = Se[n], r["margin" + i] = r["padding" + i] = e;
    return t && (r.opacity = r.width = e), r
  }

  function k(e, t, i) {
    for (var r, n = (yt[t] || []).concat(yt["*"]), o = 0, a = n.length; a > o; o++) if (r = n[o].call(i, t, e)) return r
  }

  function N(e, t, i) {
    var r, n, o, a, s, l, h, c, u = this, p = {}, d = e.style, f = e.nodeType && Me(e), m = ne._data(e, "fxshow");
    i.queue || (s = ne._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
      s.unqueued || l()
    }), s.unqueued++, u.always(function () {
      u.always(function () {
        s.unqueued--, ne.queue(e, "fx").length || s.empty.fire()
      })
    })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], h = ne.css(e, "display"), c = "none" === h ? ne._data(e, "olddisplay") || w(e.nodeName) : h, "inline" === c && "none" === ne.css(e, "float") && (ie.inlineBlockNeedsLayout && "inline" !== w(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), i.overflow && (d.overflow = "hidden", ie.shrinkWrapBlocks() || u.always(function () {
      d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
    }));
    for (r in t) if (n = t[r], mt.exec(n)) {
      if (delete t[r], o = o || "toggle" === n, n === (f ? "hide" : "show")) {
        if ("show" !== n || !m || void 0 === m[r]) continue;
        f = !0
      }
      p[r] = m && m[r] || ne.style(e, r)
    } else h = void 0;
    if (ne.isEmptyObject(p)) "inline" === ("none" === h ? w(e.nodeName) : h) && (d.display = h); else {
      m ? "hidden" in m && (f = m.hidden) : m = ne._data(e, "fxshow", {}), o && (m.hidden = !f), f ? ne(e).show() : u.done(function () {
        ne(e).hide()
      }), u.done(function () {
        var t;
        ne._removeData(e, "fxshow");
        for (t in p) ne.style(e, t, p[t])
      });
      for (r in p) a = k(f ? m[r] : 0, r, u), r in m || (m[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
    }
  }

  function U(e, t) {
    var i, r, n, o, a;
    for (i in e) if (r = ne.camelCase(i), n = t[r], o = e[i], ne.isArray(o) && (n = o[1], o = e[i] = o[0]), i !== r && (e[r] = o, delete e[i]), a = ne.cssHooks[r], a && "expand" in a) {
      o = a.expand(o), delete e[r];
      for (i in o) i in e || (e[i] = o[i], t[i] = n)
    } else t[r] = n
  }

  function z(e, t, i) {
    var r, n, o = 0, a = vt.length, s = ne.Deferred().always(function () {
      delete l.elem
    }), l = function () {
      if (n) return !1;
      for (var t = dt || P(), i = Math.max(0, h.startTime + h.duration - t), r = i / h.duration || 0, o = 1 - r, a = 0, l = h.tweens.length; l > a; a++) h.tweens[a].run(o);
      return s.notifyWith(e, [h, o, i]), 1 > o && l ? i : (s.resolveWith(e, [h]), !1)
    }, h = s.promise({
      elem: e,
      props: ne.extend({}, t),
      opts: ne.extend(!0, {specialEasing: {}}, i),
      originalProperties: t,
      originalOptions: i,
      startTime: dt || P(),
      duration: i.duration,
      tweens: [],
      createTween: function (t, i) {
        var r = ne.Tween(e, h.opts, t, i, h.opts.specialEasing[t] || h.opts.easing);
        return h.tweens.push(r), r
      },
      stop: function (t) {
        var i = 0, r = t ? h.tweens.length : 0;
        if (n) return this;
        for (n = !0; r > i; i++) h.tweens[i].run(1);
        return t ? s.resolveWith(e, [h, t]) : s.rejectWith(e, [h, t]), this
      }
    }), c = h.props;
    for (U(c, h.opts.specialEasing); a > o; o++) if (r = vt[o].call(h, e, c, h.opts)) return r;
    return ne.map(c, k, h), ne.isFunction(h.opts.start) && h.opts.start.call(e, h), ne.fx.timer(ne.extend(l, {
      elem: e,
      anim: h,
      queue: h.opts.queue
    })), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always)
  }

  function O(e) {
    return function (t, i) {
      "string" != typeof t && (i = t, t = "*");
      var r, n = 0, o = t.toLowerCase().match(ye) || [];
      if (ne.isFunction(i)) for (; r = o[n++];) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(i)) : (e[r] = e[r] || []).push(i)
    }
  }

  function B(e, t, i, r) {
    function n(s) {
      var l;
      return o[s] = !0, ne.each(e[s] || [], function (e, s) {
        var h = s(t, i, r);
        return "string" != typeof h || a || o[h] ? a ? !(l = h) : void 0 : (t.dataTypes.unshift(h), n(h), !1)
      }), l
    }

    var o = {}, a = e === jt;
    return n(t.dataTypes[0]) || !o["*"] && n("*")
  }

  function V(e, t) {
    var i, r, n = ne.ajaxSettings.flatOptions || {};
    for (r in t) void 0 !== t[r] && ((n[r] ? e : i || (i = {}))[r] = t[r]);
    return i && ne.extend(!0, e, i), e
  }

  function I(e, t, i) {
    for (var r, n, o, a, s = e.contents, l = e.dataTypes; "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
    if (n) for (a in s) if (s[a] && s[a].test(n)) {
      l.unshift(a);
      break
    }
    if (l[0] in i) o = l[0]; else {
      for (a in i) {
        if (!l[0] || e.converters[a + " " + l[0]]) {
          o = a;
          break
        }
        r || (r = a)
      }
      o = o || r
    }
    return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0
  }

  function j(e, t, i, r) {
    var n, o, a, s, l, h = {}, c = e.dataTypes.slice();
    if (c[1]) for (a in e.converters) h[a.toLowerCase()] = e.converters[a];
    for (o = c.shift(); o;) if (e.responseFields[o] && (i[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
      if (a = h[l + " " + o] || h["* " + o], !a) for (n in h) if (s = n.split(" "), s[1] === o && (a = h[l + " " + s[0]] || h["* " + s[0]])) {
        a === !0 ? a = h[n] : h[n] !== !0 && (o = s[0], c.unshift(s[1]));
        break
      }
      if (a !== !0) if (a && e["throws"]) t = a(t); else try {
        t = a(t)
      } catch (u) {
        return {state: "parsererror", error: a ? u : "No conversion from " + l + " to " + o}
      }
    }
    return {state: "success", data: t}
  }

  function W(e, t, i, r) {
    var n;
    if (ne.isArray(t)) ne.each(t, function (t, n) {
      i || qt.test(e) ? r(e, n) : W(e + "[" + ("object" == typeof n ? t : "") + "]", n, i, r)
    }); else if (i || "object" !== ne.type(t)) r(e, t); else for (n in t) W(e + "[" + n + "]", t[n], i, r)
  }

  function G() {
    try {
      return new e.XMLHttpRequest
    } catch (t) {
    }
  }

  function X() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch (t) {
    }
  }

  function q(e) {
    return ne.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
  }

  var Y = [], K = Y.slice, $ = Y.concat, Q = Y.push, Z = Y.indexOf, J = {}, ee = J.toString, te = J.hasOwnProperty,
    ie = {}, re = "1.11.1", ne = function (e, t) {
      return new ne.fn.init(e, t)
    }, oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ae = /^-ms-/, se = /-([\da-z])/gi, le = function (e, t) {
      return t.toUpperCase()
    };
  ne.fn = ne.prototype = {
    jquery: re, constructor: ne, selector: "", length: 0, toArray: function () {
      return K.call(this)
    }, get: function (e) {
      return null != e ? 0 > e ? this[e + this.length] : this[e] : K.call(this)
    }, pushStack: function (e) {
      var t = ne.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
      return ne.each(this, e, t)
    }, map: function (e) {
      return this.pushStack(ne.map(this, function (t, i) {
        return e.call(t, i, t)
      }))
    }, slice: function () {
      return this.pushStack(K.apply(this, arguments))
    }, first: function () {
      return this.eq(0)
    }, last: function () {
      return this.eq(-1)
    }, eq: function (e) {
      var t = this.length, i = +e + (0 > e ? t : 0);
      return this.pushStack(i >= 0 && t > i ? [this[i]] : [])
    }, end: function () {
      return this.prevObject || this.constructor(null)
    }, push: Q, sort: Y.sort, splice: Y.splice
  }, ne.extend = ne.fn.extend = function () {
    var e, t, i, r, n, o, a = arguments[0] || {}, s = 1, l = arguments.length, h = !1;
    for ("boolean" == typeof a && (h = a, a = arguments[s] || {}, s++), "object" == typeof a || ne.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++) if (null != (n = arguments[s])) for (r in n) e = a[r], i = n[r], a !== i && (h && i && (ne.isPlainObject(i) || (t = ne.isArray(i))) ? (t ? (t = !1, o = e && ne.isArray(e) ? e : []) : o = e && ne.isPlainObject(e) ? e : {}, a[r] = ne.extend(h, o, i)) : void 0 !== i && (a[r] = i));
    return a
  }, ne.extend({
    expando: "jQuery" + (re + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
      throw new Error(e)
    }, noop: function () {
    }, isFunction: function (e) {
      return "function" === ne.type(e)
    }, isArray: Array.isArray || function (e) {
      return "array" === ne.type(e)
    }, isWindow: function (e) {
      return null != e && e == e.window
    }, isNumeric: function (e) {
      return !ne.isArray(e) && e - parseFloat(e) >= 0
    }, isEmptyObject: function (e) {
      var t;
      for (t in e) return !1;
      return !0
    }, isPlainObject: function (e) {
      var t;
      if (!e || "object" !== ne.type(e) || e.nodeType || ne.isWindow(e)) return !1;
      try {
        if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (i) {
        return !1
      }
      if (ie.ownLast) for (t in e) return te.call(e, t);
      for (t in e) ;
      return void 0 === t || te.call(e, t)
    }, type: function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? J[ee.call(e)] || "object" : typeof e
    }, globalEval: function (t) {
      t && ne.trim(t) && (e.execScript || function (t) {
        e.eval.call(e, t)
      })(t)
    }, camelCase: function (e) {
      return e.replace(ae, "ms-").replace(se, le)
    }, nodeName: function (e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, r) {
      var n, o = 0, a = e.length, s = i(e);
      if (r) {
        if (s) for (; a > o && (n = t.apply(e[o], r), n !== !1); o++) ; else for (o in e) if (n = t.apply(e[o], r), n === !1) break
      } else if (s) for (; a > o && (n = t.call(e[o], o, e[o]), n !== !1); o++) ; else for (o in e) if (n = t.call(e[o], o, e[o]), n === !1) break;
      return e
    }, trim: function (e) {
      return null == e ? "" : (e + "").replace(oe, "")
    }, makeArray: function (e, t) {
      var r = t || [];
      return null != e && (i(Object(e)) ? ne.merge(r, "string" == typeof e ? [e] : e) : Q.call(r, e)), r
    }, inArray: function (e, t, i) {
      var r;
      if (t) {
        if (Z) return Z.call(t, e, i);
        for (r = t.length, i = i ? 0 > i ? Math.max(0, r + i) : i : 0; r > i; i++) if (i in t && t[i] === e) return i
      }
      return -1
    }, merge: function (e, t) {
      for (var i = +t.length, r = 0, n = e.length; i > r;) e[n++] = t[r++];
      if (i !== i) for (; void 0 !== t[r];) e[n++] = t[r++];
      return e.length = n, e
    }, grep: function (e, t, i) {
      for (var r, n = [], o = 0, a = e.length, s = !i; a > o; o++) r = !t(e[o], o), r !== s && n.push(e[o]);
      return n
    }, map: function (e, t, r) {
      var n, o = 0, a = e.length, s = i(e), l = [];
      if (s) for (; a > o; o++) n = t(e[o], o, r), null != n && l.push(n); else for (o in e) n = t(e[o], o, r), null != n && l.push(n);
      return $.apply([], l)
    }, guid: 1, proxy: function (e, t) {
      var i, r, n;
      return "string" == typeof t && (n = e[t], t = e, e = n), ne.isFunction(e) ? (i = K.call(arguments, 2), r = function () {
        return e.apply(t || this, i.concat(K.call(arguments)))
      }, r.guid = e.guid = e.guid || ne.guid++, r) : void 0
    }, now: function () {
      return +new Date
    }, support: ie
  }), ne.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
    J["[object " + t + "]"] = t.toLowerCase()
  });
  var he = function (e) {
    function t(e, t, i, r) {
      var n, o, a, s, l, h, u, d, f, m;
      if ((t ? t.ownerDocument || t : B) !== D && L(t), t = t || D, i = i || [], !e || "string" != typeof e) return i;
      if (1 !== (s = t.nodeType) && 9 !== s) return [];
      if (F && !r) {
        if (n = ve.exec(e)) if (a = n[1]) {
          if (9 === s) {
            if (o = t.getElementById(a), !o || !o.parentNode) return i;
            if (o.id === a) return i.push(o), i
          } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && z(t, o) && o.id === a) return i.push(o), i
        } else {
          if (n[2]) return J.apply(i, t.getElementsByTagName(e)), i;
          if ((a = n[3]) && x.getElementsByClassName && t.getElementsByClassName) return J.apply(i, t.getElementsByClassName(a)), i
        }
        if (x.qsa && (!k || !k.test(e))) {
          if (d = u = O, f = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
            for (h = w(e), (u = t.getAttribute("id")) ? d = u.replace(Te, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", l = h.length; l--;) h[l] = d + p(h[l]);
            f = ye.test(e) && c(t.parentNode) || t, m = h.join(",")
          }
          if (m) try {
            return J.apply(i, f.querySelectorAll(m)), i
          } catch (E) {
          } finally {
            u || t.removeAttribute("id")
          }
        }
      }
      return S(e.replace(le, "$1"), t, i, r)
    }

    function i() {
      function e(i, r) {
        return t.push(i + " ") > R.cacheLength && delete e[t.shift()], e[i + " "] = r
      }

      var t = [];
      return e
    }

    function r(e) {
      return e[O] = !0, e
    }

    function n(e) {
      var t = D.createElement("div");
      try {
        return !!e(t)
      } catch (i) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function o(e, t) {
      for (var i = e.split("|"), r = e.length; r--;) R.attrHandle[i[r]] = t
    }

    function a(e, t) {
      var i = t && e, r = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
      if (r) return r;
      if (i) for (; i = i.nextSibling;) if (i === t) return -1;
      return e ? 1 : -1
    }

    function s(e) {
      return function (t) {
        var i = t.nodeName.toLowerCase();
        return "input" === i && t.type === e
      }
    }

    function l(e) {
      return function (t) {
        var i = t.nodeName.toLowerCase();
        return ("input" === i || "button" === i) && t.type === e
      }
    }

    function h(e) {
      return r(function (t) {
        return t = +t, r(function (i, r) {
          for (var n, o = e([], i.length, t), a = o.length; a--;) i[n = o[a]] && (i[n] = !(r[n] = i[n]))
        })
      })
    }

    function c(e) {
      return e && typeof e.getElementsByTagName !== q && e
    }

    function u() {
    }

    function p(e) {
      for (var t = 0, i = e.length, r = ""; i > t; t++) r += e[t].value;
      return r
    }

    function d(e, t, i) {
      var r = t.dir, n = i && "parentNode" === r, o = I++;
      return t.first ? function (t, i, o) {
        for (; t = t[r];) if (1 === t.nodeType || n) return e(t, i, o)
      } : function (t, i, a) {
        var s, l, h = [V, o];
        if (a) {
          for (; t = t[r];) if ((1 === t.nodeType || n) && e(t, i, a)) return !0
        } else for (; t = t[r];) if (1 === t.nodeType || n) {
          if (l = t[O] || (t[O] = {}), (s = l[r]) && s[0] === V && s[1] === o) return h[2] = s[2];
          if (l[r] = h, h[2] = e(t, i, a)) return !0
        }
      }
    }

    function f(e) {
      return e.length > 1 ? function (t, i, r) {
        for (var n = e.length; n--;) if (!e[n](t, i, r)) return !1;
        return !0
      } : e[0]
    }

    function m(e, i, r) {
      for (var n = 0, o = i.length; o > n; n++) t(e, i[n], r);
      return r
    }

    function E(e, t, i, r, n) {
      for (var o, a = [], s = 0, l = e.length, h = null != t; l > s; s++) (o = e[s]) && (!i || i(o, r, n)) && (a.push(o), h && t.push(s));
      return a
    }

    function g(e, t, i, n, o, a) {
      return n && !n[O] && (n = g(n)), o && !o[O] && (o = g(o, a)), r(function (r, a, s, l) {
        var h, c, u, p = [], d = [], f = a.length, g = r || m(t || "*", s.nodeType ? [s] : s, []),
          v = !e || !r && t ? g : E(g, p, e, s, l), y = i ? o || (r ? e : f || n) ? [] : a : v;
        if (i && i(v, y, s, l), n) for (h = E(y, d), n(h, [], s, l), c = h.length; c--;) (u = h[c]) && (y[d[c]] = !(v[d[c]] = u));
        if (r) {
          if (o || e) {
            if (o) {
              for (h = [], c = y.length; c--;) (u = y[c]) && h.push(v[c] = u);
              o(null, y = [], h, l)
            }
            for (c = y.length; c--;) (u = y[c]) && (h = o ? te.call(r, u) : p[c]) > -1 && (r[h] = !(a[h] = u))
          }
        } else y = E(y === a ? y.splice(f, y.length) : y), o ? o(null, a, y, l) : J.apply(a, y)
      })
    }

    function v(e) {
      for (var t, i, r, n = e.length, o = R.relative[e[0].type], a = o || R.relative[" "], s = o ? 1 : 0, l = d(function (e) {
        return e === t
      }, a, !0), h = d(function (e) {
        return te.call(t, e) > -1
      }, a, !0), c = [function (e, i, r) {
        return !o && (r || i !== M) || ((t = i).nodeType ? l(e, i, r) : h(e, i, r))
      }]; n > s; s++) if (i = R.relative[e[s].type]) c = [d(f(c), i)]; else {
        if (i = R.filter[e[s].type].apply(null, e[s].matches), i[O]) {
          for (r = ++s; n > r && !R.relative[e[r].type]; r++) ;
          return g(s > 1 && f(c), s > 1 && p(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(le, "$1"), i, r > s && v(e.slice(s, r)), n > r && v(e = e.slice(r)), n > r && p(e))
        }
        c.push(i)
      }
      return f(c)
    }

    function y(e, i) {
      var n = i.length > 0, o = e.length > 0, a = function (r, a, s, l, h) {
        var c, u, p, d = 0, f = "0", m = r && [], g = [], v = M, y = r || o && R.find.TAG("*", h),
          T = V += null == v ? 1 : Math.random() || .1, x = y.length;
        for (h && (M = a !== D && a); f !== x && null != (c = y[f]); f++) {
          if (o && c) {
            for (u = 0; p = e[u++];) if (p(c, a, s)) {
              l.push(c);
              break
            }
            h && (V = T)
          }
          n && ((c = !p && c) && d--, r && m.push(c))
        }
        if (d += f, n && f !== d) {
          for (u = 0; p = i[u++];) p(m, g, a, s);
          if (r) {
            if (d > 0) for (; f--;) m[f] || g[f] || (g[f] = Q.call(l));
            g = E(g)
          }
          J.apply(l, g), h && !r && g.length > 0 && d + i.length > 1 && t.uniqueSort(l)
        }
        return h && (V = T, M = v), m
      };
      return n ? r(a) : a
    }

    var T, x, R, b, H, w, _, S, M, C, A, L, D, P, F, k, N, U, z, O = "sizzle" + -new Date, B = e.document, V = 0, I = 0,
      j = i(), W = i(), G = i(), X = function (e, t) {
        return e === t && (A = !0), 0
      }, q = "undefined", Y = 1 << 31, K = {}.hasOwnProperty, $ = [], Q = $.pop, Z = $.push, J = $.push, ee = $.slice,
      te = $.indexOf || function (e) {
        for (var t = 0, i = this.length; i > t; t++) if (this[t] === e) return t;
        return -1
      },
      ie = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      re = "[\\x20\\t\\r\\n\\f]", ne = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", oe = ne.replace("w", "w#"),
      ae = "\\[" + re + "*(" + ne + ")(?:" + re + "*([*^$|!~]?=)" + re + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + re + "*\\]",
      se = ":(" + ne + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)",
      le = new RegExp("^" + re + "+|((?:^|[^\\\\])(?:\\\\.)*)" + re + "+$", "g"),
      he = new RegExp("^" + re + "*," + re + "*"), ce = new RegExp("^" + re + "*([>+~]|" + re + ")" + re + "*"),
      ue = new RegExp("=" + re + "*([^\\]'\"]*?)" + re + "*\\]", "g"), pe = new RegExp(se),
      de = new RegExp("^" + oe + "$"), fe = {
        ID: new RegExp("^#(" + ne + ")"),
        CLASS: new RegExp("^\\.(" + ne + ")"),
        TAG: new RegExp("^(" + ne.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + ae),
        PSEUDO: new RegExp("^" + se),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + re + "*(even|odd|(([+-]|)(\\d*)n|)" + re + "*(?:([+-]|)" + re + "*(\\d+)|))" + re + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + ie + ")$", "i"),
        needsContext: new RegExp("^" + re + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + re + "*((?:-\\d)?\\d*)" + re + "*\\)|)(?=[^-]|$)", "i")
      }, me = /^(?:input|select|textarea|button)$/i, Ee = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/,
      ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, Te = /'|\\/g,
      xe = new RegExp("\\\\([\\da-f]{1,6}" + re + "?|(" + re + ")|.)", "ig"), Re = function (e, t, i) {
        var r = "0x" + t - 65536;
        return r !== r || i ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
      };
    try {
      J.apply($ = ee.call(B.childNodes), B.childNodes), $[B.childNodes.length].nodeType
    } catch (be) {
      J = {
        apply: $.length ? function (e, t) {
          Z.apply(e, ee.call(t))
        } : function (e, t) {
          for (var i = e.length, r = 0; e[i++] = t[r++];) ;
          e.length = i - 1
        }
      }
    }
    x = t.support = {}, H = t.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return t ? "HTML" !== t.nodeName : !1
    }, L = t.setDocument = function (e) {
      var t, i = e ? e.ownerDocument || e : B, r = i.defaultView;
      return i !== D && 9 === i.nodeType && i.documentElement ? (D = i, P = i.documentElement, F = !H(i), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function () {
        L()
      }, !1) : r.attachEvent && r.attachEvent("onunload", function () {
        L()
      })), x.attributes = n(function (e) {
        return e.className = "i", !e.getAttribute("className")
      }), x.getElementsByTagName = n(function (e) {
        return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
      }), x.getElementsByClassName = ge.test(i.getElementsByClassName) && n(function (e) {
        return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
      }), x.getById = n(function (e) {
        return P.appendChild(e).id = O, !i.getElementsByName || !i.getElementsByName(O).length
      }), x.getById ? (R.find.ID = function (e, t) {
        if (typeof t.getElementById !== q && F) {
          var i = t.getElementById(e);
          return i && i.parentNode ? [i] : []
        }
      }, R.filter.ID = function (e) {
        var t = e.replace(xe, Re);
        return function (e) {
          return e.getAttribute("id") === t
        }
      }) : (delete R.find.ID, R.filter.ID = function (e) {
        var t = e.replace(xe, Re);
        return function (e) {
          var i = typeof e.getAttributeNode !== q && e.getAttributeNode("id");
          return i && i.value === t
        }
      }), R.find.TAG = x.getElementsByTagName ? function (e, t) {
        return typeof t.getElementsByTagName !== q ? t.getElementsByTagName(e) : void 0
      } : function (e, t) {
        var i, r = [], n = 0, o = t.getElementsByTagName(e);
        if ("*" === e) {
          for (; i = o[n++];) 1 === i.nodeType && r.push(i);
          return r
        }
        return o
      }, R.find.CLASS = x.getElementsByClassName && function (e, t) {
        return typeof t.getElementsByClassName !== q && F ? t.getElementsByClassName(e) : void 0
      }, N = [], k = [], (x.qsa = ge.test(i.querySelectorAll)) && (n(function (e) {
        e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && k.push("[*^$]=" + re + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || k.push("\\[" + re + "*(?:value|" + ie + ")"), e.querySelectorAll(":checked").length || k.push(":checked")
      }), n(function (e) {
        var t = i.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && k.push("name" + re + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || k.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), k.push(",.*:")
      })), (x.matchesSelector = ge.test(U = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && n(function (e) {
        x.disconnectedMatch = U.call(e, "div"), U.call(e, "[s!='']:x"), N.push("!=", se)
      }), k = k.length && new RegExp(k.join("|")), N = N.length && new RegExp(N.join("|")), t = ge.test(P.compareDocumentPosition), z = t || ge.test(P.contains) ? function (e, t) {
        var i = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(i.contains ? i.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
      } : function (e, t) {
        if (t) for (; t = t.parentNode;) if (t === e) return !0;
        return !1
      }, X = t ? function (e, t) {
        if (e === t) return A = !0, 0;
        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !x.sortDetached && t.compareDocumentPosition(e) === r ? e === i || e.ownerDocument === B && z(B, e) ? -1 : t === i || t.ownerDocument === B && z(B, t) ? 1 : C ? te.call(C, e) - te.call(C, t) : 0 : 4 & r ? -1 : 1)
      } : function (e, t) {
        if (e === t) return A = !0, 0;
        var r, n = 0, o = e.parentNode, s = t.parentNode, l = [e], h = [t];
        if (!o || !s) return e === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : C ? te.call(C, e) - te.call(C, t) : 0;
        if (o === s) return a(e, t);
        for (r = e; r = r.parentNode;) l.unshift(r);
        for (r = t; r = r.parentNode;) h.unshift(r);
        for (; l[n] === h[n];) n++;
        return n ? a(l[n], h[n]) : l[n] === B ? -1 : h[n] === B ? 1 : 0
      }, i) : D
    }, t.matches = function (e, i) {
      return t(e, null, null, i)
    }, t.matchesSelector = function (e, i) {
      if ((e.ownerDocument || e) !== D && L(e), i = i.replace(ue, "='$1']"), !(!x.matchesSelector || !F || N && N.test(i) || k && k.test(i))) try {
        var r = U.call(e, i);
        if (r || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
      } catch (n) {
      }
      return t(i, D, null, [e]).length > 0
    }, t.contains = function (e, t) {
      return (e.ownerDocument || e) !== D && L(e), z(e, t)
    }, t.attr = function (e, t) {
      (e.ownerDocument || e) !== D && L(e);
      var i = R.attrHandle[t.toLowerCase()], r = i && K.call(R.attrHandle, t.toLowerCase()) ? i(e, t, !F) : void 0;
      return void 0 !== r ? r : x.attributes || !F ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }, t.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function (e) {
      var t, i = [], r = 0, n = 0;
      if (A = !x.detectDuplicates, C = !x.sortStable && e.slice(0), e.sort(X), A) {
        for (; t = e[n++];) t === e[n] && (r = i.push(n));
        for (; r--;) e.splice(i[r], 1)
      }
      return C = null, e
    }, b = t.getText = function (e) {
      var t, i = "", r = 0, n = e.nodeType;
      if (n) {
        if (1 === n || 9 === n || 11 === n) {
          if ("string" == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) i += b(e)
        } else if (3 === n || 4 === n) return e.nodeValue
      } else for (; t = e[r++];) i += b(t);
      return i
    }, R = t.selectors = {
      cacheLength: 50,
      createPseudo: r,
      match: fe,
      attrHandle: {},
      find: {},
      relative: {
        ">": {dir: "parentNode", first: !0},
        " ": {dir: "parentNode"},
        "+": {dir: "previousSibling", first: !0},
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        ATTR: function (e) {
          return e[1] = e[1].replace(xe, Re), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, Re), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        }, PSEUDO: function (e) {
          var t, i = !e[6] && e[2];
          return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && pe.test(i) && (t = w(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function (e) {
          var t = e.replace(xe, Re).toLowerCase();
          return "*" === e ? function () {
            return !0
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        }, CLASS: function (e) {
          var t = j[e + " "];
          return t || (t = new RegExp("(^|" + re + ")" + e + "(" + re + "|$)")) && j(e, function (e) {
            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== q && e.getAttribute("class") || "")
          })
        }, ATTR: function (e, i, r) {
          return function (n) {
            var o = t.attr(n, e);
            return null == o ? "!=" === i : i ? (o += "", "=" === i ? o === r : "!=" === i ? o !== r : "^=" === i ? r && 0 === o.indexOf(r) : "*=" === i ? r && o.indexOf(r) > -1 : "$=" === i ? r && o.slice(-r.length) === r : "~=" === i ? (" " + o + " ").indexOf(r) > -1 : "|=" === i ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
          }
        }, CHILD: function (e, t, i, r, n) {
          var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
          return 1 === r && 0 === n ? function (e) {
            return !!e.parentNode
          } : function (t, i, l) {
            var h, c, u, p, d, f, m = o !== a ? "nextSibling" : "previousSibling", E = t.parentNode,
              g = s && t.nodeName.toLowerCase(), v = !l && !s;
            if (E) {
              if (o) {
                for (; m;) {
                  for (u = t; u = u[m];) if (s ? u.nodeName.toLowerCase() === g : 1 === u.nodeType) return !1;
                  f = m = "only" === e && !f && "nextSibling"
                }
                return !0
              }
              if (f = [a ? E.firstChild : E.lastChild], a && v) {
                for (c = E[O] || (E[O] = {}), h = c[e] || [], d = h[0] === V && h[1], p = h[0] === V && h[2], u = d && E.childNodes[d]; u = ++d && u && u[m] || (p = d = 0) || f.pop();) if (1 === u.nodeType && ++p && u === t) {
                  c[e] = [V, d, p];
                  break
                }
              } else if (v && (h = (t[O] || (t[O] = {}))[e]) && h[0] === V) p = h[1]; else for (; (u = ++d && u && u[m] || (p = d = 0) || f.pop()) && ((s ? u.nodeName.toLowerCase() !== g : 1 !== u.nodeType) || !++p || (v && ((u[O] || (u[O] = {}))[e] = [V, p]), u !== t));) ;
              return p -= n, p === r || p % r === 0 && p / r >= 0
            }
          }
        }, PSEUDO: function (e, i) {
          var n, o = R.pseudos[e] || R.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
          return o[O] ? o(i) : o.length > 1 ? (n = [e, e, "", i], R.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
            for (var r, n = o(e, i), a = n.length; a--;) r = te.call(e, n[a]), e[r] = !(t[r] = n[a])
          }) : function (e) {
            return o(e, 0, n)
          }) : o
        }
      },
      pseudos: {
        not: r(function (e) {
          var t = [], i = [], n = _(e.replace(le, "$1"));
          return n[O] ? r(function (e, t, i, r) {
            for (var o, a = n(e, null, r, []), s = e.length; s--;) (o = a[s]) && (e[s] = !(t[s] = o))
          }) : function (e, r, o) {
            return t[0] = e, n(t, null, o, i), !i.pop()
          }
        }), has: r(function (e) {
          return function (i) {
            return t(e, i).length > 0
          }
        }), contains: r(function (e) {
          return function (t) {
            return (t.textContent || t.innerText || b(t)).indexOf(e) > -1
          }
        }), lang: r(function (e) {
          return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, Re).toLowerCase(), function (t) {
            var i;
            do if (i = F ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === e || 0 === i.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
            return !1
          }
        }), target: function (t) {
          var i = e.location && e.location.hash;
          return i && i.slice(1) === t.id
        }, root: function (e) {
          return e === P
        }, focus: function (e) {
          return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
          return e.disabled === !1
        }, disabled: function (e) {
          return e.disabled === !0
        }, checked: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected;
        }, selected: function (e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
          for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
          return !0
        }, parent: function (e) {
          return !R.pseudos.empty(e)
        }, header: function (e) {
          return Ee.test(e.nodeName)
        }, input: function (e) {
          return me.test(e.nodeName)
        }, button: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t
        }, text: function (e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        }, first: h(function () {
          return [0]
        }), last: h(function (e, t) {
          return [t - 1]
        }), eq: h(function (e, t, i) {
          return [0 > i ? i + t : i]
        }), even: h(function (e, t) {
          for (var i = 0; t > i; i += 2) e.push(i);
          return e
        }), odd: h(function (e, t) {
          for (var i = 1; t > i; i += 2) e.push(i);
          return e
        }), lt: h(function (e, t, i) {
          for (var r = 0 > i ? i + t : i; --r >= 0;) e.push(r);
          return e
        }), gt: h(function (e, t, i) {
          for (var r = 0 > i ? i + t : i; ++r < t;) e.push(r);
          return e
        })
      }
    }, R.pseudos.nth = R.pseudos.eq;
    for (T in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) R.pseudos[T] = s(T);
    for (T in{submit: !0, reset: !0}) R.pseudos[T] = l(T);
    return u.prototype = R.filters = R.pseudos, R.setFilters = new u, w = t.tokenize = function (e, i) {
      var r, n, o, a, s, l, h, c = W[e + " "];
      if (c) return i ? 0 : c.slice(0);
      for (s = e, l = [], h = R.preFilter; s;) {
        (!r || (n = he.exec(s))) && (n && (s = s.slice(n[0].length) || s), l.push(o = [])), r = !1, (n = ce.exec(s)) && (r = n.shift(), o.push({
          value: r,
          type: n[0].replace(le, " ")
        }), s = s.slice(r.length));
        for (a in R.filter) !(n = fe[a].exec(s)) || h[a] && !(n = h[a](n)) || (r = n.shift(), o.push({
          value: r,
          type: a,
          matches: n
        }), s = s.slice(r.length));
        if (!r) break
      }
      return i ? s.length : s ? t.error(e) : W(e, l).slice(0)
    }, _ = t.compile = function (e, t) {
      var i, r = [], n = [], o = G[e + " "];
      if (!o) {
        for (t || (t = w(e)), i = t.length; i--;) o = v(t[i]), o[O] ? r.push(o) : n.push(o);
        o = G(e, y(n, r)), o.selector = e
      }
      return o
    }, S = t.select = function (e, t, i, r) {
      var n, o, a, s, l, h = "function" == typeof e && e, u = !r && w(e = h.selector || e);
      if (i = i || [], 1 === u.length) {
        if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === t.nodeType && F && R.relative[o[1].type]) {
          if (t = (R.find.ID(a.matches[0].replace(xe, Re), t) || [])[0], !t) return i;
          h && (t = t.parentNode), e = e.slice(o.shift().value.length)
        }
        for (n = fe.needsContext.test(e) ? 0 : o.length; n-- && (a = o[n], !R.relative[s = a.type]);) if ((l = R.find[s]) && (r = l(a.matches[0].replace(xe, Re), ye.test(o[0].type) && c(t.parentNode) || t))) {
          if (o.splice(n, 1), e = r.length && p(o), !e) return J.apply(i, r), i;
          break
        }
      }
      return (h || _(e, u))(r, t, !F, i, ye.test(e) && c(t.parentNode) || t), i
    }, x.sortStable = O.split("").sort(X).join("") === O, x.detectDuplicates = !!A, L(), x.sortDetached = n(function (e) {
      return 1 & e.compareDocumentPosition(D.createElement("div"))
    }), n(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
    }) || o("type|href|height|width", function (e, t, i) {
      return i ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), x.attributes && n(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || o("value", function (e, t, i) {
      return i || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
    }), n(function (e) {
      return null == e.getAttribute("disabled")
    }) || o(ie, function (e, t, i) {
      var r;
      return i ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }), t
  }(e);
  ne.find = he, ne.expr = he.selectors, ne.expr[":"] = ne.expr.pseudos, ne.unique = he.uniqueSort, ne.text = he.getText, ne.isXMLDoc = he.isXML, ne.contains = he.contains;
  var ce = ne.expr.match.needsContext, ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, pe = /^.[^:#\[\.,]*$/;
  ne.filter = function (e, t, i) {
    var r = t[0];
    return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ne.find.matchesSelector(r, e) ? [r] : [] : ne.find.matches(e, ne.grep(t, function (e) {
      return 1 === e.nodeType
    }))
  }, ne.fn.extend({
    find: function (e) {
      var t, i = [], r = this, n = r.length;
      if ("string" != typeof e) return this.pushStack(ne(e).filter(function () {
        for (t = 0; n > t; t++) if (ne.contains(r[t], this)) return !0
      }));
      for (t = 0; n > t; t++) ne.find(e, r[t], i);
      return i = this.pushStack(n > 1 ? ne.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
    }, filter: function (e) {
      return this.pushStack(r(this, e || [], !1))
    }, not: function (e) {
      return this.pushStack(r(this, e || [], !0))
    }, is: function (e) {
      return !!r(this, "string" == typeof e && ce.test(e) ? ne(e) : e || [], !1).length
    }
  });
  var de, fe = e.document, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, Ee = ne.fn.init = function (e, t) {
    var i, r;
    if (!e) return this;
    if ("string" == typeof e) {
      if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : me.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || de).find(e) : this.constructor(t).find(e);
      if (i[1]) {
        if (t = t instanceof ne ? t[0] : t, ne.merge(this, ne.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : fe, !0)), ue.test(i[1]) && ne.isPlainObject(t)) for (i in t) ne.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
        return this
      }
      if (r = fe.getElementById(i[2]), r && r.parentNode) {
        if (r.id !== i[2]) return de.find(e);
        this.length = 1, this[0] = r
      }
      return this.context = fe, this.selector = e, this
    }
    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ne.isFunction(e) ? "undefined" != typeof de.ready ? de.ready(e) : e(ne) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ne.makeArray(e, this))
  };
  Ee.prototype = ne.fn, de = ne(fe);
  var ge = /^(?:parents|prev(?:Until|All))/, ve = {children: !0, contents: !0, next: !0, prev: !0};
  ne.extend({
    dir: function (e, t, i) {
      for (var r = [], n = e[t]; n && 9 !== n.nodeType && (void 0 === i || 1 !== n.nodeType || !ne(n).is(i));) 1 === n.nodeType && r.push(n), n = n[t];
      return r
    }, sibling: function (e, t) {
      for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
      return i
    }
  }), ne.fn.extend({
    has: function (e) {
      var t, i = ne(e, this), r = i.length;
      return this.filter(function () {
        for (t = 0; r > t; t++) if (ne.contains(this, i[t])) return !0
      })
    }, closest: function (e, t) {
      for (var i, r = 0, n = this.length, o = [], a = ce.test(e) || "string" != typeof e ? ne(e, t || this.context) : 0; n > r; r++) for (i = this[r]; i && i !== t; i = i.parentNode) if (i.nodeType < 11 && (a ? a.index(i) > -1 : 1 === i.nodeType && ne.find.matchesSelector(i, e))) {
        o.push(i);
        break
      }
      return this.pushStack(o.length > 1 ? ne.unique(o) : o)
    }, index: function (e) {
      return e ? "string" == typeof e ? ne.inArray(this[0], ne(e)) : ne.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
      return this.pushStack(ne.unique(ne.merge(this.get(), ne(e, t))))
    }, addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }), ne.each({
    parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
      return ne.dir(e, "parentNode")
    }, parentsUntil: function (e, t, i) {
      return ne.dir(e, "parentNode", i)
    }, next: function (e) {
      return n(e, "nextSibling")
    }, prev: function (e) {
      return n(e, "previousSibling")
    }, nextAll: function (e) {
      return ne.dir(e, "nextSibling")
    }, prevAll: function (e) {
      return ne.dir(e, "previousSibling")
    }, nextUntil: function (e, t, i) {
      return ne.dir(e, "nextSibling", i)
    }, prevUntil: function (e, t, i) {
      return ne.dir(e, "previousSibling", i)
    }, siblings: function (e) {
      return ne.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
      return ne.sibling(e.firstChild)
    }, contents: function (e) {
      return ne.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ne.merge([], e.childNodes)
    }
  }, function (e, t) {
    ne.fn[e] = function (i, r) {
      var n = ne.map(this, t, i);
      return "Until" !== e.slice(-5) && (r = i), r && "string" == typeof r && (n = ne.filter(r, n)), this.length > 1 && (ve[e] || (n = ne.unique(n)), ge.test(e) && (n = n.reverse())), this.pushStack(n)
    }
  });
  var ye = /\S+/g, Te = {};
  ne.Callbacks = function (e) {
    e = "string" == typeof e ? Te[e] || o(e) : ne.extend({}, e);
    var t, i, r, n, a, s, l = [], h = !e.once && [], c = function (o) {
      for (i = e.memory && o, r = !0, a = s || 0, s = 0, n = l.length, t = !0; l && n > a; a++) if (l[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
        i = !1;
        break
      }
      t = !1, l && (h ? h.length && c(h.shift()) : i ? l = [] : u.disable())
    }, u = {
      add: function () {
        if (l) {
          var r = l.length;
          !function o(t) {
            ne.each(t, function (t, i) {
              var r = ne.type(i);
              "function" === r ? e.unique && u.has(i) || l.push(i) : i && i.length && "string" !== r && o(i)
            })
          }(arguments), t ? n = l.length : i && (s = r, c(i))
        }
        return this
      }, remove: function () {
        return l && ne.each(arguments, function (e, i) {
          for (var r; (r = ne.inArray(i, l, r)) > -1;) l.splice(r, 1), t && (n >= r && n--, a >= r && a--)
        }), this
      }, has: function (e) {
        return e ? ne.inArray(e, l) > -1 : !(!l || !l.length)
      }, empty: function () {
        return l = [], n = 0, this
      }, disable: function () {
        return l = h = i = void 0, this
      }, disabled: function () {
        return !l
      }, lock: function () {
        return h = void 0, i || u.disable(), this
      }, locked: function () {
        return !h
      }, fireWith: function (e, i) {
        return !l || r && !h || (i = i || [], i = [e, i.slice ? i.slice() : i], t ? h.push(i) : c(i)), this
      }, fire: function () {
        return u.fireWith(this, arguments), this
      }, fired: function () {
        return !!r
      }
    };
    return u
  }, ne.extend({
    Deferred: function (e) {
      var t = [["resolve", "done", ne.Callbacks("once memory"), "resolved"], ["reject", "fail", ne.Callbacks("once memory"), "rejected"], ["notify", "progress", ne.Callbacks("memory")]],
        i = "pending", r = {
          state: function () {
            return i
          }, always: function () {
            return n.done(arguments).fail(arguments), this
          }, then: function () {
            var e = arguments;
            return ne.Deferred(function (i) {
              ne.each(t, function (t, o) {
                var a = ne.isFunction(e[t]) && e[t];
                n[o[1]](function () {
                  var e = a && a.apply(this, arguments);
                  e && ne.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o[0] + "With"](this === r ? i.promise() : this, a ? [e] : arguments)
                })
              }), e = null
            }).promise()
          }, promise: function (e) {
            return null != e ? ne.extend(e, r) : r
          }
        }, n = {};
      return r.pipe = r.then, ne.each(t, function (e, o) {
        var a = o[2], s = o[3];
        r[o[1]] = a.add, s && a.add(function () {
          i = s
        }, t[1 ^ e][2].disable, t[2][2].lock), n[o[0]] = function () {
          return n[o[0] + "With"](this === n ? r : this, arguments), this
        }, n[o[0] + "With"] = a.fireWith
      }), r.promise(n), e && e.call(n, n), n
    }, when: function (e) {
      var t, i, r, n = 0, o = K.call(arguments), a = o.length, s = 1 !== a || e && ne.isFunction(e.promise) ? a : 0,
        l = 1 === s ? e : ne.Deferred(), h = function (e, i, r) {
          return function (n) {
            i[e] = this, r[e] = arguments.length > 1 ? K.call(arguments) : n, r === t ? l.notifyWith(i, r) : --s || l.resolveWith(i, r)
          }
        };
      if (a > 1) for (t = new Array(a), i = new Array(a), r = new Array(a); a > n; n++) o[n] && ne.isFunction(o[n].promise) ? o[n].promise().done(h(n, r, o)).fail(l.reject).progress(h(n, i, t)) : --s;
      return s || l.resolveWith(r, o), l.promise()
    }
  });
  var xe;
  ne.fn.ready = function (e) {
    return ne.ready.promise().done(e), this
  }, ne.extend({
    isReady: !1, readyWait: 1, holdReady: function (e) {
      e ? ne.readyWait++ : ne.ready(!0)
    }, ready: function (e) {
      if (e === !0 ? !--ne.readyWait : !ne.isReady) {
        if (!fe.body) return setTimeout(ne.ready);
        ne.isReady = !0, e !== !0 && --ne.readyWait > 0 || (xe.resolveWith(fe, [ne]), ne.fn.triggerHandler && (ne(fe).triggerHandler("ready"), ne(fe).off("ready")))
      }
    }
  }), ne.ready.promise = function (t) {
    if (!xe) if (xe = ne.Deferred(), "complete" === fe.readyState) setTimeout(ne.ready); else if (fe.addEventListener) fe.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1); else {
      fe.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
      var i = !1;
      try {
        i = null == e.frameElement && fe.documentElement
      } catch (r) {
      }
      i && i.doScroll && !function n() {
        if (!ne.isReady) {
          try {
            i.doScroll("left")
          } catch (e) {
            return setTimeout(n, 50)
          }
          a(), ne.ready()
        }
      }()
    }
    return xe.promise(t)
  };
  var Re, be = "undefined";
  for (Re in ne(ie)) break;
  ie.ownLast = "0" !== Re, ie.inlineBlockNeedsLayout = !1, ne(function () {
    var e, t, i, r;
    i = fe.getElementsByTagName("body")[0], i && i.style && (t = fe.createElement("div"), r = fe.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(r).appendChild(t), typeof t.style.zoom !== be && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ie.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (i.style.zoom = 1)), i.removeChild(r))
  }), function () {
    var e = fe.createElement("div");
    if (null == ie.deleteExpando) {
      ie.deleteExpando = !0;
      try {
        delete e.test
      } catch (t) {
        ie.deleteExpando = !1
      }
    }
    e = null
  }(), ne.acceptData = function (e) {
    var t = ne.noData[(e.nodeName + " ").toLowerCase()], i = +e.nodeType || 1;
    return 1 !== i && 9 !== i ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
  };
  var He = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, we = /([A-Z])/g;
  ne.extend({
    cache: {},
    noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
    hasData: function (e) {
      return e = e.nodeType ? ne.cache[e[ne.expando]] : e[ne.expando], !!e && !h(e)
    },
    data: function (e, t, i) {
      return c(e, t, i)
    },
    removeData: function (e, t) {
      return u(e, t)
    },
    _data: function (e, t, i) {
      return c(e, t, i, !0)
    },
    _removeData: function (e, t) {
      return u(e, t, !0)
    }
  }), ne.fn.extend({
    data: function (e, t) {
      var i, r, n, o = this[0], a = o && o.attributes;
      if (void 0 === e) {
        if (this.length && (n = ne.data(o), 1 === o.nodeType && !ne._data(o, "parsedAttrs"))) {
          for (i = a.length; i--;) a[i] && (r = a[i].name, 0 === r.indexOf("data-") && (r = ne.camelCase(r.slice(5)), l(o, r, n[r])));
          ne._data(o, "parsedAttrs", !0)
        }
        return n
      }
      return "object" == typeof e ? this.each(function () {
        ne.data(this, e)
      }) : arguments.length > 1 ? this.each(function () {
        ne.data(this, e, t)
      }) : o ? l(o, e, ne.data(o, e)) : void 0
    }, removeData: function (e) {
      return this.each(function () {
        ne.removeData(this, e)
      })
    }
  }), ne.extend({
    queue: function (e, t, i) {
      var r;
      return e ? (t = (t || "fx") + "queue", r = ne._data(e, t), i && (!r || ne.isArray(i) ? r = ne._data(e, t, ne.makeArray(i)) : r.push(i)), r || []) : void 0
    }, dequeue: function (e, t) {
      t = t || "fx";
      var i = ne.queue(e, t), r = i.length, n = i.shift(), o = ne._queueHooks(e, t), a = function () {
        ne.dequeue(e, t)
      };
      "inprogress" === n && (n = i.shift(), r--), n && ("fx" === t && i.unshift("inprogress"), delete o.stop, n.call(e, a, o)), !r && o && o.empty.fire()
    }, _queueHooks: function (e, t) {
      var i = t + "queueHooks";
      return ne._data(e, i) || ne._data(e, i, {
        empty: ne.Callbacks("once memory").add(function () {
          ne._removeData(e, t + "queue"), ne._removeData(e, i)
        })
      })
    }
  }), ne.fn.extend({
    queue: function (e, t) {
      var i = 2;
      return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? ne.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var i = ne.queue(this, e, t);
        ne._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && ne.dequeue(this, e)
      })
    }, dequeue: function (e) {
      return this.each(function () {
        ne.dequeue(this, e)
      })
    }, clearQueue: function (e) {
      return this.queue(e || "fx", [])
    }, promise: function (e, t) {
      var i, r = 1, n = ne.Deferred(), o = this, a = this.length, s = function () {
        --r || n.resolveWith(o, [o])
      };
      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) i = ne._data(o[a], e + "queueHooks"), i && i.empty && (r++, i.empty.add(s));
      return s(), n.promise(t)
    }
  });
  var _e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Se = ["Top", "Right", "Bottom", "Left"], Me = function (e, t) {
    return e = t || e, "none" === ne.css(e, "display") || !ne.contains(e.ownerDocument, e)
  }, Ce = ne.access = function (e, t, i, r, n, o, a) {
    var s = 0, l = e.length, h = null == i;
    if ("object" === ne.type(i)) {
      n = !0;
      for (s in i) ne.access(e, t, s, i[s], !0, o, a)
    } else if (void 0 !== r && (n = !0, ne.isFunction(r) || (a = !0), h && (a ? (t.call(e, r), t = null) : (h = t, t = function (e, t, i) {
        return h.call(ne(e), i)
      })), t)) for (; l > s; s++) t(e[s], i, a ? r : r.call(e[s], s, t(e[s], i)));
    return n ? e : h ? t.call(e) : l ? t(e[0], i) : o
  }, Ae = /^(?:checkbox|radio)$/i;
  !function () {
    var e = fe.createElement("input"), t = fe.createElement("div"), i = fe.createDocumentFragment();
    if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ie.leadingWhitespace = 3 === t.firstChild.nodeType, ie.tbody = !t.getElementsByTagName("tbody").length, ie.htmlSerialize = !!t.getElementsByTagName("link").length, ie.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, i.appendChild(e), ie.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, i.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ie.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
        ie.noCloneEvent = !1
      }), t.cloneNode(!0).click()), null == ie.deleteExpando) {
      ie.deleteExpando = !0;
      try {
        delete t.test
      } catch (r) {
        ie.deleteExpando = !1
      }
    }
  }(), function () {
    var t, i, r = fe.createElement("div");
    for (t in{
      submit: !0,
      change: !0,
      focusin: !0
    }) i = "on" + t, (ie[t + "Bubbles"] = i in e) || (r.setAttribute(i, "t"), ie[t + "Bubbles"] = r.attributes[i].expando === !1);
    r = null
  }();
  var Le = /^(?:input|select|textarea)$/i, De = /^key/, Pe = /^(?:mouse|pointer|contextmenu)|click/,
    Fe = /^(?:focusinfocus|focusoutblur)$/, ke = /^([^.]*)(?:\.(.+)|)$/;
  ne.event = {
    global: {},
    add: function (e, t, i, r, n) {
      var o, a, s, l, h, c, u, p, d, f, m, E = ne._data(e);
      if (E) {
        for (i.handler && (l = i, i = l.handler, n = l.selector), i.guid || (i.guid = ne.guid++), (a = E.events) || (a = E.events = {}), (c = E.handle) || (c = E.handle = function (e) {
          return typeof ne === be || e && ne.event.triggered === e.type ? void 0 : ne.event.dispatch.apply(c.elem, arguments)
        }, c.elem = e), t = (t || "").match(ye) || [""], s = t.length; s--;) o = ke.exec(t[s]) || [], d = m = o[1], f = (o[2] || "").split(".").sort(), d && (h = ne.event.special[d] || {}, d = (n ? h.delegateType : h.bindType) || d, h = ne.event.special[d] || {}, u = ne.extend({
          type: d,
          origType: m,
          data: r,
          handler: i,
          guid: i.guid,
          selector: n,
          needsContext: n && ne.expr.match.needsContext.test(n),
          namespace: f.join(".")
        }, l), (p = a[d]) || (p = a[d] = [], p.delegateCount = 0, h.setup && h.setup.call(e, r, f, c) !== !1 || (e.addEventListener ? e.addEventListener(d, c, !1) : e.attachEvent && e.attachEvent("on" + d, c))), h.add && (h.add.call(e, u), u.handler.guid || (u.handler.guid = i.guid)), n ? p.splice(p.delegateCount++, 0, u) : p.push(u), ne.event.global[d] = !0);
        e = null
      }
    },
    remove: function (e, t, i, r, n) {
      var o, a, s, l, h, c, u, p, d, f, m, E = ne.hasData(e) && ne._data(e);
      if (E && (c = E.events)) {
        for (t = (t || "").match(ye) || [""], h = t.length; h--;) if (s = ke.exec(t[h]) || [], d = m = s[1], f = (s[2] || "").split(".").sort(), d) {
          for (u = ne.event.special[d] || {}, d = (r ? u.delegateType : u.bindType) || d, p = c[d] || [], s = s[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = p.length; o--;) a = p[o], !n && m !== a.origType || i && i.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, u.remove && u.remove.call(e, a));
          l && !p.length && (u.teardown && u.teardown.call(e, f, E.handle) !== !1 || ne.removeEvent(e, d, E.handle), delete c[d])
        } else for (d in c) ne.event.remove(e, d + t[h], i, r, !0);
        ne.isEmptyObject(c) && (delete E.handle, ne._removeData(e, "events"))
      }
    },
    trigger: function (t, i, r, n) {
      var o, a, s, l, h, c, u, p = [r || fe], d = te.call(t, "type") ? t.type : t,
        f = te.call(t, "namespace") ? t.namespace.split(".") : [];
      if (s = c = r = r || fe, 3 !== r.nodeType && 8 !== r.nodeType && !Fe.test(d + ne.event.triggered) && (d.indexOf(".") >= 0 && (f = d.split("."), d = f.shift(), f.sort()), a = d.indexOf(":") < 0 && "on" + d, t = t[ne.expando] ? t : new ne.Event(d, "object" == typeof t && t), t.isTrigger = n ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), i = null == i ? [t] : ne.makeArray(i, [t]), h = ne.event.special[d] || {}, n || !h.trigger || h.trigger.apply(r, i) !== !1)) {
        if (!n && !h.noBubble && !ne.isWindow(r)) {
          for (l = h.delegateType || d, Fe.test(l + d) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
          c === (r.ownerDocument || fe) && p.push(c.defaultView || c.parentWindow || e)
        }
        for (u = 0; (s = p[u++]) && !t.isPropagationStopped();) t.type = u > 1 ? l : h.bindType || d, o = (ne._data(s, "events") || {})[t.type] && ne._data(s, "handle"), o && o.apply(s, i), o = a && s[a], o && o.apply && ne.acceptData(s) && (t.result = o.apply(s, i), t.result === !1 && t.preventDefault());
        if (t.type = d, !n && !t.isDefaultPrevented() && (!h._default || h._default.apply(p.pop(), i) === !1) && ne.acceptData(r) && a && r[d] && !ne.isWindow(r)) {
          c = r[a], c && (r[a] = null), ne.event.triggered = d;
          try {
            r[d]()
          } catch (m) {
          }
          ne.event.triggered = void 0, c && (r[a] = c)
        }
        return t.result
      }
    },
    dispatch: function (e) {
      e = ne.event.fix(e);
      var t, i, r, n, o, a = [], s = K.call(arguments), l = (ne._data(this, "events") || {})[e.type] || [],
        h = ne.event.special[e.type] || {};
      if (s[0] = e, e.delegateTarget = this, !h.preDispatch || h.preDispatch.call(this, e) !== !1) {
        for (a = ne.event.handlers.call(this, e, l), t = 0; (n = a[t++]) && !e.isPropagationStopped();) for (e.currentTarget = n.elem, o = 0; (r = n.handlers[o++]) && !e.isImmediatePropagationStopped();) (!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, i = ((ne.event.special[r.origType] || {}).handle || r.handler).apply(n.elem, s), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
        return h.postDispatch && h.postDispatch.call(this, e), e.result
      }
    },
    handlers: function (e, t) {
      var i, r, n, o, a = [], s = t.delegateCount, l = e.target;
      if (s && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
        for (n = [], o = 0; s > o; o++) r = t[o], i = r.selector + " ", void 0 === n[i] && (n[i] = r.needsContext ? ne(i, this).index(l) >= 0 : ne.find(i, this, null, [l]).length), n[i] && n.push(r);
        n.length && a.push({elem: l, handlers: n})
      }
      return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
    },
    fix: function (e) {
      if (e[ne.expando]) return e;
      var t, i, r, n = e.type, o = e, a = this.fixHooks[n];
      for (a || (this.fixHooks[n] = a = Pe.test(n) ? this.mouseHooks : De.test(n) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ne.Event(o), t = r.length; t--;) i = r[t], e[i] = o[i];
      return e.target || (e.target = o.srcElement || fe), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (e, t) {
        var i, r, n, o = t.button, a = t.fromElement;
        return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || fe, n = r.documentElement, i = r.body, e.pageX = t.clientX + (n && n.scrollLeft || i && i.scrollLeft || 0) - (n && n.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (n && n.scrollTop || i && i.scrollTop || 0) - (n && n.clientTop || i && i.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
      }
    },
    special: {
      load: {noBubble: !0}, focus: {
        trigger: function () {
          if (this !== f() && this.focus) try {
            return this.focus(), !1
          } catch (e) {
          }
        }, delegateType: "focusin"
      }, blur: {
        trigger: function () {
          return this === f() && this.blur ? (this.blur(), !1) : void 0
        }, delegateType: "focusout"
      }, click: {
        trigger: function () {
          return ne.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        }, _default: function (e) {
          return ne.nodeName(e.target, "a")
        }
      }, beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function (e, t, i, r) {
      var n = ne.extend(new ne.Event, i, {type: e, isSimulated: !0, originalEvent: {}});
      r ? ne.event.trigger(n, null, t) : ne.event.dispatch.call(t, n), n.isDefaultPrevented() && i.preventDefault()
    }
  }, ne.removeEvent = fe.removeEventListener ? function (e, t, i) {
    e.removeEventListener && e.removeEventListener(t, i, !1)
  } : function (e, t, i) {
    var r = "on" + t;
    e.detachEvent && (typeof e[r] === be && (e[r] = null), e.detachEvent(r, i))
  }, ne.Event = function (e, t) {
    return this instanceof ne.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p : d) : this.type = e, t && ne.extend(this, t), this.timeStamp = e && e.timeStamp || ne.now(), void(this[ne.expando] = !0)) : new ne.Event(e, t)
  }, ne.Event.prototype = {
    isDefaultPrevented: d,
    isPropagationStopped: d,
    isImmediatePropagationStopped: d,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = p, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = p, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, ne.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, t) {
    ne.event.special[e] = {
      delegateType: t, bindType: t, handle: function (e) {
        var i, r = this, n = e.relatedTarget, o = e.handleObj;
        return (!n || n !== r && !ne.contains(r, n)) && (e.type = o.origType, i = o.handler.apply(this, arguments), e.type = t), i
      }
    }
  }), ie.submitBubbles || (ne.event.special.submit = {
    setup: function () {
      return ne.nodeName(this, "form") ? !1 : void ne.event.add(this, "click._submit keypress._submit", function (e) {
        var t = e.target, i = ne.nodeName(t, "input") || ne.nodeName(t, "button") ? t.form : void 0;
        i && !ne._data(i, "submitBubbles") && (ne.event.add(i, "submit._submit", function (e) {
          e._submit_bubble = !0
        }), ne._data(i, "submitBubbles", !0))
      })
    }, postDispatch: function (e) {
      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ne.event.simulate("submit", this.parentNode, e, !0))
    }, teardown: function () {
      return ne.nodeName(this, "form") ? !1 : void ne.event.remove(this, "._submit")
    }
  }), ie.changeBubbles || (ne.event.special.change = {
    setup: function () {
      return Le.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ne.event.add(this, "propertychange._change", function (e) {
        "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
      }), ne.event.add(this, "click._change", function (e) {
        this._just_changed && !e.isTrigger && (this._just_changed = !1), ne.event.simulate("change", this, e, !0)
      })), !1) : void ne.event.add(this, "beforeactivate._change", function (e) {
        var t = e.target;
        Le.test(t.nodeName) && !ne._data(t, "changeBubbles") && (ne.event.add(t, "change._change", function (e) {
          !this.parentNode || e.isSimulated || e.isTrigger || ne.event.simulate("change", this.parentNode, e, !0)
        }), ne._data(t, "changeBubbles", !0))
      })
    }, handle: function (e) {
      var t = e.target;
      return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
    }, teardown: function () {
      return ne.event.remove(this, "._change"), !Le.test(this.nodeName)
    }
  }), ie.focusinBubbles || ne.each({focus: "focusin", blur: "focusout"}, function (e, t) {
    var i = function (e) {
      ne.event.simulate(t, e.target, ne.event.fix(e), !0)
    };
    ne.event.special[t] = {
      setup: function () {
        var r = this.ownerDocument || this, n = ne._data(r, t);
        n || r.addEventListener(e, i, !0), ne._data(r, t, (n || 0) + 1)
      }, teardown: function () {
        var r = this.ownerDocument || this, n = ne._data(r, t) - 1;
        n ? ne._data(r, t, n) : (r.removeEventListener(e, i, !0), ne._removeData(r, t))
      }
    }
  }), ne.fn.extend({
    on: function (e, t, i, r, n) {
      var o, a;
      if ("object" == typeof e) {
        "string" != typeof t && (i = i || t, t = void 0);
        for (o in e) this.on(o, t, i, e[o], n);
        return this
      }
      if (null == i && null == r ? (r = t, i = t = void 0) : null == r && ("string" == typeof t ? (r = i, i = void 0) : (r = i, i = t, t = void 0)), r === !1) r = d; else if (!r) return this;
      return 1 === n && (a = r, r = function (e) {
        return ne().off(e), a.apply(this, arguments)
      }, r.guid = a.guid || (a.guid = ne.guid++)), this.each(function () {
        ne.event.add(this, e, r, i, t)
      })
    }, one: function (e, t, i, r) {
      return this.on(e, t, i, r, 1)
    }, off: function (e, t, i) {
      var r, n;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ne(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if ("object" == typeof e) {
        for (n in e) this.off(n, t, e[n]);
        return this
      }
      return (t === !1 || "function" == typeof t) && (i = t, t = void 0), i === !1 && (i = d), this.each(function () {
        ne.event.remove(this, e, i, t)
      })
    }, trigger: function (e, t) {
      return this.each(function () {
        ne.event.trigger(e, t, this)
      })
    }, triggerHandler: function (e, t) {
      var i = this[0];
      return i ? ne.event.trigger(e, t, i, !0) : void 0
    }
  });
  var Ne = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Ue = / jQuery\d+="(?:null|\d+)"/g, ze = new RegExp("<(?:" + Ne + ")[\\s/>]", "i"), Oe = /^\s+/,
    Be = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Ve = /<([\w:]+)/, Ie = /<tbody/i,
    je = /<|&#?\w+;/, We = /<(?:script|style|link)/i, Ge = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Xe = /^$|\/(?:java|ecma)script/i, qe = /^true\/(.*)/, Ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ke = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: ie.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, $e = m(fe), Qe = $e.appendChild(fe.createElement("div"));
  Ke.optgroup = Ke.option, Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead, Ke.th = Ke.td, ne.extend({
    clone: function (e, t, i) {
      var r, n, o, a, s, l = ne.contains(e.ownerDocument, e);
      if (ie.html5Clone || ne.isXMLDoc(e) || !ze.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Qe.innerHTML = e.outerHTML, Qe.removeChild(o = Qe.firstChild)), !(ie.noCloneEvent && ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ne.isXMLDoc(e))) for (r = E(o), s = E(e), a = 0; null != (n = s[a]); ++a) r[a] && b(n, r[a]);
      if (t) if (i) for (s = s || E(e), r = r || E(o), a = 0; null != (n = s[a]); a++) R(n, r[a]); else R(e, o);
      return r = E(o, "script"), r.length > 0 && x(r, !l && E(e, "script")), r = s = n = null, o
    }, buildFragment: function (e, t, i, r) {
      for (var n, o, a, s, l, h, c, u = e.length, p = m(t), d = [], f = 0; u > f; f++) if (o = e[f], o || 0 === o) if ("object" === ne.type(o)) ne.merge(d, o.nodeType ? [o] : o); else if (je.test(o)) {
        for (s = s || p.appendChild(t.createElement("div")), l = (Ve.exec(o) || ["", ""])[1].toLowerCase(), c = Ke[l] || Ke._default, s.innerHTML = c[1] + o.replace(Be, "<$1></$2>") + c[2], n = c[0]; n--;) s = s.lastChild;
        if (!ie.leadingWhitespace && Oe.test(o) && d.push(t.createTextNode(Oe.exec(o)[0])), !ie.tbody) for (o = "table" !== l || Ie.test(o) ? "<table>" !== c[1] || Ie.test(o) ? 0 : s : s.firstChild, n = o && o.childNodes.length; n--;) ne.nodeName(h = o.childNodes[n], "tbody") && !h.childNodes.length && o.removeChild(h);
        for (ne.merge(d, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
        s = p.lastChild
      } else d.push(t.createTextNode(o));
      for (s && p.removeChild(s), ie.appendChecked || ne.grep(E(d, "input"), g), f = 0; o = d[f++];) if ((!r || -1 === ne.inArray(o, r)) && (a = ne.contains(o.ownerDocument, o), s = E(p.appendChild(o), "script"), a && x(s), i)) for (n = 0; o = s[n++];) Xe.test(o.type || "") && i.push(o);
      return s = null, p
    }, cleanData: function (e, t) {
      for (var i, r, n, o, a = 0, s = ne.expando, l = ne.cache, h = ie.deleteExpando, c = ne.event.special; null != (i = e[a]); a++) if ((t || ne.acceptData(i)) && (n = i[s], o = n && l[n])) {
        if (o.events) for (r in o.events) c[r] ? ne.event.remove(i, r) : ne.removeEvent(i, r, o.handle);
        l[n] && (delete l[n], h ? delete i[s] : typeof i.removeAttribute !== be ? i.removeAttribute(s) : i[s] = null, Y.push(n))
      }
    }
  }), ne.fn.extend({
    text: function (e) {
      return Ce(this, function (e) {
        return void 0 === e ? ne.text(this) : this.empty().append((this[0] && this[0].ownerDocument || fe).createTextNode(e))
      }, null, e, arguments.length)
    }, append: function () {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = v(this, e);
          t.appendChild(e)
        }
      })
    }, prepend: function () {
      return this.domManip(arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = v(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    }, before: function () {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    }, after: function () {
      return this.domManip(arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    }, remove: function (e, t) {
      for (var i, r = e ? ne.filter(e, this) : this, n = 0; null != (i = r[n]); n++) t || 1 !== i.nodeType || ne.cleanData(E(i)), i.parentNode && (t && ne.contains(i.ownerDocument, i) && x(E(i, "script")), i.parentNode.removeChild(i));
      return this
    }, empty: function () {
      for (var e, t = 0; null != (e = this[t]); t++) {
        for (1 === e.nodeType && ne.cleanData(E(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
        e.options && ne.nodeName(e, "select") && (e.options.length = 0)
      }
      return this
    }, clone: function (e, t) {
      return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
        return ne.clone(this, e, t)
      })
    }, html: function (e) {
      return Ce(this, function (e) {
        var t = this[0] || {}, i = 0, r = this.length;
        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ue, "") : void 0;
        if (!("string" != typeof e || We.test(e) || !ie.htmlSerialize && ze.test(e) || !ie.leadingWhitespace && Oe.test(e) || Ke[(Ve.exec(e) || ["", ""])[1].toLowerCase()])) {
          e = e.replace(Be, "<$1></$2>");
          try {
            for (; r > i; i++) t = this[i] || {}, 1 === t.nodeType && (ne.cleanData(E(t, !1)), t.innerHTML = e);
            t = 0
          } catch (n) {
          }
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    }, replaceWith: function () {
      var e = arguments[0];
      return this.domManip(arguments, function (t) {
        e = this.parentNode, ne.cleanData(E(this)), e && e.replaceChild(t, this)
      }), e && (e.length || e.nodeType) ? this : this.remove()
    }, detach: function (e) {
      return this.remove(e, !0)
    }, domManip: function (e, t) {
      e = $.apply([], e);
      var i, r, n, o, a, s, l = 0, h = this.length, c = this, u = h - 1, p = e[0], d = ne.isFunction(p);
      if (d || h > 1 && "string" == typeof p && !ie.checkClone && Ge.test(p)) return this.each(function (i) {
        var r = c.eq(i);
        d && (e[0] = p.call(this, i, r.html())), r.domManip(e, t)
      });
      if (h && (s = ne.buildFragment(e, this[0].ownerDocument, !1, this), i = s.firstChild, 1 === s.childNodes.length && (s = i), i)) {
        for (o = ne.map(E(s, "script"), y), n = o.length; h > l; l++) r = s, l !== u && (r = ne.clone(r, !0, !0), n && ne.merge(o, E(r, "script"))), t.call(this[l], r, l);
        if (n) for (a = o[o.length - 1].ownerDocument, ne.map(o, T), l = 0; n > l; l++) r = o[l], Xe.test(r.type || "") && !ne._data(r, "globalEval") && ne.contains(a, r) && (r.src ? ne._evalUrl && ne._evalUrl(r.src) : ne.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Ye, "")));
        s = i = null
      }
      return this
    }
  }), ne.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, t) {
    ne.fn[e] = function (e) {
      for (var i, r = 0, n = [], o = ne(e), a = o.length - 1; a >= r; r++) i = r === a ? this : this.clone(!0), ne(o[r])[t](i), Q.apply(n, i.get());
      return this.pushStack(n)
    }
  });
  var Ze, Je = {};
  !function () {
    var e;
    ie.shrinkWrapBlocks = function () {
      if (null != e) return e;
      e = !1;
      var t, i, r;
      return i = fe.getElementsByTagName("body")[0], i && i.style ? (t = fe.createElement("div"), r = fe.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(r).appendChild(t), typeof t.style.zoom !== be && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(fe.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), i.removeChild(r), e) : void 0
    }
  }();
  var et, tt, it = /^margin/, rt = new RegExp("^(" + _e + ")(?!px)[a-z%]+$", "i"), nt = /^(top|right|bottom|left)$/;
  e.getComputedStyle ? (et = function (e) {
    return e.ownerDocument.defaultView.getComputedStyle(e, null)
  }, tt = function (e, t, i) {
    var r, n, o, a, s = e.style;
    return i = i || et(e), a = i ? i.getPropertyValue(t) || i[t] : void 0, i && ("" !== a || ne.contains(e.ownerDocument, e) || (a = ne.style(e, t)), rt.test(a) && it.test(t) && (r = s.width, n = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = i.width, s.width = r, s.minWidth = n, s.maxWidth = o)), void 0 === a ? a : a + ""
  }) : fe.documentElement.currentStyle && (et = function (e) {
    return e.currentStyle
  }, tt = function (e, t, i) {
    var r, n, o, a, s = e.style;
    return i = i || et(e), a = i ? i[t] : void 0, null == a && s && s[t] && (a = s[t]), rt.test(a) && !nt.test(t) && (r = s.left, n = e.runtimeStyle, o = n && n.left, o && (n.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (n.left = o)), void 0 === a ? a : a + "" || "auto"
  }), !function () {
    function t() {
      var t, i, r, n;
      i = fe.getElementsByTagName("body")[0], i && i.style && (t = fe.createElement("div"), r = fe.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, l = !0, e.getComputedStyle && (o = "1%" !== (e.getComputedStyle(t, null) || {}).top, a = "4px" === (e.getComputedStyle(t, null) || {width: "4px"}).width, n = t.appendChild(fe.createElement("div")), n.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(n, null) || {}).marginRight)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", n = t.getElementsByTagName("td"), n[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === n[0].offsetHeight, s && (n[0].style.display = "", n[1].style.display = "none", s = 0 === n[0].offsetHeight), i.removeChild(r))
    }

    var i, r, n, o, a, s, l;
    i = fe.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = i.getElementsByTagName("a")[0], (r = n && n.style) && (r.cssText = "float:left;opacity:.5", ie.opacity = "0.5" === r.opacity, ie.cssFloat = !!r.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === i.style.backgroundClip, ie.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing, ne.extend(ie, {
      reliableHiddenOffsets: function () {
        return null == s && t(), s
      }, boxSizingReliable: function () {
        return null == a && t(), a
      }, pixelPosition: function () {
        return null == o && t(), o
      }, reliableMarginRight: function () {
        return null == l && t(), l
      }
    }))
  }(), ne.swap = function (e, t, i, r) {
    var n, o, a = {};
    for (o in t) a[o] = e.style[o], e.style[o] = t[o];
    n = i.apply(e, r || []);
    for (o in t) e.style[o] = a[o];
    return n
  };
  var ot = /alpha\([^)]*\)/i, at = /opacity\s*=\s*([^)]*)/, st = /^(none|table(?!-c[ea]).+)/,
    lt = new RegExp("^(" + _e + ")(.*)$", "i"), ht = new RegExp("^([+-])=(" + _e + ")", "i"),
    ct = {position: "absolute", visibility: "hidden", display: "block"}, ut = {letterSpacing: "0", fontWeight: "400"},
    pt = ["Webkit", "O", "Moz", "ms"];
  ne.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var i = tt(e, "opacity");
            return "" === i ? "1" : i
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {"float": ie.cssFloat ? "cssFloat" : "styleFloat"},
    style: function (e, t, i, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var n, o, a, s = ne.camelCase(t), l = e.style;
        if (t = ne.cssProps[s] || (ne.cssProps[s] = S(l, s)), a = ne.cssHooks[t] || ne.cssHooks[s], void 0 === i) return a && "get" in a && void 0 !== (n = a.get(e, !1, r)) ? n : l[t];
        if (o = typeof i, "string" === o && (n = ht.exec(i)) && (i = (n[1] + 1) * n[2] + parseFloat(ne.css(e, t)), o = "number"), null != i && i === i && ("number" !== o || ne.cssNumber[s] || (i += "px"), ie.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set" in a && void 0 === (i = a.set(e, i, r))))) try {
          l[t] = i
        } catch (h) {
        }
      }
    },
    css: function (e, t, i, r) {
      var n, o, a, s = ne.camelCase(t);
      return t = ne.cssProps[s] || (ne.cssProps[s] = S(e.style, s)), a = ne.cssHooks[t] || ne.cssHooks[s], a && "get" in a && (o = a.get(e, !0, i)), void 0 === o && (o = tt(e, t, r)), "normal" === o && t in ut && (o = ut[t]), "" === i || i ? (n = parseFloat(o), i === !0 || ne.isNumeric(n) ? n || 0 : o) : o
    }
  }), ne.each(["height", "width"], function (e, t) {
    ne.cssHooks[t] = {
      get: function (e, i, r) {
        return i ? st.test(ne.css(e, "display")) && 0 === e.offsetWidth ? ne.swap(e, ct, function () {
          return L(e, t, r)
        }) : L(e, t, r) : void 0
      }, set: function (e, i, r) {
        var n = r && et(e);
        return C(e, i, r ? A(e, t, r, ie.boxSizing && "border-box" === ne.css(e, "boxSizing", !1, n), n) : 0)
      }
    }
  }), ie.opacity || (ne.cssHooks.opacity = {
    get: function (e, t) {
      return at.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    }, set: function (e, t) {
      var i = e.style, r = e.currentStyle, n = ne.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
        o = r && r.filter || i.filter || "";
      i.zoom = 1, (t >= 1 || "" === t) && "" === ne.trim(o.replace(ot, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === t || r && !r.filter) || (i.filter = ot.test(o) ? o.replace(ot, n) : o + " " + n)
    }
  }), ne.cssHooks.marginRight = _(ie.reliableMarginRight, function (e, t) {
    return t ? ne.swap(e, {display: "inline-block"}, tt, [e, "marginRight"]) : void 0
  }), ne.each({margin: "", padding: "", border: "Width"}, function (e, t) {
    ne.cssHooks[e + t] = {
      expand: function (i) {
        for (var r = 0, n = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > r; r++) n[e + Se[r] + t] = o[r] || o[r - 2] || o[0];
        return n
      }
    }, it.test(e) || (ne.cssHooks[e + t].set = C)
  }), ne.fn.extend({
    css: function (e, t) {
      return Ce(this, function (e, t, i) {
        var r, n, o = {}, a = 0;
        if (ne.isArray(t)) {
          for (r = et(e), n = t.length; n > a; a++) o[t[a]] = ne.css(e, t[a], !1, r);
          return o
        }
        return void 0 !== i ? ne.style(e, t, i) : ne.css(e, t)
      }, e, t, arguments.length > 1)
    }, show: function () {
      return M(this, !0)
    }, hide: function () {
      return M(this)
    }, toggle: function (e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        Me(this) ? ne(this).show() : ne(this).hide()
      })
    }
  }), ne.Tween = D, D.prototype = {
    constructor: D, init: function (e, t, i, r, n, o) {
      this.elem = e, this.prop = i, this.easing = n || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ne.cssNumber[i] ? "" : "px")
    }, cur: function () {
      var e = D.propHooks[this.prop];
      return e && e.get ? e.get(this) : D.propHooks._default.get(this)
    }, run: function (e) {
      var t, i = D.propHooks[this.prop];
      return this.pos = t = this.options.duration ? ne.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : D.propHooks._default.set(this), this
    }
  }, D.prototype.init.prototype = D.prototype, D.propHooks = {
    _default: {
      get: function (e) {
        var t;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ne.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
      }, set: function (e) {
        ne.fx.step[e.prop] ? ne.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ne.cssProps[e.prop]] || ne.cssHooks[e.prop]) ? ne.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, ne.easing = {
    linear: function (e) {
      return e
    }, swing: function (e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, ne.fx = D.prototype.init, ne.fx.step = {};
  var dt, ft, mt = /^(?:toggle|show|hide)$/, Et = new RegExp("^(?:([+-])=|)(" + _e + ")([a-z%]*)$", "i"),
    gt = /queueHooks$/, vt = [N], yt = {
      "*": [function (e, t) {
        var i = this.createTween(e, t), r = i.cur(), n = Et.exec(t), o = n && n[3] || (ne.cssNumber[e] ? "" : "px"),
          a = (ne.cssNumber[e] || "px" !== o && +r) && Et.exec(ne.css(i.elem, e)), s = 1, l = 20;
        if (a && a[3] !== o) {
          o = o || a[3], n = n || [], a = +r || 1;
          do s = s || ".5", a /= s, ne.style(i.elem, e, a + o); while (s !== (s = i.cur() / r) && 1 !== s && --l)
        }
        return n && (a = i.start = +a || +r || 0, i.unit = o, i.end = n[1] ? a + (n[1] + 1) * n[2] : +n[2]), i
      }]
    };
  ne.Animation = ne.extend(z, {
    tweener: function (e, t) {
      ne.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
      for (var i, r = 0, n = e.length; n > r; r++) i = e[r], yt[i] = yt[i] || [], yt[i].unshift(t)
    }, prefilter: function (e, t) {
      t ? vt.unshift(e) : vt.push(e)
    }
  }), ne.speed = function (e, t, i) {
    var r = e && "object" == typeof e ? ne.extend({}, e) : {
      complete: i || !i && t || ne.isFunction(e) && e,
      duration: e,
      easing: i && t || t && !ne.isFunction(t) && t
    };
    return r.duration = ne.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ne.fx.speeds ? ne.fx.speeds[r.duration] : ne.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      ne.isFunction(r.old) && r.old.call(this), r.queue && ne.dequeue(this, r.queue)
    }, r
  }, ne.fn.extend({
    fadeTo: function (e, t, i, r) {
      return this.filter(Me).css("opacity", 0).show().end().animate({opacity: t}, e, i, r)
    }, animate: function (e, t, i, r) {
      var n = ne.isEmptyObject(e), o = ne.speed(t, i, r), a = function () {
        var t = z(this, ne.extend({}, e), o);
        (n || ne._data(this, "finish")) && t.stop(!0)
      };
      return a.finish = a, n || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
    }, stop: function (e, t, i) {
      var r = function (e) {
        var t = e.stop;
        delete e.stop, t(i)
      };
      return "string" != typeof e && (i = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
        var t = !0, n = null != e && e + "queueHooks", o = ne.timers, a = ne._data(this);
        if (n) a[n] && a[n].stop && r(a[n]); else for (n in a) a[n] && a[n].stop && gt.test(n) && r(a[n]);
        for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(i), t = !1, o.splice(n, 1));
        (t || !i) && ne.dequeue(this, e)
      })
    }, finish: function (e) {
      return e !== !1 && (e = e || "fx"), this.each(function () {
        var t, i = ne._data(this), r = i[e + "queue"], n = i[e + "queueHooks"], o = ne.timers, a = r ? r.length : 0;
        for (i.finish = !0, ne.queue(this, e, []), n && n.stop && n.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
        delete i.finish
      })
    }
  }), ne.each(["toggle", "show", "hide"], function (e, t) {
    var i = ne.fn[t];
    ne.fn[t] = function (e, r, n) {
      return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(F(t, !0), e, r, n)
    }
  }), ne.each({
    slideDown: F("show"),
    slideUp: F("hide"),
    slideToggle: F("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function (e, t) {
    ne.fn[e] = function (e, i, r) {
      return this.animate(t, e, i, r)
    }
  }), ne.timers = [], ne.fx.tick = function () {
    var e, t = ne.timers, i = 0;
    for (dt = ne.now(); i < t.length; i++) e = t[i], e() || t[i] !== e || t.splice(i--, 1);
    t.length || ne.fx.stop(), dt = void 0
  }, ne.fx.timer = function (e) {
    ne.timers.push(e), e() ? ne.fx.start() : ne.timers.pop()
  }, ne.fx.interval = 13, ne.fx.start = function () {
    ft || (ft = setInterval(ne.fx.tick, ne.fx.interval))
  }, ne.fx.stop = function () {
    clearInterval(ft), ft = null
  }, ne.fx.speeds = {slow: 600, fast: 200, _default: 400}, ne.fn.delay = function (e, t) {
    return e = ne.fx ? ne.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, i) {
      var r = setTimeout(t, e);
      i.stop = function () {
        clearTimeout(r)
      }
    })
  }, function () {
    var e, t, i, r, n;
    t = fe.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], i = fe.createElement("select"), n = i.appendChild(fe.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", ie.getSetAttribute = "t" !== t.className, ie.style = /top/.test(r.getAttribute("style")), ie.hrefNormalized = "/a" === r.getAttribute("href"), ie.checkOn = !!e.value, ie.optSelected = n.selected, ie.enctype = !!fe.createElement("form").enctype, i.disabled = !0, ie.optDisabled = !n.disabled, e = fe.createElement("input"), e.setAttribute("value", ""), ie.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ie.radioValue = "t" === e.value
  }();
  var Tt = /\r/g;
  ne.fn.extend({
    val: function (e) {
      var t, i, r, n = this[0];
      return arguments.length ? (r = ne.isFunction(e), this.each(function (i) {
        var n;
        1 === this.nodeType && (n = r ? e.call(this, i, ne(this).val()) : e, null == n ? n = "" : "number" == typeof n ? n += "" : ne.isArray(n) && (n = ne.map(n, function (e) {
          return null == e ? "" : e + ""
        })), t = ne.valHooks[this.type] || ne.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, n, "value") || (this.value = n))
      })) : n ? (t = ne.valHooks[n.type] || ne.valHooks[n.nodeName.toLowerCase()], t && "get" in t && void 0 !== (i = t.get(n, "value")) ? i : (i = n.value, "string" == typeof i ? i.replace(Tt, "") : null == i ? "" : i)) : void 0
    }
  }), ne.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = ne.find.attr(e, "value");
          return null != t ? t : ne.trim(ne.text(e))
        }
      }, select: {
        get: function (e) {
          for (var t, i, r = e.options, n = e.selectedIndex, o = "select-one" === e.type || 0 > n, a = o ? null : [], s = o ? n + 1 : r.length, l = 0 > n ? s : o ? n : 0; s > l; l++) if (i = r[l], !(!i.selected && l !== n || (ie.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && ne.nodeName(i.parentNode, "optgroup"))) {
            if (t = ne(i).val(), o) return t;
            a.push(t)
          }
          return a
        }, set: function (e, t) {
          for (var i, r, n = e.options, o = ne.makeArray(t), a = n.length; a--;) if (r = n[a], ne.inArray(ne.valHooks.option.get(r), o) >= 0) try {
            r.selected = i = !0
          } catch (s) {
            r.scrollHeight
          } else r.selected = !1;
          return i || (e.selectedIndex = -1), n
        }
      }
    }
  }), ne.each(["radio", "checkbox"], function () {
    ne.valHooks[this] = {
      set: function (e, t) {
        return ne.isArray(t) ? e.checked = ne.inArray(ne(e).val(), t) >= 0 : void 0
      }
    }, ie.checkOn || (ne.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  });
  var xt, Rt, bt = ne.expr.attrHandle, Ht = /^(?:checked|selected)$/i, wt = ie.getSetAttribute, _t = ie.input;
  ne.fn.extend({
    attr: function (e, t) {
      return Ce(this, ne.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
      return this.each(function () {
        ne.removeAttr(this, e)
      })
    }
  }), ne.extend({
    attr: function (e, t, i) {
      var r, n, o = e.nodeType;
      return e && 3 !== o && 8 !== o && 2 !== o ? typeof e.getAttribute === be ? ne.prop(e, t, i) : (1 === o && ne.isXMLDoc(e) || (t = t.toLowerCase(), r = ne.attrHooks[t] || (ne.expr.match.bool.test(t) ? Rt : xt)), void 0 === i ? r && "get" in r && null !== (n = r.get(e, t)) ? n : (n = ne.find.attr(e, t), null == n ? void 0 : n) : null !== i ? r && "set" in r && void 0 !== (n = r.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : void ne.removeAttr(e, t)) : void 0
    }, removeAttr: function (e, t) {
      var i, r, n = 0, o = t && t.match(ye);
      if (o && 1 === e.nodeType) for (; i = o[n++];) r = ne.propFix[i] || i, ne.expr.match.bool.test(i) ? _t && wt || !Ht.test(i) ? e[r] = !1 : e[ne.camelCase("default-" + i)] = e[r] = !1 : ne.attr(e, i, ""), e.removeAttribute(wt ? i : r)
    }, attrHooks: {
      type: {
        set: function (e, t) {
          if (!ie.radioValue && "radio" === t && ne.nodeName(e, "input")) {
            var i = e.value;
            return e.setAttribute("type", t), i && (e.value = i), t
          }
        }
      }
    }
  }), Rt = {
    set: function (e, t, i) {
      return t === !1 ? ne.removeAttr(e, i) : _t && wt || !Ht.test(i) ? e.setAttribute(!wt && ne.propFix[i] || i, i) : e[ne.camelCase("default-" + i)] = e[i] = !0, i
    }
  }, ne.each(ne.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var i = bt[t] || ne.find.attr;
    bt[t] = _t && wt || !Ht.test(t) ? function (e, t, r) {
      var n, o;
      return r || (o = bt[t], bt[t] = n, n = null != i(e, t, r) ? t.toLowerCase() : null, bt[t] = o), n
    } : function (e, t, i) {
      return i ? void 0 : e[ne.camelCase("default-" + t)] ? t.toLowerCase() : null
    }
  }), _t && wt || (ne.attrHooks.value = {
    set: function (e, t, i) {
      return ne.nodeName(e, "input") ? void(e.defaultValue = t) : xt && xt.set(e, t, i)
    }
  }), wt || (xt = {
    set: function (e, t, i) {
      var r = e.getAttributeNode(i);
      return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(i)), r.value = t += "", "value" === i || t === e.getAttribute(i) ? t : void 0
    }
  }, bt.id = bt.name = bt.coords = function (e, t, i) {
    var r;
    return i ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
  }, ne.valHooks.button = {
    get: function (e, t) {
      var i = e.getAttributeNode(t);
      return i && i.specified ? i.value : void 0
    }, set: xt.set
  }, ne.attrHooks.contenteditable = {
    set: function (e, t, i) {
      xt.set(e, "" === t ? !1 : t, i)
    }
  }, ne.each(["width", "height"], function (e, t) {
    ne.attrHooks[t] = {
      set: function (e, i) {
        return "" === i ? (e.setAttribute(t, "auto"), i) : void 0
      }
    }
  })), ie.style || (ne.attrHooks.style = {
    get: function (e) {
      return e.style.cssText || void 0
    }, set: function (e, t) {
      return e.style.cssText = t + ""
    }
  });
  var St = /^(?:input|select|textarea|button|object)$/i, Mt = /^(?:a|area)$/i;
  ne.fn.extend({
    prop: function (e, t) {
      return Ce(this, ne.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
      return e = ne.propFix[e] || e, this.each(function () {
        try {
          this[e] = void 0, delete this[e]
        } catch (t) {
        }
      })
    }
  }), ne.extend({
    propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, i) {
      var r, n, o, a = e.nodeType;
      return e && 3 !== a && 8 !== a && 2 !== a ? (o = 1 !== a || !ne.isXMLDoc(e), o && (t = ne.propFix[t] || t, n = ne.propHooks[t]), void 0 !== i ? n && "set" in n && void 0 !== (r = n.set(e, i, t)) ? r : e[t] = i : n && "get" in n && null !== (r = n.get(e, t)) ? r : e[t]) : void 0
    }, propHooks: {
      tabIndex: {
        get: function (e) {
          var t = ne.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : St.test(e.nodeName) || Mt.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    }
  }), ie.hrefNormalized || ne.each(["href", "src"], function (e, t) {
    ne.propHooks[t] = {
      get: function (e) {
        return e.getAttribute(t, 4)
      }
    }
  }), ie.optSelected || (ne.propHooks.selected = {
    get: function (e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }
  }), ne.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    ne.propFix[this.toLowerCase()] = this
  }), ie.enctype || (ne.propFix.enctype = "encoding");
  var Ct = /[\t\r\n\f]/g;
  ne.fn.extend({
    addClass: function (e) {
      var t, i, r, n, o, a, s = 0, l = this.length, h = "string" == typeof e && e;
      if (ne.isFunction(e)) return this.each(function (t) {
        ne(this).addClass(e.call(this, t, this.className))
      });
      if (h) for (t = (e || "").match(ye) || []; l > s; s++) if (i = this[s], r = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ct, " ") : " ")) {
        for (o = 0; n = t[o++];) r.indexOf(" " + n + " ") < 0 && (r += n + " ");
        a = ne.trim(r), i.className !== a && (i.className = a)
      }
      return this
    }, removeClass: function (e) {
      var t, i, r, n, o, a, s = 0, l = this.length, h = 0 === arguments.length || "string" == typeof e && e;
      if (ne.isFunction(e)) return this.each(function (t) {
        ne(this).removeClass(e.call(this, t, this.className))
      });
      if (h) for (t = (e || "").match(ye) || []; l > s; s++) if (i = this[s], r = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Ct, " ") : "")) {
        for (o = 0; n = t[o++];) for (; r.indexOf(" " + n + " ") >= 0;) r = r.replace(" " + n + " ", " ");
        a = e ? ne.trim(r) : "", i.className !== a && (i.className = a)
      }
      return this
    }, toggleClass: function (e, t) {
      var i = typeof e;
      return "boolean" == typeof t && "string" === i ? t ? this.addClass(e) : this.removeClass(e) : this.each(ne.isFunction(e) ? function (i) {
        ne(this).toggleClass(e.call(this, i, this.className, t), t)
      } : function () {
        if ("string" === i) for (var t, r = 0, n = ne(this), o = e.match(ye) || []; t = o[r++];) n.hasClass(t) ? n.removeClass(t) : n.addClass(t); else (i === be || "boolean" === i) && (this.className && ne._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ne._data(this, "__className__") || "")
      })
    }, hasClass: function (e) {
      for (var t = " " + e + " ", i = 0, r = this.length; r > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Ct, " ").indexOf(t) >= 0) return !0;
      return !1
    }
  }), ne.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
    ne.fn[t] = function (e, i) {
      return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
    }
  }), ne.fn.extend({
    hover: function (e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, i) {
      return this.on(e, null, t, i)
    }, unbind: function (e, t) {
      return this.off(e, null, t)
    }, delegate: function (e, t, i, r) {
      return this.on(t, e, i, r)
    }, undelegate: function (e, t, i) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
    }
  });
  var At = ne.now(), Lt = /\?/,
    Dt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  ne.parseJSON = function (t) {
    if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
    var i, r = null, n = ne.trim(t + "");
    return n && !ne.trim(n.replace(Dt, function (e, t, n, o) {
      return i && t && (r = 0), 0 === r ? e : (i = n || t, r += !o - !n, "")
    })) ? Function("return " + n)() : ne.error("Invalid JSON: " + t)
  }, ne.parseXML = function (t) {
    var i, r;
    if (!t || "string" != typeof t) return null;
    try {
      e.DOMParser ? (r = new DOMParser, i = r.parseFromString(t, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(t))
    } catch (n) {
      i = void 0
    }
    return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ne.error("Invalid XML: " + t), i
  };
  var Pt, Ft, kt = /#.*$/, Nt = /([?&])_=[^&]*/, Ut = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    zt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ot = /^(?:GET|HEAD)$/, Bt = /^\/\//,
    Vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, It = {}, jt = {}, Wt = "*/".concat("*");
  try {
    Ft = location.href
  } catch (Gt) {
    Ft = fe.createElement("a"), Ft.href = "", Ft = Ft.href
  }
  Pt = Vt.exec(Ft.toLowerCase()) || [], ne.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Ft,
      type: "GET",
      isLocal: zt.test(Pt[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Wt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {xml: /xml/, html: /html/, json: /json/},
      responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
      converters: {"* text": String, "text html": !0, "text json": ne.parseJSON, "text xml": ne.parseXML},
      flatOptions: {url: !0, context: !0}
    },
    ajaxSetup: function (e, t) {
      return t ? V(V(e, ne.ajaxSettings), t) : V(ne.ajaxSettings, e)
    },
    ajaxPrefilter: O(It),
    ajaxTransport: O(jt),
    ajax: function (e, t) {
      function i(e, t, i, r) {
        var n, c, g, v, T, R = t;
        2 !== y && (y = 2, s && clearTimeout(s), h = void 0, a = r || "", x.readyState = e > 0 ? 4 : 0, n = e >= 200 && 300 > e || 304 === e, i && (v = I(u, x, i)), v = j(u, v, x, n), n ? (u.ifModified && (T = x.getResponseHeader("Last-Modified"), T && (ne.lastModified[o] = T), T = x.getResponseHeader("etag"), T && (ne.etag[o] = T)), 204 === e || "HEAD" === u.type ? R = "nocontent" : 304 === e ? R = "notmodified" : (R = v.state, c = v.data, g = v.error, n = !g)) : (g = R, (e || !R) && (R = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || R) + "", n ? f.resolveWith(p, [c, R, x]) : f.rejectWith(p, [x, R, g]), x.statusCode(E), E = void 0, l && d.trigger(n ? "ajaxSuccess" : "ajaxError", [x, u, n ? c : g]), m.fireWith(p, [x, R]), l && (d.trigger("ajaxComplete", [x, u]), --ne.active || ne.event.trigger("ajaxStop")))
      }

      "object" == typeof e && (t = e, e = void 0), t = t || {};
      var r, n, o, a, s, l, h, c, u = ne.ajaxSetup({}, t), p = u.context || u,
        d = u.context && (p.nodeType || p.jquery) ? ne(p) : ne.event, f = ne.Deferred(),
        m = ne.Callbacks("once memory"), E = u.statusCode || {}, g = {}, v = {}, y = 0, T = "canceled", x = {
          readyState: 0, getResponseHeader: function (e) {
            var t;
            if (2 === y) {
              if (!c) for (c = {}; t = Ut.exec(a);) c[t[1].toLowerCase()] = t[2];
              t = c[e.toLowerCase()]
            }
            return null == t ? null : t
          }, getAllResponseHeaders: function () {
            return 2 === y ? a : null
          }, setRequestHeader: function (e, t) {
            var i = e.toLowerCase();
            return y || (e = v[i] = v[i] || e, g[e] = t), this
          }, overrideMimeType: function (e) {
            return y || (u.mimeType = e), this
          }, statusCode: function (e) {
            var t;
            if (e) if (2 > y) for (t in e) E[t] = [E[t], e[t]]; else x.always(e[x.status]);
            return this
          }, abort: function (e) {
            var t = e || T;
            return h && h.abort(t), i(0, t), this
          }
        };
      if (f.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, u.url = ((e || u.url || Ft) + "").replace(kt, "").replace(Bt, Pt[1] + "//"), u.type = t.method || t.type || u.method || u.type, u.dataTypes = ne.trim(u.dataType || "*").toLowerCase().match(ye) || [""], null == u.crossDomain && (r = Vt.exec(u.url.toLowerCase()), u.crossDomain = !(!r || r[1] === Pt[1] && r[2] === Pt[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Pt[3] || ("http:" === Pt[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = ne.param(u.data, u.traditional)), B(It, u, t, x), 2 === y) return x;
      l = u.global, l && 0 === ne.active++ && ne.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !Ot.test(u.type), o = u.url, u.hasContent || (u.data && (o = u.url += (Lt.test(o) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = Nt.test(o) ? o.replace(Nt, "$1_=" + At++) : o + (Lt.test(o) ? "&" : "?") + "_=" + At++)), u.ifModified && (ne.lastModified[o] && x.setRequestHeader("If-Modified-Since", ne.lastModified[o]), ne.etag[o] && x.setRequestHeader("If-None-Match", ne.etag[o])), (u.data && u.hasContent && u.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", u.contentType), x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Wt + "; q=0.01" : "") : u.accepts["*"]);
      for (n in u.headers) x.setRequestHeader(n, u.headers[n]);
      if (u.beforeSend && (u.beforeSend.call(p, x, u) === !1 || 2 === y)) return x.abort();
      T = "abort";
      for (n in{success: 1, error: 1, complete: 1}) x[n](u[n]);
      if (h = B(jt, u, t, x)) {
        x.readyState = 1, l && d.trigger("ajaxSend", [x, u]), u.async && u.timeout > 0 && (s = setTimeout(function () {
          x.abort("timeout")
        }, u.timeout));
        try {
          y = 1, h.send(g, i)
        } catch (R) {
          if (!(2 > y)) throw R;
          i(-1, R)
        }
      } else i(-1, "No Transport");
      return x
    },
    getJSON: function (e, t, i) {
      return ne.get(e, t, i, "json")
    },
    getScript: function (e, t) {
      return ne.get(e, void 0, t, "script")
    }
  }), ne.each(["get", "post"], function (e, t) {
    ne[t] = function (e, i, r, n) {
      return ne.isFunction(i) && (n = n || r, r = i, i = void 0), ne.ajax({
        url: e,
        type: t,
        dataType: n,
        data: i,
        success: r
      })
    }
  }), ne.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    ne.fn[t] = function (e) {
      return this.on(t, e)
    }
  }), ne._evalUrl = function (e) {
    return ne.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
  }, ne.fn.extend({
    wrapAll: function (e) {
      if (ne.isFunction(e)) return this.each(function (t) {
        ne(this).wrapAll(e.call(this, t))
      });
      if (this[0]) {
        var t = ne(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
          for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
          return e
        }).append(this)
      }
      return this
    }, wrapInner: function (e) {
      return this.each(ne.isFunction(e) ? function (t) {
        ne(this).wrapInner(e.call(this, t))
      } : function () {
        var t = ne(this), i = t.contents();
        i.length ? i.wrapAll(e) : t.append(e)
      })
    }, wrap: function (e) {
      var t = ne.isFunction(e);
      return this.each(function (i) {
        ne(this).wrapAll(t ? e.call(this, i) : e)
      })
    }, unwrap: function () {
      return this.parent().each(function () {
        ne.nodeName(this, "body") || ne(this).replaceWith(this.childNodes)
      }).end()
    }
  }), ne.expr.filters.hidden = function (e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ie.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ne.css(e, "display"))
  }, ne.expr.filters.visible = function (e) {
    return !ne.expr.filters.hidden(e)
  };
  var Xt = /%20/g, qt = /\[\]$/, Yt = /\r?\n/g, Kt = /^(?:submit|button|image|reset|file)$/i,
    $t = /^(?:input|select|textarea|keygen)/i;
  ne.param = function (e, t) {
    var i, r = [], n = function (e, t) {
      t = ne.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
    };
    if (void 0 === t && (t = ne.ajaxSettings && ne.ajaxSettings.traditional), ne.isArray(e) || e.jquery && !ne.isPlainObject(e)) ne.each(e, function () {
      n(this.name, this.value)
    }); else for (i in e) W(i, e[i], t, n);
    return r.join("&").replace(Xt, "+")
  }, ne.fn.extend({
    serialize: function () {
      return ne.param(this.serializeArray())
    }, serializeArray: function () {
      return this.map(function () {
        var e = ne.prop(this, "elements");
        return e ? ne.makeArray(e) : this
      }).filter(function () {
        var e = this.type;
        return this.name && !ne(this).is(":disabled") && $t.test(this.nodeName) && !Kt.test(e) && (this.checked || !Ae.test(e))
      }).map(function (e, t) {
        var i = ne(this).val();
        return null == i ? null : ne.isArray(i) ? ne.map(i, function (e) {
          return {name: t.name, value: e.replace(Yt, "\r\n")}
        }) : {name: t.name, value: i.replace(Yt, "\r\n")}
      }).get()
    }
  }), ne.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && G() || X()
  } : G;
  var Qt = 0, Zt = {}, Jt = ne.ajaxSettings.xhr();
  e.ActiveXObject && ne(e).on("unload", function () {
    for (var e in Zt) Zt[e](void 0, !0)
  }), ie.cors = !!Jt && "withCredentials" in Jt, Jt = ie.ajax = !!Jt, Jt && ne.ajaxTransport(function (e) {
    if (!e.crossDomain || ie.cors) {
      var t;
      return {
        send: function (i, r) {
          var n, o = e.xhr(), a = ++Qt;
          if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (n in e.xhrFields) o[n] = e.xhrFields[n];
          e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
          for (n in i) void 0 !== i[n] && o.setRequestHeader(n, i[n] + "");
          o.send(e.hasContent && e.data || null), t = function (i, n) {
            var s, l, h;
            if (t && (n || 4 === o.readyState)) if (delete Zt[a], t = void 0, o.onreadystatechange = ne.noop, n) 4 !== o.readyState && o.abort(); else {
              h = {}, s = o.status, "string" == typeof o.responseText && (h.text = o.responseText);
              try {
                l = o.statusText
              } catch (c) {
                l = ""
              }
              s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = h.text ? 200 : 404
            }
            h && r(s, l, h, o.getAllResponseHeaders())
          }, e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Zt[a] = t : t()
        }, abort: function () {
          t && t(void 0, !0)
        }
      }
    }
  }), ne.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /(?:java|ecma)script/},
    converters: {
      "text script": function (e) {
        return ne.globalEval(e), e
      }
    }
  }), ne.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
  }), ne.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t, i = fe.head || ne("head")[0] || fe.documentElement;
      return {
        send: function (r, n) {
          t = fe.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, i) {
            (i || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, i || n(200, "success"))
          }, i.insertBefore(t, i.firstChild)
        }, abort: function () {
          t && t.onload(void 0, !0)
        }
      }
    }
  });
  var ei = [], ti = /(=)\?(?=&|$)|\?\?/;
  ne.ajaxSetup({
    jsonp: "callback", jsonpCallback: function () {
      var e = ei.pop() || ne.expando + "_" + At++;
      return this[e] = !0, e
    }
  }), ne.ajaxPrefilter("json jsonp", function (t, i, r) {
    var n, o, a,
      s = t.jsonp !== !1 && (ti.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ti.test(t.data) && "data");
    return s || "jsonp" === t.dataTypes[0] ? (n = t.jsonpCallback = ne.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ti, "$1" + n) : t.jsonp !== !1 && (t.url += (Lt.test(t.url) ? "&" : "?") + t.jsonp + "=" + n), t.converters["script json"] = function () {
      return a || ne.error(n + " was not called"), a[0]
    }, t.dataTypes[0] = "json", o = e[n], e[n] = function () {
      a = arguments
    }, r.always(function () {
      e[n] = o, t[n] && (t.jsonpCallback = i.jsonpCallback, ei.push(n)), a && ne.isFunction(o) && o(a[0]), a = o = void 0
    }), "script") : void 0
  }), ne.parseHTML = function (e, t, i) {
    if (!e || "string" != typeof e) return null;
    "boolean" == typeof t && (i = t, t = !1), t = t || fe;
    var r = ue.exec(e), n = !i && [];
    return r ? [t.createElement(r[1])] : (r = ne.buildFragment([e], t, n), n && n.length && ne(n).remove(), ne.merge([], r.childNodes))
  };
  var ii = ne.fn.load;
  ne.fn.load = function (e, t, i) {
    if ("string" != typeof e && ii) return ii.apply(this, arguments);
    var r, n, o, a = this, s = e.indexOf(" ");
    return s >= 0 && (r = ne.trim(e.slice(s, e.length)), e = e.slice(0, s)), ne.isFunction(t) ? (i = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && ne.ajax({
      url: e,
      type: o,
      dataType: "html",
      data: t
    }).done(function (e) {
      n = arguments, a.html(r ? ne("<div>").append(ne.parseHTML(e)).find(r) : e)
    }).complete(i && function (e, t) {
      a.each(i, n || [e.responseText, t, e])
    }), this
  }, ne.expr.filters.animated = function (e) {
    return ne.grep(ne.timers, function (t) {
      return e === t.elem
    }).length
  };
  var ri = e.document.documentElement;
  ne.offset = {
    setOffset: function (e, t, i) {
      var r, n, o, a, s, l, h, c = ne.css(e, "position"), u = ne(e), p = {};
      "static" === c && (e.style.position = "relative"), s = u.offset(), o = ne.css(e, "top"), l = ne.css(e, "left"), h = ("absolute" === c || "fixed" === c) && ne.inArray("auto", [o, l]) > -1, h ? (r = u.position(), a = r.top, n = r.left) : (a = parseFloat(o) || 0, n = parseFloat(l) || 0), ne.isFunction(t) && (t = t.call(e, i, s)), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + n), "using" in t ? t.using.call(e, p) : u.css(p)
    }
  }, ne.fn.extend({
    offset: function (e) {
      if (arguments.length) return void 0 === e ? this : this.each(function (t) {
        ne.offset.setOffset(this, e, t)
      });
      var t, i, r = {top: 0, left: 0}, n = this[0], o = n && n.ownerDocument;
      return o ? (t = o.documentElement, ne.contains(t, n) ? (typeof n.getBoundingClientRect !== be && (r = n.getBoundingClientRect()), i = q(o), {
        top: r.top + (i.pageYOffset || t.scrollTop) - (t.clientTop || 0),
        left: r.left + (i.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
      }) : r) : void 0;
    }, position: function () {
      if (this[0]) {
        var e, t, i = {top: 0, left: 0}, r = this[0];
        return "fixed" === ne.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ne.nodeName(e[0], "html") || (i = e.offset()), i.top += ne.css(e[0], "borderTopWidth", !0), i.left += ne.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - i.top - ne.css(r, "marginTop", !0),
          left: t.left - i.left - ne.css(r, "marginLeft", !0)
        }
      }
    }, offsetParent: function () {
      return this.map(function () {
        for (var e = this.offsetParent || ri; e && !ne.nodeName(e, "html") && "static" === ne.css(e, "position");) e = e.offsetParent;
        return e || ri
      })
    }
  }), ne.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
    var i = /Y/.test(t);
    ne.fn[e] = function (r) {
      return Ce(this, function (e, r, n) {
        var o = q(e);
        return void 0 === n ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : void(o ? o.scrollTo(i ? ne(o).scrollLeft() : n, i ? n : ne(o).scrollTop()) : e[r] = n)
      }, e, r, arguments.length, null)
    }
  }), ne.each(["top", "left"], function (e, t) {
    ne.cssHooks[t] = _(ie.pixelPosition, function (e, i) {
      return i ? (i = tt(e, t), rt.test(i) ? ne(e).position()[t] + "px" : i) : void 0
    })
  }), ne.each({Height: "height", Width: "width"}, function (e, t) {
    ne.each({padding: "inner" + e, content: t, "": "outer" + e}, function (i, r) {
      ne.fn[r] = function (r, n) {
        var o = arguments.length && (i || "boolean" != typeof r), a = i || (r === !0 || n === !0 ? "margin" : "border");
        return Ce(this, function (t, i, r) {
          var n;
          return ne.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (n = t.documentElement, Math.max(t.body["scroll" + e], n["scroll" + e], t.body["offset" + e], n["offset" + e], n["client" + e])) : void 0 === r ? ne.css(t, i, a) : ne.style(t, i, r, a)
        }, t, o ? r : void 0, o, null)
      }
    })
  }), ne.fn.size = function () {
    return this.length
  }, ne.fn.andSelf = ne.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
    return ne
  });
  var ni = e.jQuery, oi = e.$;
  return ne.noConflict = function (t) {
    return e.$ === ne && (e.$ = oi), t && e.jQuery === ne && (e.jQuery = ni), ne
  }, typeof t === be && (e.jQuery = e.$ = ne), ne
}), !function (e, t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], function (i) {
    return t(i, e, e.document, e.Math)
  }) : "undefined" != typeof exports ? module.exports = t(require("jquery"), e, e.document, e.Math) : t(jQuery, e, e.document, e.Math)
}("undefined" != typeof window ? window : this, function (e, t, i, r, n) {
  "use strict";
  var o, a = "fullpage-wrapper", s = "." + a, l = "fp-scrollable", h = "." + l, c = ".slimScrollBar",
    u = ".slimScrollRail", p = "fp-responsive", d = "fp-notransition", f = "fp-destroyed", m = "fp-enabled",
    E = "fp-viewing", g = "active", v = "." + g, y = ".section", T = "fp-section", x = "." + T, R = x + v,
    b = x + ":first", H = x + ":last", w = "fp-tableCell", _ = "." + w, S = "fp-auto-height", M = "fp-nav", C = "#" + M,
    A = "fp-tooltip", L = "fp-show-active", D = ".slide", P = "fp-slide", F = "." + P, k = F + v, N = "fp-slides",
    U = "." + N, z = "fp-slidesContainer", O = "." + z, B = "fp-table", V = "fp-slidesNav", I = "." + V, j = I + " a",
    W = "fp-controlArrow", G = "." + W, X = "fp-prev", q = "." + X, Y = W + " " + X, K = G + q, $ = "fp-next",
    Q = "." + $, Z = W + " " + $, J = G + Q, ee = e(t), te = e(i);
  e.fn.fullpage = function (l) {
    function h() {
      l.css3 && (l.css3 = et()), l.anchors.length || (l.anchors = e(l.sectionSelector + "[data-anchor]").map(function () {
        return e(this).data("anchor").toString()
      }).get()), c(), gt.setAllowScrolling(!0), wt = ee.height(), gt.setAutoScrolling(l.autoScrolling, "internal");
      var t = e(R).find(k);
      t.length && (0 !== e(R).index(x) || 0 === e(R).index(x) && 0 !== t.index()) && st(t), De(), Je(), ee.on("load", function () {
        we()
      })
    }

    function c() {
      Ht.css({
        height: "100%",
        position: "relative"
      }), Ht.addClass(a), e("html").addClass(m), Ht.removeClass(f), $(), e(x).each(function (t) {
        var i = e(this), r = i.find(F), n = r.length;
        W(i, t), q(i, t), n > 0 ? u(i, r, n) : l.verticalCentered && Ie(i)
      }), l.fixedElements && l.css3 && e(l.fixedElements).appendTo(Et), l.navigation && ie(), l.scrollOverflow ? ("complete" === i.readyState && re(), ee.on("load", re)) : ne()
    }

    function u(t, i, r) {
      var n = 100 * r, o = 100 / r;
      i.wrapAll('<div class="' + z + '" />'), i.parent().wrap('<div class="' + N + '" />'), t.find(O).css("width", n + "%"), r > 1 && (l.controlArrows && Q(t), l.slidesNavigation && Ke(t, r)), i.each(function (t) {
        e(this).css("width", o + "%"), l.verticalCentered && Ie(e(this))
      });
      var a = t.find(k);
      a.length && (0 !== e(R).index(x) || 0 === e(R).index(x) && 0 !== a.index()) ? st(a) : i.eq(0).addClass(g)
    }

    function W(t, i) {
      i || 0 !== e(R).length || t.addClass(g), t.css("height", wt + "px"), l.paddingTop && t.css("padding-top", l.paddingTop), l.paddingBottom && t.css("padding-bottom", l.paddingBottom), "undefined" != typeof l.sectionsColor[i] && t.css("background-color", l.sectionsColor[i]), "undefined" != typeof l.anchors[i] && t.attr("data-anchor", l.anchors[i])
    }

    function q(t, i) {
      "undefined" != typeof l.anchors[i] && t.hasClass(g) && ze(l.anchors[i], i), l.menu && l.css3 && e(l.menu).closest(s).length && e(l.menu).appendTo(Et)
    }

    function $() {
      e(l.sectionSelector).each(function () {
        e(this).addClass(T)
      }), e(l.slideSelector).each(function () {
        e(this).addClass(P)
      })
    }

    function Q(e) {
      e.find(U).after('<div class="' + Y + '"></div><div class="' + Z + '"></div>'), "#fff" != l.controlArrowColor && (e.find(J).css("border-color", "transparent transparent transparent " + l.controlArrowColor), e.find(K).css("border-color", "transparent " + l.controlArrowColor + " transparent transparent")), l.loopHorizontal || e.find(K).hide()
    }

    function ie() {
      Et.append('<div id="' + M + '"><ul></ul></div>');
      var t = e(C);
      t.addClass(function () {
        return l.showActiveTooltip ? L + " " + l.navigationPosition : l.navigationPosition
      });
      for (var i = 0; i < e(x).length; i++) {
        var r = "";
        l.anchors.length && (r = l.anchors[i]);
        var n = '<li><a href="#' + r + '"><span></span></a>', o = l.navigationTooltips[i];
        "undefined" != typeof o && "" !== o && (n += '<div class="' + A + " " + l.navigationPosition + '">' + o + "</div>"), n += "</li>", t.find("ul").append(n)
      }
      e(C).css("margin-top", "-" + e(C).height() / 2 + "px"), e(C).find("li").eq(e(R).index(x)).find("a").addClass(g)
    }

    function re() {
      e(x).each(function () {
        var t = e(this).find(F);
        t.length ? t.each(function () {
          Ve(e(this))
        }) : Ve(e(this))
      }), ne()
    }

    function ne() {
      var t = e(R);
      l.scrollOverflowHandler.afterRender && l.scrollOverflowHandler.afterRender(t), xe(t), Re(t), e.isFunction(l.afterLoad) && l.afterLoad.call(t, t.data("anchor"), t.index(x) + 1), e.isFunction(l.afterRender) && l.afterRender.call(Ht)
    }

    function oe() {
      var t;
      if (!l.autoScrolling || l.scrollBar) {
        for (var n = ee.scrollTop(), o = 0, a = r.abs(n - i.querySelectorAll(x)[0].offsetTop), s = i.querySelectorAll(x), h = 0; h < s.length; ++h) {
          var c = s[h], u = r.abs(n - c.offsetTop);
          a > u && (o = h, a = u)
        }
        if (t = e(s).eq(o), !t.hasClass(g) && !t.hasClass(S)) {
          zt = !0;
          var p = e(R), d = p.index(x) + 1, f = Oe(t), m = t.data("anchor"), E = t.index(x) + 1, v = t.find(k);
          if (v.length) var y = v.data("anchor"), T = v.index();
          Mt && (t.addClass(g).siblings().removeClass(g), e.isFunction(l.onLeave) && l.onLeave.call(p, d, E, f), e.isFunction(l.afterLoad) && l.afterLoad.call(t, m, E), xe(t), ze(m, E - 1), l.anchors.length && (vt = m, $e(T, y, m, E))), clearTimeout(Ft), Ft = setTimeout(function () {
            zt = !1
          }, 100)
        }
        l.fitToSection && (clearTimeout(kt), kt = setTimeout(function () {
          Mt && l.fitToSection && (e(R).is(t) && requestAnimFrame(function () {
            _t = !0
          }), me(t), requestAnimFrame(function () {
            _t = !1
          }))
        }, l.fitToSectionDelay))
      }
    }

    function ae(e, t) {
      if (At.m[e]) {
        var i, r;
        if ("down" == e ? (i = "bottom", r = gt.moveSectionDown) : (i = "top", r = gt.moveSectionUp), t.length > 0) {
          if (!l.scrollOverflowHandler.isScrolled(i, t)) return !0;
          r()
        } else r()
      }
    }

    function se(i) {
      var n = i.originalEvent;
      if (!le(i.target) && he(n)) {
        l.autoScrolling && i.preventDefault();
        var o = e(R), a = l.scrollOverflowHandler.scrollable(o);
        if (Mt && !xt) {
          var s = at(n);
          Vt = s.y, It = s.x, o.find(U).length && r.abs(Bt - It) > r.abs(Ot - Vt) ? r.abs(Bt - It) > t.outerWidth / 100 * l.touchSensitivity && (Bt > It ? At.m.right && gt.moveSlideRight() : At.m.left && gt.moveSlideLeft()) : l.autoScrolling && r.abs(Ot - Vt) > ee.height() / 100 * l.touchSensitivity && (Ot > Vt ? ae("down", a) : Vt > Ot && ae("up", a))
        }
      }
    }

    function le(t, i) {
      i = i || 0;
      var r = e(t).parent();
      return i < l.normalScrollElementTouchThreshold && r.is(l.normalScrollElements) ? !0 : i == l.normalScrollElementTouchThreshold ? !1 : le(r, ++i)
    }

    function he(e) {
      return "undefined" == typeof e.pointerType || "mouse" != e.pointerType
    }

    function ce(e) {
      var t = e.originalEvent;
      if (l.fitToSection && mt.stop(), he(t)) {
        var i = at(t);
        Ot = i.y, Bt = i.x
      }
    }

    function ue(e, t) {
      for (var i = 0, n = e.slice(r.max(e.length - t, 1)), o = 0; o < n.length; o++) i += n[o];
      return r.ceil(i / t)
    }

    function pe(i) {
      var n = (new Date).getTime();
      if (l.autoScrolling && !Tt) {
        i = i || t.event;
        var o = i.wheelDelta || -i.deltaY || -i.detail, a = r.max(-1, r.min(1, o)),
          s = "undefined" != typeof i.wheelDeltaX || "undefined" != typeof i.deltaX,
          h = r.abs(i.wheelDeltaX) < r.abs(i.wheelDelta) || r.abs(i.deltaX) < r.abs(i.deltaY) || !s;
        Ct.length > 149 && Ct.shift(), Ct.push(r.abs(o)), l.scrollBar && (i.preventDefault ? i.preventDefault() : i.returnValue = !1);
        var c = e(R), u = l.scrollOverflowHandler.scrollable(c), p = n - jt;
        if (jt = n, p > 200 && (Ct = []), Mt) {
          var d = ue(Ct, 10), f = ue(Ct, 70), m = d >= f;
          m && h && (0 > a ? ae("down", u) : ae("up", u))
        }
        return !1
      }
      l.fitToSection && mt.stop()
    }

    function de(t, i) {
      var r = "undefined" == typeof i ? e(R) : i, n = r.find(U), o = n.find(F).length;
      if (!(!n.length || xt || 2 > o)) {
        var a = n.find(k), s = null;
        if (s = "prev" === t ? a.prev(F) : a.next(F), !s.length) {
          if (!l.loopHorizontal) return;
          s = "prev" === t ? a.siblings(":last") : a.siblings(":first")
        }
        xt = !0, Ae(n, s)
      }
    }

    function fe() {
      e(k).each(function () {
        st(e(this), "internal")
      })
    }

    function me(t, i, r) {
      requestAnimFrame(function () {
        var n = t.position();
        if ("undefined" != typeof n) {
          var o = t.hasClass(S) && n.top ? n.top - wt + t.height() : n.top, a = {
            element: t,
            callback: i,
            isMovementUp: r,
            dest: n,
            dtop: o,
            yMovement: Oe(t),
            anchorLink: t.data("anchor"),
            sectionIndex: t.index(x),
            activeSlide: t.find(k),
            activeSection: e(R),
            leavingSection: e(R).index(x) + 1,
            localIsResizing: _t
          };
          if (!(a.activeSection.is(t) && !_t || l.scrollBar && ee.scrollTop() === a.dtop && !t.hasClass(S))) {
            if (a.activeSlide.length) var s = a.activeSlide.data("anchor"), h = a.activeSlide.index();
            l.autoScrolling && l.continuousVertical && "undefined" != typeof a.isMovementUp && (!a.isMovementUp && "up" == a.yMovement || a.isMovementUp && "down" == a.yMovement) && (a = ve(a)), (!e.isFunction(l.onLeave) || a.localIsResizing || l.onLeave.call(a.activeSection, a.leavingSection, a.sectionIndex + 1, a.yMovement) !== !1) && (be(a.activeSection), t.addClass(g).siblings().removeClass(g), xe(t), Mt = !1, $e(h, s, a.anchorLink, a.sectionIndex), Ee(a), vt = a.anchorLink, ze(a.anchorLink, a.sectionIndex))
          }
        }
      })
    }

    function Ee(t) {
      if (l.css3 && l.autoScrolling && !l.scrollBar) {
        var i = "translate3d(0px, -" + t.dtop + "px, 0px)";
        We(i, !0), l.scrollingSpeed ? Dt = setTimeout(function () {
          Te(t)
        }, l.scrollingSpeed) : Te(t)
      } else {
        var r = ge(t);
        e(r.element).animate(r.options, l.scrollingSpeed, l.easing).promise().done(function () {
          Te(t)
        })
      }
    }

    function ge(e) {
      var t = {};
      return l.autoScrolling && !l.scrollBar ? (t.options = {top: -e.dtop}, t.element = s) : (t.options = {scrollTop: e.dtop}, t.element = "html, body"), t
    }

    function ve(t) {
      return t.isMovementUp ? e(R).before(t.activeSection.nextAll(x)) : e(R).after(t.activeSection.prevAll(x).get().reverse()), lt(e(R).position().top), fe(), t.wrapAroundElements = t.activeSection, t.dest = t.element.position(), t.dtop = t.dest.top, t.yMovement = Oe(t.element), t
    }

    function ye(t) {
      t.wrapAroundElements && t.wrapAroundElements.length && (t.isMovementUp ? e(b).before(t.wrapAroundElements) : e(H).after(t.wrapAroundElements), lt(e(R).position().top), fe())
    }

    function Te(t) {
      ye(t), t.element.find(".fp-scrollable").mouseover(), e.isFunction(l.afterLoad) && !t.localIsResizing && l.afterLoad.call(t.element, t.anchorLink, t.sectionIndex + 1), Re(t.element), Mt = !0, e.isFunction(t.callback) && t.callback.call(this)
    }

    function xe(t) {
      var t = He(t);
      t.find("img[data-src], source[data-src], audio[data-src]").each(function () {
        e(this).attr("src", e(this).data("src")), e(this).removeAttr("data-src"), e(this).is("source") && e(this).closest("video").get(0).load()
      })
    }

    function Re(t) {
      var t = He(t);
      t.find("video, audio").each(function () {
        var t = e(this).get(0);
        t.hasAttribute("autoplay") && "function" == typeof t.play && t.play()
      })
    }

    function be(t) {
      var t = He(t);
      t.find("video, audio").each(function () {
        var t = e(this).get(0);
        t.hasAttribute("data-ignore") || "function" != typeof t.pause || t.pause()
      })
    }

    function He(t) {
      var i = t.find(k);
      return i.length && (t = e(i)), t
    }

    function we() {
      var e = t.location.hash.replace("#", "").split("/"), i = e[0], r = e[1];
      i && (l.animateAnchor ? qe(i, r) : gt.silentMoveTo(i, r))
    }

    function _e() {
      if (!zt && !l.lockAnchors) {
        var e = t.location.hash.replace("#", "").split("/"), i = e[0], r = e[1], n = "undefined" == typeof vt,
          o = "undefined" == typeof vt && "undefined" == typeof r && !xt;
        i.length && (i && i !== vt && !n || o || !xt && yt != r) && qe(i, r)
      }
    }

    function Se(t) {
      clearTimeout(Nt);
      var i = e(":focus");
      if (!i.is("textarea") && !i.is("input") && !i.is("select") && l.keyboardScrolling && l.autoScrolling) {
        var r = t.which, n = [40, 38, 32, 33, 34];
        e.inArray(r, n) > -1 && t.preventDefault(), Tt = t.ctrlKey, Nt = setTimeout(function () {
          Me(t)
        }, 150)
      }
    }

    function Me(t) {
      var i = t.shiftKey;
      switch (t.which) {
        case 38:
        case 33:
          At.k.up && gt.moveSectionUp();
          break;
        case 32:
          if (i && At.k.up) {
            gt.moveSectionUp();
            break
          }
        case 40:
        case 34:
          At.k.down && gt.moveSectionDown();
          break;
        case 36:
          At.k.up && gt.moveTo(1);
          break;
        case 35:
          At.k.down && gt.moveTo(e(x).length);
          break;
        case 37:
          At.k.left && gt.moveSlideLeft();
          break;
        case 39:
          At.k.right && gt.moveSlideRight();
          break;
        default:
          return
      }
    }

    function Ce(e) {
      Mt && (e.pageY < Wt ? gt.moveSectionUp() : e.pageY > Wt && gt.moveSectionDown()), Wt = e.pageY
    }

    function Ae(t, i) {
      var n = i.position(), o = i.index(), a = t.closest(x), s = a.index(x), h = a.data("anchor"), c = a.find(I),
        u = Ze(i), p = a.find(k), d = _t;
      if (l.onSlideLeave) {
        var f = p.index(), m = Be(f, o);
        if (!d && "none" !== m && e.isFunction(l.onSlideLeave) && l.onSlideLeave.call(p, h, s + 1, f, m, o) === !1) return void(xt = !1)
      }
      be(p), i.addClass(g).siblings().removeClass(g), d || xe(i), !l.loopHorizontal && l.controlArrows && (a.find(K).toggle(0 !== o), a.find(J).toggle(!i.is(":last-child"))), a.hasClass(g) && $e(o, u, h, s);
      var E = function () {
        d || e.isFunction(l.afterSlideLoad) && l.afterSlideLoad.call(i, h, s + 1, u, o), Re(i), xt = !1
      };
      if (l.css3) {
        var y = "translate3d(-" + r.round(n.left) + "px, 0px, 0px)";
        Pe(t.find(O), l.scrollingSpeed > 0).css(ht(y)), Pt = setTimeout(function () {
          E()
        }, l.scrollingSpeed, l.easing)
      } else t.animate({scrollLeft: r.round(n.left)}, l.scrollingSpeed, l.easing, function () {
        E()
      });
      c.find(v).removeClass(g), c.find("li").eq(o).find("a").addClass(g)
    }

    function Le() {
      if (De(), Rt) {
        var t = e(i.activeElement);
        if (!t.is("textarea") && !t.is("input") && !t.is("select")) {
          var n = ee.height();
          r.abs(n - Gt) > 20 * r.max(Gt, n) / 100 && (gt.reBuild(!0), Gt = n)
        }
      } else clearTimeout(Lt), Lt = setTimeout(function () {
        gt.reBuild(!0)
      }, 350)
    }

    function De() {
      var e = l.responsive || l.responsiveWidth, i = l.responsiveHeight, r = e && t.outerWidth < e,
        n = i && ee.height() < i;
      e && i ? gt.setResponsive(r || n) : e ? gt.setResponsive(r) : i && gt.setResponsive(n)
    }

    function Pe(e) {
      var t = "all " + l.scrollingSpeed + "ms " + l.easingcss3;
      return e.removeClass(d), e.css({"-webkit-transition": t, transition: t})
    }

    function Fe(e) {
      return e.addClass(d)
    }

    function ke(e, t) {
      var i = 825, n = 900;
      if (i > e || n > t) {
        var o = 100 * e / i, a = 100 * t / n, s = r.min(o, a), l = s.toFixed(2);
        Et.css("font-size", l + "%")
      } else Et.css("font-size", "100%")
    }

    function Ne(t, i) {
      l.navigation && (e(C).find(v).removeClass(g), t ? e(C).find('a[href="#' + t + '"]').addClass(g) : e(C).find("li").eq(i).find("a").addClass(g))
    }

    function Ue(t) {
      l.menu && (e(l.menu).find(v).removeClass(g), e(l.menu).find('[data-menuanchor="' + t + '"]').addClass(g))
    }

    function ze(e, t) {
      Ue(e), Ne(e, t)
    }

    function Oe(t) {
      var i = e(R).index(x), r = t.index(x);
      return i == r ? "none" : i > r ? "up" : "down"
    }

    function Be(e, t) {
      return e == t ? "none" : e > t ? "left" : "right"
    }

    function Ve(e) {
      e.css("overflow", "hidden");
      var t, i = l.scrollOverflowHandler, r = i.wrapContent(), n = e.closest(x), o = i.scrollable(e);
      o.length ? t = i.scrollHeight(e) : (t = e.get(0).scrollHeight, l.verticalCentered && (t = e.find(_).get(0).scrollHeight));
      var a = wt - parseInt(n.css("padding-bottom")) - parseInt(n.css("padding-top"));
      t > a ? o.length ? i.update(e, a) : (l.verticalCentered ? e.find(_).wrapInner(r) : e.wrapInner(r), i.create(e, a)) : i.remove(e), e.css("overflow", "")
    }

    function Ie(e) {
      e.addClass(B).wrapInner('<div class="' + w + '" style="height:' + je(e) + 'px;" />')
    }

    function je(e) {
      var t = wt;
      if (l.paddingTop || l.paddingBottom) {
        var i = e;
        i.hasClass(T) || (i = e.closest(x));
        var r = parseInt(i.css("padding-top")) + parseInt(i.css("padding-bottom"));
        t = wt - r
      }
      return t
    }

    function We(e, t) {
      t ? Pe(Ht) : Fe(Ht), Ht.css(ht(e)), setTimeout(function () {
        Ht.removeClass(d)
      }, 10)
    }

    function Ge(t) {
      var i = Ht.find(x + '[data-anchor="' + t + '"]');
      return i.length || (i = e(x).eq(t - 1)), i
    }

    function Xe(e, t) {
      var i = t.find(U), r = i.find(F + '[data-anchor="' + e + '"]');
      return r.length || (r = i.find(F).eq(e)), r
    }

    function qe(e, t) {
      var i = Ge(e);
      "undefined" == typeof t && (t = 0), e === vt || i.hasClass(g) ? Ye(i, t) : me(i, function () {
        Ye(i, t)
      })
    }

    function Ye(e, t) {
      if ("undefined" != typeof t) {
        var i = e.find(U), r = Xe(t, e);
        r.length && Ae(i, r)
      }
    }

    function Ke(e, t) {
      e.append('<div class="' + V + '"><ul></ul></div>');
      var i = e.find(I);
      i.addClass(l.slidesNavPosition);
      for (var r = 0; t > r; r++) i.find("ul").append('<li><a href="#"><span></span></a></li>');
      i.css("margin-left", "-" + i.width() / 2 + "px"), i.find("li").first().find("a").addClass(g)
    }

    function $e(e, t, i, r) {
      var n = "";
      l.anchors.length && !l.lockAnchors && (e ? ("undefined" != typeof i && (n = i), "undefined" == typeof t && (t = e), yt = t, Qe(n + "/" + t)) : "undefined" != typeof e ? (yt = t, Qe(i)) : Qe(i)), Je()
    }

    function Qe(e) {
      if (l.recordHistory) location.hash = e; else if (Rt || bt) history.replaceState(n, n, "#" + e); else {
        var i = t.location.href.split("#")[0];
        t.location.replace(i + "#" + e)
      }
    }

    function Ze(e) {
      var t = e.data("anchor"), i = e.index();
      return "undefined" == typeof t && (t = i), t
    }

    function Je() {
      var t = e(R), i = t.find(k), r = Ze(t), n = Ze(i), o = (t.index(x), String(r));
      i.length && (o = o + "-" + n), o = o.replace("/", "-").replace("#", "");
      var a = new RegExp("\\b\\s?" + E + "-[^\\s]+\\b", "g");
      Et[0].className = Et[0].className.replace(a, ""), Et.addClass(E + "-" + o)
    }

    function et() {
      var e, r = i.createElement("p"), o = {
        webkitTransform: "-webkit-transform",
        OTransform: "-o-transform",
        msTransform: "-ms-transform",
        MozTransform: "-moz-transform",
        transform: "transform"
      };
      i.body.insertBefore(r, null);
      for (var a in o) r.style[a] !== n && (r.style[a] = "translate3d(1px,1px,1px)", e = t.getComputedStyle(r).getPropertyValue(o[a]));
      return i.body.removeChild(r), e !== n && e.length > 0 && "none" !== e
    }

    function tt() {
      i.addEventListener ? (i.removeEventListener("mousewheel", pe, !1), i.removeEventListener("wheel", pe, !1), i.removeEventListener("MozMousePixelScroll", pe, !1)) : i.detachEvent("onmousewheel", pe)
    }

    function it() {
      var e, r = "";
      t.addEventListener ? e = "addEventListener" : (e = "attachEvent", r = "on");
      var o = "onwheel" in i.createElement("div") ? "wheel" : i.onmousewheel !== n ? "mousewheel" : "DOMMouseScroll";
      "DOMMouseScroll" == o ? i[e](r + "MozMousePixelScroll", pe, !1) : i[e](r + o, pe, !1)
    }

    function rt() {
      if (Rt || bt) {
        var t = ot();
        e(s).off("touchstart " + t.down).on("touchstart " + t.down, ce), e(s).off("touchmove " + t.move).on("touchmove " + t.move, se)
      }
    }

    function nt() {
      if (Rt || bt) {
        var t = ot();
        e(s).off("touchstart " + t.down), e(s).off("touchmove " + t.move)
      }
    }

    function ot() {
      var e;
      return e = t.PointerEvent ? {down: "pointerdown", move: "pointermove"} : {
        down: "MSPointerDown",
        move: "MSPointerMove"
      }
    }

    function at(e) {
      var t = [];
      return t.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, t.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, bt && he(e) && l.scrollBar && (t.y = e.touches[0].pageY, t.x = e.touches[0].pageX), t
    }

    function st(e, t) {
      gt.setScrollingSpeed(0, "internal"), "undefined" != typeof t && (_t = !0), Ae(e.closest(U), e), "undefined" != typeof t && (_t = !1), gt.setScrollingSpeed(Ut.scrollingSpeed, "internal")
    }

    function lt(e) {
      if (l.scrollBar) Ht.scrollTop(e); else if (l.css3) {
        var t = "translate3d(0px, -" + e + "px, 0px)";
        We(t, !1)
      } else Ht.css("top", -e)
    }

    function ht(e) {
      return {"-webkit-transform": e, "-moz-transform": e, "-ms-transform": e, transform: e}
    }

    function ct(e, t, i) {
      switch (t) {
        case"up":
          At[i].up = e;
          break;
        case"down":
          At[i].down = e;
          break;
        case"left":
          At[i].left = e;
          break;
        case"right":
          At[i].right = e;
          break;
        case"all":
          "m" == i ? gt.setAllowScrolling(e) : gt.setKeyboardScrolling(e)
      }
    }

    function ut() {
      lt(0), e(C + ", " + I + ", " + G).remove(), e(x).css({
        height: "",
        "background-color": "",
        padding: ""
      }), e(F).css({width: ""}), Ht.css({
        height: "",
        position: "",
        "-ms-touch-action": "",
        "touch-action": ""
      }), mt.css({
        overflow: "",
        height: ""
      }), e("html").removeClass(m), e.each(Et.get(0).className.split(/\s+/), function (e, t) {
        0 === t.indexOf(E) && Et.removeClass(t)
      }), e(x + ", " + F).each(function () {
        l.scrollOverflowHandler.remove(e(this)), e(this).removeClass(B + " " + g)
      }), Fe(Ht), Ht.find(_ + ", " + O + ", " + U).each(function () {
        e(this).replaceWith(this.childNodes)
      }), mt.scrollTop(0);
      var t = [T, P, z];
      e.each(t, function (t, i) {
        e("." + i).removeClass(i)
      })
    }

    function pt(e, t, i) {
      l[e] = t, "internal" !== i && (Ut[e] = t)
    }

    function dt() {
      l.continuousVertical && (l.loopTop || l.loopBottom) && (l.continuousVertical = !1, ft("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), l.scrollBar && l.scrollOverflow && ft("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), l.continuousVertical && l.scrollBar && (l.continuousVertical = !1, ft("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), e.each(l.anchors, function (t, i) {
        (e("#" + i).length || e('[name="' + i + '"]').length) && ft("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")
      })
    }

    function ft(e, t) {
      console && console[e] && console[e]("fullPage: " + t)
    }

    var mt = e("html, body"), Et = e("body"), gt = e.fn.fullpage;
    l = e.extend({
      menu: !1,
      anchors: [],
      lockAnchors: !1,
      navigation: !1,
      navigationPosition: "right",
      navigationTooltips: [],
      showActiveTooltip: !1,
      slidesNavigation: !1,
      slidesNavPosition: "bottom",
      scrollBar: !1,
      css3: !0,
      scrollingSpeed: 700,
      autoScrolling: !0,
      fitToSection: !0,
      fitToSectionDelay: 1e3,
      easing: "easeInOutCubic",
      easingcss3: "ease",
      loopBottom: !1,
      loopTop: !1,
      loopHorizontal: !0,
      continuousVertical: !1,
      normalScrollElements: null,
      scrollOverflow: !1,
      scrollOverflowHandler: o,
      touchSensitivity: 5,
      normalScrollElementTouchThreshold: 5,
      keyboardScrolling: !0,
      animateAnchor: !0,
      recordHistory: !0,
      controlArrows: !0,
      controlArrowColor: "#fff",
      verticalCentered: !0,
      resize: !1,
      sectionsColor: [],
      paddingTop: 0,
      paddingBottom: 0,
      fixedElements: null,
      responsive: 0,
      responsiveWidth: 0,
      responsiveHeight: 0,
      sectionSelector: y,
      slideSelector: D,
      afterLoad: null,
      onLeave: null,
      afterRender: null,
      afterResize: null,
      afterReBuild: null,
      afterSlideLoad: null,
      onSlideLeave: null
    }, l), dt(), e.extend(e.easing, {
      easeInOutCubic: function (e, t, i, r, n) {
        return (t /= n / 2) < 1 ? r / 2 * t * t * t + i : r / 2 * ((t -= 2) * t * t + 2) + i
      }
    }), e.extend(e.easing, {
      easeInQuart: function (e, t, i, r, n) {
        return r * (t /= n) * t * t * t + i
      }
    }), gt.setAutoScrolling = function (t, i) {
      pt("autoScrolling", t, i);
      var r = e(R);
      l.autoScrolling && !l.scrollBar ? (mt.css({
        overflow: "hidden",
        height: "100%"
      }), gt.setRecordHistory(Ut.recordHistory, "internal"), Ht.css({
        "-ms-touch-action": "none",
        "touch-action": "none"
      }), r.length && lt(r.position().top)) : (mt.css({
        overflow: "visible",
        height: "initial"
      }), gt.setRecordHistory(!1, "internal"), Ht.css({
        "-ms-touch-action": "",
        "touch-action": ""
      }), lt(0), r.length && mt.scrollTop(r.position().top))
    }, gt.setRecordHistory = function (e, t) {
      pt("recordHistory", e, t)
    }, gt.setScrollingSpeed = function (e, t) {
      pt("scrollingSpeed", e, t)
    }, gt.setFitToSection = function (e, t) {
      pt("fitToSection", e, t)
    }, gt.setLockAnchors = function (e) {
      l.lockAnchors = e
    }, gt.setMouseWheelScrolling = function (e) {
      e ? it() : tt()
    }, gt.setAllowScrolling = function (t, i) {
      "undefined" != typeof i ? (i = i.replace(/ /g, "").split(","), e.each(i, function (e, i) {
        ct(t, i, "m")
      })) : t ? (gt.setMouseWheelScrolling(!0), rt()) : (gt.setMouseWheelScrolling(!1), nt())
    }, gt.setKeyboardScrolling = function (t, i) {
      "undefined" != typeof i ? (i = i.replace(/ /g, "").split(","), e.each(i, function (e, i) {
        ct(t, i, "k")
      })) : l.keyboardScrolling = t
    }, gt.moveSectionUp = function () {
      var t = e(R).prev(x);
      t.length || !l.loopTop && !l.continuousVertical || (t = e(x).last()), t.length && me(t, null, !0)
    }, gt.moveSectionDown = function () {
      var t = e(R).next(x);
      t.length || !l.loopBottom && !l.continuousVertical || (t = e(x).first()), t.length && me(t, null, !1)
    }, gt.silentMoveTo = function (e, t) {
      requestAnimFrame(function () {
        gt.setScrollingSpeed(0, "internal")
      }), gt.moveTo(e, t), requestAnimFrame(function () {
        gt.setScrollingSpeed(Ut.scrollingSpeed, "internal")
      })
    }, gt.moveTo = function (e, t) {
      var i = Ge(e);
      "undefined" != typeof t ? qe(e, t) : i.length > 0 && me(i)
    }, gt.moveSlideRight = function (e) {
      de("next", e)
    }, gt.moveSlideLeft = function (e) {
      de("prev", e)
    }, gt.reBuild = function (i) {
      if (!Ht.hasClass(f)) {
        _t = !0, requestAnimFrame(function () {
          _t = !0
        });
        var r = t.outerWidth;
        wt = ee.height(), l.resize && ke(wt, r), e(x).each(function () {
          var t = e(this).find(U), i = e(this).find(F);
          l.verticalCentered && e(this).find(_).css("height", je(e(this)) + "px"), e(this).css("height", wt + "px"), l.scrollOverflow && (i.length ? i.each(function () {
            Ve(e(this))
          }) : Ve(e(this))), i.length > 1 && Ae(t, t.find(k))
        });
        var n = e(R), o = n.index(x);
        o && gt.silentMoveTo(o + 1), _t = !1, requestAnimFrame(function () {
          _t = !1
        }), e.isFunction(l.afterResize) && i && l.afterResize.call(Ht), e.isFunction(l.afterReBuild) && !i && l.afterReBuild.call(Ht)
      }
    }, gt.setResponsive = function (t) {
      var i = Et.hasClass(p);
      t ? i || (gt.setAutoScrolling(!1, "internal"), gt.setFitToSection(!1, "internal"), e(C).hide(), Et.addClass(p)) : i && (gt.setAutoScrolling(Ut.autoScrolling, "internal"), gt.setFitToSection(Ut.autoScrolling, "internal"), e(C).show(), Et.removeClass(p))
    };
    var vt, yt, Tt, xt = !1,
      Rt = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
      bt = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints, Ht = e(this),
      wt = ee.height(), _t = !1, St = !0, Mt = !0, Ct = [], At = {};
    At.m = {up: !0, down: !0, left: !0, right: !0}, At.k = e.extend(!0, {}, At.m);
    var Lt, Dt, Pt, Ft, kt, Nt, Ut = e.extend(!0, {}, l);
    e(this).length && h();
    var zt = !1;
    ee.on("scroll", oe);
    var Ot = 0, Bt = 0, Vt = 0, It = 0, jt = (new Date).getTime();
    t.requestAnimFrame = function () {
      return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function (e) {
        e()
      }
    }(), ee.on("hashchange", _e), te.keydown(Se), te.keyup(function (e) {
      St && (Tt = e.ctrlKey)
    }), e(t).blur(function () {
      St = !1, Tt = !1
    });
    var Nt;
    Ht.mousedown(function (e) {
      2 == e.which && (Wt = e.pageY, Ht.on("mousemove", Ce))
    }), Ht.mouseup(function (e) {
      2 == e.which && Ht.off("mousemove")
    });
    var Wt = 0;
    te.on("click touchstart", C + " a", function (t) {
      t.preventDefault();
      var i = e(this).parent().index();
      me(e(x).eq(i))
    }), te.on("click touchstart", j, function (t) {
      t.preventDefault();
      var i = e(this).closest(x).find(U), r = i.find(F).eq(e(this).closest("li").index());
      Ae(i, r)
    }), l.normalScrollElements && (te.on("mouseenter", l.normalScrollElements, function () {
      gt.setMouseWheelScrolling(!1)
    }), te.on("mouseleave", l.normalScrollElements, function () {
      gt.setMouseWheelScrolling(!0)
    })), e(x).on("click touchstart", G, function () {
      var t = e(this).closest(x);
      e(this).hasClass(X) ? At.m.left && gt.moveSlideLeft(t) : At.m.right && gt.moveSlideRight(t)
    }), ee.resize(Le);
    var Gt = wt;
    gt.destroy = function (t) {
      gt.setAutoScrolling(!1, "internal"), gt.setAllowScrolling(!1), gt.setKeyboardScrolling(!1), Ht.addClass(f), clearTimeout(Pt), clearTimeout(Dt), clearTimeout(Lt), clearTimeout(Ft), clearTimeout(kt), ee.off("scroll", oe).off("hashchange", _e).off("resize", Le), te.off("click", C + " a").off("mouseenter", C + " li").off("mouseleave", C + " li").off("click", j).off("mouseover", l.normalScrollElements).off("mouseout", l.normalScrollElements), e(x).off("click", G), clearTimeout(Pt), clearTimeout(Dt), t && ut()
    }
  };
  var ie = {
    afterRender: function (e) {
      var t = e.find(N), i = e.find(h);
      t.length && (i = t.find(k)), i.mouseover()
    }, create: function (e, t) {
      e.find(h).slimScroll({allowPageScroll: !0, height: t + "px", size: "10px", alwaysVisible: !0})
    }, isScrolled: function (e, t) {
      return "top" === e ? !t.scrollTop() : "bottom" === e ? t.scrollTop() + 1 + t.innerHeight() >= t[0].scrollHeight : void 0
    }, scrollable: function (e) {
      return e.find(U).length ? e.find(k).find(h) : e.find(h)
    }, scrollHeight: function (e) {
      return e.find(h).get(0).scrollHeight
    }, remove: function (e) {
      e.find(h).children().first().unwrap().unwrap(), e.find(c).remove(), e.find(u).remove()
    }, update: function (e, t) {
      e.find(h).css("height", t + "px").parent().css("height", t + "px")
    }, wrapContent: function () {
      return '<div class="' + l + '"></div>'
    }
  };
  o = ie
}), function (e, t, i) {
  function r(e, i) {
    this.wrapper = "string" == typeof e ? t.querySelector(e) : e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
      resizeScrollbars: !0,
      mouseWheelSpeed: 20,
      snapThreshold: .334,
      startX: 0,
      startY: 0,
      scrollY: !0,
      directionLockThreshold: 5,
      momentum: !0,
      bounce: !0,
      bounceTime: 600,
      bounceEasing: "",
      preventDefault: !0,
      preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/},
      HWCompositing: !0,
      useTransition: !0,
      useTransform: !0
    };
    for (var r in i) this.options[r] = i[r];
    this.translateZ = this.options.HWCompositing && s.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = s.hasTransition && this.options.useTransition, this.options.useTransform = s.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? s.ease[this.options.bounceEasing] || s.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
  }

  function n(e, i, r) {
    var n = t.createElement("div"), o = t.createElement("div");
    return r === !0 && (n.style.cssText = "position:absolute;z-index:9999", o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), o.className = "iScrollIndicator", "h" == e ? (r === !0 && (n.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", o.style.height = "100%"), n.className = "iScrollHorizontalScrollbar") : (r === !0 && (n.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", o.style.width = "100%"), n.className = "iScrollVerticalScrollbar"), n.style.cssText += ";overflow:hidden", i || (n.style.pointerEvents = "none"), n.appendChild(o), n
  }

  function o(i, r) {
    this.wrapper = "string" == typeof r.el ? t.querySelector(r.el) : r.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = i, this.options = {
      listenX: !0,
      listenY: !0,
      interactive: !1,
      resize: !0,
      defaultScrollbars: !1,
      shrink: !1,
      fade: !1,
      speedRatioX: 0,
      speedRatioY: 0
    };
    for (var n in r) this.options[n] = r[n];
    this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (s.addEvent(this.indicator, "touchstart", this), s.addEvent(e, "touchend", this)), this.options.disablePointer || (s.addEvent(this.indicator, s.prefixPointerEvent("pointerdown"), this), s.addEvent(e, s.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (s.addEvent(this.indicator, "mousedown", this), s.addEvent(e, "mouseup", this))), this.options.fade && (this.wrapperStyle[s.style.transform] = this.scroller.translateZ, this.wrapperStyle[s.style.transitionDuration] = s.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
  }

  var a = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) {
    e.setTimeout(t, 1e3 / 60)
  }, s = function () {
    function r(e) {
      return a === !1 ? !1 : "" === a ? e : a + e.charAt(0).toUpperCase() + e.substr(1)
    }

    var n = {}, o = t.createElement("div").style, a = function () {
      for (var e, t = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, r = t.length; r > i; i++) if (e = t[i] + "ransform", e in o) return t[i].substr(0, t[i].length - 1);
      return !1
    }();
    n.getTime = Date.now || function () {
      return (new Date).getTime()
    }, n.extend = function (e, t) {
      for (var i in t) e[i] = t[i]
    }, n.addEvent = function (e, t, i, r) {
      e.addEventListener(t, i, !!r)
    }, n.removeEvent = function (e, t, i, r) {
      e.removeEventListener(t, i, !!r)
    }, n.prefixPointerEvent = function (t) {
      return e.MSPointerEvent ? "MSPointer" + t.charAt(9).toUpperCase() + t.substr(10) : t
    }, n.momentum = function (e, t, r, n, o, a) {
      var s, l, h = e - t, c = i.abs(h) / r;
      return a = void 0 === a ? 6e-4 : a, s = e + c * c / (2 * a) * (0 > h ? -1 : 1), l = c / a, n > s ? (s = o ? n - o / 2.5 * (c / 8) : n, h = i.abs(s - e), l = h / c) : s > 0 && (s = o ? o / 2.5 * (c / 8) : 0, h = i.abs(e) + s, l = h / c), {
        destination: i.round(s),
        duration: l
      }
    };
    var s = r("transform");
    return n.extend(n, {
      hasTransform: s !== !1,
      hasPerspective: r("perspective") in o,
      hasTouch: "ontouchstart" in e,
      hasPointer: e.PointerEvent || e.MSPointerEvent,
      hasTransition: r("transition") in o
    }), n.isBadAndroid = /Android /.test(e.navigator.appVersion) && !/Chrome\/\d/.test(e.navigator.appVersion), n.extend(n.style = {}, {
      transform: s,
      transitionTimingFunction: r("transitionTimingFunction"),
      transitionDuration: r("transitionDuration"),
      transitionDelay: r("transitionDelay"),
      transformOrigin: r("transformOrigin")
    }), n.hasClass = function (e, t) {
      var i = new RegExp("(^|\\s)" + t + "(\\s|$)");
      return i.test(e.className)
    }, n.addClass = function (e, t) {
      if (!n.hasClass(e, t)) {
        var i = e.className.split(" ");
        i.push(t), e.className = i.join(" ")
      }
    }, n.removeClass = function (e, t) {
      if (n.hasClass(e, t)) {
        var i = new RegExp("(^|\\s)" + t + "(\\s|$)", "g");
        e.className = e.className.replace(i, " ")
      }
    }, n.offset = function (e) {
      for (var t = -e.offsetLeft, i = -e.offsetTop; e = e.offsetParent;) t -= e.offsetLeft, i -= e.offsetTop;
      return {left: t, top: i}
    }, n.preventDefaultException = function (e, t) {
      for (var i in t) if (t[i].test(e[i])) return !0;
      return !1
    }, n.extend(n.eventType = {}, {
      touchstart: 1,
      touchmove: 1,
      touchend: 1,
      mousedown: 2,
      mousemove: 2,
      mouseup: 2,
      pointerdown: 3,
      pointermove: 3,
      pointerup: 3,
      MSPointerDown: 3,
      MSPointerMove: 3,
      MSPointerUp: 3
    }), n.extend(n.ease = {}, {
      quadratic: {
        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function (e) {
          return e * (2 - e)
        }
      }, circular: {
        style: "cubic-bezier(0.1, 0.57, 0.1, 1)", fn: function (e) {
          return i.sqrt(1 - --e * e)
        }
      }, back: {
        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", fn: function (e) {
          var t = 4;
          return (e -= 1) * e * ((t + 1) * e + t) + 1
        }
      }, bounce: {
        style: "", fn: function (e) {
          return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }
      }, elastic: {
        style: "", fn: function (e) {
          var t = .22, r = .4;
          return 0 === e ? 0 : 1 == e ? 1 : r * i.pow(2, -10 * e) * i.sin((e - t / 4) * (2 * i.PI) / t) + 1
        }
      }
    }), n.tap = function (e, i) {
      var r = t.createEvent("Event");
      r.initEvent(i, !0, !0), r.pageX = e.pageX, r.pageY = e.pageY, e.target.dispatchEvent(r)
    }, n.click = function (e) {
      var i, r = e.target;
      /(SELECT|INPUT|TEXTAREA)/i.test(r.tagName) || (i = t.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, e.view, 1, r.screenX, r.screenY, r.clientX, r.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), i._constructed = !0, r.dispatchEvent(i))
    }, n
  }();
  r.prototype = {
    version: "5.1.3", _init: function () {
      this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
    }, destroy: function () {
      this._initEvents(!0), this._execEvent("destroy")
    }, _transitionEnd: function (e) {
      e.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
    }, _start: function (e) {
      if ((1 == s.eventType[e.type] || 0 === e.button) && this.enabled && (!this.initiated || s.eventType[e.type] === this.initiated)) {
        !this.options.preventDefault || s.isBadAndroid || s.preventDefaultException(e.target, this.options.preventDefaultException) || e.preventDefault();
        var t, r = e.touches ? e.touches[0] : e;
        this.initiated = s.eventType[e.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = s.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, t = this.getComputedPosition(), this._translate(i.round(t.x), i.round(t.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = r.pageX, this.pointY = r.pageY, this._execEvent("beforeScrollStart")
      }
    }, _move: function (e) {
      if (this.enabled && s.eventType[e.type] === this.initiated) {
        this.options.preventDefault && e.preventDefault();
        var t, r, n, o, a = e.touches ? e.touches[0] : e, l = a.pageX - this.pointX, h = a.pageY - this.pointY,
          c = s.getTime();
        if (this.pointX = a.pageX, this.pointY = a.pageY, this.distX += l, this.distY += h, n = i.abs(this.distX), o = i.abs(this.distY), !(c - this.endTime > 300 && 10 > n && 10 > o)) {
          if (this.directionLocked || this.options.freeScroll || (n > o + this.options.directionLockThreshold ? this.directionLocked = "h" : o >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
            if ("vertical" == this.options.eventPassthrough) e.preventDefault(); else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
            h = 0
          } else if ("v" == this.directionLocked) {
            if ("horizontal" == this.options.eventPassthrough) e.preventDefault(); else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
            l = 0
          }
          l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, t = this.x + l, r = this.y + h, (t > 0 || t < this.maxScrollX) && (t = this.options.bounce ? this.x + l / 3 : t > 0 ? 0 : this.maxScrollX), (r > 0 || r < this.maxScrollY) && (r = this.options.bounce ? this.y + h / 3 : r > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : 0 > l ? 1 : 0, this.directionY = h > 0 ? -1 : 0 > h ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(t, r), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
        }
      }
    }, _end: function (e) {
      if (this.enabled && s.eventType[e.type] === this.initiated) {
        this.options.preventDefault && !s.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
        var t, r, n = (e.changedTouches ? e.changedTouches[0] : e, s.getTime() - this.startTime), o = i.round(this.x),
          a = i.round(this.y), l = i.abs(o - this.startX), h = i.abs(a - this.startY), c = 0, u = "";
        if (this.isInTransition = 0, this.initiated = 0, this.endTime = s.getTime(), !this.resetPosition(this.options.bounceTime)) {
          if (this.scrollTo(o, a), !this.moved) return this.options.tap && s.tap(e, this.options.tap), this.options.click && s.click(e), void this._execEvent("scrollCancel");
          if (this._events.flick && 200 > n && 100 > l && 100 > h) return void this._execEvent("flick");
          if (this.options.momentum && 300 > n && (t = this.hasHorizontalScroll ? s.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
              destination: o,
              duration: 0
            }, r = this.hasVerticalScroll ? s.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
              destination: a,
              duration: 0
            }, o = t.destination, a = r.destination, c = i.max(t.duration, r.duration), this.isInTransition = 1), this.options.snap) {
            var p = this._nearestSnap(o, a);
            this.currentPage = p, c = this.options.snapSpeed || i.max(i.max(i.min(i.abs(o - p.x), 1e3), i.min(i.abs(a - p.y), 1e3)), 300), o = p.x, a = p.y, this.directionX = 0, this.directionY = 0, u = this.options.bounceEasing
          }
          return o != this.x || a != this.y ? ((o > 0 || o < this.maxScrollX || a > 0 || a < this.maxScrollY) && (u = s.ease.quadratic), void this.scrollTo(o, a, c, u)) : void this._execEvent("scrollEnd")
        }
      }
    }, _resize: function () {
      var e = this;
      clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function () {
        e.refresh()
      }, this.options.resizePolling)
    }, resetPosition: function (e) {
      var t = this.x, i = this.y;
      return e = e || 0, !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), t == this.x && i == this.y ? !1 : (this.scrollTo(t, i, e, this.options.bounceEasing), !0)
    }, disable: function () {
      this.enabled = !1
    }, enable: function () {
      this.enabled = !0
    }, refresh: function () {
      this.wrapper.offsetHeight;
      this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = s.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
    }, on: function (e, t) {
      this._events[e] || (this._events[e] = []), this._events[e].push(t)
    }, off: function (e, t) {
      if (this._events[e]) {
        var i = this._events[e].indexOf(t);
        i > -1 && this._events[e].splice(i, 1)
      }
    }, _execEvent: function (e) {
      if (this._events[e]) {
        var t = 0, i = this._events[e].length;
        if (i) for (; i > t; t++) this._events[e][t].apply(this, [].slice.call(arguments, 1))
      }
    }, scrollBy: function (e, t, i, r) {
      e = this.x + e, t = this.y + t, i = i || 0, this.scrollTo(e, t, i, r)
    }, scrollTo: function (e, t, i, r) {
      r = r || s.ease.circular, this.isInTransition = this.options.useTransition && i > 0, !i || this.options.useTransition && r.style ? (this._transitionTimingFunction(r.style), this._transitionTime(i), this._translate(e, t)) : this._animate(e, t, i, r.fn)
    }, scrollToElement: function (e, t, r, n, o) {
      if (e = e.nodeType ? e : this.scroller.querySelector(e)) {
        var a = s.offset(e);
        a.left -= this.wrapperOffset.left, a.top -= this.wrapperOffset.top, r === !0 && (r = i.round(e.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), n === !0 && (n = i.round(e.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), a.left -= r || 0, a.top -= n || 0, a.left = a.left > 0 ? 0 : a.left < this.maxScrollX ? this.maxScrollX : a.left, a.top = a.top > 0 ? 0 : a.top < this.maxScrollY ? this.maxScrollY : a.top, t = void 0 === t || null === t || "auto" === t ? i.max(i.abs(this.x - a.left), i.abs(this.y - a.top)) : t, this.scrollTo(a.left, a.top, t, o)
      }
    }, _transitionTime: function (e) {
      if (e = e || 0, this.scrollerStyle[s.style.transitionDuration] = e + "ms", !e && s.isBadAndroid && (this.scrollerStyle[s.style.transitionDuration] = "0.001s"), this.indicators) for (var t = this.indicators.length; t--;) this.indicators[t].transitionTime(e)
    }, _transitionTimingFunction: function (e) {
      if (this.scrollerStyle[s.style.transitionTimingFunction] = e, this.indicators) for (var t = this.indicators.length; t--;) this.indicators[t].transitionTimingFunction(e)
    }, _translate: function (e, t) {
      if (this.options.useTransform ? this.scrollerStyle[s.style.transform] = "translate(" + e + "px," + t + "px)" + this.translateZ : (e = i.round(e), t = i.round(t), this.scrollerStyle.left = e + "px", this.scrollerStyle.top = t + "px"), this.x = e, this.y = t, this.indicators) for (var r = this.indicators.length; r--;) this.indicators[r].updatePosition()
    }, _initEvents: function (t) {
      var i = t ? s.removeEvent : s.addEvent, r = this.options.bindToWrapper ? this.wrapper : e;
      i(e, "orientationchange", this), i(e, "resize", this), this.options.click && i(this.wrapper, "click", this, !0), this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(r, "mousemove", this), i(r, "mousecancel", this), i(r, "mouseup", this)), s.hasPointer && !this.options.disablePointer && (i(this.wrapper, s.prefixPointerEvent("pointerdown"), this), i(r, s.prefixPointerEvent("pointermove"), this), i(r, s.prefixPointerEvent("pointercancel"), this), i(r, s.prefixPointerEvent("pointerup"), this)), s.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(r, "touchmove", this), i(r, "touchcancel", this), i(r, "touchend", this)), i(this.scroller, "transitionend", this), i(this.scroller, "webkitTransitionEnd", this), i(this.scroller, "oTransitionEnd", this), i(this.scroller, "MSTransitionEnd", this)
    }, getComputedPosition: function () {
      var t, i, r = e.getComputedStyle(this.scroller, null);
      return this.options.useTransform ? (r = r[s.style.transform].split(")")[0].split(", "), t = +(r[12] || r[4]), i = +(r[13] || r[5])) : (t = +r.left.replace(/[^-\d.]/g, ""), i = +r.top.replace(/[^-\d.]/g, "")), {
        x: t,
        y: i
      }
    }, _initIndicators: function () {
      function e(e) {
        for (var t = s.indicators.length; t--;) e.call(s.indicators[t])
      }

      var t, i = this.options.interactiveScrollbars, r = "string" != typeof this.options.scrollbars, a = [], s = this;
      this.indicators = [], this.options.scrollbars && (this.options.scrollY && (t = {
        el: n("v", i, this.options.scrollbars),
        interactive: i,
        defaultScrollbars: !0,
        customStyle: r,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenX: !1
      }, this.wrapper.appendChild(t.el), a.push(t)), this.options.scrollX && (t = {
        el: n("h", i, this.options.scrollbars),
        interactive: i,
        defaultScrollbars: !0,
        customStyle: r,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenY: !1
      }, this.wrapper.appendChild(t.el), a.push(t))), this.options.indicators && (a = a.concat(this.options.indicators));
      for (var l = a.length; l--;) this.indicators.push(new o(this, a[l]));
      this.options.fadeScrollbars && (this.on("scrollEnd", function () {
        e(function () {
          this.fade()
        })
      }), this.on("scrollCancel", function () {
        e(function () {
          this.fade()
        })
      }), this.on("scrollStart", function () {
        e(function () {
          this.fade(1)
        })
      }), this.on("beforeScrollStart", function () {
        e(function () {
          this.fade(1, !0)
        })
      })), this.on("refresh", function () {
        e(function () {
          this.refresh()
        })
      }), this.on("destroy", function () {
        e(function () {
          this.destroy()
        }), delete this.indicators
      })
    }, _initWheel: function () {
      s.addEvent(this.wrapper, "wheel", this), s.addEvent(this.wrapper, "mousewheel", this), s.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function () {
        s.removeEvent(this.wrapper, "wheel", this), s.removeEvent(this.wrapper, "mousewheel", this), s.removeEvent(this.wrapper, "DOMMouseScroll", this)
      })
    }, _wheel: function (e) {
      if (this.enabled) {
        e.preventDefault(), e.stopPropagation();
        var t, r, n, o, a = this;
        if (void 0 === this.wheelTimeout && a._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function () {
            a._execEvent("scrollEnd"), a.wheelTimeout = void 0
          }, 400), "deltaX" in e) 1 === e.deltaMode ? (t = -e.deltaX * this.options.mouseWheelSpeed, r = -e.deltaY * this.options.mouseWheelSpeed) : (t = -e.deltaX, r = -e.deltaY); else if ("wheelDeltaX" in e) t = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed, r = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed; else if ("wheelDelta" in e) t = r = e.wheelDelta / 120 * this.options.mouseWheelSpeed; else {
          if (!("detail" in e)) return;
          t = r = -e.detail / 3 * this.options.mouseWheelSpeed
        }
        if (t *= this.options.invertWheelDirection, r *= this.options.invertWheelDirection, this.hasVerticalScroll || (t = r, r = 0), this.options.snap) return n = this.currentPage.pageX, o = this.currentPage.pageY, t > 0 ? n-- : 0 > t && n++, r > 0 ? o-- : 0 > r && o++, void this.goToPage(n, o);
        n = this.x + i.round(this.hasHorizontalScroll ? t : 0), o = this.y + i.round(this.hasVerticalScroll ? r : 0), n > 0 ? n = 0 : n < this.maxScrollX && (n = this.maxScrollX), o > 0 ? o = 0 : o < this.maxScrollY && (o = this.maxScrollY), this.scrollTo(n, o, 0)
      }
    }, _initSnap: function () {
      this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function () {
        var e, t, r, n, o, a, s = 0, l = 0, h = 0, c = this.options.snapStepX || this.wrapperWidth,
          u = this.options.snapStepY || this.wrapperHeight;
        if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
          if (this.options.snap === !0) for (r = i.round(c / 2), n = i.round(u / 2); h > -this.scrollerWidth;) {
            for (this.pages[s] = [], e = 0, o = 0; o > -this.scrollerHeight;) this.pages[s][e] = {
              x: i.max(h, this.maxScrollX),
              y: i.max(o, this.maxScrollY),
              width: c,
              height: u,
              cx: h - r,
              cy: o - n
            }, o -= u, e++;
            h -= c, s++
          } else for (a = this.options.snap, e = a.length, t = -1; e > s; s++) (0 === s || a[s].offsetLeft <= a[s - 1].offsetLeft) && (l = 0, t++), this.pages[l] || (this.pages[l] = []), h = i.max(-a[s].offsetLeft, this.maxScrollX), o = i.max(-a[s].offsetTop, this.maxScrollY), r = h - i.round(a[s].offsetWidth / 2), n = o - i.round(a[s].offsetHeight / 2), this.pages[l][t] = {
            x: h,
            y: o,
            width: a[s].offsetWidth,
            height: a[s].offsetHeight,
            cx: r,
            cy: n
          }, h > this.maxScrollX && l++;
          this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
        }
      }), this.on("flick", function () {
        var e = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
        this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, e)
      })
    }, _nearestSnap: function (e, t) {
      if (!this.pages.length) return {x: 0, y: 0, pageX: 0, pageY: 0};
      var r = 0, n = this.pages.length, o = 0;
      if (i.abs(e - this.absStartX) < this.snapThresholdX && i.abs(t - this.absStartY) < this.snapThresholdY) return this.currentPage;
      for (e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), t > 0 ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY); n > r; r++) if (e >= this.pages[r][0].cx) {
        e = this.pages[r][0].x;
        break
      }
      for (n = this.pages[r].length; n > o; o++) if (t >= this.pages[0][o].cy) {
        t = this.pages[0][o].y;
        break
      }
      return r == this.currentPage.pageX && (r += this.directionX, 0 > r ? r = 0 : r >= this.pages.length && (r = this.pages.length - 1), e = this.pages[r][0].x), o == this.currentPage.pageY && (o += this.directionY, 0 > o ? o = 0 : o >= this.pages[0].length && (o = this.pages[0].length - 1), t = this.pages[0][o].y), {
        x: e,
        y: t,
        pageX: r,
        pageY: o
      }
    }, goToPage: function (e, t, r, n) {
      n = n || this.options.bounceEasing, e >= this.pages.length ? e = this.pages.length - 1 : 0 > e && (e = 0), t >= this.pages[e].length ? t = this.pages[e].length - 1 : 0 > t && (t = 0);
      var o = this.pages[e][t].x, a = this.pages[e][t].y;
      r = void 0 === r ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(o - this.x), 1e3), i.min(i.abs(a - this.y), 1e3)), 300) : r, this.currentPage = {
        x: o,
        y: a,
        pageX: e,
        pageY: t
      }, this.scrollTo(o, a, r, n)
    }, next: function (e, t) {
      var i = this.currentPage.pageX, r = this.currentPage.pageY;
      i++, i >= this.pages.length && this.hasVerticalScroll && (i = 0, r++), this.goToPage(i, r, e, t)
    }, prev: function (e, t) {
      var i = this.currentPage.pageX, r = this.currentPage.pageY;
      i--, 0 > i && this.hasVerticalScroll && (i = 0, r--), this.goToPage(i, r, e, t)
    }, _initKeys: function (t) {
      var i, r = {pageUp: 33, pageDown: 34, end: 35, home: 36, left: 37, up: 38, right: 39, down: 40};
      if ("object" == typeof this.options.keyBindings) for (i in this.options.keyBindings) "string" == typeof this.options.keyBindings[i] && (this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0)); else this.options.keyBindings = {};
      for (i in r) this.options.keyBindings[i] = this.options.keyBindings[i] || r[i];
      s.addEvent(e, "keydown", this), this.on("destroy", function () {
        s.removeEvent(e, "keydown", this)
      })
    }, _key: function (e) {
      if (this.enabled) {
        var t, r = this.options.snap, n = r ? this.currentPage.pageX : this.x, o = r ? this.currentPage.pageY : this.y,
          a = s.getTime(), l = this.keyTime || 0, h = .25;
        switch (this.options.useTransition && this.isInTransition && (t = this.getComputedPosition(), this._translate(i.round(t.x), i.round(t.y)), this.isInTransition = !1), this.keyAcceleration = 200 > a - l ? i.min(this.keyAcceleration + h, 50) : 0, e.keyCode) {
          case this.options.keyBindings.pageUp:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? n += r ? 1 : this.wrapperWidth : o += r ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.pageDown:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? n -= r ? 1 : this.wrapperWidth : o -= r ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.end:
            n = r ? this.pages.length - 1 : this.maxScrollX, o = r ? this.pages[0].length - 1 : this.maxScrollY;
            break;
          case this.options.keyBindings.home:
            n = 0, o = 0;
            break;
          case this.options.keyBindings.left:
            n += r ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.up:
            o += r ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.right:
            n -= r ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.down:
            o -= r ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          default:
            return
        }
        if (r) return void this.goToPage(n, o);
        n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollX && (n = this.maxScrollX, this.keyAcceleration = 0), o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollY && (o = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(n, o, 0), this.keyTime = a
      }
    }, _animate: function (e, t, i, r) {
      function n() {
        var p, d, f, m = s.getTime();
        return m >= u ? (o.isAnimating = !1, o._translate(e, t), void(o.resetPosition(o.options.bounceTime) || o._execEvent("scrollEnd"))) : (m = (m - c) / i, f = r(m), p = (e - l) * f + l, d = (t - h) * f + h, o._translate(p, d), void(o.isAnimating && a(n)))
      }

      var o = this, l = this.x, h = this.y, c = s.getTime(), u = c + i;
      this.isAnimating = !0, n()
    }, handleEvent: function (e) {
      switch (e.type) {
        case"touchstart":
        case"pointerdown":
        case"MSPointerDown":
        case"mousedown":
          this._start(e);
          break;
        case"touchmove":
        case"pointermove":
        case"MSPointerMove":
        case"mousemove":
          this._move(e);
          break;
        case"touchend":
        case"pointerup":
        case"MSPointerUp":
        case"mouseup":
        case"touchcancel":
        case"pointercancel":
        case"MSPointerCancel":
        case"mousecancel":
          this._end(e);
          break;
        case"orientationchange":
        case"resize":
          this._resize();
          break;
        case"transitionend":
        case"webkitTransitionEnd":
        case"oTransitionEnd":
        case"MSTransitionEnd":
          this._transitionEnd(e);
          break;
        case"wheel":
        case"DOMMouseScroll":
        case"mousewheel":
          this._wheel(e);
          break;
        case"keydown":
          this._key(e);
          break;
        case"click":
          e._constructed || (e.preventDefault(), e.stopPropagation())
      }
    }
  }, o.prototype = {
    handleEvent: function (e) {
      switch (e.type) {
        case"touchstart":
        case"pointerdown":
        case"MSPointerDown":
        case"mousedown":
          this._start(e);
          break;
        case"touchmove":
        case"pointermove":
        case"MSPointerMove":
        case"mousemove":
          this._move(e);
          break;
        case"touchend":
        case"pointerup":
        case"MSPointerUp":
        case"mouseup":
        case"touchcancel":
        case"pointercancel":
        case"MSPointerCancel":
        case"mousecancel":
          this._end(e)
      }
    }, destroy: function () {
      this.options.interactive && (s.removeEvent(this.indicator, "touchstart", this), s.removeEvent(this.indicator, s.prefixPointerEvent("pointerdown"), this), s.removeEvent(this.indicator, "mousedown", this), s.removeEvent(e, "touchmove", this), s.removeEvent(e, s.prefixPointerEvent("pointermove"), this), s.removeEvent(e, "mousemove", this), s.removeEvent(e, "touchend", this), s.removeEvent(e, s.prefixPointerEvent("pointerup"), this), s.removeEvent(e, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
    }, _start: function (t) {
      var i = t.touches ? t.touches[0] : t;
      t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = s.getTime(), this.options.disableTouch || s.addEvent(e, "touchmove", this), this.options.disablePointer || s.addEvent(e, s.prefixPointerEvent("pointermove"), this), this.options.disableMouse || s.addEvent(e, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
    }, _move: function (e) {
      var t, i, r, n, o = e.touches ? e.touches[0] : e;
      s.getTime();
      this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, t = o.pageX - this.lastPointX, this.lastPointX = o.pageX, i = o.pageY - this.lastPointY, this.lastPointY = o.pageY, r = this.x + t, n = this.y + i, this._pos(r, n), e.preventDefault(), e.stopPropagation()
    }, _end: function (t) {
      if (this.initiated) {
        if (this.initiated = !1, t.preventDefault(), t.stopPropagation(), s.removeEvent(e, "touchmove", this), s.removeEvent(e, s.prefixPointerEvent("pointermove"), this), s.removeEvent(e, "mousemove", this), this.scroller.options.snap) {
          var r = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
            n = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - r.x), 1e3), i.min(i.abs(this.scroller.y - r.y), 1e3)), 300);
          (this.scroller.x != r.x || this.scroller.y != r.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = r, this.scroller.scrollTo(r.x, r.y, n, this.scroller.options.bounceEasing))
        }
        this.moved && this.scroller._execEvent("scrollEnd")
      }
    }, transitionTime: function (e) {
      e = e || 0, this.indicatorStyle[s.style.transitionDuration] = e + "ms", !e && s.isBadAndroid && (this.indicatorStyle[s.style.transitionDuration] = "0.001s")
    }, transitionTimingFunction: function (e) {
      this.indicatorStyle[s.style.transitionTimingFunction] = e
    }, refresh: function () {
      this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (s.addClass(this.wrapper, "iScrollBothScrollbars"), s.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (s.removeClass(this.wrapper, "iScrollBothScrollbars"), s.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
      this.wrapper.offsetHeight;
      this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
    }, updatePosition: function () {
      var e = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
        t = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
      this.options.ignoreBoundaries || (e < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + e, 8), this.indicatorStyle.width = this.width + "px"), e = this.minBoundaryX) : e > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (e - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", e = this.maxPosX + this.indicatorWidth - this.width) : e = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), t < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * t, 8), this.indicatorStyle.height = this.height + "px"), t = this.minBoundaryY) : t > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", t = this.maxPosY + this.indicatorHeight - this.height) : t = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = e, this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[s.style.transform] = "translate(" + e + "px," + t + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = e + "px", this.indicatorStyle.top = t + "px")
    }, _pos: function (e, t) {
      0 > e ? e = 0 : e > this.maxPosX && (e = this.maxPosX), 0 > t ? t = 0 : t > this.maxPosY && (t = this.maxPosY), e = this.options.listenX ? i.round(e / this.sizeRatioX) : this.scroller.x, t = this.options.listenY ? i.round(t / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(e, t)
    }, fade: function (e, t) {
      if (!t || this.visible) {
        clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
        var i = e ? 250 : 500, r = e ? 0 : 300;
        e = e ? "1" : "0", this.wrapperStyle[s.style.transitionDuration] = i + "ms", this.fadeTimeout = setTimeout(function (e) {
          this.wrapperStyle.opacity = e, this.visible = +e
        }.bind(this, e), r)
      }
    }
  }, r.utils = s, "undefined" != typeof module && module.exports ? module.exports = r : e.IScroll = r
}(window, document, Math);
var THREE = {REVISION: "67dev"};
self.console = self.console || {
  info: function () {
  }, log: function () {
  }, debug: function () {
  }, warn: function () {
  }, error: function () {
  }
}, function () {
  for (var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !self.requestAnimationFrame; ++i) self.requestAnimationFrame = self[t[i] + "RequestAnimationFrame"], self.cancelAnimationFrame = self[t[i] + "CancelAnimationFrame"] || self[t[i] + "CancelRequestAnimationFrame"];
  void 0 === self.requestAnimationFrame && void 0 !== self.setTimeout && (self.requestAnimationFrame = function (t) {
    var i = Date.now(), r = Math.max(0, 16 - (i - e)), n = self.setTimeout(function () {
      t(i + r)
    }, r);
    return e = i + r, n
  }), void 0 === self.cancelAnimationFrame && void 0 !== self.clearTimeout && (self.cancelAnimationFrame = function (e) {
    self.clearTimeout(e)
  })
}(), THREE.CullFaceNone = 0, THREE.CullFaceBack = 1, THREE.CullFaceFront = 2, THREE.CullFaceFrontBack = 3, THREE.FrontFaceDirectionCW = 0, THREE.FrontFaceDirectionCCW = 1, THREE.BasicShadowMap = 0, THREE.PCFShadowMap = 1, THREE.PCFSoftShadowMap = 2, THREE.FrontSide = 0, THREE.BackSide = 1, THREE.DoubleSide = 2, THREE.NoShading = 0, THREE.FlatShading = 1, THREE.SmoothShading = 2, THREE.NoColors = 0, THREE.FaceColors = 1, THREE.VertexColors = 2, THREE.NoBlending = 0, THREE.NormalBlending = 1, THREE.AdditiveBlending = 2, THREE.SubtractiveBlending = 3, THREE.MultiplyBlending = 4, THREE.CustomBlending = 5, THREE.AddEquation = 100, THREE.SubtractEquation = 101, THREE.ReverseSubtractEquation = 102, THREE.ZeroFactor = 200, THREE.OneFactor = 201, THREE.SrcColorFactor = 202, THREE.OneMinusSrcColorFactor = 203, THREE.SrcAlphaFactor = 204, THREE.OneMinusSrcAlphaFactor = 205, THREE.DstAlphaFactor = 206, THREE.OneMinusDstAlphaFactor = 207, THREE.DstColorFactor = 208, THREE.OneMinusDstColorFactor = 209, THREE.SrcAlphaSaturateFactor = 210, THREE.MultiplyOperation = 0, THREE.MixOperation = 1, THREE.AddOperation = 2, THREE.UVMapping = function () {
}, THREE.CubeReflectionMapping = function () {
}, THREE.CubeRefractionMapping = function () {
}, THREE.SphericalReflectionMapping = function () {
}, THREE.SphericalRefractionMapping = function () {
}, THREE.RepeatWrapping = 1e3, THREE.ClampToEdgeWrapping = 1001, THREE.MirroredRepeatWrapping = 1002, THREE.NearestFilter = 1003, THREE.NearestMipMapNearestFilter = 1004, THREE.NearestMipMapLinearFilter = 1005, THREE.LinearFilter = 1006, THREE.LinearMipMapNearestFilter = 1007, THREE.LinearMipMapLinearFilter = 1008, THREE.UnsignedByteType = 1009, THREE.ByteType = 1010, THREE.ShortType = 1011, THREE.UnsignedShortType = 1012, THREE.IntType = 1013, THREE.UnsignedIntType = 1014, THREE.FloatType = 1015, THREE.UnsignedShort4444Type = 1016, THREE.UnsignedShort5551Type = 1017, THREE.UnsignedShort565Type = 1018, THREE.AlphaFormat = 1019, THREE.RGBFormat = 1020, THREE.RGBAFormat = 1021, THREE.LuminanceFormat = 1022, THREE.LuminanceAlphaFormat = 1023, THREE.RGB_S3TC_DXT1_Format = 2001, THREE.RGBA_S3TC_DXT1_Format = 2002, THREE.RGBA_S3TC_DXT3_Format = 2003, THREE.RGBA_S3TC_DXT5_Format = 2004, THREE.Color = function (e) {
  return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(e)
}, THREE.Color.prototype = {
  constructor: THREE.Color, r: 1, g: 1, b: 1, set: function (e) {
    return e instanceof THREE.Color ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this
  }, setHex: function (e) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (255 & e) / 255, this
  }, setRGB: function (e, t, i) {
    return this.r = e, this.g = t, this.b = i, this
  }, setHSL: function (e, t, i) {
    if (0 === t) this.r = this.g = this.b = i; else {
      var r = function (e, t, i) {
        return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? e + 6 * (t - e) * i : .5 > i ? t : 2 / 3 > i ? e + 6 * (t - e) * (2 / 3 - i) : e
      };
      t = .5 >= i ? i * (1 + t) : i + t - i * t, i = 2 * i - t, this.r = r(i, t, e + 1 / 3), this.g = r(i, t, e), this.b = r(i, t, e - 1 / 3)
    }
    return this
  }, setStyle: function (e) {
    return /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(e) ? (e = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(e), this.r = Math.min(255, parseInt(e[1], 10)) / 255, this.g = Math.min(255, parseInt(e[2], 10)) / 255, this.b = Math.min(255, parseInt(e[3], 10)) / 255, this) : /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(e) ? (e = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(e), this.r = Math.min(100, parseInt(e[1], 10)) / 100, this.g = Math.min(100, parseInt(e[2], 10)) / 100, this.b = Math.min(100, parseInt(e[3], 10)) / 100, this) : /^\#([0-9a-f]{6})$/i.test(e) ? (e = /^\#([0-9a-f]{6})$/i.exec(e), this.setHex(parseInt(e[1], 16)), this) : /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(e) ? (e = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e), this.setHex(parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3], 16)), this) : /^(\w+)$/i.test(e) ? (this.setHex(THREE.ColorKeywords[e]), this) : void 0
  }, copy: function (e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this
  }, copyGammaToLinear: function (e) {
    return this.r = e.r * e.r, this.g = e.g * e.g, this.b = e.b * e.b, this
  }, copyLinearToGamma: function (e) {
    return this.r = Math.sqrt(e.r), this.g = Math.sqrt(e.g), this.b = Math.sqrt(e.b), this
  }, convertGammaToLinear: function () {
    var e = this.r, t = this.g, i = this.b;
    return this.r = e * e, this.g = t * t, this.b = i * i, this
  }, convertLinearToGamma: function () {
    return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
  }, getHex: function () {
    return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
  }, getHexString: function () {
    return ("000000" + this.getHex().toString(16)).slice(-6)
  }, getHSL: function (e) {
    e = e || {h: 0, s: 0, l: 0};
    var t, i = this.r, r = this.g, n = this.b, o = Math.max(i, r, n), a = Math.min(i, r, n), s = (a + o) / 2;
    if (a === o) a = t = 0; else {
      var l = o - a, a = .5 >= s ? l / (o + a) : l / (2 - o - a);
      switch (o) {
        case i:
          t = (r - n) / l + (n > r ? 6 : 0);
          break;
        case r:
          t = (n - i) / l + 2;
          break;
        case n:
          t = (i - r) / l + 4
      }
      t /= 6
    }
    return e.h = t, e.s = a, e.l = s, e
  }, getStyle: function () {
    return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
  }, offsetHSL: function (e, t, i) {
    var r = this.getHSL();
    return r.h += e, r.s += t, r.l += i, this.setHSL(r.h, r.s, r.l), this
  }, add: function (e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this
  }, addColors: function (e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this
  }, addScalar: function (e) {
    return this.r += e, this.g += e, this.b += e, this
  }, multiply: function (e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this
  }, multiplyScalar: function (e) {
    return this.r *= e, this.g *= e, this.b *= e, this
  }, lerp: function (e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this
  }, equals: function (e) {
    return e.r === this.r && e.g === this.g && e.b === this.b
  }, fromArray: function (e) {
    return this.r = e[0], this.g = e[1], this.b = e[2], this
  }, toArray: function () {
    return [this.r, this.g, this.b]
  }, clone: function () {
    return (new THREE.Color).setRGB(this.r, this.g, this.b)
  }
}, THREE.ColorKeywords = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, THREE.Quaternion = function (e, t, i, r) {
  this._x = e || 0, this._y = t || 0, this._z = i || 0, this._w = void 0 !== r ? r : 1
}, THREE.Quaternion.prototype = {
  constructor: THREE.Quaternion,
  _x: 0,
  _y: 0,
  _z: 0,
  _w: 0,
  _euler: void 0,
  _updateEuler: function (e) {
    void 0 !== this._euler && this._euler.setFromQuaternion(this, void 0, !1)
  },
  get x() {
    return this._x
  },
  set x(e) {
    this._x = e, this._updateEuler()
  },
  get y() {
    return this._y
  },
  set y(e) {
    this._y = e, this._updateEuler()
  },
  get z() {
    return this._z
  },
  set z(e) {
    this._z = e, this._updateEuler()
  },
  get w() {
    return this._w
  },
  set w(e) {
    this._w = e, this._updateEuler()
  },
  set: function (e, t, i, r) {
    return this._x = e, this._y = t, this._z = i, this._w = r, this._updateEuler(), this
  },
  copy: function (e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._w = e._w, this._updateEuler(), this
  },
  setFromEuler: function (e, t) {
    if (!1 == e instanceof THREE.Euler) throw Error("ERROR: Quaternion's .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");
    var i = Math.cos(e._x / 2), r = Math.cos(e._y / 2), n = Math.cos(e._z / 2), o = Math.sin(e._x / 2),
      a = Math.sin(e._y / 2), s = Math.sin(e._z / 2);
    return "XYZ" === e.order ? (this._x = o * r * n + i * a * s, this._y = i * a * n - o * r * s, this._z = i * r * s + o * a * n, this._w = i * r * n - o * a * s) : "YXZ" === e.order ? (this._x = o * r * n + i * a * s, this._y = i * a * n - o * r * s, this._z = i * r * s - o * a * n, this._w = i * r * n + o * a * s) : "ZXY" === e.order ? (this._x = o * r * n - i * a * s, this._y = i * a * n + o * r * s, this._z = i * r * s + o * a * n, this._w = i * r * n - o * a * s) : "ZYX" === e.order ? (this._x = o * r * n - i * a * s, this._y = i * a * n + o * r * s, this._z = i * r * s - o * a * n, this._w = i * r * n + o * a * s) : "YZX" === e.order ? (this._x = o * r * n + i * a * s, this._y = i * a * n + o * r * s, this._z = i * r * s - o * a * n, this._w = i * r * n - o * a * s) : "XZY" === e.order && (this._x = o * r * n - i * a * s, this._y = i * a * n - o * r * s, this._z = i * r * s + o * a * n, this._w = i * r * n + o * a * s), !1 !== t && this._updateEuler(), this
  },
  setFromAxisAngle: function (e, t) {
    var i = t / 2, r = Math.sin(i);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(i), this._updateEuler(), this
  },
  setFromRotationMatrix: function (e) {
    var t = e.elements, i = t[0];
    e = t[4];
    var r = t[8], n = t[1], o = t[5], a = t[9], s = t[2], l = t[6], t = t[10], h = i + o + t;
    return h > 0 ? (i = .5 / Math.sqrt(h + 1), this._w = .25 / i, this._x = (l - a) * i, this._y = (r - s) * i, this._z = (n - e) * i) : i > o && i > t ? (i = 2 * Math.sqrt(1 + i - o - t), this._w = (l - a) / i, this._x = .25 * i, this._y = (e + n) / i, this._z = (r + s) / i) : o > t ? (i = 2 * Math.sqrt(1 + o - i - t), this._w = (r - s) / i, this._x = (e + n) / i, this._y = .25 * i, this._z = (a + l) / i) : (i = 2 * Math.sqrt(1 + t - i - o), this._w = (n - e) / i, this._x = (r + s) / i, this._y = (a + l) / i, this._z = .25 * i), this._updateEuler(), this
  },
  setFromUnitVectors: function () {
    var e;
    return function (t, i) {
      return void 0 === e && (e = new THREE.Vector3), e.crossVectors(t, i), this.set(e.x, e.y, e.z, t.dot(i) + 1).normalize(), this._updateEuler(), this
    }
  }(),
  inverse: function () {
    return this.conjugate().normalize(), this
  },
  conjugate: function () {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._updateEuler(), this
  },
  lengthSq: function () {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
  },
  length: function () {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
  },
  normalize: function () {
    var e = this.length();
    return 0 === e ? (this._z = this._y = this._x = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this
  },
  multiply: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
  },
  multiplyQuaternions: function (e, t) {
    var i = e._x, r = e._y, n = e._z, o = e._w, a = t._x, s = t._y, l = t._z, h = t._w;
    return this._x = i * h + o * a + r * l - n * s, this._y = r * h + o * s + n * a - i * l, this._z = n * h + o * l + i * s - r * a, this._w = o * h - i * a - r * s - n * l, this._updateEuler(), this
  },
  multiplyVector3: function (e) {
    return console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), e.applyQuaternion(this)
  },
  slerp: function (e, t) {
    var i = this._x, r = this._y, n = this._z, o = this._w, a = o * e._w + i * e._x + r * e._y + n * e._z;
    if (0 > a ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1) return this._w = o, this._x = i, this._y = r, this._z = n, this;
    var s = Math.acos(a), l = Math.sqrt(1 - a * a);
    return .001 > Math.abs(l) ? (this._w = .5 * (o + this._w), this._x = .5 * (i + this._x), this._y = .5 * (r + this._y), this._z = .5 * (n + this._z), this) : (a = Math.sin((1 - t) * s) / l, s = Math.sin(t * s) / l, this._w = o * a + this._w * s, this._x = i * a + this._x * s, this._y = r * a + this._y * s, this._z = n * a + this._z * s, this._updateEuler(), this)
  },
  equals: function (e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
  },
  fromArray: function (e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], this._w = e[3], this._updateEuler(), this
  },
  toArray: function () {
    return [this._x, this._y, this._z, this._w]
  },
  clone: function () {
    return new THREE.Quaternion(this._x, this._y, this._z, this._w)
  }
}, THREE.Quaternion.slerp = function (e, t, i, r) {
  return i.copy(e).slerp(t, r)
}, THREE.Vector2 = function (e, t) {
  this.x = e || 0, this.y = t || 0
}, THREE.Vector2.prototype = {
  constructor: THREE.Vector2, set: function (e, t) {
    return this.x = e, this.y = t, this
  }, setX: function (e) {
    return this.x = e, this
  }, setY: function (e) {
    return this.y = e, this
  }, setComponent: function (e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw Error("index is out of range: " + e)
    }
  }, getComponent: function (e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw Error("index is out of range: " + e)
    }
  }, copy: function (e) {
    return this.x = e.x, this.y = e.y, this
  }, add: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this)
  }, addVectors: function (e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this
  }, addScalar: function (e) {
    return this.x += e, this.y += e, this
  }, sub: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this)
  }, subVectors: function (e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this
  }, multiply: function (e) {
    return this.x *= e.x, this.y *= e.y, this
  }, multiplyScalar: function (e) {
    return this.x *= e, this.y *= e, this
  }, divide: function (e) {
    return this.x /= e.x, this.y /= e.y, this
  }, divideScalar: function (e) {
    return 0 !== e ? (e = 1 / e, this.x *= e, this.y *= e) : this.y = this.x = 0, this
  }, min: function (e) {
    return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this
  }, max: function (e) {
    return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this
  }, clamp: function (e, t) {
    return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this
  }, clampScalar: function () {
    var e, t;
    return function (i, r) {
      return void 0 === e && (e = new THREE.Vector2, t = new THREE.Vector2), e.set(i, i), t.set(r, r), this.clamp(e, t)
    }
  }(), floor: function () {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
  }, ceil: function () {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
  }, round: function () {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this
  }, roundToZero: function () {
    return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this
  }, negate: function () {
    return this.multiplyScalar(-1)
  }, dot: function (e) {
    return this.x * e.x + this.y * e.y
  }, lengthSq: function () {
    return this.x * this.x + this.y * this.y
  }, length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }, normalize: function () {
    return this.divideScalar(this.length())
  }, distanceTo: function (e) {
    return Math.sqrt(this.distanceToSquared(e))
  }, distanceToSquared: function (e) {
    var t = this.x - e.x;
    return e = this.y - e.y, t * t + e * e
  }, setLength: function (e) {
    var t = this.length();
    return 0 !== t && e !== t && this.multiplyScalar(e / t), this
  }, lerp: function (e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this
  }, equals: function (e) {
    return e.x === this.x && e.y === this.y
  }, fromArray: function (e) {
    return this.x = e[0], this.y = e[1], this
  }, toArray: function () {
    return [this.x, this.y]
  }, clone: function () {
    return new THREE.Vector2(this.x, this.y)
  }
}, THREE.Vector3 = function (e, t, i) {
  this.x = e || 0, this.y = t || 0, this.z = i || 0
}, THREE.Vector3.prototype = {
  constructor: THREE.Vector3, set: function (e, t, i) {
    return this.x = e, this.y = t, this.z = i, this
  }, setX: function (e) {
    return this.x = e, this
  }, setY: function (e) {
    return this.y = e, this
  }, setZ: function (e) {
    return this.z = e, this
  }, setComponent: function (e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw Error("index is out of range: " + e)
    }
  }, getComponent: function (e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw Error("index is out of range: " + e)
    }
  }, copy: function (e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this
  }, add: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this)
  }, addScalar: function (e) {
    return this.x += e, this.y += e, this.z += e, this
  }, addVectors: function (e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this
  }, sub: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this)
  }, subVectors: function (e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this
  }, multiply: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : (this.x *= e.x, this.y *= e.y, this.z *= e.z, this)
  }, multiplyScalar: function (e) {
    return this.x *= e, this.y *= e, this.z *= e, this
  }, multiplyVectors: function (e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this
  }, applyEuler: function () {
    var e;
    return function (t) {
      return !1 == t instanceof THREE.Euler && console.error("ERROR: Vector3's .applyEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code."), void 0 === e && (e = new THREE.Quaternion), this.applyQuaternion(e.setFromEuler(t)), this
    }
  }(), applyAxisAngle: function () {
    var e;
    return function (t, i) {
      return void 0 === e && (e = new THREE.Quaternion), this.applyQuaternion(e.setFromAxisAngle(t, i)), this
    }
  }(), applyMatrix3: function (e) {
    var t = this.x, i = this.y, r = this.z;
    return e = e.elements, this.x = e[0] * t + e[3] * i + e[6] * r, this.y = e[1] * t + e[4] * i + e[7] * r, this.z = e[2] * t + e[5] * i + e[8] * r, this
  }, applyMatrix4: function (e) {
    var t = this.x, i = this.y, r = this.z;
    return e = e.elements, this.x = e[0] * t + e[4] * i + e[8] * r + e[12], this.y = e[1] * t + e[5] * i + e[9] * r + e[13], this.z = e[2] * t + e[6] * i + e[10] * r + e[14], this
  }, applyProjection: function (e) {
    var t = this.x, i = this.y, r = this.z;
    e = e.elements;
    var n = 1 / (e[3] * t + e[7] * i + e[11] * r + e[15]);
    return this.x = (e[0] * t + e[4] * i + e[8] * r + e[12]) * n, this.y = (e[1] * t + e[5] * i + e[9] * r + e[13]) * n, this.z = (e[2] * t + e[6] * i + e[10] * r + e[14]) * n, this
  }, applyQuaternion: function (e) {
    var t = this.x, i = this.y, r = this.z, n = e.x, o = e.y, a = e.z;
    e = e.w;
    var s = e * t + o * r - a * i, l = e * i + a * t - n * r, h = e * r + n * i - o * t, t = -n * t - o * i - a * r;
    return this.x = s * e + t * -n + l * -a - h * -o, this.y = l * e + t * -o + h * -n - s * -a, this.z = h * e + t * -a + s * -o - l * -n, this
  }, transformDirection: function (e) {
    var t = this.x, i = this.y, r = this.z;
    return e = e.elements, this.x = e[0] * t + e[4] * i + e[8] * r, this.y = e[1] * t + e[5] * i + e[9] * r, this.z = e[2] * t + e[6] * i + e[10] * r, this.normalize(), this
  }, divide: function (e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this
  }, divideScalar: function (e) {
    return 0 !== e ? (e = 1 / e, this.x *= e, this.y *= e, this.z *= e) : this.z = this.y = this.x = 0, this
  }, min: function (e) {
    return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this
  }, max: function (e) {
    return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this
  }, clamp: function (e, t) {
    return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this
  }, clampScalar: function () {
    var e, t;
    return function (i, r) {
      return void 0 === e && (e = new THREE.Vector3, t = new THREE.Vector3), e.set(i, i, i), t.set(r, r, r), this.clamp(e, t)
    }
  }(), floor: function () {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
  }, ceil: function () {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
  }, round: function () {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
  }, roundToZero: function () {
    return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this
  }, negate: function () {
    return this.multiplyScalar(-1)
  }, dot: function (e) {
    return this.x * e.x + this.y * e.y + this.z * e.z
  }, lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }, length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }, lengthManhattan: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  }, normalize: function () {
    return this.divideScalar(this.length())
  }, setLength: function (e) {
    var t = this.length();
    return 0 !== t && e !== t && this.multiplyScalar(e / t), this
  }, lerp: function (e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this
  }, cross: function (e, t) {
    if (void 0 !== t) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t);
    var i = this.x, r = this.y, n = this.z;
    return this.x = r * e.z - n * e.y, this.y = n * e.x - i * e.z, this.z = i * e.y - r * e.x, this
  }, crossVectors: function (e, t) {
    var i = e.x, r = e.y, n = e.z, o = t.x, a = t.y, s = t.z;
    return this.x = r * s - n * a, this.y = n * o - i * s, this.z = i * a - r * o, this
  }, projectOnVector: function () {
    var e, t;
    return function (i) {
      return void 0 === e && (e = new THREE.Vector3), e.copy(i).normalize(), t = this.dot(e), this.copy(e).multiplyScalar(t)
    }
  }(), projectOnPlane: function () {
    var e;
    return function (t) {
      return void 0 === e && (e = new THREE.Vector3), e.copy(this).projectOnVector(t), this.sub(e)
    }
  }(), reflect: function () {
    var e;
    return function (t) {
      return void 0 === e && (e = new THREE.Vector3), this.sub(e.copy(t).multiplyScalar(2 * this.dot(t)))
    }
  }(), angleTo: function (e) {
    return e = this.dot(e) / (this.length() * e.length()), Math.acos(THREE.Math.clamp(e, -1, 1))
  }, distanceTo: function (e) {
    return Math.sqrt(this.distanceToSquared(e))
  }, distanceToSquared: function (e) {
    var t = this.x - e.x, i = this.y - e.y;
    return e = this.z - e.z, t * t + i * i + e * e
  }, setEulerFromRotationMatrix: function (e, t) {
    console.error("REMOVED: Vector3's setEulerFromRotationMatrix has been removed in favor of Euler.setFromRotationMatrix(), please update your code.")
  }, setEulerFromQuaternion: function (e, t) {
    console.error("REMOVED: Vector3's setEulerFromQuaternion: has been removed in favor of Euler.setFromQuaternion(), please update your code.")
  }, getPositionFromMatrix: function (e) {
    return console.warn("DEPRECATED: Vector3's .getPositionFromMatrix() has been renamed to .setFromMatrixPosition(). Please update your code."), this.setFromMatrixPosition(e)
  }, getScaleFromMatrix: function (e) {
    return console.warn("DEPRECATED: Vector3's .getScaleFromMatrix() has been renamed to .setFromMatrixScale(). Please update your code."), this.setFromMatrixScale(e)
  }, getColumnFromMatrix: function (e, t) {
    return console.warn("DEPRECATED: Vector3's .getColumnFromMatrix() has been renamed to .setFromMatrixColumn(). Please update your code."), this.setFromMatrixColumn(e, t)
  }, setFromMatrixPosition: function (e) {
    return this.x = e.elements[12], this.y = e.elements[13], this.z = e.elements[14], this
  }, setFromMatrixScale: function (e) {
    var t = this.set(e.elements[0], e.elements[1], e.elements[2]).length(),
      i = this.set(e.elements[4], e.elements[5], e.elements[6]).length();
    return e = this.set(e.elements[8], e.elements[9], e.elements[10]).length(), this.x = t, this.y = i, this.z = e, this
  }, setFromMatrixColumn: function (e, t) {
    var i = 4 * e, r = t.elements;
    return this.x = r[i], this.y = r[i + 1], this.z = r[i + 2], this
  }, equals: function (e) {
    return e.x === this.x && e.y === this.y && e.z === this.z
  }, fromArray: function (e) {
    return this.x = e[0], this.y = e[1], this.z = e[2], this
  }, toArray: function () {
    return [this.x, this.y, this.z]
  }, clone: function () {
    return new THREE.Vector3(this.x, this.y, this.z)
  }
}, THREE.Vector4 = function (e, t, i, r) {
  this.x = e || 0, this.y = t || 0, this.z = i || 0, this.w = void 0 !== r ? r : 1
}, THREE.Vector4.prototype = {
  constructor: THREE.Vector4, set: function (e, t, i, r) {
    return this.x = e, this.y = t, this.z = i, this.w = r, this
  }, setX: function (e) {
    return this.x = e, this
  }, setY: function (e) {
    return this.y = e, this
  }, setZ: function (e) {
    return this.z = e, this
  }, setW: function (e) {
    return this.w = e, this
  }, setComponent: function (e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw Error("index is out of range: " + e)
    }
  }, getComponent: function (e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw Error("index is out of range: " + e)
    }
  }, copy: function (e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = void 0 !== e.w ? e.w : 1, this
  }, add: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : (this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this)
  }, addScalar: function (e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this
  }, addVectors: function (e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this
  }, sub: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : (this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this)
  }, subVectors: function (e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this
  }, multiplyScalar: function (e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this
  }, applyMatrix4: function (e) {
    var t = this.x, i = this.y, r = this.z, n = this.w;
    return e = e.elements, this.x = e[0] * t + e[4] * i + e[8] * r + e[12] * n, this.y = e[1] * t + e[5] * i + e[9] * r + e[13] * n, this.z = e[2] * t + e[6] * i + e[10] * r + e[14] * n, this.w = e[3] * t + e[7] * i + e[11] * r + e[15] * n, this
  }, divideScalar: function (e) {
    return 0 !== e ? (e = 1 / e, this.x *= e, this.y *= e, this.z *= e, this.w *= e) : (this.z = this.y = this.x = 0, this.w = 1), this
  }, setAxisAngleFromQuaternion: function (e) {
    this.w = 2 * Math.acos(e.w);
    var t = Math.sqrt(1 - e.w * e.w);
    return 1e-4 > t ? (this.x = 1, this.z = this.y = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this
  }, setAxisAngleFromRotationMatrix: function (e) {
    var t, i, r;
    e = e.elements;
    var n = e[0];
    r = e[4];
    var o = e[8], a = e[1], s = e[5], l = e[9];
    i = e[2], t = e[6];
    var h = e[10];
    return .01 > Math.abs(r - a) && .01 > Math.abs(o - i) && .01 > Math.abs(l - t) ? .1 > Math.abs(r + a) && .1 > Math.abs(o + i) && .1 > Math.abs(l + t) && .1 > Math.abs(n + s + h - 3) ? (this.set(1, 0, 0, 0), this) : (e = Math.PI, n = (n + 1) / 2, s = (s + 1) / 2, h = (h + 1) / 2, r = (r + a) / 4, o = (o + i) / 4, l = (l + t) / 4, n > s && n > h ? .01 > n ? (t = 0, r = i = .707106781) : (t = Math.sqrt(n), i = r / t, r = o / t) : s > h ? .01 > s ? (t = .707106781, i = 0, r = .707106781) : (i = Math.sqrt(s), t = r / i, r = l / i) : .01 > h ? (i = t = .707106781, r = 0) : (r = Math.sqrt(h), t = o / r, i = l / r), this.set(t, i, r, e), this) : (e = Math.sqrt((t - l) * (t - l) + (o - i) * (o - i) + (a - r) * (a - r)), .001 > Math.abs(e) && (e = 1), this.x = (t - l) / e, this.y = (o - i) / e, this.z = (a - r) / e, this.w = Math.acos((n + s + h - 1) / 2), this)
  }, min: function (e) {
    return this.x > e.x && (this.x = e.x), this.y > e.y && (this.y = e.y), this.z > e.z && (this.z = e.z), this.w > e.w && (this.w = e.w), this
  }, max: function (e) {
    return this.x < e.x && (this.x = e.x), this.y < e.y && (this.y = e.y), this.z < e.z && (this.z = e.z), this.w < e.w && (this.w = e.w), this
  }, clamp: function (e, t) {
    return this.x < e.x ? this.x = e.x : this.x > t.x && (this.x = t.x), this.y < e.y ? this.y = e.y : this.y > t.y && (this.y = t.y), this.z < e.z ? this.z = e.z : this.z > t.z && (this.z = t.z), this.w < e.w ? this.w = e.w : this.w > t.w && (this.w = t.w), this
  }, clampScalar: function () {
    var e, t;
    return function (i, r) {
      return void 0 === e && (e = new THREE.Vector4, t = new THREE.Vector4), e.set(i, i, i, i), t.set(r, r, r, r), this.clamp(e, t)
    }
  }(), floor: function () {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
  }, ceil: function () {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
  }, round: function () {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
  }, roundToZero: function () {
    return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w), this
  }, negate: function () {
    return this.multiplyScalar(-1)
  }, dot: function (e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
  }, lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  }, length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
  }, lengthManhattan: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
  }, normalize: function () {
    return this.divideScalar(this.length())
  }, setLength: function (e) {
    var t = this.length();
    return 0 !== t && e !== t && this.multiplyScalar(e / t), this
  }, lerp: function (e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this
  }, equals: function (e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
  }, fromArray: function (e) {
    return this.x = e[0], this.y = e[1], this.z = e[2], this.w = e[3], this
  }, toArray: function () {
    return [this.x, this.y, this.z, this.w]
  }, clone: function () {
    return new THREE.Vector4(this.x, this.y, this.z, this.w)
  }
}, THREE.TypedVector2 = function (e, t) {
  this.array = e, this.offset = t
}, THREE.TypedVector2.prototype = Object.create(THREE.Vector2.prototype), Object.defineProperties(THREE.TypedVector2.prototype, {
  x: {
    get: function () {
      return this.array[this.offset]
    }, set: function (e) {
      this.array[this.offset] = e
    }
  }, y: {
    get: function () {
      return this.array[this.offset + 1]
    }, set: function (e) {
      this.array[this.offset + 1] = e
    }
  }
}), THREE.TypedVector3 = function (e, t) {
  this.array = e, this.offset = t
}, THREE.TypedVector3.prototype = Object.create(THREE.Vector3.prototype), Object.defineProperties(THREE.TypedVector3.prototype, {
  x: {
    get: function () {
      return this.array[this.offset]
    }, set: function (e) {
      this.array[this.offset] = e
    }
  }, y: {
    get: function () {
      return this.array[this.offset + 1]
    }, set: function (e) {
      this.array[this.offset + 1] = e
    }
  }, z: {
    get: function () {
      return this.array[this.offset + 2]
    }, set: function (e) {
      this.array[this.offset + 2] = e
    }
  }
}), THREE.Euler = function (e, t, i, r) {
  this._x = e || 0, this._y = t || 0, this._z = i || 0, this._order = r || THREE.Euler.DefaultOrder
}, THREE.Euler.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" "), THREE.Euler.DefaultOrder = "XYZ", THREE.Euler.prototype = {
  constructor: THREE.Euler,
  _x: 0,
  _y: 0,
  _z: 0,
  _order: THREE.Euler.DefaultOrder,
  _quaternion: void 0,
  _updateQuaternion: function () {
    void 0 !== this._quaternion && this._quaternion.setFromEuler(this, !1)
  },
  get x() {
    return this._x
  },
  set x(e) {
    this._x = e, this._updateQuaternion()
  },
  get y() {
    return this._y
  },
  set y(e) {
    this._y = e, this._updateQuaternion()
  },
  get z() {
    return this._z
  },
  set z(e) {
    this._z = e, this._updateQuaternion()
  },
  get order() {
    return this._order
  },
  set order(e) {
    this._order = e, this._updateQuaternion()
  },
  set: function (e, t, i, r) {
    return this._x = e, this._y = t, this._z = i, this._order = r || this._order, this._updateQuaternion(), this
  },
  copy: function (e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._updateQuaternion(), this
  },
  setFromRotationMatrix: function (e, t) {
    var i = THREE.Math.clamp, r = e.elements, n = r[0], o = r[4], a = r[8], s = r[1], l = r[5], h = r[9], c = r[2],
      u = r[6], r = r[10];
    return t = t || this._order, "XYZ" === t ? (this._y = Math.asin(i(a, -1, 1)), .99999 > Math.abs(a) ? (this._x = Math.atan2(-h, r), this._z = Math.atan2(-o, n)) : (this._x = Math.atan2(u, l), this._z = 0)) : "YXZ" === t ? (this._x = Math.asin(-i(h, -1, 1)), .99999 > Math.abs(h) ? (this._y = Math.atan2(a, r), this._z = Math.atan2(s, l)) : (this._y = Math.atan2(-c, n), this._z = 0)) : "ZXY" === t ? (this._x = Math.asin(i(u, -1, 1)), .99999 > Math.abs(u) ? (this._y = Math.atan2(-c, r), this._z = Math.atan2(-o, l)) : (this._y = 0, this._z = Math.atan2(s, n))) : "ZYX" === t ? (this._y = Math.asin(-i(c, -1, 1)), .99999 > Math.abs(c) ? (this._x = Math.atan2(u, r), this._z = Math.atan2(s, n)) : (this._x = 0, this._z = Math.atan2(-o, l))) : "YZX" === t ? (this._z = Math.asin(i(s, -1, 1)), .99999 > Math.abs(s) ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-c, n)) : (this._x = 0, this._y = Math.atan2(a, r))) : "XZY" === t ? (this._z = Math.asin(-i(o, -1, 1)), .99999 > Math.abs(o) ? (this._x = Math.atan2(u, l), this._y = Math.atan2(a, n)) : (this._x = Math.atan2(-h, r), this._y = 0)) : console.warn("WARNING: Euler.setFromRotationMatrix() given unsupported order: " + t), this._order = t, this._updateQuaternion(), this
  },
  setFromQuaternion: function (e, t, i) {
    var r = THREE.Math.clamp, n = e.x * e.x, o = e.y * e.y, a = e.z * e.z, s = e.w * e.w;
    return t = t || this._order, "XYZ" === t ? (this._x = Math.atan2(2 * (e.x * e.w - e.y * e.z), s - n - o + a), this._y = Math.asin(r(2 * (e.x * e.z + e.y * e.w), -1, 1)), this._z = Math.atan2(2 * (e.z * e.w - e.x * e.y), s + n - o - a)) : "YXZ" === t ? (this._x = Math.asin(r(2 * (e.x * e.w - e.y * e.z), -1, 1)), this._y = Math.atan2(2 * (e.x * e.z + e.y * e.w), s - n - o + a), this._z = Math.atan2(2 * (e.x * e.y + e.z * e.w), s - n + o - a)) : "ZXY" === t ? (this._x = Math.asin(r(2 * (e.x * e.w + e.y * e.z), -1, 1)), this._y = Math.atan2(2 * (e.y * e.w - e.z * e.x), s - n - o + a), this._z = Math.atan2(2 * (e.z * e.w - e.x * e.y), s - n + o - a)) : "ZYX" === t ? (this._x = Math.atan2(2 * (e.x * e.w + e.z * e.y), s - n - o + a), this._y = Math.asin(r(2 * (e.y * e.w - e.x * e.z), -1, 1)), this._z = Math.atan2(2 * (e.x * e.y + e.z * e.w), s + n - o - a)) : "YZX" === t ? (this._x = Math.atan2(2 * (e.x * e.w - e.z * e.y), s - n + o - a), this._y = Math.atan2(2 * (e.y * e.w - e.x * e.z), s + n - o - a), this._z = Math.asin(r(2 * (e.x * e.y + e.z * e.w), -1, 1))) : "XZY" === t ? (this._x = Math.atan2(2 * (e.x * e.w + e.y * e.z), s - n + o - a), this._y = Math.atan2(2 * (e.x * e.z + e.y * e.w), s + n - o - a), this._z = Math.asin(r(2 * (e.z * e.w - e.x * e.y), -1, 1))) : console.warn("WARNING: Euler.setFromQuaternion() given unsupported order: " + t), this._order = t, !1 !== i && this._updateQuaternion(), this
  },
  reorder: function () {
    var e = new THREE.Quaternion;
    return function (t) {
      e.setFromEuler(this), this.setFromQuaternion(e, t)
    }
  }(),
  fromArray: function (e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], void 0 !== e[3] && (this._order = e[3]), this._updateQuaternion(), this
  },
  toArray: function () {
    return [this._x, this._y, this._z, this._order]
  },
  equals: function (e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
  },
  clone: function () {
    return new THREE.Euler(this._x, this._y, this._z, this._order)
  }
}, THREE.Line3 = function (e, t) {
  this.start = void 0 !== e ? e : new THREE.Vector3, this.end = void 0 !== t ? t : new THREE.Vector3
}, THREE.Line3.prototype = {
  constructor: THREE.Line3, set: function (e, t) {
    return this.start.copy(e), this.end.copy(t), this
  }, copy: function (e) {
    return this.start.copy(e.start), this.end.copy(e.end), this
  }, center: function (e) {
    return (e || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(.5)
  }, delta: function (e) {
    return (e || new THREE.Vector3).subVectors(this.end, this.start)
  }, distanceSq: function () {
    return this.start.distanceToSquared(this.end)
  }, distance: function () {
    return this.start.distanceTo(this.end)
  }, at: function (e, t) {
    var i = t || new THREE.Vector3;
    return this.delta(i).multiplyScalar(e).add(this.start)
  }, closestPointToPointParameter: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3;
    return function (i, r) {
      e.subVectors(i, this.start), t.subVectors(this.end, this.start);
      var n = t.dot(t), n = t.dot(e) / n;
      return r && (n = THREE.Math.clamp(n, 0, 1)), n
    }
  }(), closestPointToPoint: function (e, t, i) {
    return e = this.closestPointToPointParameter(e, t), i = i || new THREE.Vector3, this.delta(i).multiplyScalar(e).add(this.start)
  }, applyMatrix4: function (e) {
    return this.start.applyMatrix4(e), this.end.applyMatrix4(e), this
  }, equals: function (e) {
    return e.start.equals(this.start) && e.end.equals(this.end)
  }, clone: function () {
    return (new THREE.Line3).copy(this)
  }
}, THREE.Box2 = function (e, t) {
  this.min = void 0 !== e ? e : new THREE.Vector2(1 / 0, 1 / 0), this.max = void 0 !== t ? t : new THREE.Vector2(-(1 / 0), -(1 / 0))
},THREE.Box2.prototype = {
  constructor: THREE.Box2, set: function (e, t) {
    return this.min.copy(e), this.max.copy(t), this
  }, setFromPoints: function (e) {
    if (0 < e.length) {
      var t = e[0];
      this.min.copy(t), this.max.copy(t);
      for (var i = 1, r = e.length; r > i; i++) t = e[i], t.x < this.min.x ? this.min.x = t.x : t.x > this.max.x && (this.max.x = t.x), t.y < this.min.y ? this.min.y = t.y : t.y > this.max.y && (this.max.y = t.y)
    } else this.makeEmpty();
    return this
  }, setFromCenterAndSize: function () {
    var e = new THREE.Vector2;
    return function (t, i) {
      var r = e.copy(i).multiplyScalar(.5);
      return this.min.copy(t).sub(r), this.max.copy(t).add(r), this
    }
  }(), copy: function (e) {
    return this.min.copy(e.min), this.max.copy(e.max), this
  }, makeEmpty: function () {
    return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -(1 / 0), this
  }, empty: function () {
    return this.max.x < this.min.x || this.max.y < this.min.y
  }, center: function (e) {
    return (e || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(.5)
  }, size: function (e) {
    return (e || new THREE.Vector2).subVectors(this.max, this.min)
  }, expandByPoint: function (e) {
    return this.min.min(e), this.max.max(e), this
  }, expandByVector: function (e) {
    return this.min.sub(e), this.max.add(e), this
  }, expandByScalar: function (e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this
  }, containsPoint: function (e) {
    return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y ? !1 : !0
  }, containsBox: function (e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y ? !0 : !1
  }, getParameter: function (e, t) {
    return (t || new THREE.Vector2).set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y));
  }, isIntersectionBox: function (e) {
    return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y ? !1 : !0
  }, clampPoint: function (e, t) {
    return (t || new THREE.Vector2).copy(e).clamp(this.min, this.max)
  }, distanceToPoint: function () {
    var e = new THREE.Vector2;
    return function (t) {
      return e.copy(t).clamp(this.min, this.max).sub(t).length()
    }
  }(), intersect: function (e) {
    return this.min.max(e.min), this.max.min(e.max), this
  }, union: function (e) {
    return this.min.min(e.min), this.max.max(e.max), this
  }, translate: function (e) {
    return this.min.add(e), this.max.add(e), this
  }, equals: function (e) {
    return e.min.equals(this.min) && e.max.equals(this.max)
  }, clone: function () {
    return (new THREE.Box2).copy(this)
  }
},THREE.Box3 = function (e, t) {
  this.min = void 0 !== e ? e : new THREE.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== t ? t : new THREE.Vector3(-(1 / 0), -(1 / 0), -(1 / 0))
},THREE.Box3.prototype = {
  constructor: THREE.Box3, set: function (e, t) {
    return this.min.copy(e), this.max.copy(t), this
  }, addPoint: function (e) {
    e.x < this.min.x ? this.min.x = e.x : e.x > this.max.x && (this.max.x = e.x), e.y < this.min.y ? this.min.y = e.y : e.y > this.max.y && (this.max.y = e.y), e.z < this.min.z ? this.min.z = e.z : e.z > this.max.z && (this.max.z = e.z)
  }, setFromPoints: function (e) {
    if (0 < e.length) {
      var t = e[0];
      this.min.copy(t), this.max.copy(t);
      for (var t = 1, i = e.length; i > t; t++) this.addPoint(e[t])
    } else this.makeEmpty();
    return this
  }, setFromCenterAndSize: function () {
    var e = new THREE.Vector3;
    return function (t, i) {
      var r = e.copy(i).multiplyScalar(.5);
      return this.min.copy(t).sub(r), this.max.copy(t).add(r), this
    }
  }(), setFromObject: function () {
    var e = new THREE.Vector3;
    return function (t) {
      var i = this;
      return t.updateMatrixWorld(!0), this.makeEmpty(), t.traverse(function (t) {
        if (void 0 !== t.geometry && void 0 !== t.geometry.vertices) for (var r = t.geometry.vertices, n = 0, o = r.length; o > n; n++) e.copy(r[n]), e.applyMatrix4(t.matrixWorld), i.expandByPoint(e)
      }), this
    }
  }(), copy: function (e) {
    return this.min.copy(e.min), this.max.copy(e.max), this
  }, makeEmpty: function () {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -(1 / 0), this
  }, empty: function () {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
  }, center: function (e) {
    return (e || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(.5)
  }, size: function (e) {
    return (e || new THREE.Vector3).subVectors(this.max, this.min)
  }, expandByPoint: function (e) {
    return this.min.min(e), this.max.max(e), this
  }, expandByVector: function (e) {
    return this.min.sub(e), this.max.add(e), this
  }, expandByScalar: function (e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this
  }, containsPoint: function (e) {
    return e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z ? !1 : !0
  }, containsBox: function (e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z ? !0 : !1
  }, getParameter: function (e, t) {
    return (t || new THREE.Vector3).set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
  }, isIntersectionBox: function (e) {
    return e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z ? !1 : !0
  }, clampPoint: function (e, t) {
    return (t || new THREE.Vector3).copy(e).clamp(this.min, this.max)
  }, distanceToPoint: function () {
    var e = new THREE.Vector3;
    return function (t) {
      return e.copy(t).clamp(this.min, this.max).sub(t).length()
    }
  }(), getBoundingSphere: function () {
    var e = new THREE.Vector3;
    return function (t) {
      return t = t || new THREE.Sphere, t.center = this.center(), t.radius = .5 * this.size(e).length(), t
    }
  }(), intersect: function (e) {
    return this.min.max(e.min), this.max.min(e.max), this
  }, union: function (e) {
    return this.min.min(e.min), this.max.max(e.max), this
  }, applyMatrix4: function () {
    var e = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    return function (t) {
      return e[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), e[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), e[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), e[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), e[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), e[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), e[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), e[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.makeEmpty(), this.setFromPoints(e), this
    }
  }(), translate: function (e) {
    return this.min.add(e), this.max.add(e), this
  }, equals: function (e) {
    return e.min.equals(this.min) && e.max.equals(this.max)
  }, clone: function () {
    return (new THREE.Box3).copy(this)
  }
},THREE.Matrix3 = function (e, t, i, r, n, o, a, s, l) {
  this.elements = new Float32Array(9), this.set(void 0 !== e ? e : 1, t || 0, i || 0, r || 0, void 0 !== n ? n : 1, o || 0, a || 0, s || 0, void 0 !== l ? l : 1)
},THREE.Matrix3.prototype = {
  constructor: THREE.Matrix3, set: function (e, t, i, r, n, o, a, s, l) {
    var h = this.elements;
    return h[0] = e, h[3] = t, h[6] = i, h[1] = r, h[4] = n, h[7] = o, h[2] = a, h[5] = s, h[8] = l, this
  }, identity: function () {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
  }, copy: function (e) {
    return e = e.elements, this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]), this
  }, multiplyVector3: function (e) {
    return console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), e.applyMatrix3(this)
  }, multiplyVector3Array: function (e) {
    return console.warn("DEPRECATED: Matrix3's .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
  }, applyToVector3Array: function () {
    var e = new THREE.Vector3;
    return function (t) {
      for (var i = 0, r = t.length; r > i; i += 3) e.x = t[i], e.y = t[i + 1], e.z = t[i + 2], e.applyMatrix3(this), t[i] = e.x, t[i + 1] = e.y, t[i + 2] = e.z;
      return t
    }
  }(), multiplyScalar: function (e) {
    var t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this
  }, determinant: function () {
    var e = this.elements, t = e[0], i = e[1], r = e[2], n = e[3], o = e[4], a = e[5], s = e[6], l = e[7], e = e[8];
    return t * o * e - t * a * l - i * n * e + i * a * s + r * n * l - r * o * s
  }, getInverse: function (e, t) {
    var i = e.elements, r = this.elements;
    if (r[0] = i[10] * i[5] - i[6] * i[9], r[1] = -i[10] * i[1] + i[2] * i[9], r[2] = i[6] * i[1] - i[2] * i[5], r[3] = -i[10] * i[4] + i[6] * i[8], r[4] = i[10] * i[0] - i[2] * i[8], r[5] = -i[6] * i[0] + i[2] * i[4], r[6] = i[9] * i[4] - i[5] * i[8], r[7] = -i[9] * i[0] + i[1] * i[8], r[8] = i[5] * i[0] - i[1] * i[4], i = i[0] * r[0] + i[1] * r[3] + i[2] * r[6], 0 === i) {
      if (t) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
      return console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
    }
    return this.multiplyScalar(1 / i), this
  }, transpose: function () {
    var e, t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this
  }, getNormalMatrix: function (e) {
    return this.getInverse(e).transpose(), this
  }, transposeIntoArray: function (e) {
    var t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this
  }, fromArray: function (e) {
    return this.elements.set(e), this
  }, toArray: function () {
    var e = this.elements;
    return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
  }, clone: function () {
    var e = this.elements;
    return new THREE.Matrix3(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8])
  }
},THREE.Matrix4 = function (e, t, i, r, n, o, a, s, l, h, c, u, p, d, f, m) {
  var E = this.elements = new Float32Array(16);
  E[0] = void 0 !== e ? e : 1, E[4] = t || 0, E[8] = i || 0, E[12] = r || 0, E[1] = n || 0, E[5] = void 0 !== o ? o : 1, E[9] = a || 0, E[13] = s || 0, E[2] = l || 0, E[6] = h || 0, E[10] = void 0 !== c ? c : 1, E[14] = u || 0, E[3] = p || 0, E[7] = d || 0, E[11] = f || 0, E[15] = void 0 !== m ? m : 1
},THREE.Matrix4.prototype = {
  constructor: THREE.Matrix4,
  set: function (e, t, i, r, n, o, a, s, l, h, c, u, p, d, f, m) {
    var E = this.elements;
    return E[0] = e, E[4] = t, E[8] = i, E[12] = r, E[1] = n, E[5] = o, E[9] = a, E[13] = s, E[2] = l, E[6] = h, E[10] = c, E[14] = u, E[3] = p, E[7] = d, E[11] = f, E[15] = m, this
  },
  identity: function () {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
  },
  copy: function (e) {
    return this.elements.set(e.elements), this
  },
  extractPosition: function (e) {
    return console.warn("DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(e)
  },
  copyPosition: function (e) {
    var t = this.elements;
    return e = e.elements, t[12] = e[12], t[13] = e[13], t[14] = e[14], this
  },
  extractRotation: function () {
    var e = new THREE.Vector3;
    return function (t) {
      var i = this.elements;
      t = t.elements;
      var r = 1 / e.set(t[0], t[1], t[2]).length(), n = 1 / e.set(t[4], t[5], t[6]).length(),
        o = 1 / e.set(t[8], t[9], t[10]).length();
      return i[0] = t[0] * r, i[1] = t[1] * r, i[2] = t[2] * r, i[4] = t[4] * n, i[5] = t[5] * n, i[6] = t[6] * n, i[8] = t[8] * o, i[9] = t[9] * o, i[10] = t[10] * o, this
    }
  }(),
  makeRotationFromEuler: function (e) {
    !1 == e instanceof THREE.Euler && console.error("ERROR: Matrix's .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.  Please update your code.");
    var t = this.elements, i = e.x, r = e.y, n = e.z, o = Math.cos(i), i = Math.sin(i), a = Math.cos(r),
      r = Math.sin(r), s = Math.cos(n), n = Math.sin(n);
    if ("XYZ" === e.order) {
      e = o * s;
      var l = o * n, h = i * s, c = i * n;
      t[0] = a * s, t[4] = -a * n, t[8] = r, t[1] = l + h * r, t[5] = e - c * r, t[9] = -i * a, t[2] = c - e * r, t[6] = h + l * r, t[10] = o * a
    } else "YXZ" === e.order ? (e = a * s, l = a * n, h = r * s, c = r * n, t[0] = e + c * i, t[4] = h * i - l, t[8] = o * r, t[1] = o * n, t[5] = o * s, t[9] = -i, t[2] = l * i - h, t[6] = c + e * i, t[10] = o * a) : "ZXY" === e.order ? (e = a * s, l = a * n, h = r * s, c = r * n, t[0] = e - c * i, t[4] = -o * n, t[8] = h + l * i, t[1] = l + h * i, t[5] = o * s, t[9] = c - e * i, t[2] = -o * r, t[6] = i, t[10] = o * a) : "ZYX" === e.order ? (e = o * s, l = o * n, h = i * s, c = i * n, t[0] = a * s, t[4] = h * r - l, t[8] = e * r + c, t[1] = a * n, t[5] = c * r + e, t[9] = l * r - h, t[2] = -r, t[6] = i * a, t[10] = o * a) : "YZX" === e.order ? (e = o * a, l = o * r, h = i * a, c = i * r, t[0] = a * s, t[4] = c - e * n, t[8] = h * n + l, t[1] = n, t[5] = o * s, t[9] = -i * s, t[2] = -r * s, t[6] = l * n + h, t[10] = e - c * n) : "XZY" === e.order && (e = o * a, l = o * r, h = i * a, c = i * r, t[0] = a * s, t[4] = -n, t[8] = r * s, t[1] = e * n + c, t[5] = o * s, t[9] = l * n - h, t[2] = h * n - l, t[6] = i * s, t[10] = c * n + e);
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
  },
  setRotationFromQuaternion: function (e) {
    return console.warn("DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code."), this.makeRotationFromQuaternion(e)
  },
  makeRotationFromQuaternion: function (e) {
    var t = this.elements, i = e.x, r = e.y, n = e.z, o = e.w, a = i + i, s = r + r, l = n + n;
    e = i * a;
    var h = i * s, i = i * l, c = r * s, r = r * l, n = n * l, a = o * a, s = o * s, o = o * l;
    return t[0] = 1 - (c + n), t[4] = h - o, t[8] = i + s, t[1] = h + o, t[5] = 1 - (e + n), t[9] = r - a, t[2] = i - s, t[6] = r + a, t[10] = 1 - (e + c), t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this
  },
  lookAt: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Vector3;
    return function (r, n, o) {
      var a = this.elements;
      return i.subVectors(r, n).normalize(), 0 === i.length() && (i.z = 1), e.crossVectors(o, i).normalize(), 0 === e.length() && (i.x += 1e-4, e.crossVectors(o, i).normalize()), t.crossVectors(i, e), a[0] = e.x, a[4] = t.x, a[8] = i.x, a[1] = e.y, a[5] = t.y, a[9] = i.y, a[2] = e.z, a[6] = t.z, a[10] = i.z, this
    }
  }(),
  multiply: function (e, t) {
    return void 0 !== t ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
  },
  multiplyMatrices: function (e, t) {
    var i = e.elements, r = t.elements, n = this.elements, o = i[0], a = i[4], s = i[8], l = i[12], h = i[1], c = i[5],
      u = i[9], p = i[13], d = i[2], f = i[6], m = i[10], E = i[14], g = i[3], v = i[7], y = i[11], i = i[15], T = r[0],
      x = r[4], R = r[8], b = r[12], H = r[1], w = r[5], _ = r[9], S = r[13], M = r[2], C = r[6], A = r[10], L = r[14],
      D = r[3], P = r[7], F = r[11], r = r[15];
    return n[0] = o * T + a * H + s * M + l * D, n[4] = o * x + a * w + s * C + l * P, n[8] = o * R + a * _ + s * A + l * F, n[12] = o * b + a * S + s * L + l * r, n[1] = h * T + c * H + u * M + p * D, n[5] = h * x + c * w + u * C + p * P, n[9] = h * R + c * _ + u * A + p * F, n[13] = h * b + c * S + u * L + p * r, n[2] = d * T + f * H + m * M + E * D, n[6] = d * x + f * w + m * C + E * P, n[10] = d * R + f * _ + m * A + E * F, n[14] = d * b + f * S + m * L + E * r, n[3] = g * T + v * H + y * M + i * D, n[7] = g * x + v * w + y * C + i * P, n[11] = g * R + v * _ + y * A + i * F, n[15] = g * b + v * S + y * L + i * r, this
  },
  multiplyToArray: function (e, t, i) {
    var r = this.elements;
    return this.multiplyMatrices(e, t), i[0] = r[0], i[1] = r[1], i[2] = r[2], i[3] = r[3], i[4] = r[4], i[5] = r[5], i[6] = r[6], i[7] = r[7], i[8] = r[8], i[9] = r[9], i[10] = r[10], i[11] = r[11], i[12] = r[12], i[13] = r[13], i[14] = r[14], i[15] = r[15], this
  },
  multiplyScalar: function (e) {
    var t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this
  },
  multiplyVector3: function (e) {
    return console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), e.applyProjection(this)
  },
  multiplyVector4: function (e) {
    return console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
  },
  multiplyVector3Array: function (e) {
    return console.warn("DEPRECATED: Matrix4's .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(e)
  },
  applyToVector3Array: function () {
    var e = new THREE.Vector3;
    return function (t) {
      for (var i = 0, r = t.length; r > i; i += 3) e.x = t[i], e.y = t[i + 1], e.z = t[i + 2], e.applyMatrix4(this), t[i] = e.x, t[i + 1] = e.y, t[i + 2] = e.z;
      return t
    }
  }(),
  rotateAxis: function (e) {
    console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), e.transformDirection(this)
  },
  crossVector: function (e) {
    return console.warn("DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), e.applyMatrix4(this)
  },
  determinant: function () {
    var e = this.elements, t = e[0], i = e[4], r = e[8], n = e[12], o = e[1], a = e[5], s = e[9], l = e[13], h = e[2],
      c = e[6], u = e[10], p = e[14];
    return e[3] * (+n * s * c - r * l * c - n * a * u + i * l * u + r * a * p - i * s * p) + e[7] * (+t * s * p - t * l * u + n * o * u - r * o * p + r * l * h - n * s * h) + e[11] * (+t * l * c - t * a * p - n * o * c + i * o * p + n * a * h - i * l * h) + e[15] * (-r * a * h - t * s * c + t * a * u + r * o * c - i * o * u + i * s * h)
  },
  transpose: function () {
    var e, t = this.elements;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
  },
  flattenToArray: function (e) {
    var t = this.elements;
    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
  },
  flattenToArrayOffset: function (e, t) {
    var i = this.elements;
    return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e[t + 9] = i[9], e[t + 10] = i[10], e[t + 11] = i[11], e[t + 12] = i[12], e[t + 13] = i[13], e[t + 14] = i[14], e[t + 15] = i[15], e
  },
  getPosition: function () {
    var e = new THREE.Vector3;
    return function () {
      console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
      var t = this.elements;
      return e.set(t[12], t[13], t[14])
    }
  }(),
  setPosition: function (e) {
    var t = this.elements;
    return t[12] = e.x, t[13] = e.y, t[14] = e.z, this
  },
  getInverse: function (e, t) {
    var i = this.elements, r = e.elements, n = r[0], o = r[4], a = r[8], s = r[12], l = r[1], h = r[5], c = r[9],
      u = r[13], p = r[2], d = r[6], f = r[10], m = r[14], E = r[3], g = r[7], v = r[11], r = r[15];
    if (i[0] = c * m * g - u * f * g + u * d * v - h * m * v - c * d * r + h * f * r, i[4] = s * f * g - a * m * g - s * d * v + o * m * v + a * d * r - o * f * r, i[8] = a * u * g - s * c * g + s * h * v - o * u * v - a * h * r + o * c * r, i[12] = s * c * d - a * u * d - s * h * f + o * u * f + a * h * m - o * c * m, i[1] = u * f * E - c * m * E - u * p * v + l * m * v + c * p * r - l * f * r, i[5] = a * m * E - s * f * E + s * p * v - n * m * v - a * p * r + n * f * r, i[9] = s * c * E - a * u * E - s * l * v + n * u * v + a * l * r - n * c * r, i[13] = a * u * p - s * c * p + s * l * f - n * u * f - a * l * m + n * c * m, i[2] = h * m * E - u * d * E + u * p * g - l * m * g - h * p * r + l * d * r, i[6] = s * d * E - o * m * E - s * p * g + n * m * g + o * p * r - n * d * r, i[10] = o * u * E - s * h * E + s * l * g - n * u * g - o * l * r + n * h * r, i[14] = s * h * p - o * u * p - s * l * d + n * u * d + o * l * m - n * h * m, i[3] = c * d * E - h * f * E - c * p * g + l * f * g + h * p * v - l * d * v, i[7] = o * f * E - a * d * E + a * p * g - n * f * g - o * p * v + n * d * v, i[11] = a * h * E - o * c * E - a * l * g + n * c * g + o * l * v - n * h * v, i[15] = o * c * p - a * h * p + a * l * d - n * c * d - o * l * f + n * h * f, i = n * i[0] + l * i[4] + p * i[8] + E * i[12], 0 == i) {
      if (t) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
      return console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
    }
    return this.multiplyScalar(1 / i), this
  },
  translate: function (e) {
    console.warn("DEPRECATED: Matrix4's .translate() has been removed.")
  },
  rotateX: function (e) {
    console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.")
  },
  rotateY: function (e) {
    console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.")
  },
  rotateZ: function (e) {
    console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.")
  },
  rotateByAxis: function (e, t) {
    console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.")
  },
  scale: function (e) {
    var t = this.elements, i = e.x, r = e.y;
    return e = e.z, t[0] *= i, t[4] *= r, t[8] *= e, t[1] *= i, t[5] *= r, t[9] *= e, t[2] *= i, t[6] *= r, t[10] *= e, t[3] *= i, t[7] *= r, t[11] *= e, this
  },
  getMaxScaleOnAxis: function () {
    var e = this.elements;
    return Math.sqrt(Math.max(e[0] * e[0] + e[1] * e[1] + e[2] * e[2], Math.max(e[4] * e[4] + e[5] * e[5] + e[6] * e[6], e[8] * e[8] + e[9] * e[9] + e[10] * e[10])))
  },
  makeTranslation: function (e, t, i) {
    return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this
  },
  makeRotationX: function (e) {
    var t = Math.cos(e);
    return e = Math.sin(e), this.set(1, 0, 0, 0, 0, t, -e, 0, 0, e, t, 0, 0, 0, 0, 1), this
  },
  makeRotationY: function (e) {
    var t = Math.cos(e);
    return e = Math.sin(e), this.set(t, 0, e, 0, 0, 1, 0, 0, -e, 0, t, 0, 0, 0, 0, 1), this
  },
  makeRotationZ: function (e) {
    var t = Math.cos(e);
    return e = Math.sin(e), this.set(t, -e, 0, 0, e, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
  },
  makeRotationAxis: function (e, t) {
    var i = Math.cos(t), r = Math.sin(t), n = 1 - i, o = e.x, a = e.y, s = e.z, l = n * o, h = n * a;
    return this.set(l * o + i, l * a - r * s, l * s + r * a, 0, l * a + r * s, h * a + i, h * s - r * o, 0, l * s - r * a, h * s + r * o, n * s * s + i, 0, 0, 0, 0, 1), this
  },
  makeScale: function (e, t, i) {
    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this
  },
  compose: function (e, t, i) {
    return this.makeRotationFromQuaternion(t), this.scale(i), this.setPosition(e), this
  },
  decompose: function () {
    var e = new THREE.Vector3, t = new THREE.Matrix4;
    return function (i, r, n) {
      var o = this.elements, a = e.set(o[0], o[1], o[2]).length(), s = e.set(o[4], o[5], o[6]).length(),
        l = e.set(o[8], o[9], o[10]).length();
      0 > this.determinant() && (a = -a), i.x = o[12], i.y = o[13], i.z = o[14], t.elements.set(this.elements), i = 1 / a;
      var o = 1 / s, h = 1 / l;
      return t.elements[0] *= i, t.elements[1] *= i, t.elements[2] *= i, t.elements[4] *= o, t.elements[5] *= o, t.elements[6] *= o, t.elements[8] *= h, t.elements[9] *= h, t.elements[10] *= h, r.setFromRotationMatrix(t), n.x = a, n.y = s, n.z = l, this
    }
  }(),
  makeFrustum: function (e, t, i, r, n, o) {
    var a = this.elements;
    return a[0] = 2 * n / (t - e), a[4] = 0, a[8] = (t + e) / (t - e), a[12] = 0, a[1] = 0, a[5] = 2 * n / (r - i), a[9] = (r + i) / (r - i), a[13] = 0, a[2] = 0, a[6] = 0, a[10] = -(o + n) / (o - n), a[14] = -2 * o * n / (o - n), a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
  },
  makePerspective: function (e, t, i, r) {
    e = i * Math.tan(THREE.Math.degToRad(.5 * e));
    var n = -e;
    return this.makeFrustum(n * t, e * t, n, e, i, r)
  },
  makeOrthographic: function (e, t, i, r, n, o) {
    var a = this.elements, s = t - e, l = i - r, h = o - n;
    return a[0] = 2 / s, a[4] = 0, a[8] = 0, a[12] = -((t + e) / s), a[1] = 0, a[5] = 2 / l, a[9] = 0, a[13] = -((i + r) / l), a[2] = 0, a[6] = 0, a[10] = -2 / h, a[14] = -((o + n) / h), a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
  },
  fromArray: function (e) {
    return this.elements.set(e), this
  },
  toArray: function () {
    var e = this.elements;
    return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
  },
  clone: function () {
    var e = this.elements;
    return new THREE.Matrix4(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15])
  }
},THREE.Ray = function (e, t) {
  this.origin = void 0 !== e ? e : new THREE.Vector3, this.direction = void 0 !== t ? t : new THREE.Vector3
},THREE.Ray.prototype = {
  constructor: THREE.Ray, set: function (e, t) {
    return this.origin.copy(e), this.direction.copy(t), this
  }, copy: function (e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this
  }, at: function (e, t) {
    return (t || new THREE.Vector3).copy(this.direction).multiplyScalar(e).add(this.origin)
  }, recast: function () {
    var e = new THREE.Vector3;
    return function (t) {
      return this.origin.copy(this.at(t, e)), this
    }
  }(), closestPointToPoint: function (e, t) {
    var i = t || new THREE.Vector3;
    i.subVectors(e, this.origin);
    var r = i.dot(this.direction);
    return 0 > r ? i.copy(this.origin) : i.copy(this.direction).multiplyScalar(r).add(this.origin)
  }, distanceToPoint: function () {
    var e = new THREE.Vector3;
    return function (t) {
      var i = e.subVectors(t, this.origin).dot(this.direction);
      return 0 > i ? this.origin.distanceTo(t) : (e.copy(this.direction).multiplyScalar(i).add(this.origin), e.distanceTo(t))
    }
  }(), distanceSqToSegment: function (e, t, i, r) {
    var n = e.clone().add(t).multiplyScalar(.5), o = t.clone().sub(e).normalize(), a = .5 * e.distanceTo(t),
      s = this.origin.clone().sub(n);
    e = -this.direction.dot(o), t = s.dot(this.direction);
    var l, h, c = -s.dot(o), u = s.lengthSq(), p = Math.abs(1 - e * e);
    return p >= 0 ? (s = e * c - t, l = e * t - c, h = a * p, s >= 0 ? l >= -h ? h >= l ? (a = 1 / p, s *= a, l *= a, e = s * (s + e * l + 2 * t) + l * (e * s + l + 2 * c) + u) : (l = a, s = Math.max(0, -(e * l + t)), e = -s * s + l * (l + 2 * c) + u) : (l = -a, s = Math.max(0, -(e * l + t)), e = -s * s + l * (l + 2 * c) + u) : -h >= l ? (s = Math.max(0, -(-e * a + t)), l = s > 0 ? -a : Math.min(Math.max(-a, -c), a), e = -s * s + l * (l + 2 * c) + u) : h >= l ? (s = 0, l = Math.min(Math.max(-a, -c), a), e = l * (l + 2 * c) + u) : (s = Math.max(0, -(e * a + t)), l = s > 0 ? a : Math.min(Math.max(-a, -c), a), e = -s * s + l * (l + 2 * c) + u)) : (l = e > 0 ? -a : a, s = Math.max(0, -(e * l + t)), e = -s * s + l * (l + 2 * c) + u), i && i.copy(this.direction.clone().multiplyScalar(s).add(this.origin)), r && r.copy(o.clone().multiplyScalar(l).add(n)), e
  }, isIntersectionSphere: function (e) {
    return this.distanceToPoint(e.center) <= e.radius
  }, isIntersectionPlane: function (e) {
    var t = e.distanceToPoint(this.origin);
    return 0 === t || 0 > e.normal.dot(this.direction) * t ? !0 : !1
  }, distanceToPlane: function (e) {
    var t = e.normal.dot(this.direction);
    return 0 == t ? 0 == e.distanceToPoint(this.origin) ? 0 : null : (e = -(this.origin.dot(e.normal) + e.constant) / t, e >= 0 ? e : null)
  }, intersectPlane: function (e, t) {
    var i = this.distanceToPlane(e);
    return null === i ? null : this.at(i, t)
  }, isIntersectionBox: function () {
    var e = new THREE.Vector3;
    return function (t) {
      return null !== this.intersectBox(t, e)
    }
  }(), intersectBox: function (e, t) {
    var i, r, n, o, a;
    r = 1 / this.direction.x, o = 1 / this.direction.y, a = 1 / this.direction.z;
    var s = this.origin;
    return r >= 0 ? (i = (e.min.x - s.x) * r, r *= e.max.x - s.x) : (i = (e.max.x - s.x) * r, r *= e.min.x - s.x), o >= 0 ? (n = (e.min.y - s.y) * o, o *= e.max.y - s.y) : (n = (e.max.y - s.y) * o, o *= e.min.y - s.y), i > o || n > r ? null : ((n > i || i !== i) && (i = n), (r > o || r !== r) && (r = o), a >= 0 ? (n = (e.min.z - s.z) * a, a *= e.max.z - s.z) : (n = (e.max.z - s.z) * a, a *= e.min.z - s.z), i > a || n > r ? null : ((n > i || i !== i) && (i = n), (r > a || r !== r) && (r = a), 0 > r ? null : this.at(i >= 0 ? i : r, t)))
  }, intersectTriangle: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Vector3, r = new THREE.Vector3;
    return function (n, o, a, s, l) {
      if (t.subVectors(o, n), i.subVectors(a, n), r.crossVectors(t, i), o = this.direction.dot(r), o > 0) {
        if (s) return null;
        s = 1
      } else {
        if (!(0 > o)) return null;
        s = -1, o = -o
      }
      return e.subVectors(this.origin, n), n = s * this.direction.dot(i.crossVectors(e, i)), 0 > n ? null : (a = s * this.direction.dot(t.cross(e)), 0 > a || n + a > o ? null : (n = -s * e.dot(r), 0 > n ? null : this.at(n / o, l)))
    }
  }(), applyMatrix4: function (e) {
    return this.direction.add(this.origin).applyMatrix4(e), this.origin.applyMatrix4(e), this.direction.sub(this.origin), this.direction.normalize(), this
  }, equals: function (e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction)
  }, clone: function () {
    return (new THREE.Ray).copy(this)
  }
},THREE.Sphere = function (e, t) {
  this.center = void 0 !== e ? e : new THREE.Vector3, this.radius = void 0 !== t ? t : 0
},THREE.Sphere.prototype = {
  constructor: THREE.Sphere, set: function (e, t) {
    return this.center.copy(e), this.radius = t, this
  }, setFromPoints: function () {
    var e = new THREE.Box3;
    return function (t, i) {
      var r = this.center;
      void 0 !== i ? r.copy(i) : e.setFromPoints(t).center(r);
      for (var n = 0, o = 0, a = t.length; a > o; o++) n = Math.max(n, r.distanceToSquared(t[o]));
      return this.radius = Math.sqrt(n), this
    }
  }(), copy: function (e) {
    return this.center.copy(e.center), this.radius = e.radius, this
  }, empty: function () {
    return 0 >= this.radius
  }, containsPoint: function (e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius
  }, distanceToPoint: function (e) {
    return e.distanceTo(this.center) - this.radius
  }, intersectsSphere: function (e) {
    var t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t
  }, clampPoint: function (e, t) {
    var i = this.center.distanceToSquared(e), r = t || new THREE.Vector3;
    return r.copy(e), i > this.radius * this.radius && (r.sub(this.center).normalize(), r.multiplyScalar(this.radius).add(this.center)), r
  }, getBoundingBox: function (e) {
    return e = e || new THREE.Box3, e.set(this.center, this.center), e.expandByScalar(this.radius), e
  }, applyMatrix4: function (e) {
    return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this
  }, translate: function (e) {
    return this.center.add(e), this
  }, equals: function (e) {
    return e.center.equals(this.center) && e.radius === this.radius
  }, clone: function () {
    return (new THREE.Sphere).copy(this)
  }
},THREE.Frustum = function (e, t, i, r, n, o) {
  this.planes = [void 0 !== e ? e : new THREE.Plane, void 0 !== t ? t : new THREE.Plane, void 0 !== i ? i : new THREE.Plane, void 0 !== r ? r : new THREE.Plane, void 0 !== n ? n : new THREE.Plane, void 0 !== o ? o : new THREE.Plane]
},THREE.Frustum.prototype = {
  constructor: THREE.Frustum, set: function (e, t, i, r, n, o) {
    var a = this.planes;
    return a[0].copy(e), a[1].copy(t), a[2].copy(i), a[3].copy(r), a[4].copy(n), a[5].copy(o), this
  }, copy: function (e) {
    for (var t = this.planes, i = 0; 6 > i; i++) t[i].copy(e.planes[i]);
    return this
  }, setFromMatrix: function (e) {
    var t = this.planes, i = e.elements;
    e = i[0];
    var r = i[1], n = i[2], o = i[3], a = i[4], s = i[5], l = i[6], h = i[7], c = i[8], u = i[9], p = i[10], d = i[11],
      f = i[12], m = i[13], E = i[14], i = i[15];
    return t[0].setComponents(o - e, h - a, d - c, i - f).normalize(), t[1].setComponents(o + e, h + a, d + c, i + f).normalize(), t[2].setComponents(o + r, h + s, d + u, i + m).normalize(), t[3].setComponents(o - r, h - s, d - u, i - m).normalize(), t[4].setComponents(o - n, h - l, d - p, i - E).normalize(), t[5].setComponents(o + n, h + l, d + p, i + E).normalize(), this
  }, intersectsObject: function () {
    var e = new THREE.Sphere;
    return function (t) {
      var i = t.geometry;
      return null === i.boundingSphere && i.computeBoundingSphere(), e.copy(i.boundingSphere), e.applyMatrix4(t.matrixWorld), this.intersectsSphere(e)
    }
  }(), intersectsSphere: function (e) {
    var t = this.planes, i = e.center;
    e = -e.radius;
    for (var r = 0; 6 > r; r++) if (t[r].distanceToPoint(i) < e) return !1;
    return !0
  }, intersectsBox: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3;
    return function (i) {
      for (var r = this.planes, n = 0; 6 > n; n++) {
        var o = r[n];
        e.x = 0 < o.normal.x ? i.min.x : i.max.x, t.x = 0 < o.normal.x ? i.max.x : i.min.x, e.y = 0 < o.normal.y ? i.min.y : i.max.y, t.y = 0 < o.normal.y ? i.max.y : i.min.y, e.z = 0 < o.normal.z ? i.min.z : i.max.z, t.z = 0 < o.normal.z ? i.max.z : i.min.z;
        var a = o.distanceToPoint(e), o = o.distanceToPoint(t);
        if (0 > a && 0 > o) return !1
      }
      return !0
    }
  }(), containsPoint: function (e) {
    for (var t = this.planes, i = 0; 6 > i; i++) if (0 > t[i].distanceToPoint(e)) return !1;
    return !0
  }, clone: function () {
    return (new THREE.Frustum).copy(this)
  }
},THREE.Plane = function (e, t) {
  this.normal = void 0 !== e ? e : new THREE.Vector3(1, 0, 0), this.constant = void 0 !== t ? t : 0
},THREE.Plane.prototype = {
  constructor: THREE.Plane, set: function (e, t) {
    return this.normal.copy(e), this.constant = t, this
  }, setComponents: function (e, t, i, r) {
    return this.normal.set(e, t, i), this.constant = r, this
  }, setFromNormalAndCoplanarPoint: function (e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this
  }, setFromCoplanarPoints: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3;
    return function (i, r, n) {
      return r = e.subVectors(n, r).cross(t.subVectors(i, r)).normalize(), this.setFromNormalAndCoplanarPoint(r, i), this
    }
  }(), copy: function (e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this
  }, normalize: function () {
    var e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this
  }, negate: function () {
    return this.constant *= -1, this.normal.negate(), this
  }, distanceToPoint: function (e) {
    return this.normal.dot(e) + this.constant
  }, distanceToSphere: function (e) {
    return this.distanceToPoint(e.center) - e.radius
  }, projectPoint: function (e, t) {
    return this.orthoPoint(e, t).sub(e).negate()
  }, orthoPoint: function (e, t) {
    var i = this.distanceToPoint(e);
    return (t || new THREE.Vector3).copy(this.normal).multiplyScalar(i)
  }, isIntersectionLine: function (e) {
    var t = this.distanceToPoint(e.start);
    return e = this.distanceToPoint(e.end), 0 > t && e > 0 || 0 > e && t > 0
  }, intersectLine: function () {
    var e = new THREE.Vector3;
    return function (t, i) {
      var r = i || new THREE.Vector3, n = t.delta(e), o = this.normal.dot(n);
      return 0 != o ? (o = -(t.start.dot(this.normal) + this.constant) / o, 0 > o || o > 1 ? void 0 : r.copy(n).multiplyScalar(o).add(t.start)) : 0 == this.distanceToPoint(t.start) ? r.copy(t.start) : void 0
    }
  }(), coplanarPoint: function (e) {
    return (e || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
  }, applyMatrix4: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Matrix3;
    return function (r, n) {
      var o = n || i.getNormalMatrix(r), o = e.copy(this.normal).applyMatrix3(o), a = this.coplanarPoint(t);
      return a.applyMatrix4(r), this.setFromNormalAndCoplanarPoint(o, a), this
    }
  }(), translate: function (e) {
    return this.constant -= e.dot(this.normal), this
  }, equals: function (e) {
    return e.normal.equals(this.normal) && e.constant == this.constant
  }, clone: function () {
    return (new THREE.Plane).copy(this)
  }
},THREE.Math = {
  generateUUID: function () {
    var e, t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), i = Array(36), r = 0;
    return function () {
      for (var n = 0; 36 > n; n++) 8 == n || 13 == n || 18 == n || 23 == n ? i[n] = "-" : 14 == n ? i[n] = "4" : (2 >= r && (r = 33554432 + 16777216 * Math.random() | 0), e = 15 & r, r >>= 4, i[n] = t[19 == n ? 3 & e | 8 : e]);
      return i.join("")
    }
  }(), clamp: function (e, t, i) {
    return t > e ? t : e > i ? i : e
  }, clampBottom: function (e, t) {
    return t > e ? t : e
  }, mapLinear: function (e, t, i, r, n) {
    return r + (e - t) * (n - r) / (i - t)
  }, smoothstep: function (e, t, i) {
    return t >= e ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * (3 - 2 * e))
  }, smootherstep: function (e, t, i) {
    return t >= e ? 0 : e >= i ? 1 : (e = (e - t) / (i - t), e * e * e * (e * (6 * e - 15) + 10))
  }, random16: function () {
    return (65280 * Math.random() + 255 * Math.random()) / 65535
  }, randInt: function (e, t) {
    return e + Math.floor(Math.random() * (t - e + 1))
  }, randFloat: function (e, t) {
    return e + Math.random() * (t - e)
  }, randFloatSpread: function (e) {
    return e * (.5 - Math.random())
  }, sign: function (e) {
    return 0 > e ? -1 : e > 0 ? 1 : 0
  }, degToRad: function () {
    var e = Math.PI / 180;
    return function (t) {
      return t * e
    }
  }(), radToDeg: function () {
    var e = 180 / Math.PI;
    return function (t) {
      return t * e
    }
  }(), isPowerOfTwo: function (e) {
    return 0 === (e & e - 1) && 0 !== e
  }
},THREE.Spline = function (e) {
  function t(e, t, i, r, n, o, a) {
    return e = .5 * (i - e), r = .5 * (r - t), (2 * (t - i) + e + r) * a + (-3 * (t - i) - 2 * e - r) * o + e * n + t
  }

  this.points = e;
  var i, r, n, o, a, s, l, h, c, u = [], p = {x: 0, y: 0, z: 0};
  this.initFromArray = function (e) {
    this.points = [];
    for (var t = 0; t < e.length; t++) this.points[t] = {x: e[t][0], y: e[t][1], z: e[t][2]}
  }, this.getPoint = function (e) {
    return i = (this.points.length - 1) * e, r = Math.floor(i), n = i - r, u[0] = 0 === r ? r : r - 1, u[1] = r, u[2] = r > this.points.length - 2 ? this.points.length - 1 : r + 1, u[3] = r > this.points.length - 3 ? this.points.length - 1 : r + 2, s = this.points[u[0]], l = this.points[u[1]], h = this.points[u[2]], c = this.points[u[3]], o = n * n, a = n * o, p.x = t(s.x, l.x, h.x, c.x, n, o, a), p.y = t(s.y, l.y, h.y, c.y, n, o, a), p.z = t(s.z, l.z, h.z, c.z, n, o, a), p
  }, this.getControlPointsArray = function () {
    var e, t, i = this.points.length, r = [];
    for (e = 0; i > e; e++) t = this.points[e], r[e] = [t.x, t.y, t.z];
    return r
  }, this.getLength = function (e) {
    var t, i, r, n = t = t = 0, o = new THREE.Vector3, a = new THREE.Vector3, s = [], l = 0;
    for (s[0] = 0, e || (e = 100), i = this.points.length * e, o.copy(this.points[0]), e = 1; i > e; e++) t = e / i, r = this.getPoint(t), a.copy(r), l += a.distanceTo(o), o.copy(r), t *= this.points.length - 1, t = Math.floor(t), t != n && (s[t] = l, n = t);
    return s[s.length] = l, {chunks: s, total: l}
  }, this.reparametrizeByArcLength = function (e) {
    var t, i, r, n, o, a, s = [], l = new THREE.Vector3, h = this.getLength();
    for (s.push(l.copy(this.points[0]).clone()), t = 1; t < this.points.length; t++) {
      for (i = h.chunks[t] - h.chunks[t - 1], a = Math.ceil(e * i / h.total), n = (t - 1) / (this.points.length - 1), o = t / (this.points.length - 1), i = 1; a - 1 > i; i++) r = n + 1 / a * i * (o - n), r = this.getPoint(r), s.push(l.copy(r).clone());
      s.push(l.copy(this.points[t]).clone())
    }
    this.points = s
  }
},THREE.Triangle = function (e, t, i) {
  this.a = void 0 !== e ? e : new THREE.Vector3, this.b = void 0 !== t ? t : new THREE.Vector3, this.c = void 0 !== i ? i : new THREE.Vector3
},THREE.Triangle.normal = function () {
  var e = new THREE.Vector3;
  return function (t, i, r, n) {
    return n = n || new THREE.Vector3, n.subVectors(r, i), e.subVectors(t, i), n.cross(e), t = n.lengthSq(), t > 0 ? n.multiplyScalar(1 / Math.sqrt(t)) : n.set(0, 0, 0)
  }
}(),THREE.Triangle.barycoordFromPoint = function () {
  var e = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Vector3;
  return function (r, n, o, a, s) {
    e.subVectors(a, n), t.subVectors(o, n), i.subVectors(r, n), r = e.dot(e), n = e.dot(t), o = e.dot(i);
    var l = t.dot(t);
    a = t.dot(i);
    var h = r * l - n * n;
    return s = s || new THREE.Vector3, 0 == h ? s.set(-2, -1, -1) : (h = 1 / h, l = (l * o - n * a) * h, r = (r * a - n * o) * h, s.set(1 - l - r, r, l))
  }
}(),THREE.Triangle.containsPoint = function () {
  var e = new THREE.Vector3;
  return function (t, i, r, n) {
    return t = THREE.Triangle.barycoordFromPoint(t, i, r, n, e), 0 <= t.x && 0 <= t.y && 1 >= t.x + t.y
  }
}(),THREE.Triangle.prototype = {
  constructor: THREE.Triangle, set: function (e, t, i) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(i), this
  }, setFromPointsAndIndices: function (e, t, i, r) {
    return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[r]), this
  }, copy: function (e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this
  }, area: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3;
    return function () {
      return e.subVectors(this.c, this.b), t.subVectors(this.a, this.b), .5 * e.cross(t).length()
    }
  }(), midpoint: function (e) {
    return (e || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
  }, normal: function (e) {
    return THREE.Triangle.normal(this.a, this.b, this.c, e)
  }, plane: function (e) {
    return (e || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
  }, barycoordFromPoint: function (e, t) {
    return THREE.Triangle.barycoordFromPoint(e, this.a, this.b, this.c, t)
  }, containsPoint: function (e) {
    return THREE.Triangle.containsPoint(e, this.a, this.b, this.c)
  }, equals: function (e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
  }, clone: function () {
    return (new THREE.Triangle).copy(this)
  }
},THREE.Vertex = function (e) {
  return console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead."), e
},THREE.UV = function (e, t) {
  return console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead."), new THREE.Vector2(e, t)
},THREE.Clock = function (e) {
  this.autoStart = void 0 !== e ? e : !0, this.elapsedTime = this.oldTime = this.startTime = 0, this.running = !1
},THREE.Clock.prototype = {
  constructor: THREE.Clock, start: function () {
    this.oldTime = this.startTime = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(), this.running = !0
  }, stop: function () {
    this.getElapsedTime(), this.running = !1
  }, getElapsedTime: function () {
    return this.getDelta(), this.elapsedTime
  }, getDelta: function () {
    var e = 0;
    if (this.autoStart && !this.running && this.start(), this.running) {
      var t = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(),
        e = .001 * (t - this.oldTime);
      this.oldTime = t, this.elapsedTime += e
    }
    return e
  }
},THREE.EventDispatcher = function () {
},THREE.EventDispatcher.prototype = {
  constructor: THREE.EventDispatcher, apply: function (e) {
    e.addEventListener = THREE.EventDispatcher.prototype.addEventListener, e.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener, e.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener, e.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent
  }, addEventListener: function (e, t) {
    void 0 === this._listeners && (this._listeners = {});
    var i = this._listeners;
    void 0 === i[e] && (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t)
  }, hasEventListener: function (e, t) {
    if (void 0 === this._listeners) return !1;
    var i = this._listeners;
    return void 0 !== i[e] && -1 !== i[e].indexOf(t) ? !0 : !1
  }, removeEventListener: function (e, t) {
    if (void 0 !== this._listeners) {
      var i = this._listeners[e];
      if (void 0 !== i) {
        var r = i.indexOf(t);
        -1 !== r && i.splice(r, 1)
      }
    }
  }, dispatchEvent: function (e) {
    if (void 0 !== this._listeners) {
      var t = this._listeners[e.type];
      if (void 0 !== t) {
        e.target = this;
        for (var i = [], r = t.length, n = 0; r > n; n++) i[n] = t[n];
        for (n = 0; r > n; n++) i[n].call(this, e)
      }
    }
  }
},function (e) {
  e.Raycaster = function (t, i, r, n) {
    this.ray = new e.Ray(t, i), this.near = r || 0, this.far = n || 1 / 0
  };
  var t = new e.Sphere, i = new e.Ray;
  new e.Plane, new e.Vector3;
  var r = new e.Vector3, n = new e.Matrix4, o = function (e, t) {
    return e.distance - t.distance
  }, a = new e.Vector3, s = new e.Vector3, l = new e.Vector3, h = function (o, c, u) {
    if (o instanceof e.Sprite) {
      r.setFromMatrixPosition(o.matrixWorld);
      var p = c.ray.distanceToPoint(r);
      if (p > o.scale.x) return u;
      u.push({distance: p, point: o.position, face: null, object: o})
    } else if (o instanceof e.LOD) r.setFromMatrixPosition(o.matrixWorld), p = c.ray.origin.distanceTo(r), h(o.getObjectForDistance(p), c, u); else if (o instanceof e.Mesh) {
      var d = o.geometry;
      if (null === d.boundingSphere && d.computeBoundingSphere(), t.copy(d.boundingSphere), t.applyMatrix4(o.matrixWorld), !1 === c.ray.isIntersectionSphere(t)) return u;
      if (n.getInverse(o.matrixWorld), i.copy(c.ray).applyMatrix4(n), null !== d.boundingBox && !1 === i.isIntersectionBox(d.boundingBox)) return u;
      if (d instanceof e.BufferGeometry) {
        var f = o.material;
        if (void 0 === f) return u;
        var m, E, g = d.attributes, v = c.precision;
        if (void 0 !== g.index) {
          var y = g.index.array, T = g.position.array, x = d.offsets;
          0 === x.length && (x = [{start: 0, count: T.length, index: 0}]);
          for (var R = 0, b = x.length; b > R; ++R) for (var g = x[R].start, H = x[R].index, d = g, w = g + x[R].count; w > d; d += 3) {
            g = H + y[d], m = H + y[d + 1], E = H + y[d + 2], a.set(T[3 * g], T[3 * g + 1], T[3 * g + 2]), s.set(T[3 * m], T[3 * m + 1], T[3 * m + 2]), l.set(T[3 * E], T[3 * E + 1], T[3 * E + 2]);
            var _ = f.side === e.BackSide ? i.intersectTriangle(l, s, a, !0) : i.intersectTriangle(a, s, l, f.side !== e.DoubleSide);
            null !== _ && (_.applyMatrix4(o.matrixWorld), p = c.ray.origin.distanceTo(_), v > p || p < c.near || p > c.far || u.push({
              distance: p,
              point: _,
              indices: [g, m, E],
              face: null,
              faceIndex: null,
              object: o
            }))
          }
        } else for (T = g.position.array, d = 0, w = g.position.array.length; w > d; d += 3) g = d, m = d + 1, E = d + 2, a.set(T[3 * g], T[3 * g + 1], T[3 * g + 2]), s.set(T[3 * m], T[3 * m + 1], T[3 * m + 2]), l.set(T[3 * E], T[3 * E + 1], T[3 * E + 2]), _ = f.side === e.BackSide ? i.intersectTriangle(l, s, a, !0) : i.intersectTriangle(a, s, l, f.side !== e.DoubleSide), null !== _ && (_.applyMatrix4(o.matrixWorld), p = c.ray.origin.distanceTo(_), v > p || p < c.near || p > c.far || u.push({
          distance: p,
          point: _,
          indices: [g, m, E],
          face: null,
          faceIndex: null,
          object: o
        }))
      } else if (d instanceof e.Geometry) for (T = o.material instanceof e.MeshFaceMaterial, x = !0 === T ? o.material.materials : null, v = c.precision, y = d.vertices, R = 0, b = d.faces.length; b > R; R++) if (H = d.faces[R], f = !0 === T ? x[H.materialIndex] : o.material, void 0 !== f) {
        if (g = y[H.a], m = y[H.b], E = y[H.c], !0 === f.morphTargets) {
          p = d.morphTargets, _ = o.morphTargetInfluences, a.set(0, 0, 0), s.set(0, 0, 0), l.set(0, 0, 0);
          for (var w = 0, S = p.length; S > w; w++) {
            var M = _[w];
            if (0 !== M) {
              var C = p[w].vertices;
              a.x += (C[H.a].x - g.x) * M, a.y += (C[H.a].y - g.y) * M, a.z += (C[H.a].z - g.z) * M, s.x += (C[H.b].x - m.x) * M, s.y += (C[H.b].y - m.y) * M, s.z += (C[H.b].z - m.z) * M, l.x += (C[H.c].x - E.x) * M, l.y += (C[H.c].y - E.y) * M, l.z += (C[H.c].z - E.z) * M
            }
          }
          a.add(g), s.add(m), l.add(E), g = a, m = s, E = l
        }
        _ = f.side === e.BackSide ? i.intersectTriangle(E, m, g, !0) : i.intersectTriangle(g, m, E, f.side !== e.DoubleSide), null !== _ && (_.applyMatrix4(o.matrixWorld), p = c.ray.origin.distanceTo(_), v > p || p < c.near || p > c.far || u.push({
          distance: p,
          point: _,
          face: H,
          faceIndex: R,
          object: o
        }))
      }
    } else if (o instanceof e.Line) {
      if (v = c.linePrecision, f = v * v, d = o.geometry, null === d.boundingSphere && d.computeBoundingSphere(), t.copy(d.boundingSphere), t.applyMatrix4(o.matrixWorld), !1 === c.ray.isIntersectionSphere(t)) return u;
      if (n.getInverse(o.matrixWorld), i.copy(c.ray).applyMatrix4(n), d instanceof e.Geometry) for (y = d.vertices, v = y.length, g = new e.Vector3, m = new e.Vector3, E = o.type === e.LineStrip ? 1 : 2, d = 0; v - 1 > d; d += E) i.distanceSqToSegment(y[d], y[d + 1], m, g) > f || (p = i.origin.distanceTo(m), p < c.near || p > c.far || u.push({
        distance: p,
        point: g.clone().applyMatrix4(o.matrixWorld),
        face: null,
        faceIndex: null,
        object: o
      }))
    }
  }, c = function (e, t, i) {
    e = e.getDescendants();
    for (var r = 0, n = e.length; n > r; r++) h(e[r], t, i)
  };
  e.Raycaster.prototype.precision = 1e-4, e.Raycaster.prototype.linePrecision = 1, e.Raycaster.prototype.set = function (e, t) {
    this.ray.set(e, t)
  }, e.Raycaster.prototype.intersectObject = function (e, t) {
    var i = [];
    return !0 === t && c(e, this, i), h(e, this, i), i.sort(o), i
  }, e.Raycaster.prototype.intersectObjects = function (e, t) {
    for (var i = [], r = 0, n = e.length; n > r; r++) h(e[r], this, i), !0 === t && c(e[r], this, i);
    return i.sort(o), i
  }
}(THREE),THREE.Object3D = function () {
  this.id = THREE.Object3DIdCount++, this.uuid = THREE.Math.generateUUID(), this.name = "", this.parent = void 0, this.children = [], this.up = new THREE.Vector3(0, 1, 0), this.position = new THREE.Vector3, this._rotation = new THREE.Euler, this._quaternion = new THREE.Quaternion, this.scale = new THREE.Vector3(1, 1, 1), this._rotation._quaternion = this.quaternion, this._quaternion._euler = this.rotation, this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new THREE.Matrix4, this.matrixWorld = new THREE.Matrix4, this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !1, this.visible = !0, this.receiveShadow = this.castShadow = !1, this.frustumCulled = !0, this.userData = {}
},THREE.Object3D.prototype = {
  constructor: THREE.Object3D, get rotation() {
    return this._rotation
  }, set rotation(e) {
    this._rotation = e, this._rotation._quaternion = this._quaternion, this._quaternion._euler = this._rotation, this._rotation._updateQuaternion()
  }, get quaternion() {
    return this._quaternion
  }, set quaternion(e) {
    this._quaternion = e, this._quaternion._euler = this._rotation, this._rotation._quaternion = this._quaternion, this._quaternion._updateEuler()
  }, get eulerOrder() {
    return console.warn("DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order."), this.rotation.order
  }, set eulerOrder(e) {
    console.warn("DEPRECATED: Object3D's .eulerOrder has been moved to Object3D's .rotation.order."), this.rotation.order = e
  }, get useQuaternion() {
    console.warn("DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default.")
  }, set useQuaternion(e) {
    console.warn("DEPRECATED: Object3D's .useQuaternion has been removed. The library now uses quaternions by default.")
  }, applyMatrix: function (e) {
    this.matrix.multiplyMatrices(e, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
  }, setRotationFromAxisAngle: function (e, t) {
    this.quaternion.setFromAxisAngle(e, t)
  }, setRotationFromEuler: function (e) {
    this.quaternion.setFromEuler(e, !0)
  }, setRotationFromMatrix: function (e) {
    this.quaternion.setFromRotationMatrix(e)
  }, setRotationFromQuaternion: function (e) {
    this.quaternion.copy(e)
  }, rotateOnAxis: function () {
    var e = new THREE.Quaternion;
    return function (t, i) {
      return e.setFromAxisAngle(t, i), this.quaternion.multiply(e), this
    }
  }(), rotateX: function () {
    var e = new THREE.Vector3(1, 0, 0);
    return function (t) {
      return this.rotateOnAxis(e, t)
    }
  }(), rotateY: function () {
    var e = new THREE.Vector3(0, 1, 0);
    return function (t) {
      return this.rotateOnAxis(e, t)
    }
  }(), rotateZ: function () {
    var e = new THREE.Vector3(0, 0, 1);
    return function (t) {
      return this.rotateOnAxis(e, t)
    }
  }(), translateOnAxis: function () {
    var e = new THREE.Vector3;
    return function (t, i) {
      return e.copy(t), e.applyQuaternion(this.quaternion), this.position.add(e.multiplyScalar(i)), this
    }
  }(), translate: function (e, t) {
    return console.warn("DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed."), this.translateOnAxis(t, e)
  }, translateX: function () {
    var e = new THREE.Vector3(1, 0, 0);
    return function (t) {
      return this.translateOnAxis(e, t)
    }
  }(), translateY: function () {
    var e = new THREE.Vector3(0, 1, 0);
    return function (t) {
      return this.translateOnAxis(e, t)
    }
  }(), translateZ: function () {
    var e = new THREE.Vector3(0, 0, 1);
    return function (t) {
      return this.translateOnAxis(e, t)
    }
  }(), localToWorld: function (e) {
    return e.applyMatrix4(this.matrixWorld)
  }, worldToLocal: function () {
    var e = new THREE.Matrix4;
    return function (t) {
      return t.applyMatrix4(e.getInverse(this.matrixWorld))
    }
  }(), lookAt: function () {
    var e = new THREE.Matrix4;
    return function (t) {
      e.lookAt(t, this.position, this.up), this.quaternion.setFromRotationMatrix(e)
    }
  }(), add: function (e) {
    if (e === this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself."); else if (e instanceof THREE.Object3D) {
      void 0 !== e.parent && e.parent.remove(e), e.parent = this, e.dispatchEvent({type: "added"}), this.children.push(e);
      for (var t = this; void 0 !== t.parent;) t = t.parent;
      void 0 !== t && t instanceof THREE.Scene && t.__addObject(e)
    }
  }, remove: function (e) {
    var t = this.children.indexOf(e);
    if (-1 !== t) {
      for (e.parent = void 0, e.dispatchEvent({type: "removed"}), this.children.splice(t, 1), t = this; void 0 !== t.parent;) t = t.parent;
      void 0 !== t && t instanceof THREE.Scene && t.__removeObject(e)
    }
  }, traverse: function (e) {
    e(this);
    for (var t = 0, i = this.children.length; i > t; t++) this.children[t].traverse(e)
  }, getObjectById: function (e, t) {
    for (var i = 0, r = this.children.length; r > i; i++) {
      var n = this.children[i];
      if (n.id === e || !0 === t && (n = n.getObjectById(e, t), void 0 !== n)) return n
    }
  }, getObjectByName: function (e, t) {
    for (var i = 0, r = this.children.length; r > i; i++) {
      var n = this.children[i];
      if (n.name === e || !0 === t && (n = n.getObjectByName(e, t), void 0 !== n)) return n
    }
  }, getChildByName: function (e, t) {
    return console.warn("DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(e, t)
  }, getDescendants: function (e) {
    void 0 === e && (e = []), Array.prototype.push.apply(e, this.children);
    for (var t = 0, i = this.children.length; i > t; t++) this.children[t].getDescendants(e);
    return e
  }, updateMatrix: function () {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
  }, updateMatrixWorld: function (e) {
    !0 === this.matrixAutoUpdate && this.updateMatrix(), (!0 === this.matrixWorldNeedsUpdate || !0 === e) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
    for (var t = 0, i = this.children.length; i > t; t++) this.children[t].updateMatrixWorld(e)
  }, clone: function (e, t) {
    if (void 0 === e && (e = new THREE.Object3D), void 0 === t && (t = !0), e.name = this.name, e.up.copy(this.up), e.position.copy(this.position), e.quaternion.copy(this.quaternion), e.scale.copy(this.scale), e.renderDepth = this.renderDepth, e.rotationAutoUpdate = this.rotationAutoUpdate, e.matrix.copy(this.matrix), e.matrixWorld.copy(this.matrixWorld), e.matrixAutoUpdate = this.matrixAutoUpdate, e.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, e.visible = this.visible, e.castShadow = this.castShadow, e.receiveShadow = this.receiveShadow, e.frustumCulled = this.frustumCulled, e.userData = JSON.parse(JSON.stringify(this.userData)), !0 === t) for (var i = 0; i < this.children.length; i++) e.add(this.children[i].clone());
    return e
  }
},THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype),THREE.Object3DIdCount = 0,THREE.Projector = function () {
  function e() {
    if (l === y) {
      var e = new THREE.RenderableVertex;
      return v.push(e), y++, l++, e
    }
    return v[l++]
  }

  function t() {
    if (c === x) {
      var e = new THREE.RenderableFace;
      return T.push(e), x++, c++, e
    }
    return T[c++]
  }

  function i() {
    if (p === b) {
      var e = new THREE.RenderableLine;
      return R.push(e), b++, p++, e
    }
    return R[p++]
  }

  function r(e, t) {
    return e.z !== t.z ? t.z - e.z : e.id !== t.id ? e.id - t.id : 0
  }

  function n(e, t) {
    var i = 0, r = 1, n = e.z + e.w, o = t.z + t.w, a = -e.z + e.w, s = -t.z + t.w;
    return n >= 0 && o >= 0 && a >= 0 && s >= 0 ? !0 : 0 > n && 0 > o || 0 > a && 0 > s ? !1 : (0 > n ? i = Math.max(i, n / (n - o)) : 0 > o && (r = Math.min(r, n / (n - o))), 0 > a ? i = Math.max(i, a / (a - s)) : 0 > s && (r = Math.min(r, a / (a - s))), i > r ? !1 : (e.lerp(t, i), t.lerp(e, 1 - r), !0))
  }

  var o, a, s, l, h, c, u, p, d, f, m, E = [], g = 0, v = [], y = 0, T = [], x = 0, R = [], b = 0, H = [], w = 0,
    _ = {objects: [], lights: [], elements: []}, S = new THREE.Vector3, M = new THREE.Vector3, C = new THREE.Vector3,
    A = new THREE.Vector3, L = new THREE.Vector4,
    D = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)), P = new THREE.Box3, F = Array(3),
    k = new THREE.Matrix4, N = new THREE.Matrix4, U = new THREE.Matrix4, z = new THREE.Matrix3, O = new THREE.Frustum,
    B = new THREE.Vector4, V = new THREE.Vector4;
  this.projectVector = function (e, t) {
    return t.matrixWorldInverse.getInverse(t.matrixWorld), N.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), e.applyProjection(N)
  }, this.unprojectVector = function () {
    var e = new THREE.Matrix4;
    return function (t, i) {
      return e.getInverse(i.projectionMatrix), N.multiplyMatrices(i.matrixWorld, e), t.applyProjection(N)
    }
  }(), this.pickingRay = function (e, t) {
    e.z = -1;
    var i = new THREE.Vector3(e.x, e.y, 1);
    return this.unprojectVector(e, t), this.unprojectVector(i, t), i.sub(e).normalize(), new THREE.Raycaster(e, i)
  };
  var I = function (e) {
    if (!1 !== e.visible) {
      if (e instanceof THREE.Light) _.lights.push(e); else if ((e instanceof THREE.Mesh || e instanceof THREE.Line || e instanceof THREE.Sprite) && (!1 === e.frustumCulled || !0 === O.intersectsObject(e))) {
        if (a === g) {
          var t = new THREE.RenderableObject;
          E.push(t), g++, a++, o = t
        } else o = E[a++];
        o.id = e.id, o.object = e, null !== e.renderDepth ? o.z = e.renderDepth : (A.setFromMatrixPosition(e.matrixWorld), A.applyProjection(N), o.z = A.z), _.objects.push(o)
      }
      for (var t = 0, i = e.children.length; i > t; t++) I(e.children[t])
    }
  }, j = new function () {
    var r = [], n = [], o = null, a = null, l = new THREE.Matrix3, c = function (e) {
      var t = e.positionWorld, i = e.positionScreen;
      t.copy(e.position).applyMatrix4(m), i.copy(t).applyMatrix4(N), t = 1 / i.w, i.x *= t, i.y *= t, i.z *= t, e.visible = -1 <= i.x && 1 >= i.x && -1 <= i.y && 1 >= i.y && -1 <= i.z && 1 >= i.z
    }, p = function (e, t, i) {
      return !0 === e.visible || !0 === t.visible || !0 === i.visible ? !0 : (F[0] = e.positionScreen, F[1] = t.positionScreen, F[2] = i.positionScreen, D.isIntersectionBox(P.setFromPoints(F)))
    }, d = function (e, t, i) {
      return 0 > (i.positionScreen.x - e.positionScreen.x) * (t.positionScreen.y - e.positionScreen.y) - (i.positionScreen.y - e.positionScreen.y) * (t.positionScreen.x - e.positionScreen.x)
    };
    return {
      setObject: function (e) {
        o = e, a = o.material, l.getNormalMatrix(o.matrixWorld), r.length = 0, n.length = 0
      }, projectVertex: c, checkTriangleVisibility: p, checkBackfaceCulling: d, pushVertex: function (t, i, r) {
        s = e(), s.position.set(t, i, r), c(s)
      }, pushNormal: function (e, t, i) {
        r.push(e, t, i)
      }, pushUv: function (e, t) {
        n.push(e, t)
      }, pushLine: function (e, t) {
        var r = v[e], n = v[t];
        u = i(), u.id = o.id, u.v1.copy(r), u.v2.copy(n), u.z = (r.positionScreen.z + n.positionScreen.z) / 2, u.material = o.material, _.elements.push(u)
      }, pushTriangle: function (e, i, s) {
        var c = v[e], u = v[i], f = v[s];
        if (!1 !== p(c, u, f) && (a.side === THREE.DoubleSide || !0 === d(c, u, f))) {
          for (h = t(), h.id = o.id, h.v1.copy(c), h.v2.copy(u), h.v3.copy(f), h.z = (c.positionScreen.z + u.positionScreen.z + f.positionScreen.z) / 3, c = 0; 3 > c; c++) u = 3 * arguments[c], f = h.vertexNormalsModel[c], f.set(r[u], r[u + 1], r[u + 2]), f.applyMatrix3(l).normalize(), u = 2 * arguments[c], h.uvs[c].set(n[u], n[u + 1]);
          h.vertexNormalsLength = 3, h.material = o.material, _.elements.push(h)
        }
      }
    }
  };
  this.projectScene = function (o, s, E, g) {
    var y, T, x, R, b, A, D, P;
    for (f = p = c = 0, _.elements.length = 0, !0 === o.autoUpdate && o.updateMatrixWorld(), void 0 === s.parent && s.updateMatrixWorld(), k.copy(s.matrixWorldInverse.getInverse(s.matrixWorld)), N.multiplyMatrices(s.projectionMatrix, k), O.setFromMatrix(N), a = 0, _.objects.length = 0, _.lights.length = 0, I(o), !0 === E && _.objects.sort(r), o = 0, E = _.objects.length; E > o; o++) if (y = _.objects[o].object, T = y.geometry, j.setObject(y), m = y.matrixWorld, l = 0, y instanceof THREE.Mesh) {
      if (T instanceof THREE.BufferGeometry) {
        if (A = T.attributes, y = T.offsets, void 0 !== A.position) {
          for (D = A.position.array, T = 0, R = D.length; R > T; T += 3) j.pushVertex(D[T], D[T + 1], D[T + 2]);
          if (void 0 !== A.normal) for (P = A.normal.array, T = 0, R = P.length; R > T; T += 3) j.pushNormal(P[T], P[T + 1], P[T + 2]);
          if (void 0 !== A.uv) for (P = A.uv.array, T = 0, R = P.length; R > T; T += 2) j.pushUv(P[T], P[T + 1]);
          if (void 0 !== A.index) if (A = A.index.array, 0 < y.length) for (o = 0; o < y.length; o++) for (R = y[o], D = R.index, T = R.start, R = R.start + R.count; R > T; T += 3) j.pushTriangle(A[T] + D, A[T + 1] + D, A[T + 2] + D); else for (T = 0, R = A.length; R > T; T += 3) j.pushTriangle(A[T], A[T + 1], A[T + 2]); else for (T = 0, R = D.length / 3; R > T; T += 3) j.pushTriangle(T, T + 1, T + 2)
        }
      } else if (T instanceof THREE.Geometry) {
        x = T.vertices, R = T.faces, A = T.faceVertexUvs[0], z.getNormalMatrix(m), D = y.material instanceof THREE.MeshFaceMaterial, P = !0 === D ? y.material : null;
        for (var F = 0, W = x.length; W > F; F++) {
          var G = x[F];
          j.pushVertex(G.x, G.y, G.z)
        }
        for (F = 0, W = R.length; W > F; F++) {
          x = R[F];
          var X = !0 === D ? P.materials[x.materialIndex] : y.material;
          if (void 0 !== X) {
            var q = X.side, G = v[x.a], Y = v[x.b], K = v[x.c];
            if (!0 === X.morphTargets) {
              b = T.morphTargets;
              var $ = y.morphTargetInfluences, Q = G.position, Z = Y.position, J = K.position;
              S.set(0, 0, 0), M.set(0, 0, 0), C.set(0, 0, 0);
              for (var ee = 0, te = b.length; te > ee; ee++) {
                var ie = $[ee];
                if (0 !== ie) {
                  var re = b[ee].vertices;
                  S.x += (re[x.a].x - Q.x) * ie, S.y += (re[x.a].y - Q.y) * ie, S.z += (re[x.a].z - Q.z) * ie, M.x += (re[x.b].x - Z.x) * ie, M.y += (re[x.b].y - Z.y) * ie, M.z += (re[x.b].z - Z.z) * ie, C.x += (re[x.c].x - J.x) * ie, C.y += (re[x.c].y - J.y) * ie, C.z += (re[x.c].z - J.z) * ie
                }
              }
              G.position.add(S), Y.position.add(M), K.position.add(C), j.projectVertex(G), j.projectVertex(Y), j.projectVertex(K)
            }
            if (!1 !== j.checkTriangleVisibility(G, Y, K)) {
              if ($ = j.checkBackfaceCulling(G, Y, K), q !== THREE.DoubleSide) {
                if (q === THREE.FrontSide && !1 === $) continue;
                if (q === THREE.BackSide && !0 === $) continue
              }
              for (h = t(), h.id = y.id, h.v1.copy(G), h.v2.copy(Y), h.v3.copy(K), h.normalModel.copy(x.normal), !1 !== $ || q !== THREE.BackSide && q !== THREE.DoubleSide || h.normalModel.negate(), h.normalModel.applyMatrix3(z).normalize(), b = x.vertexNormals, Q = 0, Z = Math.min(b.length, 3); Z > Q; Q++) J = h.vertexNormalsModel[Q], J.copy(b[Q]), !1 !== $ || q !== THREE.BackSide && q !== THREE.DoubleSide || J.negate(), J.applyMatrix3(z).normalize();
              if (h.vertexNormalsLength = b.length, q = A[F], void 0 !== q) for (b = 0; 3 > b; b++) h.uvs[b].copy(q[b]);
              h.color = x.color, h.material = X, h.z = (G.positionScreen.z + Y.positionScreen.z + K.positionScreen.z) / 3, _.elements.push(h)
            }
          }
        }
      }
    } else if (y instanceof THREE.Line) {
      if (T instanceof THREE.BufferGeometry) {
        if (A = T.attributes, void 0 !== A.position) {
          for (D = A.position.array, T = 0, R = D.length; R > T; T += 3) j.pushVertex(D[T], D[T + 1], D[T + 2]);
          if (void 0 !== A.index) for (A = A.index.array, T = 0, R = A.length; R > T; T += 2) j.pushLine(A[T], A[T + 1]); else for (T = 0, R = D.length / 3 - 1; R > T; T++) j.pushLine(T, T + 1)
        }
      } else if (T instanceof THREE.Geometry && (U.multiplyMatrices(N, m), x = y.geometry.vertices, 0 !== x.length)) for (G = e(), G.positionScreen.copy(x[0]).applyMatrix4(U), T = y.type === THREE.LinePieces ? 2 : 1, F = 1, W = x.length; W > F; F++) G = e(), G.positionScreen.copy(x[F]).applyMatrix4(U), (F + 1) % T > 0 || (Y = v[l - 2], B.copy(G.positionScreen), V.copy(Y.positionScreen), !0 === n(B, V) && (B.multiplyScalar(1 / B.w), V.multiplyScalar(1 / V.w), u = i(), u.id = y.id, u.v1.positionScreen.copy(B), u.v2.positionScreen.copy(V), u.z = Math.max(B.z, V.z), u.material = y.material, y.material.vertexColors === THREE.VertexColors && (u.vertexColors[0].copy(y.geometry.colors[F]), u.vertexColors[1].copy(y.geometry.colors[F - 1])), _.elements.push(u)))
    } else y instanceof THREE.Sprite && (L.set(m.elements[12], m.elements[13], m.elements[14], 1), L.applyMatrix4(N), T = 1 / L.w, L.z *= T, -1 <= L.z && 1 >= L.z && (f === w ? (R = new THREE.RenderableSprite, H.push(R), w++, f++, d = R) : d = H[f++], d.id = y.id, d.x = L.x * T, d.y = L.y * T, d.z = L.z, d.object = y, d.rotation = y.rotation, d.scale.x = y.scale.x * Math.abs(d.x - (L.x + s.projectionMatrix.elements[0]) / (L.w + s.projectionMatrix.elements[12])), d.scale.y = y.scale.y * Math.abs(d.y - (L.y + s.projectionMatrix.elements[5]) / (L.w + s.projectionMatrix.elements[13])), d.material = y.material, _.elements.push(d)));
    return !0 === g && _.elements.sort(r), _
  }
},THREE.Face3 = function (e, t, i, r, n, o) {
  this.a = e, this.b = t, this.c = i, this.normal = r instanceof THREE.Vector3 ? r : new THREE.Vector3, this.vertexNormals = r instanceof Array ? r : [], this.color = n instanceof THREE.Color ? n : new THREE.Color, this.vertexColors = n instanceof Array ? n : [], this.vertexTangents = [], this.materialIndex = void 0 !== o ? o : 0
},THREE.Face3.prototype = {
  constructor: THREE.Face3, clone: function () {
    var e = new THREE.Face3(this.a, this.b, this.c);
    e.normal.copy(this.normal), e.color.copy(this.color), e.materialIndex = this.materialIndex;
    var t, i;
    for (t = 0, i = this.vertexNormals.length; i > t; t++) e.vertexNormals[t] = this.vertexNormals[t].clone();
    for (t = 0, i = this.vertexColors.length; i > t; t++) e.vertexColors[t] = this.vertexColors[t].clone();
    for (t = 0, i = this.vertexTangents.length; i > t; t++) e.vertexTangents[t] = this.vertexTangents[t].clone();
    return e
  }
},THREE.Face4 = function (e, t, i, r, n, o, a) {
  return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new THREE.Face3(e, t, i, n, o, a)
},THREE.BufferAttribute = function () {
},THREE.BufferAttribute.prototype = {
  constructor: THREE.BufferAttribute, get length() {
    return this.array.length
  }, set: function (e) {
    this.array.set(e)
  }, setX: function (e, t) {
    this.array[e * this.itemSize] = t
  }, setY: function (e, t) {
    this.array[e * this.itemSize + 1] = t
  }, setZ: function (e, t) {
    this.array[e * this.itemSize + 2] = t
  }, setXY: function (e, t, i) {
    e *= this.itemSize, this.array[e] = t, this.array[e + 1] = i
  }, setXYZ: function (e, t, i, r) {
    e *= this.itemSize, this.array[e] = t, this.array[e + 1] = i, this.array[e + 2] = r
  }, setXYZW: function (e, t, i, r, n) {
    e *= this.itemSize, this.array[e] = t, this.array[e + 1] = i, this.array[e + 2] = r, this.array[e + 3] = n
  }
},THREE.Int8Attribute = function (e, t) {
  this.array = new Int8Array(e * t), this.itemSize = t
},THREE.Int8Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Uint8Attribute = function (e, t) {
  this.array = new Uint8Array(e * t), this.itemSize = t
},THREE.Uint8Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Uint8ClampedAttribute = function (e, t) {
  this.array = new Uint8ClampedArray(e * t), this.itemSize = t
},THREE.Uint8ClampedAttribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Int16Attribute = function (e, t) {
  this.array = new Int16Array(e * t), this.itemSize = t
},THREE.Int16Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Uint16Attribute = function (e, t) {
  this.array = new Uint16Array(e * t), this.itemSize = t
},THREE.Uint16Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Int32Attribute = function (e, t) {
  this.array = new Int32Array(e * t), this.itemSize = t
},THREE.Int32Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Uint32Attribute = function (e, t) {
  this.array = new Uint32Array(e * t), this.itemSize = t
},THREE.Uint32Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Float32Attribute = function (e, t) {
  this.array = new Float32Array(e * t), this.itemSize = t
},THREE.Float32Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.Float64Attribute = function (e, t) {
  this.array = new Float64Array(e * t), this.itemSize = t
},THREE.Float64Attribute.prototype = Object.create(THREE.BufferAttribute.prototype),THREE.BufferGeometry = function () {
  this.id = THREE.GeometryIdCount++, this.uuid = THREE.Math.generateUUID(), this.name = "", this.attributes = {}, this.offsets = this.drawcalls = [], this.boundingSphere = this.boundingBox = null
},THREE.BufferGeometry.prototype = {
  constructor: THREE.BufferGeometry, addAttribute: function (e, t, i) {
    !1 == t instanceof THREE.BufferAttribute ? (console.warn("DEPRECATED: BufferGeometry's addAttribute() now expects ( name, attribute )."), this.attributes[e] = {
      array: t,
      itemSize: i
    }) : this.attributes[e] = t
  }, getAttribute: function (e) {
    return this.attributes[e]
  }, addDrawCall: function (e, t, i) {
    this.drawcalls.push({start: e, count: t, index: void 0 !== i ? i : 0})
  }, applyMatrix: function (e) {
    var t = this.attributes.position;
    void 0 !== t && (e.applyToVector3Array(t.array), t.needsUpdate = !0), t = this.attributes.normal, void 0 !== t && ((new THREE.Matrix3).getNormalMatrix(e).applyToVector3Array(t.array), t.needsUpdate = !0)
  }, computeBoundingBox: function () {
    null === this.boundingBox && (this.boundingBox = new THREE.Box3);
    var e = this.attributes.position.array;
    if (e) {
      var t = this.boundingBox;
      3 <= e.length && (t.min.x = t.max.x = e[0], t.min.y = t.max.y = e[1], t.min.z = t.max.z = e[2]);
      for (var i = 3, r = e.length; r > i; i += 3) {
        var n = e[i], o = e[i + 1], a = e[i + 2];
        n < t.min.x ? t.min.x = n : n > t.max.x && (t.max.x = n), o < t.min.y ? t.min.y = o : o > t.max.y && (t.max.y = o), a < t.min.z ? t.min.z = a : a > t.max.z && (t.max.z = a)
      }
    }
    (void 0 === e || 0 === e.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0))
  }, computeBoundingSphere: function () {
    var e = new THREE.Box3, t = new THREE.Vector3;
    return function () {
      null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
      var i = this.attributes.position.array;
      if (i) {
        e.makeEmpty();
        for (var r = this.boundingSphere.center, n = 0, o = i.length; o > n; n += 3) t.set(i[n], i[n + 1], i[n + 2]), e.addPoint(t);
        e.center(r);
        for (var a = 0, n = 0, o = i.length; o > n; n += 3) t.set(i[n], i[n + 1], i[n + 2]), a = Math.max(a, r.distanceToSquared(t));
        this.boundingSphere.radius = Math.sqrt(a)
      }
    }
  }(), computeFaceNormals: function () {
  }, computeVertexNormals: function () {
    if (this.attributes.position) {
      var e, t, i, r;
      if (e = this.attributes.position.array.length, void 0 === this.attributes.normal) this.attributes.normal = {
        itemSize: 3,
        array: new Float32Array(e)
      }; else for (e = 0, t = this.attributes.normal.array.length; t > e; e++) this.attributes.normal.array[e] = 0;
      var n, o, a, s, l, h, c = this.attributes.position.array, u = this.attributes.normal.array, p = new THREE.Vector3,
        d = new THREE.Vector3, f = new THREE.Vector3, m = new THREE.Vector3, E = new THREE.Vector3;
      if (this.attributes.index) {
        var g = this.attributes.index.array, v = this.offsets;
        for (i = 0, r = v.length; r > i; ++i) {
          t = v[i].start, n = v[i].count;
          var y = v[i].index;
          for (e = t, t += n; t > e; e += 3) n = y + g[e], o = y + g[e + 1], a = y + g[e + 2], s = c[3 * n], l = c[3 * n + 1], h = c[3 * n + 2], p.set(s, l, h), s = c[3 * o], l = c[3 * o + 1], h = c[3 * o + 2], d.set(s, l, h), s = c[3 * a], l = c[3 * a + 1], h = c[3 * a + 2], f.set(s, l, h), m.subVectors(f, d), E.subVectors(p, d), m.cross(E), u[3 * n] += m.x, u[3 * n + 1] += m.y, u[3 * n + 2] += m.z, u[3 * o] += m.x, u[3 * o + 1] += m.y, u[3 * o + 2] += m.z, u[3 * a] += m.x, u[3 * a + 1] += m.y, u[3 * a + 2] += m.z
        }
      } else for (e = 0, t = c.length; t > e; e += 9) s = c[e], l = c[e + 1], h = c[e + 2], p.set(s, l, h), s = c[e + 3], l = c[e + 4], h = c[e + 5], d.set(s, l, h), s = c[e + 6], l = c[e + 7], h = c[e + 8], f.set(s, l, h), m.subVectors(f, d), E.subVectors(p, d), m.cross(E), u[e] = m.x, u[e + 1] = m.y, u[e + 2] = m.z, u[e + 3] = m.x, u[e + 4] = m.y, u[e + 5] = m.z, u[e + 6] = m.x, u[e + 7] = m.y, u[e + 8] = m.z;
      this.normalizeNormals(), this.normalsNeedUpdate = !0
    }
  }, normalizeNormals: function () {
    for (var e, t, i, r = this.attributes.normal.array, n = 0, o = r.length; o > n; n += 3) e = r[n], t = r[n + 1], i = r[n + 2], e = 1 / Math.sqrt(e * e + t * t + i * i), r[n] *= e, r[n + 1] *= e, r[n + 2] *= e
  }, computeTangents: function () {
    function e(e, t, i) {
      u = r[3 * e], p = r[3 * e + 1], d = r[3 * e + 2], f = r[3 * t], m = r[3 * t + 1], E = r[3 * t + 2], g = r[3 * i], v = r[3 * i + 1], y = r[3 * i + 2], T = o[2 * e], x = o[2 * e + 1], R = o[2 * t], b = o[2 * t + 1], H = o[2 * i], w = o[2 * i + 1], _ = f - u, S = g - u, M = m - p, C = v - p, A = E - d, L = y - d, D = R - T, P = H - T, F = b - x, k = w - x, N = 1 / (D * k - P * F), I.set((k * _ - F * S) * N, (k * M - F * C) * N, (k * A - F * L) * N), j.set((D * S - P * _) * N, (D * C - P * M) * N, (D * L - P * A) * N), l[e].add(I), l[t].add(I), l[i].add(I), h[e].add(j), h[t].add(j), h[i].add(j)
    }

    function t(e) {
      Q.x = n[3 * e], Q.y = n[3 * e + 1], Q.z = n[3 * e + 2], Z.copy(Q), q = l[e], K.copy(q), K.sub(Q.multiplyScalar(Q.dot(q))).normalize(), $.crossVectors(Z, q), Y = $.dot(h[e]), X = 0 > Y ? -1 : 1, s[4 * e] = K.x, s[4 * e + 1] = K.y, s[4 * e + 2] = K.z, s[4 * e + 3] = X
    }

    if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"); else {
      var i = this.attributes.index.array, r = this.attributes.position.array, n = this.attributes.normal.array,
        o = this.attributes.uv.array, a = r.length / 3;
      void 0 === this.attributes.tangent && (this.attributes.tangent = {itemSize: 4, array: new Float32Array(4 * a)});
      for (var s = this.attributes.tangent.array, l = [], h = [], c = 0; a > c; c++) l[c] = new THREE.Vector3, h[c] = new THREE.Vector3;
      var u, p, d, f, m, E, g, v, y, T, x, R, b, H, w, _, S, M, C, A, L, D, P, F, k, N, U, z, O, B, V,
        I = new THREE.Vector3, j = new THREE.Vector3, W = this.offsets, c = 0;
      for (z = W.length; z > c; ++c) {
        U = W[c].start, O = W[c].count;
        var G = W[c].index, a = U;
        for (U += O; U > a; a += 3) O = G + i[a], B = G + i[a + 1], V = G + i[a + 2], e(O, B, V)
      }
      var X, q, Y, K = new THREE.Vector3, $ = new THREE.Vector3, Q = new THREE.Vector3, Z = new THREE.Vector3, c = 0;
      for (z = W.length; z > c; ++c) for (U = W[c].start, O = W[c].count, G = W[c].index, a = U, U += O; U > a; a += 3) O = G + i[a], B = G + i[a + 1], V = G + i[a + 2], t(O), t(B), t(V)
    }
  }, computeOffsets: function (e) {
    var t = e;
    void 0 === e && (t = 65535), Date.now(), e = this.attributes.index.array;
    for (var i = this.attributes.position.array, r = e.length / 3, n = new Uint16Array(e.length), o = 0, a = 0, s = [{
      start: 0,
      count: 0,
      index: 0
    }], l = s[0], h = 0, c = 0, u = new Int32Array(6), p = new Int32Array(i.length), d = new Int32Array(i.length), f = 0; f < i.length; f++) p[f] = -1, d[f] = -1;
    for (i = 0; r > i; i++) {
      for (var m = c = 0; 3 > m; m++) f = e[3 * i + m], -1 == p[f] ? (u[2 * m] = f, u[2 * m + 1] = -1, c++) : p[f] < l.index ? (u[2 * m] = f, u[2 * m + 1] = -1, h++) : (u[2 * m] = f, u[2 * m + 1] = p[f]);
      if (a + c > l.index + t) for (l = {
        start: o,
        count: 0,
        index: a
      }, s.push(l), c = 0; 6 > c; c += 2) m = u[c + 1], m > -1 && m < l.index && (u[c + 1] = -1);
      for (c = 0; 6 > c; c += 2) f = u[c], m = u[c + 1], -1 === m && (m = a++), p[f] = m, d[m] = f, n[o++] = m - l.index, l.count++
    }
    return this.reorderBuffers(n, d, a), this.offsets = s
  }, reorderBuffers: function (e, t, i) {
    var r, n = {},
      o = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
    for (r in this.attributes) if ("index" != r) for (var a = this.attributes[r].array, s = 0, l = o.length; l > s; s++) {
      var h = o[s];
      if (a instanceof h) {
        n[r] = new h(this.attributes[r].itemSize * i);
        break
      }
    }
    for (o = 0; i > o; o++) for (r in a = t[o], this.attributes) if ("index" != r) for (var s = this.attributes[r].array, l = this.attributes[r].itemSize, h = n[r], c = 0; l > c; c++) h[o * l + c] = s[a * l + c];
    this.attributes.index.array = e;
    for (r in this.attributes) "index" != r && (this.attributes[r].array = n[r], this.attributes[r].numItems = this.attributes[r].itemSize * i)
  }, clone: function () {
    var e, t = new THREE.BufferGeometry,
      i = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
    for (e in this.attributes) {
      for (var r = this.attributes[e], n = r.array, o = {
        itemSize: r.itemSize,
        array: null
      }, r = 0, a = i.length; a > r; r++) {
        var s = i[r];
        if (n instanceof s) {
          o.array = new s(n);
          break
        }
      }
      t.attributes[e] = o
    }
    for (r = 0, a = this.offsets.length; a > r; r++) i = this.offsets[r], t.offsets.push({
      start: i.start,
      index: i.index,
      count: i.count
    });
    return t
  }, dispose: function () {
    this.dispatchEvent({type: "dispose"})
  }
},THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype),THREE.BufferGeometryManipulator = function (e) {
  this.vertices = [], this.normals = [], this.uvs = [], e = e.attributes;
  for (var t = e.position.array.length / 3, i = 0; t > i; i++) this.vertices.push(new THREE.TypedVector3(e.position.array, 3 * i)), this.normals.push(new THREE.TypedVector3(e.normal.array, 3 * i)), this.uvs.push(new THREE.TypedVector2(e.uv.array, 2 * i))
},THREE.Geometry = function () {
  this.id = THREE.GeometryIdCount++, this.uuid = THREE.Math.generateUUID(), this.name = "", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingSphere = this.boundingBox = null, this.hasTangents = !1, this.dynamic = !0, this.buffersNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
},THREE.Geometry.prototype = {
  constructor: THREE.Geometry, applyMatrix: function (e) {
    for (var t = (new THREE.Matrix3).getNormalMatrix(e), i = 0, r = this.vertices.length; r > i; i++) this.vertices[i].applyMatrix4(e);
    for (i = 0, r = this.faces.length; r > i; i++) {
      e = this.faces[i], e.normal.applyMatrix3(t).normalize();
      for (var n = 0, o = e.vertexNormals.length; o > n; n++) e.vertexNormals[n].applyMatrix3(t).normalize()
    }
    this.boundingBox instanceof THREE.Box3 && this.computeBoundingBox(), this.boundingSphere instanceof THREE.Sphere && this.computeBoundingSphere()
  }, computeFaceNormals: function () {
    for (var e = new THREE.Vector3, t = new THREE.Vector3, i = 0, r = this.faces.length; r > i; i++) {
      var n = this.faces[i], o = this.vertices[n.a], a = this.vertices[n.b];
      e.subVectors(this.vertices[n.c], a), t.subVectors(o, a), e.cross(t), e.normalize(), n.normal.copy(e)
    }
  }, computeVertexNormals: function (e) {
    var t, i, r;
    for (r = Array(this.vertices.length), t = 0, i = this.vertices.length; i > t; t++) r[t] = new THREE.Vector3;
    if (e) {
      var n, o, a, s = new THREE.Vector3, l = new THREE.Vector3;
      for (new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, e = 0, t = this.faces.length; t > e; e++) i = this.faces[e], n = this.vertices[i.a], o = this.vertices[i.b], a = this.vertices[i.c], s.subVectors(a, o), l.subVectors(n, o), s.cross(l), r[i.a].add(s), r[i.b].add(s), r[i.c].add(s)
    } else for (e = 0, t = this.faces.length; t > e; e++) i = this.faces[e], r[i.a].add(i.normal), r[i.b].add(i.normal), r[i.c].add(i.normal);
    for (t = 0, i = this.vertices.length; i > t; t++) r[t].normalize();
    for (e = 0, t = this.faces.length; t > e; e++) i = this.faces[e], i.vertexNormals[0] = r[i.a].clone(), i.vertexNormals[1] = r[i.b].clone(), i.vertexNormals[2] = r[i.c].clone()
  }, computeMorphNormals: function () {
    var e, t, i, r, n;
    for (i = 0, r = this.faces.length; r > i; i++) for (n = this.faces[i], n.__originalFaceNormal ? n.__originalFaceNormal.copy(n.normal) : n.__originalFaceNormal = n.normal.clone(), n.__originalVertexNormals || (n.__originalVertexNormals = []), e = 0, t = n.vertexNormals.length; t > e; e++) n.__originalVertexNormals[e] ? n.__originalVertexNormals[e].copy(n.vertexNormals[e]) : n.__originalVertexNormals[e] = n.vertexNormals[e].clone();
    var o = new THREE.Geometry;
    for (o.faces = this.faces, e = 0, t = this.morphTargets.length; t > e; e++) {
      if (!this.morphNormals[e]) {
        this.morphNormals[e] = {}, this.morphNormals[e].faceNormals = [], this.morphNormals[e].vertexNormals = [], n = this.morphNormals[e].faceNormals;
        var a, s, l = this.morphNormals[e].vertexNormals;
        for (i = 0, r = this.faces.length; r > i; i++) a = new THREE.Vector3, s = {
          a: new THREE.Vector3,
          b: new THREE.Vector3,
          c: new THREE.Vector3
        }, n.push(a), l.push(s)
      }
      for (l = this.morphNormals[e], o.vertices = this.morphTargets[e].vertices, o.computeFaceNormals(), o.computeVertexNormals(), i = 0, r = this.faces.length; r > i; i++) n = this.faces[i], a = l.faceNormals[i], s = l.vertexNormals[i], a.copy(n.normal), s.a.copy(n.vertexNormals[0]), s.b.copy(n.vertexNormals[1]), s.c.copy(n.vertexNormals[2])
    }
    for (i = 0, r = this.faces.length; r > i; i++) n = this.faces[i], n.normal = n.__originalFaceNormal, n.vertexNormals = n.__originalVertexNormals
  }, computeTangents: function () {
    var e, t, i, r, n, o, a, s, l, h, c, u, p, d, f, m, E, g = [], v = [];
    i = new THREE.Vector3;
    var y = new THREE.Vector3, T = new THREE.Vector3, x = new THREE.Vector3, R = new THREE.Vector3;
    for (e = 0, t = this.vertices.length; t > e; e++) g[e] = new THREE.Vector3, v[e] = new THREE.Vector3;
    for (e = 0, t = this.faces.length; t > e; e++) n = this.faces[e], o = this.faceVertexUvs[0][e], r = n.a, E = n.b, n = n.c, a = this.vertices[r], s = this.vertices[E], l = this.vertices[n], h = o[0], c = o[1], u = o[2], o = s.x - a.x, p = l.x - a.x, d = s.y - a.y, f = l.y - a.y, s = s.z - a.z, a = l.z - a.z, l = c.x - h.x, m = u.x - h.x, c = c.y - h.y, h = u.y - h.y, u = 1 / (l * h - m * c), i.set((h * o - c * p) * u, (h * d - c * f) * u, (h * s - c * a) * u), y.set((l * p - m * o) * u, (l * f - m * d) * u, (l * a - m * s) * u), g[r].add(i), g[E].add(i), g[n].add(i), v[r].add(y), v[E].add(y), v[n].add(y);
    for (y = ["a", "b", "c", "d"], e = 0, t = this.faces.length; t > e; e++) for (n = this.faces[e], i = 0; i < Math.min(n.vertexNormals.length, 3); i++) R.copy(n.vertexNormals[i]), r = n[y[i]], E = g[r], T.copy(E), T.sub(R.multiplyScalar(R.dot(E))).normalize(), x.crossVectors(n.vertexNormals[i], E), r = x.dot(v[r]), r = 0 > r ? -1 : 1, n.vertexTangents[i] = new THREE.Vector4(T.x, T.y, T.z, r);
    this.hasTangents = !0
  }, computeLineDistances: function () {
    for (var e = 0, t = this.vertices, i = 0, r = t.length; r > i; i++) i > 0 && (e += t[i].distanceTo(t[i - 1])), this.lineDistances[i] = e
  }, computeBoundingBox: function () {
    null === this.boundingBox && (this.boundingBox = new THREE.Box3), this.boundingBox.setFromPoints(this.vertices)
  }, computeBoundingSphere: function () {
    null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere), this.boundingSphere.setFromPoints(this.vertices)
  }, mergeVertices: function () {
    var e, t, i, r = {}, n = [], o = [], a = Math.pow(10, 4);
    for (t = 0, i = this.vertices.length; i > t; t++) e = this.vertices[t], e = Math.round(e.x * a) + "_" + Math.round(e.y * a) + "_" + Math.round(e.z * a), void 0 === r[e] ? (r[e] = t, n.push(this.vertices[t]), o[t] = n.length - 1) : o[t] = o[r[e]];
    for (r = [], t = 0, i = this.faces.length; i > t; t++) for (a = this.faces[t], a.a = o[a.a], a.b = o[a.b], a.c = o[a.c], a = [a.a, a.b, a.c], e = 0; 3 > e; e++) if (a[e] == a[(e + 1) % 3]) {
      r.push(t);
      break
    }
    for (t = r.length - 1; t >= 0; t--) for (a = r[t], this.faces.splice(a, 1), o = 0, i = this.faceVertexUvs.length; i > o; o++) this.faceVertexUvs[o].splice(a, 1);
    return t = this.vertices.length - n.length, this.vertices = n, t
  }, makeGroups: function () {
    var e = 0;
    return function (t, i) {
      var r, n, o, a, s = {}, l = this.morphTargets.length, h = this.morphNormals.length;
      for (this.geometryGroups = {}, r = 0, n = this.faces.length; n > r; r++) o = this.faces[r], o = t ? o.materialIndex : 0, o in s || (s[o] = {
        hash: o,
        counter: 0
      }), a = s[o].hash + "_" + s[o].counter, a in this.geometryGroups || (this.geometryGroups[a] = {
        faces3: [],
        materialIndex: o,
        vertices: 0,
        numMorphTargets: l,
        numMorphNormals: h
      }), this.geometryGroups[a].vertices + 3 > i && (s[o].counter += 1, a = s[o].hash + "_" + s[o].counter, a in this.geometryGroups || (this.geometryGroups[a] = {
        faces3: [],
        materialIndex: o,
        vertices: 0,
        numMorphTargets: l,
        numMorphNormals: h
      })), this.geometryGroups[a].faces3.push(r), this.geometryGroups[a].vertices += 3;
      this.geometryGroupsList = [];
      for (var c in this.geometryGroups) this.geometryGroups[c].id = e++, this.geometryGroupsList.push(this.geometryGroups[c])
    }
  }(), clone: function () {
    for (var e = new THREE.Geometry, t = this.vertices, i = 0, r = t.length; r > i; i++) e.vertices.push(t[i].clone());
    for (t = this.faces, i = 0, r = t.length; r > i; i++) e.faces.push(t[i].clone());
    for (t = this.faceVertexUvs[0], i = 0, r = t.length; r > i; i++) {
      for (var n = t[i], o = [], a = 0, s = n.length; s > a; a++) o.push(new THREE.Vector2(n[a].x, n[a].y));
      e.faceVertexUvs[0].push(o)
    }
    return e
  }, dispose: function () {
    this.dispatchEvent({type: "dispose"})
  }
},THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype),THREE.GeometryIdCount = 0,THREE.Geometry2 = function (e, t, i) {
  THREE.BufferGeometry.call(this), this.attributes.position = {
    array: e,
    itemSize: 3
  }, this.attributes.normal = {array: t, itemSize: 3}, this.attributes.uv = {array: i, itemSize: 2}
},THREE.Geometry2.prototype = Object.create(THREE.BufferGeometry.prototype),THREE.IndexedGeometry2 = function (e, t, i, r) {
  THREE.BufferGeometry.call(this), this.attributes.index = {
    array: e,
    itemSize: 1
  }, this.attributes.position = {array: t, itemSize: 3}, this.attributes.normal = {
    array: i,
    itemSize: 3
  }, this.attributes.uv = {array: r, itemSize: 2}
},THREE.IndexedGeometry2.prototype = Object.create(THREE.BufferGeometry.prototype),THREE.Camera = function () {
  THREE.Object3D.call(this), this.matrixWorldInverse = new THREE.Matrix4, this.projectionMatrix = new THREE.Matrix4
},THREE.Camera.prototype = Object.create(THREE.Object3D.prototype),THREE.Camera.prototype.lookAt = function () {
  var e = new THREE.Matrix4;
  return function (t) {
    e.lookAt(this.position, t, this.up), this.quaternion.setFromRotationMatrix(e)
  }
}(),THREE.Camera.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.Camera), THREE.Object3D.prototype.clone.call(this, e), e.matrixWorldInverse.copy(this.matrixWorldInverse), e.projectionMatrix.copy(this.projectionMatrix), e
},THREE.OrthographicCamera = function (e, t, i, r, n, o) {
  THREE.Camera.call(this), this.left = e, this.right = t, this.top = i, this.bottom = r, this.near = void 0 !== n ? n : .1, this.far = void 0 !== o ? o : 2e3, this.updateProjectionMatrix()
},THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype),THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
  this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
},THREE.OrthographicCamera.prototype.clone = function () {
  var e = new THREE.OrthographicCamera;
  return THREE.Camera.prototype.clone.call(this, e), e.left = this.left, e.right = this.right, e.top = this.top, e.bottom = this.bottom, e.near = this.near, e.far = this.far, e
},THREE.PerspectiveCamera = function (e, t, i, r) {
  THREE.Camera.call(this), this.fov = void 0 !== e ? e : 50, this.aspect = void 0 !== t ? t : 1, this.near = void 0 !== i ? i : .1, this.far = void 0 !== r ? r : 2e3, this.updateProjectionMatrix()
},THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype),THREE.PerspectiveCamera.prototype.setLens = function (e, t) {
  void 0 === t && (t = 24), this.fov = 2 * THREE.Math.radToDeg(Math.atan(t / (2 * e))), this.updateProjectionMatrix()
},THREE.PerspectiveCamera.prototype.setViewOffset = function (e, t, i, r, n, o) {
  this.fullWidth = e, this.fullHeight = t, this.x = i, this.y = r, this.width = n, this.height = o, this.updateProjectionMatrix()
},THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
  if (this.fullWidth) {
    var e = this.fullWidth / this.fullHeight, t = Math.tan(THREE.Math.degToRad(.5 * this.fov)) * this.near, i = -t,
      r = e * i, e = Math.abs(e * t - r), i = Math.abs(t - i);
    this.projectionMatrix.makeFrustum(r + this.x * e / this.fullWidth, r + (this.x + this.width) * e / this.fullWidth, t - (this.y + this.height) * i / this.fullHeight, t - this.y * i / this.fullHeight, this.near, this.far)
  } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
},THREE.PerspectiveCamera.prototype.clone = function () {
  var e = new THREE.PerspectiveCamera;
  return THREE.Camera.prototype.clone.call(this, e), e.fov = this.fov, e.aspect = this.aspect, e.near = this.near, e.far = this.far, e
},THREE.Light = function (e) {
  THREE.Object3D.call(this), this.color = new THREE.Color(e)
},THREE.Light.prototype = Object.create(THREE.Object3D.prototype),THREE.Light.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.Light), THREE.Object3D.prototype.clone.call(this, e), e.color.copy(this.color), e
},THREE.AmbientLight = function (e) {
  THREE.Light.call(this, e)
},THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype),THREE.AmbientLight.prototype.clone = function () {
  var e = new THREE.AmbientLight;
  return THREE.Light.prototype.clone.call(this, e), e
},THREE.AreaLight = function (e, t) {
  THREE.Light.call(this, e), this.normal = new THREE.Vector3(0, -1, 0), this.right = new THREE.Vector3(1, 0, 0), this.intensity = void 0 !== t ? t : 1, this.height = this.width = 1, this.constantAttenuation = 1.5, this.linearAttenuation = .5, this.quadraticAttenuation = .1
},THREE.AreaLight.prototype = Object.create(THREE.Light.prototype),THREE.DirectionalLight = function (e, t) {
  THREE.Light.call(this, e), this.position.set(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== t ? t : 1, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraTop = this.shadowCameraRight = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
},THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype),THREE.DirectionalLight.prototype.clone = function () {
  var e = new THREE.DirectionalLight;
  return THREE.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraLeft = this.shadowCameraLeft, e.shadowCameraRight = this.shadowCameraRight, e.shadowCameraTop = this.shadowCameraTop, e.shadowCameraBottom = this.shadowCameraBottom, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e.shadowCascade = this.shadowCascade, e.shadowCascadeOffset.copy(this.shadowCascadeOffset), e.shadowCascadeCount = this.shadowCascadeCount, e.shadowCascadeBias = this.shadowCascadeBias.slice(0), e.shadowCascadeWidth = this.shadowCascadeWidth.slice(0), e.shadowCascadeHeight = this.shadowCascadeHeight.slice(0), e.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0), e.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0), e
},THREE.HemisphereLight = function (e, t, i) {
  THREE.Light.call(this, e), this.position.set(0, 100, 0), this.groundColor = new THREE.Color(t), this.intensity = void 0 !== i ? i : 1
},THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype),THREE.HemisphereLight.prototype.clone = function () {
  var e = new THREE.HemisphereLight;
  return THREE.Light.prototype.clone.call(this, e), e.groundColor.copy(this.groundColor), e.intensity = this.intensity, e
},THREE.PointLight = function (e, t, i) {
  THREE.Light.call(this, e), this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== i ? i : 0
},THREE.PointLight.prototype = Object.create(THREE.Light.prototype),THREE.PointLight.prototype.clone = function () {
  var e = new THREE.PointLight;
  return THREE.Light.prototype.clone.call(this, e), e.intensity = this.intensity, e.distance = this.distance, e
},THREE.SpotLight = function (e, t, i, r, n) {
  THREE.Light.call(this, e), this.position.set(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== t ? t : 1, this.distance = void 0 !== i ? i : 0, this.angle = void 0 !== r ? r : Math.PI / 3, this.exponent = void 0 !== n ? n : 10, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
},THREE.SpotLight.prototype = Object.create(THREE.Light.prototype),THREE.SpotLight.prototype.clone = function () {
  var e = new THREE.SpotLight;
  return THREE.Light.prototype.clone.call(this, e), e.target = this.target.clone(), e.intensity = this.intensity, e.distance = this.distance, e.angle = this.angle, e.exponent = this.exponent, e.castShadow = this.castShadow, e.onlyShadow = this.onlyShadow, e.shadowCameraNear = this.shadowCameraNear, e.shadowCameraFar = this.shadowCameraFar, e.shadowCameraFov = this.shadowCameraFov, e.shadowCameraVisible = this.shadowCameraVisible, e.shadowBias = this.shadowBias, e.shadowDarkness = this.shadowDarkness, e.shadowMapWidth = this.shadowMapWidth, e.shadowMapHeight = this.shadowMapHeight, e
},THREE.Cache = function () {
  this.files = {}
},THREE.Cache.prototype = {
  constructor: THREE.Cache, add: function (e, t) {
    this.files[e] = t
  }, get: function (e) {
    return this.files[e]
  }, remove: function (e) {
    delete this.files[e]
  }, clear: function () {
    this.files = {}
  }
},THREE.Loader = function (e) {
  this.statusDomElement = (this.showStatus = e) ? THREE.Loader.prototype.addStatusElement() : null, this.imageLoader = new THREE.ImageLoader, this.onLoadStart = function () {
  }, this.onLoadProgress = function () {
  }, this.onLoadComplete = function () {
  }
},THREE.Loader.prototype = {
  constructor: THREE.Loader, crossOrigin: void 0, addStatusElement: function () {
    var e = document.createElement("div");
    return e.style.position = "absolute", e.style.right = "0px", e.style.top = "0px", e.style.fontSize = "0.8em", e.style.textAlign = "left", e.style.background = "rgba(0,0,0,0.25)", e.style.color = "#fff", e.style.width = "120px", e.style.padding = "0.5em 0.5em 0.5em 0.5em", e.style.zIndex = 1e3, e.innerHTML = "Loading ...", e
  }, updateProgress: function (e) {
    var t = "Loaded ",
      t = e.total ? t + ((100 * e.loaded / e.total).toFixed(0) + "%") : t + ((e.loaded / 1024).toFixed(2) + " KB");
    this.statusDomElement.innerHTML = t
  }, extractUrlBase: function (e) {
    return e = e.split("/"), 1 === e.length ? "./" : (e.pop(), e.join("/") + "/")
  }, initMaterials: function (e, t) {
    for (var i = [], r = 0; r < e.length; ++r) i[r] = this.createMaterial(e[r], t);
    return i
  }, needsTangents: function (e) {
    for (var t = 0, i = e.length; i > t; t++) if (e[t] instanceof THREE.ShaderMaterial) return !0;
    return !1
  }, createMaterial: function (e, t) {
    function i(e) {
      return e = Math.log(e) / Math.LN2, Math.pow(2, Math.round(e))
    }

    function r(e, r, n, a, s, l, h) {
      var c = /\.dds$/i.test(n), u = t + n;
      if (c) {
        var p = THREE.ImageUtils.loadCompressedTexture(u);
        e[r] = p
      } else p = document.createElement("canvas"), e[r] = new THREE.Texture(p);
      e[r].sourceFile = n, a && (e[r].repeat.set(a[0], a[1]), 1 !== a[0] && (e[r].wrapS = THREE.RepeatWrapping), 1 !== a[1] && (e[r].wrapT = THREE.RepeatWrapping)), s && e[r].offset.set(s[0], s[1]), l && (n = {
        repeat: THREE.RepeatWrapping,
        mirror: THREE.MirroredRepeatWrapping
      }, void 0 !== n[l[0]] && (e[r].wrapS = n[l[0]]), void 0 !== n[l[1]] && (e[r].wrapT = n[l[1]])), h && (e[r].anisotropy = h), c || (p = e[r], o.imageLoader.crossOrigin = o.crossOrigin, o.imageLoader.load(u, function (e) {
        if (!1 === THREE.Math.isPowerOfTwo(e.width) || !1 === THREE.Math.isPowerOfTwo(e.height)) {
          var t = i(e.width), r = i(e.height);
          p.image.width = t, p.image.height = r, p.image.getContext("2d").drawImage(e, 0, 0, t, r)
        } else p.image = e;
        p.needsUpdate = !0
      }))
    }

    function n(e) {
      return (255 * e[0] << 16) + (255 * e[1] << 8) + 255 * e[2]
    }

    var o = this, a = "MeshLambertMaterial",
      s = {color: 15658734, opacity: 1, map: null, lightMap: null, normalMap: null, bumpMap: null, wireframe: !1};
    if (e.shading) {
      var l = e.shading.toLowerCase();
      "phong" === l ? a = "MeshPhongMaterial" : "basic" === l && (a = "MeshBasicMaterial")
    }
    return void 0 !== e.blending && void 0 !== THREE[e.blending] && (s.blending = THREE[e.blending]), (void 0 !== e.transparent || 1 > e.opacity) && (s.transparent = e.transparent), void 0 !== e.depthTest && (s.depthTest = e.depthTest), void 0 !== e.depthWrite && (s.depthWrite = e.depthWrite), void 0 !== e.visible && (s.visible = e.visible), void 0 !== e.flipSided && (s.side = THREE.BackSide), void 0 !== e.doubleSided && (s.side = THREE.DoubleSide), void 0 !== e.wireframe && (s.wireframe = e.wireframe), void 0 !== e.vertexColors && ("face" === e.vertexColors ? s.vertexColors = THREE.FaceColors : e.vertexColors && (s.vertexColors = THREE.VertexColors)), e.colorDiffuse ? s.color = n(e.colorDiffuse) : e.DbgColor && (s.color = e.DbgColor), e.colorSpecular && (s.specular = n(e.colorSpecular)), e.colorAmbient && (s.ambient = n(e.colorAmbient)), e.transparency && (s.opacity = e.transparency), e.specularCoef && (s.shininess = e.specularCoef), e.mapDiffuse && t && r(s, "map", e.mapDiffuse, e.mapDiffuseRepeat, e.mapDiffuseOffset, e.mapDiffuseWrap, e.mapDiffuseAnisotropy), e.mapLight && t && r(s, "lightMap", e.mapLight, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy), e.mapBump && t && r(s, "bumpMap", e.mapBump, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy), e.mapNormal && t && r(s, "normalMap", e.mapNormal, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy), e.mapSpecular && t && r(s, "specularMap", e.mapSpecular, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy), e.mapBumpScale && (s.bumpScale = e.mapBumpScale), e.mapNormal ? (a = THREE.ShaderLib.normalmap, l = THREE.UniformsUtils.clone(a.uniforms), l.tNormal.value = s.normalMap, e.mapNormalFactor && l.uNormalScale.value.set(e.mapNormalFactor, e.mapNormalFactor), s.map && (l.tDiffuse.value = s.map, l.enableDiffuse.value = !0), s.specularMap && (l.tSpecular.value = s.specularMap, l.enableSpecular.value = !0), s.lightMap && (l.tAO.value = s.lightMap, l.enableAO.value = !0), l.diffuse.value.setHex(s.color), l.specular.value.setHex(s.specular), l.ambient.value.setHex(s.ambient), l.shininess.value = s.shininess, void 0 !== s.opacity && (l.opacity.value = s.opacity), a = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: l,
      lights: !0,
      fog: !0
    }), s.transparent && (a.transparent = !0)) : a = new THREE[a](s), void 0 !== e.DbgName && (a.name = e.DbgName), a
  }
},THREE.XHRLoader = function (e) {
  this.cache = new THREE.Cache, this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
},THREE.XHRLoader.prototype = {
  constructor: THREE.XHRLoader, load: function (e, t, i, r) {
    var n = this, o = n.cache.get(e);
    void 0 !== o ? t(o) : (o = new XMLHttpRequest, void 0 !== t && o.addEventListener("load", function (i) {
      n.cache.add(e, i.target.responseText), t(i.target.responseText), n.manager.itemEnd(e)
    }, !1), void 0 !== i && o.addEventListener("progress", function (e) {
      i(e)
    }, !1), void 0 !== r && o.addEventListener("error", function (e) {
      r(e)
    }, !1), void 0 !== this.crossOrigin && (o.crossOrigin = this.crossOrigin), o.open("GET", e, !0), o.send(null), n.manager.itemStart(e))
  }, setCrossOrigin: function (e) {
    this.crossOrigin = e
  }
},THREE.ImageLoader = function (e) {
  this.cache = new THREE.Cache, this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
},THREE.ImageLoader.prototype = {
  constructor: THREE.ImageLoader, load: function (e, t, i, r) {
    var n = this, o = n.cache.get(e);
    return void 0 === o ? (o = document.createElement("img"), void 0 !== t && o.addEventListener("load", function (i) {
      n.cache.add(e, this), t(this), n.manager.itemEnd(e)
    }, !1), void 0 !== i && o.addEventListener("progress", function (e) {
      i(e)
    }, !1), void 0 !== r && o.addEventListener("error", function (e) {
      r(e)
    }, !1), void 0 !== this.crossOrigin && (o.crossOrigin = this.crossOrigin), o.src = e, n.manager.itemStart(e), o) : void t(o)
  }, setCrossOrigin: function (e) {
    this.crossOrigin = e
  }
},THREE.JSONLoader = function (e) {
  THREE.Loader.call(this, e), this.withCredentials = !1
},THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype),THREE.JSONLoader.prototype.load = function (e, t, i) {
  i = i && "string" == typeof i ? i : this.extractUrlBase(e), this.onLoadStart(), this.loadAjaxJSON(this, e, t, i)
},THREE.JSONLoader.prototype.loadAjaxJSON = function (e, t, i, r, n) {
  var o = new XMLHttpRequest, a = 0;
  o.onreadystatechange = function () {
    if (o.readyState === o.DONE) if (200 === o.status || 0 === o.status) {
      if (o.responseText) {
        var s = JSON.parse(o.responseText);
        if (void 0 !== s.metadata && "scene" === s.metadata.type) return void console.error('THREE.JSONLoader: "' + t + '" seems to be a Scene. Use THREE.SceneLoader instead.');
        s = e.parse(s, r), i(s.geometry, s.materials)
      } else console.error('THREE.JSONLoader: "' + t + '" seems to be unreachable or the file is empty.');
      e.onLoadComplete()
    } else console.error("THREE.JSONLoader: Couldn't load \"" + t + '" (' + o.status + ")"); else o.readyState === o.LOADING ? n && (0 === a && (a = o.getResponseHeader("Content-Length")), n({
      total: a,
      loaded: o.responseText.length
    })) : o.readyState === o.HEADERS_RECEIVED && void 0 !== n && (a = o.getResponseHeader("Content-Length"))
  }, o.open("GET", t, !0), o.withCredentials = this.withCredentials, o.send(null)
},THREE.JSONLoader.prototype.parse = function (e, t) {
  var i = new THREE.Geometry, r = void 0 !== e.scale ? 1 / e.scale : 1;
  return function (t) {
    var r, n, o, a, s, l, h, c, u, p, d, f, m, E = e.faces;
    l = e.vertices;
    var g = e.normals, v = e.colors, y = 0;
    if (void 0 !== e.uvs) {
      for (r = 0; r < e.uvs.length; r++) e.uvs[r].length && y++;
      for (r = 0; y > r; r++) i.faceVertexUvs[r] = []
    }
    for (a = 0, s = l.length; s > a;) r = new THREE.Vector3, r.x = l[a++] * t, r.y = l[a++] * t, r.z = l[a++] * t, i.vertices.push(r);
    for (a = 0, s = E.length; s > a;) if (t = E[a++], u = 1 & t, o = 2 & t, r = 8 & t, h = 16 & t, p = 32 & t, l = 64 & t, t &= 128, u) {
      if (u = new THREE.Face3, u.a = E[a], u.b = E[a + 1], u.c = E[a + 3], d = new THREE.Face3, d.a = E[a + 1], d.b = E[a + 2], d.c = E[a + 3], a += 4, o && (o = E[a++], u.materialIndex = o, d.materialIndex = o), o = i.faces.length, r) for (r = 0; y > r; r++) for (f = e.uvs[r], i.faceVertexUvs[r][o] = [], i.faceVertexUvs[r][o + 1] = [], n = 0; 4 > n; n++) c = E[a++], m = f[2 * c], c = f[2 * c + 1], m = new THREE.Vector2(m, c), 2 !== n && i.faceVertexUvs[r][o].push(m), 0 !== n && i.faceVertexUvs[r][o + 1].push(m);
      if (h && (h = 3 * E[a++], u.normal.set(g[h++], g[h++], g[h]), d.normal.copy(u.normal)), p) for (r = 0; 4 > r; r++) h = 3 * E[a++], p = new THREE.Vector3(g[h++], g[h++], g[h]), 2 !== r && u.vertexNormals.push(p), 0 !== r && d.vertexNormals.push(p);
      if (l && (l = E[a++], l = v[l], u.color.setHex(l), d.color.setHex(l)), t) for (r = 0; 4 > r; r++) l = E[a++], l = v[l], 2 !== r && u.vertexColors.push(new THREE.Color(l)), 0 !== r && d.vertexColors.push(new THREE.Color(l));
      i.faces.push(u), i.faces.push(d)
    } else {
      if (u = new THREE.Face3, u.a = E[a++], u.b = E[a++], u.c = E[a++], o && (o = E[a++], u.materialIndex = o), o = i.faces.length, r) for (r = 0; y > r; r++) for (f = e.uvs[r], i.faceVertexUvs[r][o] = [], n = 0; 3 > n; n++) c = E[a++], m = f[2 * c], c = f[2 * c + 1], m = new THREE.Vector2(m, c), i.faceVertexUvs[r][o].push(m);
      if (h && (h = 3 * E[a++], u.normal.set(g[h++], g[h++], g[h])), p) for (r = 0; 3 > r; r++) h = 3 * E[a++], p = new THREE.Vector3(g[h++], g[h++], g[h]), u.vertexNormals.push(p);
      if (l && (l = E[a++], u.color.setHex(v[l])), t) for (r = 0; 3 > r; r++) l = E[a++], u.vertexColors.push(new THREE.Color(v[l]));
      i.faces.push(u)
    }
  }(r), function () {
    var t = void 0 !== e.influencesPerVertex ? e.influencesPerVertex : 2;
    if (e.skinWeights) for (var r = 0, n = e.skinWeights.length; n > r; r += t) i.skinWeights.push(new THREE.Vector4(e.skinWeights[r], t > 1 ? e.skinWeights[r + 1] : 0, t > 2 ? e.skinWeights[r + 2] : 0, t > 3 ? e.skinWeights[r + 3] : 0));
    if (e.skinIndices) for (r = 0, n = e.skinIndices.length; n > r; r += t) i.skinIndices.push(new THREE.Vector4(e.skinIndices[r], t > 1 ? e.skinIndices[r + 1] : 0, t > 2 ? e.skinIndices[r + 2] : 0, t > 3 ? e.skinIndices[r + 3] : 0));
    i.bones = e.bones, i.bones && 0 < i.bones.length && (i.skinWeights.length !== i.skinIndices.length || i.skinIndices.length !== i.vertices.length) && console.warn("When skinning, number of vertices (" + i.vertices.length + "), skinIndices (" + i.skinIndices.length + "), and skinWeights (" + i.skinWeights.length + ") should match."), i.animation = e.animation, i.animations = e.animations
  }(), function (t) {
    if (void 0 !== e.morphTargets) {
      var r, n, o, a, s, l;
      for (r = 0, n = e.morphTargets.length; n > r; r++) for (i.morphTargets[r] = {}, i.morphTargets[r].name = e.morphTargets[r].name, i.morphTargets[r].vertices = [], s = i.morphTargets[r].vertices, l = e.morphTargets[r].vertices, o = 0, a = l.length; a > o; o += 3) {
        var h = new THREE.Vector3;
        h.x = l[o] * t, h.y = l[o + 1] * t, h.z = l[o + 2] * t, s.push(h)
      }
    }
    if (void 0 !== e.morphColors) for (r = 0, n = e.morphColors.length; n > r; r++) for (i.morphColors[r] = {}, i.morphColors[r].name = e.morphColors[r].name, i.morphColors[r].colors = [], a = i.morphColors[r].colors, s = e.morphColors[r].colors, t = 0, o = s.length; o > t; t += 3) l = new THREE.Color(16755200), l.setRGB(s[t], s[t + 1], s[t + 2]), a.push(l)
  }(r), i.computeFaceNormals(), i.computeBoundingSphere(), void 0 === e.materials || 0 === e.materials.length ? {geometry: i} : (r = this.initMaterials(e.materials, t), this.needsTangents(r) && i.computeTangents(), {
    geometry: i,
    materials: r
  })
},THREE.LoadingManager = function (e, t, i) {
  var r = this, n = 0, o = 0;
  this.onLoad = e, this.onProgress = t, this.onError = i, this.itemStart = function (e) {
    o++
  }, this.itemEnd = function (e) {
    n++, void 0 !== r.onProgress && r.onProgress(e, n, o), n === o && void 0 !== r.onLoad && r.onLoad()
  }
},THREE.DefaultLoadingManager = new THREE.LoadingManager,THREE.BufferGeometryLoader = function (e) {
  this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
},THREE.BufferGeometryLoader.prototype = {
  constructor: THREE.BufferGeometryLoader, load: function (e, t, i, r) {
    var n = this;
    i = new THREE.XHRLoader, i.setCrossOrigin(this.crossOrigin), i.load(e, function (e) {
      t(n.parse(JSON.parse(e)))
    })
  }, setCrossOrigin: function (e) {
    this.crossOrigin = e
  }, parse: function (e) {
    var t = new THREE.BufferGeometry, i = e.attributes, r = e.offsets;
    e = e.boundingSphere;
    for (var n in i) {
      var o = i[n];
      t.attributes[n] = {itemSize: o.itemSize, array: new self[o.type](o.array)}
    }
    return void 0 !== r && (t.offsets = JSON.parse(JSON.stringify(r))), void 0 !== e && (t.boundingSphere = new THREE.Sphere((new THREE.Vector3).fromArray(void 0 !== e.center ? e.center : [0, 0, 0]), e.radius)), t
  }
},THREE.MaterialLoader = function (e) {
  this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
},THREE.MaterialLoader.prototype = {
  constructor: THREE.MaterialLoader, load: function (e, t, i, r) {
    var n = this;
    i = new THREE.XHRLoader, i.setCrossOrigin(this.crossOrigin), i.load(e, function (e) {
      t(n.parse(JSON.parse(e)))
    })
  }, setCrossOrigin: function (e) {
    this.crossOrigin = e
  }, parse: function (e) {
    var t = new THREE[e.type];
    if (void 0 !== e.color && t.color.setHex(e.color), void 0 !== e.ambient && t.ambient.setHex(e.ambient), void 0 !== e.emissive && t.emissive.setHex(e.emissive), void 0 !== e.specular && t.specular.setHex(e.specular), void 0 !== e.shininess && (t.shininess = e.shininess), void 0 !== e.vertexColors && (t.vertexColors = e.vertexColors), void 0 !== e.blending && (t.blending = e.blending), void 0 !== e.side && (t.side = e.side), void 0 !== e.opacity && (t.opacity = e.opacity), void 0 !== e.transparent && (t.transparent = e.transparent), void 0 !== e.wireframe && (t.wireframe = e.wireframe), void 0 !== e.materials) for (var i = 0, r = e.materials.length; r > i; i++) t.materials.push(this.parse(e.materials[i]));
    return t
  }
},THREE.ObjectLoader = function (e) {
  this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
},THREE.ObjectLoader.prototype = {
  constructor: THREE.ObjectLoader, load: function (e, t, i, r) {
    var n = this;
    i = new THREE.XHRLoader(n.manager), i.setCrossOrigin(this.crossOrigin), i.load(e, function (e) {
      t(n.parse(JSON.parse(e)))
    })
  }, setCrossOrigin: function (e) {
    this.crossOrigin = e
  }, parse: function (e) {
    var t = this.parseGeometries(e.geometries), i = this.parseMaterials(e.materials);
    return this.parseObject(e.object, t, i)
  }, parseGeometries: function (e) {
    var t = {};
    if (void 0 !== e) for (var i = new THREE.JSONLoader, r = new THREE.BufferGeometryLoader, n = 0, o = e.length; o > n; n++) {
      var a, s = e[n];
      switch (s.type) {
        case"PlaneGeometry":
          a = new THREE.PlaneGeometry(s.width, s.height, s.widthSegments, s.heightSegments);
          break;
        case"BoxGeometry":
        case"CubeGeometry":
          a = new THREE.BoxGeometry(s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
          break;
        case"CircleGeometry":
          a = new THREE.CircleGeometry(s.radius, s.segments);
          break;
        case"CylinderGeometry":
          a = new THREE.CylinderGeometry(s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded);
          break;
        case"SphereGeometry":
          a = new THREE.SphereGeometry(s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
          break;
        case"IcosahedronGeometry":
          a = new THREE.IcosahedronGeometry(s.radius, s.detail);
          break;
        case"TorusGeometry":
          a = new THREE.TorusGeometry(s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
          break;
        case"TorusKnotGeometry":
          a = new THREE.TorusKnotGeometry(s.radius, s.tube, s.radialSegments, s.tubularSegments, s.p, s.q, s.heightScale);
          break;
        case"BufferGeometry":
          a = r.parse(s.data);
          break;
        case"Geometry":
          a = i.parse(s.data).geometry
      }
      a.uuid = s.uuid, void 0 !== s.name && (a.name = s.name), t[s.uuid] = a
    }
    return t
  }, parseMaterials: function (e) {
    var t = {};
    if (void 0 !== e) for (var i = new THREE.MaterialLoader, r = 0, n = e.length; n > r; r++) {
      var o = e[r], a = i.parse(o);
      a.uuid = o.uuid, void 0 !== o.name && (a.name = o.name), t[o.uuid] = a
    }
    return t
  }, parseObject: function () {
    var e = new THREE.Matrix4;
    return function (t, i, r) {
      var n;
      switch (t.type) {
        case"Scene":
          n = new THREE.Scene;
          break;
        case"PerspectiveCamera":
          n = new THREE.PerspectiveCamera(t.fov, t.aspect, t.near, t.far);
          break;
        case"OrthographicCamera":
          n = new THREE.OrthographicCamera(t.left, t.right, t.top, t.bottom, t.near, t.far);
          break;
        case"AmbientLight":
          n = new THREE.AmbientLight(t.color);
          break;
        case"DirectionalLight":
          n = new THREE.DirectionalLight(t.color, t.intensity);
          break;
        case"PointLight":
          n = new THREE.PointLight(t.color, t.intensity, t.distance);
          break;
        case"SpotLight":
          n = new THREE.SpotLight(t.color, t.intensity, t.distance, t.angle, t.exponent);
          break;
        case"HemisphereLight":
          n = new THREE.HemisphereLight(t.color, t.groundColor, t.intensity);
          break;
        case"Mesh":
          n = i[t.geometry];
          var o = r[t.material];
          void 0 === n && console.error("THREE.ObjectLoader: Undefined geometry " + t.geometry), void 0 === o && console.error("THREE.ObjectLoader: Undefined material " + t.material), n = new THREE.Mesh(n, o);
          break;
        case"Sprite":
          o = r[t.material], void 0 === o && console.error("THREE.ObjectLoader: Undefined material " + t.material), n = new THREE.Sprite(o);
          break;
        default:
          n = new THREE.Object3D
      }
      if (n.uuid = t.uuid, void 0 !== t.name && (n.name = t.name), void 0 !== t.matrix ? (e.fromArray(t.matrix), e.decompose(n.position, n.quaternion, n.scale)) : (void 0 !== t.position && n.position.fromArray(t.position), void 0 !== t.rotation && n.rotation.fromArray(t.rotation), void 0 !== t.scale && n.scale.fromArray(t.scale)), void 0 !== t.visible && (n.visible = t.visible), void 0 !== t.userData && (n.userData = t.userData), void 0 !== t.children) for (var a in t.children) n.add(this.parseObject(t.children[a], i, r));
      return n
    }
  }()
},THREE.SceneLoader = function () {
  this.onLoadStart = function () {
  }, this.onLoadProgress = function () {
  }, this.onLoadComplete = function () {
  }, this.callbackSync = function () {
  }, this.callbackProgress = function () {
  }, this.geometryHandlers = {}, this.hierarchyHandlers = {}, this.addGeometryHandler("ascii", THREE.JSONLoader)
},THREE.SceneLoader.prototype = {
  constructor: THREE.SceneLoader, load: function (e, t, i, r) {
    var n = this;
    i = new THREE.XHRLoader(n.manager), i.setCrossOrigin(this.crossOrigin), i.load(e, function (i) {
      n.parse(JSON.parse(i), t, e)
    })
  }, setCrossOrigin: function (e) {
    this.crossOrigin = e
  }, addGeometryHandler: function (e, t) {
    this.geometryHandlers[e] = {loaderClass: t}
  }, addHierarchyHandler: function (e, t) {
    this.hierarchyHandlers[e] = {loaderClass: t}
  }, parse: function (e, t, i) {
    function r(e, t) {
      return "relativeToHTML" == t ? e : w + e
    }

    function n() {
      o(R.scene, S.objects)
    }

    function o(e, t) {
      var i, n, a, s, h, c;
      for (c in t) {
        var u = R.objects[c], m = t[c];
        if (void 0 === u) {
          if (m.type && m.type in H.hierarchyHandlers) {
            if (void 0 === m.loading) {
              i = {
                type: 1,
                url: 1,
                material: 1,
                position: 1,
                rotation: 1,
                scale: 1,
                visible: 1,
                children: 1,
                userData: 1,
                skin: 1,
                morph: 1,
                mirroredLoop: 1,
                duration: 1
              };
              var E, v = {};
              for (E in m) E in i || (v[E] = m[E]);
              d = R.materials[m.material], m.loading = !0, i = H.hierarchyHandlers[m.type].loaderObject, i.options ? i.load(r(m.url, S.urlBaseType), l(c, e, d, m)) : i.load(r(m.url, S.urlBaseType), l(c, e, d, m), v)
            }
          } else if (void 0 !== m.geometry) {
            if (p = R.geometries[m.geometry]) {
              if (u = !1, d = R.materials[m.material], u = d instanceof THREE.ShaderMaterial, n = m.position, a = m.rotation, s = m.scale, i = m.matrix, h = m.quaternion, m.material || (d = new THREE.MeshFaceMaterial(R.face_materials[m.geometry])), d instanceof THREE.MeshFaceMaterial && 0 === d.materials.length && (d = new THREE.MeshFaceMaterial(R.face_materials[m.geometry])), d instanceof THREE.MeshFaceMaterial) for (v = 0; v < d.materials.length; v++) u = u || d.materials[v] instanceof THREE.ShaderMaterial;
              u && p.computeTangents(), m.skin ? u = new THREE.SkinnedMesh(p, d) : m.morph ? (u = new THREE.MorphAnimMesh(p, d), void 0 !== m.duration && (u.duration = m.duration), void 0 !== m.time && (u.time = m.time), void 0 !== m.mirroredLoop && (u.mirroredLoop = m.mirroredLoop), d.morphNormals && p.computeMorphNormals()) : u = new THREE.Mesh(p, d), u.name = c, i ? (u.matrixAutoUpdate = !1, u.matrix.set(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15])) : (u.position.fromArray(n), h ? u.quaternion.fromArray(h) : u.rotation.fromArray(a), u.scale.fromArray(s)), u.visible = m.visible, u.castShadow = m.castShadow, u.receiveShadow = m.receiveShadow, e.add(u), R.objects[c] = u
            }
          } else if ("AmbientLight" === m.type || "PointLight" === m.type || "DirectionalLight" === m.type || "SpotLight" === m.type || "HemisphereLight" === m.type || "AreaLight" === m.type) {
            switch (v = m.color, i = m.intensity, n = m.distance, a = m.position, s = m.rotation, m.type) {
              case"AmbientLight":
                g = new THREE.AmbientLight(v);
                break;
              case"PointLight":
                g = new THREE.PointLight(v, i, n), g.position.fromArray(a);
                break;
              case"DirectionalLight":
                g = new THREE.DirectionalLight(v, i), g.position.fromArray(m.direction);
                break;
              case"SpotLight":
                g = new THREE.SpotLight(v, i, n, 1), g.angle = m.angle, g.position.fromArray(a), g.target.set(a[0], a[1] - n, a[2]), g.target.applyEuler(new THREE.Euler(s[0], s[1], s[2], "XYZ"));
                break;
              case"HemisphereLight":
                g = new THREE.DirectionalLight(v, i, n), g.target.set(a[0], a[1] - n, a[2]), g.target.applyEuler(new THREE.Euler(s[0], s[1], s[2], "XYZ"));
                break;
              case"AreaLight":
                g = new THREE.AreaLight(v, i), g.position.fromArray(a), g.width = m.size, g.height = m.size_y
            }
            e.add(g), g.name = c, R.lights[c] = g, R.objects[c] = g
          } else "PerspectiveCamera" === m.type || "OrthographicCamera" === m.type ? (n = m.position, a = m.rotation, h = m.quaternion, "PerspectiveCamera" === m.type ? f = new THREE.PerspectiveCamera(m.fov, m.aspect, m.near, m.far) : "OrthographicCamera" === m.type && (f = new THREE.OrthographicCamera(m.left, m.right, m.top, m.bottom, m.near, m.far)), f.name = c, f.position.fromArray(n), void 0 !== h ? f.quaternion.fromArray(h) : void 0 !== a && f.rotation.fromArray(a), e.add(f), R.cameras[c] = f, R.objects[c] = f) : (n = m.position, a = m.rotation, s = m.scale, h = m.quaternion, u = new THREE.Object3D, u.name = c, u.position.fromArray(n), h ? u.quaternion.fromArray(h) : u.rotation.fromArray(a), u.scale.fromArray(s), u.visible = void 0 !== m.visible ? m.visible : !1, e.add(u), R.objects[c] = u, R.empties[c] = u);
          if (u) {
            if (void 0 !== m.userData) for (var y in m.userData) u.userData[y] = m.userData[y];
            if (void 0 !== m.groups) for (v = 0; v < m.groups.length; v++) i = m.groups[v], void 0 === R.groups[i] && (R.groups[i] = []), R.groups[i].push(c)
          }
        }
        void 0 !== u && void 0 !== m.children && o(u, m.children)
      }
    }

    function a(e, t, i, r, o) {
      var a = o.rotation, s = o.quaternion, l = o.scale;
      e.position.fromArray(o.position), s ? e.quaternion.fromArray(s) : e.rotation.fromArray(a), e.scale.fromArray(l), r && e.traverse(function (e) {
        e.material = r
      });
      var h = void 0 !== o.visible ? o.visible : !0;
      e.traverse(function (e) {
        e.visible = h
      }), i.add(e), e.name = t, R.objects[t] = e, n()
    }

    function s(e) {
      return function (t, i) {
        t.name = e, R.geometries[e] = t, R.face_materials[e] = i, n(), v -= 1, H.onLoadComplete(), c()
      }
    }

    function l(e, t, i, r) {
      return function (n) {
        a(n.content ? n.content : n.dae ? n.scene : n, e, t, i, r), v -= 1, H.onLoadComplete(), c()
      }
    }

    function h(e) {
      return function (t, i) {
        t.name = e, R.geometries[e] = t, R.face_materials[e] = i
      }
    }

    function c() {
      if (H.callbackProgress({
          totalModels: T,
          totalTextures: x,
          loadedModels: T - v,
          loadedTextures: x - y
        }, R), H.onLoadProgress(), 0 === v && 0 === y) {
        for (var e = 0; e < _.length; e++) {
          var i = _[e], r = R.objects[i.targetName];
          r ? i.object.target = r : (i.object.target = new THREE.Object3D, R.scene.add(i.object.target)), i.object.target.userData.targetInverse = i.object
        }
        t(R)
      }
    }

    function u(e, t) {
      if (t(e), void 0 !== e.children) for (var i in e.children) u(e.children[i], t)
    }

    var p, d, f, m, E, g, v, y, T, x, R, b, H = this, w = THREE.Loader.prototype.extractUrlBase(i), _ = [], S = e;
    for (b in this.geometryHandlers) e = this.geometryHandlers[b].loaderClass, this.geometryHandlers[b].loaderObject = new e;
    for (b in this.hierarchyHandlers) e = this.hierarchyHandlers[b].loaderClass, this.hierarchyHandlers[b].loaderObject = new e;
    y = v = 0, R = {
      scene: new THREE.Scene,
      geometries: {},
      face_materials: {},
      materials: {},
      textures: {},
      objects: {},
      cameras: {},
      lights: {},
      fogs: {},
      empties: {},
      groups: {}
    }, S.transform && (b = S.transform.position, e = S.transform.rotation, i = S.transform.scale, b && R.scene.position.fromArray(b), e && R.scene.rotation.fromArray(e), i && R.scene.scale.fromArray(i), b || e || i) && (R.scene.updateMatrix(), R.scene.updateMatrixWorld()), b = function (e) {
      return function () {
        y -= e, c(), H.onLoadComplete()
      }
    };
    for (var M in S.fogs) e = S.fogs[M], "linear" === e.type ? m = new THREE.Fog(0, e.near, e.far) : "exp2" === e.type && (m = new THREE.FogExp2(0, e.density)), e = e.color, m.color.setRGB(e[0], e[1], e[2]), R.fogs[M] = m;
    for (var C in S.geometries) m = S.geometries[C], m.type in this.geometryHandlers && (v += 1, H.onLoadStart());
    for (var A in S.objects) u(S.objects[A], function (e) {
      e.type && e.type in H.hierarchyHandlers && (v += 1, H.onLoadStart())
    });
    T = v;
    for (C in S.geometries) if (m = S.geometries[C], "cube" === m.type) p = new THREE.BoxGeometry(m.width, m.height, m.depth, m.widthSegments, m.heightSegments, m.depthSegments), p.name = C, R.geometries[C] = p; else if ("plane" === m.type) p = new THREE.PlaneGeometry(m.width, m.height, m.widthSegments, m.heightSegments), p.name = C, R.geometries[C] = p; else if ("sphere" === m.type) p = new THREE.SphereGeometry(m.radius, m.widthSegments, m.heightSegments), p.name = C, R.geometries[C] = p; else if ("cylinder" === m.type) p = new THREE.CylinderGeometry(m.topRad, m.botRad, m.height, m.radSegs, m.heightSegs), p.name = C, R.geometries[C] = p; else if ("torus" === m.type) p = new THREE.TorusGeometry(m.radius, m.tube, m.segmentsR, m.segmentsT), p.name = C, R.geometries[C] = p; else if ("icosahedron" === m.type) p = new THREE.IcosahedronGeometry(m.radius, m.subdivisions), p.name = C, R.geometries[C] = p; else if (m.type in this.geometryHandlers) {
      A = {};
      for (E in m) "type" !== E && "url" !== E && (A[E] = m[E]);
      this.geometryHandlers[m.type].loaderObject.load(r(m.url, S.urlBaseType), s(C), A)
    } else "embedded" === m.type && (A = S.embeds[m.id], A.metadata = S.metadata, A && (A = this.geometryHandlers.ascii.loaderObject.parse(A, ""), h(C)(A.geometry, A.materials)));
    for (var L in S.textures) if (C = S.textures[L], C.url instanceof Array) for (y += C.url.length, E = 0; E < C.url.length; E++) H.onLoadStart(); else y += 1, H.onLoadStart();
    x = y;
    for (L in S.textures) {
      if (C = S.textures[L], void 0 !== C.mapping && void 0 !== THREE[C.mapping] && (C.mapping = new THREE[C.mapping]), C.url instanceof Array) {
        for (A = C.url.length, m = [], E = 0; A > E; E++) m[E] = r(C.url[E], S.urlBaseType);
        E = (E = /\.dds$/i.test(m[0])) ? THREE.ImageUtils.loadCompressedTextureCube(m, C.mapping, b(A)) : THREE.ImageUtils.loadTextureCube(m, C.mapping, b(A))
      } else E = /\.dds$/i.test(C.url), A = r(C.url, S.urlBaseType), m = b(1), E = E ? THREE.ImageUtils.loadCompressedTexture(A, C.mapping, m) : THREE.ImageUtils.loadTexture(A, C.mapping, m), void 0 !== THREE[C.minFilter] && (E.minFilter = THREE[C.minFilter]), void 0 !== THREE[C.magFilter] && (E.magFilter = THREE[C.magFilter]), C.anisotropy && (E.anisotropy = C.anisotropy), C.repeat && (E.repeat.set(C.repeat[0], C.repeat[1]), 1 !== C.repeat[0] && (E.wrapS = THREE.RepeatWrapping), 1 !== C.repeat[1] && (E.wrapT = THREE.RepeatWrapping)), C.offset && E.offset.set(C.offset[0], C.offset[1]), C.wrap && (A = {
        repeat: THREE.RepeatWrapping,
        mirror: THREE.MirroredRepeatWrapping
      }, void 0 !== A[C.wrap[0]] && (E.wrapS = A[C.wrap[0]]), void 0 !== A[C.wrap[1]] && (E.wrapT = A[C.wrap[1]]));
      R.textures[L] = E
    }
    var D, P;
    for (D in S.materials) {
      L = S.materials[D];
      for (P in L.parameters) "envMap" === P || "map" === P || "lightMap" === P || "bumpMap" === P ? L.parameters[P] = R.textures[L.parameters[P]] : "shading" === P ? L.parameters[P] = "flat" === L.parameters[P] ? THREE.FlatShading : THREE.SmoothShading : "side" === P ? L.parameters[P] = "double" == L.parameters[P] ? THREE.DoubleSide : "back" == L.parameters[P] ? THREE.BackSide : THREE.FrontSide : "blending" === P ? L.parameters[P] = L.parameters[P] in THREE ? THREE[L.parameters[P]] : THREE.NormalBlending : "combine" === P ? L.parameters[P] = L.parameters[P] in THREE ? THREE[L.parameters[P]] : THREE.MultiplyOperation : "vertexColors" === P ? "face" == L.parameters[P] ? L.parameters[P] = THREE.FaceColors : L.parameters[P] && (L.parameters[P] = THREE.VertexColors) : "wrapRGB" === P && (b = L.parameters[P], L.parameters[P] = new THREE.Vector3(b[0], b[1], b[2]));
      void 0 !== L.parameters.opacity && 1 > L.parameters.opacity && (L.parameters.transparent = !0), L.parameters.normalMap ? (b = THREE.ShaderLib.normalmap, C = THREE.UniformsUtils.clone(b.uniforms), E = L.parameters.color, A = L.parameters.specular, m = L.parameters.ambient, M = L.parameters.shininess, C.tNormal.value = R.textures[L.parameters.normalMap], L.parameters.normalScale && C.uNormalScale.value.set(L.parameters.normalScale[0], L.parameters.normalScale[1]), L.parameters.map && (C.tDiffuse.value = L.parameters.map, C.enableDiffuse.value = !0), L.parameters.envMap && (C.tCube.value = L.parameters.envMap, C.enableReflection.value = !0, C.reflectivity.value = L.parameters.reflectivity), L.parameters.lightMap && (C.tAO.value = L.parameters.lightMap, C.enableAO.value = !0), L.parameters.specularMap && (C.tSpecular.value = R.textures[L.parameters.specularMap], C.enableSpecular.value = !0), L.parameters.displacementMap && (C.tDisplacement.value = R.textures[L.parameters.displacementMap], C.enableDisplacement.value = !0, C.uDisplacementBias.value = L.parameters.displacementBias, C.uDisplacementScale.value = L.parameters.displacementScale), C.diffuse.value.setHex(E), C.specular.value.setHex(A), C.ambient.value.setHex(m), C.shininess.value = M, L.parameters.opacity && (C.opacity.value = L.parameters.opacity), d = new THREE.ShaderMaterial({
        fragmentShader: b.fragmentShader,
        vertexShader: b.vertexShader,
        uniforms: C,
        lights: !0,
        fog: !0
      })) : d = new THREE[L.type](L.parameters), d.name = D, R.materials[D] = d
    }
    for (D in S.materials) if (L = S.materials[D], L.parameters.materials) {
      for (P = [], E = 0; E < L.parameters.materials.length; E++) P.push(R.materials[L.parameters.materials[E]]);
      R.materials[D].materials = P
    }
    n(), R.cameras && S.defaults.camera && (R.currentCamera = R.cameras[S.defaults.camera]), R.fogs && S.defaults.fog && (R.scene.fog = R.fogs[S.defaults.fog]), H.callbackSync(R), c()
  }
},THREE.TextureLoader = function (e) {
  this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
},THREE.TextureLoader.prototype = {
  constructor: THREE.TextureLoader, load: function (e, t, i, r) {
    i = new THREE.ImageLoader(this.manager), i.setCrossOrigin(this.crossOrigin), i.load(e, function (e) {
      e = new THREE.Texture(e), e.needsUpdate = !0, void 0 !== t && t(e)
    })
  }, setCrossOrigin: function (e) {
    this.crossOrigin = e
  }
},THREE.Material = function () {
  this.id = THREE.MaterialIdCount++, this.uuid = THREE.Math.generateUUID(), this.name = "", this.side = THREE.FrontSide, this.opacity = 1, this.transparent = !1, this.blending = THREE.NormalBlending, this.blendSrc = THREE.SrcAlphaFactor, this.blendDst = THREE.OneMinusSrcAlphaFactor, this.blendEquation = THREE.AddEquation, this.depthWrite = this.depthTest = !0, this.polygonOffset = !1, this.overdraw = this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0, this.needsUpdate = this.visible = !0
},THREE.Material.prototype = {
  constructor: THREE.Material, setValues: function (e) {
    if (void 0 !== e) for (var t in e) {
      var i = e[t];
      if (void 0 === i) console.warn("THREE.Material: '" + t + "' parameter is undefined."); else if (t in this) {
        var r = this[t];
        r instanceof THREE.Color ? r.set(i) : r instanceof THREE.Vector3 && i instanceof THREE.Vector3 ? r.copy(i) : this[t] = "overdraw" == t ? Number(i) : i
      }
    }
  }, clone: function (e) {
    return void 0 === e && (e = new THREE.Material), e.name = this.name, e.side = this.side, e.opacity = this.opacity, e.transparent = this.transparent, e.blending = this.blending, e.blendSrc = this.blendSrc, e.blendDst = this.blendDst, e.blendEquation = this.blendEquation, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, e.polygonOffset = this.polygonOffset, e.polygonOffsetFactor = this.polygonOffsetFactor, e.polygonOffsetUnits = this.polygonOffsetUnits, e.alphaTest = this.alphaTest, e.overdraw = this.overdraw, e.visible = this.visible, e
  }, dispose: function () {
    this.dispatchEvent({type: "dispose"})
  }
},THREE.EventDispatcher.prototype.apply(THREE.Material.prototype),THREE.MaterialIdCount = 0,THREE.LineBasicMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.linewidth = 1, this.linejoin = this.linecap = "round", this.vertexColors = !1, this.fog = !0, this.setValues(e)
},THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype),THREE.LineBasicMaterial.prototype.clone = function () {
  var e = new THREE.LineBasicMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.linecap = this.linecap, e.linejoin = this.linejoin, e.vertexColors = this.vertexColors, e.fog = this.fog, e
},THREE.LineDashedMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.scale = this.linewidth = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(e)
},THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype),THREE.LineDashedMaterial.prototype.clone = function () {
  var e = new THREE.LineDashedMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.linewidth = this.linewidth, e.scale = this.scale, e.dashSize = this.dashSize, e.gapSize = this.gapSize, e.vertexColors = this.vertexColors, e.fog = this.fog, e
},THREE.MeshBasicMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.envMap = this.specularMap = this.lightMap = this.map = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphTargets = this.skinning = !1, this.setValues(e)
},THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype),THREE.MeshBasicMaterial.prototype.clone = function () {
  var e = new THREE.MeshBasicMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e
},THREE.MeshLambertMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.ambient = new THREE.Color(16777215), this.emissive = new THREE.Color(0), this.wrapAround = !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.envMap = this.specularMap = this.lightMap = this.map = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.setValues(e)
},THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype),THREE.MeshLambertMaterial.prototype.clone = function () {
  var e = new THREE.MeshLambertMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.ambient.copy(this.ambient), e.emissive.copy(this.emissive), e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.specularMap = this.specularMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
},THREE.MeshPhongMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.ambient = new THREE.Color(16777215), this.emissive = new THREE.Color(0), this.specular = new THREE.Color(1118481), this.shininess = 30, this.wrapAround = this.metal = !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.bumpMap = this.lightMap = this.map = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new THREE.Vector2(1, 1), this.envMap = this.specularMap = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.setValues(e)
},THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype),THREE.MeshPhongMaterial.prototype.clone = function () {
  var e = new THREE.MeshPhongMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.ambient.copy(this.ambient), e.emissive.copy(this.emissive), e.specular.copy(this.specular), e.shininess = this.shininess, e.metal = this.metal, e.wrapAround = this.wrapAround, e.wrapRGB.copy(this.wrapRGB), e.map = this.map, e.lightMap = this.lightMap, e.bumpMap = this.bumpMap, e.bumpScale = this.bumpScale, e.normalMap = this.normalMap, e.normalScale.copy(this.normalScale), e.specularMap = this.specularMap, e.envMap = this.envMap, e.combine = this.combine, e.reflectivity = this.reflectivity, e.refractionRatio = this.refractionRatio, e.fog = this.fog, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.wireframeLinecap = this.wireframeLinecap, e.wireframeLinejoin = this.wireframeLinejoin, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
},THREE.MeshDepthMaterial = function (e) {
  THREE.Material.call(this), this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e)
},THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype),THREE.MeshDepthMaterial.prototype.clone = function () {
  var e = new THREE.MeshDepthMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
},THREE.MeshNormalMaterial = function (e) {
  THREE.Material.call(this, e), this.shading = THREE.FlatShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.morphTargets = !1, this.setValues(e)
},THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype),THREE.MeshNormalMaterial.prototype.clone = function () {
  var e = new THREE.MeshNormalMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e
},THREE.MeshFaceMaterial = function (e) {
  this.materials = e instanceof Array ? e : []
},THREE.MeshFaceMaterial.prototype.clone = function () {
  for (var e = new THREE.MeshFaceMaterial, t = 0; t < this.materials.length; t++) e.materials.push(this.materials[t].clone());
  return e
},THREE.ParticleSystemMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.vertexColors = !1, this.fog = !0, this.setValues(e)
},THREE.ParticleSystemMaterial.prototype = Object.create(THREE.Material.prototype),THREE.ParticleSystemMaterial.prototype.clone = function () {
  var e = new THREE.ParticleSystemMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.size = this.size, e.sizeAttenuation = this.sizeAttenuation, e.vertexColors = this.vertexColors, e.fog = this.fog, e
},THREE.ParticleBasicMaterial = THREE.ParticleSystemMaterial,THREE.ShaderMaterial = function (e) {
  THREE.Material.call(this), this.vertexShader = this.fragmentShader = "void main() {}", this.uniforms = {}, this.defines = {}, this.attributes = null, this.shading = THREE.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.lights = this.fog = !1, this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.defaultAttributeValues = {
    color: [1, 1, 1],
    uv: [0, 0],
    uv2: [0, 0]
  }, this.index0AttributeName = void 0, this.setValues(e)
},THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype),THREE.ShaderMaterial.prototype.clone = function () {
  var e = new THREE.ShaderMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.fragmentShader = this.fragmentShader, e.vertexShader = this.vertexShader, e.uniforms = THREE.UniformsUtils.clone(this.uniforms), e.attributes = this.attributes, e.defines = this.defines, e.shading = this.shading, e.wireframe = this.wireframe, e.wireframeLinewidth = this.wireframeLinewidth, e.fog = this.fog, e.lights = this.lights, e.vertexColors = this.vertexColors, e.skinning = this.skinning, e.morphTargets = this.morphTargets, e.morphNormals = this.morphNormals, e
},THREE.RawShaderMaterial = function (e) {
  THREE.ShaderMaterial.call(this, e)
},THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype),THREE.RawShaderMaterial.prototype.clone = function () {
  var e = new THREE.RawShaderMaterial;
  return THREE.ShaderMaterial.prototype.clone.call(this, e), e
},THREE.SpriteMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.setValues(e)
},THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype),THREE.SpriteMaterial.prototype.clone = function () {
  var e = new THREE.SpriteMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.map = this.map, e.rotation = this.rotation, e.fog = this.fog, e
},THREE.SpriteCanvasMaterial = function (e) {
  THREE.Material.call(this), this.color = new THREE.Color(16777215), this.program = function (e, t) {
  }, this.setValues(e)
},THREE.SpriteCanvasMaterial.prototype = Object.create(THREE.Material.prototype),THREE.SpriteCanvasMaterial.prototype.clone = function () {
  var e = new THREE.SpriteCanvasMaterial;
  return THREE.Material.prototype.clone.call(this, e), e.color.copy(this.color), e.program = this.program, e
},THREE.ParticleCanvasMaterial = THREE.SpriteCanvasMaterial,THREE.Texture = function (e, t, i, r, n, o, a, s, l) {
  this.id = THREE.TextureIdCount++, this.uuid = THREE.Math.generateUUID(), this.name = "", this.image = e, this.mipmaps = [], this.mapping = void 0 !== t ? t : new THREE.UVMapping, this.wrapS = void 0 !== i ? i : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== r ? r : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== n ? n : THREE.LinearFilter, this.minFilter = void 0 !== o ? o : THREE.LinearMipMapLinearFilter, this.anisotropy = void 0 !== l ? l : 1, this.format = void 0 !== a ? a : THREE.RGBAFormat, this.type = void 0 !== s ? s : THREE.UnsignedByteType, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this._needsUpdate = !1, this.onUpdate = null
},THREE.Texture.prototype = {
  constructor: THREE.Texture, get needsUpdate() {
    return this._needsUpdate
  }, set needsUpdate(e) {
    !0 === e && this.update(), this._needsUpdate = e
  }, clone: function (e) {
    return void 0 === e && (e = new THREE.Texture), e.image = this.image, e.mipmaps = this.mipmaps.slice(0), e.mapping = this.mapping, e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.format = this.format, e.type = this.type, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.generateMipmaps = this.generateMipmaps, e.premultiplyAlpha = this.premultiplyAlpha, e.flipY = this.flipY, e.unpackAlignment = this.unpackAlignment, e
  }, update: function () {
    this.dispatchEvent({type: "update"})
  }, dispose: function () {
    this.dispatchEvent({type: "dispose"})
  }
},THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype),THREE.TextureIdCount = 0,THREE.CompressedTexture = function (e, t, i, r, n, o, a, s, l, h, c) {
  THREE.Texture.call(this, null, o, a, s, l, h, r, n, c), this.image = {
    width: t,
    height: i
  }, this.mipmaps = e, this.generateMipmaps = !1
},THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype),THREE.CompressedTexture.prototype.clone = function () {
  var e = new THREE.CompressedTexture;
  return THREE.Texture.prototype.clone.call(this, e), e
},THREE.DataTexture = function (e, t, i, r, n, o, a, s, l, h, c) {
  THREE.Texture.call(this, null, o, a, s, l, h, r, n, c), this.image = {data: e, width: t, height: i}
},THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype),THREE.DataTexture.prototype.clone = function () {
  var e = new THREE.DataTexture;
  return THREE.Texture.prototype.clone.call(this, e), e
},THREE.ParticleSystem = function (e, t) {
  THREE.Object3D.call(this), this.geometry = void 0 !== e ? e : new THREE.Geometry, this.material = void 0 !== t ? t : new THREE.ParticleSystemMaterial({color: 16777215 * Math.random()}), this.frustumCulled = this.sortParticles = !1
},THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype),THREE.ParticleSystem.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.ParticleSystem(this.geometry, this.material)), e.sortParticles = this.sortParticles, THREE.Object3D.prototype.clone.call(this, e), e
},THREE.Line = function (e, t, i) {
  THREE.Object3D.call(this), this.geometry = void 0 !== e ? e : new THREE.Geometry, this.material = void 0 !== t ? t : new THREE.LineBasicMaterial({color: 16777215 * Math.random()}), this.type = void 0 !== i ? i : THREE.LineStrip
},THREE.LineStrip = 0,THREE.LinePieces = 1,THREE.Line.prototype = Object.create(THREE.Object3D.prototype),THREE.Line.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.Line(this.geometry, this.material, this.type)), THREE.Object3D.prototype.clone.call(this, e), e
},THREE.Mesh = function (e, t) {
  THREE.Object3D.call(this), this.geometry = void 0 !== e ? e : new THREE.Geometry, this.material = void 0 !== t ? t : new THREE.MeshBasicMaterial({color: 16777215 * Math.random()}), this.updateMorphTargets()
},THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype),THREE.Mesh.prototype.updateMorphTargets = function () {
  if (void 0 !== this.geometry.morphTargets && 0 < this.geometry.morphTargets.length) {
    this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
    for (var e = 0, t = this.geometry.morphTargets.length; t > e; e++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[e].name] = e
  }
},THREE.Mesh.prototype.getMorphTargetIndexByName = function (e) {
  return void 0 !== this.morphTargetDictionary[e] ? this.morphTargetDictionary[e] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + e + " does not exist. Returning 0."), 0)
},THREE.Mesh.prototype.clone = function (e, t) {
  return void 0 === e && (e = new THREE.Mesh(this.geometry, this.material)), THREE.Object3D.prototype.clone.call(this, e, t), e
},THREE.Bone = function (e) {
  THREE.Object3D.call(this), this.skin = e, this.skinMatrix = new THREE.Matrix4
},THREE.Bone.prototype = Object.create(THREE.Object3D.prototype),THREE.Bone.prototype.update = function (e, t) {
  this.matrixAutoUpdate && (t |= this.updateMatrix()), (t || this.matrixWorldNeedsUpdate) && (e ? this.skinMatrix.multiplyMatrices(e, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
  for (var i = 0, r = this.children.length; r > i; i++) this.children[i].update(this.skinMatrix, t)
},THREE.SkinnedMesh = function (e, t, i) {
  THREE.Mesh.call(this, e, t), this.useVertexTexture = void 0 !== i ? i : !0, this.identityMatrix = new THREE.Matrix4, this.bones = [], this.boneMatrices = [];
  var r, n, o;
  if (this.geometry && void 0 !== this.geometry.bones) {
    for (e = 0; e < this.geometry.bones.length; e++) i = this.geometry.bones[e], r = i.pos, n = i.rotq, o = i.scl, t = this.addBone(), t.name = i.name, t.position.set(r[0], r[1], r[2]), t.quaternion.set(n[0], n[1], n[2], n[3]), void 0 !== o ? t.scale.set(o[0], o[1], o[2]) : t.scale.set(1, 1, 1);
    for (e = 0; e < this.bones.length; e++) i = this.geometry.bones[e], t = this.bones[e], -1 === i.parent ? this.add(t) : this.bones[i.parent].add(t);
    e = this.bones.length, this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = e = e > 256 ? 64 : e > 64 ? 32 : e > 16 ? 16 : 8, this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter, this.boneTexture.magFilter = THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * e), this.pose()
  }
},THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype),THREE.SkinnedMesh.prototype.addBone = function (e) {
  return void 0 === e && (e = new THREE.Bone(this)), this.bones.push(e), e
},THREE.SkinnedMesh.prototype.updateMatrixWorld = function () {
  var e = new THREE.Matrix4;
  return function (t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1), t = 0;
    for (var i = this.children.length; i > t; t++) {
      var r = this.children[t];
      r instanceof THREE.Bone ? r.update(this.identityMatrix, !1) : r.updateMatrixWorld(!0)
    }
    if (void 0 == this.boneInverses) for (this.boneInverses = [], t = 0, i = this.bones.length; i > t; t++) r = new THREE.Matrix4, r.getInverse(this.bones[t].skinMatrix), this.boneInverses.push(r);
    for (t = 0, i = this.bones.length; i > t; t++) e.multiplyMatrices(this.bones[t].skinMatrix, this.boneInverses[t]), e.flattenToArrayOffset(this.boneMatrices, 16 * t);
    this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
  }
}(),THREE.SkinnedMesh.prototype.pose = function () {
  this.updateMatrixWorld(!0), this.normalizeSkinWeights()
},THREE.SkinnedMesh.prototype.normalizeSkinWeights = function () {
  if (this.geometry instanceof THREE.Geometry) for (var e = 0; e < this.geometry.skinIndices.length; e++) {
    var t = this.geometry.skinWeights[e], i = 1 / t.lengthManhattan();
    1 / 0 !== i ? t.multiplyScalar(i) : t.set(1)
  }
},THREE.SkinnedMesh.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), THREE.Mesh.prototype.clone.call(this, e), e
},THREE.MorphAnimMesh = function (e, t) {
  THREE.Mesh.call(this, e, t), this.duration = 1e3, this.mirroredLoop = !1, this.currentKeyframe = this.lastKeyframe = this.time = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
},THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype),THREE.MorphAnimMesh.prototype.setFrameRange = function (e, t) {
  this.startKeyframe = e, this.endKeyframe = t, this.length = this.endKeyframe - this.startKeyframe + 1
},THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
  this.direction = 1, this.directionBackwards = !1
},THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
  this.direction = -1, this.directionBackwards = !0
},THREE.MorphAnimMesh.prototype.parseAnimations = function () {
  var e = this.geometry;
  e.animations || (e.animations = {});
  for (var t, i = e.animations, r = /([a-z]+)(\d+)/, n = 0, o = e.morphTargets.length; o > n; n++) {
    var a = e.morphTargets[n].name.match(r);
    if (a && 1 < a.length) {
      a = a[1], i[a] || (i[a] = {start: 1 / 0, end: -(1 / 0)});
      var s = i[a];
      n < s.start && (s.start = n), n > s.end && (s.end = n), t || (t = a)
    }
  }
  e.firstAnimation = t
},THREE.MorphAnimMesh.prototype.setAnimationLabel = function (e, t, i) {
  this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[e] = {start: t, end: i}
},THREE.MorphAnimMesh.prototype.playAnimation = function (e, t) {
  var i = this.geometry.animations[e];
  i ? (this.setFrameRange(i.start, i.end), this.duration = (i.end - i.start) / t * 1e3, this.time = 0) : console.warn("animation[" + e + "] undefined")
},THREE.MorphAnimMesh.prototype.updateAnimation = function (e) {
  var t = this.duration / this.length;
  this.time += this.direction * e, this.mirroredLoop ? (this.time > this.duration || 0 > this.time) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), 0 > this.time && (this.time = 0, this.directionBackwards = !1)) : (this.time %= this.duration, 0 > this.time && (this.time += this.duration)), e = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / t), 0, this.length - 1), e !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[e] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = e), t = this.time % t / t, this.directionBackwards && (t = 1 - t), this.morphTargetInfluences[this.currentKeyframe] = t, this.morphTargetInfluences[this.lastKeyframe] = 1 - t
},THREE.MorphAnimMesh.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.MorphAnimMesh(this.geometry, this.material)), e.duration = this.duration, e.mirroredLoop = this.mirroredLoop, e.time = this.time, e.lastKeyframe = this.lastKeyframe, e.currentKeyframe = this.currentKeyframe, e.direction = this.direction, e.directionBackwards = this.directionBackwards, THREE.Mesh.prototype.clone.call(this, e), e
},THREE.LOD = function () {
  THREE.Object3D.call(this), this.objects = []
},THREE.LOD.prototype = Object.create(THREE.Object3D.prototype),THREE.LOD.prototype.addLevel = function (e, t) {
  void 0 === t && (t = 0), t = Math.abs(t);
  for (var i = 0; i < this.objects.length && !(t < this.objects[i].distance); i++) ;
  this.objects.splice(i, 0, {distance: t, object: e}), this.add(e)
},THREE.LOD.prototype.getObjectForDistance = function (e) {
  for (var t = 1, i = this.objects.length; i > t && !(e < this.objects[t].distance); t++) ;
  return this.objects[t - 1].object
},THREE.LOD.prototype.update = function () {
  var e = new THREE.Vector3, t = new THREE.Vector3;
  return function (i) {
    if (1 < this.objects.length) {
      e.setFromMatrixPosition(i.matrixWorld), t.setFromMatrixPosition(this.matrixWorld), i = e.distanceTo(t), this.objects[0].object.visible = !0;
      for (var r = 1, n = this.objects.length; n > r && i >= this.objects[r].distance; r++) this.objects[r - 1].object.visible = !1, this.objects[r].object.visible = !0;
      for (; n > r; r++) this.objects[r].object.visible = !1
    }
  }
}(),THREE.LOD.prototype.clone = function (e) {
  void 0 === e && (e = new THREE.LOD), THREE.Object3D.prototype.clone.call(this, e);
  for (var t = 0, i = this.objects.length; i > t; t++) {
    var r = this.objects[t].object.clone();
    r.visible = 0 === t, e.addLevel(r, this.objects[t].distance)
  }
  return e
},THREE.Sprite = function () {
  var e = new THREE.Float32Attribute(3, 3);
  e.set([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0]);
  var t = new THREE.BufferGeometry;
  return t.addAttribute("position", e), function (e) {
    THREE.Object3D.call(this), this.geometry = t, this.material = void 0 !== e ? e : new THREE.SpriteMaterial
  }
}(),THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype),THREE.Sprite.prototype.updateMatrix = function () {
  this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
},THREE.Sprite.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.Sprite(this.material)), THREE.Object3D.prototype.clone.call(this, e), e
},THREE.Particle = THREE.Sprite,THREE.Scene = function () {
  THREE.Object3D.call(this), this.overrideMaterial = this.fog = null, this.autoUpdate = !0, this.matrixAutoUpdate = !1, this.__lights = [], this.__objectsAdded = [], this.__objectsRemoved = []
},THREE.Scene.prototype = Object.create(THREE.Object3D.prototype),THREE.Scene.prototype.__addObject = function (e) {
  if (e instanceof THREE.Light) -1 === this.__lights.indexOf(e) && this.__lights.push(e), e.target && void 0 === e.target.parent && this.add(e.target); else if (!(e instanceof THREE.Camera || e instanceof THREE.Bone)) {
    this.__objectsAdded.push(e);
    var t = this.__objectsRemoved.indexOf(e);
    -1 !== t && this.__objectsRemoved.splice(t, 1)
  }
  for (this.dispatchEvent({type: "objectAdded", object: e}), e.dispatchEvent({
    type: "addedToScene",
    scene: this
  }), t = 0; t < e.children.length; t++) this.__addObject(e.children[t])
},THREE.Scene.prototype.__removeObject = function (e) {
  if (e instanceof THREE.Light) {
    var t = this.__lights.indexOf(e);
    if (-1 !== t && this.__lights.splice(t, 1), e.shadowCascadeArray) for (t = 0; t < e.shadowCascadeArray.length; t++) this.__removeObject(e.shadowCascadeArray[t])
  } else e instanceof THREE.Camera || (this.__objectsRemoved.push(e), t = this.__objectsAdded.indexOf(e), -1 !== t && this.__objectsAdded.splice(t, 1));
  for (this.dispatchEvent({type: "objectRemoved", object: e}), e.dispatchEvent({
    type: "removedFromScene",
    scene: this
  }), t = 0; t < e.children.length; t++) this.__removeObject(e.children[t])
},THREE.Scene.prototype.clone = function (e) {
  return void 0 === e && (e = new THREE.Scene), THREE.Object3D.prototype.clone.call(this, e), null !== this.fog && (e.fog = this.fog.clone()), null !== this.overrideMaterial && (e.overrideMaterial = this.overrideMaterial.clone()), e.autoUpdate = this.autoUpdate, e.matrixAutoUpdate = this.matrixAutoUpdate, e
},THREE.Fog = function (e, t, i) {
  this.name = "", this.color = new THREE.Color(e), this.near = void 0 !== t ? t : 1, this.far = void 0 !== i ? i : 1e3
},THREE.Fog.prototype.clone = function () {
  return new THREE.Fog(this.color.getHex(), this.near, this.far)
},THREE.FogExp2 = function (e, t) {
  this.name = "", this.color = new THREE.Color(e), this.density = void 0 !== t ? t : 25e-5
},THREE.FogExp2.prototype.clone = function () {
  return new THREE.FogExp2(this.color.getHex(), this.density)
},THREE.CanvasRenderer = function (e) {
  function t(e, t, i, r) {
    h(t), c(i), u(r), p(e.getStyle()), A.stroke(), le.expandByScalar(2 * t)
  }

  function i(e) {
    d(e.getStyle()), A.fill()
  }

  function r(e) {
    n(e.target)
  }

  function n(e) {
    var t = e.wrapS === THREE.RepeatWrapping, i = e.wrapT === THREE.RepeatWrapping, r = e.image,
      n = document.createElement("canvas");
    n.width = r.width, n.height = r.height;
    var o = n.getContext("2d");
    o.setTransform(1, 0, 0, -1, 0, r.height), o.drawImage(r, 0, 0), oe[e.id] = A.createPattern(n, !0 === t && !0 === i ? "repeat" : !0 === t && !1 === i ? "repeat-x" : !1 === t && !0 === i ? "repeat-y" : "no-repeat")
  }

  function o(e, t, i, o, a, s, l, h, c, u, p, f, m) {
    if (!(m instanceof THREE.DataTexture)) {
      !1 === m.hasEventListener("update", r) && (void 0 !== m.image && 0 < m.image.width && n(m), m.addEventListener("update", r));
      var E = oe[m.id];
      if (void 0 !== E) {
        d(E);
        var E = m.offset.x / m.repeat.x, g = m.offset.y / m.repeat.y, v = m.image.width * m.repeat.x;
        m = m.image.height * m.repeat.y, l = (l + E) * v, h = (h + g) * m, i -= e, o -= t, a -= e, s -= t, c = (c + E) * v - l, u = (u + g) * m - h, p = (p + E) * v - l, f = (f + g) * m - h, m = c * f - p * u, 0 !== m && (E = 1 / m, m = (f * i - u * a) * E, u = (f * o - u * s) * E, i = (c * a - p * i) * E, o = (c * s - p * o) * E, e = e - m * l - i * h, t = t - u * l - o * h, A.save(), A.transform(m, u, i, o, e, t), A.fill(), A.restore())
      } else d("rgba(0,0,0,1)"), A.fill()
    }
  }

  function a(e, t, i) {
    var r = t.x - e.x, n = t.y - e.y, o = r * r + n * n;
    0 !== o && (i /= Math.sqrt(o), r *= i, n *= i, t.x += r, t.y += n, e.x -= r, e.y -= n)
  }

  function s(e) {
    P !== e && (P = A.globalAlpha = e)
  }

  function l(e) {
    F !== e && (e === THREE.NormalBlending ? A.globalCompositeOperation = "source-over" : e === THREE.AdditiveBlending ? A.globalCompositeOperation = "lighter" : e === THREE.SubtractiveBlending && (A.globalCompositeOperation = "darker"), F = e)
  }

  function h(e) {
    U !== e && (U = A.lineWidth = e)
  }

  function c(e) {
    z !== e && (z = A.lineCap = e)
  }

  function u(e) {
    O !== e && (O = A.lineJoin = e)
  }

  function p(e) {
    k !== e && (k = A.strokeStyle = e)
  }

  function d(e) {
    N !== e && (N = A.fillStyle = e)
  }

  function f(e, t) {
    (B !== e || V !== t) && (A.setLineDash([e, t]), B = e, V = t)
  }

  console.log("THREE.CanvasRenderer", THREE.REVISION);
  var m = THREE.Math.smoothstep;
  e = e || {};
  var E, g, v, y, T, x, R, b = this, H = new THREE.Projector,
    w = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"), _ = w.width, S = w.height,
    M = Math.floor(_ / 2), C = Math.floor(S / 2), A = w.getContext("2d", {alpha: !0 === e.alpha}),
    L = new THREE.Color(0), D = 0, P = 1, F = 0, k = null, N = null, U = null, z = null, O = null, B = null, V = 0;
  new THREE.RenderableVertex, new THREE.RenderableVertex;
  var I, j, W, G, X, q, Y = new THREE.Color;
  new THREE.Color, new THREE.Color, new THREE.Color, new THREE.Color;
  var K, $, Q, Z, J, ee, te, ie = new THREE.Color, re = new THREE.Color, ne = new THREE.Color, oe = {},
    ae = new THREE.Box2, se = new THREE.Box2, le = new THREE.Box2, he = new THREE.Color, ce = new THREE.Color,
    ue = new THREE.Color, pe = new THREE.Vector3, de = new THREE.Vector3, fe = new THREE.Vector3,
    me = new THREE.Matrix3;
  void 0 === A.setLineDash && (A.setLineDash = void 0 !== A.mozDash ? function (e) {
    A.mozDash = null !== e[0] ? e : null
  } : function () {
  }), this.domElement = w, this.devicePixelRatio = void 0 !== e.devicePixelRatio ? e.devicePixelRatio : void 0 !== self.devicePixelRatio ? self.devicePixelRatio : 1, this.sortElements = this.sortObjects = this.autoClear = !0, this.info = {
    render: {
      vertices: 0,
      faces: 0
    }
  }, this.supportsVertexTextures = function () {
  }, this.setFaceCulling = function () {
  }, this.setSize = function (e, t, i) {
    _ = e * this.devicePixelRatio, S = t * this.devicePixelRatio, w.width = _, w.height = S, M = Math.floor(_ / 2), C = Math.floor(S / 2), 1 !== this.devicePixelRatio && !1 !== i && (w.style.width = e + "px", w.style.height = t + "px"), ae.min.set(-M, -C), ae.max.set(M, C), se.min.set(-M, -C), se.max.set(M, C), P = 1, F = 0, O = z = U = N = k = null, this.setViewport(0, 0, e, t)
  }, this.setViewport = function (e, t, i, r) {
    A.setTransform(i / _, 0, 0, -r / S, e, S - t), A.translate(M, C)
  }, this.setScissor = function () {
  }, this.enableScissorTest = function () {
  }, this.setClearColor = function (e, t) {
    L.set(e), D = void 0 !== t ? t : 1, se.min.set(-M, -C), se.max.set(M, C)
  }, this.setClearColorHex = function (e, t) {
    console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."), this.setClearColor(e, t)
  }, this.getMaxAnisotropy = function () {
    return 0
  }, this.clear = function () {
    !1 === se.empty() && (se.intersect(ae), se.expandByScalar(2), 1 > D && A.clearRect(0 | se.min.x, 0 | se.min.y, se.max.x - se.min.x | 0, se.max.y - se.min.y | 0), D > 0 && (l(THREE.NormalBlending), s(1), d("rgba(" + Math.floor(255 * L.r) + "," + Math.floor(255 * L.g) + "," + Math.floor(255 * L.b) + "," + D + ")"), A.fillRect(0 | se.min.x, 0 | se.min.y, se.max.x - se.min.x | 0, se.max.y - se.min.y | 0)), se.makeEmpty())
  }, this.clearColor = function () {
  }, this.clearDepth = function () {
  }, this.clearStencil = function () {
  }, this.render = function (e, w) {
    if (!1 == w instanceof THREE.Camera) console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera."); else {
      !0 === this.autoClear && this.clear(), b.info.render.vertices = 0, b.info.render.faces = 0, E = H.projectScene(e, w, this.sortObjects, this.sortElements), g = E.elements, v = E.lights, y = w, me.getNormalMatrix(w.matrixWorldInverse), he.setRGB(0, 0, 0), ce.setRGB(0, 0, 0), ue.setRGB(0, 0, 0);
      for (var _ = 0, S = v.length; S > _; _++) {
        var L = v[_], D = L.color;
        L instanceof THREE.AmbientLight ? he.add(D) : L instanceof THREE.DirectionalLight ? ce.add(D) : L instanceof THREE.PointLight && ue.add(D)
      }
      for (_ = 0, S = g.length; S > _; _++) {
        var P = g[_], F = P.material;
        if (void 0 !== F && !1 !== F.visible) {
          if (le.makeEmpty(), P instanceof THREE.RenderableSprite) {
            T = P, T.x *= M, T.y *= C;
            var L = T, k = P, D = F;
            s(D.opacity), l(D.blending);
            var N = k.scale.x * M, k = k.scale.y * C, P = .5 * Math.sqrt(N * N + k * k);
            if (le.min.set(L.x - P, L.y - P), le.max.set(L.x + P, L.y + P), D instanceof THREE.SpriteMaterial || D instanceof THREE.ParticleSystemMaterial) {
              var U = D.map;
              if (null !== U) {
                !1 === U.hasEventListener("update", r) && (void 0 !== U.image && 0 < U.image.width && n(U), U.addEventListener("update", r)), P = oe[U.id], d(void 0 !== P ? P : "rgba( 0, 0, 0, 1 )");
                var z = U.image, P = z.width * U.offset.x, F = z.height * U.offset.y, O = z.width * U.repeat.x,
                  U = z.height * U.repeat.y, z = N / O, B = k / U;
                A.save(), A.translate(L.x, L.y), 0 !== D.rotation && A.rotate(D.rotation), A.translate(-N / 2, -k / 2), A.scale(z, B), A.translate(-P, -F), A.fillRect(P, F, O, U)
              } else d(D.color.getStyle()), A.save(), A.translate(L.x, L.y), 0 !== D.rotation && A.rotate(D.rotation), A.scale(N, -k), A.fillRect(-.5, -.5, 1, 1);
              A.restore()
            } else D instanceof THREE.SpriteCanvasMaterial && (p(D.color.getStyle()), d(D.color.getStyle()), A.save(), A.translate(L.x, L.y), 0 !== D.rotation && A.rotate(D.rotation), A.scale(N, k), D.program(A), A.restore())
          } else if (P instanceof THREE.RenderableLine) {
            if (T = P.v1, x = P.v2, T.positionScreen.x *= M, T.positionScreen.y *= C, x.positionScreen.x *= M, x.positionScreen.y *= C, le.setFromPoints([T.positionScreen, x.positionScreen]), !0 === ae.isIntersectionBox(le)) if (L = T, D = x, N = P, k = F, s(k.opacity), l(k.blending), A.beginPath(), A.moveTo(L.positionScreen.x, L.positionScreen.y), A.lineTo(D.positionScreen.x, D.positionScreen.y), k instanceof THREE.LineBasicMaterial) {
              if (h(k.linewidth), c(k.linecap), u(k.linejoin), k.vertexColors !== THREE.VertexColors) p(k.color.getStyle()); else if (P = N.vertexColors[0].getStyle(), N = N.vertexColors[1].getStyle(), P === N) p(P); else {
                try {
                  var V = A.createLinearGradient(L.positionScreen.x, L.positionScreen.y, D.positionScreen.x, D.positionScreen.y);
                  V.addColorStop(0, P), V.addColorStop(1, N)
                } catch (Ee) {
                  V = P
                }
                p(V)
              }
              A.stroke(), le.expandByScalar(2 * k.linewidth)
            } else k instanceof THREE.LineDashedMaterial && (h(k.linewidth), c(k.linecap), u(k.linejoin), p(k.color.getStyle()), f(k.dashSize, k.gapSize), A.stroke(), le.expandByScalar(2 * k.linewidth), f(null, null))
          } else if (P instanceof THREE.RenderableFace) {
            if (T = P.v1, x = P.v2, R = P.v3, -1 > T.positionScreen.z || 1 < T.positionScreen.z) continue;
            if (-1 > x.positionScreen.z || 1 < x.positionScreen.z) continue;
            if (-1 > R.positionScreen.z || 1 < R.positionScreen.z) continue;
            if (T.positionScreen.x *= M, T.positionScreen.y *= C, x.positionScreen.x *= M, x.positionScreen.y *= C, R.positionScreen.x *= M, R.positionScreen.y *= C, 0 < F.overdraw && (a(T.positionScreen, x.positionScreen, F.overdraw), a(x.positionScreen, R.positionScreen, F.overdraw), a(R.positionScreen, T.positionScreen, F.overdraw)), le.setFromPoints([T.positionScreen, x.positionScreen, R.positionScreen]), !0 === ae.isIntersectionBox(le)) {
              D = T, N = x, k = R, L = F, b.info.render.vertices += 3, b.info.render.faces++, s(L.opacity), l(L.blending), I = D.positionScreen.x, j = D.positionScreen.y, W = N.positionScreen.x, G = N.positionScreen.y, X = k.positionScreen.x, q = k.positionScreen.y;
              var F = I, O = j, U = W, z = G, B = X, ge = q;
              if (A.beginPath(), A.moveTo(F, O), A.lineTo(U, z), A.lineTo(B, ge), A.closePath(), (L instanceof THREE.MeshLambertMaterial || L instanceof THREE.MeshPhongMaterial) && null === L.map) {
                for (ie.copy(L.color), re.copy(L.emissive), L.vertexColors === THREE.FaceColors && ie.multiply(P.color), Y.copy(he), de.copy(D.positionWorld).add(N.positionWorld).add(k.positionWorld).divideScalar(3), D = de, N = P.normalModel, k = Y, P = 0, F = v.length; F > P; P++) O = v[P], ne.copy(O.color), O instanceof THREE.DirectionalLight ? (U = pe.setFromMatrixPosition(O.matrixWorld).normalize(), z = N.dot(U), 0 >= z || (z *= O.intensity, k.add(ne.multiplyScalar(z)))) : O instanceof THREE.PointLight && (U = pe.setFromMatrixPosition(O.matrixWorld), z = N.dot(pe.subVectors(U, D).normalize()), 0 >= z || (z *= 0 == O.distance ? 1 : 1 - Math.min(D.distanceTo(U) / O.distance, 1), 0 != z && (z *= O.intensity, k.add(ne.multiplyScalar(z)))));
                Y.multiply(ie).add(re), !0 === L.wireframe ? t(Y, L.wireframeLinewidth, L.wireframeLinecap, L.wireframeLinejoin) : i(Y)
              } else L instanceof THREE.MeshBasicMaterial || L instanceof THREE.MeshLambertMaterial || L instanceof THREE.MeshPhongMaterial ? null !== L.map ? L.map.mapping instanceof THREE.UVMapping && (K = P.uvs, o(I, j, W, G, X, q, K[0].x, K[0].y, K[1].x, K[1].y, K[2].x, K[2].y, L.map)) : null !== L.envMap ? L.envMap.mapping instanceof THREE.SphericalReflectionMapping ? (fe.copy(P.vertexNormalsModel[0]).applyMatrix3(me), $ = .5 * fe.x + .5, Q = .5 * fe.y + .5, fe.copy(P.vertexNormalsModel[1]).applyMatrix3(me), Z = .5 * fe.x + .5, J = .5 * fe.y + .5, fe.copy(P.vertexNormalsModel[2]).applyMatrix3(me), ee = .5 * fe.x + .5, te = .5 * fe.y + .5, o(I, j, W, G, X, q, $, Q, Z, J, ee, te, L.envMap)) : L.envMap.mapping instanceof THREE.SphericalRefractionMapping && (fe.copy(P.vertexNormalsModel[0]).applyMatrix3(me), $ = -.5 * fe.x + .5, Q = -.5 * fe.y + .5, fe.copy(P.vertexNormalsModel[1]).applyMatrix3(me), Z = -.5 * fe.x + .5, J = -.5 * fe.y + .5, fe.copy(P.vertexNormalsModel[2]).applyMatrix3(me), ee = -.5 * fe.x + .5, te = -.5 * fe.y + .5, o(I, j, W, G, X, q, $, Q, Z, J, ee, te, L.envMap)) : (Y.copy(L.color), L.vertexColors === THREE.FaceColors && Y.multiply(P.color), !0 === L.wireframe ? t(Y, L.wireframeLinewidth, L.wireframeLinecap, L.wireframeLinejoin) : i(Y)) : (L instanceof THREE.MeshDepthMaterial ? Y.r = Y.g = Y.b = 1 - m(D.positionScreen.z * D.positionScreen.w, y.near, y.far) : L instanceof THREE.MeshNormalMaterial ? (fe.copy(P.normalModel).applyMatrix3(me), Y.setRGB(fe.x, fe.y, fe.z).multiplyScalar(.5).addScalar(.5)) : Y.setRGB(1, 1, 1), !0 === L.wireframe ? t(Y, L.wireframeLinewidth, L.wireframeLinecap, L.wireframeLinejoin) : i(Y))
            }
          }
          se.union(le)
        }
      }
    }
  }
},THREE.ShaderChunk = {
  fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
  fog_fragment: "#ifdef USE_FOG\n	#ifdef USE_LOGDEPTHBUF_EXT\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n	#else\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n	#endif\n	#ifdef FOG_EXP2\n		const float LOG2 = 1.442695;\n		float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\n		fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n	#endif\n	gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
  envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	uniform samplerCube envMap;\n	uniform float flipEnvMap;\n	uniform int combine;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n		uniform bool useRefract;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
  envmap_fragment: "#ifdef USE_ENVMAP\n	vec3 reflectVec;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n		vec3 worldNormal = normalize( vec3( vec4( normal, 0.0 ) * viewMatrix ) );\n		if ( useRefract ) {\n			reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n		} else { \n			reflectVec = reflect( cameraToVertex, worldNormal );\n		}\n	#else\n		reflectVec = vReflect;\n	#endif\n	#ifdef DOUBLE_SIDED\n		float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n		vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#else\n		vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n	#endif\n	#ifdef GAMMA_INPUT\n		cubeColor.xyz *= cubeColor.xyz;\n	#endif\n	if ( combine == 1 ) {\n		gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n	} else if ( combine == 2 ) {\n		gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n	} else {\n		gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n	}\n#endif",
  envmap_pars_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\n	varying vec3 vReflect;\n	uniform float refractionRatio;\n	uniform bool useRefract;\n#endif",
  worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n	#ifdef USE_SKINNING\n		vec4 worldPosition = modelMatrix * skinned;\n	#endif\n	#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n		vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n	#endif\n	#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n	#endif\n#endif",
  envmap_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\n	vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\n	worldNormal = normalize( worldNormal );\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n	if ( useRefract ) {\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n	} else {\n		vReflect = reflect( cameraToVertex, worldNormal );\n	}\n#endif",
  map_particle_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
  map_particle_fragment: "#ifdef USE_MAP\n	gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
  map_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n#endif",
  map_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
  map_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
  map_fragment: "#ifdef USE_MAP\n	vec4 texelColor = texture2D( map, vUv );\n	#ifdef GAMMA_INPUT\n		texelColor.xyz *= texelColor.xyz;\n	#endif\n	gl_FragColor = gl_FragColor * texelColor;\n#endif",
  lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	varying vec2 vUv2;\n	uniform sampler2D lightMap;\n#endif",
  lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\n	varying vec2 vUv2;\n#endif",
  lightmap_fragment: "#ifdef USE_LIGHTMAP\n	gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
  lightmap_vertex: "#ifdef USE_LIGHTMAP\n	vUv2 = uv2;\n#endif",
  bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 );\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
  normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n		vec3 S = normalize(  q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n	}\n#endif",
  specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
  specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
  lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\n	uniform vec3 wrapRGB;\n#endif",
  lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n	vLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n	vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n	vec3 dirVector = normalize( lDirection.xyz );\n	float dotProduct = dot( transformedNormal, dirVector );\n	vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n	#ifdef DOUBLE_SIDED\n		vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n		#ifdef WRAP_AROUND\n			vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n		#endif\n	#endif\n	#ifdef WRAP_AROUND\n		vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n		directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n		#ifdef DOUBLE_SIDED\n			directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n		#endif\n	#endif\n	vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n	#ifdef DOUBLE_SIDED\n		vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n	#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\n	for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n		float lDistance = 1.0;\n		if ( pointLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n		lVector = normalize( lVector );\n		float dotProduct = dot( transformedNormal, lVector );\n		vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n		#ifdef DOUBLE_SIDED\n			vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n			#ifdef WRAP_AROUND\n				vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n			#endif\n		#endif\n		#ifdef WRAP_AROUND\n			vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n			pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n			#ifdef DOUBLE_SIDED\n				pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n			#endif\n		#endif\n		vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n		#ifdef DOUBLE_SIDED\n			vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n		#endif\n	}\n#endif\n#if MAX_SPOT_LIGHTS > 0\n	for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n			spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n			float lDistance = 1.0;\n			if ( spotLightDistance[ i ] > 0.0 )\n				lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n			lVector = normalize( lVector );\n			float dotProduct = dot( transformedNormal, lVector );\n			vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n			#ifdef DOUBLE_SIDED\n				vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n				#ifdef WRAP_AROUND\n					vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n				#endif\n			#endif\n			#ifdef WRAP_AROUND\n				vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n				spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n				#ifdef DOUBLE_SIDED\n					spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n				#endif\n			#endif\n			vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n			#ifdef DOUBLE_SIDED\n				vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n			#endif\n		}\n	}\n#endif\n#if MAX_HEMI_LIGHTS > 0\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n		vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n		vec3 lVector = normalize( lDirection.xyz );\n		float dotProduct = dot( transformedNormal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n		#ifdef DOUBLE_SIDED\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n		#endif\n	}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\n	vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
  lights_phong_pars_vertex: "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n	varying vec3 vWorldPosition;\n#endif",
  lights_phong_vertex: "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n	vWorldPosition = worldPosition.xyz;\n#endif",
  lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n	varying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\n	uniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
  lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\n	normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\n	vec3 pointDiffuse  = vec3( 0.0 );\n	vec3 pointSpecular = vec3( 0.0 );\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n		float lDistance = 1.0;\n		if ( pointLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n		lVector = normalize( lVector );\n		float dotProduct = dot( normal, lVector );\n		#ifdef WRAP_AROUND\n			float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n			float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n			vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n		#else\n			float pointDiffuseWeight = max( dotProduct, 0.0 );\n		#endif\n		pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n		vec3 pointHalfVector = normalize( lVector + viewPosition );\n		float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n		float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n		float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n		pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n	}\n#endif\n#if MAX_SPOT_LIGHTS > 0\n	vec3 spotDiffuse  = vec3( 0.0 );\n	vec3 spotSpecular = vec3( 0.0 );\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n		float lDistance = 1.0;\n		if ( spotLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n		lVector = normalize( lVector );\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n			spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n			float dotProduct = dot( normal, lVector );\n			#ifdef WRAP_AROUND\n				float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n				float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n				vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n			#else\n				float spotDiffuseWeight = max( dotProduct, 0.0 );\n			#endif\n			spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\n			vec3 spotHalfVector = normalize( lVector + viewPosition );\n			float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n			float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n			float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n			spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n		}\n	}\n#endif\n#if MAX_DIR_LIGHTS > 0\n	vec3 dirDiffuse  = vec3( 0.0 );\n	vec3 dirSpecular = vec3( 0.0 );\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n		vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n		vec3 dirVector = normalize( lDirection.xyz );\n		float dotProduct = dot( normal, dirVector );\n		#ifdef WRAP_AROUND\n			float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n			float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n			vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n		#else\n			float dirDiffuseWeight = max( dotProduct, 0.0 );\n		#endif\n		dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n		vec3 dirHalfVector = normalize( dirVector + viewPosition );\n		float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n		float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n		float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n		dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n	}\n#endif\n#if MAX_HEMI_LIGHTS > 0\n	vec3 hemiDiffuse  = vec3( 0.0 );\n	vec3 hemiSpecular = vec3( 0.0 );\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n		vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n		vec3 lVector = normalize( lDirection.xyz );\n		float dotProduct = dot( normal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n		hemiDiffuse += diffuse * hemiColor;\n		vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n		float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n		float hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\n		vec3 lVectorGround = -lVector;\n		vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n		float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n		float hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n		float dotProductGround = dot( normal, lVectorGround );\n		float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n		vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n		vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n		hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n	}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\n	totalDiffuse += dirDiffuse;\n	totalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\n	totalDiffuse += hemiDiffuse;\n	totalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\n	totalDiffuse += pointDiffuse;\n	totalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\n	totalDiffuse += spotDiffuse;\n	totalSpecular += spotSpecular;\n#endif\n#ifdef METAL\n	gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\n	gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
  color_pars_fragment: "#ifdef USE_COLOR\n	varying vec3 vColor;\n#endif",
  color_fragment: "#ifdef USE_COLOR\n	gl_FragColor = gl_FragColor * vec4( vColor, 1.0 );\n#endif",
  color_pars_vertex: "#ifdef USE_COLOR\n	varying vec3 vColor;\n#endif",
  color_vertex: "#ifdef USE_COLOR\n	#ifdef GAMMA_INPUT\n		vColor = color * color;\n	#else\n		vColor = color;\n	#endif\n#endif",
  skinning_pars_vertex: "#ifdef USE_SKINNING\n	#ifdef BONE_TEXTURE\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n		mat4 getBoneMatrix( const in float i ) {\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n			y = dy * ( y + 0.5 );\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n			mat4 bone = mat4( v1, v2, v3, v4 );\n			return bone;\n		}\n	#else\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n		mat4 getBoneMatrix( const in float i ) {\n			mat4 bone = boneGlobalMatrices[ int(i) ];\n			return bone;\n		}\n	#endif\n#endif",
  skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
  skinning_vertex: "#ifdef USE_SKINNING\n	#ifdef USE_MORPHTARGETS\n	vec4 skinVertex = vec4( morphed, 1.0 );\n	#else\n	vec4 skinVertex = vec4( position, 1.0 );\n	#endif\n	vec4 skinned  = boneMatX * skinVertex * skinWeight.x;\n	skinned      += boneMatY * skinVertex * skinWeight.y;\n	skinned      += boneMatZ * skinVertex * skinWeight.z;\n	skinned      += boneMatW * skinVertex * skinWeight.w;\n#endif",
  morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_MORPHNORMALS\n	uniform float morphTargetInfluences[ 8 ];\n	#else\n	uniform float morphTargetInfluences[ 4 ];\n	#endif\n#endif",
  morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	vec3 morphed = vec3( 0.0 );\n	morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n	#ifndef USE_MORPHNORMALS\n	morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n	#endif\n	morphed += position;\n#endif",
  default_vertex: "vec4 mvPosition;\n#ifdef USE_SKINNING\n	mvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\n	mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\n	mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
  morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	vec3 morphedNormal = vec3( 0.0 );\n	morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n	morphedNormal += normal;\n#endif",
  skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = skinWeight.x * boneMatX;\n	skinMatrix 	+= skinWeight.y * boneMatY;\n	skinMatrix 	+= skinWeight.z * boneMatZ;\n	skinMatrix 	+= skinWeight.w * boneMatW;\n	#ifdef USE_MORPHNORMALS\n	vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n	#else\n	vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n	#endif\n#endif",
  defaultnormal_vertex: "vec3 objectNormal;\n#ifdef USE_SKINNING\n	objectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\n	objectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\n	objectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\n	objectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
  shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	float unpackDepth( const in vec4 rgba_depth ) {\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n	}\n#endif",
  shadowmap_fragment: "#ifdef USE_SHADOWMAP\n	#ifdef SHADOWMAP_DEBUG\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n	#endif\n	#ifdef SHADOWMAP_CASCADE\n		int inFrustumCount = 0;\n	#endif\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n		#ifdef SHADOWMAP_CASCADE\n			inFrustumCount += int( inFrustum );\n			bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n		#else\n			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n		#endif\n		bool frustumTest = all( frustumTestVec );\n		if ( frustumTest ) {\n			shadowCoord.z += shadowBias[ i ];\n			#if defined( SHADOWMAP_TYPE_PCF )\n				float shadow = 0.0;\n				const float shadowDelta = 1.0 / 9.0;\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n				float shadow = 0.0;\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n				mat3 shadowKernel;\n				mat3 depthKernel;\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n			#else\n				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n				if ( fDepth < shadowCoord.z )\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n			#endif\n		}\n		#ifdef SHADOWMAP_DEBUG\n			#ifdef SHADOWMAP_CASCADE\n				if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n			#else\n				if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n			#endif\n		#endif\n	}\n	#ifdef GAMMA_OUTPUT\n		shadowColor *= shadowColor;\n	#endif\n	gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
  shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
  shadowmap_vertex: "#ifdef USE_SHADOWMAP\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n	}\n#endif",
  alphatest_fragment: "#ifdef ALPHATEST\n	if ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
  linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\n	gl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif",
  logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n	#ifdef USE_LOGDEPTHBUF_EXT\n		varying float vFragDepth;\n	#endif\n	uniform float logDepthBufFC;\n#endif",
  logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n	gl_Position.z = log2(max(1e-6, gl_Position.w + 1.0)) * logDepthBufFC;\n	#ifdef USE_LOGDEPTHBUF_EXT\n		vFragDepth = 1.0 + gl_Position.w;\n#else\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n	#endif\n#endif",
  logdepthbuf_pars_fragment: "#ifdef USE_LOGDEPTHBUF\n	uniform float logDepthBufFC;\n	#ifdef USE_LOGDEPTHBUF_EXT\n		#extension GL_EXT_frag_depth : enable\n		varying float vFragDepth;\n	#endif\n#endif",
  logdepthbuf_fragment: "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif"
},THREE.UniformsUtils = {
  merge: function (e) {
    var t, i, r, n = {};
    for (t = 0; t < e.length; t++) for (i in r = this.clone(e[t])) n[i] = r[i];
    return n
  }, clone: function (e) {
    var t, i, r, n = {};
    for (t in e) for (i in n[t] = {}, e[t]) r = e[t][i], n[t][i] = r instanceof THREE.Color || r instanceof THREE.Vector2 || r instanceof THREE.Vector3 || r instanceof THREE.Vector4 || r instanceof THREE.Matrix4 || r instanceof THREE.Texture ? r.clone() : r instanceof Array ? r.slice() : r;
    return n
  }
},THREE.UniformsLib = {
  common: {
    diffuse: {type: "c", value: new THREE.Color(15658734)},
    opacity: {type: "f", value: 1},
    map: {type: "t", value: null},
    offsetRepeat: {type: "v4", value: new THREE.Vector4(0, 0, 1, 1)},
    lightMap: {type: "t", value: null},
    specularMap: {type: "t", value: null},
    envMap: {type: "t", value: null},
    flipEnvMap: {type: "f", value: -1},
    useRefract: {type: "i", value: 0},
    reflectivity: {type: "f", value: 1},
    refractionRatio: {type: "f", value: .98},
    combine: {type: "i", value: 0},
    morphTargetInfluences: {type: "f", value: 0}
  },
  bump: {bumpMap: {type: "t", value: null}, bumpScale: {type: "f", value: 1}},
  normalmap: {normalMap: {type: "t", value: null}, normalScale: {type: "v2", value: new THREE.Vector2(1, 1)}},
  fog: {
    fogDensity: {type: "f", value: 25e-5},
    fogNear: {type: "f", value: 1},
    fogFar: {type: "f", value: 2e3},
    fogColor: {type: "c", value: new THREE.Color(16777215)}
  },
  lights: {
    ambientLightColor: {type: "fv", value: []},
    directionalLightDirection: {type: "fv", value: []},
    directionalLightColor: {type: "fv", value: []},
    hemisphereLightDirection: {type: "fv", value: []},
    hemisphereLightSkyColor: {type: "fv", value: []},
    hemisphereLightGroundColor: {type: "fv", value: []},
    pointLightColor: {type: "fv", value: []},
    pointLightPosition: {type: "fv", value: []},
    pointLightDistance: {type: "fv1", value: []},
    spotLightColor: {type: "fv", value: []},
    spotLightPosition: {type: "fv", value: []},
    spotLightDirection: {type: "fv", value: []},
    spotLightDistance: {type: "fv1", value: []},
    spotLightAngleCos: {type: "fv1", value: []},
    spotLightExponent: {type: "fv1", value: []}
  },
  particle: {
    psColor: {type: "c", value: new THREE.Color(15658734)},
    opacity: {type: "f", value: 1},
    size: {type: "f", value: 1},
    scale: {type: "f", value: 1},
    map: {type: "t", value: null},
    fogDensity: {type: "f", value: 25e-5},
    fogNear: {type: "f", value: 1},
    fogFar: {type: "f", value: 2e3},
    fogColor: {type: "c", value: new THREE.Color(16777215)}
  },
  shadowmap: {
    shadowMap: {type: "tv", value: []},
    shadowMapSize: {type: "v2v", value: []},
    shadowBias: {type: "fv1", value: []},
    shadowDarkness: {type: "fv1", value: []},
    shadowMatrix: {type: "m4v", value: []}
  }
},THREE.ShaderLib = {
  basic: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
    vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "	#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "	#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
  },
  lambert: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
      ambient: {
        type: "c",
        value: new THREE.Color(16777215)
      }, emissive: {type: "c", value: new THREE.Color(0)}, wrapRGB: {type: "v3", value: new THREE.Vector3(1, 1, 1)}
    }]),
    vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n	varying vec3 vLightBack;\n#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
    fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n	varying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = vec4( vec3( 1.0 ), opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "	#ifdef DOUBLE_SIDED\n		if ( gl_FrontFacing )\n			gl_FragColor.xyz *= vLightFront;\n		else\n			gl_FragColor.xyz *= vLightBack;\n	#else\n		gl_FragColor.xyz *= vLightFront;\n	#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
  },
  phong: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
      ambient: {
        type: "c",
        value: new THREE.Color(16777215)
      },
      emissive: {type: "c", value: new THREE.Color(0)},
      specular: {type: "c", value: new THREE.Color(1118481)},
      shininess: {type: "f", value: 30},
      wrapRGB: {type: "v3", value: new THREE.Vector3(1, 1, 1)}
    }]),
    vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "	vNormal = normalize( transformedNormal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "	vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = vec4( vec3( 1.0 ), opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
  },
  particle_basic: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
    vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n	#ifdef USE_SIZEATTENUATION\n		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n	#else\n		gl_PointSize = size;\n	#endif\n	gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
    fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
  },
  dashed: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
      scale: {
        type: "f",
        value: 1
      }, dashSize: {type: "f", value: 1}, totalSize: {type: "f", value: 2}
    }]),
    vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "	vLineDistance = scale * lineDistance;\n	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n	gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
    fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	gl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
  },
  depth: {
    uniforms: {mNear: {type: "f", value: 1}, mFar: {type: "f", value: 2e3}, opacity: {type: "f", value: 1}},
    vertexShader: [THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
    fragmentShader: ["uniform float mNear;\nuniform float mFar;\nuniform float opacity;", THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n	#else\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n	#endif\n	float color = 1.0 - smoothstep( mNear, mFar, depth );\n	gl_FragColor = vec4( vec3( color ), opacity );\n}"].join("\n")
  },
  normal: {
    uniforms: {opacity: {type: "f", value: 1}},
    vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n	vNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
    fragmentShader: ["uniform float opacity;\nvarying vec3 vNormal;", THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
  },
  normalmap: {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
      enableAO: {
        type: "i",
        value: 0
      },
      enableDiffuse: {type: "i", value: 0},
      enableSpecular: {type: "i", value: 0},
      enableReflection: {type: "i", value: 0},
      enableDisplacement: {type: "i", value: 0},
      tDisplacement: {type: "t", value: null},
      tDiffuse: {type: "t", value: null},
      tCube: {type: "t", value: null},
      tNormal: {type: "t", value: null},
      tSpecular: {type: "t", value: null},
      tAO: {type: "t", value: null},
      uNormalScale: {type: "v2", value: new THREE.Vector2(1, 1)},
      uDisplacementBias: {type: "f", value: 0},
      uDisplacementScale: {type: "f", value: 1},
      diffuse: {type: "c", value: new THREE.Color(16777215)},
      specular: {type: "c", value: new THREE.Color(1118481)},
      ambient: {type: "c", value: new THREE.Color(16777215)},
      shininess: {type: "f", value: 30},
      opacity: {type: "f", value: 1},
      useRefract: {type: "i", value: 0},
      refractionRatio: {type: "f", value: .98},
      reflectivity: {type: "f", value: .5},
      uOffset: {type: "v2", value: new THREE.Vector2(0, 0)},
      uRepeat: {type: "v2", value: new THREE.Vector2(1, 1)},
      wrapRGB: {type: "v3", value: new THREE.Vector3(1, 1, 1)}
    }]),
    fragmentShader: ["uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float refractionRatio;\nuniform float reflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\n	uniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "	gl_FragColor = vec4( vec3( 1.0 ), opacity );\n	vec3 specularTex = vec3( 1.0 );\n	vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\n	normalTex.xy *= uNormalScale;\n	normalTex = normalize( normalTex );\n	if( enableDiffuse ) {\n		#ifdef GAMMA_INPUT\n			vec4 texelColor = texture2D( tDiffuse, vUv );\n			texelColor.xyz *= texelColor.xyz;\n			gl_FragColor = gl_FragColor * texelColor;\n		#else\n			gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n		#endif\n	}\n	if( enableAO ) {\n		#ifdef GAMMA_INPUT\n			vec4 aoColor = texture2D( tAO, vUv );\n			aoColor.xyz *= aoColor.xyz;\n			gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n		#else\n			gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n		#endif\n	}\n	if( enableSpecular )\n		specularTex = texture2D( tSpecular, vUv ).xyz;\n	mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\n	vec3 finalNormal = tsb * normalTex;\n	#ifdef FLIP_SIDED\n		finalNormal = -finalNormal;\n	#endif\n	vec3 normal = normalize( finalNormal );\n	vec3 viewPosition = normalize( vViewPosition );\n	#if MAX_POINT_LIGHTS > 0\n		vec3 pointDiffuse = vec3( 0.0 );\n		vec3 pointSpecular = vec3( 0.0 );\n		for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n			vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n			vec3 pointVector = lPosition.xyz + vViewPosition.xyz;\n			float pointDistance = 1.0;\n			if ( pointLightDistance[ i ] > 0.0 )\n				pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\n			pointVector = normalize( pointVector );\n			#ifdef WRAP_AROUND\n				float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\n				float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\n				vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n			#else\n				float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n			#endif\n			pointDiffuse += pointDistance * pointLightColor[ i ] * diffuse * pointDiffuseWeight;\n			vec3 pointHalfVector = normalize( pointVector + viewPosition );\n			float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n			float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n			float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\n			pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n		}\n	#endif\n	#if MAX_SPOT_LIGHTS > 0\n		vec3 spotDiffuse = vec3( 0.0 );\n		vec3 spotSpecular = vec3( 0.0 );\n		for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n			vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n			vec3 spotVector = lPosition.xyz + vViewPosition.xyz;\n			float spotDistance = 1.0;\n			if ( spotLightDistance[ i ] > 0.0 )\n				spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\n			spotVector = normalize( spotVector );\n			float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n			if ( spotEffect > spotLightAngleCos[ i ] ) {\n				spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n				#ifdef WRAP_AROUND\n					float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\n					float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\n					vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n				#else\n					float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n				#endif\n				spotDiffuse += spotDistance * spotLightColor[ i ] * diffuse * spotDiffuseWeight * spotEffect;\n				vec3 spotHalfVector = normalize( spotVector + viewPosition );\n				float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n				float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n				float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n				vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\n				spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n			}\n		}\n	#endif\n	#if MAX_DIR_LIGHTS > 0\n		vec3 dirDiffuse = vec3( 0.0 );\n		vec3 dirSpecular = vec3( 0.0 );\n		for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\n			vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n			vec3 dirVector = normalize( lDirection.xyz );\n			#ifdef WRAP_AROUND\n				float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\n				float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\n				vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n			#else\n				float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n			#endif\n			dirDiffuse += directionalLightColor[ i ] * diffuse * dirDiffuseWeight;\n			vec3 dirHalfVector = normalize( dirVector + viewPosition );\n			float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n			float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n			float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\n			dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n		}\n	#endif\n	#if MAX_HEMI_LIGHTS > 0\n		vec3 hemiDiffuse  = vec3( 0.0 );\n		vec3 hemiSpecular = vec3( 0.0 );\n		for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n			vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n			vec3 lVector = normalize( lDirection.xyz );\n			float dotProduct = dot( normal, lVector );\n			float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n			vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n			hemiDiffuse += diffuse * hemiColor;\n			vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n			float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n			float hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\n			vec3 lVectorGround = -lVector;\n			vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n			float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n			float hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n			float dotProductGround = dot( normal, lVectorGround );\n			float specularNormalization = ( shininess + 2.0001 ) / 8.0;\n			vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\n			vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\n			hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n		}\n	#endif\n	vec3 totalDiffuse = vec3( 0.0 );\n	vec3 totalSpecular = vec3( 0.0 );\n	#if MAX_DIR_LIGHTS > 0\n		totalDiffuse += dirDiffuse;\n		totalSpecular += dirSpecular;\n	#endif\n	#if MAX_HEMI_LIGHTS > 0\n		totalDiffuse += hemiDiffuse;\n		totalSpecular += hemiSpecular;\n	#endif\n	#if MAX_POINT_LIGHTS > 0\n		totalDiffuse += pointDiffuse;\n		totalSpecular += pointSpecular;\n	#endif\n	#if MAX_SPOT_LIGHTS > 0\n		totalDiffuse += spotDiffuse;\n		totalSpecular += spotSpecular;\n	#endif\n	#ifdef METAL\n		gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );\n	#else\n		gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n	#endif\n	if ( enableReflection ) {\n		vec3 vReflect;\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n		if ( useRefract ) {\n			vReflect = refract( cameraToVertex, normal, refractionRatio );\n		} else {\n			vReflect = reflect( cameraToVertex, normal );\n		}\n		vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n		#ifdef GAMMA_INPUT\n			cubeColor.xyz *= cubeColor.xyz;\n		#endif\n		gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * reflectivity );\n	}", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
    vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\n	uniform sampler2D tDisplacement;\n	uniform float uDisplacementScale;\n	uniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, "	#ifdef USE_SKINNING\n		vNormal = normalize( normalMatrix * skinnedNormal.xyz );\n		vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\n		vTangent = normalize( normalMatrix * skinnedTangent.xyz );\n	#else\n		vNormal = normalize( normalMatrix * normal );\n		vTangent = normalize( normalMatrix * tangent.xyz );\n	#endif\n	vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\n	vUv = uv * uRepeat + uOffset;\n	vec3 displacedPosition;\n	#ifdef VERTEX_TEXTURES\n		if ( enableDisplacement ) {\n			vec3 dv = texture2D( tDisplacement, uv ).xyz;\n			float df = uDisplacementScale * dv.x + uDisplacementBias;\n			displacedPosition = position + normalize( normal ) * df;\n		} else {\n			#ifdef USE_SKINNING\n				vec4 skinVertex = vec4( position, 1.0 );\n				vec4 skinned  = boneMatX * skinVertex * skinWeight.x;\n				skinned 	  += boneMatY * skinVertex * skinWeight.y;\n				skinned 	  += boneMatZ * skinVertex * skinWeight.z;\n				skinned 	  += boneMatW * skinVertex * skinWeight.w;\n				displacedPosition  = skinned.xyz;\n			#else\n				displacedPosition = position;\n			#endif\n		}\n	#else\n		#ifdef USE_SKINNING\n			vec4 skinVertex = vec4( position, 1.0 );\n			vec4 skinned  = boneMatX * skinVertex * skinWeight.x;\n			skinned 	  += boneMatY * skinVertex * skinWeight.y;\n			skinned 	  += boneMatZ * skinVertex * skinWeight.z;\n			skinned 	  += boneMatW * skinVertex * skinWeight.w;\n			displacedPosition  = skinned.xyz;\n		#else\n			displacedPosition = position;\n		#endif\n	#endif\n	vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\n	vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\n	gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, "	vWorldPosition = worldPosition.xyz;\n	vViewPosition = -mvPosition.xyz;\n	#ifdef USE_SHADOWMAP\n		for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n			vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n		}\n	#endif\n}"].join("\n")
  },
  cube: {
    uniforms: {tCube: {type: "t", value: null}, tFlip: {type: "f", value: -1}},
    vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {\n	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n	vWorldPosition = worldPosition.xyz;\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
    fragmentShader: ["uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;", THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {\n	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
  },
  depthRGBA: {
    uniforms: {},
    vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
    fragmentShader: [THREE.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {\n	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\n	const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\n	vec4 res = fract( depth * bit_shift );\n	res -= res.xxyz * bit_mask;\n	return res;\n}\nvoid main() {", THREE.ShaderChunk.logdepthbuf_fragment, "	#ifdef USE_LOGDEPTHBUF_EXT\n		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );\n	#else\n		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n	#endif\n}"].join("\n")
  }
},THREE.WebGLRenderer = function (e) {
  function t(e, t) {
    var i = e.vertices.length, r = t.material;
    if (r.attributes) {
      void 0 === e.__webglCustomAttributesList && (e.__webglCustomAttributesList = []);
      for (var n in r.attributes) {
        var o = r.attributes[n];
        if (!o.__webglInitialized || o.createUniqueBuffers) {
          o.__webglInitialized = !0;
          var a = 1;
          "v2" === o.type ? a = 2 : "v3" === o.type ? a = 3 : "v4" === o.type ? a = 4 : "c" === o.type && (a = 3), o.size = a, o.array = new Float32Array(i * a), o.buffer = W.createBuffer(), o.buffer.belongsToAttribute = n, o.needsUpdate = !0
        }
        e.__webglCustomAttributesList.push(o)
      }
    }
  }

  function i(e, t) {
    var i = t.geometry, a = e.faces3, s = 3 * a.length, l = 1 * a.length, h = 3 * a.length, a = r(t, e), c = o(a),
      u = n(a), p = a.vertexColors ? a.vertexColors : !1;
    if (e.__vertexArray = new Float32Array(3 * s), u && (e.__normalArray = new Float32Array(3 * s)), i.hasTangents && (e.__tangentArray = new Float32Array(4 * s)), p && (e.__colorArray = new Float32Array(3 * s)), c && (0 < i.faceVertexUvs.length && (e.__uvArray = new Float32Array(2 * s)), 1 < i.faceVertexUvs.length && (e.__uv2Array = new Float32Array(2 * s))), t.geometry.skinWeights.length && t.geometry.skinIndices.length && (e.__skinIndexArray = new Float32Array(4 * s), e.__skinWeightArray = new Float32Array(4 * s)), i = null !== K && l > 21845 ? Uint32Array : Uint16Array, e.__typeArray = i, e.__faceArray = new i(3 * l), e.__lineArray = new i(2 * h), e.numMorphTargets) for (e.__morphTargetsArrays = [], i = 0, c = e.numMorphTargets; c > i; i++) e.__morphTargetsArrays.push(new Float32Array(3 * s));
    if (e.numMorphNormals) for (e.__morphNormalsArrays = [], i = 0, c = e.numMorphNormals; c > i; i++) e.__morphNormalsArrays.push(new Float32Array(3 * s));
    if (e.__webglFaceCount = 3 * l, e.__webglLineCount = 2 * h, a.attributes) {
      void 0 === e.__webglCustomAttributesList && (e.__webglCustomAttributesList = []);
      for (var d in a.attributes) {
        var f, l = a.attributes[d], h = {};
        for (f in l) h[f] = l[f];
        (!h.__webglInitialized || h.createUniqueBuffers) && (h.__webglInitialized = !0, i = 1, "v2" === h.type ? i = 2 : "v3" === h.type ? i = 3 : "v4" === h.type ? i = 4 : "c" === h.type && (i = 3), h.size = i, h.array = new Float32Array(s * i), h.buffer = W.createBuffer(), h.buffer.belongsToAttribute = d, l.needsUpdate = !0, h.__original = l), e.__webglCustomAttributesList.push(h)
      }
    }
    e.__inittedArrays = !0
  }

  function r(e, t) {
    return e.material instanceof THREE.MeshFaceMaterial ? e.material.materials[t.materialIndex] : e.material
  }

  function n(e) {
    return e instanceof THREE.MeshBasicMaterial && !e.envMap || e instanceof THREE.MeshDepthMaterial ? !1 : e && void 0 !== e.shading && e.shading === THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading
  }

  function o(e) {
    return e.map || e.lightMap || e.bumpMap || e.normalMap || e.specularMap || e instanceof THREE.ShaderMaterial ? !0 : !1
  }

  function a(e, t, i, r) {
    for (var n in t) {
      var o = t[n], a = i[n];
      if (o >= 0) if (a) {
        var s = a.itemSize;
        W.bindBuffer(W.ARRAY_BUFFER, a.buffer), l(o), W.vertexAttribPointer(o, s, W.FLOAT, !1, 0, r * s * 4)
      } else e.defaultAttributeValues && (2 === e.defaultAttributeValues[n].length ? W.vertexAttrib2fv(o, e.defaultAttributeValues[n]) : 3 === e.defaultAttributeValues[n].length && W.vertexAttrib3fv(o, e.defaultAttributeValues[n]))
    }
    h()
  }

  function s() {
    for (var e = 0, t = Re.length; t > e; e++) Re[e] = 0
  }

  function l(e) {
    Re[e] = 1, 0 === be[e] && (W.enableVertexAttribArray(e), be[e] = 1)
  }

  function h() {
    for (var e = 0, t = be.length; t > e; e++) be[e] !== Re[e] && (W.disableVertexAttribArray(e), be[e] = 0)
  }

  function c(e, t) {
    return e.z !== t.z ? t.z - e.z : e.id - t.id
  }

  function u(e, t) {
    return t[0] - e[0]
  }

  function p(e, t, i) {
    if (e.length) for (var r = 0, n = e.length; n > r; r++) ie = Z = null, ee = te = oe = ne = ue = ce = ae = -1, Ce = !0, e[r].render(t, i, Te, xe), ie = Z = null, ee = te = oe = ne = ue = ce = ae = -1, Ce = !0
  }

  function d(e, t, i, r, n, o, a, s) {
    var l, h, c, u;
    t ? (h = e.length - 1, u = t = -1) : (h = 0, t = e.length, u = 1);
    for (var p = h; p !== t; p += u) if (l = e[p], l.render) {
      if (h = l.object, c = l.buffer, s) l = s; else {
        if (l = l[i], !l) continue;
        a && $.setBlending(l.blending, l.blendEquation, l.blendSrc, l.blendDst), $.setDepthTest(l.depthTest), $.setDepthWrite(l.depthWrite), S(l.polygonOffset, l.polygonOffsetFactor, l.polygonOffsetUnits)
      }
      $.setMaterialFaces(l), c instanceof THREE.BufferGeometry ? $.renderBufferDirect(r, n, o, l, c, h) : $.renderBuffer(r, n, o, l, c, h)
    }
  }

  function f(e, t, i, r, n, o, a) {
    for (var s, l, h = 0, c = e.length; c > h; h++) if (s = e[h], l = s.object, l.visible) {
      if (a) s = a; else {
        if (s = s[t], !s) continue;
        o && $.setBlending(s.blending, s.blendEquation, s.blendSrc, s.blendDst), $.setDepthTest(s.depthTest), $.setDepthWrite(s.depthWrite), S(s.polygonOffset, s.polygonOffsetFactor, s.polygonOffsetUnits)
      }
      $.renderImmediateObject(i, r, n, s, l)
    }
  }

  function m(e, r) {
    var n, o, a;
    if (void 0 === e.__webglInit && (e.__webglInit = !0, e._modelViewMatrix = new THREE.Matrix4, e._normalMatrix = new THREE.Matrix3, o = e.geometry, void 0 !== o && void 0 === o.__webglInit)) if (o.__webglInit = !0, o.addEventListener("dispose", je), o instanceof THREE.BufferGeometry) for (a in o.attributes) {
      var s = "index" === a ? W.ELEMENT_ARRAY_BUFFER : W.ARRAY_BUFFER, l = o.attributes[a];
      l.buffer = W.createBuffer(), W.bindBuffer(s, l.buffer), W.bufferData(s, l.array, W.STATIC_DRAW)
    } else if (e instanceof THREE.Mesh) {
      for (n in a = e.material, void 0 === o.geometryGroups && o.makeGroups(a instanceof THREE.MeshFaceMaterial, K ? 4294967296 : 65535), o.geometryGroups) if (a = o.geometryGroups[n], !a.__webglVertexBuffer) {
        s = a, s.__webglVertexBuffer = W.createBuffer(), s.__webglNormalBuffer = W.createBuffer(), s.__webglTangentBuffer = W.createBuffer(), s.__webglColorBuffer = W.createBuffer(), s.__webglUVBuffer = W.createBuffer(), s.__webglUV2Buffer = W.createBuffer(), s.__webglSkinIndicesBuffer = W.createBuffer(), s.__webglSkinWeightsBuffer = W.createBuffer(), s.__webglFaceBuffer = W.createBuffer(), s.__webglLineBuffer = W.createBuffer();
        var h = l = void 0;
        if (s.numMorphTargets) for (s.__webglMorphTargetsBuffers = [], l = 0, h = s.numMorphTargets; h > l; l++) s.__webglMorphTargetsBuffers.push(W.createBuffer());
        if (s.numMorphNormals) for (s.__webglMorphNormalsBuffers = [], l = 0, h = s.numMorphNormals; h > l; l++) s.__webglMorphNormalsBuffers.push(W.createBuffer());
        $.info.memory.geometries++, i(a, e), o.verticesNeedUpdate = !0, o.morphTargetsNeedUpdate = !0, o.elementsNeedUpdate = !0, o.uvsNeedUpdate = !0, o.normalsNeedUpdate = !0, o.tangentsNeedUpdate = !0, o.colorsNeedUpdate = !0
      }
    } else e instanceof THREE.Line ? o.__webglVertexBuffer || (a = o, a.__webglVertexBuffer = W.createBuffer(), a.__webglColorBuffer = W.createBuffer(), a.__webglLineDistanceBuffer = W.createBuffer(), $.info.memory.geometries++, a = o, s = a.vertices.length, a.__vertexArray = new Float32Array(3 * s), a.__colorArray = new Float32Array(3 * s), a.__lineDistanceArray = new Float32Array(1 * s), a.__webglLineCount = s, t(a, e), o.verticesNeedUpdate = !0, o.colorsNeedUpdate = !0, o.lineDistancesNeedUpdate = !0) : e instanceof THREE.ParticleSystem && !o.__webglVertexBuffer && (a = o, a.__webglVertexBuffer = W.createBuffer(), a.__webglColorBuffer = W.createBuffer(), $.info.memory.geometries++, a = o, s = a.vertices.length, a.__vertexArray = new Float32Array(3 * s), a.__colorArray = new Float32Array(3 * s), a.__sortArray = [], a.__webglParticleCount = s, t(a, e), o.verticesNeedUpdate = !0, o.colorsNeedUpdate = !0);
    if (void 0 === e.__webglActive) {
      if (e instanceof THREE.Mesh) {
        if (o = e.geometry, o instanceof THREE.BufferGeometry) E(r.__webglObjects, o, e); else if (o instanceof THREE.Geometry) for (n in o.geometryGroups) a = o.geometryGroups[n], E(r.__webglObjects, a, e)
      } else e instanceof THREE.Line || e instanceof THREE.ParticleSystem ? (o = e.geometry, E(r.__webglObjects, o, e)) : e instanceof THREE.ImmediateRenderObject || e.immediateRenderCallback ? r.__webglObjectsImmediate.push({
        id: null,
        object: e,
        opaque: null,
        transparent: null,
        z: 0
      }) : e instanceof THREE.Sprite ? r.__webglSprites.push(e) : e instanceof THREE.LensFlare && r.__webglFlares.push(e);
      e.__webglActive = !0
    }
  }

  function E(e, t, i) {
    e.push({id: null, buffer: t, object: i, opaque: null, transparent: null, z: 0})
  }

  function g(e) {
    for (var t in e.attributes) if (e.attributes[t].needsUpdate) return !0;
    return !1
  }

  function v(e) {
    for (var t in e.attributes) e.attributes[t].needsUpdate = !1
  }

  function y(e, t) {
    e instanceof THREE.Mesh || e instanceof THREE.ParticleSystem || e instanceof THREE.Line ? T(t.__webglObjects, e) : e instanceof THREE.Sprite ? x(t.__webglSprites, e) : e instanceof THREE.LensFlare ? x(t.__webglFlares, e) : (e instanceof THREE.ImmediateRenderObject || e.immediateRenderCallback) && T(t.__webglObjectsImmediate, e), delete e.__webglActive
  }

  function T(e, t) {
    for (var i = e.length - 1; i >= 0; i--) e[i].object === t && e.splice(i, 1)
  }

  function x(e, t) {
    for (var i = e.length - 1; i >= 0; i--) e[i] === t && e.splice(i, 1)
  }

  function R(e, t, i, r, n) {
    re = 0, r.needsUpdate && (r.program && Ye(r), $.initMaterial(r, t, i, n), r.needsUpdate = !1), r.morphTargets && !n.__webglMorphTargetInfluences && (n.__webglMorphTargetInfluences = new Float32Array($.maxMorphTargets));
    var o = !1, a = r.program, s = a.uniforms, l = r.uniforms;
    if (a.id !== Z && (W.useProgram(a.program), Z = a.id, o = !0), r.id !== ee && (ee = r.id, o = !0), (o || e !== ie) && (W.uniformMatrix4fv(s.projectionMatrix, !1, e.projectionMatrix.elements), V && W.uniform1f(s.logDepthBufFC, 2 / (Math.log(e.far + 1) / Math.LN2)), e !== ie && (ie = e)), r.skinning) if (Ne && n.useVertexTexture) {
      if (null !== s.boneTexture) {
        var h = b();
        W.uniform1i(s.boneTexture, h), $.setTexture(n.boneTexture, h)
      }
      null !== s.boneTextureWidth && W.uniform1i(s.boneTextureWidth, n.boneTextureWidth), null !== s.boneTextureHeight && W.uniform1i(s.boneTextureHeight, n.boneTextureHeight)
    } else null !== s.boneGlobalMatrices && W.uniformMatrix4fv(s.boneGlobalMatrices, !1, n.boneMatrices);
    if (o) {
      if (i && r.fog && (l.fogColor.value = i.color, i instanceof THREE.Fog ? (l.fogNear.value = i.near, l.fogFar.value = i.far) : i instanceof THREE.FogExp2 && (l.fogDensity.value = i.density)), r instanceof THREE.MeshPhongMaterial || r instanceof THREE.MeshLambertMaterial || r.lights) {
        if (Ce) {
          var c, u, p, d, f = h = 0, m = 0, E = Ae, g = E.directional.colors, v = E.directional.positions,
            y = E.point.colors, T = E.point.positions, x = E.point.distances, R = E.spot.colors, _ = E.spot.positions,
            S = E.spot.distances, C = E.spot.directions, A = E.spot.anglesCos, P = E.spot.exponents,
            F = E.hemi.skyColors, k = E.hemi.groundColors, N = E.hemi.positions, U = 0, z = 0, O = 0, B = 0, I = 0,
            j = 0, G = 0, X = 0, q = c = 0;
          for (i = d = q = 0, o = t.length; o > i; i++) c = t[i], c.onlyShadow || (u = c.color, p = c.intensity, d = c.distance, c instanceof THREE.AmbientLight ? c.visible && ($.gammaInput ? (h += u.r * u.r, f += u.g * u.g, m += u.b * u.b) : (h += u.r, f += u.g, m += u.b)) : c instanceof THREE.DirectionalLight ? (I += 1, c.visible && (Me.setFromMatrixPosition(c.matrixWorld), Se.setFromMatrixPosition(c.target.matrixWorld), Me.sub(Se), Me.normalize(), 0 !== Me.x || 0 !== Me.y || 0 !== Me.z) && (c = 3 * U, v[c] = Me.x, v[c + 1] = Me.y, v[c + 2] = Me.z, $.gammaInput ? H(g, c, u, p * p) : w(g, c, u, p), U += 1)) : c instanceof THREE.PointLight ? (j += 1, c.visible && (q = 3 * z, $.gammaInput ? H(y, q, u, p * p) : w(y, q, u, p), Se.setFromMatrixPosition(c.matrixWorld), T[q] = Se.x, T[q + 1] = Se.y, T[q + 2] = Se.z, x[z] = d, z += 1)) : c instanceof THREE.SpotLight ? (G += 1, c.visible && (q = 3 * O, $.gammaInput ? H(R, q, u, p * p) : w(R, q, u, p), Se.setFromMatrixPosition(c.matrixWorld), _[q] = Se.x, _[q + 1] = Se.y, _[q + 2] = Se.z, S[O] = d, Me.copy(Se), Se.setFromMatrixPosition(c.target.matrixWorld), Me.sub(Se), Me.normalize(), C[q] = Me.x, C[q + 1] = Me.y, C[q + 2] = Me.z, A[O] = Math.cos(c.angle), P[O] = c.exponent, O += 1)) : c instanceof THREE.HemisphereLight && (X += 1, c.visible && (Me.setFromMatrixPosition(c.matrixWorld), Me.normalize(), 0 !== Me.x || 0 !== Me.y || 0 !== Me.z)) && (d = 3 * B, N[d] = Me.x, N[d + 1] = Me.y, N[d + 2] = Me.z, u = c.color, c = c.groundColor, $.gammaInput ? (p *= p, H(F, d, u, p), H(k, d, c, p)) : (w(F, d, u, p), w(k, d, c, p)), B += 1));
          for (i = 3 * U, o = Math.max(g.length, 3 * I); o > i; i++) g[i] = 0;
          for (i = 3 * z, o = Math.max(y.length, 3 * j); o > i; i++) y[i] = 0;
          for (i = 3 * O, o = Math.max(R.length, 3 * G); o > i; i++) R[i] = 0;
          for (i = 3 * B, o = Math.max(F.length, 3 * X); o > i; i++) F[i] = 0;
          for (i = 3 * B, o = Math.max(k.length, 3 * X); o > i; i++) k[i] = 0;
          E.directional.length = U, E.point.length = z, E.spot.length = O, E.hemi.length = B, E.ambient[0] = h, E.ambient[1] = f, E.ambient[2] = m, Ce = !1
        }
        i = Ae, l.ambientLightColor.value = i.ambient, l.directionalLightColor.value = i.directional.colors, l.directionalLightDirection.value = i.directional.positions, l.pointLightColor.value = i.point.colors, l.pointLightPosition.value = i.point.positions, l.pointLightDistance.value = i.point.distances, l.spotLightColor.value = i.spot.colors, l.spotLightPosition.value = i.spot.positions, l.spotLightDistance.value = i.spot.distances, l.spotLightDirection.value = i.spot.directions, l.spotLightAngleCos.value = i.spot.anglesCos, l.spotLightExponent.value = i.spot.exponents, l.hemisphereLightSkyColor.value = i.hemi.skyColors, l.hemisphereLightGroundColor.value = i.hemi.groundColors, l.hemisphereLightDirection.value = i.hemi.positions
      }
      if (r instanceof THREE.MeshBasicMaterial || r instanceof THREE.MeshLambertMaterial || r instanceof THREE.MeshPhongMaterial) {
        l.opacity.value = r.opacity, $.gammaInput ? l.diffuse.value.copyGammaToLinear(r.color) : l.diffuse.value = r.color, l.map.value = r.map, l.lightMap.value = r.lightMap, l.specularMap.value = r.specularMap, r.bumpMap && (l.bumpMap.value = r.bumpMap, l.bumpScale.value = r.bumpScale), r.normalMap && (l.normalMap.value = r.normalMap, l.normalScale.value.copy(r.normalScale));
        var Y;
        r.map ? Y = r.map : r.specularMap ? Y = r.specularMap : r.normalMap ? Y = r.normalMap : r.bumpMap && (Y = r.bumpMap), void 0 !== Y && (i = Y.offset, Y = Y.repeat, l.offsetRepeat.value.set(i.x, i.y, Y.x, Y.y)), l.envMap.value = r.envMap, l.flipEnvMap.value = r.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1, l.reflectivity.value = r.reflectivity, l.refractionRatio.value = r.refractionRatio, l.combine.value = r.combine, l.useRefract.value = r.envMap && r.envMap.mapping instanceof THREE.CubeRefractionMapping
      }
      if (r instanceof THREE.LineBasicMaterial ? (l.diffuse.value = r.color, l.opacity.value = r.opacity) : r instanceof THREE.LineDashedMaterial ? (l.diffuse.value = r.color, l.opacity.value = r.opacity, l.dashSize.value = r.dashSize, l.totalSize.value = r.dashSize + r.gapSize, l.scale.value = r.scale) : r instanceof THREE.ParticleSystemMaterial ? (l.psColor.value = r.color, l.opacity.value = r.opacity, l.size.value = r.size, l.scale.value = D.height / 2, l.map.value = r.map) : r instanceof THREE.MeshPhongMaterial ? (l.shininess.value = r.shininess, $.gammaInput ? (l.ambient.value.copyGammaToLinear(r.ambient), l.emissive.value.copyGammaToLinear(r.emissive), l.specular.value.copyGammaToLinear(r.specular)) : (l.ambient.value = r.ambient, l.emissive.value = r.emissive, l.specular.value = r.specular), r.wrapAround && l.wrapRGB.value.copy(r.wrapRGB)) : r instanceof THREE.MeshLambertMaterial ? ($.gammaInput ? (l.ambient.value.copyGammaToLinear(r.ambient), l.emissive.value.copyGammaToLinear(r.emissive)) : (l.ambient.value = r.ambient, l.emissive.value = r.emissive), r.wrapAround && l.wrapRGB.value.copy(r.wrapRGB)) : r instanceof THREE.MeshDepthMaterial ? (l.mNear.value = e.near, l.mFar.value = e.far, l.opacity.value = r.opacity) : r instanceof THREE.MeshNormalMaterial && (l.opacity.value = r.opacity), n.receiveShadow && !r._shadowPass && l.shadowMatrix) for (i = Y = 0, o = t.length; o > i; i++) h = t[i], h.castShadow && (h instanceof THREE.SpotLight || h instanceof THREE.DirectionalLight && !h.shadowCascade) && (l.shadowMap.value[Y] = h.shadowMap, l.shadowMapSize.value[Y] = h.shadowMapSize, l.shadowMatrix.value[Y] = h.shadowMatrix, l.shadowDarkness.value[Y] = h.shadowDarkness, l.shadowBias.value[Y] = h.shadowBias, Y++);
      for (t = r.uniformsList, l = 0, Y = t.length; Y > l; l++) if (o = a.uniforms[t[l][1]]) if (i = t[l][0], f = i.type, h = i.value, "i" === f) W.uniform1i(o, h); else if ("f" === f) W.uniform1f(o, h); else if ("v2" === f) W.uniform2f(o, h.x, h.y); else if ("v3" === f) W.uniform3f(o, h.x, h.y, h.z); else if ("v4" === f) W.uniform4f(o, h.x, h.y, h.z, h.w); else if ("c" === f) W.uniform3f(o, h.r, h.g, h.b); else if ("iv1" === f) W.uniform1iv(o, h); else if ("iv" === f) W.uniform3iv(o, h); else if ("fv1" === f) W.uniform1fv(o, h); else if ("fv" === f) W.uniform3fv(o, h); else if ("v2v" === f) {
        for (void 0 === i._array && (i._array = new Float32Array(2 * h.length)), f = 0, m = h.length; m > f; f++) E = 2 * f, i._array[E] = h[f].x, i._array[E + 1] = h[f].y;
        W.uniform2fv(o, i._array)
      } else if ("v3v" === f) {
        for (void 0 === i._array && (i._array = new Float32Array(3 * h.length)), f = 0, m = h.length; m > f; f++) E = 3 * f, i._array[E] = h[f].x, i._array[E + 1] = h[f].y, i._array[E + 2] = h[f].z;
        W.uniform3fv(o, i._array)
      } else if ("v4v" === f) {
        for (void 0 === i._array && (i._array = new Float32Array(4 * h.length)), f = 0, m = h.length; m > f; f++) E = 4 * f, i._array[E] = h[f].x, i._array[E + 1] = h[f].y, i._array[E + 2] = h[f].z, i._array[E + 3] = h[f].w;
        W.uniform4fv(o, i._array)
      } else if ("m4" === f) void 0 === i._array && (i._array = new Float32Array(16)), h.flattenToArray(i._array), W.uniformMatrix4fv(o, !1, i._array); else if ("m4v" === f) {
        for (void 0 === i._array && (i._array = new Float32Array(16 * h.length)), f = 0, m = h.length; m > f; f++) h[f].flattenToArrayOffset(i._array, 16 * f);
        W.uniformMatrix4fv(o, !1, i._array)
      } else if ("t" === f) {
        if (E = h, h = b(), W.uniform1i(o, h), E) if (E.image instanceof Array && 6 === E.image.length) {
          if (i = E, o = h, 6 === i.image.length) if (i.needsUpdate) {
            for (i.image.__webglTextureCube || (i.addEventListener("dispose", We), i.image.__webglTextureCube = W.createTexture(), $.info.memory.textures++), W.activeTexture(W.TEXTURE0 + o), W.bindTexture(W.TEXTURE_CUBE_MAP, i.image.__webglTextureCube), W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL, i.flipY), o = i instanceof THREE.CompressedTexture, h = [], f = 0; 6 > f; f++) $.autoScaleCubemaps && !o ? (m = h, E = f, g = i.image[f], y = Pe, g.width <= y && g.height <= y || (T = Math.max(g.width, g.height), v = Math.floor(g.width * y / T), y = Math.floor(g.height * y / T), T = document.createElement("canvas"), T.width = v, T.height = y, T.getContext("2d").drawImage(g, 0, 0, g.width, g.height, 0, 0, v, y), g = T), m[E] = g) : h[f] = i.image[f];
            for (f = h[0], m = THREE.Math.isPowerOfTwo(f.width) && THREE.Math.isPowerOfTwo(f.height), E = L(i.format), g = L(i.type), M(W.TEXTURE_CUBE_MAP, i, m), f = 0; 6 > f; f++) if (o) for (y = h[f].mipmaps, T = 0, x = y.length; x > T; T++) v = y[T], i.format !== THREE.RGBAFormat ? W.compressedTexImage2D(W.TEXTURE_CUBE_MAP_POSITIVE_X + f, T, E, v.width, v.height, 0, v.data) : W.texImage2D(W.TEXTURE_CUBE_MAP_POSITIVE_X + f, T, E, v.width, v.height, 0, E, g, v.data); else W.texImage2D(W.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, E, E, g, h[f]);
            i.generateMipmaps && m && W.generateMipmap(W.TEXTURE_CUBE_MAP), i.needsUpdate = !1, i.onUpdate && i.onUpdate()
          } else W.activeTexture(W.TEXTURE0 + o), W.bindTexture(W.TEXTURE_CUBE_MAP, i.image.__webglTextureCube)
        } else E instanceof THREE.WebGLRenderTargetCube ? (i = E, W.activeTexture(W.TEXTURE0 + h), W.bindTexture(W.TEXTURE_CUBE_MAP, i.__webglTexture)) : $.setTexture(E, h)
      } else if ("tv" === f) {
        for (void 0 === i._array && (i._array = []), f = 0, m = i.value.length; m > f; f++) i._array[f] = b();
        for (W.uniform1iv(o, i._array), f = 0, m = i.value.length; m > f; f++) E = i.value[f], h = i._array[f], E && $.setTexture(E, h)
      } else console.warn("THREE.WebGLRenderer: Unknown uniform type: " + f);
      (r instanceof THREE.ShaderMaterial || r instanceof THREE.MeshPhongMaterial || r.envMap) && null !== s.cameraPosition && (Se.setFromMatrixPosition(e.matrixWorld), W.uniform3f(s.cameraPosition, Se.x, Se.y, Se.z)), (r instanceof THREE.MeshPhongMaterial || r instanceof THREE.MeshLambertMaterial || r instanceof THREE.ShaderMaterial || r.skinning) && null !== s.viewMatrix && W.uniformMatrix4fv(s.viewMatrix, !1, e.matrixWorldInverse.elements)
    }
    return W.uniformMatrix4fv(s.modelViewMatrix, !1, n._modelViewMatrix.elements), s.normalMatrix && W.uniformMatrix3fv(s.normalMatrix, !1, n._normalMatrix.elements), null !== s.modelMatrix && W.uniformMatrix4fv(s.modelMatrix, !1, n.matrixWorld.elements), a
  }

  function b() {
    var e = re;
    return e >= Le && console.warn("WebGLRenderer: trying to use " + e + " texture units while this GPU supports only " + Le), re += 1, e
  }

  function H(e, t, i, r) {
    e[t] = i.r * i.r * r, e[t + 1] = i.g * i.g * r, e[t + 2] = i.b * i.b * r
  }

  function w(e, t, i, r) {
    e[t] = i.r * r, e[t + 1] = i.g * r, e[t + 2] = i.b * r
  }

  function _(e) {
    e !== me && (W.lineWidth(e), me = e)
  }

  function S(e, t, i) {
    pe !== e && (e ? W.enable(W.POLYGON_OFFSET_FILL) : W.disable(W.POLYGON_OFFSET_FILL), pe = e), !e || de === t && fe === i || (W.polygonOffset(t, i), de = t, fe = i)
  }

  function M(e, t, i) {
    i ? (W.texParameteri(e, W.TEXTURE_WRAP_S, L(t.wrapS)), W.texParameteri(e, W.TEXTURE_WRAP_T, L(t.wrapT)), W.texParameteri(e, W.TEXTURE_MAG_FILTER, L(t.magFilter)), W.texParameteri(e, W.TEXTURE_MIN_FILTER, L(t.minFilter))) : (W.texParameteri(e, W.TEXTURE_WRAP_S, W.CLAMP_TO_EDGE), W.texParameteri(e, W.TEXTURE_WRAP_T, W.CLAMP_TO_EDGE), W.texParameteri(e, W.TEXTURE_MAG_FILTER, A(t.magFilter)), W.texParameteri(e, W.TEXTURE_MIN_FILTER, A(t.minFilter))), q && t.type !== THREE.FloatType && (1 < t.anisotropy || t.__oldAnisotropy) && (W.texParameterf(e, q.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, Fe)), t.__oldAnisotropy = t.anisotropy)
  }

  function C(e, t) {
    W.bindRenderbuffer(W.RENDERBUFFER, e), t.depthBuffer && !t.stencilBuffer ? (W.renderbufferStorage(W.RENDERBUFFER, W.DEPTH_COMPONENT16, t.width, t.height), W.framebufferRenderbuffer(W.FRAMEBUFFER, W.DEPTH_ATTACHMENT, W.RENDERBUFFER, e)) : t.depthBuffer && t.stencilBuffer ? (W.renderbufferStorage(W.RENDERBUFFER, W.DEPTH_STENCIL, t.width, t.height), W.framebufferRenderbuffer(W.FRAMEBUFFER, W.DEPTH_STENCIL_ATTACHMENT, W.RENDERBUFFER, e)) : W.renderbufferStorage(W.RENDERBUFFER, W.RGBA4, t.width, t.height)
  }

  function A(e) {
    return e === THREE.NearestFilter || e === THREE.NearestMipMapNearestFilter || e === THREE.NearestMipMapLinearFilter ? W.NEAREST : W.LINEAR
  }

  function L(e) {
    if (e === THREE.RepeatWrapping) return W.REPEAT;
    if (e === THREE.ClampToEdgeWrapping) return W.CLAMP_TO_EDGE;
    if (e === THREE.MirroredRepeatWrapping) return W.MIRRORED_REPEAT;
    if (e === THREE.NearestFilter) return W.NEAREST;
    if (e === THREE.NearestMipMapNearestFilter) return W.NEAREST_MIPMAP_NEAREST;
    if (e === THREE.NearestMipMapLinearFilter) return W.NEAREST_MIPMAP_LINEAR;
    if (e === THREE.LinearFilter) return W.LINEAR;
    if (e === THREE.LinearMipMapNearestFilter) return W.LINEAR_MIPMAP_NEAREST;
    if (e === THREE.LinearMipMapLinearFilter) return W.LINEAR_MIPMAP_LINEAR;
    if (e === THREE.UnsignedByteType) return W.UNSIGNED_BYTE;
    if (e === THREE.UnsignedShort4444Type) return W.UNSIGNED_SHORT_4_4_4_4;
    if (e === THREE.UnsignedShort5551Type) return W.UNSIGNED_SHORT_5_5_5_1;
    if (e === THREE.UnsignedShort565Type) return W.UNSIGNED_SHORT_5_6_5;
    if (e === THREE.ByteType) return W.BYTE;
    if (e === THREE.ShortType) return W.SHORT;
    if (e === THREE.UnsignedShortType) return W.UNSIGNED_SHORT;
    if (e === THREE.IntType) return W.INT;
    if (e === THREE.UnsignedIntType) return W.UNSIGNED_INT;
    if (e === THREE.FloatType) return W.FLOAT;
    if (e === THREE.AlphaFormat) return W.ALPHA;
    if (e === THREE.RGBFormat) return W.RGB;
    if (e === THREE.RGBAFormat) return W.RGBA;
    if (e === THREE.LuminanceFormat) return W.LUMINANCE;
    if (e === THREE.LuminanceAlphaFormat) return W.LUMINANCE_ALPHA;
    if (e === THREE.AddEquation) return W.FUNC_ADD;
    if (e === THREE.SubtractEquation) return W.FUNC_SUBTRACT;
    if (e === THREE.ReverseSubtractEquation) return W.FUNC_REVERSE_SUBTRACT;
    if (e === THREE.ZeroFactor) return W.ZERO;
    if (e === THREE.OneFactor) return W.ONE;
    if (e === THREE.SrcColorFactor) return W.SRC_COLOR;
    if (e === THREE.OneMinusSrcColorFactor) return W.ONE_MINUS_SRC_COLOR;
    if (e === THREE.SrcAlphaFactor) return W.SRC_ALPHA;
    if (e === THREE.OneMinusSrcAlphaFactor) return W.ONE_MINUS_SRC_ALPHA;
    if (e === THREE.DstAlphaFactor) return W.DST_ALPHA;
    if (e === THREE.OneMinusDstAlphaFactor) return W.ONE_MINUS_DST_ALPHA;
    if (e === THREE.DstColorFactor) return W.DST_COLOR;
    if (e === THREE.OneMinusDstColorFactor) return W.ONE_MINUS_DST_COLOR;
    if (e === THREE.SrcAlphaSaturateFactor) return W.SRC_ALPHA_SATURATE;
    if (void 0 !== Y) {
      if (e === THREE.RGB_S3TC_DXT1_Format) return Y.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (e === THREE.RGBA_S3TC_DXT1_Format) return Y.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (e === THREE.RGBA_S3TC_DXT3_Format) return Y.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (e === THREE.RGBA_S3TC_DXT5_Format) return Y.COMPRESSED_RGBA_S3TC_DXT5_EXT
    }
    return 0
  }

  console.log("THREE.WebGLRenderer", THREE.REVISION), e = e || {};
  var D = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
    P = void 0 !== e.context ? e.context : null, F = void 0 !== e.precision ? e.precision : "highp",
    k = void 0 !== e.alpha ? e.alpha : !1, N = void 0 !== e.depth ? e.depth : !0,
    U = void 0 !== e.stencil ? e.stencil : !0, z = void 0 !== e.antialias ? e.antialias : !1,
    O = void 0 !== e.premultipliedAlpha ? e.premultipliedAlpha : !0,
    B = void 0 !== e.preserveDrawingBuffer ? e.preserveDrawingBuffer : !1,
    V = void 0 !== e.logarithmicDepthBuffer ? e.logarithmicDepthBuffer : !1, I = new THREE.Color(0), j = 0;
  this.domElement = D, this.context = null, this.devicePixelRatio = void 0 !== e.devicePixelRatio ? e.devicePixelRatio : void 0 !== self.devicePixelRatio ? self.devicePixelRatio : 1, this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0, this.shadowMapEnabled = this.gammaOutput = this.gammaInput = !1, this.shadowMapAutoUpdate = !0, this.shadowMapType = THREE.PCFShadowMap, this.shadowMapCullFace = THREE.CullFaceFront, this.shadowMapCascade = this.shadowMapDebug = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.renderPluginsPre = [], this.renderPluginsPost = [], this.info = {
    memory: {
      programs: 0,
      geometries: 0,
      textures: 0
    }, render: {calls: 0, vertices: 0, faces: 0, points: 0}
  };
  var W, G, X, q, Y, K, $ = this, Q = [], Z = null, J = null, ee = -1, te = null, ie = null, re = 0, ne = -1, oe = -1,
    ae = -1, se = -1, le = -1, he = -1, ce = -1, ue = -1, pe = null, de = null, fe = null, me = null, Ee = 0, ge = 0,
    ve = D.width, ye = D.height, Te = 0, xe = 0, Re = new Uint8Array(16), be = new Uint8Array(16),
    He = new THREE.Frustum, we = new THREE.Matrix4, _e = new THREE.Matrix4, Se = new THREE.Vector3,
    Me = new THREE.Vector3, Ce = !0, Ae = {
      ambient: [0, 0, 0],
      directional: {length: 0, colors: [], positions: []},
      point: {length: 0, colors: [], positions: [], distances: []},
      spot: {length: 0, colors: [], positions: [], distances: [], directions: [], anglesCos: [], exponents: []},
      hemi: {length: 0, skyColors: [], groundColors: [], positions: []}
    };
  !function () {
    try {
      var e = {alpha: k, depth: N, stencil: U, antialias: z, premultipliedAlpha: O, preserveDrawingBuffer: B};
      if (W = P || D.getContext("webgl", e) || D.getContext("experimental-webgl", e), null === W) throw"Error creating WebGL context."
    } catch (t) {
      console.error(t)
    }
    G = W.getExtension("OES_texture_float"), W.getExtension("OES_texture_float_linear"), X = W.getExtension("OES_standard_derivatives"), q = W.getExtension("EXT_texture_filter_anisotropic") || W.getExtension("MOZ_EXT_texture_filter_anisotropic") || W.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), Y = W.getExtension("WEBGL_compressed_texture_s3tc") || W.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || W.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"), K = W.getExtension("OES_element_index_uint"), null === G && console.log("THREE.WebGLRenderer: Float textures not supported."), null === X && console.log("THREE.WebGLRenderer: Standard derivatives not supported."), null === q && console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported."), null === Y && console.log("THREE.WebGLRenderer: S3TC compressed textures not supported."), null === K && console.log("THREE.WebGLRenderer: elementindex as unsigned integer not supported."), void 0 === W.getShaderPrecisionFormat && (W.getShaderPrecisionFormat = function () {
      return {rangeMin: 1, rangeMax: 1, precision: 1}
    }), V && W.getExtension("EXT_frag_depth")
  }(), W.clearColor(0, 0, 0, 1), W.clearDepth(1), W.clearStencil(0), W.enable(W.DEPTH_TEST), W.depthFunc(W.LEQUAL), W.frontFace(W.CCW), W.cullFace(W.BACK), W.enable(W.CULL_FACE), W.enable(W.BLEND), W.blendEquation(W.FUNC_ADD), W.blendFunc(W.SRC_ALPHA, W.ONE_MINUS_SRC_ALPHA), W.viewport(Ee, ge, ve, ye), W.clearColor(I.r, I.g, I.b, j), this.context = W;
  var Le = W.getParameter(W.MAX_TEXTURE_IMAGE_UNITS), De = W.getParameter(W.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  W.getParameter(W.MAX_TEXTURE_SIZE);
  var Pe = W.getParameter(W.MAX_CUBE_MAP_TEXTURE_SIZE), Fe = q ? W.getParameter(q.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
    ke = De > 0, Ne = ke && G;
  Y && W.getParameter(W.COMPRESSED_TEXTURE_FORMATS);
  var Ue = W.getShaderPrecisionFormat(W.VERTEX_SHADER, W.HIGH_FLOAT),
    ze = W.getShaderPrecisionFormat(W.VERTEX_SHADER, W.MEDIUM_FLOAT);
  W.getShaderPrecisionFormat(W.VERTEX_SHADER, W.LOW_FLOAT);
  var Oe = W.getShaderPrecisionFormat(W.FRAGMENT_SHADER, W.HIGH_FLOAT),
    Be = W.getShaderPrecisionFormat(W.FRAGMENT_SHADER, W.MEDIUM_FLOAT);
  W.getShaderPrecisionFormat(W.FRAGMENT_SHADER, W.LOW_FLOAT), W.getShaderPrecisionFormat(W.VERTEX_SHADER, W.HIGH_INT), W.getShaderPrecisionFormat(W.VERTEX_SHADER, W.MEDIUM_INT), W.getShaderPrecisionFormat(W.VERTEX_SHADER, W.LOW_INT), W.getShaderPrecisionFormat(W.FRAGMENT_SHADER, W.HIGH_INT), W.getShaderPrecisionFormat(W.FRAGMENT_SHADER, W.MEDIUM_INT), W.getShaderPrecisionFormat(W.FRAGMENT_SHADER, W.LOW_INT);
  var Ve = 0 < Ue.precision && 0 < Oe.precision, Ie = 0 < ze.precision && 0 < Be.precision;
  "highp" !== F || Ve || (Ie ? (F = "mediump", console.warn("WebGLRenderer: highp not supported, using mediump")) : (F = "lowp", console.warn("WebGLRenderer: highp and mediump not supported, using lowp"))), "mediump" !== F || Ie || (F = "lowp", console.warn("WebGLRenderer: mediump not supported, using lowp")), this.getContext = function () {
    return W
  }, this.supportsVertexTextures = function () {
    return ke
  }, this.supportsFloatTextures = function () {
    return G
  }, this.supportsStandardDerivatives = function () {
    return X
  }, this.supportsCompressedTextureS3TC = function () {
    return Y
  }, this.getMaxAnisotropy = function () {
    return Fe
  }, this.getPrecision = function () {
    return F
  }, this.setSize = function (e, t, i) {
    D.width = e * this.devicePixelRatio, D.height = t * this.devicePixelRatio, 1 !== this.devicePixelRatio && !1 !== i && (D.style.width = e + "px", D.style.height = t + "px"), this.setViewport(0, 0, e, t)
  }, this.setViewport = function (e, t, i, r) {
    Ee = e * this.devicePixelRatio, ge = t * this.devicePixelRatio, ve = i * this.devicePixelRatio, ye = r * this.devicePixelRatio,
      W.viewport(Ee, ge, ve, ye)
  }, this.setScissor = function (e, t, i, r) {
    W.scissor(e * this.devicePixelRatio, t * this.devicePixelRatio, i * this.devicePixelRatio, r * this.devicePixelRatio)
  }, this.enableScissorTest = function (e) {
    e ? W.enable(W.SCISSOR_TEST) : W.disable(W.SCISSOR_TEST)
  }, this.setClearColor = function (e, t) {
    I.set(e), j = void 0 !== t ? t : 1, W.clearColor(I.r, I.g, I.b, j)
  }, this.setClearColorHex = function (e, t) {
    console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."), this.setClearColor(e, t)
  }, this.getClearColor = function () {
    return I
  }, this.getClearAlpha = function () {
    return j
  }, this.clear = function (e, t, i) {
    var r = 0;
    (void 0 === e || e) && (r |= W.COLOR_BUFFER_BIT), (void 0 === t || t) && (r |= W.DEPTH_BUFFER_BIT), (void 0 === i || i) && (r |= W.STENCIL_BUFFER_BIT), W.clear(r)
  }, this.clearColor = function () {
    W.clear(W.COLOR_BUFFER_BIT)
  }, this.clearDepth = function () {
    W.clear(W.DEPTH_BUFFER_BIT)
  }, this.clearStencil = function () {
    W.clear(W.STENCIL_BUFFER_BIT)
  }, this.clearTarget = function (e, t, i, r) {
    this.setRenderTarget(e), this.clear(t, i, r)
  }, this.addPostPlugin = function (e) {
    e.init(this), this.renderPluginsPost.push(e)
  }, this.addPrePlugin = function (e) {
    e.init(this), this.renderPluginsPre.push(e)
  }, this.updateShadowMap = function (e, t) {
    Z = null, ee = te = ue = ce = ae = -1, Ce = !0, oe = ne = -1, this.shadowMapPlugin.update(e, t)
  };
  var je = function (e) {
    if (e = e.target, e.removeEventListener("dispose", je), e.__webglInit = void 0, e instanceof THREE.BufferGeometry) {
      var t, i = e.attributes;
      for (t in i) void 0 !== i[t].buffer && W.deleteBuffer(i[t].buffer);
      $.info.memory.geometries--
    } else if (void 0 !== e.geometryGroups) for (i in e.geometryGroups) {
      if (t = e.geometryGroups[i], void 0 !== t.numMorphTargets) for (var r = 0, n = t.numMorphTargets; n > r; r++) W.deleteBuffer(t.__webglMorphTargetsBuffers[r]);
      if (void 0 !== t.numMorphNormals) for (r = 0, n = t.numMorphNormals; n > r; r++) W.deleteBuffer(t.__webglMorphNormalsBuffers[r]);
      qe(t)
    } else qe(e)
  }, We = function (e) {
    e = e.target, e.removeEventListener("dispose", We), e.image && e.image.__webglTextureCube ? W.deleteTexture(e.image.__webglTextureCube) : e.__webglInit && (e.__webglInit = !1, W.deleteTexture(e.__webglTexture)), $.info.memory.textures--
  }, Ge = function (e) {
    if (e = e.target, e.removeEventListener("dispose", Ge), e && e.__webglTexture) if (W.deleteTexture(e.__webglTexture), e instanceof THREE.WebGLRenderTargetCube) for (var t = 0; 6 > t; t++) W.deleteFramebuffer(e.__webglFramebuffer[t]), W.deleteRenderbuffer(e.__webglRenderbuffer[t]); else W.deleteFramebuffer(e.__webglFramebuffer), W.deleteRenderbuffer(e.__webglRenderbuffer);
    $.info.memory.textures--
  }, Xe = function (e) {
    e = e.target, e.removeEventListener("dispose", Xe), Ye(e)
  }, qe = function (e) {
    if (void 0 !== e.__webglVertexBuffer && W.deleteBuffer(e.__webglVertexBuffer), void 0 !== e.__webglNormalBuffer && W.deleteBuffer(e.__webglNormalBuffer), void 0 !== e.__webglTangentBuffer && W.deleteBuffer(e.__webglTangentBuffer), void 0 !== e.__webglColorBuffer && W.deleteBuffer(e.__webglColorBuffer), void 0 !== e.__webglUVBuffer && W.deleteBuffer(e.__webglUVBuffer), void 0 !== e.__webglUV2Buffer && W.deleteBuffer(e.__webglUV2Buffer), void 0 !== e.__webglSkinIndicesBuffer && W.deleteBuffer(e.__webglSkinIndicesBuffer), void 0 !== e.__webglSkinWeightsBuffer && W.deleteBuffer(e.__webglSkinWeightsBuffer), void 0 !== e.__webglFaceBuffer && W.deleteBuffer(e.__webglFaceBuffer), void 0 !== e.__webglLineBuffer && W.deleteBuffer(e.__webglLineBuffer), void 0 !== e.__webglLineDistanceBuffer && W.deleteBuffer(e.__webglLineDistanceBuffer), void 0 !== e.__webglCustomAttributesList) for (var t in e.__webglCustomAttributesList) W.deleteBuffer(e.__webglCustomAttributesList[t].buffer);
    $.info.memory.geometries--
  }, Ye = function (e) {
    var t = e.program;
    if (void 0 !== t) {
      e.program = void 0;
      var i, r, n = !1;
      for (e = 0, i = Q.length; i > e; e++) if (r = Q[e], r.program === t) {
        r.usedTimes--, 0 === r.usedTimes && (n = !0);
        break
      }
      if (!0 === n) {
        for (n = [], e = 0, i = Q.length; i > e; e++) r = Q[e], r.program !== t && n.push(r);
        Q = n, W.deleteProgram(t), $.info.memory.programs--
      }
    }
  };
  this.renderBufferImmediate = function (e, t, i) {
    if (s(), e.hasPositions && !e.__webglVertexBuffer && (e.__webglVertexBuffer = W.createBuffer()), e.hasNormals && !e.__webglNormalBuffer && (e.__webglNormalBuffer = W.createBuffer()), e.hasUvs && !e.__webglUvBuffer && (e.__webglUvBuffer = W.createBuffer()), e.hasColors && !e.__webglColorBuffer && (e.__webglColorBuffer = W.createBuffer()), e.hasPositions && (W.bindBuffer(W.ARRAY_BUFFER, e.__webglVertexBuffer), W.bufferData(W.ARRAY_BUFFER, e.positionArray, W.DYNAMIC_DRAW), l(t.attributes.position), W.vertexAttribPointer(t.attributes.position, 3, W.FLOAT, !1, 0, 0)), e.hasNormals) {
      if (W.bindBuffer(W.ARRAY_BUFFER, e.__webglNormalBuffer), i.shading === THREE.FlatShading) {
        var r, n, o, a, c, u, p, d, f, m, E, g = 3 * e.count;
        for (E = 0; g > E; E += 9) m = e.normalArray, r = m[E], n = m[E + 1], o = m[E + 2], a = m[E + 3], u = m[E + 4], d = m[E + 5], c = m[E + 6], p = m[E + 7], f = m[E + 8], r = (r + a + c) / 3, n = (n + u + p) / 3, o = (o + d + f) / 3, m[E] = r, m[E + 1] = n, m[E + 2] = o, m[E + 3] = r, m[E + 4] = n, m[E + 5] = o, m[E + 6] = r, m[E + 7] = n, m[E + 8] = o
      }
      W.bufferData(W.ARRAY_BUFFER, e.normalArray, W.DYNAMIC_DRAW), l(t.attributes.normal), W.vertexAttribPointer(t.attributes.normal, 3, W.FLOAT, !1, 0, 0)
    }
    e.hasUvs && i.map && (W.bindBuffer(W.ARRAY_BUFFER, e.__webglUvBuffer), W.bufferData(W.ARRAY_BUFFER, e.uvArray, W.DYNAMIC_DRAW), l(t.attributes.uv), W.vertexAttribPointer(t.attributes.uv, 2, W.FLOAT, !1, 0, 0)), e.hasColors && i.vertexColors !== THREE.NoColors && (W.bindBuffer(W.ARRAY_BUFFER, e.__webglColorBuffer), W.bufferData(W.ARRAY_BUFFER, e.colorArray, W.DYNAMIC_DRAW), l(t.attributes.color), W.vertexAttribPointer(t.attributes.color, 3, W.FLOAT, !1, 0, 0)), h(), W.drawArrays(W.TRIANGLES, 0, e.count), e.count = 0
  }, this.renderBufferDirect = function (e, t, i, r, n, o) {
    if (!1 !== r.visible) {
      var l = R(e, t, i, r, o);
      if (e = l.attributes, t = n.attributes, i = !1, l = 16777215 * n.id + 2 * l.id + (r.wireframe ? 1 : 0), l !== te && (te = l, i = !0), i && s(), o instanceof THREE.Mesh) if (o = t.index) {
        var h;
        if (o.array instanceof Uint32Array ? (l = W.UNSIGNED_INT, h = 4) : (l = W.UNSIGNED_SHORT, h = 2), n = n.offsets, 0 === n.length) i && (a(r, e, t, 0), W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, o.buffer)), W.drawElements(W.TRIANGLES, o.array.length, l, 0), $.info.render.calls++, $.info.render.vertices += o.array.length, $.info.render.faces += o.array.length / 3; else {
          i = !0;
          for (var c = 0, u = n.length; u > c; c++) {
            var p = n[c].index;
            i && (a(r, e, t, p), W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, o.buffer)), W.drawElements(W.TRIANGLES, n[c].count, l, n[c].start * h), $.info.render.calls++, $.info.render.vertices += n[c].count, $.info.render.faces += n[c].count / 3
          }
        }
      } else i && a(r, e, t, 0), r = n.attributes.position, W.drawArrays(W.TRIANGLES, 0, r.array.length / 3), $.info.render.calls++, $.info.render.vertices += r.array.length / 3, $.info.render.faces += r.array.length / 9; else if (o instanceof THREE.ParticleSystem) i && a(r, e, t, 0), r = t.position, W.drawArrays(W.POINTS, 0, r.array.length / 3), $.info.render.calls++, $.info.render.points += r.array.length / 3; else if (o instanceof THREE.Line) if (l = o.type === THREE.LineStrip ? W.LINE_STRIP : W.LINES, _(r.linewidth), o = t.index) if (o.array instanceof Uint32Array ? (l = W.UNSIGNED_INT, h = 4) : (l = W.UNSIGNED_SHORT, h = 2), n = n.offsets, 0 === n.length) i && (a(r, e, t, 0), W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, o.buffer)), W.drawElements(W.LINES, o.array.length, l, 0), $.info.render.calls++, $.info.render.vertices += o.array.length; else for (1 < n.length && (i = !0), c = 0, u = n.length; u > c; c++) p = n[c].index, i && (a(r, e, t, p), W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, o.buffer)), W.drawElements(W.LINES, n[c].count, l, n[c].start * h), $.info.render.calls++, $.info.render.vertices += n[c].count; else i && a(r, e, t, 0), r = t.position, W.drawArrays(l, 0, r.array.length / 3), $.info.render.calls++, $.info.render.points += r.array.length / 3
    }
  }, this.renderBuffer = function (e, t, i, r, n, o) {
    if (!1 !== r.visible) {
      var a, c;
      if (i = R(e, t, i, r, o), t = i.attributes, e = !1, i = 16777215 * n.id + 2 * i.id + (r.wireframe ? 1 : 0), i !== te && (te = i, e = !0), e && s(), !r.morphTargets && 0 <= t.position) e && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglVertexBuffer), l(t.position), W.vertexAttribPointer(t.position, 3, W.FLOAT, !1, 0, 0)); else if (o.morphTargetBase) {
        if (i = r.program.attributes, -1 !== o.morphTargetBase && 0 <= i.position ? (W.bindBuffer(W.ARRAY_BUFFER, n.__webglMorphTargetsBuffers[o.morphTargetBase]), l(i.position), W.vertexAttribPointer(i.position, 3, W.FLOAT, !1, 0, 0)) : 0 <= i.position && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglVertexBuffer), l(i.position), W.vertexAttribPointer(i.position, 3, W.FLOAT, !1, 0, 0)), o.morphTargetForcedOrder.length) {
          var p = 0;
          for (c = o.morphTargetForcedOrder, a = o.morphTargetInfluences; p < r.numSupportedMorphTargets && p < c.length;) 0 <= i["morphTarget" + p] && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglMorphTargetsBuffers[c[p]]), l(i["morphTarget" + p]), W.vertexAttribPointer(i["morphTarget" + p], 3, W.FLOAT, !1, 0, 0)), 0 <= i["morphNormal" + p] && r.morphNormals && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglMorphNormalsBuffers[c[p]]), l(i["morphNormal" + p]), W.vertexAttribPointer(i["morphNormal" + p], 3, W.FLOAT, !1, 0, 0)), o.__webglMorphTargetInfluences[p] = a[c[p]], p++
        } else {
          c = [], a = o.morphTargetInfluences;
          var d, f = a.length;
          for (d = 0; f > d; d++) p = a[d], p > 0 && c.push([p, d]);
          for (c.length > r.numSupportedMorphTargets ? (c.sort(u), c.length = r.numSupportedMorphTargets) : c.length > r.numSupportedMorphNormals ? c.sort(u) : 0 === c.length && c.push([0, 0]), p = 0; p < r.numSupportedMorphTargets;) c[p] ? (d = c[p][1], 0 <= i["morphTarget" + p] && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglMorphTargetsBuffers[d]), l(i["morphTarget" + p]), W.vertexAttribPointer(i["morphTarget" + p], 3, W.FLOAT, !1, 0, 0)), 0 <= i["morphNormal" + p] && r.morphNormals && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglMorphNormalsBuffers[d]), l(i["morphNormal" + p]), W.vertexAttribPointer(i["morphNormal" + p], 3, W.FLOAT, !1, 0, 0)), o.__webglMorphTargetInfluences[p] = a[d]) : o.__webglMorphTargetInfluences[p] = 0, p++
        }
        null !== r.program.uniforms.morphTargetInfluences && W.uniform1fv(r.program.uniforms.morphTargetInfluences, o.__webglMorphTargetInfluences)
      }
      if (e) {
        if (n.__webglCustomAttributesList) for (a = 0, c = n.__webglCustomAttributesList.length; c > a; a++) i = n.__webglCustomAttributesList[a], 0 <= t[i.buffer.belongsToAttribute] && (W.bindBuffer(W.ARRAY_BUFFER, i.buffer), l(t[i.buffer.belongsToAttribute]), W.vertexAttribPointer(t[i.buffer.belongsToAttribute], i.size, W.FLOAT, !1, 0, 0));
        0 <= t.color && (0 < o.geometry.colors.length || 0 < o.geometry.faces.length ? (W.bindBuffer(W.ARRAY_BUFFER, n.__webglColorBuffer), l(t.color), W.vertexAttribPointer(t.color, 3, W.FLOAT, !1, 0, 0)) : r.defaultAttributeValues && W.vertexAttrib3fv(t.color, r.defaultAttributeValues.color)), 0 <= t.normal && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglNormalBuffer), l(t.normal), W.vertexAttribPointer(t.normal, 3, W.FLOAT, !1, 0, 0)), 0 <= t.tangent && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglTangentBuffer), l(t.tangent), W.vertexAttribPointer(t.tangent, 4, W.FLOAT, !1, 0, 0)), 0 <= t.uv && (o.geometry.faceVertexUvs[0] ? (W.bindBuffer(W.ARRAY_BUFFER, n.__webglUVBuffer), l(t.uv), W.vertexAttribPointer(t.uv, 2, W.FLOAT, !1, 0, 0)) : r.defaultAttributeValues && W.vertexAttrib2fv(t.uv, r.defaultAttributeValues.uv)), 0 <= t.uv2 && (o.geometry.faceVertexUvs[1] ? (W.bindBuffer(W.ARRAY_BUFFER, n.__webglUV2Buffer), l(t.uv2), W.vertexAttribPointer(t.uv2, 2, W.FLOAT, !1, 0, 0)) : r.defaultAttributeValues && W.vertexAttrib2fv(t.uv2, r.defaultAttributeValues.uv2)), r.skinning && 0 <= t.skinIndex && 0 <= t.skinWeight && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglSkinIndicesBuffer), l(t.skinIndex), W.vertexAttribPointer(t.skinIndex, 4, W.FLOAT, !1, 0, 0), W.bindBuffer(W.ARRAY_BUFFER, n.__webglSkinWeightsBuffer), l(t.skinWeight), W.vertexAttribPointer(t.skinWeight, 4, W.FLOAT, !1, 0, 0)), 0 <= t.lineDistance && (W.bindBuffer(W.ARRAY_BUFFER, n.__webglLineDistanceBuffer), l(t.lineDistance), W.vertexAttribPointer(t.lineDistance, 1, W.FLOAT, !1, 0, 0))
      }
      h(), o instanceof THREE.Mesh ? (o = n.__typeArray === Uint32Array ? W.UNSIGNED_INT : W.UNSIGNED_SHORT, r.wireframe ? (_(r.wireframeLinewidth), e && W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, n.__webglLineBuffer), W.drawElements(W.LINES, n.__webglLineCount, o, 0)) : (e && W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, n.__webglFaceBuffer), W.drawElements(W.TRIANGLES, n.__webglFaceCount, o, 0)), $.info.render.calls++, $.info.render.vertices += n.__webglFaceCount, $.info.render.faces += n.__webglFaceCount / 3) : o instanceof THREE.Line ? (o = o.type === THREE.LineStrip ? W.LINE_STRIP : W.LINES, _(r.linewidth), W.drawArrays(o, 0, n.__webglLineCount), $.info.render.calls++) : o instanceof THREE.ParticleSystem && (W.drawArrays(W.POINTS, 0, n.__webglParticleCount), $.info.render.calls++, $.info.render.points += n.__webglParticleCount)
    }
  }, this.render = function (e, t, i, r) {
    if (!1 == t instanceof THREE.Camera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."); else {
      var n, o, a, s, l = e.__lights, h = e.fog;
      for (ee = -1, Ce = !0, !0 === e.autoUpdate && e.updateMatrixWorld(), void 0 === t.parent && t.updateMatrixWorld(), t.matrixWorldInverse.getInverse(t.matrixWorld), we.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), He.setFromMatrix(we), this.autoUpdateObjects && this.initWebGLObjects(e), p(this.renderPluginsPre, e, t), $.info.render.calls = 0, $.info.render.vertices = 0, $.info.render.faces = 0, $.info.render.points = 0, this.setRenderTarget(i), (this.autoClear || r) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), s = e.__webglObjects, r = 0, n = s.length; n > r; r++) if (o = s[r], a = o.object, o.id = r, o.render = !1, a.visible && (!(a instanceof THREE.Mesh || a instanceof THREE.ParticleSystem) || !a.frustumCulled || He.intersectsObject(a))) {
        var u = a;
        u._modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, u.matrixWorld), u._normalMatrix.getNormalMatrix(u._modelViewMatrix);
        var u = o, m = u.object, E = u.buffer, g = m.geometry, m = m.material;
        m instanceof THREE.MeshFaceMaterial ? (m = m.materials[g instanceof THREE.BufferGeometry ? 0 : E.materialIndex], m.transparent ? (u.transparent = m, u.opaque = null) : (u.opaque = m, u.transparent = null)) : m && (m.transparent ? (u.transparent = m, u.opaque = null) : (u.opaque = m, u.transparent = null)), o.render = !0, !0 === this.sortObjects && (null !== a.renderDepth ? o.z = a.renderDepth : (Se.setFromMatrixPosition(a.matrixWorld), Se.applyProjection(we), o.z = Se.z))
      }
      for (this.sortObjects && s.sort(c), s = e.__webglObjectsImmediate, r = 0, n = s.length; n > r; r++) o = s[r], a = o.object, a.visible && (a._modelViewMatrix.multiplyMatrices(t.matrixWorldInverse, a.matrixWorld), a._normalMatrix.getNormalMatrix(a._modelViewMatrix), a = o.object.material, a.transparent ? (o.transparent = a, o.opaque = null) : (o.opaque = a, o.transparent = null));
      e.overrideMaterial ? (r = e.overrideMaterial, this.setBlending(r.blending, r.blendEquation, r.blendSrc, r.blendDst), this.setDepthTest(r.depthTest), this.setDepthWrite(r.depthWrite), S(r.polygonOffset, r.polygonOffsetFactor, r.polygonOffsetUnits), d(e.__webglObjects, !1, "", t, l, h, !0, r), f(e.__webglObjectsImmediate, "", t, l, h, !1, r)) : (r = null, this.setBlending(THREE.NoBlending), d(e.__webglObjects, !0, "opaque", t, l, h, !1, r), f(e.__webglObjectsImmediate, "opaque", t, l, h, !1, r), d(e.__webglObjects, !1, "transparent", t, l, h, !0, r), f(e.__webglObjectsImmediate, "transparent", t, l, h, !0, r)), p(this.renderPluginsPost, e, t), i && i.generateMipmaps && i.minFilter !== THREE.NearestFilter && i.minFilter !== THREE.LinearFilter && (i instanceof THREE.WebGLRenderTargetCube ? (W.bindTexture(W.TEXTURE_CUBE_MAP, i.__webglTexture), W.generateMipmap(W.TEXTURE_CUBE_MAP), W.bindTexture(W.TEXTURE_CUBE_MAP, null)) : (W.bindTexture(W.TEXTURE_2D, i.__webglTexture), W.generateMipmap(W.TEXTURE_2D), W.bindTexture(W.TEXTURE_2D, null))), this.setDepthTest(!0), this.setDepthWrite(!0)
    }
  }, this.renderImmediateObject = function (e, t, i, r, n) {
    var o = R(e, t, i, r, n);
    te = -1, $.setMaterialFaces(r), n.immediateRenderCallback ? n.immediateRenderCallback(o, W, He) : n.render(function (e) {
      $.renderBufferImmediate(e, o, r)
    })
  }, this.initWebGLObjects = function (e) {
    for (e.__webglObjects || (e.__webglObjects = [], e.__webglObjectsImmediate = [], e.__webglSprites = [], e.__webglFlares = []); e.__objectsAdded.length;) m(e.__objectsAdded[0], e), e.__objectsAdded.splice(0, 1);
    for (; e.__objectsRemoved.length;) y(e.__objectsRemoved[0], e), e.__objectsRemoved.splice(0, 1);
    for (var t = 0, a = e.__webglObjects.length; a > t; t++) {
      var s = e.__webglObjects[t].object;
      void 0 === s.__webglInit && (void 0 !== s.__webglActive && y(s, e), m(s, e));
      var l = s, h = l.geometry, c = void 0, p = void 0, d = void 0;
      if (h instanceof THREE.BufferGeometry) {
        var f = W.DYNAMIC_DRAW, E = h.attributes, T = void 0, x = void 0;
        for (T in E) x = E[T], x.needsUpdate && ("index" === T ? (W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, x.buffer), W.bufferData(W.ELEMENT_ARRAY_BUFFER, x.array, f)) : (W.bindBuffer(W.ARRAY_BUFFER, x.buffer), W.bufferData(W.ARRAY_BUFFER, x.array, f)), x.needsUpdate = !1)
      } else if (l instanceof THREE.Mesh) {
        for (var R = 0, b = h.geometryGroupsList.length; b > R; R++) if (c = h.geometryGroupsList[R], d = r(l, c), h.buffersNeedUpdate && i(c, l), p = d.attributes && g(d), h.verticesNeedUpdate || h.morphTargetsNeedUpdate || h.elementsNeedUpdate || h.uvsNeedUpdate || h.normalsNeedUpdate || h.colorsNeedUpdate || h.tangentsNeedUpdate || p) {
          var H = c, w = l, _ = W.DYNAMIC_DRAW, S = !h.dynamic, M = d;
          if (H.__inittedArrays) {
            var C = n(M), A = M.vertexColors ? M.vertexColors : !1, L = o(M), D = C === THREE.SmoothShading, P = void 0,
              F = void 0, k = void 0, N = void 0, U = void 0, z = void 0, O = void 0, B = void 0, V = void 0,
              I = void 0, j = void 0, G = void 0, X = void 0, q = void 0, Y = void 0, K = void 0, $ = void 0,
              Q = void 0, Z = void 0, J = void 0, ee = void 0, te = void 0, ie = void 0, re = void 0, ne = void 0,
              oe = void 0, ae = void 0, se = void 0, le = void 0, he = void 0, ce = void 0, ue = void 0, pe = void 0,
              de = void 0, fe = void 0, me = void 0, Ee = void 0, ge = void 0, ve = void 0, ye = void 0, Te = 0, xe = 0,
              Re = 0, be = 0, He = 0, Me = 0, Ce = 0, Ae = 0, Le = 0, De = 0, Pe = 0, Fe = 0, ke = void 0,
              Ne = H.__vertexArray, Ue = H.__uvArray, ze = H.__uv2Array, Oe = H.__normalArray, Be = H.__tangentArray,
              Ve = H.__colorArray, Ie = H.__skinIndexArray, je = H.__skinWeightArray, We = H.__morphTargetsArrays,
              Ge = H.__morphNormalsArrays, Xe = H.__webglCustomAttributesList, qe = void 0, Ye = H.__faceArray,
              Ke = H.__lineArray, $e = w.geometry, Qe = $e.elementsNeedUpdate, Ze = $e.uvsNeedUpdate,
              Je = $e.normalsNeedUpdate, et = $e.tangentsNeedUpdate, tt = $e.colorsNeedUpdate,
              it = $e.morphTargetsNeedUpdate, rt = $e.vertices, nt = H.faces3, ot = $e.faces, at = $e.faceVertexUvs[0],
              st = $e.faceVertexUvs[1], lt = $e.skinIndices, ht = $e.skinWeights, ct = $e.morphTargets,
              ut = $e.morphNormals;
            if ($e.verticesNeedUpdate) {
              for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], G = rt[N.a], X = rt[N.b], q = rt[N.c], Ne[xe] = G.x, Ne[xe + 1] = G.y, Ne[xe + 2] = G.z, Ne[xe + 3] = X.x, Ne[xe + 4] = X.y, Ne[xe + 5] = X.z, Ne[xe + 6] = q.x, Ne[xe + 7] = q.y, Ne[xe + 8] = q.z, xe += 9;
              W.bindBuffer(W.ARRAY_BUFFER, H.__webglVertexBuffer), W.bufferData(W.ARRAY_BUFFER, Ne, _)
            }
            if (it) for (fe = 0, me = ct.length; me > fe; fe++) {
              for (P = Pe = 0, F = nt.length; F > P; P++) ve = nt[P], N = ot[ve], G = ct[fe].vertices[N.a], X = ct[fe].vertices[N.b], q = ct[fe].vertices[N.c], Ee = We[fe], Ee[Pe] = G.x, Ee[Pe + 1] = G.y, Ee[Pe + 2] = G.z, Ee[Pe + 3] = X.x, Ee[Pe + 4] = X.y, Ee[Pe + 5] = X.z, Ee[Pe + 6] = q.x, Ee[Pe + 7] = q.y, Ee[Pe + 8] = q.z, M.morphNormals && (D ? (ye = ut[fe].vertexNormals[ve], Q = ye.a, Z = ye.b, J = ye.c) : J = Z = Q = ut[fe].faceNormals[ve], ge = Ge[fe], ge[Pe] = Q.x, ge[Pe + 1] = Q.y, ge[Pe + 2] = Q.z, ge[Pe + 3] = Z.x, ge[Pe + 4] = Z.y, ge[Pe + 5] = Z.z, ge[Pe + 6] = J.x, ge[Pe + 7] = J.y, ge[Pe + 8] = J.z), Pe += 9;
              W.bindBuffer(W.ARRAY_BUFFER, H.__webglMorphTargetsBuffers[fe]), W.bufferData(W.ARRAY_BUFFER, We[fe], _), M.morphNormals && (W.bindBuffer(W.ARRAY_BUFFER, H.__webglMorphNormalsBuffers[fe]), W.bufferData(W.ARRAY_BUFFER, Ge[fe], _))
            }
            if (ht.length) {
              for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], re = ht[N.a], ne = ht[N.b], oe = ht[N.c], je[De] = re.x, je[De + 1] = re.y, je[De + 2] = re.z, je[De + 3] = re.w, je[De + 4] = ne.x, je[De + 5] = ne.y, je[De + 6] = ne.z, je[De + 7] = ne.w, je[De + 8] = oe.x, je[De + 9] = oe.y, je[De + 10] = oe.z, je[De + 11] = oe.w, ae = lt[N.a], se = lt[N.b], le = lt[N.c], Ie[De] = ae.x, Ie[De + 1] = ae.y, Ie[De + 2] = ae.z, Ie[De + 3] = ae.w, Ie[De + 4] = se.x, Ie[De + 5] = se.y, Ie[De + 6] = se.z, Ie[De + 7] = se.w, Ie[De + 8] = le.x, Ie[De + 9] = le.y, Ie[De + 10] = le.z, Ie[De + 11] = le.w, De += 12;
              De > 0 && (W.bindBuffer(W.ARRAY_BUFFER, H.__webglSkinIndicesBuffer), W.bufferData(W.ARRAY_BUFFER, Ie, _), W.bindBuffer(W.ARRAY_BUFFER, H.__webglSkinWeightsBuffer), W.bufferData(W.ARRAY_BUFFER, je, _))
            }
            if (tt && A) {
              for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], O = N.vertexColors, B = N.color, 3 === O.length && A === THREE.VertexColors ? (ee = O[0], te = O[1], ie = O[2]) : ie = te = ee = B, Ve[Le] = ee.r, Ve[Le + 1] = ee.g, Ve[Le + 2] = ee.b, Ve[Le + 3] = te.r, Ve[Le + 4] = te.g, Ve[Le + 5] = te.b, Ve[Le + 6] = ie.r, Ve[Le + 7] = ie.g, Ve[Le + 8] = ie.b, Le += 9;
              Le > 0 && (W.bindBuffer(W.ARRAY_BUFFER, H.__webglColorBuffer), W.bufferData(W.ARRAY_BUFFER, Ve, _))
            }
            if (et && $e.hasTangents) {
              for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], V = N.vertexTangents, Y = V[0], K = V[1], $ = V[2], Be[Ce] = Y.x, Be[Ce + 1] = Y.y, Be[Ce + 2] = Y.z, Be[Ce + 3] = Y.w, Be[Ce + 4] = K.x, Be[Ce + 5] = K.y, Be[Ce + 6] = K.z, Be[Ce + 7] = K.w, Be[Ce + 8] = $.x, Be[Ce + 9] = $.y, Be[Ce + 10] = $.z, Be[Ce + 11] = $.w, Ce += 12;
              W.bindBuffer(W.ARRAY_BUFFER, H.__webglTangentBuffer), W.bufferData(W.ARRAY_BUFFER, Be, _)
            }
            if (Je && C) {
              for (P = 0, F = nt.length; F > P; P++) if (N = ot[nt[P]], U = N.vertexNormals, z = N.normal, 3 === U.length && D) for (he = 0; 3 > he; he++) ue = U[he], Oe[Me] = ue.x, Oe[Me + 1] = ue.y, Oe[Me + 2] = ue.z, Me += 3; else for (he = 0; 3 > he; he++) Oe[Me] = z.x, Oe[Me + 1] = z.y, Oe[Me + 2] = z.z, Me += 3;
              W.bindBuffer(W.ARRAY_BUFFER, H.__webglNormalBuffer), W.bufferData(W.ARRAY_BUFFER, Oe, _)
            }
            if (Ze && at && L) {
              for (P = 0, F = nt.length; F > P; P++) if (k = nt[P], I = at[k], void 0 !== I) for (he = 0; 3 > he; he++) pe = I[he], Ue[Re] = pe.x, Ue[Re + 1] = pe.y, Re += 2;
              Re > 0 && (W.bindBuffer(W.ARRAY_BUFFER, H.__webglUVBuffer), W.bufferData(W.ARRAY_BUFFER, Ue, _))
            }
            if (Ze && st && L) {
              for (P = 0, F = nt.length; F > P; P++) if (k = nt[P], j = st[k], void 0 !== j) for (he = 0; 3 > he; he++) de = j[he], ze[be] = de.x, ze[be + 1] = de.y, be += 2;
              be > 0 && (W.bindBuffer(W.ARRAY_BUFFER, H.__webglUV2Buffer), W.bufferData(W.ARRAY_BUFFER, ze, _))
            }
            if (Qe) {
              for (P = 0, F = nt.length; F > P; P++) Ye[He] = Te, Ye[He + 1] = Te + 1, Ye[He + 2] = Te + 2, He += 3, Ke[Ae] = Te, Ke[Ae + 1] = Te + 1, Ke[Ae + 2] = Te, Ke[Ae + 3] = Te + 2, Ke[Ae + 4] = Te + 1, Ke[Ae + 5] = Te + 2, Ae += 6, Te += 3;
              W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, H.__webglFaceBuffer), W.bufferData(W.ELEMENT_ARRAY_BUFFER, Ye, _), W.bindBuffer(W.ELEMENT_ARRAY_BUFFER, H.__webglLineBuffer), W.bufferData(W.ELEMENT_ARRAY_BUFFER, Ke, _)
            }
            if (Xe) for (he = 0, ce = Xe.length; ce > he; he++) if (qe = Xe[he], qe.__original.needsUpdate) {
              if (Fe = 0, 1 === qe.size) {
                if (void 0 === qe.boundTo || "vertices" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], qe.array[Fe] = qe.value[N.a], qe.array[Fe + 1] = qe.value[N.b], qe.array[Fe + 2] = qe.value[N.c], Fe += 3; else if ("faces" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) ke = qe.value[nt[P]], qe.array[Fe] = ke, qe.array[Fe + 1] = ke, qe.array[Fe + 2] = ke, Fe += 3
              } else if (2 === qe.size) {
                if (void 0 === qe.boundTo || "vertices" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], G = qe.value[N.a], X = qe.value[N.b], q = qe.value[N.c], qe.array[Fe] = G.x, qe.array[Fe + 1] = G.y, qe.array[Fe + 2] = X.x, qe.array[Fe + 3] = X.y, qe.array[Fe + 4] = q.x, qe.array[Fe + 5] = q.y, Fe += 6; else if ("faces" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) q = X = G = ke = qe.value[nt[P]], qe.array[Fe] = G.x, qe.array[Fe + 1] = G.y, qe.array[Fe + 2] = X.x, qe.array[Fe + 3] = X.y, qe.array[Fe + 4] = q.x, qe.array[Fe + 5] = q.y, Fe += 6
              } else if (3 === qe.size) {
                var pt;
                if (pt = "c" === qe.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === qe.boundTo || "vertices" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], G = qe.value[N.a], X = qe.value[N.b], q = qe.value[N.c], qe.array[Fe] = G[pt[0]], qe.array[Fe + 1] = G[pt[1]], qe.array[Fe + 2] = G[pt[2]], qe.array[Fe + 3] = X[pt[0]], qe.array[Fe + 4] = X[pt[1]], qe.array[Fe + 5] = X[pt[2]], qe.array[Fe + 6] = q[pt[0]], qe.array[Fe + 7] = q[pt[1]], qe.array[Fe + 8] = q[pt[2]], Fe += 9; else if ("faces" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) q = X = G = ke = qe.value[nt[P]], qe.array[Fe] = G[pt[0]], qe.array[Fe + 1] = G[pt[1]], qe.array[Fe + 2] = G[pt[2]], qe.array[Fe + 3] = X[pt[0]], qe.array[Fe + 4] = X[pt[1]], qe.array[Fe + 5] = X[pt[2]], qe.array[Fe + 6] = q[pt[0]], qe.array[Fe + 7] = q[pt[1]], qe.array[Fe + 8] = q[pt[2]], Fe += 9; else if ("faceVertices" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) ke = qe.value[nt[P]], G = ke[0], X = ke[1], q = ke[2], qe.array[Fe] = G[pt[0]], qe.array[Fe + 1] = G[pt[1]], qe.array[Fe + 2] = G[pt[2]], qe.array[Fe + 3] = X[pt[0]], qe.array[Fe + 4] = X[pt[1]], qe.array[Fe + 5] = X[pt[2]], qe.array[Fe + 6] = q[pt[0]], qe.array[Fe + 7] = q[pt[1]], qe.array[Fe + 8] = q[pt[2]], Fe += 9
              } else if (4 === qe.size) if (void 0 === qe.boundTo || "vertices" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) N = ot[nt[P]], G = qe.value[N.a], X = qe.value[N.b], q = qe.value[N.c], qe.array[Fe] = G.x, qe.array[Fe + 1] = G.y, qe.array[Fe + 2] = G.z, qe.array[Fe + 3] = G.w, qe.array[Fe + 4] = X.x, qe.array[Fe + 5] = X.y, qe.array[Fe + 6] = X.z, qe.array[Fe + 7] = X.w, qe.array[Fe + 8] = q.x, qe.array[Fe + 9] = q.y, qe.array[Fe + 10] = q.z, qe.array[Fe + 11] = q.w, Fe += 12; else if ("faces" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) q = X = G = ke = qe.value[nt[P]], qe.array[Fe] = G.x, qe.array[Fe + 1] = G.y, qe.array[Fe + 2] = G.z, qe.array[Fe + 3] = G.w, qe.array[Fe + 4] = X.x, qe.array[Fe + 5] = X.y, qe.array[Fe + 6] = X.z, qe.array[Fe + 7] = X.w, qe.array[Fe + 8] = q.x, qe.array[Fe + 9] = q.y, qe.array[Fe + 10] = q.z, qe.array[Fe + 11] = q.w, Fe += 12; else if ("faceVertices" === qe.boundTo) for (P = 0, F = nt.length; F > P; P++) ke = qe.value[nt[P]], G = ke[0], X = ke[1], q = ke[2], qe.array[Fe] = G.x, qe.array[Fe + 1] = G.y, qe.array[Fe + 2] = G.z, qe.array[Fe + 3] = G.w, qe.array[Fe + 4] = X.x, qe.array[Fe + 5] = X.y, qe.array[Fe + 6] = X.z, qe.array[Fe + 7] = X.w, qe.array[Fe + 8] = q.x, qe.array[Fe + 9] = q.y, qe.array[Fe + 10] = q.z, qe.array[Fe + 11] = q.w, Fe += 12;
              W.bindBuffer(W.ARRAY_BUFFER, qe.buffer), W.bufferData(W.ARRAY_BUFFER, qe.array, _)
            }
            S && (delete H.__inittedArrays, delete H.__colorArray, delete H.__normalArray, delete H.__tangentArray, delete H.__uvArray, delete H.__uv2Array, delete H.__faceArray, delete H.__vertexArray, delete H.__lineArray, delete H.__skinIndexArray, delete H.__skinWeightArray)
          }
        }
        h.verticesNeedUpdate = !1, h.morphTargetsNeedUpdate = !1, h.elementsNeedUpdate = !1, h.uvsNeedUpdate = !1, h.normalsNeedUpdate = !1, h.colorsNeedUpdate = !1, h.tangentsNeedUpdate = !1, h.buffersNeedUpdate = !1, d.attributes && v(d)
      } else if (l instanceof THREE.Line) {
        if (d = r(l, h), p = d.attributes && g(d), h.verticesNeedUpdate || h.colorsNeedUpdate || h.lineDistancesNeedUpdate || p) {
          var dt = h, ft = W.DYNAMIC_DRAW, mt = void 0, Et = void 0, gt = void 0, vt = void 0, yt = void 0, Tt = void 0,
            xt = dt.vertices, Rt = dt.colors, bt = dt.lineDistances, Ht = xt.length, wt = Rt.length, _t = bt.length,
            St = dt.__vertexArray, Mt = dt.__colorArray, Ct = dt.__lineDistanceArray, At = dt.colorsNeedUpdate,
            Lt = dt.lineDistancesNeedUpdate, Dt = dt.__webglCustomAttributesList, Pt = void 0, Ft = void 0, kt = void 0,
            Nt = void 0, Ut = void 0, zt = void 0;
          if (dt.verticesNeedUpdate) {
            for (mt = 0; Ht > mt; mt++) vt = xt[mt], yt = 3 * mt, St[yt] = vt.x, St[yt + 1] = vt.y, St[yt + 2] = vt.z;
            W.bindBuffer(W.ARRAY_BUFFER, dt.__webglVertexBuffer), W.bufferData(W.ARRAY_BUFFER, St, ft)
          }
          if (At) {
            for (Et = 0; wt > Et; Et++) Tt = Rt[Et], yt = 3 * Et, Mt[yt] = Tt.r, Mt[yt + 1] = Tt.g, Mt[yt + 2] = Tt.b;
            W.bindBuffer(W.ARRAY_BUFFER, dt.__webglColorBuffer), W.bufferData(W.ARRAY_BUFFER, Mt, ft)
          }
          if (Lt) {
            for (gt = 0; _t > gt; gt++) Ct[gt] = bt[gt];
            W.bindBuffer(W.ARRAY_BUFFER, dt.__webglLineDistanceBuffer), W.bufferData(W.ARRAY_BUFFER, Ct, ft)
          }
          if (Dt) for (Pt = 0, Ft = Dt.length; Ft > Pt; Pt++) if (zt = Dt[Pt], zt.needsUpdate && (void 0 === zt.boundTo || "vertices" === zt.boundTo)) {
            if (yt = 0, Nt = zt.value.length, 1 === zt.size) for (kt = 0; Nt > kt; kt++) zt.array[kt] = zt.value[kt]; else if (2 === zt.size) for (kt = 0; Nt > kt; kt++) Ut = zt.value[kt], zt.array[yt] = Ut.x, zt.array[yt + 1] = Ut.y, yt += 2; else if (3 === zt.size) if ("c" === zt.type) for (kt = 0; Nt > kt; kt++) Ut = zt.value[kt], zt.array[yt] = Ut.r, zt.array[yt + 1] = Ut.g, zt.array[yt + 2] = Ut.b, yt += 3; else for (kt = 0; Nt > kt; kt++) Ut = zt.value[kt], zt.array[yt] = Ut.x, zt.array[yt + 1] = Ut.y, zt.array[yt + 2] = Ut.z, yt += 3; else if (4 === zt.size) for (kt = 0; Nt > kt; kt++) Ut = zt.value[kt], zt.array[yt] = Ut.x, zt.array[yt + 1] = Ut.y, zt.array[yt + 2] = Ut.z, zt.array[yt + 3] = Ut.w, yt += 4;
            W.bindBuffer(W.ARRAY_BUFFER, zt.buffer), W.bufferData(W.ARRAY_BUFFER, zt.array, ft)
          }
        }
        h.verticesNeedUpdate = !1, h.colorsNeedUpdate = !1, h.lineDistancesNeedUpdate = !1, d.attributes && v(d)
      } else if (l instanceof THREE.ParticleSystem) {
        if (d = r(l, h), p = d.attributes && g(d), h.verticesNeedUpdate || h.colorsNeedUpdate || l.sortParticles || p) {
          var Ot = h, Bt = W.DYNAMIC_DRAW, Vt = l, It = void 0, jt = void 0, Wt = void 0, Gt = void 0, Xt = void 0,
            qt = void 0, Yt = Ot.vertices, Kt = Yt.length, $t = Ot.colors, Qt = $t.length, Zt = Ot.__vertexArray,
            Jt = Ot.__colorArray, ei = Ot.__sortArray, ti = Ot.verticesNeedUpdate, ii = Ot.colorsNeedUpdate,
            ri = Ot.__webglCustomAttributesList, ni = void 0, oi = void 0, ai = void 0, si = void 0, li = void 0,
            hi = void 0;
          if (Vt.sortParticles) {
            for (_e.copy(we), _e.multiply(Vt.matrixWorld), It = 0; Kt > It; It++) Wt = Yt[It], Se.copy(Wt), Se.applyProjection(_e), ei[It] = [Se.z, It];
            for (ei.sort(u), It = 0; Kt > It; It++) Wt = Yt[ei[It][1]], Gt = 3 * It, Zt[Gt] = Wt.x, Zt[Gt + 1] = Wt.y, Zt[Gt + 2] = Wt.z;
            for (jt = 0; Qt > jt; jt++) Gt = 3 * jt, qt = $t[ei[jt][1]], Jt[Gt] = qt.r, Jt[Gt + 1] = qt.g, Jt[Gt + 2] = qt.b;
            if (ri) for (ni = 0, oi = ri.length; oi > ni; ni++) if (hi = ri[ni], void 0 === hi.boundTo || "vertices" === hi.boundTo) if (Gt = 0, si = hi.value.length, 1 === hi.size) for (ai = 0; si > ai; ai++) Xt = ei[ai][1], hi.array[ai] = hi.value[Xt]; else if (2 === hi.size) for (ai = 0; si > ai; ai++) Xt = ei[ai][1], li = hi.value[Xt], hi.array[Gt] = li.x, hi.array[Gt + 1] = li.y, Gt += 2; else if (3 === hi.size) if ("c" === hi.type) for (ai = 0; si > ai; ai++) Xt = ei[ai][1], li = hi.value[Xt], hi.array[Gt] = li.r, hi.array[Gt + 1] = li.g, hi.array[Gt + 2] = li.b, Gt += 3; else for (ai = 0; si > ai; ai++) Xt = ei[ai][1], li = hi.value[Xt], hi.array[Gt] = li.x, hi.array[Gt + 1] = li.y, hi.array[Gt + 2] = li.z, Gt += 3; else if (4 === hi.size) for (ai = 0; si > ai; ai++) Xt = ei[ai][1], li = hi.value[Xt], hi.array[Gt] = li.x, hi.array[Gt + 1] = li.y, hi.array[Gt + 2] = li.z, hi.array[Gt + 3] = li.w, Gt += 4
          } else {
            if (ti) for (It = 0; Kt > It; It++) Wt = Yt[It], Gt = 3 * It, Zt[Gt] = Wt.x, Zt[Gt + 1] = Wt.y, Zt[Gt + 2] = Wt.z;
            if (ii) for (jt = 0; Qt > jt; jt++) qt = $t[jt], Gt = 3 * jt, Jt[Gt] = qt.r, Jt[Gt + 1] = qt.g, Jt[Gt + 2] = qt.b;
            if (ri) for (ni = 0, oi = ri.length; oi > ni; ni++) if (hi = ri[ni], hi.needsUpdate && (void 0 === hi.boundTo || "vertices" === hi.boundTo)) if (si = hi.value.length, Gt = 0, 1 === hi.size) for (ai = 0; si > ai; ai++) hi.array[ai] = hi.value[ai]; else if (2 === hi.size) for (ai = 0; si > ai; ai++) li = hi.value[ai], hi.array[Gt] = li.x, hi.array[Gt + 1] = li.y, Gt += 2; else if (3 === hi.size) if ("c" === hi.type) for (ai = 0; si > ai; ai++) li = hi.value[ai], hi.array[Gt] = li.r, hi.array[Gt + 1] = li.g, hi.array[Gt + 2] = li.b, Gt += 3; else for (ai = 0; si > ai; ai++) li = hi.value[ai], hi.array[Gt] = li.x, hi.array[Gt + 1] = li.y, hi.array[Gt + 2] = li.z, Gt += 3; else if (4 === hi.size) for (ai = 0; si > ai; ai++) li = hi.value[ai], hi.array[Gt] = li.x, hi.array[Gt + 1] = li.y, hi.array[Gt + 2] = li.z, hi.array[Gt + 3] = li.w, Gt += 4
          }
          if ((ti || Vt.sortParticles) && (W.bindBuffer(W.ARRAY_BUFFER, Ot.__webglVertexBuffer), W.bufferData(W.ARRAY_BUFFER, Zt, Bt)), (ii || Vt.sortParticles) && (W.bindBuffer(W.ARRAY_BUFFER, Ot.__webglColorBuffer), W.bufferData(W.ARRAY_BUFFER, Jt, Bt)), ri) for (ni = 0, oi = ri.length; oi > ni; ni++) hi = ri[ni], (hi.needsUpdate || Vt.sortParticles) && (W.bindBuffer(W.ARRAY_BUFFER, hi.buffer), W.bufferData(W.ARRAY_BUFFER, hi.array, Bt))
        }
        h.verticesNeedUpdate = !1, h.colorsNeedUpdate = !1, d.attributes && v(d)
      }
    }
  }, this.initMaterial = function (e, t, i, r) {
    var n, o, a, s;
    e.addEventListener("dispose", Xe);
    var l, h, c, u;
    e instanceof THREE.MeshDepthMaterial ? u = "depth" : e instanceof THREE.MeshNormalMaterial ? u = "normal" : e instanceof THREE.MeshBasicMaterial ? u = "basic" : e instanceof THREE.MeshLambertMaterial ? u = "lambert" : e instanceof THREE.MeshPhongMaterial ? u = "phong" : e instanceof THREE.LineBasicMaterial ? u = "basic" : e instanceof THREE.LineDashedMaterial ? u = "dashed" : e instanceof THREE.ParticleSystemMaterial && (u = "particle_basic"), u && (n = THREE.ShaderLib[u], e.uniforms = THREE.UniformsUtils.clone(n.uniforms), e.vertexShader = n.vertexShader, e.fragmentShader = n.fragmentShader), c = s = a = o = n = 0;
    for (var p = t.length; p > c; c++) {
      var d = t[c];
      d.onlyShadow || !1 === d.visible || (d instanceof THREE.DirectionalLight && n++, d instanceof THREE.PointLight && o++, d instanceof THREE.SpotLight && a++, d instanceof THREE.HemisphereLight && s++)
    }
    for (p = c = 0, d = t.length; d > p; p++) {
      var f = t[p];
      f.castShadow && (f instanceof THREE.SpotLight && c++, f instanceof THREE.DirectionalLight && !f.shadowCascade && c++)
    }
    t = c, Ne && r && r.useVertexTexture ? c = 1024 : (c = W.getParameter(W.MAX_VERTEX_UNIFORM_VECTORS), c = Math.floor((c - 20) / 4), void 0 !== r && r instanceof THREE.SkinnedMesh && (c = Math.min(r.bones.length, c), c < r.bones.length && console.warn("WebGLRenderer: too many bones - " + r.bones.length + ", this GPU supports just " + c + " (try OpenGL instead of ANGLE)"))), i = {
      precision: F,
      supportsVertexTextures: ke,
      map: !!e.map,
      envMap: !!e.envMap,
      lightMap: !!e.lightMap,
      bumpMap: !!e.bumpMap,
      normalMap: !!e.normalMap,
      specularMap: !!e.specularMap,
      vertexColors: e.vertexColors,
      fog: i,
      useFog: e.fog,
      fogExp: i instanceof THREE.FogExp2,
      sizeAttenuation: e.sizeAttenuation,
      logarithmicDepthBuffer: V,
      skinning: e.skinning,
      maxBones: c,
      useVertexTexture: Ne && r && r.useVertexTexture,
      morphTargets: e.morphTargets,
      morphNormals: e.morphNormals,
      maxMorphTargets: this.maxMorphTargets,
      maxMorphNormals: this.maxMorphNormals,
      maxDirLights: n,
      maxPointLights: o,
      maxSpotLights: a,
      maxHemiLights: s,
      maxShadows: t,
      shadowMapEnabled: this.shadowMapEnabled && r.receiveShadow && t > 0,
      shadowMapType: this.shadowMapType,
      shadowMapDebug: this.shadowMapDebug,
      shadowMapCascade: this.shadowMapCascade,
      alphaTest: e.alphaTest,
      metal: e.metal,
      wrapAround: e.wrapAround,
      doubleSided: e.side === THREE.DoubleSide,
      flipSided: e.side === THREE.BackSide
    }, r = [], u ? r.push(u) : (r.push(e.fragmentShader), r.push(e.vertexShader));
    for (var m in e.defines) r.push(m), r.push(e.defines[m]);
    for (h in i) r.push(h), r.push(i[h]);
    u = r.join();
    var E;
    for (h = 0, m = Q.length; m > h; h++) if (r = Q[h], r.code === u) {
      E = r, E.usedTimes++;
      break
    }
    if (void 0 === E && (E = new THREE.WebGLProgram(this, u, e, i), Q.push(E), $.info.memory.programs = Q.length), e.program = E, E = e.program.attributes, e.morphTargets) for (e.numSupportedMorphTargets = 0, m = "morphTarget", h = 0; h < this.maxMorphTargets; h++) u = m + h, 0 <= E[u] && e.numSupportedMorphTargets++;
    if (e.morphNormals) for (e.numSupportedMorphNormals = 0, m = "morphNormal", h = 0; h < this.maxMorphNormals; h++) u = m + h, 0 <= E[u] && e.numSupportedMorphNormals++;
    e.uniformsList = [];
    for (l in e.uniforms) e.uniformsList.push([e.uniforms[l], l]);
  }, this.setFaceCulling = function (e, t) {
    e === THREE.CullFaceNone ? W.disable(W.CULL_FACE) : (t === THREE.FrontFaceDirectionCW ? W.frontFace(W.CW) : W.frontFace(W.CCW), e === THREE.CullFaceBack ? W.cullFace(W.BACK) : e === THREE.CullFaceFront ? W.cullFace(W.FRONT) : W.cullFace(W.FRONT_AND_BACK), W.enable(W.CULL_FACE))
  }, this.setMaterialFaces = function (e) {
    var t = e.side === THREE.DoubleSide;
    e = e.side === THREE.BackSide, ne !== t && (t ? W.disable(W.CULL_FACE) : W.enable(W.CULL_FACE), ne = t), oe !== e && (e ? W.frontFace(W.CW) : W.frontFace(W.CCW), oe = e)
  }, this.setDepthTest = function (e) {
    ce !== e && (e ? W.enable(W.DEPTH_TEST) : W.disable(W.DEPTH_TEST), ce = e)
  }, this.setDepthWrite = function (e) {
    ue !== e && (W.depthMask(e), ue = e)
  }, this.setBlending = function (e, t, i, r) {
    e !== ae && (e === THREE.NoBlending ? W.disable(W.BLEND) : e === THREE.AdditiveBlending ? (W.enable(W.BLEND), W.blendEquation(W.FUNC_ADD), W.blendFunc(W.SRC_ALPHA, W.ONE)) : e === THREE.SubtractiveBlending ? (W.enable(W.BLEND), W.blendEquation(W.FUNC_ADD), W.blendFunc(W.ZERO, W.ONE_MINUS_SRC_COLOR)) : e === THREE.MultiplyBlending ? (W.enable(W.BLEND), W.blendEquation(W.FUNC_ADD), W.blendFunc(W.ZERO, W.SRC_COLOR)) : e === THREE.CustomBlending ? W.enable(W.BLEND) : (W.enable(W.BLEND), W.blendEquationSeparate(W.FUNC_ADD, W.FUNC_ADD), W.blendFuncSeparate(W.SRC_ALPHA, W.ONE_MINUS_SRC_ALPHA, W.ONE, W.ONE_MINUS_SRC_ALPHA)), ae = e), e === THREE.CustomBlending ? (t !== se && (W.blendEquation(L(t)), se = t), (i !== le || r !== he) && (W.blendFunc(L(i), L(r)), le = i, he = r)) : he = le = se = null
  }, this.setTexture = function (e, t) {
    if (e.needsUpdate) {
      e.__webglInit || (e.__webglInit = !0, e.addEventListener("dispose", We), e.__webglTexture = W.createTexture(), $.info.memory.textures++), W.activeTexture(W.TEXTURE0 + t), W.bindTexture(W.TEXTURE_2D, e.__webglTexture), W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL, e.flipY), W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), W.pixelStorei(W.UNPACK_ALIGNMENT, e.unpackAlignment);
      var i = e.image, r = THREE.Math.isPowerOfTwo(i.width) && THREE.Math.isPowerOfTwo(i.height), n = L(e.format),
        o = L(e.type);
      M(W.TEXTURE_2D, e, r);
      var a = e.mipmaps;
      if (e instanceof THREE.DataTexture) if (0 < a.length && r) {
        for (var s = 0, l = a.length; l > s; s++) i = a[s], W.texImage2D(W.TEXTURE_2D, s, n, i.width, i.height, 0, n, o, i.data);
        e.generateMipmaps = !1
      } else W.texImage2D(W.TEXTURE_2D, 0, n, i.width, i.height, 0, n, o, i.data); else if (e instanceof THREE.CompressedTexture) for (s = 0, l = a.length; l > s; s++) i = a[s], e.format !== THREE.RGBAFormat ? W.compressedTexImage2D(W.TEXTURE_2D, s, n, i.width, i.height, 0, i.data) : W.texImage2D(W.TEXTURE_2D, s, n, i.width, i.height, 0, n, o, i.data); else if (0 < a.length && r) {
        for (s = 0, l = a.length; l > s; s++) i = a[s], W.texImage2D(W.TEXTURE_2D, s, n, n, o, i);
        e.generateMipmaps = !1
      } else W.texImage2D(W.TEXTURE_2D, 0, n, n, o, e.image);
      e.generateMipmaps && r && W.generateMipmap(W.TEXTURE_2D), e.needsUpdate = !1, e.onUpdate && e.onUpdate()
    } else W.activeTexture(W.TEXTURE0 + t), W.bindTexture(W.TEXTURE_2D, e.__webglTexture)
  }, this.setRenderTarget = function (e) {
    var t = e instanceof THREE.WebGLRenderTargetCube;
    if (e && !e.__webglFramebuffer) {
      void 0 === e.depthBuffer && (e.depthBuffer = !0), void 0 === e.stencilBuffer && (e.stencilBuffer = !0), e.addEventListener("dispose", Ge), e.__webglTexture = W.createTexture(), $.info.memory.textures++;
      var i = THREE.Math.isPowerOfTwo(e.width) && THREE.Math.isPowerOfTwo(e.height), r = L(e.format), n = L(e.type);
      if (t) {
        e.__webglFramebuffer = [], e.__webglRenderbuffer = [], W.bindTexture(W.TEXTURE_CUBE_MAP, e.__webglTexture), M(W.TEXTURE_CUBE_MAP, e, i);
        for (var o = 0; 6 > o; o++) {
          e.__webglFramebuffer[o] = W.createFramebuffer(), e.__webglRenderbuffer[o] = W.createRenderbuffer(), W.texImage2D(W.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, r, e.width, e.height, 0, r, n, null);
          var a = e, s = W.TEXTURE_CUBE_MAP_POSITIVE_X + o;
          W.bindFramebuffer(W.FRAMEBUFFER, e.__webglFramebuffer[o]), W.framebufferTexture2D(W.FRAMEBUFFER, W.COLOR_ATTACHMENT0, s, a.__webglTexture, 0), C(e.__webglRenderbuffer[o], e)
        }
        i && W.generateMipmap(W.TEXTURE_CUBE_MAP)
      } else e.__webglFramebuffer = W.createFramebuffer(), e.__webglRenderbuffer = e.shareDepthFrom ? e.shareDepthFrom.__webglRenderbuffer : W.createRenderbuffer(), W.bindTexture(W.TEXTURE_2D, e.__webglTexture), M(W.TEXTURE_2D, e, i), W.texImage2D(W.TEXTURE_2D, 0, r, e.width, e.height, 0, r, n, null), r = W.TEXTURE_2D, W.bindFramebuffer(W.FRAMEBUFFER, e.__webglFramebuffer), W.framebufferTexture2D(W.FRAMEBUFFER, W.COLOR_ATTACHMENT0, r, e.__webglTexture, 0), e.shareDepthFrom ? e.depthBuffer && !e.stencilBuffer ? W.framebufferRenderbuffer(W.FRAMEBUFFER, W.DEPTH_ATTACHMENT, W.RENDERBUFFER, e.__webglRenderbuffer) : e.depthBuffer && e.stencilBuffer && W.framebufferRenderbuffer(W.FRAMEBUFFER, W.DEPTH_STENCIL_ATTACHMENT, W.RENDERBUFFER, e.__webglRenderbuffer) : C(e.__webglRenderbuffer, e), i && W.generateMipmap(W.TEXTURE_2D);
      t ? W.bindTexture(W.TEXTURE_CUBE_MAP, null) : W.bindTexture(W.TEXTURE_2D, null), W.bindRenderbuffer(W.RENDERBUFFER, null), W.bindFramebuffer(W.FRAMEBUFFER, null)
    }
    e ? (t = t ? e.__webglFramebuffer[e.activeCubeFace] : e.__webglFramebuffer, i = e.width, e = e.height, n = r = 0) : (t = null, i = ve, e = ye, r = Ee, n = ge), t !== J && (W.bindFramebuffer(W.FRAMEBUFFER, t), W.viewport(r, n, i, e), J = t), Te = i, xe = e
  }, this.shadowMapPlugin = new THREE.ShadowMapPlugin, this.addPrePlugin(this.shadowMapPlugin), this.addPostPlugin(new THREE.SpritePlugin), this.addPostPlugin(new THREE.LensFlarePlugin)
},THREE.WebGLRenderTarget = function (e, t, i) {
  this.width = e, this.height = t, i = i || {}, this.wrapS = void 0 !== i.wrapS ? i.wrapS : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== i.wrapT ? i.wrapT : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== i.magFilter ? i.magFilter : THREE.LinearFilter, this.minFilter = void 0 !== i.minFilter ? i.minFilter : THREE.LinearMipMapLinearFilter, this.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.format = void 0 !== i.format ? i.format : THREE.RGBAFormat, this.type = void 0 !== i.type ? i.type : THREE.UnsignedByteType, this.depthBuffer = void 0 !== i.depthBuffer ? i.depthBuffer : !0, this.stencilBuffer = void 0 !== i.stencilBuffer ? i.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = null
},THREE.WebGLRenderTarget.prototype = {
  constructor: THREE.WebGLRenderTarget, setSize: function (e, t) {
    this.width = e, this.height = t
  }, clone: function () {
    var e = new THREE.WebGLRenderTarget(this.width, this.height);
    return e.wrapS = this.wrapS, e.wrapT = this.wrapT, e.magFilter = this.magFilter, e.minFilter = this.minFilter, e.anisotropy = this.anisotropy, e.offset.copy(this.offset), e.repeat.copy(this.repeat), e.format = this.format, e.type = this.type, e.depthBuffer = this.depthBuffer, e.stencilBuffer = this.stencilBuffer, e.generateMipmaps = this.generateMipmaps, e.shareDepthFrom = this.shareDepthFrom, e
  }, dispose: function () {
    this.dispatchEvent({type: "dispose"})
  }
},THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype),THREE.WebGLRenderTargetCube = function (e, t, i) {
  THREE.WebGLRenderTarget.call(this, e, t, i), this.activeCubeFace = 0
},THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype),THREE.WebGLProgram = function () {
  var e = 0;
  return function (t, i, r, n) {
    var o = t.context, a = r.fragmentShader, s = r.vertexShader, l = r.uniforms, h = r.attributes, c = r.defines,
      u = r.index0AttributeName;
    void 0 === u && !0 === n.morphTargets && (u = "position");
    var p = "SHADOWMAP_TYPE_BASIC";
    n.shadowMapType === THREE.PCFShadowMap ? p = "SHADOWMAP_TYPE_PCF" : n.shadowMapType === THREE.PCFSoftShadowMap && (p = "SHADOWMAP_TYPE_PCF_SOFT");
    var d, f;
    d = [];
    for (var m in c) f = c[m], !1 !== f && (f = "#define " + m + " " + f, d.push(f));
    d = d.join("\n"), c = o.createProgram(), r instanceof THREE.RawShaderMaterial ? t = r = "" : (r = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", d, n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", t.gammaInput ? "#define GAMMA_INPUT" : "", t.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define MAX_DIR_LIGHTS " + n.maxDirLights, "#define MAX_POINT_LIGHTS " + n.maxPointLights, "#define MAX_SPOT_LIGHTS " + n.maxSpotLights, "#define MAX_HEMI_LIGHTS " + n.maxHemiLights, "#define MAX_SHADOWS " + n.maxShadows, "#define MAX_BONES " + n.maxBones, n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals ? "#define USE_MORPHNORMALS" : "", n.wrapAround ? "#define WRAP_AROUND" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", n.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\n	attribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\n	attribute vec3 morphTarget0;\n	attribute vec3 morphTarget1;\n	attribute vec3 morphTarget2;\n	attribute vec3 morphTarget3;\n	#ifdef USE_MORPHNORMALS\n		attribute vec3 morphNormal0;\n		attribute vec3 morphNormal1;\n		attribute vec3 morphNormal2;\n		attribute vec3 morphNormal3;\n	#else\n		attribute vec3 morphTarget4;\n		attribute vec3 morphTarget5;\n		attribute vec3 morphTarget6;\n		attribute vec3 morphTarget7;\n	#endif\n#endif\n#ifdef USE_SKINNING\n	attribute vec4 skinIndex;\n	attribute vec4 skinWeight;\n#endif\n"].join("\n"), t = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", n.bumpMap || n.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", d, "#define MAX_DIR_LIGHTS " + n.maxDirLights, "#define MAX_POINT_LIGHTS " + n.maxPointLights, "#define MAX_SPOT_LIGHTS " + n.maxSpotLights, "#define MAX_HEMI_LIGHTS " + n.maxHemiLights, "#define MAX_SHADOWS " + n.maxShadows, n.alphaTest ? "#define ALPHATEST " + n.alphaTest : "", t.gammaInput ? "#define GAMMA_INPUT" : "", t.gammaOutput ? "#define GAMMA_OUTPUT" : "", n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.metal ? "#define METAL" : "", n.wrapAround ? "#define WRAP_AROUND" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", n.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n")), s = new THREE.WebGLShader(o, o.VERTEX_SHADER, r + s), a = new THREE.WebGLShader(o, o.FRAGMENT_SHADER, t + a), o.attachShader(c, s), o.attachShader(c, a), void 0 !== u && o.bindAttribLocation(c, 0, u), o.linkProgram(c), !1 === o.getProgramParameter(c, o.LINK_STATUS) && (console.error("Could not initialise shader"), console.error("gl.VALIDATE_STATUS", o.getProgramParameter(c, o.VALIDATE_STATUS)), console.error("gl.getError()", o.getError())), "" !== o.getProgramInfoLog(c) && console.error("gl.getProgramInfoLog()", o.getProgramInfoLog(c)), o.deleteShader(s), o.deleteShader(a), u = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" "), n.useVertexTexture ? (u.push("boneTexture"), u.push("boneTextureWidth"), u.push("boneTextureHeight")) : u.push("boneGlobalMatrices"), n.logarithmicDepthBuffer && u.push("logDepthBufFC");
    for (var E in l) u.push(E);
    for (l = u, E = {}, u = 0, t = l.length; t > u; u++) p = l[u], E[p] = o.getUniformLocation(c, p);
    for (this.uniforms = E, u = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" "), l = 0; l < n.maxMorphTargets; l++) u.push("morphTarget" + l);
    for (l = 0; l < n.maxMorphNormals; l++) u.push("morphNormal" + l);
    for (var g in h) u.push(g);
    for (n = u, h = {}, g = 0, l = n.length; l > g; g++) E = n[g], h[E] = o.getAttribLocation(c, E);
    return this.attributes = h, this.id = e++, this.code = i, this.usedTimes = 1, this.program = c, this.vertexShader = s, this.fragmentShader = a, this
  }
}(),THREE.WebGLShader = function () {
  var e = function (e) {
    e = e.split("\n");
    for (var t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
    return e.join("\n")
  };
  return function (t, i, r) {
    return i = t.createShader(i), t.shaderSource(i, r), t.compileShader(i), !1 === t.getShaderParameter(i, t.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(i) && (console.error("THREE.WebGLShader:", "gl.getShaderInfoLog()", t.getShaderInfoLog(i)), console.error(e(r))), i
  }
}(),THREE.RenderableVertex = function () {
  this.position = new THREE.Vector3, this.positionWorld = new THREE.Vector3, this.positionScreen = new THREE.Vector4, this.visible = !0
},THREE.RenderableVertex.prototype.copy = function (e) {
  this.positionWorld.copy(e.positionWorld), this.positionScreen.copy(e.positionScreen)
},THREE.RenderableFace = function () {
  this.id = 0, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.normalModel = new THREE.Vector3, this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.vertexNormalsLength = 0, this.material = this.color = null, this.uvs = [new THREE.Vector2, new THREE.Vector2, new THREE.Vector2], this.z = 0
},THREE.RenderableObject = function () {
  this.id = 0, this.object = null, this.z = 0
},THREE.RenderableSprite = function () {
  this.id = 0, this.object = null, this.rotation = this.z = this.y = this.x = 0, this.scale = new THREE.Vector2, this.material = null
},THREE.RenderableLine = function () {
  this.id = 0, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.vertexColors = [new THREE.Color, new THREE.Color], this.material = null, this.z = 0
},THREE.GeometryUtils = {
  merge: function (e, t, i) {
    var r, n, o = e.vertices.length, a = t instanceof THREE.Mesh ? t.geometry : t, s = e.vertices, l = a.vertices,
      h = e.faces, c = a.faces;
    e = e.faceVertexUvs[0], a = a.faceVertexUvs[0], void 0 === i && (i = 0), t instanceof THREE.Mesh && (t.matrixAutoUpdate && t.updateMatrix(), r = t.matrix, n = (new THREE.Matrix3).getNormalMatrix(r)), t = 0;
    for (var u = l.length; u > t; t++) {
      var p = l[t].clone();
      r && p.applyMatrix4(r), s.push(p)
    }
    for (t = 0, u = c.length; u > t; t++) {
      var d, l = c[t], f = l.vertexNormals, m = l.vertexColors, p = new THREE.Face3(l.a + o, l.b + o, l.c + o);
      for (p.normal.copy(l.normal), n && p.normal.applyMatrix3(n).normalize(), r = 0, s = f.length; s > r; r++) d = f[r].clone(), n && d.applyMatrix3(n).normalize(), p.vertexNormals.push(d);
      for (p.color.copy(l.color), r = 0, s = m.length; s > r; r++) d = m[r], p.vertexColors.push(d.clone());
      p.materialIndex = l.materialIndex + i, h.push(p)
    }
    for (t = 0, u = a.length; u > t; t++) if (i = a[t], n = [], void 0 !== i) {
      for (r = 0, s = i.length; s > r; r++) n.push(new THREE.Vector2(i[r].x, i[r].y));
      e.push(n)
    }
  }, randomPointInTriangle: function () {
    var e = new THREE.Vector3;
    return function (t, i, r) {
      var n = new THREE.Vector3, o = THREE.Math.random16(), a = THREE.Math.random16();
      o + a > 1 && (o = 1 - o, a = 1 - a);
      var s = 1 - o - a;
      return n.copy(t), n.multiplyScalar(o), e.copy(i), e.multiplyScalar(a), n.add(e), e.copy(r), e.multiplyScalar(s), n.add(e), n
    }
  }(), randomPointInFace: function (e, t, i) {
    return THREE.GeometryUtils.randomPointInTriangle(t.vertices[e.a], t.vertices[e.b], t.vertices[e.c])
  }, randomPointsInGeometry: function (e, t) {
    function i(e) {
      function t(i, r) {
        if (i > r) return i;
        var n = i + Math.floor((r - i) / 2);
        return p[n] > e ? t(i, n - 1) : p[n] < e ? t(n + 1, r) : n
      }

      return t(0, p.length - 1)
    }

    var r, n, o, a, s, l = e.faces, h = e.vertices, c = l.length, u = 0, p = [];
    for (n = 0; c > n; n++) r = l[n], o = h[r.a], a = h[r.b], s = h[r.c], r._area = THREE.GeometryUtils.triangleArea(o, a, s), u += r._area, p[n] = u;
    for (r = [], n = 0; t > n; n++) h = THREE.Math.random16() * u, h = i(h), r[n] = THREE.GeometryUtils.randomPointInFace(l[h], e, !0);
    return r
  }, triangleArea: function () {
    var e = new THREE.Vector3, t = new THREE.Vector3;
    return function (i, r, n) {
      return e.subVectors(r, i), t.subVectors(n, i), e.cross(t), .5 * e.length()
    }
  }(), center: function (e) {
    e.computeBoundingBox();
    var t = e.boundingBox, i = new THREE.Vector3;
    return i.addVectors(t.min, t.max), i.multiplyScalar(-.5), e.applyMatrix((new THREE.Matrix4).makeTranslation(i.x, i.y, i.z)), e.computeBoundingBox(), i
  }
},THREE.ImageUtils = {
  crossOrigin: void 0, loadTexture: function (e, t, i, r) {
    r = new THREE.ImageLoader, r.crossOrigin = this.crossOrigin;
    var n = new THREE.Texture(void 0, t);
    return t = r.load(e, function () {
      n.needsUpdate = !0, i && i(n)
    }), n.image = t, n.sourceFile = e, n
  }, loadCompressedTexture: function (e, t, i, r) {
    var n = new THREE.CompressedTexture;
    n.mapping = t;
    var o = new XMLHttpRequest;
    return o.onload = function () {
      var e = THREE.ImageUtils.parseDDS(o.response, !0);
      n.format = e.format, n.mipmaps = e.mipmaps, n.image.width = e.width, n.image.height = e.height, n.generateMipmaps = !1, n.needsUpdate = !0, i && i(n)
    }, o.onerror = r, o.open("GET", e, !0), o.responseType = "arraybuffer", o.send(null), n
  }, loadTextureCube: function (e, t, i, r) {
    var n = [];
    n.loadCount = 0;
    var o = new THREE.Texture;
    o.image = n, void 0 !== t && (o.mapping = t), o.flipY = !1, t = 0;
    for (var a = e.length; a > t; ++t) {
      var s = new Image;
      n[t] = s, s.onload = function () {
        n.loadCount += 1, 6 === n.loadCount && (o.needsUpdate = !0, i && i(o))
      }, s.onerror = r, s.crossOrigin = this.crossOrigin, s.src = e[t]
    }
    return o
  }, loadCompressedTextureCube: function (e, t, i, r) {
    var n = [];
    n.loadCount = 0;
    var o = new THREE.CompressedTexture;
    if (o.image = n, void 0 !== t && (o.mapping = t), o.flipY = !1, o.generateMipmaps = !1, t = function (e, t) {
        return function () {
          var r = THREE.ImageUtils.parseDDS(e.response, !0);
          t.format = r.format, t.mipmaps = r.mipmaps, t.width = r.width, t.height = r.height, n.loadCount += 1, 6 === n.loadCount && (o.format = r.format, o.needsUpdate = !0, i && i(o))
        }
      }, e instanceof Array) for (var a = 0, s = e.length; s > a; ++a) {
      var l = {};
      n[a] = l;
      var h = new XMLHttpRequest;
      h.onload = t(h, l), h.onerror = r, l = e[a], h.open("GET", l, !0), h.responseType = "arraybuffer", h.send(null)
    } else h = new XMLHttpRequest, h.onload = function () {
      var e = THREE.ImageUtils.parseDDS(h.response, !0);
      if (e.isCubemap) {
        for (var t = e.mipmaps.length / e.mipmapCount, r = 0; t > r; r++) {
          n[r] = {mipmaps: []};
          for (var a = 0; a < e.mipmapCount; a++) n[r].mipmaps.push(e.mipmaps[r * e.mipmapCount + a]), n[r].format = e.format, n[r].width = e.width, n[r].height = e.height
        }
        o.format = e.format, o.needsUpdate = !0, i && i(o)
      }
    }, h.onerror = r, h.open("GET", e, !0), h.responseType = "arraybuffer", h.send(null);
    return o
  }, loadDDSTexture: function (e, t, i, r) {
    var n = [];
    n.loadCount = 0;
    var o = new THREE.CompressedTexture;
    o.image = n, void 0 !== t && (o.mapping = t), o.flipY = !1, o.generateMipmaps = !1;
    var a = new XMLHttpRequest;
    return a.onload = function () {
      var e = THREE.ImageUtils.parseDDS(a.response, !0);
      if (e.isCubemap) for (var t = e.mipmaps.length / e.mipmapCount, r = 0; t > r; r++) {
        n[r] = {mipmaps: []};
        for (var s = 0; s < e.mipmapCount; s++) n[r].mipmaps.push(e.mipmaps[r * e.mipmapCount + s]), n[r].format = e.format, n[r].width = e.width, n[r].height = e.height
      } else o.image.width = e.width, o.image.height = e.height, o.mipmaps = e.mipmaps;
      o.format = e.format, o.needsUpdate = !0, i && i(o)
    }, a.onerror = r, a.open("GET", e, !0), a.responseType = "arraybuffer", a.send(null), o
  }, parseDDS: function (e, t) {
    function i(e) {
      return e.charCodeAt(0) + (e.charCodeAt(1) << 8) + (e.charCodeAt(2) << 16) + (e.charCodeAt(3) << 24)
    }

    function r(e, t, i, r) {
      var n = i * r * 4;
      e = new Uint8Array(e, t, n);
      for (var n = new Uint8Array(n), o = t = 0, a = 0; r > a; a++) for (var s = 0; i > s; s++) {
        var l = e[o];
        o++;
        var h = e[o];
        o++;
        var c = e[o];
        o++;
        var u = e[o];
        o++, n[t] = c, t++, n[t] = h, t++, n[t] = l, t++, n[t] = u, t++
      }
      return n
    }

    var n = {mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1}, o = i("DXT1"), a = i("DXT3"),
      s = i("DXT5"), l = new Int32Array(e, 0, 31);
    if (542327876 !== l[0]) return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"), n;
    if (4 & !l[20]) return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"), n;
    var h = l[21], c = !1;
    switch (h) {
      case o:
        o = 8, n.format = THREE.RGB_S3TC_DXT1_Format;
        break;
      case a:
        o = 16, n.format = THREE.RGBA_S3TC_DXT3_Format;
        break;
      case s:
        o = 16, n.format = THREE.RGBA_S3TC_DXT5_Format;
        break;
      default:
        if (!(32 == l[22] && 16711680 & l[23] && 65280 & l[24] && 255 & l[25] && 4278190080 & l[26])) return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ", String.fromCharCode(255 & h, h >> 8 & 255, h >> 16 & 255, h >> 24 & 255)), n;
        c = !0, o = 64, n.format = THREE.RGBAFormat
    }
    n.mipmapCount = 1, 131072 & l[2] && !1 !== t && (n.mipmapCount = Math.max(1, l[7])), n.isCubemap = 512 & l[28] ? !0 : !1, n.width = l[4], n.height = l[3];
    for (var l = l[1] + 4, a = n.width, s = n.height, h = n.isCubemap ? 6 : 1, u = 0; h > u; u++) {
      for (var p = 0; p < n.mipmapCount; p++) {
        if (c) var d = r(e, l, a, s),
          f = d.length; else f = Math.max(4, a) / 4 * Math.max(4, s) / 4 * o, d = new Uint8Array(e, l, f);
        n.mipmaps.push({data: d, width: a, height: s}), l += f, a = Math.max(.5 * a, 1), s = Math.max(.5 * s, 1)
      }
      a = n.width, s = n.height
    }
    return n
  }, getNormalMap: function (e, t) {
    var i = function (e) {
      var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
      return [e[0] / t, e[1] / t, e[2] / t]
    };
    t |= 1;
    var r = e.width, n = e.height, o = document.createElement("canvas");
    o.width = r, o.height = n;
    var a = o.getContext("2d");
    a.drawImage(e, 0, 0);
    for (var s = a.getImageData(0, 0, r, n).data, l = a.createImageData(r, n), h = l.data, c = 0; r > c; c++) for (var u = 0; n > u; u++) {
      var p = 0 > u - 1 ? 0 : u - 1, d = u + 1 > n - 1 ? n - 1 : u + 1, f = 0 > c - 1 ? 0 : c - 1,
        m = c + 1 > r - 1 ? r - 1 : c + 1, E = [], g = [0, 0, s[4 * (u * r + c)] / 255 * t];
      for (E.push([-1, 0, s[4 * (u * r + f)] / 255 * t]), E.push([-1, -1, s[4 * (p * r + f)] / 255 * t]), E.push([0, -1, s[4 * (p * r + c)] / 255 * t]), E.push([1, -1, s[4 * (p * r + m)] / 255 * t]), E.push([1, 0, s[4 * (u * r + m)] / 255 * t]), E.push([1, 1, s[4 * (d * r + m)] / 255 * t]), E.push([0, 1, s[4 * (d * r + c)] / 255 * t]), E.push([-1, 1, s[4 * (d * r + f)] / 255 * t]), p = [], f = E.length, d = 0; f > d; d++) {
        var m = E[d], v = E[(d + 1) % f], m = [m[0] - g[0], m[1] - g[1], m[2] - g[2]],
          v = [v[0] - g[0], v[1] - g[1], v[2] - g[2]];
        p.push(i([m[1] * v[2] - m[2] * v[1], m[2] * v[0] - m[0] * v[2], m[0] * v[1] - m[1] * v[0]]))
      }
      for (E = [0, 0, 0], d = 0; d < p.length; d++) E[0] += p[d][0], E[1] += p[d][1], E[2] += p[d][2];
      E[0] /= p.length, E[1] /= p.length, E[2] /= p.length, g = 4 * (u * r + c), h[g] = (E[0] + 1) / 2 * 255 | 0, h[g + 1] = (E[1] + 1) / 2 * 255 | 0, h[g + 2] = 255 * E[2] | 0, h[g + 3] = 255
    }
    return a.putImageData(l, 0, 0), o
  }, generateDataTexture: function (e, t, i) {
    var r = e * t, n = new Uint8Array(3 * r), o = Math.floor(255 * i.r), a = Math.floor(255 * i.g);
    i = Math.floor(255 * i.b);
    for (var s = 0; r > s; s++) n[3 * s] = o, n[3 * s + 1] = a, n[3 * s + 2] = i;
    return e = new THREE.DataTexture(n, e, t, THREE.RGBFormat), e.needsUpdate = !0, e
  }
},THREE.SceneUtils = {
  createMultiMaterialObject: function (e, t) {
    for (var i = new THREE.Object3D, r = 0, n = t.length; n > r; r++) i.add(new THREE.Mesh(e, t[r]));
    return i
  }, detach: function (e, t, i) {
    e.applyMatrix(t.matrixWorld), t.remove(e), i.add(e)
  }, attach: function (e, t, i) {
    var r = new THREE.Matrix4;
    r.getInverse(i.matrixWorld), e.applyMatrix(r), t.remove(e), i.add(e)
  }
},THREE.FontUtils = {
  faces: {},
  face: "helvetiker",
  weight: "normal",
  style: "normal",
  size: 150,
  divisions: 10,
  getFace: function () {
    return this.faces[this.face][this.weight][this.style]
  },
  loadFace: function (e) {
    var t = e.familyName.toLowerCase();
    return this.faces[t] = this.faces[t] || {}, this.faces[t][e.cssFontWeight] = this.faces[t][e.cssFontWeight] || {}, this.faces[t][e.cssFontWeight][e.cssFontStyle] = e, this.faces[t][e.cssFontWeight][e.cssFontStyle] = e
  },
  drawText: function (e) {
    var t = this.getFace(), i = this.size / t.resolution, r = 0, n = String(e).split(""), o = n.length, a = [];
    for (e = 0; o > e; e++) {
      var s = new THREE.Path, s = this.extractGlyphPoints(n[e], t, i, r, s), r = r + s.offset;
      a.push(s.path)
    }
    return {paths: a, offset: r / 2}
  },
  extractGlyphPoints: function (e, t, i, r, n) {
    var o, a, s, l, h, c, u, p, d, f, m, E = [], g = t.glyphs[e] || t.glyphs["?"];
    if (g) {
      if (g.o) for (t = g._cachedOutline || (g._cachedOutline = g.o.split(" ")), l = t.length, e = 0; l > e;) switch (s = t[e++]) {
        case"m":
          s = t[e++] * i + r, h = t[e++] * i, n.moveTo(s, h);
          break;
        case"l":
          s = t[e++] * i + r, h = t[e++] * i, n.lineTo(s, h);
          break;
        case"q":
          if (s = t[e++] * i + r, h = t[e++] * i, p = t[e++] * i + r, d = t[e++] * i, n.quadraticCurveTo(p, d, s, h), o = E[E.length - 1]) for (c = o.x, u = o.y, o = 1, a = this.divisions; a >= o; o++) {
            var v = o / a;
            THREE.Shape.Utils.b2(v, c, p, s), THREE.Shape.Utils.b2(v, u, d, h)
          }
          break;
        case"b":
          if (s = t[e++] * i + r, h = t[e++] * i, p = t[e++] * i + r, d = t[e++] * -i, f = t[e++] * i + r, m = t[e++] * -i, n.bezierCurveTo(s, h, p, d, f, m), o = E[E.length - 1]) for (c = o.x, u = o.y, o = 1, a = this.divisions; a >= o; o++) v = o / a, THREE.Shape.Utils.b3(v, c, p, f, s), THREE.Shape.Utils.b3(v, u, d, m, h)
      }
      return {offset: g.ha * i, path: n}
    }
  }
},THREE.FontUtils.generateShapes = function (e, t) {
  t = t || {};
  var i = void 0 !== t.curveSegments ? t.curveSegments : 4, r = void 0 !== t.font ? t.font : "helvetiker",
    n = void 0 !== t.weight ? t.weight : "normal", o = void 0 !== t.style ? t.style : "normal";
  for (THREE.FontUtils.size = void 0 !== t.size ? t.size : 100, THREE.FontUtils.divisions = i, THREE.FontUtils.face = r, THREE.FontUtils.weight = n, THREE.FontUtils.style = o, i = THREE.FontUtils.drawText(e).paths, r = [], n = 0, o = i.length; o > n; n++) Array.prototype.push.apply(r, i[n].toShapes());
  return r
},function (e) {
  var t = function (e) {
    for (var t = e.length, i = 0, r = t - 1, n = 0; t > n; r = n++) i += e[r].x * e[n].y - e[n].x * e[r].y;
    return .5 * i
  };
  return e.Triangulate = function (e, i) {
    var r = e.length;
    if (3 > r) return null;
    var n, o, a, s = [], l = [], h = [];
    if (0 < t(e)) for (o = 0; r > o; o++) l[o] = o; else for (o = 0; r > o; o++) l[o] = r - 1 - o;
    var c = 2 * r;
    for (o = r - 1; r > 2;) {
      if (0 >= c--) {
        console.log("Warning, unable to triangulate polygon!");
        break
      }
      n = o, n >= r && (n = 0), o = n + 1, o >= r && (o = 0), a = o + 1, a >= r && (a = 0);
      var u;
      e:{
        var p = u = void 0, d = void 0, f = void 0, m = void 0, E = void 0, g = void 0, v = void 0, y = void 0,
          p = e[l[n]].x, d = e[l[n]].y, f = e[l[o]].x, m = e[l[o]].y, E = e[l[a]].x, g = e[l[a]].y;
        if (1e-10 > (f - p) * (g - d) - (m - d) * (E - p)) u = !1; else {
          var T = void 0, x = void 0, R = void 0, b = void 0, H = void 0, w = void 0, _ = void 0, S = void 0,
            M = void 0, C = void 0, M = S = _ = y = v = void 0, T = E - f, x = g - m, R = p - E, b = d - g, H = f - p,
            w = m - d;
          for (u = 0; r > u; u++) if (v = e[l[u]].x, y = e[l[u]].y, !(v === p && y === d || v === f && y === m || v === E && y === g) && (_ = v - p, S = y - d, M = v - f, C = y - m, v -= E, y -= g, M = T * C - x * M, _ = H * S - w * _, S = R * y - b * v, M >= -1e-10 && S >= -1e-10 && _ >= -1e-10)) {
            u = !1;
            break e
          }
          u = !0
        }
      }
      if (u) {
        for (s.push([e[l[n]], e[l[o]], e[l[a]]]), h.push([l[n], l[o], l[a]]), n = o, a = o + 1; r > a; n++, a++) l[n] = l[a];
        r--, c = 2 * r
      }
    }
    return i ? h : s
  }, e.Triangulate.area = t, e
}(THREE.FontUtils),self._typeface_js = {
  faces: THREE.FontUtils.faces,
  loadFace: THREE.FontUtils.loadFace
},THREE.typeface_js = self._typeface_js,THREE.Curve = function () {
},THREE.Curve.prototype.getPoint = function (e) {
  return console.log("Warning, getPoint() not implemented!"), null
},THREE.Curve.prototype.getPointAt = function (e) {
  return e = this.getUtoTmapping(e), this.getPoint(e)
},THREE.Curve.prototype.getPoints = function (e) {
  e || (e = 5);
  var t, i = [];
  for (t = 0; e >= t; t++) i.push(this.getPoint(t / e));
  return i
},THREE.Curve.prototype.getSpacedPoints = function (e) {
  e || (e = 5);
  var t, i = [];
  for (t = 0; e >= t; t++) i.push(this.getPointAt(t / e));
  return i
},THREE.Curve.prototype.getLength = function () {
  var e = this.getLengths();
  return e[e.length - 1]
},THREE.Curve.prototype.getLengths = function (e) {
  if (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == e + 1 && !this.needsUpdate) return this.cacheArcLengths;
  this.needsUpdate = !1;
  var t, i, r = [], n = this.getPoint(0), o = 0;
  for (r.push(0), i = 1; e >= i; i++) t = this.getPoint(i / e), o += t.distanceTo(n), r.push(o), n = t;
  return this.cacheArcLengths = r
},THREE.Curve.prototype.updateArcLengths = function () {
  this.needsUpdate = !0, this.getLengths()
},THREE.Curve.prototype.getUtoTmapping = function (e, t) {
  var i, r = this.getLengths(), n = 0, o = r.length;
  i = t ? t : e * r[o - 1];
  for (var a, s = 0, l = o - 1; l >= s;) if (n = Math.floor(s + (l - s) / 2), a = r[n] - i, 0 > a) s = n + 1; else {
    if (!(a > 0)) {
      l = n;
      break
    }
    l = n - 1
  }
  return n = l, r[n] == i ? n / (o - 1) : (s = r[n], r = (n + (i - s) / (r[n + 1] - s)) / (o - 1))
},THREE.Curve.prototype.getTangent = function (e) {
  var t = e - 1e-4;
  return e += 1e-4, 0 > t && (t = 0), e > 1 && (e = 1), t = this.getPoint(t), this.getPoint(e).clone().sub(t).normalize()
},THREE.Curve.prototype.getTangentAt = function (e) {
  return e = this.getUtoTmapping(e), this.getTangent(e)
},THREE.Curve.Utils = {
  tangentQuadraticBezier: function (e, t, i, r) {
    return 2 * (1 - e) * (i - t) + 2 * e * (r - i)
  }, tangentCubicBezier: function (e, t, i, r, n) {
    return -3 * t * (1 - e) * (1 - e) + 3 * i * (1 - e) * (1 - e) - 6 * e * i * (1 - e) + 6 * e * r * (1 - e) - 3 * e * e * r + 3 * e * e * n
  }, tangentSpline: function (e, t, i, r, n) {
    return 6 * e * e - 6 * e + (3 * e * e - 4 * e + 1) + (-6 * e * e + 6 * e) + (3 * e * e - 2 * e)
  }, interpolate: function (e, t, i, r, n) {
    e = .5 * (i - e), r = .5 * (r - t);
    var o = n * n;
    return (2 * t - 2 * i + e + r) * n * o + (-3 * t + 3 * i - 2 * e - r) * o + e * n + t
  }
},THREE.Curve.create = function (e, t) {
  return e.prototype = Object.create(THREE.Curve.prototype), e.prototype.getPoint = t, e
},THREE.CurvePath = function () {
  this.curves = [], this.bends = [], this.autoClose = !1
},THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype),THREE.CurvePath.prototype.add = function (e) {
  this.curves.push(e)
},THREE.CurvePath.prototype.checkConnection = function () {
},THREE.CurvePath.prototype.closePath = function () {
  var e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
  e.equals(t) || this.curves.push(new THREE.LineCurve(t, e))
},THREE.CurvePath.prototype.getPoint = function (e) {
  var t = e * this.getLength(), i = this.getCurveLengths();
  for (e = 0; e < i.length;) {
    if (i[e] >= t) return t = i[e] - t, e = this.curves[e], t = 1 - t / e.getLength(), e.getPointAt(t);
    e++
  }
  return null
},THREE.CurvePath.prototype.getLength = function () {
  var e = this.getCurveLengths();
  return e[e.length - 1]
},THREE.CurvePath.prototype.getCurveLengths = function () {
  if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
  var e, t = [], i = 0, r = this.curves.length;
  for (e = 0; r > e; e++) i += this.curves[e].getLength(), t.push(i);
  return this.cacheLengths = t
},THREE.CurvePath.prototype.getBoundingBox = function () {
  var e, t, i, r, n, o, a = this.getPoints();
  e = t = Number.NEGATIVE_INFINITY, r = n = Number.POSITIVE_INFINITY;
  var s, l, h, c, u = a[0] instanceof THREE.Vector3;
  for (c = u ? new THREE.Vector3 : new THREE.Vector2, l = 0, h = a.length; h > l; l++) s = a[l], s.x > e ? e = s.x : s.x < r && (r = s.x), s.y > t ? t = s.y : s.y < n && (n = s.y), u && (s.z > i ? i = s.z : s.z < o && (o = s.z)), c.add(s);
  return a = {minX: r, minY: n, maxX: e, maxY: t}, u && (a.maxZ = i, a.minZ = o), a
},THREE.CurvePath.prototype.createPointsGeometry = function (e) {
  return e = this.getPoints(e, !0), this.createGeometry(e)
},THREE.CurvePath.prototype.createSpacedPointsGeometry = function (e) {
  return e = this.getSpacedPoints(e, !0), this.createGeometry(e)
},THREE.CurvePath.prototype.createGeometry = function (e) {
  for (var t = new THREE.Geometry, i = 0; i < e.length; i++) t.vertices.push(new THREE.Vector3(e[i].x, e[i].y, e[i].z || 0));
  return t
},THREE.CurvePath.prototype.addWrapPath = function (e) {
  this.bends.push(e)
},THREE.CurvePath.prototype.getTransformedPoints = function (e, t) {
  var i, r, n = this.getPoints(e);
  for (t || (t = this.bends), i = 0, r = t.length; r > i; i++) n = this.getWrapPoints(n, t[i]);
  return n
},THREE.CurvePath.prototype.getTransformedSpacedPoints = function (e, t) {
  var i, r, n = this.getSpacedPoints(e);
  for (t || (t = this.bends), i = 0, r = t.length; r > i; i++) n = this.getWrapPoints(n, t[i]);
  return n
},THREE.CurvePath.prototype.getWrapPoints = function (e, t) {
  var i, r, n, o, a, s, l = this.getBoundingBox();
  for (i = 0, r = e.length; r > i; i++) n = e[i], o = n.x, a = n.y, s = o / l.maxX, s = t.getUtoTmapping(s, o), o = t.getPoint(s), s = t.getTangent(s), s.set(-s.y, s.x).multiplyScalar(a), n.x = o.x + s.x, n.y = o.y + s.y;
  return e
},THREE.Gyroscope = function () {
  THREE.Object3D.call(this)
},THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype),THREE.Gyroscope.prototype.updateMatrixWorld = function (e) {
  this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.quaternionWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.quaternionObject, this.scaleObject), this.matrixWorld.compose(this.translationWorld, this.quaternionObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
  for (var t = 0, i = this.children.length; i > t; t++) this.children[t].updateMatrixWorld(e)
},THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3,THREE.Gyroscope.prototype.translationObject = new THREE.Vector3,THREE.Gyroscope.prototype.quaternionWorld = new THREE.Quaternion,THREE.Gyroscope.prototype.quaternionObject = new THREE.Quaternion,THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3,THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3,THREE.Path = function (e) {
  THREE.CurvePath.call(this), this.actions = [], e && this.fromPoints(e)
},THREE.Path.prototype = Object.create(THREE.CurvePath.prototype),THREE.PathActions = {
  MOVE_TO: "moveTo",
  LINE_TO: "lineTo",
  QUADRATIC_CURVE_TO: "quadraticCurveTo",
  BEZIER_CURVE_TO: "bezierCurveTo",
  CSPLINE_THRU: "splineThru",
  ARC: "arc",
  ELLIPSE: "ellipse"
},THREE.Path.prototype.fromPoints = function (e) {
  this.moveTo(e[0].x, e[0].y);
  for (var t = 1, i = e.length; i > t; t++) this.lineTo(e[t].x, e[t].y)
},THREE.Path.prototype.moveTo = function (e, t) {
  var i = Array.prototype.slice.call(arguments);
  this.actions.push({action: THREE.PathActions.MOVE_TO, args: i})
},THREE.Path.prototype.lineTo = function (e, t) {
  var i = Array.prototype.slice.call(arguments), r = this.actions[this.actions.length - 1].args,
    r = new THREE.LineCurve(new THREE.Vector2(r[r.length - 2], r[r.length - 1]), new THREE.Vector2(e, t));
  this.curves.push(r), this.actions.push({action: THREE.PathActions.LINE_TO, args: i})
},THREE.Path.prototype.quadraticCurveTo = function (e, t, i, r) {
  var n = Array.prototype.slice.call(arguments), o = this.actions[this.actions.length - 1].args,
    o = new THREE.QuadraticBezierCurve(new THREE.Vector2(o[o.length - 2], o[o.length - 1]), new THREE.Vector2(e, t), new THREE.Vector2(i, r));
  this.curves.push(o), this.actions.push({action: THREE.PathActions.QUADRATIC_CURVE_TO, args: n})
},THREE.Path.prototype.bezierCurveTo = function (e, t, i, r, n, o) {
  var a = Array.prototype.slice.call(arguments), s = this.actions[this.actions.length - 1].args,
    s = new THREE.CubicBezierCurve(new THREE.Vector2(s[s.length - 2], s[s.length - 1]), new THREE.Vector2(e, t), new THREE.Vector2(i, r), new THREE.Vector2(n, o));
  this.curves.push(s), this.actions.push({action: THREE.PathActions.BEZIER_CURVE_TO, args: a})
},THREE.Path.prototype.splineThru = function (e) {
  var t = Array.prototype.slice.call(arguments), i = this.actions[this.actions.length - 1].args,
    i = [new THREE.Vector2(i[i.length - 2], i[i.length - 1])];
  Array.prototype.push.apply(i, e), i = new THREE.SplineCurve(i), this.curves.push(i), this.actions.push({
    action: THREE.PathActions.CSPLINE_THRU,
    args: t
  })
},THREE.Path.prototype.arc = function (e, t, i, r, n, o) {
  var a = this.actions[this.actions.length - 1].args;
  this.absarc(e + a[a.length - 2], t + a[a.length - 1], i, r, n, o)
},THREE.Path.prototype.absarc = function (e, t, i, r, n, o) {
  this.absellipse(e, t, i, i, r, n, o)
},THREE.Path.prototype.ellipse = function (e, t, i, r, n, o, a) {
  var s = this.actions[this.actions.length - 1].args;
  this.absellipse(e + s[s.length - 2], t + s[s.length - 1], i, r, n, o, a)
},THREE.Path.prototype.absellipse = function (e, t, i, r, n, o, a) {
  var s = Array.prototype.slice.call(arguments), l = new THREE.EllipseCurve(e, t, i, r, n, o, a);
  this.curves.push(l), l = l.getPoint(1), s.push(l.x), s.push(l.y), this.actions.push({
    action: THREE.PathActions.ELLIPSE,
    args: s
  })
},THREE.Path.prototype.getSpacedPoints = function (e, t) {
  e || (e = 40);
  for (var i = [], r = 0; e > r; r++) i.push(this.getPoint(r / e));
  return i
},THREE.Path.prototype.getPoints = function (e, t) {
  if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(e, t);
  e = e || 12;
  var i, r, n, o, a, s, l, h, c, u, p, d, f, m = [];
  for (i = 0, r = this.actions.length; r > i; i++) switch (n = this.actions[i], o = n.action, n = n.args, o) {
    case THREE.PathActions.MOVE_TO:
      m.push(new THREE.Vector2(n[0], n[1]));
      break;
    case THREE.PathActions.LINE_TO:
      m.push(new THREE.Vector2(n[0], n[1]));
      break;
    case THREE.PathActions.QUADRATIC_CURVE_TO:
      for (a = n[2], s = n[3], c = n[0], u = n[1], 0 < m.length ? (o = m[m.length - 1], p = o.x, d = o.y) : (o = this.actions[i - 1].args, p = o[o.length - 2], d = o[o.length - 1]), n = 1; e >= n; n++) f = n / e, o = THREE.Shape.Utils.b2(f, p, c, a), f = THREE.Shape.Utils.b2(f, d, u, s), m.push(new THREE.Vector2(o, f));
      break;
    case THREE.PathActions.BEZIER_CURVE_TO:
      for (a = n[4], s = n[5], c = n[0], u = n[1], l = n[2], h = n[3], 0 < m.length ? (o = m[m.length - 1], p = o.x, d = o.y) : (o = this.actions[i - 1].args, p = o[o.length - 2], d = o[o.length - 1]), n = 1; e >= n; n++) f = n / e, o = THREE.Shape.Utils.b3(f, p, c, l, a), f = THREE.Shape.Utils.b3(f, d, u, h, s), m.push(new THREE.Vector2(o, f));
      break;
    case THREE.PathActions.CSPLINE_THRU:
      for (o = this.actions[i - 1].args, f = [new THREE.Vector2(o[o.length - 2], o[o.length - 1])], o = e * n[0].length, f = f.concat(n[0]), f = new THREE.SplineCurve(f), n = 1; o >= n; n++) m.push(f.getPointAt(n / o));
      break;
    case THREE.PathActions.ARC:
      for (a = n[0], s = n[1], u = n[2], l = n[3], o = n[4], c = !!n[5], p = o - l, d = 2 * e, n = 1; d >= n; n++) f = n / d, c || (f = 1 - f), f = l + f * p, o = a + u * Math.cos(f), f = s + u * Math.sin(f), m.push(new THREE.Vector2(o, f));
      break;
    case THREE.PathActions.ELLIPSE:
      for (a = n[0], s = n[1], u = n[2], h = n[3], l = n[4], o = n[5], c = !!n[6], p = o - l, d = 2 * e, n = 1; d >= n; n++) f = n / d, c || (f = 1 - f), f = l + f * p, o = a + u * Math.cos(f), f = s + h * Math.sin(f), m.push(new THREE.Vector2(o, f))
  }
  return i = m[m.length - 1], 1e-10 > Math.abs(i.x - m[0].x) && 1e-10 > Math.abs(i.y - m[0].y) && m.splice(m.length - 1, 1), t && m.push(m[0]), m
},THREE.Path.prototype.toShapes = function (e) {
  function t(e, t) {
    for (var i = t.length, r = !1, n = i - 1, o = 0; i > o; n = o++) {
      var a = t[n], s = t[o], l = s.x - a.x, h = s.y - a.y;
      if (1e-10 < Math.abs(h)) {
        if (0 > h && (a = t[o], l = -l, s = t[n], h = -h), !(e.y < a.y || e.y > s.y)) if (e.y == a.y) {
          if (e.x == a.x) return !0
        } else {
          if (n = h * (e.x - a.x) - l * (e.y - a.y), 0 == n) return !0;
          0 > n || (r = !r)
        }
      } else if (e.y == a.y && (s.x <= e.x && e.x <= a.x || a.x <= e.x && e.x <= s.x)) return !0
    }
    return r
  }

  var i, r, n, o, a = [], s = new THREE.Path;
  for (i = 0, r = this.actions.length; r > i; i++) n = this.actions[i], o = n.args, n = n.action, n == THREE.PathActions.MOVE_TO && 0 != s.actions.length && (a.push(s), s = new THREE.Path), s[n].apply(s, o);
  if (0 != s.actions.length && a.push(s), 0 == a.length) return [];
  var l, h, c;
  if (o = [], 1 == a.length) return h = a[0], c = new THREE.Shape, c.actions = h.actions, c.curves = h.curves, o.push(c), o;
  var u = !THREE.Shape.Utils.isClockWise(a[0].getPoints()), u = e ? !u : u;
  c = [], s = [], n = [];
  var p, d = 0;
  for (s[d] = void 0, n[d] = [], i = 0, r = a.length; r > i; i++) h = a[i], p = h.getPoints(), l = THREE.Shape.Utils.isClockWise(p), (l = e ? !l : l) ? (!u && s[d] && d++, s[d] = {
    s: new THREE.Shape,
    p: p
  }, s[d].s.actions = h.actions, s[d].s.curves = h.curves, u && d++, n[d] = []) : n[d].push({h: h, p: p[0]});
  if (1 < s.length) {
    for (i = !1, r = [], e = 0, a = s.length; a > e; e++) c[e] = [];
    for (e = 0, a = s.length; a > e; e++) for (h = n[e], l = 0; l < h.length; l++) {
      for (u = h[l], d = !0, p = 0; p < s.length; p++) t(u.p, s[p].p) && (e != p && r.push({
        froms: e,
        tos: p,
        hole: l
      }), d ? (d = !1, c[p].push(u)) : i = !0);
      d && c[e].push(u)
    }
    0 < r.length && (i || (n = c))
  }
  for (i = 0, r = s.length; r > i; i++) for (c = s[i].s, o.push(c), e = n[i], a = 0, h = e.length; h > a; a++) c.holes.push(e[a].h);
  return o
},THREE.Shape = function () {
  THREE.Path.apply(this, arguments), this.holes = []
},THREE.Shape.prototype = Object.create(THREE.Path.prototype),THREE.Shape.prototype.extrude = function (e) {
  return new THREE.ExtrudeGeometry(this, e)
},THREE.Shape.prototype.makeGeometry = function (e) {
  return new THREE.ShapeGeometry(this, e)
},THREE.Shape.prototype.getPointsHoles = function (e) {
  var t, i = this.holes.length, r = [];
  for (t = 0; i > t; t++) r[t] = this.holes[t].getTransformedPoints(e, this.bends);
  return r
},THREE.Shape.prototype.getSpacedPointsHoles = function (e) {
  var t, i = this.holes.length, r = [];
  for (t = 0; i > t; t++) r[t] = this.holes[t].getTransformedSpacedPoints(e, this.bends);
  return r
},THREE.Shape.prototype.extractAllPoints = function (e) {
  return {shape: this.getTransformedPoints(e), holes: this.getPointsHoles(e)}
},THREE.Shape.prototype.extractPoints = function (e) {
  return this.useSpacedPoints ? this.extractAllSpacedPoints(e) : this.extractAllPoints(e)
},THREE.Shape.prototype.extractAllSpacedPoints = function (e) {
  return {shape: this.getTransformedSpacedPoints(e), holes: this.getSpacedPointsHoles(e)}
},THREE.Shape.Utils = {
  triangulateShape: function (e, t) {
    function i(e, t, i) {
      return e.x != t.x ? e.x < t.x ? e.x <= i.x && i.x <= t.x : t.x <= i.x && i.x <= e.x : e.y < t.y ? e.y <= i.y && i.y <= t.y : t.y <= i.y && i.y <= e.y
    }

    function r(e, t, r, n, o) {
      var a = t.x - e.x, s = t.y - e.y, l = n.x - r.x, h = n.y - r.y, c = e.x - r.x, u = e.y - r.y, p = s * l - a * h,
        d = s * c - a * u;
      if (1e-10 < Math.abs(p)) {
        if (p > 0) {
          if (0 > d || d > p) return [];
          if (l = h * c - l * u, 0 > l || l > p) return []
        } else {
          if (d > 0 || p > d) return [];
          if (l = h * c - l * u, l > 0 || p > l) return []
        }
        return 0 == l ? !o || 0 != d && d != p ? [e] : [] : l == p ? !o || 0 != d && d != p ? [t] : [] : 0 == d ? [r] : d == p ? [n] : (o = l / p, [{
          x: e.x + o * a,
          y: e.y + o * s
        }])
      }
      return 0 != d || h * c != l * u ? [] : (s = 0 == a && 0 == s, l = 0 == l && 0 == h, s && l ? e.x != r.x || e.y != r.y ? [] : [e] : s ? i(r, n, e) ? [e] : [] : l ? i(e, t, r) ? [r] : [] : (0 != a ? (e.x < t.x ? (a = e, l = e.x, s = t, e = t.x) : (a = t, l = t.x, s = e, e = e.x), r.x < n.x ? (t = r, p = r.x, h = n, r = n.x) : (t = n, p = n.x, h = r, r = r.x)) : (e.y < t.y ? (a = e, l = e.y, s = t, e = t.y) : (a = t, l = t.y, s = e, e = e.y), r.y < n.y ? (t = r, p = r.y, h = n, r = n.y) : (t = n, p = n.y, h = r, r = r.y)), p >= l ? p > e ? [] : e == p ? o ? [] : [t] : r >= e ? [t, s] : [t, h] : l > r ? [] : l == r ? o ? [] : [a] : r >= e ? [a, s] : [a, h]))
    }

    function n(e, t, i, r) {
      var n = t.x - e.x, o = t.y - e.y;
      t = i.x - e.x, i = i.y - e.y;
      var a = r.x - e.x;
      return r = r.y - e.y, e = n * i - o * t, n = n * r - o * a, 1e-10 < Math.abs(e) ? (t = a * i - r * t, e > 0 ? n >= 0 && t >= 0 : n >= 0 || t >= 0) : n > 0
    }

    var o, a, s, l, h, c = {};
    for (s = e.concat(), o = 0, a = t.length; a > o; o++) Array.prototype.push.apply(s, t[o]);
    for (o = 0, a = s.length; a > o; o++) h = s[o].x + ":" + s[o].y, void 0 !== c[h] && console.log("Duplicate point", h), c[h] = o;
    o = function (e, t) {
      function i(e, t) {
        var i = E.length - 1, r = e - 1;
        0 > r && (r = i);
        var o = e + 1;
        return o > i && (o = 0), (i = n(E[e], E[r], E[o], s[t])) ? (i = s.length - 1, r = t - 1, 0 > r && (r = i), o = t + 1, o > i && (o = 0), (i = n(s[t], s[r], s[o], E[e])) ? !0 : !1) : !1
      }

      function o(e, t) {
        var i, n;
        for (i = 0; i < E.length; i++) if (n = i + 1, n %= E.length, n = r(e, t, E[i], E[n], !0), 0 < n.length) return !0;
        return !1
      }

      function a(e, i) {
        var n, o, a, s;
        for (n = 0; n < g.length; n++) for (o = t[g[n]], a = 0; a < o.length; a++) if (s = a + 1, s %= o.length, s = r(e, i, o[a], o[s], !0), 0 < s.length) return !0;
        return !1
      }

      var s, l, h, c, u, p, d, f, m, E = e.concat(), g = [], v = [], y = 0;
      for (l = t.length; l > y; y++) g.push(y);
      for (var T = 2 * g.length; 0 < g.length;) {
        if (T--, 0 > T) {
          console.log("Infinite Loop! Holes left:" + g.length + ", Probably Hole outside Shape!");
          break
        }
        for (h = 0; h < E.length; h++) {
          for (c = E[h], l = -1, y = 0; y < g.length; y++) if (u = g[y], p = c.x + ":" + c.y + ":" + u, void 0 === v[p]) {
            for (s = t[u], d = 0; d < s.length; d++) if (u = s[d], i(h, d) && !o(c, u) && !a(c, u)) {
              l = d, g.splice(y, 1), u = E.slice(0, h + 1), d = E.slice(h), f = s.slice(l), m = s.slice(0, l + 1), E = u.concat(f).concat(m).concat(d);
              break
            }
            if (l >= 0) break;
            v[p] = !0
          }
          if (l >= 0) break
        }
      }
      return E
    }(e, t);
    var u = THREE.FontUtils.Triangulate(o, !1);
    for (o = 0, a = u.length; a > o; o++) for (l = u[o], s = 0; 3 > s; s++) h = l[s].x + ":" + l[s].y, h = c[h], void 0 !== h && (l[s] = h);
    return u.concat()
  }, isClockWise: function (e) {
    return 0 > THREE.FontUtils.Triangulate.area(e)
  }, b2p0: function (e, t) {
    var i = 1 - e;
    return i * i * t
  }, b2p1: function (e, t) {
    return 2 * (1 - e) * e * t
  }, b2p2: function (e, t) {
    return e * e * t
  }, b2: function (e, t, i, r) {
    return this.b2p0(e, t) + this.b2p1(e, i) + this.b2p2(e, r)
  }, b3p0: function (e, t) {
    var i = 1 - e;
    return i * i * i * t
  }, b3p1: function (e, t) {
    var i = 1 - e;
    return 3 * i * i * e * t
  }, b3p2: function (e, t) {
    return 3 * (1 - e) * e * e * t
  }, b3p3: function (e, t) {
    return e * e * e * t
  }, b3: function (e, t, i, r, n) {
    return this.b3p0(e, t) + this.b3p1(e, i) + this.b3p2(e, r) + this.b3p3(e, n)
  }
},THREE.LineCurve = function (e, t) {
  this.v1 = e, this.v2 = t
},THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype),THREE.LineCurve.prototype.getPoint = function (e) {
  var t = this.v2.clone().sub(this.v1);
  return t.multiplyScalar(e).add(this.v1), t
},THREE.LineCurve.prototype.getPointAt = function (e) {
  return this.getPoint(e)
},THREE.LineCurve.prototype.getTangent = function (e) {
  return this.v2.clone().sub(this.v1).normalize()
},THREE.QuadraticBezierCurve = function (e, t, i) {
  this.v0 = e, this.v1 = t, this.v2 = i
},THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype),THREE.QuadraticBezierCurve.prototype.getPoint = function (e) {
  var t;
  return t = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), e = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), new THREE.Vector2(t, e)
},THREE.QuadraticBezierCurve.prototype.getTangent = function (e) {
  var t;
  return t = THREE.Curve.Utils.tangentQuadraticBezier(e, this.v0.x, this.v1.x, this.v2.x), e = THREE.Curve.Utils.tangentQuadraticBezier(e, this.v0.y, this.v1.y, this.v2.y), t = new THREE.Vector2(t, e), t.normalize(), t
},THREE.CubicBezierCurve = function (e, t, i, r) {
  this.v0 = e, this.v1 = t, this.v2 = i, this.v3 = r
},THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype),THREE.CubicBezierCurve.prototype.getPoint = function (e) {
  var t;
  return t = THREE.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e = THREE.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new THREE.Vector2(t, e)
},THREE.CubicBezierCurve.prototype.getTangent = function (e) {
  var t;
  return t = THREE.Curve.Utils.tangentCubicBezier(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e = THREE.Curve.Utils.tangentCubicBezier(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), t = new THREE.Vector2(t, e), t.normalize(), t
},THREE.SplineCurve = function (e) {
  this.points = void 0 == e ? [] : e
},THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype),THREE.SplineCurve.prototype.getPoint = function (e) {
  var t, i = new THREE.Vector2, r = [], n = this.points;
  return t = (n.length - 1) * e, e = Math.floor(t), t -= e, r[0] = 0 == e ? e : e - 1, r[1] = e, r[2] = e > n.length - 2 ? n.length - 1 : e + 1, r[3] = e > n.length - 3 ? n.length - 1 : e + 2, i.x = THREE.Curve.Utils.interpolate(n[r[0]].x, n[r[1]].x, n[r[2]].x, n[r[3]].x, t), i.y = THREE.Curve.Utils.interpolate(n[r[0]].y, n[r[1]].y, n[r[2]].y, n[r[3]].y, t), i
},THREE.EllipseCurve = function (e, t, i, r, n, o, a) {
  this.aX = e, this.aY = t, this.xRadius = i, this.yRadius = r, this.aStartAngle = n, this.aEndAngle = o, this.aClockwise = a
},THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype),THREE.EllipseCurve.prototype.getPoint = function (e) {
  var t;
  return t = this.aEndAngle - this.aStartAngle, 0 > t && (t += 2 * Math.PI), t > 2 * Math.PI && (t -= 2 * Math.PI), t = !0 === this.aClockwise ? this.aEndAngle + (1 - e) * (2 * Math.PI - t) : this.aStartAngle + e * t, e = this.aX + this.xRadius * Math.cos(t), t = this.aY + this.yRadius * Math.sin(t), new THREE.Vector2(e, t)
},THREE.ArcCurve = function (e, t, i, r, n, o) {
  THREE.EllipseCurve.call(this, e, t, i, i, r, n, o)
},THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype),THREE.LineCurve3 = THREE.Curve.create(function (e, t) {
  this.v1 = e, this.v2 = t
}, function (e) {
  var t = new THREE.Vector3;
  return t.subVectors(this.v2, this.v1), t.multiplyScalar(e), t.add(this.v1), t
}),THREE.QuadraticBezierCurve3 = THREE.Curve.create(function (e, t, i) {
  this.v0 = e, this.v1 = t, this.v2 = i
}, function (e) {
  var t, i;
  return t = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x), i = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y), e = THREE.Shape.Utils.b2(e, this.v0.z, this.v1.z, this.v2.z), new THREE.Vector3(t, i, e)
}),THREE.CubicBezierCurve3 = THREE.Curve.create(function (e, t, i, r) {
  this.v0 = e, this.v1 = t, this.v2 = i, this.v3 = r
}, function (e) {
  var t, i;
  return t = THREE.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x), i = THREE.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y), e = THREE.Shape.Utils.b3(e, this.v0.z, this.v1.z, this.v2.z, this.v3.z), new THREE.Vector3(t, i, e)
}),THREE.SplineCurve3 = THREE.Curve.create(function (e) {
  this.points = void 0 == e ? [] : e
}, function (e) {
  var t, i = new THREE.Vector3, r = [], n = this.points;
  e *= n.length - 1, t = Math.floor(e), e -= t, r[0] = 0 == t ? t : t - 1, r[1] = t, r[2] = t > n.length - 2 ? n.length - 1 : t + 1, r[3] = t > n.length - 3 ? n.length - 1 : t + 2, t = n[r[0]];
  var o = n[r[1]], a = n[r[2]], r = n[r[3]];
  return i.x = THREE.Curve.Utils.interpolate(t.x, o.x, a.x, r.x, e), i.y = THREE.Curve.Utils.interpolate(t.y, o.y, a.y, r.y, e), i.z = THREE.Curve.Utils.interpolate(t.z, o.z, a.z, r.z, e), i
}),THREE.ClosedSplineCurve3 = THREE.Curve.create(function (e) {
  this.points = void 0 == e ? [] : e
}, function (e) {
  var t, i = new THREE.Vector3, r = [], n = this.points;
  return t = (n.length - 0) * e, e = Math.floor(t), t -= e, e += e > 0 ? 0 : (Math.floor(Math.abs(e) / n.length) + 1) * n.length, r[0] = (e - 1) % n.length, r[1] = e % n.length, r[2] = (e + 1) % n.length, r[3] = (e + 2) % n.length, i.x = THREE.Curve.Utils.interpolate(n[r[0]].x, n[r[1]].x, n[r[2]].x, n[r[3]].x, t), i.y = THREE.Curve.Utils.interpolate(n[r[0]].y, n[r[1]].y, n[r[2]].y, n[r[3]].y, t), i.z = THREE.Curve.Utils.interpolate(n[r[0]].z, n[r[1]].z, n[r[2]].z, n[r[3]].z, t), i
}),THREE.AnimationHandler = function () {
  var e = [], t = {}, i = {
    update: function (t) {
      for (var i = 0; i < e.length; i++) e[i].update(t)
    }, addToUpdate: function (t) {
      -1 === e.indexOf(t) && e.push(t)
    }, removeFromUpdate: function (t) {
      t = e.indexOf(t), -1 !== t && e.splice(t, 1)
    }, add: function (e) {
      if (void 0 !== t[e.name] && console.log("THREE.AnimationHandler.add: Warning! " + e.name + " already exists in library. Overwriting."), t[e.name] = e, !0 !== e.initialized) {
        for (var i = 0; i < e.hierarchy.length; i++) {
          for (var r = 0; r < e.hierarchy[i].keys.length; r++) if (0 > e.hierarchy[i].keys[r].time && (e.hierarchy[i].keys[r].time = 0), void 0 !== e.hierarchy[i].keys[r].rot && !(e.hierarchy[i].keys[r].rot instanceof THREE.Quaternion)) {
            var n = e.hierarchy[i].keys[r].rot;
            e.hierarchy[i].keys[r].rot = (new THREE.Quaternion).fromArray(n)
          }
          if (e.hierarchy[i].keys.length && void 0 !== e.hierarchy[i].keys[0].morphTargets) {
            for (n = {}, r = 0; r < e.hierarchy[i].keys.length; r++) for (var o = 0; o < e.hierarchy[i].keys[r].morphTargets.length; o++) {
              var a = e.hierarchy[i].keys[r].morphTargets[o];
              n[a] = -1
            }
            for (e.hierarchy[i].usedMorphTargets = n, r = 0; r < e.hierarchy[i].keys.length; r++) {
              var s = {};
              for (a in n) {
                for (o = 0; o < e.hierarchy[i].keys[r].morphTargets.length; o++) if (e.hierarchy[i].keys[r].morphTargets[o] === a) {
                  s[a] = e.hierarchy[i].keys[r].morphTargetsInfluences[o];
                  break
                }
                o === e.hierarchy[i].keys[r].morphTargets.length && (s[a] = 0)
              }
              e.hierarchy[i].keys[r].morphTargetsInfluences = s
            }
          }
          for (r = 1; r < e.hierarchy[i].keys.length; r++) e.hierarchy[i].keys[r].time === e.hierarchy[i].keys[r - 1].time && (e.hierarchy[i].keys.splice(r, 1), r--);
          for (r = 0; r < e.hierarchy[i].keys.length; r++) e.hierarchy[i].keys[r].index = r
        }
        e.initialized = !0
      }
    }, remove: function (e) {
      void 0 === t[e] && console.log("THREE.AnimationHandler.add: Warning! " + e + " doesn't exists in library. Doing nothing."), t[e] = void 0
    }, get: function (e) {
      return "string" == typeof e ? t[e] ? t[e] : null : void 0
    }, parse: function (e) {
      var t = [];
      if (e instanceof THREE.SkinnedMesh) for (var i = 0; i < e.bones.length; i++) t.push(e.bones[i]); else r(e, t);
      return t
    }
  }, r = function (e, t) {
    t.push(e);
    for (var i = 0; i < e.children.length; i++) r(e.children[i], t)
  };
  return i.LINEAR = 0, i.CATMULLROM = 1, i.CATMULLROM_FORWARD = 2, i
}(),THREE.Animation = function (e, t) {
  this.root = e, this.data = THREE.AnimationHandler.get(t), this.hierarchy = THREE.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = this.isPaused = !0, this.interpolationType = THREE.AnimationHandler.LINEAR
},THREE.Animation.prototype.play = function (e) {
  this.currentTime = void 0 !== e ? e : 0, !1 === this.isPlaying && (this.isPlaying = !0, this.reset(), this.update(0)), this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
},THREE.Animation.prototype.pause = function () {
  !0 === this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
},THREE.Animation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.removeFromUpdate(this)
},THREE.Animation.prototype.reset = function () {
  for (var e = 0, t = this.hierarchy.length; t > e; e++) {
    var i = this.hierarchy[e];
    i.matrixAutoUpdate = !0, void 0 === i.animationCache && (i.animationCache = {}, i.animationCache.prevKey = {
      pos: 0,
      rot: 0,
      scl: 0
    }, i.animationCache.nextKey = {
      pos: 0,
      rot: 0,
      scl: 0
    }, i.animationCache.originalMatrix = i instanceof THREE.Bone ? i.skinMatrix : i.matrix);
    var r = i.animationCache.prevKey, i = i.animationCache.nextKey;
    r.pos = this.data.hierarchy[e].keys[0], r.rot = this.data.hierarchy[e].keys[0], r.scl = this.data.hierarchy[e].keys[0], i.pos = this.getNextKeyWith("pos", e, 1), i.rot = this.getNextKeyWith("rot", e, 1), i.scl = this.getNextKeyWith("scl", e, 1)
  }
},THREE.Animation.prototype.update = function () {
  var e = [], t = new THREE.Vector3, i = function (e, t) {
    var i, n, o, a, s, l, h = [], c = [];
    return i = (e.length - 1) * t, n = Math.floor(i), i -= n, h[0] = 0 === n ? n : n - 1, h[1] = n, h[2] = n > e.length - 2 ? n : n + 1, h[3] = n > e.length - 3 ? n : n + 2, n = e[h[0]], a = e[h[1]], s = e[h[2]], l = e[h[3]], h = i * i, o = i * h, c[0] = r(n[0], a[0], s[0], l[0], i, h, o), c[1] = r(n[1], a[1], s[1], l[1], i, h, o), c[2] = r(n[2], a[2], s[2], l[2], i, h, o), c
  }, r = function (e, t, i, r, n, o, a) {
    return e = .5 * (i - e), r = .5 * (r - t), (2 * (t - i) + e + r) * a + (-3 * (t - i) - 2 * e - r) * o + e * n + t
  };
  return function (r) {
    if (!1 !== this.isPlaying) {
      this.currentTime += r * this.timeScale;
      var n;
      r = ["pos", "rot", "scl"];
      var o = this.data.length;
      if (!0 === this.loop && this.currentTime > o) this.currentTime %= o, this.reset(); else if (!1 === this.loop && this.currentTime > o) return void this.stop();
      this.currentTime = Math.min(this.currentTime, o);
      for (var o = 0, a = this.hierarchy.length; a > o; o++) for (var s = this.hierarchy[o], l = s.animationCache, h = 0; 3 > h; h++) {
        n = r[h];
        var c = l.prevKey[n], u = l.nextKey[n];
        if (u.time <= this.currentTime) {
          for (c = this.data.hierarchy[o].keys[0], u = this.getNextKeyWith(n, o, 1); u.time < this.currentTime && u.index > c.index;) c = u, u = this.getNextKeyWith(n, o, u.index + 1);
          l.prevKey[n] = c, l.nextKey[n] = u
        }
        s.matrixAutoUpdate = !0, s.matrixWorldNeedsUpdate = !0;
        var p = (this.currentTime - c.time) / (u.time - c.time), d = c[n], f = u[n];
        0 > p && (p = 0), p > 1 && (p = 1), "pos" === n ? (n = s.position, this.interpolationType === THREE.AnimationHandler.LINEAR ? (n.x = d[0] + (f[0] - d[0]) * p, n.y = d[1] + (f[1] - d[1]) * p, n.z = d[2] + (f[2] - d[2]) * p) : (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) && (e[0] = this.getPrevKeyWith("pos", o, c.index - 1).pos, e[1] = d, e[2] = f, e[3] = this.getNextKeyWith("pos", o, u.index + 1).pos, p = .33 * p + .33, c = i(e, p), n.x = c[0], n.y = c[1], n.z = c[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (p = i(e, 1.01 * p), t.set(p[0], p[1], p[2]), t.sub(n), t.y = 0, t.normalize(), n = Math.atan2(t.x, t.z), s.rotation.set(0, n, 0)))) : "rot" === n ? THREE.Quaternion.slerp(d, f, s.quaternion, p) : "scl" === n && (n = s.scale, n.x = d[0] + (f[0] - d[0]) * p, n.y = d[1] + (f[1] - d[1]) * p, n.z = d[2] + (f[2] - d[2]) * p)
      }
    }
  }
}(),THREE.Animation.prototype.getNextKeyWith = function (e, t, i) {
  var r = this.data.hierarchy[t].keys;
  for (i = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? i < r.length - 1 ? i : r.length - 1 : i % r.length; i < r.length; i++) if (void 0 !== r[i][e]) return r[i];
  return this.data.hierarchy[t].keys[0]
},THREE.Animation.prototype.getPrevKeyWith = function (e, t, i) {
  var r = this.data.hierarchy[t].keys;
  for (i = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? i > 0 ? i : 0 : i >= 0 ? i : i + r.length; i >= 0; i--) if (void 0 !== r[i][e]) return r[i];
  return this.data.hierarchy[t].keys[r.length - 1]
},THREE.KeyFrameAnimation = function (e, t) {
  this.root = e, this.data = THREE.AnimationHandler.get(t), this.hierarchy = THREE.AnimationHandler.parse(e), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.loop = this.isPaused = !0;
  for (var i = 0, r = this.hierarchy.length; r > i; i++) {
    var n = this.data.hierarchy[i].sids, o = this.hierarchy[i];
    if (this.data.hierarchy[i].keys.length && n) {
      for (var a = 0; a < n.length; a++) {
        var s = n[a], l = this.getNextKeyWith(s, i, 0);
        l && l.apply(s)
      }
      o.matrixAutoUpdate = !1, this.data.hierarchy[i].node.updateMatrix(), o.matrixWorldNeedsUpdate = !0
    }
  }
},THREE.KeyFrameAnimation.prototype.play = function (e) {
  if (this.currentTime = void 0 !== e ? e : 0, !1 === this.isPlaying) {
    this.isPlaying = !0;
    var t, i, r = this.hierarchy.length;
    for (e = 0; r > e; e++) t = this.hierarchy[e], i = this.data.hierarchy[e], void 0 === i.animationCache && (i.animationCache = {}, i.animationCache.prevKey = null, i.animationCache.nextKey = null, i.animationCache.originalMatrix = t instanceof THREE.Bone ? t.skinMatrix : t.matrix), t = this.data.hierarchy[e].keys, t.length && (i.animationCache.prevKey = t[0], i.animationCache.nextKey = t[1], this.startTime = Math.min(t[0].time, this.startTime), this.endTime = Math.max(t[t.length - 1].time, this.endTime));
    this.update(0)
  }
  this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
},THREE.KeyFrameAnimation.prototype.pause = function () {
  this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
},THREE.KeyFrameAnimation.prototype.stop = function () {
  this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.removeFromUpdate(this);
  for (var e = 0; e < this.data.hierarchy.length; e++) {
    var t = this.hierarchy[e], i = this.data.hierarchy[e];
    if (void 0 !== i.animationCache) {
      var r = i.animationCache.originalMatrix;
      t instanceof THREE.Bone ? (r.copy(t.skinMatrix), t.skinMatrix = r) : (r.copy(t.matrix), t.matrix = r), delete i.animationCache
    }
  }
},THREE.KeyFrameAnimation.prototype.update = function (e) {
  if (!1 !== this.isPlaying) {
    this.currentTime += e * this.timeScale, e = this.data.length, !0 === this.loop && this.currentTime > e && (this.currentTime %= e), this.currentTime = Math.min(this.currentTime, e), e = 0;
    for (var t = this.hierarchy.length; t > e; e++) {
      var i = this.hierarchy[e], r = this.data.hierarchy[e], n = r.keys, r = r.animationCache;
      if (n.length) {
        var o = r.prevKey, a = r.nextKey;
        if (a.time <= this.currentTime) {
          for (; a.time < this.currentTime && a.index > o.index;) o = a, a = n[o.index + 1];
          r.prevKey = o, r.nextKey = a
        }
        a.time >= this.currentTime ? o.interpolate(a, this.currentTime) : o.interpolate(a, a.time), this.data.hierarchy[e].node.updateMatrix(), i.matrixWorldNeedsUpdate = !0
      }
    }
  }
},THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (e, t, i) {
  for (t = this.data.hierarchy[t].keys, i %= t.length; i < t.length; i++) if (t[i].hasTarget(e)) return t[i];
  return t[0]
},THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (e, t, i) {
  for (t = this.data.hierarchy[t].keys, i = i >= 0 ? i : i + t.length; i >= 0; i--) if (t[i].hasTarget(e)) return t[i];
  return t[t.length - 1]
},THREE.MorphAnimation = function (e) {
  this.mesh = e, this.frames = e.morphTargetInfluences.length, this.currentTime = 0, this.duration = 1e3, this.loop = !0, this.isPlaying = !1
},THREE.MorphAnimation.prototype = {
  play: function () {
    this.isPlaying = !0
  }, pause: function () {
    this.isPlaying = !1
  }, update: function () {
    var e = 0, t = 0;
    return function (i) {
      if (!1 !== this.isPlaying) {
        this.currentTime += i, !0 === this.loop && this.currentTime > this.duration && (this.currentTime %= this.duration), this.currentTime = Math.min(this.currentTime, this.duration), i = this.duration / this.frames;
        var r = Math.floor(this.currentTime / i);
        r != t && (this.mesh.morphTargetInfluences[e] = 0, this.mesh.morphTargetInfluences[t] = 1, this.mesh.morphTargetInfluences[r] = 0, e = t, t = r), this.mesh.morphTargetInfluences[r] = this.currentTime % i / i, this.mesh.morphTargetInfluences[e] = 1 - this.mesh.morphTargetInfluences[r]
      }
    }
  }()
},THREE.CubeCamera = function (e, t, i) {
  THREE.Object3D.call(this);
  var r = new THREE.PerspectiveCamera(90, 1, e, t);
  r.up.set(0, -1, 0), r.lookAt(new THREE.Vector3(1, 0, 0)), this.add(r);
  var n = new THREE.PerspectiveCamera(90, 1, e, t);
  n.up.set(0, -1, 0), n.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(n);
  var o = new THREE.PerspectiveCamera(90, 1, e, t);
  o.up.set(0, 0, 1), o.lookAt(new THREE.Vector3(0, 1, 0)), this.add(o);
  var a = new THREE.PerspectiveCamera(90, 1, e, t);
  a.up.set(0, 0, -1), a.lookAt(new THREE.Vector3(0, -1, 0)), this.add(a);
  var s = new THREE.PerspectiveCamera(90, 1, e, t);
  s.up.set(0, -1, 0), s.lookAt(new THREE.Vector3(0, 0, 1)), this.add(s);
  var l = new THREE.PerspectiveCamera(90, 1, e, t);
  l.up.set(0, -1, 0), l.lookAt(new THREE.Vector3(0, 0, -1)), this.add(l), this.renderTarget = new THREE.WebGLRenderTargetCube(i, i, {
    format: THREE.RGBFormat,
    magFilter: THREE.LinearFilter,
    minFilter: THREE.LinearFilter
  }), this.updateCubeMap = function (e, t) {
    var i = this.renderTarget, h = i.generateMipmaps;
    i.generateMipmaps = !1, i.activeCubeFace = 0, e.render(t, r, i), i.activeCubeFace = 1, e.render(t, n, i), i.activeCubeFace = 2, e.render(t, o, i), i.activeCubeFace = 3, e.render(t, a, i), i.activeCubeFace = 4, e.render(t, s, i), i.generateMipmaps = h, i.activeCubeFace = 5, e.render(t, l, i)
  }
},THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype),THREE.CombinedCamera = function (e, t, i, r, n, o, a) {
  THREE.Camera.call(this), this.fov = i, this.left = -e / 2, this.right = e / 2, this.top = t / 2, this.bottom = -t / 2, this.cameraO = new THREE.OrthographicCamera(e / -2, e / 2, t / 2, t / -2, o, a), this.cameraP = new THREE.PerspectiveCamera(i, e / t, r, n), this.zoom = 1, this.toPerspective()
},THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype),THREE.CombinedCamera.prototype.toPerspective = function () {
  this.near = this.cameraP.near, this.far = this.cameraP.far, this.cameraP.fov = this.fov / this.zoom, this.cameraP.updateProjectionMatrix(), this.projectionMatrix = this.cameraP.projectionMatrix, this.inPerspectiveMode = !0, this.inOrthographicMode = !1
},THREE.CombinedCamera.prototype.toOrthographic = function () {
  var e = this.cameraP.aspect, t = (this.cameraP.near + this.cameraP.far) / 2, t = Math.tan(this.fov / 2) * t,
    e = 2 * t * e / 2, t = t / this.zoom, e = e / this.zoom;
  this.cameraO.left = -e, this.cameraO.right = e, this.cameraO.top = t, this.cameraO.bottom = -t, this.cameraO.updateProjectionMatrix(), this.near = this.cameraO.near, this.far = this.cameraO.far, this.projectionMatrix = this.cameraO.projectionMatrix, this.inPerspectiveMode = !1, this.inOrthographicMode = !0
},THREE.CombinedCamera.prototype.setSize = function (e, t) {
  this.cameraP.aspect = e / t, this.left = -e / 2, this.right = e / 2, this.top = t / 2, this.bottom = -t / 2
},THREE.CombinedCamera.prototype.setFov = function (e) {
  this.fov = e, this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
},THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
  this.inPerspectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
},THREE.CombinedCamera.prototype.setLens = function (e, t) {
  void 0 === t && (t = 24);
  var i = 2 * THREE.Math.radToDeg(Math.atan(t / (2 * e)));
  return this.setFov(i), i
},THREE.CombinedCamera.prototype.setZoom = function (e) {
  this.zoom = e, this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
},THREE.CombinedCamera.prototype.toFrontView = function () {
  this.rotation.x = 0, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
},THREE.CombinedCamera.prototype.toBackView = function () {
  this.rotation.x = 0, this.rotation.y = Math.PI, this.rotation.z = 0, this.rotationAutoUpdate = !1
},THREE.CombinedCamera.prototype.toLeftView = function () {
  this.rotation.x = 0, this.rotation.y = -Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
},THREE.CombinedCamera.prototype.toRightView = function () {
  this.rotation.x = 0, this.rotation.y = Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
},THREE.CombinedCamera.prototype.toTopView = function () {
  this.rotation.x = -Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
},THREE.CombinedCamera.prototype.toBottomView = function () {
  this.rotation.x = Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
},THREE.BoxGeometry = function (e, t, i, r, n, o) {
  function a(e, t, i, r, n, o, a, l) {
    var h, c = s.widthSegments, u = s.heightSegments, p = n / 2, d = o / 2, f = s.vertices.length;
    "x" === e && "y" === t || "y" === e && "x" === t ? h = "z" : "x" === e && "z" === t || "z" === e && "x" === t ? (h = "y", u = s.depthSegments) : ("z" === e && "y" === t || "y" === e && "z" === t) && (h = "x", c = s.depthSegments);
    var m = c + 1, E = u + 1, g = n / c, v = o / u, y = new THREE.Vector3;
    for (y[h] = a > 0 ? 1 : -1, n = 0; E > n; n++) for (o = 0; m > o; o++) {
      var T = new THREE.Vector3;
      T[e] = (o * g - p) * i, T[t] = (n * v - d) * r, T[h] = a, s.vertices.push(T)
    }
    for (n = 0; u > n; n++) for (o = 0; c > o; o++) d = o + m * n, e = o + m * (n + 1), t = o + 1 + m * (n + 1), i = o + 1 + m * n, r = new THREE.Vector2(o / c, 1 - n / u), a = new THREE.Vector2(o / c, 1 - (n + 1) / u), h = new THREE.Vector2((o + 1) / c, 1 - (n + 1) / u), p = new THREE.Vector2((o + 1) / c, 1 - n / u), d = new THREE.Face3(d + f, e + f, i + f), d.normal.copy(y), d.vertexNormals.push(y.clone(), y.clone(), y.clone()), d.materialIndex = l, s.faces.push(d), s.faceVertexUvs[0].push([r, a, p]), d = new THREE.Face3(e + f, t + f, i + f), d.normal.copy(y), d.vertexNormals.push(y.clone(), y.clone(), y.clone()), d.materialIndex = l, s.faces.push(d), s.faceVertexUvs[0].push([a.clone(), h, p.clone()])
  }

  THREE.Geometry.call(this), this.parameters = {
    width: e,
    height: t,
    depth: i,
    widthSegments: r,
    heightSegments: n,
    depthSegments: o
  }, this.widthSegments = r || 1, this.heightSegments = n || 1, this.depthSegments = o || 1;
  var s = this;
  r = e / 2, n = t / 2, o = i / 2, a("z", "y", -1, -1, i, t, r, 0), a("z", "y", 1, -1, i, t, -r, 1), a("x", "z", 1, 1, e, i, n, 2), a("x", "z", 1, -1, e, i, -n, 3), a("x", "y", 1, -1, e, t, o, 4), a("x", "y", -1, -1, e, t, -o, 5), this.mergeVertices()
},THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.CircleGeometry = function (e, t, i, r) {
  this.parameters = {
    radius: e,
    segments: t,
    thetaStart: i,
    thetaLength: r
  }, e = e || 50, t = void 0 !== t ? Math.max(3, t) : 8, i = void 0 !== i ? i : 0, r = void 0 !== r ? r : 2 * Math.PI;
  var n = t + 2, o = new Uint16Array(3 * t), a = new Float32Array(3 * n), s = new Float32Array(3 * n),
    n = new Float32Array(2 * n);
  s[2] = 1, n[0] = .5, n[1] = .5;
  for (var l = 0, h = 2, c = 3, u = 0; t >= u; u++) {
    var p = i + u / t * r, d = e * Math.cos(p), p = e * Math.sin(p);
    a[c] = d, a[c + 1] = p, s[c + 2] = 1, n[h] = (d / e + 1) / 2, n[h + 1] = (p / e + 1) / 2, h += 2, c += 3, o[l] = 0, o[l + 1] = u + 1, o[l + 2] = u + 2, l += 3
  }
  THREE.IndexedGeometry2.call(this, o, a, s, n), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, e)
},THREE.CircleGeometry.prototype = Object.create(THREE.IndexedGeometry2.prototype),THREE.CubeGeometry = function (e, t, i, r, n, o) {
  return console.warn("DEPRECATED: THREE.CubeGeometry is deprecated. Use THREE.BoxGeometry instead."), new THREE.BoxGeometry(e, t, i, r, n, o)
},THREE.CylinderGeometry = function (e, t, i, r, n, o) {
  THREE.Geometry.call(this), this.parameters = {
    radiusTop: e,
    radiusBottom: t,
    height: i,
    radialSegments: r,
    heightSegments: n,
    openEnded: o
  }, e = void 0 !== e ? e : 20, t = void 0 !== t ? t : 20, i = void 0 !== i ? i : 100, r = r || 8, n = n || 1, o = void 0 !== o ? o : !1;
  var a, s, l = i / 2, h = [], c = [];
  for (s = 0; n >= s; s++) {
    var u = [], p = [], d = s / n, f = d * (t - e) + e;
    for (a = 0; r >= a; a++) {
      var m = a / r, E = new THREE.Vector3;
      E.x = f * Math.sin(m * Math.PI * 2), E.y = -d * i + l, E.z = f * Math.cos(m * Math.PI * 2), this.vertices.push(E), u.push(this.vertices.length - 1), p.push(new THREE.Vector2(m, 1 - d))
    }
    h.push(u), c.push(p)
  }
  for (i = (t - e) / i, a = 0; r > a; a++) for (0 !== e ? (u = this.vertices[h[0][a]].clone(), p = this.vertices[h[0][a + 1]].clone()) : (u = this.vertices[h[1][a]].clone(), p = this.vertices[h[1][a + 1]].clone()), u.setY(Math.sqrt(u.x * u.x + u.z * u.z) * i).normalize(), p.setY(Math.sqrt(p.x * p.x + p.z * p.z) * i).normalize(), s = 0; n > s; s++) {
    var d = h[s][a], f = h[s + 1][a], m = h[s + 1][a + 1], E = h[s][a + 1], g = u.clone(), v = u.clone(), y = p.clone(),
      T = p.clone(), x = c[s][a].clone(), R = c[s + 1][a].clone(), b = c[s + 1][a + 1].clone(), H = c[s][a + 1].clone();
    this.faces.push(new THREE.Face3(d, f, E, [g, v, T])), this.faceVertexUvs[0].push([x, R, H]), this.faces.push(new THREE.Face3(f, m, E, [v.clone(), y, T.clone()])), this.faceVertexUvs[0].push([R.clone(), b, H.clone()])
  }
  if (!1 === o && e > 0) for (this.vertices.push(new THREE.Vector3(0, l, 0)), a = 0; r > a; a++) d = h[0][a], f = h[0][a + 1], m = this.vertices.length - 1, g = new THREE.Vector3(0, 1, 0), v = new THREE.Vector3(0, 1, 0), y = new THREE.Vector3(0, 1, 0), x = c[0][a].clone(), R = c[0][a + 1].clone(), b = new THREE.Vector2(R.x, 0), this.faces.push(new THREE.Face3(d, f, m, [g, v, y])), this.faceVertexUvs[0].push([x, R, b]);
  if (!1 === o && t > 0) for (this.vertices.push(new THREE.Vector3(0, -l, 0)), a = 0; r > a; a++) d = h[s][a + 1], f = h[s][a], m = this.vertices.length - 1, g = new THREE.Vector3(0, -1, 0), v = new THREE.Vector3(0, -1, 0), y = new THREE.Vector3(0, -1, 0), x = c[s][a + 1].clone(), R = c[s][a].clone(), b = new THREE.Vector2(R.x, 1), this.faces.push(new THREE.Face3(d, f, m, [g, v, y])), this.faceVertexUvs[0].push([x, R, b]);
  this.computeFaceNormals()
},THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.ExtrudeGeometry = function (e, t) {
  "undefined" != typeof e && (THREE.Geometry.call(this), e = e instanceof Array ? e : [e], this.shapebb = e[e.length - 1].getBoundingBox(), this.addShapeList(e, t), this.computeFaceNormals());
},THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.ExtrudeGeometry.prototype.addShapeList = function (e, t) {
  for (var i = e.length, r = 0; i > r; r++) this.addShape(e[r], t)
},THREE.ExtrudeGeometry.prototype.addShape = function (e, t) {
  function i(e, t, i) {
    return t || console.log("die"), t.clone().multiplyScalar(i).add(e)
  }

  function r(e, t, i) {
    var r = THREE.Math.sign, n = 1, n = e.x - t.x, o = e.y - t.y, a = i.x - e.x, s = i.y - e.y, l = n * n + o * o;
    if (1e-10 < Math.abs(n * s - o * a)) {
      var h = Math.sqrt(l), r = Math.sqrt(a * a + s * s), l = t.x - o / h;
      if (t = t.y + n / h, a = ((i.x - s / r - l) * s - (i.y + a / r - t) * a) / (n * s - o * a), i = l + n * a - e.x, e = t + o * a - e.y, n = i * i + e * e, 2 >= n) return new THREE.Vector2(i, e);
      n = Math.sqrt(n / 2)
    } else e = !1, n > 1e-10 ? a > 1e-10 && (e = !0) : -1e-10 > n ? -1e-10 > a && (e = !0) : r(o) == r(s) && (e = !0), e ? (i = -o, e = n, n = Math.sqrt(l)) : (i = n, e = o, n = Math.sqrt(l / 2));
    return new THREE.Vector2(i / n, e / n)
  }

  function n(i, r) {
    var n, o;
    for (B = i.length; 0 <= --B;) {
      n = B, o = B - 1, 0 > o && (o = i.length - 1);
      for (var a = 0, s = v + 2 * m, a = 0; s > a; a++) {
        var l = z * a, h = z * (a + 1), c = r + n + l, l = r + o + l, u = r + o + h, h = r + n + h, p = i, d = a, f = s,
          E = n, g = o, c = c + M, l = l + M, u = u + M, h = h + M;
        S.faces.push(new THREE.Face3(c, l, h, null, null, R)), S.faces.push(new THREE.Face3(l, u, h, null, null, R)), c = b.generateSideWallUV(S, e, p, t, c, l, u, h, d, f, E, g), S.faceVertexUvs[0].push([c[0], c[1], c[3]]), S.faceVertexUvs[0].push([c[1], c[2], c[3]])
      }
    }
  }

  function o(e, t, i) {
    S.vertices.push(new THREE.Vector3(e, t, i))
  }

  function a(i, r, n, o) {
    i += M, r += M, n += M, S.faces.push(new THREE.Face3(i, r, n, null, null, x)), i = o ? b.generateBottomUV(S, e, t, i, r, n) : b.generateTopUV(S, e, t, i, r, n), S.faceVertexUvs[0].push(i)
  }

  var s, l, h, c, u, p = void 0 !== t.amount ? t.amount : 100, d = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
    f = void 0 !== t.bevelSize ? t.bevelSize : d - 2, m = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
    E = void 0 !== t.bevelEnabled ? t.bevelEnabled : !0, g = void 0 !== t.curveSegments ? t.curveSegments : 12,
    v = void 0 !== t.steps ? t.steps : 1, y = t.extrudePath, T = !1, x = t.material, R = t.extrudeMaterial,
    b = void 0 !== t.UVGenerator ? t.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;
  y && (s = y.getSpacedPoints(v), T = !0, E = !1, l = void 0 !== t.frames ? t.frames : new THREE.TubeGeometry.FrenetFrames(y, v, !1), h = new THREE.Vector3, c = new THREE.Vector3, u = new THREE.Vector3), E || (f = d = m = 0);
  var H, w, _, S = this, M = this.vertices.length, y = e.extractPoints(g), g = y.shape, C = y.holes;
  if (y = !THREE.Shape.Utils.isClockWise(g)) {
    for (g = g.reverse(), w = 0, _ = C.length; _ > w; w++) H = C[w], THREE.Shape.Utils.isClockWise(H) && (C[w] = H.reverse());
    y = !1
  }
  var A = THREE.Shape.Utils.triangulateShape(g, C), L = g;
  for (w = 0, _ = C.length; _ > w; w++) H = C[w], g = g.concat(H);
  var D, P, F, k, N, U, z = g.length, O = A.length, y = [], B = 0;
  for (F = L.length, D = F - 1, P = B + 1; F > B; B++, D++, P++) D === F && (D = 0), P === F && (P = 0), y[B] = r(L[B], L[D], L[P]);
  var V, I = [], j = y.concat();
  for (w = 0, _ = C.length; _ > w; w++) {
    for (H = C[w], V = [], B = 0, F = H.length, D = F - 1, P = B + 1; F > B; B++, D++, P++) D === F && (D = 0), P === F && (P = 0), V[B] = r(H[B], H[D], H[P]);
    I.push(V), j = j.concat(V)
  }
  for (D = 0; m > D; D++) {
    for (F = D / m, k = d * (1 - F), P = f * Math.sin(F * Math.PI / 2), B = 0, F = L.length; F > B; B++) N = i(L[B], y[B], P), o(N.x, N.y, -k);
    for (w = 0, _ = C.length; _ > w; w++) for (H = C[w], V = I[w], B = 0, F = H.length; F > B; B++) N = i(H[B], V[B], P), o(N.x, N.y, -k)
  }
  for (P = f, B = 0; z > B; B++) N = E ? i(g[B], j[B], P) : g[B], T ? (c.copy(l.normals[0]).multiplyScalar(N.x), h.copy(l.binormals[0]).multiplyScalar(N.y), u.copy(s[0]).add(c).add(h), o(u.x, u.y, u.z)) : o(N.x, N.y, 0);
  for (F = 1; v >= F; F++) for (B = 0; z > B; B++) N = E ? i(g[B], j[B], P) : g[B], T ? (c.copy(l.normals[F]).multiplyScalar(N.x), h.copy(l.binormals[F]).multiplyScalar(N.y), u.copy(s[F]).add(c).add(h), o(u.x, u.y, u.z)) : o(N.x, N.y, p / v * F);
  for (D = m - 1; D >= 0; D--) {
    for (F = D / m, k = d * (1 - F), P = f * Math.sin(F * Math.PI / 2), B = 0, F = L.length; F > B; B++) N = i(L[B], y[B], P), o(N.x, N.y, p + k);
    for (w = 0, _ = C.length; _ > w; w++) for (H = C[w], V = I[w], B = 0, F = H.length; F > B; B++) N = i(H[B], V[B], P), T ? o(N.x, N.y + s[v - 1].y, s[v - 1].x + k) : o(N.x, N.y, p + k)
  }
  !function () {
    if (E) {
      var e;
      for (e = 0 * z, B = 0; O > B; B++) U = A[B], a(U[2] + e, U[1] + e, U[0] + e, !0);
      for (e = v + 2 * m, e *= z, B = 0; O > B; B++) U = A[B], a(U[0] + e, U[1] + e, U[2] + e, !1)
    } else {
      for (B = 0; O > B; B++) U = A[B], a(U[2], U[1], U[0], !0);
      for (B = 0; O > B; B++) U = A[B], a(U[0] + z * v, U[1] + z * v, U[2] + z * v, !1)
    }
  }(), function () {
    var e = 0;
    for (n(L, e), e += L.length, w = 0, _ = C.length; _ > w; w++) H = C[w], n(H, e), e += H.length
  }()
},THREE.ExtrudeGeometry.WorldUVGenerator = {
  generateTopUV: function (e, t, i, r, n, o) {
    return t = e.vertices[n].x, n = e.vertices[n].y, i = e.vertices[o].x, o = e.vertices[o].y, [new THREE.Vector2(e.vertices[r].x, e.vertices[r].y), new THREE.Vector2(t, n), new THREE.Vector2(i, o)]
  }, generateBottomUV: function (e, t, i, r, n, o) {
    return this.generateTopUV(e, t, i, r, n, o)
  }, generateSideWallUV: function (e, t, i, r, n, o, a, s, l, h, c, u) {
    t = e.vertices[n].x, i = e.vertices[n].y, n = e.vertices[n].z, r = e.vertices[o].x, l = e.vertices[o].y, o = e.vertices[o].z, h = e.vertices[a].x, c = e.vertices[a].y, a = e.vertices[a].z, u = e.vertices[s].x;
    var p = e.vertices[s].y;
    return e = e.vertices[s].z, .01 > Math.abs(i - l) ? [new THREE.Vector2(t, 1 - n), new THREE.Vector2(r, 1 - o), new THREE.Vector2(h, 1 - a), new THREE.Vector2(u, 1 - e)] : [new THREE.Vector2(i, 1 - n), new THREE.Vector2(l, 1 - o), new THREE.Vector2(c, 1 - a), new THREE.Vector2(p, 1 - e)]
  }
},THREE.ExtrudeGeometry.__v1 = new THREE.Vector2,THREE.ExtrudeGeometry.__v2 = new THREE.Vector2,THREE.ExtrudeGeometry.__v3 = new THREE.Vector2,THREE.ExtrudeGeometry.__v4 = new THREE.Vector2,THREE.ExtrudeGeometry.__v5 = new THREE.Vector2,THREE.ExtrudeGeometry.__v6 = new THREE.Vector2,THREE.ShapeGeometry = function (e, t) {
  THREE.Geometry.call(this), !1 == e instanceof Array && (e = [e]), this.shapebb = e[e.length - 1].getBoundingBox(), this.addShapeList(e, t), this.computeFaceNormals()
},THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.ShapeGeometry.prototype.addShapeList = function (e, t) {
  for (var i = 0, r = e.length; r > i; i++) this.addShape(e[i], t);
  return this
},THREE.ShapeGeometry.prototype.addShape = function (e, t) {
  void 0 === t && (t = {});
  var i, r, n, o = t.material, a = void 0 === t.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : t.UVGenerator,
    s = this.vertices.length;
  i = e.extractPoints(void 0 !== t.curveSegments ? t.curveSegments : 12);
  var l = i.shape, h = i.holes;
  if (!THREE.Shape.Utils.isClockWise(l)) for (l = l.reverse(), i = 0, r = h.length; r > i; i++) n = h[i], THREE.Shape.Utils.isClockWise(n) && (h[i] = n.reverse());
  var c = THREE.Shape.Utils.triangulateShape(l, h);
  for (i = 0, r = h.length; r > i; i++) n = h[i], l = l.concat(n);
  for (h = l.length, r = c.length, i = 0; h > i; i++) n = l[i], this.vertices.push(new THREE.Vector3(n.x, n.y, 0));
  for (i = 0; r > i; i++) h = c[i], l = h[0] + s, n = h[1] + s, h = h[2] + s, this.faces.push(new THREE.Face3(l, n, h, null, null, o)), this.faceVertexUvs[0].push(a.generateBottomUV(this, e, t, l, n, h))
},THREE.LatheGeometry = function (e, t, i, r) {
  THREE.Geometry.call(this), t = t || 12, i = i || 0, r = r || 2 * Math.PI;
  for (var n = 1 / (e.length - 1), o = 1 / t, a = 0, s = t; s >= a; a++) for (var l = i + a * o * r, h = Math.cos(l), c = Math.sin(l), l = 0, u = e.length; u > l; l++) {
    var p = e[l], d = new THREE.Vector3;
    d.x = h * p.x - c * p.y, d.y = c * p.x + h * p.y, d.z = p.z, this.vertices.push(d)
  }
  for (i = e.length, a = 0, s = t; s > a; a++) for (l = 0, u = e.length - 1; u > l; l++) {
    t = c = l + i * a, r = c + i;
    var h = c + 1 + i, c = c + 1, p = a * o, d = l * n, f = p + o, m = d + n;
    this.faces.push(new THREE.Face3(t, r, c)), this.faceVertexUvs[0].push([new THREE.Vector2(p, d), new THREE.Vector2(f, d), new THREE.Vector2(p, m)]), this.faces.push(new THREE.Face3(r, h, c)), this.faceVertexUvs[0].push([new THREE.Vector2(f, d), new THREE.Vector2(f, m), new THREE.Vector2(p, m)])
  }
  this.mergeVertices(), this.computeFaceNormals(), this.computeVertexNormals()
},THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.PlaneGeometry = function (e, t, i, r) {
  this.parameters = {width: e, height: t, widthSegments: i, heightSegments: r};
  var n = e / 2, o = t / 2;
  i = i || 1, r = r || 1;
  var a = i + 1, s = r + 1, l = e / i, h = t / r;
  t = new Float32Array(a * s * 3), e = new Float32Array(a * s * 3);
  for (var c = new Float32Array(a * s * 2), u = 0, p = 0, d = 0; s > d; d++) for (var f = d * h - o, m = 0; a > m; m++) t[u] = m * l - n, t[u + 1] = -f, e[u + 2] = 1, c[p] = m / i, c[p + 1] = 1 - d / r, u += 3, p += 2;
  for (u = 0, n = new (65535 < t.length ? Uint32Array : Uint16Array)(i * r * 6), d = 0; r > d; d++) for (m = 0; i > m; m++) o = m + a * (d + 1), s = m + 1 + a * (d + 1), l = m + 1 + a * d, n[u] = m + a * d, n[u + 1] = o, n[u + 2] = l, n[u + 3] = o, n[u + 4] = s, n[u + 5] = l, u += 6;
  THREE.IndexedGeometry2.call(this, n, t, e, c)
},THREE.PlaneGeometry.prototype = Object.create(THREE.IndexedGeometry2.prototype),THREE.RingGeometry = function (e, t, i, r, n, o) {
  THREE.Geometry.call(this), e = e || 0, t = t || 50, n = void 0 !== n ? n : 0, o = void 0 !== o ? o : 2 * Math.PI, i = void 0 !== i ? Math.max(3, i) : 8, r = void 0 !== r ? Math.max(3, r) : 8;
  var a, s = [], l = e, h = (t - e) / r;
  for (e = 0; r >= e; e++) {
    for (a = 0; i >= a; a++) {
      var c = new THREE.Vector3, u = n + a / i * o;
      c.x = l * Math.cos(u), c.y = l * Math.sin(u), this.vertices.push(c), s.push(new THREE.Vector2((c.x / t + 1) / 2, (c.y / t + 1) / 2))
    }
    l += h
  }
  for (t = new THREE.Vector3(0, 0, 1), e = 0; r > e; e++) for (n = e * i, a = 0; i >= a; a++) u = a + n, o = u + e, h = u + i + e, c = u + i + 1 + e, this.faces.push(new THREE.Face3(o, h, c, [t.clone(), t.clone(), t.clone()])), this.faceVertexUvs[0].push([s[o].clone(), s[h].clone(), s[c].clone()]), o = u + e, h = u + i + 1 + e, c = u + 1 + e, this.faces.push(new THREE.Face3(o, h, c, [t.clone(), t.clone(), t.clone()])), this.faceVertexUvs[0].push([s[o].clone(), s[h].clone(), s[c].clone()]);
  this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, l)
},THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.SphereGeometry = function (e, t, i, r, n, o, a) {
  THREE.Geometry.call(this), this.parameters = {
    radius: e,
    widthSegments: t,
    heightSegments: i,
    phiStart: r,
    phiLength: n,
    thetaStart: o,
    thetaLength: a
  }, e = e || 50, t = Math.max(3, Math.floor(t) || 8), i = Math.max(2, Math.floor(i) || 6), r = void 0 !== r ? r : 0, n = void 0 !== n ? n : 2 * Math.PI, o = void 0 !== o ? o : 0, a = void 0 !== a ? a : Math.PI;
  var s, l, h = [], c = [];
  for (l = 0; i >= l; l++) {
    var u = [], p = [];
    for (s = 0; t >= s; s++) {
      var d = s / t, f = l / i, m = new THREE.Vector3;
      m.x = -e * Math.cos(r + d * n) * Math.sin(o + f * a), m.y = e * Math.cos(o + f * a), m.z = e * Math.sin(r + d * n) * Math.sin(o + f * a), this.vertices.push(m), u.push(this.vertices.length - 1), p.push(new THREE.Vector2(d, 1 - f))
    }
    h.push(u), c.push(p)
  }
  for (l = 0; i > l; l++) for (s = 0; t > s; s++) {
    r = h[l][s + 1], n = h[l][s], o = h[l + 1][s], a = h[l + 1][s + 1];
    var u = this.vertices[r].clone().normalize(), p = this.vertices[n].clone().normalize(),
      d = this.vertices[o].clone().normalize(), f = this.vertices[a].clone().normalize(), m = c[l][s + 1].clone(),
      E = c[l][s].clone(), g = c[l + 1][s].clone(), v = c[l + 1][s + 1].clone();
    Math.abs(this.vertices[r].y) === e ? (m.x = (m.x + E.x) / 2, this.faces.push(new THREE.Face3(r, o, a, [u, d, f])), this.faceVertexUvs[0].push([m, g, v])) : Math.abs(this.vertices[o].y) === e ? (g.x = (g.x + v.x) / 2, this.faces.push(new THREE.Face3(r, n, o, [u, p, d])), this.faceVertexUvs[0].push([m, E, g])) : (this.faces.push(new THREE.Face3(r, n, a, [u, p, f])), this.faceVertexUvs[0].push([m, E, v]), this.faces.push(new THREE.Face3(n, o, a, [p.clone(), d, f.clone()])), this.faceVertexUvs[0].push([E.clone(), g, v.clone()]))
  }
  this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, e)
},THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.TextGeometry = function (e, t) {
  t = t || {};
  var i = THREE.FontUtils.generateShapes(e, t);
  t.amount = void 0 !== t.height ? t.height : 50, void 0 === t.bevelThickness && (t.bevelThickness = 10), void 0 === t.bevelSize && (t.bevelSize = 8), void 0 === t.bevelEnabled && (t.bevelEnabled = !1), THREE.ExtrudeGeometry.call(this, i, t)
},THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype),THREE.TorusGeometry = function (e, t, i, r, n) {
  THREE.Geometry.call(this), this.parameters = {
    radius: e,
    tube: t,
    radialSegments: i,
    tubularSegments: r,
    arc: n
  }, e = e || 100, t = t || 40, i = i || 8, r = r || 6, n = n || 2 * Math.PI;
  for (var o = new THREE.Vector3, a = [], s = [], l = 0; i >= l; l++) for (var h = 0; r >= h; h++) {
    var c = h / r * n, u = l / i * Math.PI * 2;
    o.x = e * Math.cos(c), o.y = e * Math.sin(c);
    var p = new THREE.Vector3;
    p.x = (e + t * Math.cos(u)) * Math.cos(c), p.y = (e + t * Math.cos(u)) * Math.sin(c), p.z = t * Math.sin(u), this.vertices.push(p), a.push(new THREE.Vector2(h / r, l / i)), s.push(p.clone().sub(o).normalize())
  }
  for (l = 1; i >= l; l++) for (h = 1; r >= h; h++) e = (r + 1) * l + h - 1, t = (r + 1) * (l - 1) + h - 1, n = (r + 1) * (l - 1) + h, o = (r + 1) * l + h, c = new THREE.Face3(e, t, o, [s[e].clone(), s[t].clone(), s[o].clone()]), this.faces.push(c), this.faceVertexUvs[0].push([a[e].clone(), a[t].clone(), a[o].clone()]), c = new THREE.Face3(t, n, o, [s[t].clone(), s[n].clone(), s[o].clone()]), this.faces.push(c), this.faceVertexUvs[0].push([a[t].clone(), a[n].clone(), a[o].clone()]);
  this.computeFaceNormals()
},THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.TorusKnotGeometry = function (e, t, i, r, n, o, a) {
  function s(e, t, i, r, n) {
    var o = Math.cos(e), a = Math.sin(e);
    return e *= t / i, t = Math.cos(e), o *= r * (2 + t) * .5, a = r * (2 + t) * a * .5, r = n * r * Math.sin(e) * .5, new THREE.Vector3(o, a, r)
  }

  THREE.Geometry.call(this), this.parameters = {
    radius: e,
    tube: t,
    radialSegments: i,
    tubularSegments: r,
    p: n,
    q: o,
    heightScale: a
  }, e = e || 100, t = t || 40, i = i || 64, r = r || 8, n = n || 2, o = o || 3, a = a || 1;
  for (var l = Array(i), h = new THREE.Vector3, c = new THREE.Vector3, u = new THREE.Vector3, p = 0; i > p; ++p) {
    l[p] = Array(r);
    var d = p / i * 2 * n * Math.PI, f = s(d, o, n, e, a), d = s(d + .01, o, n, e, a);
    for (h.subVectors(d, f), c.addVectors(d, f), u.crossVectors(h, c), c.crossVectors(u, h), u.normalize(), c.normalize(), d = 0; r > d; ++d) {
      var m = d / r * 2 * Math.PI, E = -t * Math.cos(m), m = t * Math.sin(m), g = new THREE.Vector3;
      g.x = f.x + E * c.x + m * u.x, g.y = f.y + E * c.y + m * u.y, g.z = f.z + E * c.z + m * u.z, l[p][d] = this.vertices.push(g) - 1
    }
  }
  for (p = 0; i > p; ++p) for (d = 0; r > d; ++d) n = (p + 1) % i, o = (d + 1) % r, e = l[p][d], t = l[n][d], n = l[n][o], o = l[p][o], a = new THREE.Vector2(p / i, d / r), h = new THREE.Vector2((p + 1) / i, d / r), c = new THREE.Vector2((p + 1) / i, (d + 1) / r), u = new THREE.Vector2(p / i, (d + 1) / r), this.faces.push(new THREE.Face3(e, t, o)), this.faceVertexUvs[0].push([a, h, u]), this.faces.push(new THREE.Face3(t, n, o)), this.faceVertexUvs[0].push([h.clone(), c, u.clone()]);
  this.computeFaceNormals(), this.computeVertexNormals()
},THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.TubeGeometry = function (e, t, i, r, n) {
  THREE.Geometry.call(this), this.parameters = {
    path: e,
    segments: t,
    radius: i,
    radialSegments: r,
    closed: n
  }, t = t || 64, i = i || 1, r = r || 8, n = n || !1;
  var o, a, s, l, h, c, u, p, d, f = [], m = t + 1, E = new THREE.Vector3;
  for (u = new THREE.TubeGeometry.FrenetFrames(e, t, n), p = u.normals, d = u.binormals, this.tangents = u.tangents, this.normals = p, this.binormals = d, u = 0; m > u; u++) for (f[u] = [], s = u / (m - 1), c = e.getPointAt(s), o = p[u], a = d[u], s = 0; r > s; s++) l = s / r * 2 * Math.PI, h = -i * Math.cos(l), l = i * Math.sin(l), E.copy(c), E.x += h * o.x + l * a.x, E.y += h * o.y + l * a.y, E.z += h * o.z + l * a.z, f[u][s] = this.vertices.push(new THREE.Vector3(E.x, E.y, E.z)) - 1;
  for (u = 0; t > u; u++) for (s = 0; r > s; s++) m = n ? (u + 1) % t : u + 1, E = (s + 1) % r, e = f[u][s], i = f[m][s], m = f[m][E], E = f[u][E], p = new THREE.Vector2(u / t, s / r), d = new THREE.Vector2((u + 1) / t, s / r), o = new THREE.Vector2((u + 1) / t, (s + 1) / r), a = new THREE.Vector2(u / t, (s + 1) / r), this.faces.push(new THREE.Face3(e, i, E)), this.faceVertexUvs[0].push([p, d, a]), this.faces.push(new THREE.Face3(i, m, E)), this.faceVertexUvs[0].push([d.clone(), o, a.clone()]);
  this.computeFaceNormals(), this.computeVertexNormals()
},THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.TubeGeometry.FrenetFrames = function (e, t, i) {
  new THREE.Vector3;
  var r = new THREE.Vector3;
  new THREE.Vector3;
  var n = [], o = [], a = [], s = new THREE.Vector3, l = new THREE.Matrix4;
  t += 1;
  var h, c, u;
  for (this.tangents = n, this.normals = o, this.binormals = a, h = 0; t > h; h++) c = h / (t - 1), n[h] = e.getTangentAt(c), n[h].normalize();
  for (o[0] = new THREE.Vector3, a[0] = new THREE.Vector3, e = Number.MAX_VALUE, h = Math.abs(n[0].x), c = Math.abs(n[0].y), u = Math.abs(n[0].z), e >= h && (e = h, r.set(1, 0, 0)), e >= c && (e = c, r.set(0, 1, 0)), e >= u && r.set(0, 0, 1), s.crossVectors(n[0], r).normalize(), o[0].crossVectors(n[0], s), a[0].crossVectors(n[0], o[0]), h = 1; t > h; h++) o[h] = o[h - 1].clone(), a[h] = a[h - 1].clone(), s.crossVectors(n[h - 1], n[h]), 1e-4 < s.length() && (s.normalize(), r = Math.acos(THREE.Math.clamp(n[h - 1].dot(n[h]), -1, 1)), o[h].applyMatrix4(l.makeRotationAxis(s, r))), a[h].crossVectors(n[h], o[h]);
  if (i) for (r = Math.acos(THREE.Math.clamp(o[0].dot(o[t - 1]), -1, 1)), r /= t - 1, 0 < n[0].dot(s.crossVectors(o[0], o[t - 1])) && (r = -r), h = 1; t > h; h++) o[h].applyMatrix4(l.makeRotationAxis(n[h], r * h)), a[h].crossVectors(n[h], o[h])
},THREE.PolyhedronGeometry = function (e, t, i, r) {
  function n(e) {
    var t = e.normalize().clone();
    t.index = l.vertices.push(t) - 1;
    var i = Math.atan2(e.z, -e.x) / 2 / Math.PI + .5;
    return e = Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z)) / Math.PI + .5, t.uv = new THREE.Vector2(i, 1 - e), t
  }

  function o(e, t, i) {
    var r = new THREE.Face3(e.index, t.index, i.index, [e.clone(), t.clone(), i.clone()]);
    l.faces.push(r), E.copy(e).add(t).add(i).divideScalar(3), r = Math.atan2(E.z, -E.x), l.faceVertexUvs[0].push([s(e.uv, e, r), s(t.uv, t, r), s(i.uv, i, r)])
  }

  function a(e, t) {
    var i = Math.pow(2, t);
    Math.pow(4, t);
    for (var r = n(l.vertices[e.a]), a = n(l.vertices[e.b]), s = n(l.vertices[e.c]), h = [], c = 0; i >= c; c++) {
      h[c] = [];
      for (var u = n(r.clone().lerp(s, c / i)), p = n(a.clone().lerp(s, c / i)), d = i - c, f = 0; d >= f; f++) h[c][f] = 0 == f && c == i ? u : n(u.clone().lerp(p, f / d))
    }
    for (c = 0; i > c; c++) for (f = 0; 2 * (i - c) - 1 > f; f++) r = Math.floor(f / 2), 0 == f % 2 ? o(h[c][r + 1], h[c + 1][r], h[c][r]) : o(h[c][r + 1], h[c + 1][r + 1], h[c + 1][r])
  }

  function s(e, t, i) {
    return 0 > i && 1 === e.x && (e = new THREE.Vector2(e.x - 1, e.y)), 0 === t.x && 0 === t.z && (e = new THREE.Vector2(i / 2 / Math.PI + .5, e.y)), e.clone()
  }

  THREE.Geometry.call(this), i = i || 1, r = r || 0;
  for (var l = this, h = 0, c = e.length; c > h; h += 3) n(new THREE.Vector3(e[h], e[h + 1], e[h + 2]));
  e = this.vertices;
  for (var u = [], p = h = 0, c = t.length; c > h; h += 3, p++) {
    var d = e[t[h]], f = e[t[h + 1]], m = e[t[h + 2]];
    u[p] = new THREE.Face3(d.index, f.index, m.index, [d.clone(), f.clone(), m.clone()])
  }
  for (var E = new THREE.Vector3, h = 0, c = u.length; c > h; h++) a(u[h], r);
  for (h = 0, c = this.faceVertexUvs[0].length; c > h; h++) t = this.faceVertexUvs[0][h], r = t[0].x, e = t[1].x, u = t[2].x, p = Math.max(r, Math.max(e, u)), d = Math.min(r, Math.min(e, u)), p > .9 && .1 > d && (.2 > r && (t[0].x += 1), .2 > e && (t[1].x += 1), .2 > u && (t[2].x += 1));
  for (h = 0, c = this.vertices.length; c > h; h++) this.vertices[h].multiplyScalar(i);
  this.mergeVertices(), this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, i)
},THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.IcosahedronGeometry = function (e, t) {
  this.parameters = {radius: e, detail: t};
  var i = (1 + Math.sqrt(5)) / 2;
  THREE.PolyhedronGeometry.call(this, [-1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, 0, 0, -1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, i, 0, -1, i, 0, 1, -i, 0, -1, -i, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t)
},THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.OctahedronGeometry = function (e, t) {
  this.parameters = {
    radius: e,
    detail: t
  }, THREE.PolyhedronGeometry.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t)
},THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.TetrahedronGeometry = function (e, t) {
  THREE.PolyhedronGeometry.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t)
},THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.ParametricGeometry = function (e, t, i) {
  THREE.Geometry.call(this);
  var r, n, o, a, s = this.vertices, l = this.faces, h = this.faceVertexUvs[0], c = t + 1;
  for (r = 0; i >= r; r++) for (a = r / i, n = 0; t >= n; n++) o = n / t, o = e(o, a), s.push(o);
  var u, p, d, f;
  for (r = 0; i > r; r++) for (n = 0; t > n; n++) e = r * c + n, s = r * c + n + 1, a = (r + 1) * c + n + 1, o = (r + 1) * c + n, u = new THREE.Vector2(n / t, r / i), p = new THREE.Vector2((n + 1) / t, r / i), d = new THREE.Vector2((n + 1) / t, (r + 1) / i), f = new THREE.Vector2(n / t, (r + 1) / i), l.push(new THREE.Face3(e, s, o)), h.push([u, p, f]), l.push(new THREE.Face3(s, a, o)), h.push([p.clone(), d, f.clone()]);
  this.computeFaceNormals(), this.computeVertexNormals()
},THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype),THREE.AxisHelper = function (e) {
  e = e || 1;
  var t = new THREE.Geometry;
  t.vertices.push(new THREE.Vector3, new THREE.Vector3(e, 0, 0), new THREE.Vector3, new THREE.Vector3(0, e, 0), new THREE.Vector3, new THREE.Vector3(0, 0, e)), t.colors.push(new THREE.Color(16711680), new THREE.Color(16755200), new THREE.Color(65280), new THREE.Color(11206400), new THREE.Color(255), new THREE.Color(43775)), e = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors}), THREE.Line.call(this, t, e, THREE.LinePieces)
},THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype),THREE.ArrowHelper = function (e, t, i, r, n, o) {
  THREE.Object3D.call(this), void 0 === r && (r = 16776960), void 0 === i && (i = 1), void 0 === n && (n = .2 * i), void 0 === o && (o = .2 * n), this.position = t, t = new THREE.Geometry, t.vertices.push(new THREE.Vector3(0, 0, 0)), t.vertices.push(new THREE.Vector3(0, 1, 0)), this.line = new THREE.Line(t, new THREE.LineBasicMaterial({color: r})), this.line.matrixAutoUpdate = !1, this.add(this.line), t = new THREE.CylinderGeometry(0, .5, 1, 5, 1), t.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)), this.cone = new THREE.Mesh(t, new THREE.MeshBasicMaterial({color: r})), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(e), this.setLength(i, n, o)
},THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype),THREE.ArrowHelper.prototype.setDirection = function () {
  var e, t = new THREE.Vector3;
  return function (i) {
    .99999 < i.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > i.y ? this.quaternion.set(1, 0, 0, 0) : (t.set(i.z, 0, -i.x).normalize(), e = Math.acos(i.y), this.quaternion.setFromAxisAngle(t, e))
  }
}(),THREE.ArrowHelper.prototype.setLength = function (e, t, i) {
  void 0 === t && (t = .2 * e), void 0 === i && (i = .2 * t), this.line.scale.set(1, e, 1), this.line.updateMatrix(), this.cone.scale.set(i, t, i), this.cone.position.y = e, this.cone.updateMatrix()
},THREE.ArrowHelper.prototype.setColor = function (e) {
  this.line.material.color.setHex(e), this.cone.material.color.setHex(e)
},THREE.BoxHelper = function (e) {
  var t = [new THREE.Vector3(1, 1, 1), new THREE.Vector3(-1, 1, 1), new THREE.Vector3(-1, -1, 1), new THREE.Vector3(1, -1, 1), new THREE.Vector3(1, 1, -1), new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, -1, -1)];
  this.vertices = t;
  var i = new THREE.Geometry;
  i.vertices.push(t[0], t[1], t[1], t[2], t[2], t[3], t[3], t[0], t[4], t[5], t[5], t[6], t[6], t[7], t[7], t[4], t[0], t[4], t[1], t[5], t[2], t[6], t[3], t[7]), THREE.Line.call(this, i, new THREE.LineBasicMaterial({color: 16776960}), THREE.LinePieces), void 0 !== e && this.update(e)
},THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype),THREE.BoxHelper.prototype.update = function (e) {
  var t = e.geometry;
  null === t.boundingBox && t.computeBoundingBox();
  var i = t.boundingBox.min, t = t.boundingBox.max, r = this.vertices;
  r[0].set(t.x, t.y, t.z), r[1].set(i.x, t.y, t.z), r[2].set(i.x, i.y, t.z), r[3].set(t.x, i.y, t.z), r[4].set(t.x, t.y, i.z), r[5].set(i.x, t.y, i.z), r[6].set(i.x, i.y, i.z), r[7].set(t.x, i.y, i.z), this.geometry.computeBoundingSphere(), this.geometry.verticesNeedUpdate = !0, this.matrixAutoUpdate = !1, this.matrixWorld = e.matrixWorld
},THREE.BoundingBoxHelper = function (e, t) {
  var i = void 0 !== t ? t : 8947848;
  this.object = e, this.box = new THREE.Box3, THREE.Mesh.call(this, new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
    color: i,
    wireframe: !0
  }))
},THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype),THREE.BoundingBoxHelper.prototype.update = function () {
  this.box.setFromObject(this.object), this.box.size(this.scale), this.box.center(this.position)
},THREE.CameraHelper = function (e) {
  function t(e, t, r) {
    i(e, r), i(t, r)
  }

  function i(e, t) {
    r.vertices.push(new THREE.Vector3), r.colors.push(new THREE.Color(t)), void 0 === o[e] && (o[e] = []), o[e].push(r.vertices.length - 1)
  }

  var r = new THREE.Geometry, n = new THREE.LineBasicMaterial({color: 16777215, vertexColors: THREE.FaceColors}),
    o = {};
  t("n1", "n2", 16755200), t("n2", "n4", 16755200), t("n4", "n3", 16755200), t("n3", "n1", 16755200), t("f1", "f2", 16755200), t("f2", "f4", 16755200), t("f4", "f3", 16755200), t("f3", "f1", 16755200), t("n1", "f1", 16755200), t("n2", "f2", 16755200), t("n3", "f3", 16755200), t("n4", "f4", 16755200), t("p", "n1", 16711680), t("p", "n2", 16711680), t("p", "n3", 16711680), t("p", "n4", 16711680), t("u1", "u2", 43775), t("u2", "u3", 43775), t("u3", "u1", 43775), t("c", "t", 16777215), t("p", "c", 3355443), t("cn1", "cn2", 3355443), t("cn3", "cn4", 3355443), t("cf1", "cf2", 3355443), t("cf3", "cf4", 3355443), THREE.Line.call(this, r, n, THREE.LinePieces), this.camera = e, this.matrixWorld = e.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = o, this.update()
},THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype),THREE.CameraHelper.prototype.update = function () {
  var e = new THREE.Vector3, t = new THREE.Camera, i = new THREE.Projector;
  return function () {
    function r(r, o, a, s) {
      if (e.set(o, a, s), i.unprojectVector(e, t), r = n.pointMap[r], void 0 !== r) for (o = 0, a = r.length; a > o; o++) n.geometry.vertices[r[o]].copy(e)
    }

    var n = this;
    t.projectionMatrix.copy(this.camera.projectionMatrix), r("c", 0, 0, -1), r("t", 0, 0, 1), r("n1", -1, -1, -1), r("n2", 1, -1, -1), r("n3", -1, 1, -1), r("n4", 1, 1, -1), r("f1", -1, -1, 1), r("f2", 1, -1, 1), r("f3", -1, 1, 1), r("f4", 1, 1, 1), r("u1", .7, 1.1, -1), r("u2", -.7, 1.1, -1), r("u3", 0, 2, -1), r("cf1", -1, 0, 1), r("cf2", 1, 0, 1), r("cf3", 0, -1, 1), r("cf4", 0, 1, 1), r("cn1", -1, 0, -1), r("cn2", 1, 0, -1), r("cn3", 0, -1, -1), r("cn4", 0, 1, -1), this.geometry.verticesNeedUpdate = !0
  }
}(),THREE.DirectionalLightHelper = function (e, t) {
  THREE.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrixWorld = e.matrixWorld, this.matrixAutoUpdate = !1, t = t || 1;
  var i = new THREE.Geometry;
  i.vertices.push(new THREE.Vector3(-t, t, 0), new THREE.Vector3(t, t, 0), new THREE.Vector3(t, -t, 0), new THREE.Vector3(-t, -t, 0), new THREE.Vector3(-t, t, 0));
  var r = new THREE.LineBasicMaterial({fog: !1});
  r.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightPlane = new THREE.Line(i, r), this.add(this.lightPlane), i = new THREE.Geometry, i.vertices.push(new THREE.Vector3, new THREE.Vector3), r = new THREE.LineBasicMaterial({fog: !1}), r.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new THREE.Line(i, r), this.add(this.targetLine), this.update()
},THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype),THREE.DirectionalLightHelper.prototype.dispose = function () {
  this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose()
},THREE.DirectionalLightHelper.prototype.update = function () {
  var e = new THREE.Vector3, t = new THREE.Vector3, i = new THREE.Vector3;
  return function () {
    e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), i.subVectors(t, e), this.lightPlane.lookAt(i), this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine.geometry.vertices[1].copy(i), this.targetLine.geometry.verticesNeedUpdate = !0, this.targetLine.material.color.copy(this.lightPlane.material.color)
  }
}(),THREE.EdgesHelper = function (e, t) {
  var i = void 0 !== t ? t : 16777215, r = [0, 0], n = {}, o = function (e, t) {
    return e - t
  }, a = ["a", "b", "c"], s = new THREE.BufferGeometry, l = e.geometry.clone();
  l.mergeVertices(), l.computeFaceNormals();
  for (var h = l.vertices, l = l.faces, c = 0, u = 0, p = l.length; p > u; u++) for (var d = l[u], f = 0; 3 > f; f++) {
    r[0] = d[a[f]], r[1] = d[a[(f + 1) % 3]], r.sort(o);
    var m = r.toString();
    void 0 === n[m] ? (n[m] = {vert1: r[0], vert2: r[1], face1: u, face2: void 0}, c++) : n[m].face2 = u
  }
  s.addAttribute("position", new THREE.Float32Attribute(2 * c, 3)), r = s.attributes.position.array, o = 0;
  for (m in n) a = n[m], (void 0 === a.face2 || .9999 > l[a.face1].normal.dot(l[a.face2].normal)) && (c = h[a.vert1], r[o++] = c.x, r[o++] = c.y, r[o++] = c.z, c = h[a.vert2], r[o++] = c.x, r[o++] = c.y, r[o++] = c.z);
  THREE.Line.call(this, s, new THREE.LineBasicMaterial({color: i}), THREE.LinePieces), this.matrixAutoUpdate = !1, this.matrixWorld = e.matrixWorld
},THREE.EdgesHelper.prototype = Object.create(THREE.Line.prototype),THREE.FaceNormalsHelper = function (e, t, i, r) {
  this.object = e, this.size = void 0 !== t ? t : 1, e = void 0 !== i ? i : 16776960, r = void 0 !== r ? r : 1, t = new THREE.Geometry, i = 0;
  for (var n = this.object.geometry.faces.length; n > i; i++) t.vertices.push(new THREE.Vector3, new THREE.Vector3);
  THREE.Line.call(this, t, new THREE.LineBasicMaterial({
    color: e,
    linewidth: r
  }), THREE.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new THREE.Matrix3, this.update()
},THREE.FaceNormalsHelper.prototype = Object.create(THREE.Line.prototype),THREE.FaceNormalsHelper.prototype.update = function () {
  var e = this.geometry.vertices, t = this.object, i = t.geometry.vertices, r = t.geometry.faces, n = t.matrixWorld;
  t.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(n);
  for (var o = t = 0, a = r.length; a > t; t++, o += 2) {
    var s = r[t];
    e[o].copy(i[s.a]).add(i[s.b]).add(i[s.c]).divideScalar(3).applyMatrix4(n), e[o + 1].copy(s.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(e[o])
  }
  return this.geometry.verticesNeedUpdate = !0, this
},THREE.GridHelper = function (e, t) {
  var i = new THREE.Geometry, r = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});
  this.color1 = new THREE.Color(4473924), this.color2 = new THREE.Color(8947848);
  for (var n = -e; e >= n; n += t) {
    i.vertices.push(new THREE.Vector3(-e, 0, n), new THREE.Vector3(e, 0, n), new THREE.Vector3(n, 0, -e), new THREE.Vector3(n, 0, e));
    var o = 0 === n ? this.color1 : this.color2;
    i.colors.push(o, o, o, o)
  }
  THREE.Line.call(this, i, r, THREE.LinePieces)
},THREE.GridHelper.prototype = Object.create(THREE.Line.prototype),THREE.GridHelper.prototype.setColors = function (e, t) {
  this.color1.set(e), this.color2.set(t), this.geometry.colorsNeedUpdate = !0
},THREE.HemisphereLightHelper = function (e, t, i, r) {
  for (THREE.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrixWorld = e.matrixWorld, this.matrixAutoUpdate = !1, this.colors = [new THREE.Color, new THREE.Color], e = new THREE.SphereGeometry(t, 4, 2), e.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2)), t = 0; 8 > t; t++) e.faces[t].color = this.colors[4 > t ? 0 : 1];
  t = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    wireframe: !0
  }), this.lightSphere = new THREE.Mesh(e, t), this.add(this.lightSphere), this.update()
},THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype),THREE.HemisphereLightHelper.prototype.dispose = function () {
  this.lightSphere.geometry.dispose(), this.lightSphere.material.dispose()
},THREE.HemisphereLightHelper.prototype.update = function () {
  var e = new THREE.Vector3;
  return function () {
    this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity), this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity), this.lightSphere.lookAt(e.setFromMatrixPosition(this.light.matrixWorld).negate()), this.lightSphere.geometry.colorsNeedUpdate = !0
  }
}(),THREE.PointLightHelper = function (e, t) {
  this.light = e, this.light.updateMatrixWorld();
  var i = new THREE.SphereGeometry(t, 4, 2), r = new THREE.MeshBasicMaterial({wireframe: !0, fog: !1});
  r.color.copy(this.light.color).multiplyScalar(this.light.intensity), THREE.Mesh.call(this, i, r), this.matrixWorld = this.light.matrixWorld, this.matrixAutoUpdate = !1
},THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype),THREE.PointLightHelper.prototype.dispose = function () {
  this.geometry.dispose(), this.material.dispose()
},THREE.PointLightHelper.prototype.update = function () {
  this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
},THREE.SpotLightHelper = function (e) {
  THREE.Object3D.call(this), this.light = e, this.light.updateMatrixWorld(), this.matrixWorld = e.matrixWorld, this.matrixAutoUpdate = !1, e = new THREE.CylinderGeometry(0, 1, 1, 8, 1, !0), e.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)), e.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
  var t = new THREE.MeshBasicMaterial({wireframe: !0, fog: !1});
  this.cone = new THREE.Mesh(e, t), this.add(this.cone), this.update()
},THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype),THREE.SpotLightHelper.prototype.dispose = function () {
  this.cone.geometry.dispose(), this.cone.material.dispose()
},THREE.SpotLightHelper.prototype.update = function () {
  var e = new THREE.Vector3, t = new THREE.Vector3;
  return function () {
    var i = this.light.distance ? this.light.distance : 1e4, r = i * Math.tan(this.light.angle);
    this.cone.scale.set(r, r, i), e.setFromMatrixPosition(this.light.matrixWorld), t.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(t.sub(e)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
  }
}(),THREE.VertexNormalsHelper = function (e, t, i, r) {
  this.object = e, this.size = void 0 !== t ? t : 1, t = void 0 !== i ? i : 16711680, r = void 0 !== r ? r : 1, i = new THREE.Geometry, e = e.geometry.faces;
  for (var n = 0, o = e.length; o > n; n++) for (var a = 0, s = e[n].vertexNormals.length; s > a; a++) i.vertices.push(new THREE.Vector3), i.vertices.push(new THREE.Vector3);
  THREE.Line.call(this, i, new THREE.LineBasicMaterial({
    color: t,
    linewidth: r
  }), THREE.LinePieces), this.matrixAutoUpdate = !1, this.normalMatrix = new THREE.Matrix3, this.update()
},THREE.VertexNormalsHelper.prototype = Object.create(THREE.Line.prototype),THREE.VertexNormalsHelper.prototype.update = function (e) {
  var t = new THREE.Vector3;
  return function (e) {
    e = ["a", "b", "c", "d"], this.object.updateMatrixWorld(!0), this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
    for (var i = this.geometry.vertices, r = this.object.geometry.vertices, n = this.object.geometry.faces, o = this.object.matrixWorld, a = 0, s = 0, l = n.length; l > s; s++) for (var h = n[s], c = 0, u = h.vertexNormals.length; u > c; c++) {
      var p = h.vertexNormals[c];
      i[a].copy(r[h[e[c]]]).applyMatrix4(o), t.copy(p).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size), t.add(i[a]), a += 1, i[a].copy(t), a += 1
    }
    return this.geometry.verticesNeedUpdate = !0, this
  }
}(),THREE.VertexTangentsHelper = function (e, t, i, r) {
  this.object = e, this.size = void 0 !== t ? t : 1, t = void 0 !== i ? i : 255, r = void 0 !== r ? r : 1,
    i = new THREE.Geometry, e = e.geometry.faces;
  for (var n = 0, o = e.length; o > n; n++) for (var a = 0, s = e[n].vertexTangents.length; s > a; a++) i.vertices.push(new THREE.Vector3), i.vertices.push(new THREE.Vector3);
  THREE.Line.call(this, i, new THREE.LineBasicMaterial({
    color: t,
    linewidth: r
  }), THREE.LinePieces), this.matrixAutoUpdate = !1, this.update()
},THREE.VertexTangentsHelper.prototype = Object.create(THREE.Line.prototype),THREE.VertexTangentsHelper.prototype.update = function (e) {
  var t = new THREE.Vector3;
  return function (e) {
    e = ["a", "b", "c", "d"], this.object.updateMatrixWorld(!0);
    for (var i = this.geometry.vertices, r = this.object.geometry.vertices, n = this.object.geometry.faces, o = this.object.matrixWorld, a = 0, s = 0, l = n.length; l > s; s++) for (var h = n[s], c = 0, u = h.vertexTangents.length; u > c; c++) {
      var p = h.vertexTangents[c];
      i[a].copy(r[h[e[c]]]).applyMatrix4(o), t.copy(p).transformDirection(o).multiplyScalar(this.size), t.add(i[a]), a += 1, i[a].copy(t), a += 1
    }
    return this.geometry.verticesNeedUpdate = !0, this
  }
}(),THREE.WireframeHelper = function (e, t) {
  var i = void 0 !== t ? t : 16777215, r = [0, 0], n = {}, o = function (e, t) {
    return e - t
  }, a = ["a", "b", "c"], s = new THREE.BufferGeometry;
  if (e.geometry instanceof THREE.Geometry) {
    for (var l = e.geometry.vertices, h = e.geometry.faces, c = 0, u = new Uint32Array(6 * h.length), p = 0, d = h.length; d > p; p++) for (var f = h[p], m = 0; 3 > m; m++) {
      r[0] = f[a[m]], r[1] = f[a[(m + 1) % 3]], r.sort(o);
      var E = r.toString();
      void 0 === n[E] && (u[2 * c] = r[0], u[2 * c + 1] = r[1], n[E] = !0, c++)
    }
    for (s.addAttribute("position", new THREE.Float32Attribute(2 * c, 3)), r = s.attributes.position.array, p = 0, d = c; d > p; p++) for (m = 0; 2 > m; m++) c = l[u[2 * p + m]], a = 6 * p + 3 * m, r[a + 0] = c.x, r[a + 1] = c.y, r[a + 2] = c.z
  } else if (e.geometry instanceof THREE.BufferGeometry && void 0 !== e.geometry.attributes.index) {
    for (var l = e.geometry.attributes.position.array, d = e.geometry.attributes.index.array, h = e.geometry.offsets, c = 0, u = new Uint32Array(2 * d.length), f = 0, g = h.length; g > f; ++f) for (var m = h[f].start, E = h[f].count, a = h[f].index, p = m, v = m + E; v > p; p += 3) for (m = 0; 3 > m; m++) r[0] = a + d[p + m], r[1] = a + d[p + (m + 1) % 3], r.sort(o), E = r.toString(), void 0 === n[E] && (u[2 * c] = r[0], u[2 * c + 1] = r[1], n[E] = !0, c++);
    for (s.addAttribute("position", new THREE.Float32Attribute(2 * c, 3)), r = s.attributes.position.array, p = 0, d = c; d > p; p++) for (m = 0; 2 > m; m++) a = 6 * p + 3 * m, c = 3 * u[2 * p + m], r[a + 0] = l[c], r[a + 1] = l[c + 1], r[a + 2] = l[c + 2]
  } else if (e.geometry instanceof THREE.BufferGeometry) for (l = e.geometry.attributes.position.array, c = l.length / 3, u = c / 3, s.addAttribute("position", new THREE.Float32Attribute(2 * c, 3)), r = s.attributes.position.array, p = 0, d = u; d > p; p++) for (m = 0; 3 > m; m++) a = 18 * p + 6 * m, u = 9 * p + 3 * m, r[a + 0] = l[u], r[a + 1] = l[u + 1], r[a + 2] = l[u + 2], c = 9 * p + (m + 1) % 3 * 3, r[a + 3] = l[c], r[a + 4] = l[c + 1], r[a + 5] = l[c + 2];
  THREE.Line.call(this, s, new THREE.LineBasicMaterial({color: i}), THREE.LinePieces), this.matrixAutoUpdate = !1, this.matrixWorld = e.matrixWorld
},THREE.WireframeHelper.prototype = Object.create(THREE.Line.prototype),THREE.ImmediateRenderObject = function () {
  THREE.Object3D.call(this), this.render = function (e) {
  }
},THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype),THREE.LensFlare = function (e, t, i, r, n) {
  THREE.Object3D.call(this), this.lensFlares = [], this.positionScreen = new THREE.Vector3, this.customUpdateCallback = void 0, void 0 !== e && this.add(e, t, i, r, n)
},THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype),THREE.LensFlare.prototype.add = function (e, t, i, r, n, o) {
  void 0 === t && (t = -1), void 0 === i && (i = 0), void 0 === o && (o = 1), void 0 === n && (n = new THREE.Color(16777215)), void 0 === r && (r = THREE.NormalBlending), i = Math.min(i, Math.max(0, i)), this.lensFlares.push({
    texture: e,
    size: t,
    distance: i,
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotation: 1,
    opacity: o,
    color: n,
    blending: r
  })
},THREE.LensFlare.prototype.updateLensFlares = function () {
  var e, t, i = this.lensFlares.length, r = 2 * -this.positionScreen.x, n = 2 * -this.positionScreen.y;
  for (e = 0; i > e; e++) t = this.lensFlares[e], t.x = this.positionScreen.x + r * t.distance, t.y = this.positionScreen.y + n * t.distance, t.wantedRotation = t.x * Math.PI * .25, t.rotation += .25 * (t.wantedRotation - t.rotation)
},THREE.MorphBlendMesh = function (e, t) {
  THREE.Mesh.call(this, e, t), this.animationsMap = {}, this.animationsList = [];
  var i = this.geometry.morphTargets.length;
  this.createAnimation("__default", 0, i - 1, i / 1), this.setAnimationWeight("__default", 1)
},THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype),THREE.MorphBlendMesh.prototype.createAnimation = function (e, t, i, r) {
  t = {
    startFrame: t,
    endFrame: i,
    length: i - t + 1,
    fps: r,
    duration: (i - t) / r,
    lastFrame: 0,
    currentFrame: 0,
    active: !1,
    time: 0,
    direction: 1,
    weight: 1,
    directionBackwards: !1,
    mirroredLoop: !1
  }, this.animationsMap[e] = t, this.animationsList.push(t)
},THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (e) {
  for (var t, i = /([a-z]+)(\d+)/, r = {}, n = this.geometry, o = 0, a = n.morphTargets.length; a > o; o++) {
    var s = n.morphTargets[o].name.match(i);
    if (s && 1 < s.length) {
      var l = s[1];
      r[l] || (r[l] = {
        start: 1 / 0,
        end: -(1 / 0)
      }), s = r[l], o < s.start && (s.start = o), o > s.end && (s.end = o), t || (t = l)
    }
  }
  for (l in r) s = r[l], this.createAnimation(l, s.start, s.end, e);
  this.firstAnimation = t
},THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (e) {
  (e = this.animationsMap[e]) && (e.direction = 1, e.directionBackwards = !1)
},THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (e) {
  (e = this.animationsMap[e]) && (e.direction = -1, e.directionBackwards = !0)
},THREE.MorphBlendMesh.prototype.setAnimationFPS = function (e, t) {
  var i = this.animationsMap[e];
  i && (i.fps = t, i.duration = (i.end - i.start) / i.fps)
},THREE.MorphBlendMesh.prototype.setAnimationDuration = function (e, t) {
  var i = this.animationsMap[e];
  i && (i.duration = t, i.fps = (i.end - i.start) / i.duration)
},THREE.MorphBlendMesh.prototype.setAnimationWeight = function (e, t) {
  var i = this.animationsMap[e];
  i && (i.weight = t)
},THREE.MorphBlendMesh.prototype.setAnimationTime = function (e, t) {
  var i = this.animationsMap[e];
  i && (i.time = t)
},THREE.MorphBlendMesh.prototype.getAnimationTime = function (e) {
  var t = 0;
  return (e = this.animationsMap[e]) && (t = e.time), t
},THREE.MorphBlendMesh.prototype.getAnimationDuration = function (e) {
  var t = -1;
  return (e = this.animationsMap[e]) && (t = e.duration), t
},THREE.MorphBlendMesh.prototype.playAnimation = function (e) {
  var t = this.animationsMap[e];
  t ? (t.time = 0, t.active = !0) : console.warn("animation[" + e + "] undefined")
},THREE.MorphBlendMesh.prototype.stopAnimation = function (e) {
  (e = this.animationsMap[e]) && (e.active = !1)
},THREE.MorphBlendMesh.prototype.update = function (e) {
  for (var t = 0, i = this.animationsList.length; i > t; t++) {
    var r = this.animationsList[t];
    if (r.active) {
      var n = r.duration / r.length;
      r.time += r.direction * e, r.mirroredLoop ? (r.time > r.duration || 0 > r.time) && (r.direction *= -1, r.time > r.duration && (r.time = r.duration, r.directionBackwards = !0), 0 > r.time && (r.time = 0, r.directionBackwards = !1)) : (r.time %= r.duration, 0 > r.time && (r.time += r.duration));
      var o = r.startFrame + THREE.Math.clamp(Math.floor(r.time / n), 0, r.length - 1), a = r.weight;
      o !== r.currentFrame && (this.morphTargetInfluences[r.lastFrame] = 0, this.morphTargetInfluences[r.currentFrame] = 1 * a, this.morphTargetInfluences[o] = 0, r.lastFrame = r.currentFrame, r.currentFrame = o), n = r.time % n / n, r.directionBackwards && (n = 1 - n), this.morphTargetInfluences[r.currentFrame] = n * a, this.morphTargetInfluences[r.lastFrame] = (1 - n) * a
    }
  }
},THREE.LensFlarePlugin = function () {
  function e(e, i) {
    var r = t.createProgram(), n = t.createShader(t.FRAGMENT_SHADER), o = t.createShader(t.VERTEX_SHADER),
      a = "precision " + i + " float;\n";
    return t.shaderSource(n, a + e.fragmentShader), t.shaderSource(o, a + e.vertexShader), t.compileShader(n), t.compileShader(o), t.attachShader(r, n), t.attachShader(r, o), t.linkProgram(r), r
  }

  var t, i, r, n, o, a, s, l, h, c, u, p, d;
  this.init = function (f) {
    t = f.context, i = f, r = f.getPrecision(), n = new Float32Array(16), o = new Uint16Array(6), f = 0, n[f++] = -1, n[f++] = -1, n[f++] = 0, n[f++] = 0, n[f++] = 1, n[f++] = -1, n[f++] = 1, n[f++] = 0, n[f++] = 1, n[f++] = 1, n[f++] = 1, n[f++] = 1, n[f++] = -1, n[f++] = 1, n[f++] = 0, n[f++] = 1, f = 0, o[f++] = 0, o[f++] = 1, o[f++] = 2, o[f++] = 0, o[f++] = 2, o[f++] = 3, a = t.createBuffer(), s = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, a), t.bufferData(t.ARRAY_BUFFER, n, t.STATIC_DRAW), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, s), t.bufferData(t.ELEMENT_ARRAY_BUFFER, o, t.STATIC_DRAW), l = t.createTexture(), h = t.createTexture(), t.bindTexture(t.TEXTURE_2D, l), t.texImage2D(t.TEXTURE_2D, 0, t.RGB, 16, 16, 0, t.RGB, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.bindTexture(t.TEXTURE_2D, h), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 16, 16, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), 0 >= t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (c = !1, u = e(THREE.ShaderFlares.lensFlare, r)) : (c = !0, u = e(THREE.ShaderFlares.lensFlareVertexTexture, r)), p = {}, d = {}, p.vertex = t.getAttribLocation(u, "position"), p.uv = t.getAttribLocation(u, "uv"), d.renderType = t.getUniformLocation(u, "renderType"), d.map = t.getUniformLocation(u, "map"), d.occlusionMap = t.getUniformLocation(u, "occlusionMap"), d.opacity = t.getUniformLocation(u, "opacity"), d.color = t.getUniformLocation(u, "color"), d.scale = t.getUniformLocation(u, "scale"), d.rotation = t.getUniformLocation(u, "rotation"), d.screenPosition = t.getUniformLocation(u, "screenPosition")
  }, this.render = function (e, r, n, o) {
    e = e.__webglFlares;
    var f = e.length;
    if (f) {
      var m = new THREE.Vector3, E = o / n, g = .5 * n, v = .5 * o, y = 16 / o, T = new THREE.Vector2(y * E, y),
        x = new THREE.Vector3(1, 1, 0), R = new THREE.Vector2(1, 1), b = d, y = p;
      t.useProgram(u), t.enableVertexAttribArray(p.vertex), t.enableVertexAttribArray(p.uv), t.uniform1i(b.occlusionMap, 0), t.uniform1i(b.map, 1), t.bindBuffer(t.ARRAY_BUFFER, a), t.vertexAttribPointer(y.vertex, 2, t.FLOAT, !1, 16, 0), t.vertexAttribPointer(y.uv, 2, t.FLOAT, !1, 16, 8), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, s), t.disable(t.CULL_FACE), t.depthMask(!1);
      var H, w, _, S, M;
      for (H = 0; f > H; H++) if (y = 16 / o, T.set(y * E, y), S = e[H], m.set(S.matrixWorld.elements[12], S.matrixWorld.elements[13], S.matrixWorld.elements[14]), m.applyMatrix4(r.matrixWorldInverse), m.applyProjection(r.projectionMatrix), x.copy(m), R.x = x.x * g + g, R.y = x.y * v + v, c || 0 < R.x && R.x < n && 0 < R.y && R.y < o) for (t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, l), t.copyTexImage2D(t.TEXTURE_2D, 0, t.RGB, R.x - 8, R.y - 8, 16, 16, 0), t.uniform1i(b.renderType, 0), t.uniform2f(b.scale, T.x, T.y), t.uniform3f(b.screenPosition, x.x, x.y, x.z), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), t.drawElements(t.TRIANGLES, 6, t.UNSIGNED_SHORT, 0), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, h), t.copyTexImage2D(t.TEXTURE_2D, 0, t.RGBA, R.x - 8, R.y - 8, 16, 16, 0), t.uniform1i(b.renderType, 1), t.disable(t.DEPTH_TEST), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, l), t.drawElements(t.TRIANGLES, 6, t.UNSIGNED_SHORT, 0), S.positionScreen.copy(x), S.customUpdateCallback ? S.customUpdateCallback(S) : S.updateLensFlares(), t.uniform1i(b.renderType, 2), t.enable(t.BLEND), w = 0, _ = S.lensFlares.length; _ > w; w++) M = S.lensFlares[w], .001 < M.opacity && .001 < M.scale && (x.x = M.x, x.y = M.y, x.z = M.z, y = M.size * M.scale / o, T.x = y * E, T.y = y, t.uniform3f(b.screenPosition, x.x, x.y, x.z), t.uniform2f(b.scale, T.x, T.y), t.uniform1f(b.rotation, M.rotation), t.uniform1f(b.opacity, M.opacity), t.uniform3f(b.color, M.color.r, M.color.g, M.color.b), i.setBlending(M.blending, M.blendEquation, M.blendSrc, M.blendDst), i.setTexture(M.texture, 1), t.drawElements(t.TRIANGLES, 6, t.UNSIGNED_SHORT, 0));
      t.enable(t.CULL_FACE), t.enable(t.DEPTH_TEST), t.depthMask(!0)
    }
  }
},THREE.ShadowMapPlugin = function () {
  var e, t, i, r, n, o, a = new THREE.Frustum, s = new THREE.Matrix4, l = new THREE.Vector3, h = new THREE.Vector3,
    c = new THREE.Vector3;
  this.init = function (a) {
    e = a.context, t = a, a = THREE.ShaderLib.depthRGBA;
    var s = THREE.UniformsUtils.clone(a.uniforms);
    i = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s
    }), r = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s,
      morphTargets: !0
    }), n = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s,
      skinning: !0
    }), o = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s,
      morphTargets: !0,
      skinning: !0
    }), i._shadowPass = !0, r._shadowPass = !0, n._shadowPass = !0, o._shadowPass = !0
  }, this.render = function (e, i) {
    t.shadowMapEnabled && t.shadowMapAutoUpdate && this.update(e, i)
  }, this.update = function (u, p) {
    var d, f, m, E, g, v, y, T, x, R = [];
    for (E = 0, e.clearColor(1, 1, 1, 1), e.disable(e.BLEND), e.enable(e.CULL_FACE), e.frontFace(e.CCW), t.shadowMapCullFace === THREE.CullFaceFront ? e.cullFace(e.FRONT) : e.cullFace(e.BACK), t.setDepthTest(!0), d = 0, f = u.__lights.length; f > d; d++) if (m = u.__lights[d], m.castShadow) if (m instanceof THREE.DirectionalLight && m.shadowCascade) for (g = 0; g < m.shadowCascadeCount; g++) {
      var b;
      if (m.shadowCascadeArray[g]) b = m.shadowCascadeArray[g]; else {
        x = m, y = g, b = new THREE.DirectionalLight, b.isVirtual = !0, b.onlyShadow = !0, b.castShadow = !0, b.shadowCameraNear = x.shadowCameraNear, b.shadowCameraFar = x.shadowCameraFar, b.shadowCameraLeft = x.shadowCameraLeft, b.shadowCameraRight = x.shadowCameraRight, b.shadowCameraBottom = x.shadowCameraBottom, b.shadowCameraTop = x.shadowCameraTop, b.shadowCameraVisible = x.shadowCameraVisible, b.shadowDarkness = x.shadowDarkness, b.shadowBias = x.shadowCascadeBias[y], b.shadowMapWidth = x.shadowCascadeWidth[y], b.shadowMapHeight = x.shadowCascadeHeight[y], b.pointsWorld = [], b.pointsFrustum = [], T = b.pointsWorld, v = b.pointsFrustum;
        for (var H = 0; 8 > H; H++) T[H] = new THREE.Vector3, v[H] = new THREE.Vector3;
        T = x.shadowCascadeNearZ[y], x = x.shadowCascadeFarZ[y], v[0].set(-1, -1, T), v[1].set(1, -1, T), v[2].set(-1, 1, T), v[3].set(1, 1, T), v[4].set(-1, -1, x), v[5].set(1, -1, x), v[6].set(-1, 1, x), v[7].set(1, 1, x), b.originalCamera = p, v = new THREE.Gyroscope, v.position.copy(m.shadowCascadeOffset), v.add(b), v.add(b.target), p.add(v), m.shadowCascadeArray[g] = b, console.log("Created virtualLight", b)
      }
      y = m, T = g, x = y.shadowCascadeArray[T], x.position.copy(y.position), x.target.position.copy(y.target.position), x.lookAt(x.target), x.shadowCameraVisible = y.shadowCameraVisible, x.shadowDarkness = y.shadowDarkness, x.shadowBias = y.shadowCascadeBias[T], v = y.shadowCascadeNearZ[T], y = y.shadowCascadeFarZ[T], x = x.pointsFrustum, x[0].z = v, x[1].z = v, x[2].z = v, x[3].z = v, x[4].z = y, x[5].z = y, x[6].z = y, x[7].z = y, R[E] = b, E++
    } else R[E] = m, E++;
    for (d = 0, f = R.length; f > d; d++) {
      if (m = R[d], m.shadowMap || (g = THREE.LinearFilter, t.shadowMapType === THREE.PCFSoftShadowMap && (g = THREE.NearestFilter), m.shadowMap = new THREE.WebGLRenderTarget(m.shadowMapWidth, m.shadowMapHeight, {
          minFilter: g,
          magFilter: g,
          format: THREE.RGBAFormat
        }), m.shadowMapSize = new THREE.Vector2(m.shadowMapWidth, m.shadowMapHeight), m.shadowMatrix = new THREE.Matrix4), !m.shadowCamera) {
        if (m instanceof THREE.SpotLight) m.shadowCamera = new THREE.PerspectiveCamera(m.shadowCameraFov, m.shadowMapWidth / m.shadowMapHeight, m.shadowCameraNear, m.shadowCameraFar); else {
          if (!(m instanceof THREE.DirectionalLight)) {
            console.error("Unsupported light type for shadow");
            continue
          }
          m.shadowCamera = new THREE.OrthographicCamera(m.shadowCameraLeft, m.shadowCameraRight, m.shadowCameraTop, m.shadowCameraBottom, m.shadowCameraNear, m.shadowCameraFar)
        }
        u.add(m.shadowCamera), !0 === u.autoUpdate && u.updateMatrixWorld()
      }
      if (m.shadowCameraVisible && !m.cameraHelper && (m.cameraHelper = new THREE.CameraHelper(m.shadowCamera), m.shadowCamera.add(m.cameraHelper)), m.isVirtual && b.originalCamera == p) {
        for (g = p, E = m.shadowCamera, v = m.pointsFrustum, x = m.pointsWorld, l.set(1 / 0, 1 / 0, 1 / 0), h.set(-(1 / 0), -(1 / 0), -(1 / 0)), y = 0; 8 > y; y++) T = x[y], T.copy(v[y]), THREE.ShadowMapPlugin.__projector.unprojectVector(T, g), T.applyMatrix4(E.matrixWorldInverse), T.x < l.x && (l.x = T.x), T.x > h.x && (h.x = T.x), T.y < l.y && (l.y = T.y), T.y > h.y && (h.y = T.y), T.z < l.z && (l.z = T.z), T.z > h.z && (h.z = T.z);
        E.left = l.x, E.right = h.x, E.top = h.y, E.bottom = l.y, E.updateProjectionMatrix()
      }
      for (E = m.shadowMap, v = m.shadowMatrix, g = m.shadowCamera, g.position.setFromMatrixPosition(m.matrixWorld), c.setFromMatrixPosition(m.target.matrixWorld), g.lookAt(c), g.updateMatrixWorld(), g.matrixWorldInverse.getInverse(g.matrixWorld), m.cameraHelper && (m.cameraHelper.visible = m.shadowCameraVisible), m.shadowCameraVisible && m.cameraHelper.update(), v.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), v.multiply(g.projectionMatrix), v.multiply(g.matrixWorldInverse), s.multiplyMatrices(g.projectionMatrix, g.matrixWorldInverse), a.setFromMatrix(s), t.setRenderTarget(E), t.clear(), x = u.__webglObjects, m = 0, E = x.length; E > m; m++) y = x[m], v = y.object, y.render = !1, !v.visible || !v.castShadow || (v instanceof THREE.Mesh || v instanceof THREE.ParticleSystem) && v.frustumCulled && !a.intersectsObject(v) || (v._modelViewMatrix.multiplyMatrices(g.matrixWorldInverse, v.matrixWorld), y.render = !0);
      for (m = 0, E = x.length; E > m; m++) y = x[m], y.render && (v = y.object, y = y.buffer, H = v.material instanceof THREE.MeshFaceMaterial ? v.material.materials[0] : v.material, T = void 0 !== v.geometry.morphTargets && 0 < v.geometry.morphTargets.length && H.morphTargets, H = v instanceof THREE.SkinnedMesh && H.skinning, T = v.customDepthMaterial ? v.customDepthMaterial : H ? T ? o : n : T ? r : i, y instanceof THREE.BufferGeometry ? t.renderBufferDirect(g, u.__lights, null, T, y, v) : t.renderBuffer(g, u.__lights, null, T, y, v));
      for (x = u.__webglObjectsImmediate, m = 0, E = x.length; E > m; m++) y = x[m], v = y.object, v.visible && v.castShadow && (v._modelViewMatrix.multiplyMatrices(g.matrixWorldInverse, v.matrixWorld), t.renderImmediateObject(g, u.__lights, null, i, v))
    }
    d = t.getClearColor(), f = t.getClearAlpha(), e.clearColor(d.r, d.g, d.b, f), e.enable(e.BLEND), t.shadowMapCullFace === THREE.CullFaceFront && e.cullFace(e.BACK)
  }
},THREE.ShadowMapPlugin.__projector = new THREE.Projector,THREE.SpritePlugin = function () {
  function e(e, t) {
    return e.z !== t.z ? t.z - e.z : t.id - e.id
  }

  var t, i, r, n, o, a, s, l, h, c, u, p, d, f, m, E, g, v, y, T, x, R, b, H, w;
  this.init = function (e) {
    v = e.context, y = e, x = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]), R = new Uint16Array([0, 1, 2, 0, 2, 3]), b = v.createBuffer(), H = v.createBuffer(), v.bindBuffer(v.ARRAY_BUFFER, b), v.bufferData(v.ARRAY_BUFFER, x, v.STATIC_DRAW), v.bindBuffer(v.ELEMENT_ARRAY_BUFFER, H), v.bufferData(v.ELEMENT_ARRAY_BUFFER, R, v.STATIC_DRAW), e = v.createProgram();
    var _ = v.createShader(v.VERTEX_SHADER), S = v.createShader(v.FRAGMENT_SHADER);
    v.shaderSource(_, ["precision " + y.getPrecision() + " float;", "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n")), v.shaderSource(S, ["precision " + y.getPrecision() + " float;", "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n")), v.compileShader(_), v.compileShader(S), v.attachShader(e, _), v.attachShader(e, S), v.linkProgram(e), w = e, E = v.getAttribLocation(w, "position"), g = v.getAttribLocation(w, "uv"), t = v.getUniformLocation(w, "uvOffset"), i = v.getUniformLocation(w, "uvScale"), r = v.getUniformLocation(w, "rotation"), n = v.getUniformLocation(w, "scale"), o = v.getUniformLocation(w, "color"), a = v.getUniformLocation(w, "map"), s = v.getUniformLocation(w, "opacity"), l = v.getUniformLocation(w, "modelViewMatrix"), h = v.getUniformLocation(w, "projectionMatrix"), c = v.getUniformLocation(w, "fogType"), u = v.getUniformLocation(w, "fogDensity"), p = v.getUniformLocation(w, "fogNear"), d = v.getUniformLocation(w, "fogFar"), f = v.getUniformLocation(w, "fogColor"), m = v.getUniformLocation(w, "alphaTest"), e = document.createElement("canvas"), e.width = 8, e.height = 8, _ = e.getContext("2d"), _.fillStyle = "#ffffff", _.fillRect(0, 0, e.width, e.height), T = new THREE.Texture(e), T.needsUpdate = !0
  }, this.render = function (x, R, _, S) {
    if (_ = x.__webglSprites, S = _.length) {
      v.useProgram(w), v.enableVertexAttribArray(E), v.enableVertexAttribArray(g), v.disable(v.CULL_FACE), v.enable(v.BLEND), v.bindBuffer(v.ARRAY_BUFFER, b), v.vertexAttribPointer(E, 2, v.FLOAT, !1, 16, 0), v.vertexAttribPointer(g, 2, v.FLOAT, !1, 16, 8), v.bindBuffer(v.ELEMENT_ARRAY_BUFFER, H), v.uniformMatrix4fv(h, !1, R.projectionMatrix.elements), v.activeTexture(v.TEXTURE0), v.uniform1i(a, 0);
      var M = 0, C = 0, A = x.fog;
      A ? (v.uniform3f(f, A.color.r, A.color.g, A.color.b), A instanceof THREE.Fog ? (v.uniform1f(p, A.near), v.uniform1f(d, A.far), v.uniform1i(c, 1), C = M = 1) : A instanceof THREE.FogExp2 && (v.uniform1f(u, A.density), v.uniform1i(c, 2), C = M = 2)) : (v.uniform1i(c, 0), C = M = 0);
      for (var L, D = [], A = 0; S > A; A++) L = _[A], !1 !== L.visible && (L._modelViewMatrix.multiplyMatrices(R.matrixWorldInverse, L.matrixWorld), L.z = -L._modelViewMatrix.elements[14]);
      for (_.sort(e), A = 0; S > A; A++) L = _[A], !1 !== L.visible && (R = L.material, v.uniform1f(m, R.alphaTest), v.uniformMatrix4fv(l, !1, L._modelViewMatrix.elements), D[0] = L.scale.x, D[1] = L.scale.y, L = x.fog && R.fog ? C : 0, M !== L && (v.uniform1i(c, L), M = L), null !== R.map ? (v.uniform2f(t, R.map.offset.x, R.map.offset.y), v.uniform2f(i, R.map.repeat.x, R.map.repeat.y)) : (v.uniform2f(t, 0, 0), v.uniform2f(i, 1, 1)), v.uniform1f(s, R.opacity), v.uniform3f(o, R.color.r, R.color.g, R.color.b), v.uniform1f(r, R.rotation), v.uniform2fv(n, D), y.setBlending(R.blending, R.blendEquation, R.blendSrc, R.blendDst), y.setDepthTest(R.depthTest), y.setDepthWrite(R.depthWrite), R.map && R.map.image && R.map.image.width ? y.setTexture(R.map, 0) : y.setTexture(T, 0), v.drawElements(v.TRIANGLES, 6, v.UNSIGNED_SHORT, 0));
      v.enable(v.CULL_FACE)
    }
  }
},THREE.DepthPassPlugin = function () {
  this.enabled = !1, this.renderTarget = null;
  var e, t, i, r, n, o, a = new THREE.Frustum, s = new THREE.Matrix4;
  this.init = function (a) {
    e = a.context, t = a, a = THREE.ShaderLib.depthRGBA;
    var s = THREE.UniformsUtils.clone(a.uniforms);
    i = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s
    }), r = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s,
      morphTargets: !0
    }), n = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s,
      skinning: !0
    }), o = new THREE.ShaderMaterial({
      fragmentShader: a.fragmentShader,
      vertexShader: a.vertexShader,
      uniforms: s,
      morphTargets: !0,
      skinning: !0
    }), i._shadowPass = !0, r._shadowPass = !0, n._shadowPass = !0, o._shadowPass = !0
  }, this.render = function (e, t) {
    this.enabled && this.update(e, t)
  }, this.update = function (l, h) {
    var c, u, p, d, f, m;
    for (e.clearColor(1, 1, 1, 1), e.disable(e.BLEND), t.setDepthTest(!0), !0 === l.autoUpdate && l.updateMatrixWorld(), h.matrixWorldInverse.getInverse(h.matrixWorld), s.multiplyMatrices(h.projectionMatrix, h.matrixWorldInverse), a.setFromMatrix(s), t.setRenderTarget(this.renderTarget), t.clear(), m = l.__webglObjects, c = 0, u = m.length; u > c; c++) p = m[c], f = p.object, p.render = !1, !f.visible || (f instanceof THREE.Mesh || f instanceof THREE.ParticleSystem) && f.frustumCulled && !a.intersectsObject(f) || (f._modelViewMatrix.multiplyMatrices(h.matrixWorldInverse, f.matrixWorld), p.render = !0);
    var E;
    for (c = 0, u = m.length; u > c; c++) p = m[c], p.render && (f = p.object, p = p.buffer, f instanceof THREE.ParticleSystem && !f.customDepthMaterial || ((E = f.material instanceof THREE.MeshFaceMaterial ? f.material.materials[0] : f.material) && t.setMaterialFaces(f.material), d = void 0 !== f.geometry.morphTargets && 0 < f.geometry.morphTargets.length && E.morphTargets, E = f instanceof THREE.SkinnedMesh && E.skinning, d = f.customDepthMaterial ? f.customDepthMaterial : E ? d ? o : n : d ? r : i, p instanceof THREE.BufferGeometry ? t.renderBufferDirect(h, l.__lights, null, d, p, f) : t.renderBuffer(h, l.__lights, null, d, p, f)));
    for (m = l.__webglObjectsImmediate, c = 0, u = m.length; u > c; c++) p = m[c], f = p.object, f.visible && (f._modelViewMatrix.multiplyMatrices(h.matrixWorldInverse, f.matrixWorld), t.renderImmediateObject(h, l.__lights, null, i, f));
    c = t.getClearColor(), u = t.getClearAlpha(), e.clearColor(c.r, c.g, c.b, u), e.enable(e.BLEND)
  }
},THREE.ShaderFlares = {
  lensFlareVertexTexture: {
    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
  },
  lensFlare: {
    vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
    fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
  }
},THREE.CSS3DObject = function (e) {
  THREE.Object3D.call(this), this.element = e, this.element.style.position = "absolute", this.addEventListener("removed", function (e) {
    if (null !== this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      for (var t = 0, i = this.children.length; i > t; t++) this.children[t].dispatchEvent(e)
    }
  })
},THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype),THREE.CSS3DSprite = function (e) {
  THREE.CSS3DObject.call(this, e)
},THREE.CSS3DSprite.prototype = Object.create(THREE.CSS3DObject.prototype),THREE.CSS3DRenderer = function () {
  console.log("THREE.CSS3DRenderer", THREE.REVISION);
  var e, t, i, r, n = new THREE.Matrix4, o = document.createElement("div");
  o.style.overflow = "hidden", o.style.WebkitTransformStyle = "preserve-3d", o.style.MozTransformStyle = "preserve-3d", o.style.oTransformStyle = "preserve-3d", o.style.transformStyle = "preserve-3d", this.domElement = o;
  var a = document.createElement("div");
  a.style.WebkitTransformStyle = "preserve-3d", a.style.MozTransformStyle = "preserve-3d", a.style.oTransformStyle = "preserve-3d", a.style.transformStyle = "preserve-3d", o.appendChild(a), this.setClearColor = function () {
  }, this.setSize = function (n, s) {
    e = n, t = s, i = e / 2, r = t / 2, o.style.width = n + "px", o.style.height = s + "px", a.style.width = n + "px", a.style.height = s + "px"
  };
  var s = function (e) {
    return Math.abs(e) < 1e-6 ? 0 : e
  }, l = function (e) {
    var t = e.elements;
    return "matrix3d(" + s(t[0]) + "," + s(-t[1]) + "," + s(t[2]) + "," + s(t[3]) + "," + s(t[4]) + "," + s(-t[5]) + "," + s(t[6]) + "," + s(t[7]) + "," + s(t[8]) + "," + s(-t[9]) + "," + s(t[10]) + "," + s(t[11]) + "," + s(t[12]) + "," + s(-t[13]) + "," + s(t[14]) + "," + s(t[15]) + ")"
  }, h = function (e) {
    var t = e.elements;
    return "translate3d(-50%,-50%,0) matrix3d(" + s(t[0]) + "," + s(t[1]) + "," + s(t[2]) + "," + s(t[3]) + "," + s(-t[4]) + "," + s(-t[5]) + "," + s(-t[6]) + "," + s(-t[7]) + "," + s(t[8]) + "," + s(t[9]) + "," + s(t[10]) + "," + s(t[11]) + "," + s(t[12]) + "," + s(t[13]) + "," + s(t[14]) + "," + s(t[15]) + ")"
  }, c = function (e, t) {
    if (e instanceof THREE.CSS3DObject) {
      var i;
      e instanceof THREE.CSS3DSprite ? (n.copy(t.matrixWorldInverse), n.transpose(), n.copyPosition(e.matrixWorld), n.scale(e.scale), n.elements[3] = 0, n.elements[7] = 0, n.elements[11] = 0, n.elements[15] = 1, i = h(n)) : i = h(e.matrixWorld);
      var r = e.element;
      r.style.WebkitTransform = i, r.style.MozTransform = i, r.style.oTransform = i, r.style.transform = i, r.parentNode !== a && a.appendChild(r)
    }
    for (var o = 0, s = e.children.length; s > o; o++) c(e.children[o], t)
  };
  this.render = function (e, n) {
    var s = .5 / Math.tan(THREE.Math.degToRad(.5 * n.fov)) * t;
    o.style.WebkitPerspective = s + "px", o.style.MozPerspective = s + "px", o.style.oPerspective = s + "px", o.style.perspective = s + "px", e.updateMatrixWorld(), void 0 === n.parent && n.updateMatrixWorld(), n.matrixWorldInverse.getInverse(n.matrixWorld);
    var h = "translate3d(0,0," + s + "px)" + l(n.matrixWorldInverse) + " translate3d(" + i + "px," + r + "px, 0)";
    a.style.WebkitTransform = h, a.style.MozTransform = h, a.style.oTransform = h, a.style.transform = h, c(e, n)
  }
};
var DeviceOrientationController = function (e, t) {
  this.object = e, this.element = t || document, this.freeze = !0, this.enableManualDrag = !0, this.enableManualZoom = !0, this.deviceOrientationManual = !1, this.useQuaternions = !0, this.deviceOrientation = {}, this.screenOrientation = window.orientation || 0, this.manualDragDirection = -1;
  var i, r, n, o, a, s = 0, l = 0, h = 0, c = 0, u = new THREE.Quaternion, p = 1, d = 1, f = new THREE.Vector2,
    m = new THREE.Vector2, E = {AUTO: 0, MANUAL_ROTATE: 1, MANUAL_ZOOM: 2}, g = E.AUTO, v = {
      CALIBRATE_COMPASS: "compassneedscalibration",
      SCREEN_ORIENTATION: "orientationchange",
      MANUAL_CONTROL: "userinteraction",
      ZOOM_CONTROL: "zoom",
      ROTATE_CONTROL: "rotate"
    }, y = window.innerHeight, T = 2e3 * Math.tan(THREE.Math.degToRad((this.object.fov || 75) / 2)),
    x = new THREE.Quaternion, R = function () {
      var e;
      return function (t) {
        e = arguments || {}, e.type = t, e.target = this, this.dispatchEvent(e)
      }.bind(this)
    }.bind(this)();
  this.constrainObjectFOV = function () {
    o = T * (window.innerHeight / y), a = THREE.Math.radToDeg(2 * Math.atan(o / 2e3)), this.object.fov = a
  }.bind(this), this.onDeviceOrientationChange = function (e) {
    this.deviceOrientationManual === !0 && (this.deviceOrientation = e)
  }.bind(this), this.onScreenOrientationChange = function () {
    this.deviceOrientationManual === !0 && (this.screenOrientation = window.orientation || 0, R(v.SCREEN_ORIENTATION))
  }.bind(this), this.onCompassNeedsCalibration = function (e) {
    this.deviceOrientationManual === !0 && (e.preventDefault(), R(v.CALIBRATE_COMPASS))
  }.bind(this), this.onDocumentMouseDown = function (e) {
    this.enableManualDrag === !0 && (e.preventDefault(), g = E.MANUAL_ROTATE, this.freeze = !0, u.copy(this.object.quaternion), s = h = e.pageX, l = c = e.pageY, i = 1200 / window.innerWidth * .2, r = 800 / window.innerHeight * .2, this.element.addEventListener("mousemove", this.onDocumentMouseMove, !1), this.element.addEventListener("mouseup", this.onDocumentMouseUp, !1), R(v.MANUAL_CONTROL + "start"), R(v.ROTATE_CONTROL + "start"))
  }.bind(this), this.onDocumentMouseMove = function (e) {
    h = e.pageX, c = e.pageY;
  }.bind(this), this.onDocumentMouseUp = function (e) {
    this.element.removeEventListener("mousemove", this.onDocumentMouseMove, !1), this.element.removeEventListener("mouseup", this.onDocumentMouseUp, !1), g = E.AUTO, this.freeze = !1, R(v.MANUAL_CONTROL + "end"), R(v.ROTATE_CONTROL + "end")
  }.bind(this), this.onDocumentTouchStart = function (e) {
    switch (e.preventDefault(), e.touches.length) {
      case 1:
        if (this.enableManualDrag !== !0) return;
        g = E.MANUAL_ROTATE, this.freeze = !0, u.copy(this.object.quaternion), s = h = e.touches[0].pageX, l = c = e.touches[0].pageY, i = 1200 / window.innerWidth * .1, r = 800 / window.innerHeight * .1, this.element.addEventListener("touchmove", this.onDocumentTouchMove, !1), this.element.addEventListener("touchend", this.onDocumentTouchEnd, !1), R(v.MANUAL_CONTROL + "start"), R(v.ROTATE_CONTROL + "start");
        break;
      case 2:
        if (this.enableManualZoom !== !0) return;
        g = E.MANUAL_ZOOM, this.freeze = !0, n = this.object.fov, f.set(e.touches[0].pageX, e.touches[0].pageY), m.set(e.touches[1].pageX, e.touches[1].pageY), p = d = f.distanceTo(m), this.element.addEventListener("touchmove", this.onDocumentTouchMove, !1), this.element.addEventListener("touchend", this.onDocumentTouchEnd, !1), R(v.MANUAL_CONTROL + "start"), R(v.ZOOM_CONTROL + "start")
    }
  }.bind(this), this.onDocumentTouchMove = function (e) {
    switch (e.touches.length) {
      case 1:
        h = e.touches[0].pageX, c = e.touches[0].pageY;
        break;
      case 2:
        f.set(e.touches[0].pageX, e.touches[0].pageY), m.set(e.touches[1].pageX, e.touches[1].pageY)
    }
  }.bind(this), this.onDocumentTouchEnd = function (e) {
    this.element.removeEventListener("touchmove", this.onDocumentTouchMove, !1), this.element.removeEventListener("touchend", this.onDocumentTouchEnd, !1), g === E.MANUAL_ROTATE ? (g = E.AUTO, this.freeze = !1, R(v.MANUAL_CONTROL + "end"), R(v.ROTATE_CONTROL + "end")) : g === E.MANUAL_ZOOM && (this.constrainObjectFOV(), g = E.AUTO, this.freeze = !1, R(v.MANUAL_CONTROL + "end"), R(v.ZOOM_CONTROL + "end"))
  }.bind(this);
  var b = function () {
    var e = new THREE.Quaternion, t = new THREE.Euler, i = new THREE.Quaternion,
      r = new THREE.Quaternion(-Math.sqrt(.5), 0, 0, Math.sqrt(.5)), n = 0;
    return function (o, a, s, l) {
      return t.set(a, o, -s, "YXZ"), e.setFromEuler(t), n = -l / 2, i.set(0, Math.sin(n), 0, Math.cos(n)), e.multiply(i), e.multiply(r), e
    }
  }(), H = function () {
    var e = new THREE.Matrix4, t = new THREE.Euler, i = new THREE.Euler, r = new THREE.Euler(-Math.PI / 2, 0, 0, "YXZ"),
      n = new THREE.Matrix4, o = new THREE.Matrix4;
    return o.makeRotationFromEuler(r), function (r, a, s, l) {
      return t.set(a, r, -s, "YXZ"), e.identity(), e.makeRotationFromEuler(t), i.set(0, -l, 0, "YXZ"), n.identity(), n.makeRotationFromEuler(i), e.multiply(n), e.multiply(o), e
    }
  }();
  this.updateManualMove = function () {
    var e, t, o, a, v, y, T, R, b = new THREE.Euler(0, 0, 0, "YXZ"), H = new THREE.Quaternion, w = new THREE.Quaternion,
      _ = 1;
    return function () {
      w.copy(u), g === E.MANUAL_ROTATE ? (e = (l - c) * r * this.manualDragDirection, t = (s - h) * i * this.manualDragDirection, o = THREE.Math.degToRad(e), a = THREE.Math.degToRad(t), H.set(0, Math.sin(a / 2), 0, Math.cos(a / 2)), w.multiply(H), H.set(Math.sin(o / 2), 0, 0, Math.cos(o / 2)), w.multiply(H), v = b.setFromQuaternion(u, "YXZ").z, y = b.setFromQuaternion(w, "YXZ").z, T = b.setFromQuaternion(x || u, "YXZ").z, H.set(0, 0, Math.sin((T - v) / 2), Math.cos((T - v) / 2)), u.multiply(H), H.set(0, 0, Math.sin((T - y) / 2), Math.cos((T - y) / 2)), w.multiply(H), this.object.quaternion.copy(w)) : g === E.MANUAL_ZOOM && (d = f.distanceTo(m), R = p / d, _ >= R && (this.object.fov = n * R, this.object.updateProjectionMatrix()), x && (v = b.setFromQuaternion(u, "YXZ").z, T = b.setFromQuaternion(x, "YXZ").z, H.set(0, 0, Math.sin((T - v) / 2), Math.cos((T - v) / 2)), u.multiply(H), this.object.quaternion.copy(u)))
    }
  }(), this.updateDeviceMove = function () {
    var e, t, i, r, n;
    return function () {
      if (e = THREE.Math.degToRad(this.deviceOrientation.alpha || 0), t = THREE.Math.degToRad(this.deviceOrientation.beta || 0), i = THREE.Math.degToRad(this.deviceOrientation.gamma || 0), r = THREE.Math.degToRad(this.screenOrientation || 0), 0 !== e && 0 !== t && 0 !== i) {
        if (this.useQuaternions ? x = b(e, t, i, r) : (n = H(e, t, i, r), x.setFromRotationMatrix(n)), this.freeze) return;
        this.object.quaternion.copy(x)
      }
    }
  }(), this.update = function () {
    this.deviceOrientationManual ? this.updateDeviceMove() : this.updateManualMove()
  }, this.connect = function () {
    window.addEventListener("resize", this.constrainObjectFOV, !1), window.addEventListener("orientationchange", this.onScreenOrientationChange, !1), window.addEventListener("deviceorientation", this.onDeviceOrientationChange, !1), window.addEventListener("compassneedscalibration", this.onCompassNeedsCalibration, !1), this.element.addEventListener("mousedown", this.onDocumentMouseDown, !1), this.element.addEventListener("touchstart", this.onDocumentTouchStart, !1), this.freeze = !1
  }, this.disconnect = function () {
    this.freeze = !0, window.removeEventListener("resize", this.constrainObjectFOV, !1), window.removeEventListener("orientationchange", this.onScreenOrientationChange, !1), window.removeEventListener("deviceorientation", this.onDeviceOrientationChange, !1), window.removeEventListener("compassneedscalibration", this.onCompassNeedsCalibration, !1), this.element.removeEventListener("mousedown", this.onDocumentMouseDown, !1), this.element.removeEventListener("touchstart", this.onDocumentTouchStart, !1)
  }
};
DeviceOrientationController.prototype = Object.create(THREE.EventDispatcher.prototype), function (e) {
  if ("function" == typeof define && define.amd) define(e); else if ("object" == typeof exports) module.exports = e(); else {
    var t = window.Cookies, i = window.Cookies = e();
    i.noConflict = function () {
      return window.Cookies = t, i
    }
  }
}(function () {
  function e() {
    for (var e = 0, t = {}; e < arguments.length; e++) {
      var i = arguments[e];
      for (var r in i) t[r] = i[r]
    }
    return t
  }

  function t(i) {
    function r(t, n, o) {
      var a;
      if (arguments.length > 1) {
        if (o = e({path: "/"}, r.defaults, o), "number" == typeof o.expires) {
          var s = new Date;
          s.setMilliseconds(s.getMilliseconds() + 864e5 * o.expires), o.expires = s
        }
        try {
          a = JSON.stringify(n), /^[\{\[]/.test(a) && (n = a)
        } catch (l) {
        }
        return n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)), t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), t = t.replace(/[\(\)]/g, escape), document.cookie = [t, "=", n, o.expires && "; expires=" + o.expires.toUTCString(), o.path && "; path=" + o.path, o.domain && "; domain=" + o.domain, o.secure ? "; secure" : ""].join("")
      }
      t || (a = {});
      for (var h = document.cookie ? document.cookie.split("; ") : [], c = /(%[0-9A-Z]{2})+/g, u = 0; u < h.length; u++) {
        var p = h[u].split("="), d = p[0].replace(c, decodeURIComponent), f = p.slice(1).join("=");
        '"' === f.charAt(0) && (f = f.slice(1, -1));
        try {
          if (f = i.read ? i.read(f, d) : i(f, d) || f.replace(c, decodeURIComponent), this.json) try {
            f = JSON.parse(f)
          } catch (l) {
          }
          if (t === d) {
            a = f;
            break
          }
          t || (a[d] = f)
        } catch (l) {
        }
      }
      return a
    }

    return r.get = r.set = r, r.getJSON = function () {
      return r.apply({json: !0}, [].slice.call(arguments))
    }, r.defaults = {}, r.remove = function (t, i) {
      r(t, "", e(i, {expires: -1}))
    }, r.withConverter = t, r
  }

  return t(function () {
  })
}), $(window).load(function () {
  function e() {
    progressTimeout = window.setTimeout(function () {
      "90" == $("#j-progress").text() && pageProgress.update(100), "100" == $("#j-progress").text() ? ($("#j-loading").hide(), $("#j-pane-container").find(">.page1>.fp-tableCell").removeClass("none"), $("#j-cube-page").show(), window.clearTimeout(progressTimeout)) : e()
    }, 200)
  }

  $("#j-pane-container>.page1>.fp-tableCell").addClass("none"), $("#j-pane-container").removeClass("hide"), e()
}), function (e, t) {
  var i = e.documentElement, r = "orientationchange" in window ? "orientationchange" : "resize", n = function () {
    var e = i.clientWidth;
    e && (i.style.fontSize = 100 * (e / 375) + "px")
  };
  e.addEventListener && (t.addEventListener(r, n, !1), e.addEventListener("DOMContentLoaded", n, !1))
}(document, window);
var BROWSER = function () {
  this.wWidth = document.documentElement.clientWidth, this.hHeight = document.documentElement.clientHeight, this.setVideoScreen(".video_full_screen", "center center")
};
BROWSER.prototype = {
  setVideoScreen: function (e, t) {
    var i, r = this.wWidth, n = this.hHeight, o = r / n, a = 320 / 504;
    i = a > o ? n / 504 : r / 320, $(e).attr("style", "-webkit-transform:scale(" + i + ");transform:scale(" + i + ");-webkit-transform-origin:" + t + ";transform-origin:" + t + ";")
  }, browser: {
    versions: function () {
      var e = navigator.userAgent;
      navigator.appVersion;
      return {
        trident: e.indexOf("Trident") > -1,
        presto: e.indexOf("Presto") > -1,
        webKit: e.indexOf("AppleWebKit") > -1,
        gecko: e.indexOf("Gecko") > -1 && -1 == e.indexOf("KHTML"),
        mobile: !!e.match(/AppleWebKit.*Mobile.*/),
        ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
        iPhone: e.indexOf("iPhone") > -1,
        iPad: e.indexOf("iPad") > -1,
        webApp: -1 == e.indexOf("Safari"),
        weixin: e.indexOf("MicroMessenger") > -1,
        qq: " qq" == e.match(/\sQQ/i)
      }
    }(), language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
}, $(function () {
  function e() {
    h.browser.versions.mobile && h.browser.versions.android && (c = !1, u = !1, p = !0)
  }

  function t() {
    function e(e, t) {
      var i = Math.PI,
        r = i / 2;
      t = t || 512;
      for (var n = [{
        url: e + "/0001.jpg",
        bgc: "white",
        position: [-t, 0, 0],
        rotation: [0, r, 0]
      }, {
        url: e + "/0002.jpg",
        bgc: "red",
        position: [t, 0, 0],
        rotation: [0, -r, 0]
      }, {
        url: e + "/0001.jpg",
        bgc: "blue",
        position: [0, t, 0],
        rotation: [r, 0, i]
      },
        {url: e + "/0002.jpg",
          bgc: "gray",
          position: [0, -t, 0],
          rotation: [-r, 0, i]
        },
        {
        url: e + "/0001.jpg",
        bgc: "green",
        position: [0, 0, t],
        rotation: [0, i, 0]
      }, {
        url: e + "/0002.jpg",
        bgc: "black",
        position: [0, 0, -t],
        rotation: [0, 0, 0]
      }], o = new THREE.Object3D, a = 0; a < n.length; a++) {
        var s = n[a],
          l = document.createElement("div");
          l.style.width = 2 * t + 2 + "px",
          l.style.height = 2 * t + 2 + "px",
          l.style.backgroundImage = "url(" + s.url + ")",
          l.style.backgroundSize = "cover",
          l.id = "section_" + a;
        var h = new THREE.CSS3DObject(l);
        h.position.fromArray(s.position), h.rotation.fromArray(s.rotation), o.add(h)
      }
      return o
    }

    function t() {
      f.aspect = window.innerWidth / window.innerHeight, f.updateProjectionMatrix(), E.setSize(window.innerWidth, window.innerHeight)
    }

    function i(e) {
      e.preventDefault(), document.addEventListener("mousemove", n, !1), document.addEventListener("mouseup", o, !1)
    }

    function n(e) {
      var t = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
        i = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
      v -= .1 * t, y += .1 * i, $("#j-cube-page").find(".angle").text(Math.abs(Math.round(v % 360)) + "°")
    }

    function o(e) {
      document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", o)
    }

    function a(e) {
      f.fov -= .05 * e.wheelDeltaY, f.updateProjectionMatrix()
    }

    function s() {
      $("#section_0").append("<div class='button_ball left_button_01' data-planet='connect'><div class='ball'><img src='img/ball/connect.gif' class='ball-qq'></div><i class='connect-tip'></i><i class='name'></i></div><div class='button_ball left_button_02' data-planet='mars'><div class='ball'><i class='shadow'></i><div class='ball-img ball-mars ball-qi'></div></div><i class='name'></i></div>"), $("#section_1").append("<div class='button_ball right_button_01' data-planet='saturn'><div class='ball'><div class='ball-img ball-tu'></div></div><i class='name'></i></div>"), $("#section_2").append("<div class='button_ball up_button_01' data-planet='qlippie'><div class='ball'><img src='img/ball/qlippie.gif' class='ball-qlippie'></div><i class='name'></i></div>"), $("#section_3").append("<div class='button_ball bottom_button_01' data-planet='jupiter'><div class='ball'><i class='shadow'></i><div class='ball-img ball-jupiter'></div></div><i class='name'></i></div>"), $("#section_4").append("<div class='button_ball back_button_01' data-planet='sun'><div class='ball'><i class='shadow'></i><div class='ball-img ball-sun'></div></div><i class='sun-tip'></i><i class='name'></i></div>"), $("#section_5").append("<div class='button_ball front_button_01' data-planet='earth'><div class='ball'><i class='shadow'></i><i class='sate'></i><div class='ball-img ball-earth'></div></div><i class='name'></i></div><div class='button_ball front_button_02' data-planet='moon'><div class='ball'><i class='shadow'></i><div class='ball-img ball-moon'></div></div><i class='name'></i></div>")
    }

    function l() {
      if (h.browser.versions.mobile) if (u) {
        g.deviceOrientationManual = !0, g.enableManualDrag = !1;
        var e = $(".btn-lock").removeClass("none");
        e.off().on("touchend", function () {
          g.deviceOrientationManual = !g.deviceOrientationManual, g.enableManualDrag = !g.enableManualDrag, g.enableManualDrag ? ("1" != Cookies.get("drag") && ($(".lock-tip").addClass("none"), $("#cube-guide").show().find(".guide-android").show(), setTimeout(function () {
            $("#cube-guide").hide()
          }, 2e3), Cookies.set("drag", "1", {expires: 30})), e.addClass("lock-stop")) : e.removeClass("lock-stop")
        }), "1" != Cookies.get("drag") && $(".lock-tip").removeClass("none")
      } else g.deviceOrientationManual = !1, g.enableManualDrag = !0; else document.addEventListener("mousedown", i, !1), document.addEventListener("mousewheel", a, !1);
      window.addEventListener("resize", t, !1)
    }

    function c() {
      T != Math.abs(Math.round(4 * f.rotation.y * 180 / Math.PI)) && (T = Math.abs(Math.round(4 * f.rotation.y * 180 / Math.PI)), $("#j-cube-page").find(".angle").text(T + "°"))
    }

    function p() {
      f = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 100, 1e3), f.lookAt({
        x: 0,
        y: 0,
        z: 0
      }), window._camera = f, m = new THREE.Scene;
      var t = e("img", 256);
      m.add(t), E = new THREE.CSS3DRenderer, E.setSize(window.innerWidth, window.innerHeight), $("#quanjing").find(".main").append(E.domElement), g = new DeviceOrientationController(f, E.domElement), g.connect(), l()
    }

    function d() {
      c(), g.update(), E.render(m, f), requestAnimationFrame(d)
    }

    var f, m, E, g, v = 90, y = 0, T = 0;
    p(), d(), setTimeout(function () {
      s(), r()
    }, 200)
  }

  function i() {
    var e = new IScroll("#quanjing-bf", {
      scrollX: !0,
      freeScroll: !0,
      indicators: [{
        el: document.getElementById("quanjing-bg"),
        resize: !1,
        ignoreBoundaries: !0,
        speedRatioY: .5,
        speedRatioX: .5
      }]
    });
    e.scrollTo(-(e.scrollerWidth - e.wrapperWidth) / 2, -(e.scrollerHeight - e.wrapperHeight) / 2), document.addEventListener("touchmove", function () {
      $("#j-cube-page").find(".angle").text(Math.abs(Math.round(e.x % 360)) + "°")
    }, !1), r()
  }

  function r() {
    var e = $("#j-cube-page"), t = e.find(".pop");
    e.on("touchstart", ".button_ball", function (e) {
      var i = $(this);
      i.unbind("touchend").unbind("touchmove");
      var r, o = e.originalEvent.touches[0];
      i.bind("touchend", function (e) {
        if (i.hasClass("ball-bounce")) return !1;
        var r = d[i.data("planet")], o = new Template($("#" + r.popType).html());
        t.html(o.render(r)), ("tpl-dialog-video" == r.popType || "tpl-dialog-video-qlippie" == r.popType) && n(r.vid), i.addClass("ball-bounce"), setTimeout(function () {
          if (t.addClass("show"), r.dis) {
            var e = {
              useEasing: !1,
              useGrouping: !0,
              separator: ",",
              decimal: ".",
              prefix: "",
              suffix: "",
              duration: .8
            }, n = new CountUp("j-disCount", Math.round(r.dis / 2), r.dis, 0, e.duration, e);
            n.start()
          }
          if ("tpl-dialog-star" == r.popType) {
            var o = new IScroll("#j-star-list", {bounce: !1});
            setTimeout(function () {
              o.scrollTo(0, o.maxScrollY, 6e3, IScroll.utils.ease.quadratic)
            }, 1200)
          }
          i.removeClass("ball-bounce").addClass("ball-select")
        }, 400), MtaH5.clickStat(i.data("planet"))
      }), i.bind("touchmove", function (e) {
        r = e.originalEvent.touches[0];
        var t = Math.pow(o.pageX - r.pageX, 2), n = Math.pow(o.pageY - r.pageY, 2);
        h.browser.versions.android ? Math.sqrt(t + n) > 20 && i.unbind("touchend") : i.unbind("touchend")
      })
    }), t.on("touchend", ".close,.pop-mask", function () {
      t.removeClass("show"), t.empty("")
    }), t.on("touchend", ".btn-more", function () {
      window.location.href = "//qzs.qq.com/iot/mobile/starplan/index.html"
    }), t.on("touchend", ".btn-friend", function () {
      t.removeClass("show"), t.empty(""), $("#share-guide").show(), MtaH5.clickStat("share")
    }), e.find(".front>.fb").off().on("touchmove", function (e) {
      e.preventDefault(), e.stopPropagation()
    }), t.on("touchmove", function (e) {
      e.preventDefault()
    }), e.find(".guide").on("touchend", function () {
      $(this).hide()
    }).on("touchmove", function (e) {
      e.preventDefault()
    })
  }

  function n(e) {
    window.video = new tvp.VideoInfo, video.setVid(e), window.player = new tvp.Player, player.create({
      video: video,
      modId: "video-box",
      pic: tvp.common.getVideoSnapMobile(e),
      isHtml5ShowLoadingAdOnStart: !1,
      autoplay: !1
    })
  }

  function o() {
    function e() {
      i = document.createElement("audio"), i.autoplay = "autoplay", i.loop = "loop", i.src = r, i.load(), i.play(), i.oncanplay = function () {
        i.play()
      };
      var e = -1;
      i.ontimeupdate = function (t) {
        e == i.currentTime ? h.browser.versions.ios && !n && (i.pause(), i.currentTime = 0, i.play()) : e = i.currentTime
      }
    }

    function t(e) {
      return e ? (h.browser.versions.android, i.play(), $(".btn-music").removeClass("music-stop"), void 0) : (h.browser.versions.android, void(i.paused ? (n = !1, i.play(), $(".btn-music").removeClass("music-stop")) : (n = !0, i.pause(), $(".btn-music").addClass("music-stop"))))
    }

    var i = document.getElementById("j-bgm"), r = "img/starmixdown.mp3", n = !1;
    $(".btn-music").bind("touchend", function () {
      t()
    }), $(window).one("touchstart", function () {
      t(!0)
    }), h.browser.versions.android, e()
  }

  function a() {
    var e = {
      title: "QQ物联星球计划",
      desc: "QQ物联带你一起太空旅行！看水星看土星！3月9日带你看日全食直播！",
      link: location.href,
      imgUrl: "http://qzs.qq.com/open_proj/op_mt_proj/qq-controller-astronomic/img/banner.jpg",
      trigger: function (e) {
      },
      complete: function (e) {
      },
      cancel: function (e) {
      }
    };
    window.wx ? (wx.onMenuShareTimeline({
      title: e.desc,
      desc: e.desc,
      link: e.link,
      imgUrl: e.imgUrl,
      trigger: e.trigger,
      complete: e.complete,
      cancel: e.cancel
    }), wx.onMenuShareAppMessage(e), wx.onMenuShareQQ(e), wx.onMenuShareWeibo(e)) : window.mqq && mqq.data.setShareInfo({
      title: e.title,
      desc: e.desc,
      share_url: e.link,
      image_url: e.imgUrl
    })
  }

  function s() {
    document.addEventListener("WeixinJSBridgeReady", function () {
      a()
    }, !1)
  }

  function l() {
    e(), o(), $("#j-pane-container").fullpage({
      onLeave: function (e, r, n) {
        2 != r || ($.fn.fullpage.setAllowScrolling(!1), c ? ($("#quanjing").show(), $("#cube-guide").show().find(".guide-ios").show(), t()) : ($("#quanjing-bf").show(), $("#cube-guide").show().find(".guide-android").show(), i()), $("#j-pane-container").find("> .page2").one("touchstart", function (e) {
          e.preventDefault(), $(this).addClass("leaving");
          var t = $(this);
          setTimeout(function () {
            t.fadeOut(500), setTimeout(function () {
              $("#cube-guide").hide().find(".guide-ios, .guide-android").hide(), $("#j-pane-container").empty(), p && $("#j-cube-page").addClass("moving")
            }, 3e3)
          }, 500)
        }))
      }
    }), UA.wx ? $.cachedScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js").done(function (e, t) {
      $.ajax({
        url: "http://iot.qq.com/app/get_signature",
        data: {url: location.href.split("#")[0]},
        dataType: "jsonp",
        jsonp: "cb",
        success: function (e) {
          var t = e.code || e.ret, i = e.data;
          0 == t && i ? (i.jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"], wx.config(i), wx.ready(function () {
            a()
          })) : s()
        },
        error: function () {
          s()
        }
      })
    }) : UA.qq && $.cachedScript("http://open.mobile.qq.com/sdk/qqapi.js?_bid=152").done(function (e, t) {
      a()
    })
  }

  var h = new BROWSER, c = !0, u = !0, p = !0, d = {
    connect: {
      popType: "tpl-dialog-star",
      far: "发现可以连接一切的",
      name: '<span class="qqfont">QQ</span>物联星',
      title: "所有直播预告",
      desc: "2016年星球大事件直播时间表",
      time: ""
    },
    qlippie: {
      vid: "d0179ulwgdm",
      popType: "tpl-dialog-video",
      far: "发现时尚的人才能看见的",
      name: "Qlippie星",
      title: "Qlippie星",
      desc: "找到了穿戴式相机Qlippie拍摄的视频",
      time: ""
    },
    mars: {
      popType: "tpl-dialog-tudou",
      far: '发现距您<span id="j-disCount">227，940，000</span>km的',
      dis: 22794e4,
      name: "火星",
      title: "火星",
      desc: "找到一棵马特达蒙留下的土豆",
      time: ""
    },
    saturn: {
      vid: "i0179383ls0",
      popType: "tpl-dialog-video",
      far: '发现距您<span id="j-disCount">1，429，400，000</span>km的',
      dis: 14294e5,
      name: "土星",
      title: "土星直播预告：",
      desc: "2016年5月－6月 土星观测直播！",
      time: ""
    },
    jupiter: {
      vid: "p01798505pu",
      popType: "tpl-dialog-video",
      far: '发现距您<span id="j-disCount">778，330，000</span>km的',
      dis: 77833e4,
      name: "木星",
      title: "木星直播预告：",
      desc: "2016年2月－3月 木星观测直播！",
      time: ""
    },
    sun: {
      vid: "c0179fb0xx7",
      popType: "tpl-dialog-video",
      far: '发现距您<span id="j-disCount">149，600，000</span>km的',
      dis: 1496e5,
      name: "太阳",
      title: "太阳直播预告：",
      desc: "2016年3月9日 日全食直播",
      time: ""
    },
    earth: {
      vid: "s0179mprp7q",
      popType: "tpl-dialog-video",
      far: "发现地球上的",
      name: "深圳市天文台",
      title: "天文台直播预告：",
      desc: "每天7:03 深圳市天文台日出直播",
      time: ""
    },
    moon: {
      vid: "x0179dujzct",
      popType: "tpl-dialog-video",
      far: '发现距您<span id="j-disCount">384，400</span>km的月球',
      name: "月球",
      dis: 384400,
      title: "月球直播预告：",
      desc: "2016年9月15日 中秋满月直播！",
      time: ""
    }
  };
  l()
});