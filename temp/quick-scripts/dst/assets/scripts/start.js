
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/start.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhcnQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtZW51QXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwibm9kZSIsIm9uIiwib25fdG91Y2hfZW5kZWQiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJ0d2VlbiIsInRvIiwic2NhbGUiLCJlYXNpbmciLCJjYWxsIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFNBQVMsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkE7QUFERCxHQUhMO0FBVVBDLEVBQUFBLE1BVk8sb0JBVUU7QUFDUCxTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxVQUFiLEVBQXlCLEtBQUtDLGNBQTlCLEVBQThDLElBQTlDO0FBQ0QsR0FaTTtBQWNQQSxFQUFBQSxjQWRPLDRCQWNVO0FBQ2Y7QUFDQVYsSUFBQUEsRUFBRSxDQUFDVyxXQUFILENBQWVDLFVBQWYsQ0FBMEIsS0FBS1IsU0FBL0IsRUFBMEMsS0FBMUMsRUFGZSxDQUlmOztBQUNBSixJQUFBQSxFQUFFLENBQUNhLEtBQUgsQ0FBUyxLQUFLTCxJQUFkLEVBQ0FNLEVBREEsQ0FDRyxFQURILEVBQ087QUFDTEMsTUFBQUEsS0FBSyxFQUFFO0FBREYsS0FEUCxFQUdHO0FBQ0RDLE1BQUFBLE1BQU0sRUFBRTtBQURQLEtBSEgsRUFNQUYsRUFOQSxDQU1HLEVBTkgsRUFNTztBQUNMQyxNQUFBQSxLQUFLLEVBQUU7QUFERixLQU5QLEVBUUc7QUFDREMsTUFBQUEsTUFBTSxFQUFFO0FBRFAsS0FSSCxFQVdBQyxJQVhBLENBV0ssWUFBTTtBQUNUakIsTUFBQUEsRUFBRSxDQUFDa0IsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0QsS0FiRCxFQWFHQyxLQWJIO0FBZUQ7QUFsQ00sQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbWVudUF1ZGlvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCB0aGlzLm9uX3RvdWNoX2VuZGVkLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBvbl90b3VjaF9lbmRlZCgpIHtcclxuICAgIC8vIOaSreaUvumfs+aViFxyXG4gICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLm1lbnVBdWRpbywgZmFsc2UpO1xyXG4gICAgXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKVxuICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkuXG4gICAgdG8oLjIsIHtcbiAgICAgIHNjYWxlOiAxLjRcbiAgICB9LCB7XG4gICAgICBlYXNpbmc6ICdxdWFkSW4nXG4gICAgfSkuXG4gICAgdG8oLjIsIHtcbiAgICAgIHNjYWxlOiAxLjJcbiAgICB9LCB7XG4gICAgICBlYXNpbmc6ICdxdWFkSW4nXG4gICAgfSkuXG4gICAgY2FsbCgoKSA9PiB7XG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xuICAgIH0pLnN0YXJ0KClcblxyXG4gIH0sXHJcbn0pO1xuIl19