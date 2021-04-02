!function(e) {
    function t(n) {
        if (a[n])
            return a[n].exports;
        var o = a[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(o.exports, o, o.exports, t),
            o.loaded = !0,
            o.exports
    }
    var a = {};
    return t.m = e,
        t.c = a,
        t.p = "/assets/",
        t(0)
}([function(e, t, a) {
    e.exports = a(1)
}
    , function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                    default: e
                }
        }
        var o = a(2)
            , r = n(o)
            , i = a(3)
            , d = n(i)
            , s = a(7)
            , u = n(s)
            , c = a(8)
            , m = n(c)
            , p = r.default.cdnPath
            , g = r.default.pageHeight = window.innerHeight;
        r.default.game = new Phaser.Game(640,g,Phaser.CANVAS,"stage",function(e) {
                this.init = function() {
                    e.state.add("preload", d.default),
                        e.state.add("index", u.default),
                        e.state.add("game", m.default)
                }
                    ,
                    this.preload = function() {
                        e.load.crossOrigin = "anonymous",
                            e.load.spritesheet("loading", p + "images/game/loading.png", 275, 354)
                    }
                    ,
                    this.create = function() {
                        e.state.start("preload")
                    }
            }
            ,!0);
        $(function() {
            FastClick.attach(document.body),
                $(".btn-wraper2 .btn-jiang").click(function() {
                    if (!$(this).hasClass("disable")) {
                        var e = Date.now();
                        location.replace("luck.html?r=" + e)
                    }
                }),
                $(".btn-again").click(function() {
                    var e = Date.now();
                    location.replace("index.html?r=" + e)
                }),
                $(".btn-share").click(function() {
                    $("#pop-share").show()
                }),
                $("#pop-share").click(function() {
                    $("#pop-share").hide()
                })
        })
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = {
                cdnPath: ""
            }
    }
    , function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                    default: e
                }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e) {
                var t;
                this.init = function() {
                    var a = e.add.sprite(e.width / 2, 100, "loading");
                    a.anchor.set(.5, 0),
                        a.animations.add("run"),
                        a.animations.play("run", 8, !0),
                        t = e.add.text(e.width / 2, 420, "加载中...0%"),
                        t.anchor.set(.5, 0)
                }
                    ,
                    this.preload = function() {
                        e.load.crossOrigin = "anonymous",
                            e.load.onFileComplete.add(function(e) {
                                t.text = "加载中..." + e + "%"
                            }),
                            e.load.image("index_bg", m + "images/index/bg.png"),
                            e.load.spritesheet("index_run", m + "images/index/run.png", 640, 848),
                            e.load.image("index_logo", m + "images/index/logo.png"),
                            e.load.image("index_title", m + "images/index/title.png"),
                            e.load.image("index_start_btn", m + "images/index/start_btn.png"),
                            e.load.image("game_bg", m + "images/game/bg.png"),
                            e.load.image("game_logo", m + "images/game/logo.png"),
                            e.load.spritesheet("game_guy", m + "images/game/guy.png", 176, 377),
                            e.load.spritesheet("game_control", m + "images/game/control.png", 233, 102),
                            e.load.spritesheet("game_road", m + "images/game/road.png", 640, 780),
                            e.load.atlasJSONHash("game_spots", m + "images/game/spots.png", "", i.gameSpotsJson),
                            e.load.atlasJSONHash("game_spots_name", m + "images/game/spots_name.png", "", i.gameSpotsNameJson),
                            e.load.atlasJSONHash("game_ad", m + "images/game/aadd.png", "", s.default),
                            e.load.image("game_time", m + "images/game/time.png"),
                            e.load.image("game_mile", m + "images/game/mile.png?v2"),
                            e.load.image("game_progress1", m + "images/game/progress1.png"),
                            e.load.image("game_progress2", m + "images/game/progress2.png"),
                            e.load.image("game_finish", m + "images/game/finish.png"),
                            e.load.spritesheet("game_finger", m + "images/game/finger.png", 300, 254),
                            e.load.audioSprite("sound_run", m + "images/sound/run.mp3", "", c.default)
                    }
                    ,
                    this.create = function() {
                        e.state.start("index");
                        var t = new Audio;
                        t.preload = "auto",
                            t.loop = !0,
                            t.autoplay = "autoplay",
                            t.src = m + "images/sound/bg.mp3",
                            t.play(),
                            t.addEventListener("play", function() {
                                $("#music-btn").removeClass("off").show()
                            }),
                            t.addEventListener("pause", function() {
                                $("#music-btn").addClass("off")
                            }),
                            $("#music-btn").click(function() {
                                $(this).hasClass("off") ? (t.play(),
                                        e.sound.mute = !1) : (t.pause(),
                                        e.sound.mute = !0)
                            })
                    }
            }
        ;
        var o = a(2)
            , r = n(o)
            , i = a(4)
            , d = a(5)
            , s = n(d)
            , u = a(6)
            , c = n(u)
            , m = r.default.cdnPath
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.gameSpotsJson = {
            frames: {
                "什么阁.png": {
                    frame: {
                        x: 0,
                        y: 319,
                        w: 337,
                        h: 299
                    },
                    rotated: !1,
                    trimmed: !1,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: 337,
                        h: 299
                    },
                    sourceSize: {
                        w: 337,
                        h: 299
                    }
                },
                "岳麓山_.png": {
                    frame: {
                        x: 293,
                        y: 0,
                        w: 330,
                        h: 313
                    },
                    rotated: !1,
                    trimmed: !1,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: 330,
                        h: 313
                    },
                    sourceSize: {
                        w: 330,
                        h: 313
                    }
                },
                "新民学会旧址.png": {
                    frame: {
                        x: 623,
                        y: 0,
                        w: 332,
                        h: 319
                    },
                    rotated: !1,
                    trimmed: !1,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: 332,
                        h: 319
                    },
                    sourceSize: {
                        w: 332,
                        h: 319
                    }
                },
                "梅溪湖.png": {
                    frame: {
                        x: 352,
                        y: 623,
                        w: 363,
                        h: 301
                    },
                    rotated: !1,
                    trimmed: !1,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: 363,
                        h: 301
                    },
                    sourceSize: {
                        w: 363,
                        h: 301
                    }
                },
                "橘子.png": {
                    frame: {
                        x: 0,
                        y: 0,
                        w: 293,
                        h: 276
                    },
                    rotated: !1,
                    trimmed: !1,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: 293,
                        h: 276
                    },
                    sourceSize: {
                        w: 293,
                        h: 276
                    }
                },
                "洋湖湿地.png": {
                    frame: {
                        x: 337,
                        y: 319,
                        w: 338,
                        h: 304
                    },
                    rotated: !1,
                    trimmed: !1,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: 338,
                        h: 304
                    },
                    sourceSize: {
                        w: 338,
                        h: 304
                    }
                },
                "贺龙.png": {
                    frame: {
                        x: 0,
                        y: 623,
                        w: 352,
                        h: 318
                    },
                    rotated: !1,
                    trimmed: !1,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: 352,
                        h: 318
                    },
                    sourceSize: {
                        w: 352,
                        h: 318
                    }
                }
            },
            meta: {
                app: "http://www.codeandweb.com/texturepacker",
                version: "1.0",
                image: "spots.png",
                format: "RGBA8888",
                size: {
                    w: 955,
                    h: 941
                },
                scale: "1",
                smartupdate: "$TexturePacker:SmartUpdate:b704e705b07a19851852fa22a4c30a76:e0f330f2b4f75c135c9d52595ef5ccee:84a5ba7c9e232fbf9beac232b4e608d8$"
            }
        },
            t.gameSpotsNameJson = {
                frames: {
                    "1.png": {
                        frame: {
                            x: 0,
                            y: 42,
                            w: 191,
                            h: 40
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 191,
                            h: 40
                        },
                        sourceSize: {
                            w: 191,
                            h: 40
                        }
                    },
                    "2.png": {
                        frame: {
                            x: 0,
                            y: 82,
                            w: 191,
                            h: 40
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 191,
                            h: 40
                        },
                        sourceSize: {
                            w: 191,
                            h: 40
                        }
                    },
                    "3.png": {
                        frame: {
                            x: 0,
                            y: 203,
                            w: 228,
                            h: 43
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 228,
                            h: 43
                        },
                        sourceSize: {
                            w: 228,
                            h: 43
                        }
                    },
                    "4.png": {
                        frame: {
                            x: 0,
                            y: 0,
                            w: 115,
                            h: 40
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 115,
                            h: 40
                        },
                        sourceSize: {
                            w: 115,
                            h: 40
                        }
                    },
                    "5.png": {
                        frame: {
                            x: 0,
                            y: 163,
                            w: 227,
                            h: 40
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 227,
                            h: 40
                        },
                        sourceSize: {
                            w: 227,
                            h: 40
                        }
                    },
                    "6.png": {
                        frame: {
                            x: 115,
                            y: 0,
                            w: 115,
                            h: 42
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 115,
                            h: 42
                        },
                        sourceSize: {
                            w: 115,
                            h: 42
                        }
                    },
                    "7.png": {
                        frame: {
                            x: 0,
                            y: 122,
                            w: 226,
                            h: 41
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 226,
                            h: 41
                        },
                        sourceSize: {
                            w: 226,
                            h: 41
                        }
                    }
                },
                meta: {
                    app: "http://www.codeandweb.com/texturepacker",
                    version: "1.0",
                    image: "spots_name.png",
                    format: "RGBA8888",
                    size: {
                        w: 230,
                        h: 246
                    },
                    scale: "1",
                    smartupdate: "$TexturePacker:SmartUpdate:346dcc55d3d0d8fc367e784369ccf775:6a830e8995c430aac7dedf3b96716098:860bbfea9d27a8b517b357908b9e29d5$"
                }
            }
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = {
                frames: {
                    "ad1.png": {
                        frame: {
                            x: 0,
                            y: 0,
                            w: 252,
                            h: 80
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 252,
                            h: 80
                        },
                        sourceSize: {
                            w: 252,
                            h: 80
                        }
                    },
                    "ad2.png": {
                        frame: {
                            x: 252,
                            y: 0,
                            w: 293,
                            h: 80
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 293,
                            h: 80
                        },
                        sourceSize: {
                            w: 293,
                            h: 80
                        }
                    },
                    "ad3.png": {
                        frame: {
                            x: 545,
                            y: 0,
                            w: 293,
                            h: 80
                        },
                        rotated: !1,
                        trimmed: !1,
                        spriteSourceSize: {
                            x: 0,
                            y: 0,
                            w: 293,
                            h: 80
                        },
                        sourceSize: {
                            w: 293,
                            h: 80
                        }
                    }
                },
                meta: {
                    app: "http://www.codeandweb.com/texturepacker",
                    version: "1.0",
                    image: "aadd.png",
                    format: "RGBA8888",
                    size: {
                        w: 838,
                        h: 80
                    },
                    scale: "1",
                    smartupdate: "$TexturePacker:SmartUpdate:0542e45548fd122778cd3bf25033064b:5623b9eebbbe5b507c994fcd73008cc3:7d033bef15023dae0774fe664b78386e$"
                }
            }
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = {
                spritemap: {
                    s1: {
                        start: .314,
                        end: .473,
                        loop: !1
                    },
                    s2: {
                        start: .654,
                        end: .849,
                        loop: !1
                    },
                    s3: {
                        start: .974,
                        end: 1.189,
                        loop: !1
                    },
                    s4: {
                        start: 1.286,
                        end: 1.457,
                        loop: !1
                    },
                    s5: {
                        start: 1.621,
                        end: 1.795,
                        loop: !1
                    },
                    s6: {
                        start: 1.939,
                        end: 2.149,
                        loop: !1
                    },
                    s7: {
                        start: 2.274,
                        end: 2.489,
                        loop: !1
                    },
                    s8: {
                        start: 2.619,
                        end: 2.817,
                        loop: !1
                    }
                }
            }
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e) {
                function t(t) {
                    var a = t.x
                        , n = t.y;
                    a >= 62 && a <= 168 && n >= e.height - 232 && n <= e.height - 101 ? $("#pop-rule").show() : a >= 494 && a <= 613 && n >= e.height - 251 && n <= e.height - 139 && $("#pop-jiangpin").show()
                }
                this.create = function() {
                    var a = (e.add.image(0, 0, "index_bg"),
                        e.add.sprite(0, 0, "index_run"));
                    a.y = e.height - a.height,
                        a.animations.add("run"),
                        a.animations.play("run", 5, !0);
                    var n = (e.add.image(10, 23, "index_logo"),
                        e.add.image(e.width / 2, 77, "index_title"));
                    n.anchor.set(.5, 0);
                    var o = e.add.button(e.width / 2, 0, "index_start_btn", function() {
                        e.input.onUp.remove(t),
                            e.state.start("game")
                    });
                    o.anchor.set(.5, 1),
                        o.y = e.height - 72,
                        e.input.onUp.add(t),
                        $("#pop-rule .close").click(function() {
                            $("#pop-rule").hide()
                        }),
                        $("#pop-jiangpin .close").click(function() {
                            $("#pop-jiangpin").hide()
                        })
                }
            }
    }
    , function(e, t, a) {
        "use strict";
        function n(e) {
            var t = e.add.image(e.width / 2, f.y + 50, "game_ad", y);
            t.anchor.set(.5, 0),
                t.scale.set(.9),
                t.alpha = 0;
            var a = e.add.tween(t);
            return a.to({
                alpha: 1
            }, 500, "Linear", !0),
            ++y >= 3 && (y = 0),
                t
        }
        function o(e, t) {
            var a = e.add.tween(t);
            a.to({
                alpha: 0
            }, 500, "Linear", !0),
                a.onComplete.add(function() {
                    t.destroy()
                })
        }
        function r(e) {
            var t = e.add.image(0, 500, "game_spots");
            t.sendToBack(),
                t.moveUp(),
                t.frame = 0,
                t.anchor.set(1, 1),
                t.exists = !0,
                t.y = f.y + 90 + 300,
                t.x = 400;
            var a = e.add.tween(t);
            a.to({
                y: f.y + 90
            }, 3e3, "Linear", !1),
                a.onComplete.add(function() {
                    var a = e.add.tween(t);
                    a.to({
                        x: t.x - 300,
                        y: t.y + 50,
                        angle: -10
                    }, 4e3, "Linear", !0),
                        a.onComplete.add(function() {
                            p(t, e)
                        }),
                        a.onStart.add(function() {
                            l(e, n)
                        })
                }),
                a.start();
            var n = g(e, 1)
        }
        function i(e) {
            var t = e.add.image(0, 500, "game_spots");
            t.sendToBack(),
                t.moveUp(),
                t.frame = 1,
                t.anchor.set(1, 1),
                t.exists = !0,
                t.y = f.y + 85 + 320,
                t.x = 420;
            var a = e.add.tween(t);
            a.to({
                y: f.y + 85
            }, 3e3, "Linear", !1),
                a.onComplete.add(function() {
                    var a = e.add.tween(t);
                    a.to({
                        x: t.x - 300,
                        y: t.y + 50,
                        angle: -20
                    }, 4e3, "Linear", !0),
                        a.onComplete.add(function() {
                            p(t, e)
                        }),
                        a.onStart.add(function() {
                            l(e, n)
                        })
                }),
                a.start();
            var n = g(e, 3)
        }
        function d(e) {
            var t = e.add.image(0, 500, "game_spots");
            t.sendToBack(),
                t.moveUp(),
                t.frame = 2,
                t.anchor.set(1, 1),
                t.exists = !0,
                t.y = f.y + 95 + 320,
                t.x = 420,
                t.angle = -2;
            var a = e.add.tween(t);
            a.to({
                y: f.y + 95
            }, 3e3, "Linear", !1),
                a.onComplete.add(function() {
                    var a = e.add.tween(t);
                    a.to({
                        x: t.x - 370,
                        y: t.y + 50,
                        angle: -15
                    }, 4e3, "Linear", !0),
                        a.onComplete.add(function() {
                            p(t, e)
                        }),
                        a.onStart.add(function() {
                            l(e, n)
                        })
                }),
                a.start();
            var n = g(e, 4)
        }
        function s(e) {
            var t = e.add.image(0, 500, "game_spots");
            t.sendToBack(),
                t.moveUp(),
                t.frame = 3,
                t.anchor.set(0, 1),
                t.exists = !0,
                t.y = f.y + 95 + 301,
                t.x = 200;
            var a = e.add.tween(t);
            a.to({
                y: f.y + 95
            }, 3e3, "Linear", !1),
                a.onComplete.add(function() {
                    var a = e.add.tween(t);
                    a.to({
                        x: t.x + 450,
                        y: t.y + 50,
                        angle: 20
                    }, 4e3, "Linear", !0),
                        a.onComplete.add(function() {
                            p(t, e)
                        }),
                        a.onStart.add(function() {
                            l(e, n)
                        })
                }),
                a.start();
            var n = g(e, 5)
        }
        function u(e) {
            var t = e.add.image(0, 500, "game_spots");
            t.sendToBack(),
                t.moveUp(),
                t.frame = 4,
                t.anchor.set(0, 1),
                t.exists = !0,
                t.y = f.y + 95 + 280,
                t.x = 200;
            var a = e.add.tween(t);
            a.to({
                y: f.y + 95
            }, 3e3, "Linear", !1),
                a.onComplete.add(function() {
                    var a = e.add.tween(t);
                    a.to({
                        x: t.x + 430,
                        y: t.y + 50,
                        angle: 20
                    }, 4e3, "Linear", !0),
                        a.onComplete.add(function() {
                            p(t, e)
                        }),
                        a.onStart.add(function() {
                            l(e, n)
                        })
                }),
                a.start();
            var n = g(e, 2)
        }
        function c(e) {
            var t = e.add.image(0, 500, "game_spots");
            t.sendToBack(),
                t.moveUp(),
                t.frame = 5,
                t.anchor.set(0, 1),
                t.exists = !0,
                t.y = f.y + 100 + 310,
                t.x = 200;
            var a = e.add.tween(t);
            a.to({
                y: f.y + 95
            }, 3e3, "Linear", !1),
                a.onComplete.add(function() {
                    var a = e.add.tween(t);
                    a.to({
                        x: t.x + 430,
                        y: t.y + 50,
                        angle: 20
                    }, 4e3, "Linear", !0),
                        a.onComplete.add(function() {
                            p(t, e)
                        }),
                        a.onStart.add(function() {
                            l(e, n)
                        })
                }),
                a.start();
            var n = g(e, 6)
        }
        function m(e) {
            var t = e.add.image(0, 500, "game_spots");
            t.sendToBack(),
                t.moveUp(),
                t.frame = 6,
                t.anchor.set(0, 1),
                t.exists = !0,
                t.y = f.y + 80 + 320,
                t.x = 200;
            var a = e.add.tween(t);
            a.to({
                y: f.y + 80
            }, 3e3, "Linear", !1),
                a.onComplete.add(function() {
                    var a = e.add.tween(t);
                    a.to({
                        x: t.x + 430,
                        y: t.y + 50,
                        angle: 20
                    }, 4e3, "Linear", !0),
                        a.onComplete.add(function() {
                            p(t, e)
                        }),
                        a.onStart.add(function() {
                            l(e, n)
                        })
                }),
                a.start();
            var n = g(e, 0)
        }
        function p(e, t) {
            e.destroy()
        }
        function g(e, t) {
            var a = e.add.image(e.width / 2, f.y + 50, "game_spots_name", t);
            a.anchor.set(.5, 0),
                a.alpha = 0,
                a.scale.set(.2);
            var n = e.add.tween(a)
                , o = e.add.tween(a.scale);
            return n.to({
                alpha: 1
            }, 1e3, "Quad", !0),
                o.to({
                    x: 1.4,
                    y: 1.4
                }, 1e3, "Elastic", !0),
                a
        }
        function l(e, t) {
            var a = e.add.tween(t);
            a.to({
                alpha: 0
            }, 1e3, "Quad", !0),
                a.onComplete.add(function() {
                    t.destroy()
                })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = function(e) {
                var t = 3
                    , a = t;
                this.create = function() {
                    function p() {
                        a++,
                        a >= 20 && (a = 20),
                            z.speed = a,
                            $.speed = 2 * a
                    }
                    function g(t) {
                        var a = e.add.image(e.width / 2, f.y, "game_finish");
                        a.anchor.set(.5, 0),
                            a.scale.set(.5),
                            a.alpha = 0;
                        var n = e.add.tween(a);
                        n.to({
                            alpha: 1
                        }, 2e3, "Linear", !0),
                            n.onComplete.add(function() {
                                var a = e.add.tween(l)
                                    , n = e.add.tween(l.scale);
                                a.to({
                                    y: f.y - Math.round(.6 * l.height / 3)
                                }, 2e3, "Linear", !0),
                                    n.to({
                                        x: .6,
                                        y: .6
                                    }, 2e3, "Linear", !0),
                                    l.bringToTop(),
                                t && a.onComplete.add(t)
                            })
                    }
                    t = 3,
                        a = t;
                    e.add.image(0, 0, "game_bg");
                    f = e.add.sprite(0, 211, "game_road", 2),
                    e.height > 990 && (f.y = e.height - f.height);
                    var l = e.add.sprite(e.width / 2, 100, "game_guy");
                    l.anchor.set(.5, 0),
                        l.y = e.height - 550;
                    var y = e.add.image(32, 26, "game_time")
                        , w = e.add.image(32, 117, "game_mile")
                        , v = e.add.image(85, 36, "game_progress1")
                        , x = e.add.image(85, 36, "game_progress2")
                        , _ = x.width
                        , S = x.height;
                    w.addChild(v),
                        w.addChild(x),
                        x.cropRect = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: S
                        },
                        x.updateCrop();
                    var b = e.add.image(300, 36, "game_logo");
                    b.x = e.width - b.width - 62;
                    var C, z = f.animations.add("move1");
                    f.animations.play("move1", t, !0);
                    var $ = l.animations.add("move2");
                    l.animations.play("move2", 2 * t, !0),
                        z.onLoop.add(function() {
                            var t = z.loopCount;
                            1 == t ? C = n(e) : 2 == t ? o(e, C) : 3 == t ? m(e) : 13 == t ? C = n(e) : 20 == t ? o(e, C) : 23 == t ? r(e) : 33 == t ? C = n(e) : 40 == t ? o(e, C) : 43 == t ? u(e) : 53 == t ? C = n(e) : 60 == t ? o(e, C) : 63 == t ? i(e) : 73 == t ? C = n(e) : 80 == t ? o(e, C) : 83 == t ? d(e) : 93 == t ? C = n(e) : 100 == t ? o(e, C) : 103 == t ? s(e) : 113 == t ? C = n(e) : 120 == t ? o(e, C) : 123 == t ? c(e) : 133 == t && (e.time.events.remove(G),
                                                                                                                    M.inputEnabled = !1,
                                                                                                                    P.inputEnabled = !1,
                                                                                                                    M.destroy(),
                                                                                                                    P.destroy(),
                                                                                                                    g(function() {
                                                                                                                        f.animations.stop(),
                                                                                                                            e.paused = !0,
                                                                                                                        h.onGameComplete && (0,
                                                                                                                            h.onGameComplete)(E.toFixed(1))
                                                                                                                    })),
                                x.cropRect = {
                                    x: 0,
                                    y: 0,
                                    width: Math.floor(t / 133 * _),
                                    height: S
                                },
                                x.updateCrop()
                        });
                    var k = e.add.audioSprite("sound_run")
                        , L = 1;
                    $.enableUpdate = !0,
                        $.onUpdate.add(function() {
                            a >= 15 ? 0 == $.frame && (k.play("s" + L),
                                ++L > 8 && (L = 8)) : 0 != $.frame && 4 != $.frame || (k.play("s" + L),
                                ++L > 8 && (L = 8))
                        });
                    var M = e.add.image(70, 0, "game_control", 1);
                    M.y = e.height - 170;
                    var P = e.add.image(70, 0, "game_control", 0);
                    P.x = e.width - 296,
                        P.y = e.height - 170,
                        M.inputEnabled = !0,
                        P.inputEnabled = !0;
                    var j = 0;
                    M.events.onInputDown.add(function() {
                        1 != M.frame && (M.frame = 1,
                            P.frame = 0,
                            p(),
                        j <= 5 && (++j <= 4 ? (O.exists = !1,
                                U.exists = !0) : (T.stop(),
                                A.stop(),
                                O.destroy(),
                                U.destroy())))
                    }),
                        P.events.onInputDown.add(function() {
                            1 != P.frame && (P.frame = 1,
                                M.frame = 0,
                                p(),
                            j <= 5 && (++j <= 4 ? (U.exists = !1,
                                    O.exists = !0) : (T.stop(),
                                    A.stop(),
                                    O.destroy(),
                                    U.destroy())))
                        });
                    var O = e.add.image(0, 0, "game_finger", 0)
                        , U = e.add.image(0, 0, "game_finger", 1);
                    O.x = -90,
                        O.y = e.height - O.height + 120,
                        U.x = 450,
                        U.y = e.height - U.height + 120,
                        O.exists = !1;
                    var T = e.add.tween(O)
                        , A = e.add.tween(U);
                    T.to({
                        x: O.x - 20,
                        y: O.y + 20
                    }, 300, "Linear", !0, 0, 1e4, !0),
                        A.to({
                            x: U.x + 20,
                            y: U.y + 20
                        }, 300, "Linear", !0, 0, 1e4, !0);
                    var B = (e.time.events.loop(300, function() {
                        a -= 1,
                        a <= t && (a = t),
                            z.speed = a,
                            $.speed = 2 * a
                    }),
                        e.add.text(85, 25, "0s"));
                    B.fontSize = 22,
                        B.fill = "#000000",
                        y.addChild(B);
                    var E = 0
                        , G = e.time.events.loop(100, function() {
                        E += .1,
                            B.text = E.toFixed(1) + "s"
                    })
                }
            }
        ;
        var f, h = a(9), y = 0
    }
    , function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                    default: e
                }
        }
        function o(e) {
            e -= 0;
            var t = "yikong"
                , a = 0
                , n = Math.floor(10 * Math.random());
            e <= 50 ? (t = "dashen",
                       a = 80) : e <= 55 ? (t = "feiren",
                                            a = 60) : e <= 60 ? (t = "excited",
                                                                 a = 30) : e <= 65 ? (t = "gaoji",
                    a = 20) : (t = "yikong",
                    a = 0),
                a += n,
                $("#pop-result .tit").text(e + "s"),
                $("#pop-result .rank strong").html(a + "%"),
                $("#pop-result .illustrator").addClass(t),
                $("#pop-result").show();
            var o = {
                point: e,
                openid: $("#MYOPENID").val()
            };
            o.sign = (0,
                i.default)(o.openid + o.point),
            o.point > 50 && ($(".btn-jiang").addClass("disable").show(),
                $("#pop-result .no-chance").show()),
                $.post("api?act=play", o, function(e) {
                    o.point <= 50 && 0 === +e.errno && $(".btn-jiang").removeClass("disable").show()
                }, "json")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.onGameComplete = o;
        var r = a(10)
            , i = n(r);
        $.post = function(e, t, a) {
            setTimeout(function() {
                a && a({
                    errno: 2
                })
            }, 1e3)
        }
    }
    , function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                    default: e
                }
        }
        var o = a(11)
            , r = n(o)
            , i = a(12)
            , d = n(i)
            , s = a(13)
            , u = n(s);
        !function(t) {
            function a(e, t) {
                var a = (65535 & e) + (65535 & t)
                    , n = (e >> 16) + (t >> 16) + (a >> 16);
                return n << 16 | 65535 & a
            }
            function n(e, t) {
                return e << t | e >>> 32 - t
            }
            function o(e, t, o, r, i, d) {
                return a(n(a(a(t, e), a(r, d)), i), o)
            }
            function i(e, t, a, n, r, i, d) {
                return o(t & a | ~t & n, e, t, r, i, d)
            }
            function s(e, t, a, n, r, i, d) {
                return o(t & n | a & ~n, e, t, r, i, d)
            }
            function c(e, t, a, n, r, i, d) {
                return o(t ^ a ^ n, e, t, r, i, d)
            }
            function m(e, t, a, n, r, i, d) {
                return o(a ^ (t | ~n), e, t, r, i, d)
            }
            function p(e, t) {
                e[t >> 5] |= 128 << t % 32,
                    e[(t + 64 >>> 9 << 4) + 14] = t;
                var n, o, r, d, u, p = 1732584193, g = -271733879, l = -1732584194, f = 271733878;
                for (n = 0; n < e.length; n += 16)
                    o = p,
                        r = g,
                        d = l,
                        u = f,
                        p = i(p, g, l, f, e[n], 7, -680876936),
                        f = i(f, p, g, l, e[n + 1], 12, -389564586),
                        l = i(l, f, p, g, e[n + 2], 17, 606105819),
                        g = i(g, l, f, p, e[n + 3], 22, -1044525330),
                        p = i(p, g, l, f, e[n + 4], 7, -176418897),
                        f = i(f, p, g, l, e[n + 5], 12, 1200080426),
                        l = i(l, f, p, g, e[n + 6], 17, -1473231341),
                        g = i(g, l, f, p, e[n + 7], 22, -45705983),
                        p = i(p, g, l, f, e[n + 8], 7, 1770035416),
                        f = i(f, p, g, l, e[n + 9], 12, -1958414417),
                        l = i(l, f, p, g, e[n + 10], 17, -42063),
                        g = i(g, l, f, p, e[n + 11], 22, -1990404162),
                        p = i(p, g, l, f, e[n + 12], 7, 1804603682),
                        f = i(f, p, g, l, e[n + 13], 12, -40341101),
                        l = i(l, f, p, g, e[n + 14], 17, -1502002290),
                        g = i(g, l, f, p, e[n + 15], 22, 1236535329),
                        p = s(p, g, l, f, e[n + 1], 5, -165796510),
                        f = s(f, p, g, l, e[n + 6], 9, -1069501632),
                        l = s(l, f, p, g, e[n + 11], 14, 643717713),
                        g = s(g, l, f, p, e[n], 20, -373897302),
                        p = s(p, g, l, f, e[n + 5], 5, -701558691),
                        f = s(f, p, g, l, e[n + 10], 9, 38016083),
                        l = s(l, f, p, g, e[n + 15], 14, -660478335),
                        g = s(g, l, f, p, e[n + 4], 20, -405537848),
                        p = s(p, g, l, f, e[n + 9], 5, 568446438),
                        f = s(f, p, g, l, e[n + 14], 9, -1019803690),
                        l = s(l, f, p, g, e[n + 3], 14, -187363961),
                        g = s(g, l, f, p, e[n + 8], 20, 1163531501),
                        p = s(p, g, l, f, e[n + 13], 5, -1444681467),
                        f = s(f, p, g, l, e[n + 2], 9, -51403784),
                        l = s(l, f, p, g, e[n + 7], 14, 1735328473),
                        g = s(g, l, f, p, e[n + 12], 20, -1926607734),
                        p = c(p, g, l, f, e[n + 5], 4, -378558),
                        f = c(f, p, g, l, e[n + 8], 11, -2022574463),
                        l = c(l, f, p, g, e[n + 11], 16, 1839030562),
                        g = c(g, l, f, p, e[n + 14], 23, -35309556),
                        p = c(p, g, l, f, e[n + 1], 4, -1530992060),
                        f = c(f, p, g, l, e[n + 4], 11, 1272893353),
                        l = c(l, f, p, g, e[n + 7], 16, -155497632),
                        g = c(g, l, f, p, e[n + 10], 23, -1094730640),
                        p = c(p, g, l, f, e[n + 13], 4, 681279174),
                        f = c(f, p, g, l, e[n], 11, -358537222),
                        l = c(l, f, p, g, e[n + 3], 16, -722521979),
                        g = c(g, l, f, p, e[n + 6], 23, 76029189),
                        p = c(p, g, l, f, e[n + 9], 4, -640364487),
                        f = c(f, p, g, l, e[n + 12], 11, -421815835),
                        l = c(l, f, p, g, e[n + 15], 16, 530742520),
                        g = c(g, l, f, p, e[n + 2], 23, -995338651),
                        p = m(p, g, l, f, e[n], 6, -198630844),
                        f = m(f, p, g, l, e[n + 7], 10, 1126891415),
                        l = m(l, f, p, g, e[n + 14], 15, -1416354905),
                        g = m(g, l, f, p, e[n + 5], 21, -57434055),
                        p = m(p, g, l, f, e[n + 12], 6, 1700485571),
                        f = m(f, p, g, l, e[n + 3], 10, -1894986606),
                        l = m(l, f, p, g, e[n + 10], 15, -1051523),
                        g = m(g, l, f, p, e[n + 1], 21, -2054922799),
                        p = m(p, g, l, f, e[n + 8], 6, 1873313359),
                        f = m(f, p, g, l, e[n + 15], 10, -30611744),
                        l = m(l, f, p, g, e[n + 6], 15, -1560198380),
                        g = m(g, l, f, p, e[n + 13], 21, 1309151649),
                        p = m(p, g, l, f, e[n + 4], 6, -145523070),
                        f = m(f, p, g, l, e[n + 11], 10, -1120210379),
                        l = m(l, f, p, g, e[n + 2], 15, 718787259),
                        g = m(g, l, f, p, e[n + 9], 21, -343485551),
                        p = a(p, o),
                        g = a(g, r),
                        l = a(l, d),
                        f = a(f, u);
                return [p, g, l, f]
            }
            function g(e) {
                return (0,
                    d.default)(p((0,
                    u.default)(e), 8 * e.length))
            }
            function l(e, t) {
                var a, n, o = (0,
                    u.default)(e), r = [], i = [];
                for (r[15] = i[15] = void 0,
                     o.length > 16 && (o = p(o, 8 * e.length)),
                         a = 0; a < 16; a += 1)
                    r[a] = 909522486 ^ o[a],
                        i[a] = 1549556828 ^ o[a];
                return n = p(r.concat((0,
                    u.default)(t)), 512 + 8 * t.length),
                    (0,
                        d.default)(p(i.concat(n), 640))
            }
            function f(e) {
                var t, a, n = "0123456789abcdef", o = "";
                for (a = 0; a < e.length; a += 1)
                    t = e.charCodeAt(a),
                        o += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
                return o
            }
            function h(e) {
                return unescape(encodeURIComponent((0,
                        r.default)(b) + e))
            }
            function y(e) {
                return g(h((0,
                        r.default)(S) + e))
            }
            function w(e) {
                return f(y(e))
            }
            function v(e, t) {
                return l(h(e), h(t))
            }
            function x(e, t) {
                return f(v(e, t))
            }
            function _(e, t, a) {
                return t ? a ? v(t, e) : x(t, e) : a ? y(e) : w(e)
            }
            var S = 68335689845769
                , b = 36984571948556;
            e.exports = _
        }(void 0)
    }
    , function(e, t) {
        "use strict";
        function a(e) {
            e = String(e);
            for (var t = "", a = "", n = 0, o = 0; o < e.length; o++)
                a += e[o],
                o % 2 != 0 && (t += String.fromCharCode(a - n),
                    a = "");
            return t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = a
    }
    , function(e, t) {
        "use strict";
        function a(e) {
            var t, a = "";
            for (t = 0; t < 32 * e.length; t += 8)
                a += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
            return a
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = a
    }
    , function(e, t) {
        "use strict";
        function a(e) {
            var t, a = [];
            for (a[(e.length >> 2) - 1] = void 0,
                     t = 0; t < a.length; t += 1)
                a[t] = 0;
            for (t = 0; t < 8 * e.length; t += 8)
                a[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return a
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = a
    }
]);
