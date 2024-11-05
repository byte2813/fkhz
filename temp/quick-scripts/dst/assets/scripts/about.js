
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/about.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f72d914HFtLFq7b2/yi5C2n', 'about');
// scripts/about.js

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
      cc.director.loadScene("about");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYWJvdXQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtZW51QXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwibm9kZSIsIm9uIiwib25fdG91Y2hfZW5kZWQiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJ0d2VlbiIsInRvIiwic2NhbGUiLCJlYXNpbmciLCJjYWxsIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFNBQVMsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRkE7QUFERCxHQUhMO0FBVVBDLEVBQUFBLE1BVk8sb0JBVUU7QUFDUCxTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxVQUFiLEVBQXlCLEtBQUtDLGNBQTlCLEVBQThDLElBQTlDO0FBQ0QsR0FaTTtBQWNQQSxFQUFBQSxjQWRPLDRCQWNVO0FBQ2Y7QUFDQVYsSUFBQUEsRUFBRSxDQUFDVyxXQUFILENBQWVDLFVBQWYsQ0FBMEIsS0FBS1IsU0FBL0IsRUFBMEMsS0FBMUM7QUFDQUosSUFBQUEsRUFBRSxDQUFDYSxLQUFILENBQVMsS0FBS0wsSUFBZCxFQUNBTSxFQURBLENBQ0csRUFESCxFQUNPO0FBQ0xDLE1BQUFBLEtBQUssRUFBRTtBQURGLEtBRFAsRUFHRztBQUNEQyxNQUFBQSxNQUFNLEVBQUU7QUFEUCxLQUhILEVBTUFGLEVBTkEsQ0FNRyxFQU5ILEVBTU87QUFDTEMsTUFBQUEsS0FBSyxFQUFFO0FBREYsS0FOUCxFQVFHO0FBQ0RDLE1BQUFBLE1BQU0sRUFBRTtBQURQLEtBUkgsRUFXQUMsSUFYQSxDQVdLLFlBQU07QUFDVGpCLE1BQUFBLEVBQUUsQ0FBQ2tCLFFBQUgsQ0FBWUMsU0FBWixDQUFzQixPQUF0QjtBQUNELEtBYkQsRUFhR0MsS0FiSDtBQWNEO0FBL0JNLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIG1lbnVBdWRpbzoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgdGhpcy5vbl90b3VjaF9lbmRlZCwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25fdG91Y2hfZW5kZWQoKSB7XHJcbiAgICAvLyDmkq3mlL7pn7PmlYhcclxuICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5tZW51QXVkaW8sIGZhbHNlKTtcclxuICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkuXG4gICAgdG8oLjIsIHtcbiAgICAgIHNjYWxlOiAxLjJcbiAgICB9LCB7XG4gICAgICBlYXNpbmc6ICdxdWFkSW4nXG4gICAgfSkuXG4gICAgdG8oLjIsIHtcbiAgICAgIHNjYWxlOiAxXG4gICAgfSwge1xuICAgICAgZWFzaW5nOiAncXVhZEluJ1xuICAgIH0pLlxuICAgIGNhbGwoKCkgPT4ge1xuICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiYWJvdXRcIik7XG4gICAgfSkuc3RhcnQoKVxyXG4gIH0sXHJcbn0pO1xuIl19