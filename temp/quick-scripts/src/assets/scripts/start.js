"use strict";
cc._RF.push(module, 'f3a99WsRSNEmIGe22WmwS5V', 'start');
// scripts/start.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    menuAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  onLoad: function onLoad() {
    this.node.on('touchend', this.on_touch_ended, this);
  },
  on_touch_ended: function on_touch_ended() {
    // 播放音效
    cc.audioEngine.playEffect(this.menuAudio, false); // console.log(this.node)

    cc.tween(this.node).to(.2, {
      scale: 1.4
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1.2
    }, {
      easing: 'quadIn'
    }).call(function () {
      cc.director.loadScene("game");
    }).start();
  }
});

cc._RF.pop();