"use strict";
cc._RF.push(module, '89607/2ujVCPIKWlsifKPJo', 'smallBlock');
// scripts/smallBlock.js

"use strict";

var global = require('global');

var changeposition = 0; //用于计算在数组中的位置

var changeangle = 0; //用于计算角度

cc.Class({
  "extends": cc.Component,
  properties: {
    color: '',
    collider: {
      "default": null,
      type: cc.PolygonCollider
    },
    blocktype: ''
  },
  start: function start() {
    this._oldPos = this.node.position; // console.log(this._oldPos)
  },
  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true; // cc.director.getCollisionManager().enabledDebugDraw = true;

    this.hit = false; // 触摸事件开始

    this.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
      var touchLoc = touch.getLocation();

      if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
        console.log(this.node.blocktype);
        this.hit = true; // 启用缓动动画
        // cc.tween(this.node).to(.15, {
        //   position: cc.v2(touchLoc.x - this.node.parent.width / 2, touchLoc.y - this.node.parent.height / 2)
        // }, {
        //   easing: 'quadIn'
        // }).start()

        if (this.hit && this.node.blocktype == 'small') {
          this.node.x = touchLoc.x - this.node.parent.width / 2;
          this.node.y = touchLoc.y - this.node.parent.height / 2;
        }
      }
    }, this); // 触摸事件监听

    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (touch, event) {
      var touchLoc = touch.getLocation();

      if (this.hit && this.node.blocktype == 'small') {
        this.node.x += touch.getDelta().x;
        this.node.y += touch.getDelta().y;
        touchLoc.x = touchLoc.x - this.node.parent.width / 2;
        touchLoc.y = touchLoc.y - this.node.parent.height / 2;

        if (touchLoc.x > 0 && touchLoc.y > 0) {
          this.node.angle = Math.atan(touchLoc.y / touchLoc.x) / Math.PI * 180 + 90 - 22.5;
        } else if (touchLoc.x < 0 && touchLoc.y > 0) {
          this.node.angle = Math.atan(-touchLoc.x / touchLoc.y) / Math.PI * 180 + 180 - 22.5;
        } else if (touchLoc.x < 0 && touchLoc.y < 0) {
          this.node.angle = Math.atan(-touchLoc.y / -touchLoc.x) / Math.PI * 180 + 270 - 22.5;
        } else if (touchLoc.x > 0 && touchLoc.y < 0) {
          this.node.angle = Math.atan(touchLoc.x / -touchLoc.y) / Math.PI * 180 - 22.5;
        } else if (touchLoc.x == 0 && touchLoc.y > 0) {
          this.node.angle = 180 - 22.5;
        } else if (touchLoc.x == 0 && touchLoc.y < 0) {
          this.node.angle = 0 - 22.5;
        } else if (touchLoc.x > 0 && touchLoc.y == 0) {
          this.node.angle = 90 - 22.5;
        } else if (touchLoc.x < 0 && touchLoc.y == 0) {
          this.node.angle = 270 - 22.5;
        }
      }
    }, this); // 触摸事件结束

    this.node.on(cc.Node.EventType.TOUCH_END, function (touch, event) {
      var _this = this;

      if (this.hit && this.node.blocktype == 'small') {
        this.hit = false; // 记录当前放置的位置

        var currentindex = -1;
        var points = global.insidepoints; // 没有移动到圆环目标位置区域，移动到初始位置

        if (this.node.x * this.node.x + this.node.y * this.node.y > 474 * 474 / 4) {
          if (touch.getLocation().x - this.node.parent.width / 2 < 0) this.easeTo(this._oldPos.x, this._oldPos.y, 337.5, .2);else this.easeTo(this._oldPos.x, this._oldPos.y, -22.5, .2);
        } else {
          // 移动到了圆环目标位置区域
          if (this.node.x > 0 && this.node.y < 0) currentindex = this.node.x < -this.node.y ? 0 : 1;
          if (this.node.x > 0 && this.node.y > 0) currentindex = this.node.x > this.node.y ? 2 : 3;
          if (this.node.x < 0 && this.node.y > 0) currentindex = -this.node.x < this.node.y ? 4 : 5;
          if (this.node.x < 0 && this.node.y < 0) currentindex = -this.node.x > -this.node.y ? 6 : 7; // 标记当前位置是否为空

          var isempty = true; // 在对应圆环已放置的数组中查找

          global.insideblocks.forEach(function (item) {
            if (item.index == currentindex) isempty = false; // 找到说明当前位置不可用
          }); // 当前位置若为空

          if (isempty && this.node.x != 0 && this.node.y != 0) {
            //计算旋转角度
            global.Schangeangle += 45 * parseInt(this.game.rotateGridsS.string); //计算块的真正位置

            var n = (currentindex + global.Schangeposition) % 8;
            if (n < 0) n += 8; //放置块的缓动效果

            cc.tween(this.node).to(.2, {
              x: points[currentindex].x,
              y: points[currentindex].y,
              angle: points[currentindex].a
            }, {
              easing: 'quadIn'
            }).call(function () {
              //放置块
              _this.node.x = points[n].x;
              _this.node.y = points[n].y;
              _this.node.angle = points[n].a; //更改块的父节点

              _this.node.removeFromParent(false);

              _this.game.inside.addChild(_this.node); //环旋转的缓动效果


              cc.tween(_this.game.inside).to(Math.abs(parseInt(_this.game.rotateGridsS.string)) / 4, {
                angle: global.Schangeangle
              }, {
                easing: 'quadIn'
              }).call(function () {
                _this.game.deleteBlock(); // 播放音效


                cc.audioEngine.playEffect(_this.game.rotateAudio, false);
              }).start();
            }).start(); // 构造当前块的对象，用于保存在圆环对象数组中

            var block = {
              index: currentindex,
              // 块的位置序号
              color: this.node.color._val,
              // 块的颜色
              rotateGridsS: this.game.rotateGridsS.string,
              // 块的转动格数
              blockitem: this
            }; // 保存在圆环对象数组中

            global.insideblocks.push(block); // 播放音效

            cc.audioEngine.playEffect(this.game.placeAudio, false); //计算在数组中的位置

            global.Schangeposition -= parseInt(this.game.rotateGridsS.string); //更新数组中所有块的位置

            global.insideblocks.forEach(function (item) {
              item.index = (item.index + parseInt(_this.game.rotateGridsS.string)) % 8;
              if (item.index < 0) item.index += 8;
            }); //console.log("global.insideblocks: ")
            //console.log(global.insideblocks)
            // 将当前块设置为不可点击

            this.node.blocktype = 'inside'; // 放置次数加1

            global.count++; // 如果三个块均已放置完毕，则重新生成三个块

            if (global.count != 0 && global.count % 3 == 0) {
              this.game.spawnBlock();
            }
          } else {
            // 当前位置若不为空，移动到初始位置
            if (touch.getLocation().x - this.node.parent.width / 2 < 0) this.easeTo(this._oldPos.x, this._oldPos.y, 337.5, .2);else this.easeTo(this._oldPos.x, this._oldPos.y, -22.5, .2);
          }
        }
      }
    }, this);
  },
  // 缓动函数
  easeTo: function easeTo(x, y, a, t) {
    cc.tween(this.node).to(t, {
      position: cc.v2(x, y),
      angle: a
    }, {
      easing: 'quadIn'
    }).start();
  },
  onDisable: function onDisable() {
    cc.director.getCollisionManager().enabled = false;
    cc.director.getCollisionManager().enabledDebugDraw = false;
    this.node.off(cc.Node.EventType.TOUCH_START);
    this.node.off(cc.Node.EventType.TOUCH_MOVE);
    this.node.off(cc.Node.EventType.TOUCH_END);
  },
  onDestroy: function onDestroy() {
    changeposition = 0;
    changeangle = 0;
  }
});

cc._RF.pop();