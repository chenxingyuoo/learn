(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/ScoreFX.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dd18c67pr9OM5wJb/yY6Onf', 'ScoreFX', __filename);
// scripts/ScoreFX.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        anim: {
            default: null,
            type: cc.Animation
        }
    },

    init: function init(game) {
        this.game = game;
        this.anim.getComponent('ScoreAnim').init(this);
    },
    despawn: function despawn() {
        this.game.despawnScoreFX(this.node);
    },


    play: function play() {
        this.anim.play('score_pop');
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ScoreFX.js.map
        