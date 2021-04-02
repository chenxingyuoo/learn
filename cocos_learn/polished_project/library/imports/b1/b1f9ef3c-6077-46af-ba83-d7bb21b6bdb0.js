"use strict";
cc._RF.push(module, 'b1f9e88YHdGr7qD17shtr2w', 'ScoreAnim');
// scripts/ScoreAnim.js

"use strict";

cc.Class({
    extends: cc.Component,

    init: function init(scoreFX) {
        this.scoreFX = scoreFX;
    },


    hideFX: function hideFX() {
        this.scoreFX.despawn();
    }
});

cc._RF.pop();