"use strict";
cc._RF.push(module, 'db60dNpuI1PXp7cbT/buUlh', 'back');
// scripts/back.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
    cc.audioEngine.playEffect(this.menuAudio, false);
    cc.tween(this.node).to(.2, {
      scale: 1.2
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1
    }, {
      easing: 'quadIn'
    }).call(function () {
      cc.director.loadScene("index");
    }).start();
  }
});

cc._RF.pop();