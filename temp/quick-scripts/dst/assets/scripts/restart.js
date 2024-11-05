
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/restart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '071a3HXdBBCG6taI46kmhE2', 'restart');
// scripts/restart.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    menuAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  update: function update() {
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
      if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        cc.director.loadScene("game");
      } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {} else {
        cc.director.loadScene("game");
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xccmVzdGFydC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1lbnVBdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJ1cGRhdGUiLCJub2RlIiwib24iLCJvbl90b3VjaF9lbmRlZCIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsInR3ZWVuIiwidG8iLCJzY2FsZSIsImVhc2luZyIsImNhbGwiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJCWVRFREFOQ0VfR0FNRSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNQLGFBQVNELEVBQUUsQ0FBQ0UsU0FETDtBQUdQQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGQTtBQURELEdBSEw7QUFVUEMsRUFBQUEsTUFWTyxvQkFVRTtBQUNQLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLFVBQWIsRUFBeUIsS0FBS0MsY0FBOUIsRUFBOEMsSUFBOUM7QUFDRCxHQVpNO0FBY1BBLEVBQUFBLGNBZE8sNEJBY1U7QUFDZjtBQUNBVixJQUFBQSxFQUFFLENBQUNXLFdBQUgsQ0FBZUMsVUFBZixDQUEwQixLQUFLUixTQUEvQixFQUEwQyxLQUExQztBQUNBSixJQUFBQSxFQUFFLENBQUNhLEtBQUgsQ0FBUyxLQUFLTCxJQUFkLEVBQ0FNLEVBREEsQ0FDRyxFQURILEVBQ087QUFDTEMsTUFBQUEsS0FBSyxFQUFFO0FBREYsS0FEUCxFQUdHO0FBQ0RDLE1BQUFBLE1BQU0sRUFBRTtBQURQLEtBSEgsRUFNQUYsRUFOQSxDQU1HLEVBTkgsRUFNTztBQUNMQyxNQUFBQSxLQUFLLEVBQUU7QUFERixLQU5QLEVBUUc7QUFDREMsTUFBQUEsTUFBTSxFQUFFO0FBRFAsS0FSSCxFQVdBQyxJQVhBLENBV0ssWUFBTTtBQUNULFVBQUlqQixFQUFFLENBQUNrQixHQUFILENBQU9DLFFBQVAsS0FBb0JuQixFQUFFLENBQUNrQixHQUFILENBQU9FLFdBQS9CLEVBQTJDO0FBQ3pDcEIsUUFBQUEsRUFBRSxDQUFDcUIsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0QsT0FGRCxNQUVNLElBQUl0QixFQUFFLENBQUNrQixHQUFILENBQU9DLFFBQVAsS0FBb0JuQixFQUFFLENBQUNrQixHQUFILENBQU9LLGNBQS9CLEVBQThDLENBRW5ELENBRkssTUFFQTtBQUNKdkIsUUFBQUEsRUFBRSxDQUFDcUIsUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0Q7QUFDRixLQW5CRCxFQW1CR0UsS0FuQkg7QUFxQkQ7QUF0Q00sQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgbWVudUF1ZGlvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgdGhpcy5vbl90b3VjaF9lbmRlZCwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgb25fdG91Y2hfZW5kZWQoKSB7XHJcbiAgICAvLyDmkq3mlL7pn7PmlYhcclxuICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5tZW51QXVkaW8sIGZhbHNlKTtcclxuICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkuXHJcbiAgICB0byguMiwge1xyXG4gICAgICBzY2FsZTogMS4yXHJcbiAgICB9LCB7XHJcbiAgICAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgIH0pLlxyXG4gICAgdG8oLjIsIHtcclxuICAgICAgc2NhbGU6IDFcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuXHJcbiAgICBjYWxsKCgpID0+IHtcclxuICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKXtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xyXG4gICAgICB9ZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpe1xyXG5cclxuICAgICAgfWVsc2Uge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pLnN0YXJ0KClcclxuXHJcbiAgfSxcclxufSk7XHJcbiJdfQ==