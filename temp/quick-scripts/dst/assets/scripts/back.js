
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/back.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYmFjay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1lbnVBdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJvbkxvYWQiLCJub2RlIiwib24iLCJvbl90b3VjaF9lbmRlZCIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsInR3ZWVuIiwidG8iLCJzY2FsZSIsImVhc2luZyIsImNhbGwiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGQTtBQURELEdBSFA7QUFXTEMsRUFBQUEsTUFYSyxvQkFXSTtBQUNMLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLFVBQWIsRUFBd0IsS0FBS0MsY0FBN0IsRUFBNEMsSUFBNUM7QUFDSCxHQWJJO0FBZUxBLEVBQUFBLGNBZkssNEJBZVc7QUFDZDtBQUNDVixJQUFBQSxFQUFFLENBQUNXLFdBQUgsQ0FBZUMsVUFBZixDQUEwQixLQUFLUixTQUEvQixFQUEwQyxLQUExQztBQUNBSixJQUFBQSxFQUFFLENBQUNhLEtBQUgsQ0FBUyxLQUFLTCxJQUFkLEVBQ0FNLEVBREEsQ0FDRyxFQURILEVBQ087QUFDTEMsTUFBQUEsS0FBSyxFQUFFO0FBREYsS0FEUCxFQUdHO0FBQ0RDLE1BQUFBLE1BQU0sRUFBRTtBQURQLEtBSEgsRUFNQUYsRUFOQSxDQU1HLEVBTkgsRUFNTztBQUNMQyxNQUFBQSxLQUFLLEVBQUU7QUFERixLQU5QLEVBUUc7QUFDREMsTUFBQUEsTUFBTSxFQUFFO0FBRFAsS0FSSCxFQVdBQyxJQVhBLENBV0ssWUFBTTtBQUNUakIsTUFBQUEsRUFBRSxDQUFDa0IsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE9BQXRCO0FBQ0QsS0FiRCxFQWFHQyxLQWJIO0FBY0Y7QUFoQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIG1lbnVBdWRpbzoge1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcbiAgICAgIH0sXG4gICAgfSxcblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJyx0aGlzLm9uX3RvdWNoX2VuZGVkLHRoaXMpO1xuICAgIH0sXG4gICAgXG4gICAgb25fdG91Y2hfZW5kZWQoKXtcbiAgICAgIC8vIOaSreaUvumfs+aViFxuICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5tZW51QXVkaW8sIGZhbHNlKTtcbiAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLlxuICAgICAgIHRvKC4yLCB7XG4gICAgICAgICBzY2FsZTogMS4yXG4gICAgICAgfSwge1xuICAgICAgICAgZWFzaW5nOiAncXVhZEluJ1xuICAgICAgIH0pLlxuICAgICAgIHRvKC4yLCB7XG4gICAgICAgICBzY2FsZTogMVxuICAgICAgIH0sIHtcbiAgICAgICAgIGVhc2luZzogJ3F1YWRJbidcbiAgICAgICB9KS5cbiAgICAgICBjYWxsKCgpID0+IHtcbiAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImluZGV4XCIpO1xuICAgICAgIH0pLnN0YXJ0KClcbiAgICB9LFxuXG59KTtcbiJdfQ==