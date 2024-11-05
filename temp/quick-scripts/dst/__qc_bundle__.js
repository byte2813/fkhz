
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/scripts/about');
require('./assets/scripts/back');
require('./assets/scripts/game');
require('./assets/scripts/global');
require('./assets/scripts/largeBlock');
require('./assets/scripts/middleBlock');
require('./assets/scripts/restart');
require('./assets/scripts/smallBlock');
require('./assets/scripts/start');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '94d80H73YVOdoNrN0RAqT26', 'game');
// scripts/game.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var INSIDERADIES = 120;
var BESIDERADIES = 260;
var OUTSIDERADIES = 405;

var global = require('global');

cc.Class({
  "extends": cc.Component,
  properties: {
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    },
    rotateAudio: {
      "default": null,
      type: cc.AudioClip
    },
    placeAudio: {
      "default": null,
      type: cc.AudioClip
    },
    mask: {
      "default": null,
      type: cc.Node
    },
    gameover: {
      "default": null,
      type: cc.Node
    },
    blocks: {
      "default": null,
      type: cc.Node
    },
    outside: {
      "default": null,
      type: cc.Node
    },
    beside: {
      "default": null,
      type: cc.Node
    },
    inside: {
      "default": null,
      type: cc.Node
    },
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    rotateGridsS: {
      "default": null,
      type: cc.Label
    },
    rotateGridsM: {
      "default": null,
      type: cc.Label
    },
    rotateGridsL: {
      "default": null,
      type: cc.Label
    },
    smallBlockPre: {
      "default": null,
      type: cc.Prefab
    },
    middleBlockPre: {
      "default": null,
      type: cc.Prefab
    },
    largeBlockPre: {
      "default": null,
      type: cc.Prefab
    },
    highest: {
      "default": null,
      type: cc.Label
    }
  },
  onLoad: function onLoad() {
    global.count = 0;
    global.score = 0;
    global.outsidepoints = [];
    global.besidepoints = [];
    global.insidepoints = []; // 用于记录圆环中已经存在的块的位置

    global.outsideblocks = [];
    global.besideblocks = [];
    global.insideblocks = [];
    this.outside.angle = 0;
    this.beside.angle = 0;
    this.inside.angle = 0;
    console.log(this.inside); // 生成三个颜色块

    this.spawnBlock(); // 生成三个圆环

    for (var i = 0; i < 8; i++) {
      this.spawnSmallBlockRing(i * 45);
      this.spawnMiddleBlockRing(i * 45);
      this.spawnLargeBlockRing(i * 45);
    } // 全局变量初始化


    console.log(global.count); // cc.sys.localStorage.removeItem("rank")

    var rank = cc.sys.localStorage.getItem("rank");

    if (rank != null && rank != '') {
      this.highest.string = rank;
      global.highscore = parseInt(rank);
    } else {
      this.highest.string = '0';
    }
  },
  spawnBlock: function spawnBlock() {
    this.spawnSmallBlock();
    this.spawnMiddleBlock();
    this.spawnLargeBlock();
  },
  deleteBlock: function deleteBlock() {
    var _this = this;

    // let _this = this
    // outsideblocks数组元素
    var outblock = 0; // besideblocks数组元素

    var beblock = 0; // insideblocks数组元素

    var inblock = 0; // 将被删除的数组元素

    var tobedeleteout = [];
    var tobedeletebe = [];
    var tobedeletein = []; // this.showInfo()
    // 将被删除的节点

    var tobedeletenode = []; // a,b,c为块数组中真实位置

    for (var a = 0; a < global.outsideblocks.length; a++) {
      var _outblock = global.outsideblocks[a];

      for (var b = 0; b < global.besideblocks.length; b++) {
        var _beblock = global.besideblocks[b];

        for (var c = 0; c < global.insideblocks.length; c++) {
          var _inblock = global.insideblocks[c];

          if (_outblock.index == _beblock.index && _beblock.index == _inblock.index && _outblock.color == _beblock.color && _beblock.color == _inblock.color) {
            //记录将被删除的节点
            tobedeletenode[tobedeletenode.length] = _outblock.blockitem;
            tobedeletenode[tobedeletenode.length] = _beblock.blockitem;
            tobedeletenode[tobedeletenode.length] = _inblock.blockitem; //记录将被删除的数组元素

            tobedeleteout[tobedeleteout.length] = _outblock;
            tobedeletebe[tobedeletebe.length] = _beblock;
            tobedeletein[tobedeletein.length] = _inblock; //得分

            global.score += 10;
            this.scoreDisplay.string = global.score;
            console.log(global.score);
            console.log(global.highscore);

            if (global.score > global.highscore) {
              console.log('rank' + global.score);
              this.highest.string = global.score;
              cc.sys.localStorage.setItem("rank", global.score);
              global.highscore = global.score;
            } // console.log(this.scoreDisplay)
            // this.myTween4(this.scoreDisplay)

          }
        }
      }
    } // console.log('len' + tobedeletenode.length)


    if (tobedeletenode.length != 0) {
      (function () {
        // 删除在outsideblocks,besideblocks,insideblocks三个数组中的索引
        tobedeleteout.forEach(function (outblock) {
          global.outsideblocks.splice(global.outsideblocks.indexOf(outblock), 1);
        });
        tobedeletebe.forEach(function (beblock) {
          global.besideblocks.splice(global.besideblocks.indexOf(beblock), 1);
        });
        tobedeletein.forEach(function (inblock) {
          global.insideblocks.splice(global.insideblocks.indexOf(inblock), 1);
        }); // this.showInfo()
        // 删除数组中块的索引

        var index = 0;

        for (var i = 0; i < tobedeletenode.length; i++) {
          //console.log(tobedeletenode[i].node)
          //console.log(i + 'array')
          //块删除
          cc.tween(tobedeletenode[i].node).to(.1, {
            scale: 1.2
          }, {
            easing: 'quadIn'
          }).to(.2, {
            scale: 0
          }, {
            easing: 'quadIn'
          }).call(function () {
            console.log(index + 'tobedetete');
            tobedeletenode[index++].node.destroy();
          }).start();
        } // 播放音效


        cc.audioEngine.playEffect(_this.scoreAudio, false);
      })();
    } else {
      if (global.outsideblocks.length == 8 && global.besideblocks.length == 8 && global.insideblocks.length == 8) {
        // this.scoreDisplay.string = 'GAME OVER(' + global.score + ')'
        this.myTween5(this.mask);
        this.myTween3(this.gameover);
      }
    }
  },
  // 打印数组
  showInfo: function showInfo() {
    // let str1, str2, str3;
    // str1 = 'delete out: '
    // str2 = 'delete be: '
    // str3 = 'delete in: '
    // tobedeleteout.forEach((a1) => {
    //   str1 += a1 + ' '
    // })
    // console.log(str1)
    // tobedeletebe.forEach((b1) => {
    //   str2 += b1 + ' '
    // })
    // console.log(str2)
    // tobedeletein.forEach((c1) => {
    //   str3 += c1 + ' '
    // })
    // console.log(str3)
    // console.log(typeof global.besideblocks[0])
    // console.log(global.besideblocks[0])
    var str1, str2, str3;
    str1 = 'out: ';
    str2 = 'be: ';
    str3 = 'in: ';
    global.outsideblocks.forEach(function (outblock, index) {
      str1 += outblock.index + ' ';
    });
    console.log(str1);
    global.besideblocks.forEach(function (beblock, index) {
      str2 += beblock.index + ' ';
    });
    console.log(str2);
    global.insideblocks.forEach(function (inblock, index) {
      str3 += inblock.index + ' ';
    });
    console.log(str3);
  },
  //生成圆盘
  spawnSmallBlockRing: function spawnSmallBlockRing(angle) {
    var arcangle = angle * Math.PI / 180;
    var newSmallBlock = cc.instantiate(this.smallBlockPre);
    newSmallBlock.rotation = -angle;
    arcangle += 22.5 * Math.PI / 180;
    var x = newSmallBlock.x = INSIDERADIES * Math.sin(arcangle);
    var y = newSmallBlock.y = -INSIDERADIES * Math.cos(arcangle);
    newSmallBlock.x = x;
    newSmallBlock.y = y;
    var point = {
      x: x,
      y: y,
      a: angle
    };
    global.insidepoints.push(point);
    newSmallBlock.color = cc.color(0, 0, 0);
    newSmallBlock.opacity = 128;
    newSmallBlock.blocktype = 'inside';
    this.inside.addChild(newSmallBlock);
    this.myTween2(newSmallBlock);
  },
  spawnMiddleBlockRing: function spawnMiddleBlockRing(angle) {
    var arcangle = angle * Math.PI / 180;
    var newMiddleBlock = cc.instantiate(this.middleBlockPre);
    newMiddleBlock.rotation = -angle;
    arcangle += 22.5 * Math.PI / 180;
    var x = newMiddleBlock.x = BESIDERADIES * Math.sin(arcangle);
    var y = newMiddleBlock.y = -BESIDERADIES * Math.cos(arcangle);
    newMiddleBlock.x = x;
    newMiddleBlock.y = y;
    var point = {
      x: x,
      y: y,
      a: angle
    };
    global.besidepoints.push(point);
    newMiddleBlock.color = cc.color(0, 0, 0);
    newMiddleBlock.opacity = 128;
    newMiddleBlock.blocktype = 'beside';
    this.beside.addChild(newMiddleBlock);
    this.myTween2(newMiddleBlock);
  },
  spawnLargeBlockRing: function spawnLargeBlockRing(angle) {
    var arcangle = angle * Math.PI / 180;
    var newLargeBlock = cc.instantiate(this.largeBlockPre);
    newLargeBlock.rotation = -angle;
    arcangle += 22.5 * Math.PI / 180;
    var x = OUTSIDERADIES * Math.sin(arcangle);
    var y = -OUTSIDERADIES * Math.cos(arcangle);
    newLargeBlock.x = x;
    newLargeBlock.y = y;
    var point = {
      x: x,
      y: y,
      a: angle
    };
    global.outsidepoints.push(point);
    newLargeBlock.color = cc.color(0, 0, 0);
    newLargeBlock.opacity = 128;
    newLargeBlock.blocktype = 'outside';
    this.outside.addChild(newLargeBlock);
    this.myTween2(newLargeBlock);
  },
  //随机生成三个块
  spawnSmallBlock: function spawnSmallBlock() {
    var newSmallBlock = cc.instantiate(this.smallBlockPre);
    this.blocks.addChild(newSmallBlock);
    newSmallBlock.setPosition(370, -735);
    newSmallBlock.color = this.getRandomColor();
    newSmallBlock.blocktype = 'small';
    this.rotateGridsS.string = this.getRandomRotatingGrids();
    newSmallBlock.getComponent('smallBlock').game = this;
    this.myTween(newSmallBlock);
  },
  spawnMiddleBlock: function spawnMiddleBlock() {
    var newMiddleBlock = cc.instantiate(this.middleBlockPre);
    this.blocks.addChild(newMiddleBlock);
    newMiddleBlock.setPosition(85, -730);
    newMiddleBlock.color = this.getRandomColor();
    newMiddleBlock.blocktype = 'middle';
    this.rotateGridsM.string = this.getRandomRotatingGrids();
    newMiddleBlock.getComponent('middleBlock').game = this;
    this.myTween(newMiddleBlock);
  },
  spawnLargeBlock: function spawnLargeBlock() {
    var newLargeBlock = cc.instantiate(this.largeBlockPre);
    this.blocks.addChild(newLargeBlock);
    newLargeBlock.setPosition(-270, -725);
    newLargeBlock.color = this.getRandomColor();
    newLargeBlock.blocktype = 'large';
    this.rotateGridsL.string = this.getRandomRotatingGrids();
    newLargeBlock.getComponent('largeBlock').game = this;
    this.myTween(newLargeBlock);
    console.log("this");
    console.log(this.rotateGrids);
  },
  // 随机生成颜色值
  getRandomColor: function getRandomColor() {
    var color = '';
    var colorNum = Math.floor(Math.random() * 30 % 3);

    if (colorNum == 0) {
      color = cc.color(255, 0, 255);
    } else if (colorNum == 1) {
      color = cc.color(255, 240, 0);
    } else if (colorNum == 2) {
      color = cc.color(0, 220, 255);
    } // color = cc.color(0, 220, 255);


    return color;
  },
  // 随机生成旋转的格数
  getRandomRotatingGrids: function getRandomRotatingGrids() {
    var rotatingGrids = 0;

    while (rotatingGrids == 0) {
      rotatingGrids = Math.floor(Math.random() * 70 % 7) - 3;
    } // rotatingGrids = 2;


    return rotatingGrids;
  },
  start: function start() {},
  onDestroy: function onDestroy() {
    global.Lchangeposition = 0;
    global.Lchangeangle = 0;
    global.Mchangeposition = 0;
    global.Mchangeangle = 0;
    global.Schangeposition = 0;
    global.Schangeangle = 0;
  },
  myTween: function myTween(node) {
    cc.tween(node). // to(.1, {
    //   scale: 0
    // }, {
    //   easing: 'quadIn'
    // }).
    to(.2, {
      scale: 1.15
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1
    }, {
      easing: 'quadIn'
    }).call(function () {}).start();
  },
  myTween2: function myTween2(node) {
    cc.tween(node).to(.2, {
      scale: .9
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1
    }, {
      easing: 'quadIn'
    }).call(function () {}).start();
  },
  myTween3: function myTween3(node) {
    cc.tween(node).to(.2, {
      scale: 0
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1.2
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1
    }, {
      easing: 'quadIn'
    }).call(function () {}).start();
  },
  myTween4: function myTween4(node) {
    cc.tween(node).to(.2, {
      scale: 1
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1.2
    }, {
      easing: 'quadIn'
    }).to(.2, {
      scale: 1
    }, {
      easing: 'quadIn'
    }).call(function () {}).start();
  },
  myTween5: function myTween5(node) {
    cc.tween(node).to(.2, {
      opacity: 0
    }, {
      easing: 'quadIn'
    }).to(.2, {
      opacity: 127
    }, {
      easing: 'quadIn'
    }).call(function () {}).start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZS5qcyJdLCJuYW1lcyI6WyJJTlNJREVSQURJRVMiLCJCRVNJREVSQURJRVMiLCJPVVRTSURFUkFESUVTIiwiZ2xvYmFsIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic2NvcmVBdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJyb3RhdGVBdWRpbyIsInBsYWNlQXVkaW8iLCJtYXNrIiwiTm9kZSIsImdhbWVvdmVyIiwiYmxvY2tzIiwib3V0c2lkZSIsImJlc2lkZSIsImluc2lkZSIsInNjb3JlRGlzcGxheSIsIkxhYmVsIiwicm90YXRlR3JpZHNTIiwicm90YXRlR3JpZHNNIiwicm90YXRlR3JpZHNMIiwic21hbGxCbG9ja1ByZSIsIlByZWZhYiIsIm1pZGRsZUJsb2NrUHJlIiwibGFyZ2VCbG9ja1ByZSIsImhpZ2hlc3QiLCJvbkxvYWQiLCJjb3VudCIsInNjb3JlIiwib3V0c2lkZXBvaW50cyIsImJlc2lkZXBvaW50cyIsImluc2lkZXBvaW50cyIsIm91dHNpZGVibG9ja3MiLCJiZXNpZGVibG9ja3MiLCJpbnNpZGVibG9ja3MiLCJhbmdsZSIsImNvbnNvbGUiLCJsb2ciLCJzcGF3bkJsb2NrIiwiaSIsInNwYXduU21hbGxCbG9ja1JpbmciLCJzcGF3bk1pZGRsZUJsb2NrUmluZyIsInNwYXduTGFyZ2VCbG9ja1JpbmciLCJyYW5rIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN0cmluZyIsImhpZ2hzY29yZSIsInBhcnNlSW50Iiwic3Bhd25TbWFsbEJsb2NrIiwic3Bhd25NaWRkbGVCbG9jayIsInNwYXduTGFyZ2VCbG9jayIsImRlbGV0ZUJsb2NrIiwib3V0YmxvY2siLCJiZWJsb2NrIiwiaW5ibG9jayIsInRvYmVkZWxldGVvdXQiLCJ0b2JlZGVsZXRlYmUiLCJ0b2JlZGVsZXRlaW4iLCJ0b2JlZGVsZXRlbm9kZSIsImEiLCJsZW5ndGgiLCJiIiwiYyIsImluZGV4IiwiY29sb3IiLCJibG9ja2l0ZW0iLCJzZXRJdGVtIiwiZm9yRWFjaCIsInNwbGljZSIsImluZGV4T2YiLCJ0d2VlbiIsIm5vZGUiLCJ0byIsInNjYWxlIiwiZWFzaW5nIiwiY2FsbCIsImRlc3Ryb3kiLCJzdGFydCIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsIm15VHdlZW41IiwibXlUd2VlbjMiLCJzaG93SW5mbyIsInN0cjEiLCJzdHIyIiwic3RyMyIsImFyY2FuZ2xlIiwiTWF0aCIsIlBJIiwibmV3U21hbGxCbG9jayIsImluc3RhbnRpYXRlIiwicm90YXRpb24iLCJ4Iiwic2luIiwieSIsImNvcyIsInBvaW50IiwicHVzaCIsIm9wYWNpdHkiLCJibG9ja3R5cGUiLCJhZGRDaGlsZCIsIm15VHdlZW4yIiwibmV3TWlkZGxlQmxvY2siLCJuZXdMYXJnZUJsb2NrIiwic2V0UG9zaXRpb24iLCJnZXRSYW5kb21Db2xvciIsImdldFJhbmRvbVJvdGF0aW5nR3JpZHMiLCJnZXRDb21wb25lbnQiLCJnYW1lIiwibXlUd2VlbiIsInJvdGF0ZUdyaWRzIiwiY29sb3JOdW0iLCJmbG9vciIsInJhbmRvbSIsInJvdGF0aW5nR3JpZHMiLCJvbkRlc3Ryb3kiLCJMY2hhbmdlcG9zaXRpb24iLCJMY2hhbmdlYW5nbGUiLCJNY2hhbmdlcG9zaXRpb24iLCJNY2hhbmdlYW5nbGUiLCJTY2hhbmdlcG9zaXRpb24iLCJTY2hhbmdlYW5nbGUiLCJteVR3ZWVuNCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxZQUFZLEdBQUcsR0FBckI7QUFDQSxJQUFNQyxZQUFZLEdBQUcsR0FBckI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsR0FBdEI7O0FBRUEsSUFBSUMsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMs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LyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IElOU0lERVJBRElFUyA9IDEyMDtcclxuY29uc3QgQkVTSURFUkFESUVTID0gMjYwO1xyXG5jb25zdCBPVVRTSURFUkFESUVTID0gNDA1O1xyXG5cclxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJ2dsb2JhbCcpO1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgc2NvcmVBdWRpbzoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgIH0sXHJcbiAgICByb3RhdGVBdWRpbzoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5BdWRpb0NsaXBcclxuICAgIH0sXHJcbiAgICBwbGFjZUF1ZGlvOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgfSxcclxuICAgIG1hc2s6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgfSxcclxuICAgIGdhbWVvdmVyOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBibG9ja3M6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgfSxcclxuICAgIG91dHNpZGU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTm9kZVxyXG4gICAgfSxcclxuICAgIGJlc2lkZToge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5Ob2RlXHJcbiAgICB9LFxyXG4gICAgaW5zaWRlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLk5vZGVcclxuICAgIH0sXHJcbiAgICBzY29yZURpc3BsYXk6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgIH0sXHJcbiAgICByb3RhdGVHcmlkc1M6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgIH0sXHJcbiAgICByb3RhdGVHcmlkc006IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgIH0sXHJcbiAgICByb3RhdGVHcmlkc0w6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuTGFiZWxcclxuICAgIH0sXHJcbiAgICBzbWFsbEJsb2NrUHJlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgfSxcclxuICAgIG1pZGRsZUJsb2NrUHJlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgIHR5cGU6IGNjLlByZWZhYlxyXG4gICAgfSxcclxuICAgIGxhcmdlQmxvY2tQcmU6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuUHJlZmFiXHJcbiAgICB9LFxyXG4gICAgaGlnaGVzdDoge1xyXG4gICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICB0eXBlOiBjYy5MYWJlbFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIGdsb2JhbC5jb3VudCA9IDBcclxuICAgIGdsb2JhbC5zY29yZSA9IDBcclxuXHJcbiAgICBnbG9iYWwub3V0c2lkZXBvaW50cyA9IFtdXHJcbiAgICBnbG9iYWwuYmVzaWRlcG9pbnRzID0gW11cclxuICAgIGdsb2JhbC5pbnNpZGVwb2ludHMgPSBbXVxyXG5cclxuICAgIC8vIOeUqOS6juiusOW9leWchueOr+S4reW3sue7j+WtmOWcqOeahOWdl+eahOS9jee9rlxyXG4gICAgZ2xvYmFsLm91dHNpZGVibG9ja3MgPSBbXVxyXG4gICAgZ2xvYmFsLmJlc2lkZWJsb2NrcyA9IFtdXHJcbiAgICBnbG9iYWwuaW5zaWRlYmxvY2tzID0gW11cclxuXHJcbiAgICB0aGlzLm91dHNpZGUuYW5nbGUgPSAwXHJcbiAgICB0aGlzLmJlc2lkZS5hbmdsZSA9IDBcclxuICAgIHRoaXMuaW5zaWRlLmFuZ2xlID0gMFxyXG4gICAgY29uc29sZS5sb2codGhpcy5pbnNpZGUpXHJcblxyXG4gICAgLy8g55Sf5oiQ5LiJ5Liq6aKc6Imy5Z2XXHJcbiAgICB0aGlzLnNwYXduQmxvY2soKTtcclxuICAgIC8vIOeUn+aIkOS4ieS4quWchueOr1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgdGhpcy5zcGF3blNtYWxsQmxvY2tSaW5nKGkgKiA0NSk7XHJcbiAgICAgIHRoaXMuc3Bhd25NaWRkbGVCbG9ja1JpbmcoaSAqIDQ1KTtcclxuICAgICAgdGhpcy5zcGF3bkxhcmdlQmxvY2tSaW5nKGkgKiA0NSk7XHJcbiAgICB9XHJcbiAgICAvLyDlhajlsYDlj5jph4/liJ3lp4vljJZcclxuICAgIGNvbnNvbGUubG9nKGdsb2JhbC5jb3VudClcclxuXHJcbiAgICAvLyBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJyYW5rXCIpXHJcbiAgICBsZXQgcmFuayA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJhbmtcIilcclxuICAgIGlmIChyYW5rICE9IG51bGwgJiYgcmFuayAhPSAnJykge1xyXG4gICAgICB0aGlzLmhpZ2hlc3Quc3RyaW5nID0gcmFuaztcclxuICAgICAgZ2xvYmFsLmhpZ2hzY29yZSA9IHBhcnNlSW50KHJhbmspO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWdoZXN0LnN0cmluZyA9ICcwJztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzcGF3bkJsb2NrKCkge1xyXG4gICAgdGhpcy5zcGF3blNtYWxsQmxvY2soKTtcclxuICAgIHRoaXMuc3Bhd25NaWRkbGVCbG9jaygpO1xyXG4gICAgdGhpcy5zcGF3bkxhcmdlQmxvY2soKTtcclxuICB9LFxyXG5cclxuICBkZWxldGVCbG9jaygpIHtcclxuICAgIC8vIGxldCBfdGhpcyA9IHRoaXNcclxuICAgIC8vIG91dHNpZGVibG9ja3PmlbDnu4TlhYPntKBcclxuICAgIGxldCBvdXRibG9jayA9IDBcclxuICAgIC8vIGJlc2lkZWJsb2Nrc+aVsOe7hOWFg+e0oFxyXG4gICAgbGV0IGJlYmxvY2sgPSAwXHJcbiAgICAvLyBpbnNpZGVibG9ja3PmlbDnu4TlhYPntKBcclxuICAgIGxldCBpbmJsb2NrID0gMFxyXG5cclxuICAgIC8vIOWwhuiiq+WIoOmZpOeahOaVsOe7hOWFg+e0oFxyXG4gICAgbGV0IHRvYmVkZWxldGVvdXQgPSBbXVxyXG4gICAgbGV0IHRvYmVkZWxldGViZSA9IFtdXHJcbiAgICBsZXQgdG9iZWRlbGV0ZWluID0gW11cclxuXHJcbiAgICAvLyB0aGlzLnNob3dJbmZvKClcclxuICAgIC8vIOWwhuiiq+WIoOmZpOeahOiKgueCuVxyXG4gICAgbGV0IHRvYmVkZWxldGVub2RlID0gW11cclxuICAgIC8vIGEsYixj5Li65Z2X5pWw57uE5Lit55yf5a6e5L2N572uXHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGdsb2JhbC5vdXRzaWRlYmxvY2tzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgIGxldCBvdXRibG9jayA9IGdsb2JhbC5vdXRzaWRlYmxvY2tzW2FdXHJcbiAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgZ2xvYmFsLmJlc2lkZWJsb2Nrcy5sZW5ndGg7IGIrKykge1xyXG4gICAgICAgIGxldCBiZWJsb2NrID0gZ2xvYmFsLmJlc2lkZWJsb2Nrc1tiXVxyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgZ2xvYmFsLmluc2lkZWJsb2Nrcy5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgbGV0IGluYmxvY2sgPSBnbG9iYWwuaW5zaWRlYmxvY2tzW2NdXHJcblxyXG4gICAgICAgICAgaWYgKG91dGJsb2NrLmluZGV4ID09IGJlYmxvY2suaW5kZXggJiYgYmVibG9jay5pbmRleCA9PSBpbmJsb2NrLmluZGV4XHJcbiAgICAgICAgICAgICYmIG91dGJsb2NrLmNvbG9yID09IGJlYmxvY2suY29sb3IgJiYgYmVibG9jay5jb2xvciA9PSBpbmJsb2NrLmNvbG9yKSB7XHJcbiAgICAgICAgICAgIC8v6K6w5b2V5bCG6KKr5Yig6Zmk55qE6IqC54K5XHJcbiAgICAgICAgICAgIHRvYmVkZWxldGVub2RlW3RvYmVkZWxldGVub2RlLmxlbmd0aF0gPSBvdXRibG9jay5ibG9ja2l0ZW07XHJcbiAgICAgICAgICAgIHRvYmVkZWxldGVub2RlW3RvYmVkZWxldGVub2RlLmxlbmd0aF0gPSBiZWJsb2NrLmJsb2NraXRlbTtcclxuICAgICAgICAgICAgdG9iZWRlbGV0ZW5vZGVbdG9iZWRlbGV0ZW5vZGUubGVuZ3RoXSA9IGluYmxvY2suYmxvY2tpdGVtO1xyXG4gICAgICAgICAgICAvL+iusOW9leWwhuiiq+WIoOmZpOeahOaVsOe7hOWFg+e0oFxyXG4gICAgICAgICAgICB0b2JlZGVsZXRlb3V0W3RvYmVkZWxldGVvdXQubGVuZ3RoXSA9IG91dGJsb2NrXHJcbiAgICAgICAgICAgIHRvYmVkZWxldGViZVt0b2JlZGVsZXRlYmUubGVuZ3RoXSA9IGJlYmxvY2tcclxuICAgICAgICAgICAgdG9iZWRlbGV0ZWluW3RvYmVkZWxldGVpbi5sZW5ndGhdID0gaW5ibG9ja1xyXG4gICAgICAgICAgICAvL+W+l+WIhlxyXG4gICAgICAgICAgICBnbG9iYWwuc2NvcmUgKz0gMTBcclxuICAgICAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gZ2xvYmFsLnNjb3JlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdsb2JhbC5zY29yZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZ2xvYmFsLmhpZ2hzY29yZSlcclxuICAgICAgICAgICAgaWYgKGdsb2JhbC5zY29yZSA+IGdsb2JhbC5oaWdoc2NvcmUpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmFuaycgKyBnbG9iYWwuc2NvcmUpXHJcbiAgICAgICAgICAgICAgdGhpcy5oaWdoZXN0LnN0cmluZyA9IGdsb2JhbC5zY29yZVxyXG4gICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInJhbmtcIiwgZ2xvYmFsLnNjb3JlKVxyXG4gICAgICAgICAgICAgIGdsb2JhbC5oaWdoc2NvcmUgPSBnbG9iYWwuc2NvcmVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNjb3JlRGlzcGxheSlcclxuICAgICAgICAgICAgLy8gdGhpcy5teVR3ZWVuNCh0aGlzLnNjb3JlRGlzcGxheSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKCdsZW4nICsgdG9iZWRlbGV0ZW5vZGUubGVuZ3RoKVxyXG4gICAgaWYgKHRvYmVkZWxldGVub2RlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIC8vIOWIoOmZpOWcqG91dHNpZGVibG9ja3MsYmVzaWRlYmxvY2tzLGluc2lkZWJsb2Nrc+S4ieS4quaVsOe7hOS4reeahOe0ouW8lVxyXG4gICAgICB0b2JlZGVsZXRlb3V0LmZvckVhY2goKG91dGJsb2NrKSA9PiB7XHJcbiAgICAgICAgZ2xvYmFsLm91dHNpZGVibG9ja3Muc3BsaWNlKGdsb2JhbC5vdXRzaWRlYmxvY2tzLmluZGV4T2Yob3V0YmxvY2spLCAxKTtcclxuICAgICAgfSlcclxuICAgICAgdG9iZWRlbGV0ZWJlLmZvckVhY2goKGJlYmxvY2spID0+IHtcclxuICAgICAgICBnbG9iYWwuYmVzaWRlYmxvY2tzLnNwbGljZShnbG9iYWwuYmVzaWRlYmxvY2tzLmluZGV4T2YoYmVibG9jayksIDEpO1xyXG4gICAgICB9KVxyXG4gICAgICB0b2JlZGVsZXRlaW4uZm9yRWFjaCgoaW5ibG9jaykgPT4ge1xyXG4gICAgICAgIGdsb2JhbC5pbnNpZGVibG9ja3Muc3BsaWNlKGdsb2JhbC5pbnNpZGVibG9ja3MuaW5kZXhPZihpbmJsb2NrKSwgMSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIHRoaXMuc2hvd0luZm8oKVxyXG4gICAgICAvLyDliKDpmaTmlbDnu4TkuK3lnZfnmoTntKLlvJVcclxuICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvYmVkZWxldGVub2RlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0b2JlZGVsZXRlbm9kZVtpXS5ub2RlKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coaSArICdhcnJheScpXHJcbiAgICAgICAgLy/lnZfliKDpmaRcclxuICAgICAgICBjYy50d2Vlbih0b2JlZGVsZXRlbm9kZVtpXS5ub2RlKS5cclxuICAgICAgICAgIHRvKC4xLCB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAxLjJcclxuICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgICAgICAgfSkuXHJcbiAgICAgICAgICB0byguMiwge1xyXG4gICAgICAgICAgICBzY2FsZTogMFxyXG4gICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBlYXNpbmc6ICdxdWFkSW4nXHJcbiAgICAgICAgICB9KS5cclxuICAgICAgICAgIGNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmRleCArICd0b2JlZGV0ZXRlJylcclxuICAgICAgICAgICAgdG9iZWRlbGV0ZW5vZGVbaW5kZXgrK10ubm9kZS5kZXN0cm95KClcclxuICAgICAgICAgIH0pLnN0YXJ0KClcclxuICAgICAgfVxyXG4gICAgICAvLyDmkq3mlL7pn7PmlYhcclxuICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNjb3JlQXVkaW8sIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBpZiAoZ2xvYmFsLm91dHNpZGVibG9ja3MubGVuZ3RoID09IDggJiYgZ2xvYmFsLmJlc2lkZWJsb2Nrcy5sZW5ndGggPT0gOCAmJiBnbG9iYWwuaW5zaWRlYmxvY2tzLmxlbmd0aCA9PSA4KSB7XHJcbiAgICAgICAgLy8gdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ0dBTUUgT1ZFUignICsgZ2xvYmFsLnNjb3JlICsgJyknXHJcbiAgICAgICAgdGhpcy5teVR3ZWVuNSh0aGlzLm1hc2spXHJcbiAgICAgICAgdGhpcy5teVR3ZWVuMyh0aGlzLmdhbWVvdmVyKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8g5omT5Y2w5pWw57uEXHJcbiAgc2hvd0luZm8oKSB7XHJcbiAgICAvLyBsZXQgc3RyMSwgc3RyMiwgc3RyMztcclxuICAgIC8vIHN0cjEgPSAnZGVsZXRlIG91dDogJ1xyXG4gICAgLy8gc3RyMiA9ICdkZWxldGUgYmU6ICdcclxuICAgIC8vIHN0cjMgPSAnZGVsZXRlIGluOiAnXHJcbiAgICAvLyB0b2JlZGVsZXRlb3V0LmZvckVhY2goKGExKSA9PiB7XHJcbiAgICAvLyAgIHN0cjEgKz0gYTEgKyAnICdcclxuICAgIC8vIH0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyhzdHIxKVxyXG4gICAgLy8gdG9iZWRlbGV0ZWJlLmZvckVhY2goKGIxKSA9PiB7XHJcbiAgICAvLyAgIHN0cjIgKz0gYjEgKyAnICdcclxuICAgIC8vIH0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyhzdHIyKVxyXG4gICAgLy8gdG9iZWRlbGV0ZWluLmZvckVhY2goKGMxKSA9PiB7XHJcbiAgICAvLyAgIHN0cjMgKz0gYzEgKyAnICdcclxuICAgIC8vIH0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyhzdHIzKVxyXG4gICAgLy8gY29uc29sZS5sb2codHlwZW9mIGdsb2JhbC5iZXNpZGVibG9ja3NbMF0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyhnbG9iYWwuYmVzaWRlYmxvY2tzWzBdKVxyXG4gICAgbGV0IHN0cjEsIHN0cjIsIHN0cjM7XHJcbiAgICBzdHIxID0gJ291dDogJ1xyXG4gICAgc3RyMiA9ICdiZTogJ1xyXG4gICAgc3RyMyA9ICdpbjogJ1xyXG4gICAgZ2xvYmFsLm91dHNpZGVibG9ja3MuZm9yRWFjaCgob3V0YmxvY2ssIGluZGV4KSA9PiB7XHJcbiAgICAgIHN0cjEgKz0gb3V0YmxvY2suaW5kZXggKyAnICdcclxuICAgIH0pXHJcbiAgICBjb25zb2xlLmxvZyhzdHIxKVxyXG4gICAgZ2xvYmFsLmJlc2lkZWJsb2Nrcy5mb3JFYWNoKChiZWJsb2NrLCBpbmRleCkgPT4ge1xyXG4gICAgICBzdHIyICs9IGJlYmxvY2suaW5kZXggKyAnICdcclxuICAgIH0pXHJcbiAgICBjb25zb2xlLmxvZyhzdHIyKVxyXG4gICAgZ2xvYmFsLmluc2lkZWJsb2Nrcy5mb3JFYWNoKChpbmJsb2NrLCBpbmRleCkgPT4ge1xyXG4gICAgICBzdHIzICs9IGluYmxvY2suaW5kZXggKyAnICdcclxuICAgIH0pXHJcbiAgICBjb25zb2xlLmxvZyhzdHIzKVxyXG4gIH0sXHJcblxyXG4gIC8v55Sf5oiQ5ZyG55uYXHJcbiAgc3Bhd25TbWFsbEJsb2NrUmluZzogZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICBsZXQgYXJjYW5nbGUgPSBhbmdsZSAqIE1hdGguUEkgLyAxODBcclxuICAgIHZhciBuZXdTbWFsbEJsb2NrID0gY2MuaW5zdGFudGlhdGUodGhpcy5zbWFsbEJsb2NrUHJlKTtcclxuICAgIG5ld1NtYWxsQmxvY2sucm90YXRpb24gPSAtYW5nbGVcclxuICAgIGFyY2FuZ2xlICs9IDIyLjUgKiBNYXRoLlBJIC8gMTgwXHJcblxyXG4gICAgbGV0IHggPSBuZXdTbWFsbEJsb2NrLnggPSBJTlNJREVSQURJRVMgKiBNYXRoLnNpbihhcmNhbmdsZSk7XHJcbiAgICBsZXQgeSA9IG5ld1NtYWxsQmxvY2sueSA9IC1JTlNJREVSQURJRVMgKiBNYXRoLmNvcyhhcmNhbmdsZSk7XHJcbiAgICBuZXdTbWFsbEJsb2NrLnggPSB4XHJcbiAgICBuZXdTbWFsbEJsb2NrLnkgPSB5XHJcbiAgICBsZXQgcG9pbnQgPSB7XHJcbiAgICAgIHg6IHgsXHJcbiAgICAgIHk6IHksXHJcbiAgICAgIGE6IGFuZ2xlXHJcbiAgICB9XHJcbiAgICBnbG9iYWwuaW5zaWRlcG9pbnRzLnB1c2gocG9pbnQpXHJcblxyXG4gICAgbmV3U21hbGxCbG9jay5jb2xvciA9IGNjLmNvbG9yKDAsIDAsIDApO1xyXG4gICAgbmV3U21hbGxCbG9jay5vcGFjaXR5ID0gMTI4XHJcbiAgICBuZXdTbWFsbEJsb2NrLmJsb2NrdHlwZSA9ICdpbnNpZGUnO1xyXG4gICAgdGhpcy5pbnNpZGUuYWRkQ2hpbGQobmV3U21hbGxCbG9jayk7XHJcbiAgICB0aGlzLm15VHdlZW4yKG5ld1NtYWxsQmxvY2spXHJcbiAgfSxcclxuXHJcbiAgc3Bhd25NaWRkbGVCbG9ja1Jpbmc6IGZ1bmN0aW9uIChhbmdsZSkge1xyXG4gICAgbGV0IGFyY2FuZ2xlID0gYW5nbGUgKiBNYXRoLlBJIC8gMTgwXHJcbiAgICB2YXIgbmV3TWlkZGxlQmxvY2sgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1pZGRsZUJsb2NrUHJlKTtcclxuICAgIG5ld01pZGRsZUJsb2NrLnJvdGF0aW9uID0gLWFuZ2xlXHJcbiAgICBhcmNhbmdsZSArPSAyMi41ICogTWF0aC5QSSAvIDE4MFxyXG4gICAgbGV0IHggPSBuZXdNaWRkbGVCbG9jay54ID0gQkVTSURFUkFESUVTICogTWF0aC5zaW4oYXJjYW5nbGUpO1xyXG4gICAgbGV0IHkgPSBuZXdNaWRkbGVCbG9jay55ID0gLUJFU0lERVJBRElFUyAqIE1hdGguY29zKGFyY2FuZ2xlKTtcclxuXHJcbiAgICBuZXdNaWRkbGVCbG9jay54ID0geFxyXG4gICAgbmV3TWlkZGxlQmxvY2sueSA9IHlcclxuICAgIGxldCBwb2ludCA9IHtcclxuICAgICAgeDogeCxcclxuICAgICAgeTogeSxcclxuICAgICAgYTogYW5nbGVcclxuICAgIH1cclxuICAgIGdsb2JhbC5iZXNpZGVwb2ludHMucHVzaChwb2ludClcclxuXHJcbiAgICBuZXdNaWRkbGVCbG9jay5jb2xvciA9IGNjLmNvbG9yKDAsIDAsIDApO1xyXG4gICAgbmV3TWlkZGxlQmxvY2sub3BhY2l0eSA9IDEyOFxyXG4gICAgbmV3TWlkZGxlQmxvY2suYmxvY2t0eXBlID0gJ2Jlc2lkZSc7XHJcbiAgICB0aGlzLmJlc2lkZS5hZGRDaGlsZChuZXdNaWRkbGVCbG9jayk7XHJcbiAgICB0aGlzLm15VHdlZW4yKG5ld01pZGRsZUJsb2NrKVxyXG4gIH0sXHJcblxyXG4gIHNwYXduTGFyZ2VCbG9ja1Jpbmc6IGZ1bmN0aW9uIChhbmdsZSkge1xyXG4gICAgbGV0IGFyY2FuZ2xlID0gYW5nbGUgKiBNYXRoLlBJIC8gMTgwXHJcbiAgICB2YXIgbmV3TGFyZ2VCbG9jayA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFyZ2VCbG9ja1ByZSk7XHJcbiAgICBuZXdMYXJnZUJsb2NrLnJvdGF0aW9uID0gLWFuZ2xlXHJcbiAgICBhcmNhbmdsZSArPSAyMi41ICogTWF0aC5QSSAvIDE4MFxyXG5cclxuICAgIGxldCB4ID0gT1VUU0lERVJBRElFUyAqIE1hdGguc2luKGFyY2FuZ2xlKTtcclxuICAgIGxldCB5ID0gLU9VVFNJREVSQURJRVMgKiBNYXRoLmNvcyhhcmNhbmdsZSk7XHJcbiAgICBuZXdMYXJnZUJsb2NrLnggPSB4XHJcbiAgICBuZXdMYXJnZUJsb2NrLnkgPSB5XHJcbiAgICBsZXQgcG9pbnQgPSB7XHJcbiAgICAgIHg6IHgsXHJcbiAgICAgIHk6IHksXHJcbiAgICAgIGE6IGFuZ2xlXHJcbiAgICB9XHJcbiAgICBnbG9iYWwub3V0c2lkZXBvaW50cy5wdXNoKHBvaW50KVxyXG5cclxuICAgIG5ld0xhcmdlQmxvY2suY29sb3IgPSBjYy5jb2xvcigwLCAwLCAwKTtcclxuICAgIG5ld0xhcmdlQmxvY2sub3BhY2l0eSA9IDEyOFxyXG4gICAgbmV3TGFyZ2VCbG9jay5ibG9ja3R5cGUgPSAnb3V0c2lkZSc7XHJcbiAgICB0aGlzLm91dHNpZGUuYWRkQ2hpbGQobmV3TGFyZ2VCbG9jayk7XHJcbiAgICB0aGlzLm15VHdlZW4yKG5ld0xhcmdlQmxvY2spXHJcbiAgfSxcclxuXHJcbiAgLy/pmo/mnLrnlJ/miJDkuInkuKrlnZdcclxuICBzcGF3blNtYWxsQmxvY2soKSB7XHJcbiAgICB2YXIgbmV3U21hbGxCbG9jayA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc21hbGxCbG9ja1ByZSk7XHJcbiAgICB0aGlzLmJsb2Nrcy5hZGRDaGlsZChuZXdTbWFsbEJsb2NrKTtcclxuICAgIG5ld1NtYWxsQmxvY2suc2V0UG9zaXRpb24oMzcwLCAtNzM1KTtcclxuICAgIG5ld1NtYWxsQmxvY2suY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICBuZXdTbWFsbEJsb2NrLmJsb2NrdHlwZSA9ICdzbWFsbCdcclxuICAgIHRoaXMucm90YXRlR3JpZHNTLnN0cmluZyA9IHRoaXMuZ2V0UmFuZG9tUm90YXRpbmdHcmlkcygpO1xyXG4gICAgbmV3U21hbGxCbG9jay5nZXRDb21wb25lbnQoJ3NtYWxsQmxvY2snKS5nYW1lID0gdGhpcztcclxuICAgIHRoaXMubXlUd2VlbihuZXdTbWFsbEJsb2NrKVxyXG4gIH0sXHJcbiAgc3Bhd25NaWRkbGVCbG9jaygpIHtcclxuICAgIHZhciBuZXdNaWRkbGVCbG9jayA9IGNjLmluc3RhbnRpYXRlKHRoaXMubWlkZGxlQmxvY2tQcmUpO1xyXG4gICAgdGhpcy5ibG9ja3MuYWRkQ2hpbGQobmV3TWlkZGxlQmxvY2spO1xyXG4gICAgbmV3TWlkZGxlQmxvY2suc2V0UG9zaXRpb24oODUsIC03MzApO1xyXG4gICAgbmV3TWlkZGxlQmxvY2suY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICBuZXdNaWRkbGVCbG9jay5ibG9ja3R5cGUgPSAnbWlkZGxlJztcclxuICAgIHRoaXMucm90YXRlR3JpZHNNLnN0cmluZyA9IHRoaXMuZ2V0UmFuZG9tUm90YXRpbmdHcmlkcygpXHJcbiAgICBuZXdNaWRkbGVCbG9jay5nZXRDb21wb25lbnQoJ21pZGRsZUJsb2NrJykuZ2FtZSA9IHRoaXM7XHJcbiAgICB0aGlzLm15VHdlZW4obmV3TWlkZGxlQmxvY2spXHJcbiAgfSxcclxuICBzcGF3bkxhcmdlQmxvY2soKSB7XHJcbiAgICB2YXIgbmV3TGFyZ2VCbG9jayA9IGNjLmluc3RhbnRpYXRlKHRoaXMubGFyZ2VCbG9ja1ByZSk7XHJcbiAgICB0aGlzLmJsb2Nrcy5hZGRDaGlsZChuZXdMYXJnZUJsb2NrKTtcclxuICAgIG5ld0xhcmdlQmxvY2suc2V0UG9zaXRpb24oLTI3MCwgLTcyNSk7XHJcbiAgICBuZXdMYXJnZUJsb2NrLmNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcigpO1xyXG4gICAgbmV3TGFyZ2VCbG9jay5ibG9ja3R5cGUgPSAnbGFyZ2UnO1xyXG4gICAgdGhpcy5yb3RhdGVHcmlkc0wuc3RyaW5nID0gdGhpcy5nZXRSYW5kb21Sb3RhdGluZ0dyaWRzKClcclxuICAgIG5ld0xhcmdlQmxvY2suZ2V0Q29tcG9uZW50KCdsYXJnZUJsb2NrJykuZ2FtZSA9IHRoaXM7XHJcbiAgICB0aGlzLm15VHdlZW4obmV3TGFyZ2VCbG9jaylcclxuICAgIGNvbnNvbGUubG9nKFwidGhpc1wiKVxyXG4gICAgY29uc29sZS5sb2codGhpcy5yb3RhdGVHcmlkcylcclxuICB9LFxyXG4gIC8vIOmaj+acuueUn+aIkOminOiJsuWAvFxyXG4gIGdldFJhbmRvbUNvbG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY29sb3IgPSAnJztcclxuICAgIHZhciBjb2xvck51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwICUgMyk7XHJcbiAgICBpZiAoY29sb3JOdW0gPT0gMCkge1xyXG4gICAgICBjb2xvciA9IGNjLmNvbG9yKDI1NSwgMCwgMjU1KTtcclxuICAgIH0gZWxzZSBpZiAoY29sb3JOdW0gPT0gMSkge1xyXG4gICAgICBjb2xvciA9IGNjLmNvbG9yKDI1NSwgMjQwLCAwKTtcclxuICAgIH0gZWxzZSBpZiAoY29sb3JOdW0gPT0gMikge1xyXG4gICAgICBjb2xvciA9IGNjLmNvbG9yKDAsIDIyMCwgMjU1KTtcclxuICAgIH1cclxuICAgIC8vIGNvbG9yID0gY2MuY29sb3IoMCwgMjIwLCAyNTUpO1xyXG4gICAgcmV0dXJuIGNvbG9yO1xyXG4gIH0sXHJcbiAgLy8g6ZqP5py655Sf5oiQ5peL6L2s55qE5qC85pWwXHJcbiAgZ2V0UmFuZG9tUm90YXRpbmdHcmlkcygpIHtcclxuICAgIHZhciByb3RhdGluZ0dyaWRzID0gMDtcclxuICAgIHdoaWxlIChyb3RhdGluZ0dyaWRzID09IDApXHJcbiAgICAgIHJvdGF0aW5nR3JpZHMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA3MCAlIDcpIC0gMztcclxuICAgIC8vIHJvdGF0aW5nR3JpZHMgPSAyO1xyXG4gICAgcmV0dXJuIHJvdGF0aW5nR3JpZHM7XHJcbiAgfSxcclxuICBzdGFydCgpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgb25EZXN0cm95KCkge1xyXG4gICAgZ2xvYmFsLkxjaGFuZ2Vwb3NpdGlvbiA9IDBcclxuICAgIGdsb2JhbC5MY2hhbmdlYW5nbGUgPSAwXHJcbiAgICBnbG9iYWwuTWNoYW5nZXBvc2l0aW9uID0gMFxyXG4gICAgZ2xvYmFsLk1jaGFuZ2VhbmdsZSA9IDBcclxuICAgIGdsb2JhbC5TY2hhbmdlcG9zaXRpb24gPSAwXHJcbiAgICBnbG9iYWwuU2NoYW5nZWFuZ2xlID0gMFxyXG4gIH0sXHJcbiAgXHJcbiAgbXlUd2VlbjogZnVuY3Rpb24obm9kZSkge1xyXG4gICAgY2MudHdlZW4obm9kZSkuXHJcbiAgICAvLyB0byguMSwge1xyXG4gICAgLy8gICBzY2FsZTogMFxyXG4gICAgLy8gfSwge1xyXG4gICAgLy8gICBlYXNpbmc6ICdxdWFkSW4nXHJcbiAgICAvLyB9KS5cclxuICAgIHRvKC4yLCB7XHJcbiAgICAgIHNjYWxlOiAxLjE1XHJcbiAgICB9LCB7XHJcbiAgICAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgIH0pLlxyXG4gICAgdG8oLjIsIHtcclxuICAgICAgc2NhbGU6IDFcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuXHJcbiAgICBjYWxsKCgpID0+IHtcclxuICAgIH0pLnN0YXJ0KClcclxuICB9LFxyXG4gIFxyXG4gIG15VHdlZW4yOiBmdW5jdGlvbihub2RlKSB7XHJcbiAgICBjYy50d2Vlbihub2RlKS5cclxuICAgIHRvKC4yLCB7XHJcbiAgICAgIHNjYWxlOiAuOVxyXG4gICAgfSwge1xyXG4gICAgICBlYXNpbmc6ICdxdWFkSW4nXHJcbiAgICB9KS5cclxuICAgIHRvKC4yLCB7XHJcbiAgICAgIHNjYWxlOiAxXHJcbiAgICB9LCB7XHJcbiAgICAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgIH0pLlxyXG4gICAgY2FsbCgoKSA9PiB7XHJcbiAgICB9KS5zdGFydCgpXHJcbiAgfSxcclxuICBcclxuICBteVR3ZWVuMzogZnVuY3Rpb24obm9kZSkge1xyXG4gICAgY2MudHdlZW4obm9kZSkuXHJcbiAgICB0byguMiwge1xyXG4gICAgICBzY2FsZTogMFxyXG4gICAgfSwge1xyXG4gICAgICBlYXNpbmc6ICdxdWFkSW4nXHJcbiAgICB9KS5cclxuICAgIHRvKC4yLCB7XHJcbiAgICAgIHNjYWxlOiAxLjJcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuXHJcbiAgICB0byguMiwge1xyXG4gICAgICBzY2FsZTogMVxyXG4gICAgfSwge1xyXG4gICAgICBlYXNpbmc6ICdxdWFkSW4nXHJcbiAgICB9KS5cclxuICAgIGNhbGwoKCkgPT4ge1xyXG4gICAgfSkuc3RhcnQoKVxyXG4gIH0sXHJcbiAgXHJcbiAgbXlUd2VlbjQ6IGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgIGNjLnR3ZWVuKG5vZGUpLlxyXG4gICAgdG8oLjIsIHtcclxuICAgICAgc2NhbGU6IDFcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuXHJcbiAgICB0byguMiwge1xyXG4gICAgICBzY2FsZTogMS4yXHJcbiAgICB9LCB7XHJcbiAgICAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgIH0pLlxyXG4gICAgdG8oLjIsIHtcclxuICAgICAgc2NhbGU6IDFcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuXHJcbiAgICBjYWxsKCgpID0+IHtcclxuICAgIH0pLnN0YXJ0KClcclxuICB9LFxyXG4gIFxyXG4gIG15VHdlZW41OiBmdW5jdGlvbihub2RlKSB7XHJcbiAgICBjYy50d2Vlbihub2RlKS5cclxuICAgIHRvKC4yLCB7XHJcbiAgICAgIG9wYWNpdHk6IDBcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuXHJcbiAgICB0byguMiwge1xyXG4gICAgICBvcGFjaXR5OiAxMjdcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuXHJcbiAgICBjYWxsKCgpID0+IHtcclxuICAgIH0pLnN0YXJ0KClcclxuICB9XHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/largeBlock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12822Eg2DFIEKtzZYG/yQ1B', 'largeBlock');
// scripts/largeBlock.js

"use strict";

var global = require('global');

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
    this._oldPos = this.node.position;
  },
  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
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

        if (this.hit && this.node.blocktype == 'large') {
          this.node.x = touchLoc.x - this.node.parent.width / 2;
          this.node.y = touchLoc.y - this.node.parent.height / 2;
        }
      }
    }, this); // 触摸事件监听

    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (touch, event) {
      var touchLoc = touch.getLocation();

      if (this.hit && this.node.blocktype == 'large') {
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

      if (this.hit && this.node.blocktype == 'large') {
        this.hit = false; // 记录当前放置的位置

        var currentindex = -1;
        var points = global.outsidepoints; // 没有移动到圆环目标位置区域，移动到初始位置

        if (this.node.x * this.node.x + this.node.y * this.node.y > 1074 * 1074 / 4 || this.node.x * this.node.x + this.node.y * this.node.y < 574 * 574 / 4) {
          if (touch.getLocation().x - this.node.parent.width / 2 < 0) this.easeTo(this._oldPos.x, this._oldPos.y, 337.5, .2);else this.easeTo(this._oldPos.x, this._oldPos.y, -22.5, .2);
        } else {
          // 移动到了圆环目标位置区域
          if (this.node.x > 0 && this.node.y < 0) currentindex = this.node.x < -this.node.y ? 0 : 1;
          if (this.node.x > 0 && this.node.y > 0) currentindex = this.node.x > this.node.y ? 2 : 3;
          if (this.node.x < 0 && this.node.y > 0) currentindex = -this.node.x < this.node.y ? 4 : 5;
          if (this.node.x < 0 && this.node.y < 0) currentindex = -this.node.x > -this.node.y ? 6 : 7; // 标记当前位置是否为空

          var isempty = true; // 在对应圆环已放置的数组中查找

          global.outsideblocks.forEach(function (item) {
            if (item.index == currentindex) isempty = false; // 找到说明当前位置不可用
          }); // 当前位置若为空

          if (isempty && this.node.x != 0 && this.node.y != 0) {
            //计算旋转角度
            global.Lchangeangle += 45 * parseInt(this.game.rotateGridsL.string); //计算块的真正位置

            var n = (currentindex + global.Lchangeposition) % 8;
            if (n < 0) n += 8; // //更改块的父节点
            // this.node.removeFromParent(false);
            // this.game.outside.addChild(this.node);
            // //放置块
            // this.node.x = points[n].x
            // this.node.y = points[n].y
            // this.node.angle = points[n].a
            //放置块的缓动效果

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

              _this.game.outside.addChild(_this.node); //环旋转的缓动效果


              cc.tween(_this.game.outside).to(Math.abs(parseInt(_this.game.rotateGridsL.string)) / 4, {
                angle: global.Lchangeangle
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
              rotateGridsL: this.game.rotateGridsL.string,
              // 块的转动格数
              blockitem: this
            };
            console.log(block); // 保存在圆环对象数组中

            global.outsideblocks.push(block); // 播放音效

            cc.audioEngine.playEffect(this.game.placeAudio, false); // //环旋转的缓动效果
            // cc.tween(this.game.outside).to(Math.abs(parseInt(this.game.rotateGridsL.string)) / 4, {
            //   angle: global.Lchangeangle
            // }, {
            //   easing: 'quadIn'
            // }).call(() => {
            //   this.game.deleteBlock();
            //   // 播放音效
            //   cc.audioEngine.playEffect(this.game.rotateAudio, false);
            // }).start()
            //计算在数组中的位置

            global.Lchangeposition -= parseInt(this.game.rotateGridsL.string); //更新数组中所有块的位置

            global.outsideblocks.forEach(function (item) {
              item.index = (item.index + parseInt(_this.game.rotateGridsL.string)) % 8;
              if (item.index < 0) item.index += 8;
            }); //console.log("global.outsideblocks: ")
            //console.log(global.outsideblocks)
            // 将当前块设置为不可点击

            this.node.blocktype = 'outside'; // 放置次数加1

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbGFyZ2VCbG9jay5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjb2xvciIsImNvbGxpZGVyIiwidHlwZSIsIlBvbHlnb25Db2xsaWRlciIsImJsb2NrdHlwZSIsInN0YXJ0IiwiX29sZFBvcyIsIm5vZGUiLCJwb3NpdGlvbiIsIm9uTG9hZCIsImRpcmVjdG9yIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImVuYWJsZWQiLCJoaXQiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsInRvdWNoIiwiZXZlbnQiLCJ0b3VjaExvYyIsImdldExvY2F0aW9uIiwiSW50ZXJzZWN0aW9uIiwicG9pbnRJblBvbHlnb24iLCJ3b3JsZCIsInBvaW50cyIsImNvbnNvbGUiLCJsb2ciLCJ4IiwicGFyZW50Iiwid2lkdGgiLCJ5IiwiaGVpZ2h0IiwiVE9VQ0hfTU9WRSIsImdldERlbHRhIiwiYW5nbGUiLCJNYXRoIiwiYXRhbiIsIlBJIiwiVE9VQ0hfRU5EIiwiY3VycmVudGluZGV4Iiwib3V0c2lkZXBvaW50cyIsImVhc2VUbyIsImlzZW1wdHkiLCJvdXRzaWRlYmxvY2tzIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsIkxjaGFuZ2VhbmdsZSIsInBhcnNlSW50IiwiZ2FtZSIsInJvdGF0ZUdyaWRzTCIsInN0cmluZyIsIm4iLCJMY2hhbmdlcG9zaXRpb24iLCJ0d2VlbiIsInRvIiwiYSIsImVhc2luZyIsImNhbGwiLCJyZW1vdmVGcm9tUGFyZW50Iiwib3V0c2lkZSIsImFkZENoaWxkIiwiYWJzIiwiZGVsZXRlQmxvY2siLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJyb3RhdGVBdWRpbyIsImJsb2NrIiwiX3ZhbCIsImJsb2NraXRlbSIsInB1c2giLCJwbGFjZUF1ZGlvIiwiY291bnQiLCJzcGF3bkJsb2NrIiwidCIsInYyIiwib25E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LENBQUNtQixJQUFILENBQVFDLFNBQVIsQ0FBa0JpQixVQUFoQztBQUNBLFNBQUsxQixJQUFMLENBQVV3RSxHQUFWLENBQWNuRixFQUFFLENBQUNtQixJQUFILENBQVFDLFNBQVIsQ0FBa0J1QixTQUFoQztBQUNEO0FBck9NLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnbG9iYWwgPSByZXF1aXJlKCdnbG9iYWwnKTtcclxuXHJcbmNjLkNsYXNzKHtcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgY29sb3I6ICcnLFxyXG4gICAgY29sbGlkZXI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuUG9seWdvbkNvbGxpZGVyXHJcbiAgICB9LFxyXG4gICAgYmxvY2t0eXBlOiAnJyxcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLl9vbGRQb3MgPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5oaXQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyDop6bmkbjkuovku7blvIDlp4tcclxuICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xyXG4gICAgICB2YXIgdG91Y2hMb2MgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICBpZiAoY2MuSW50ZXJzZWN0aW9uLnBvaW50SW5Qb2x5Z29uKHRvdWNoTG9jLCB0aGlzLmNvbGxpZGVyLndvcmxkLnBvaW50cykpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vZGUuYmxvY2t0eXBlKTtcclxuICAgICAgICB0aGlzLmhpdCA9IHRydWU7XHJcbiAgICAgICAgLy8g5ZCv55So57yT5Yqo5Yqo55S7XHJcbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5ub2RlKS50byguMTUsIHtcclxuICAgICAgICAvLyAgIHBvc2l0aW9uOiBjYy52Mih0b3VjaExvYy54IC0gdGhpcy5ub2RlLnBhcmVudC53aWR0aCAvIDIsIHRvdWNoTG9jLnkgLSB0aGlzLm5vZGUucGFyZW50LmhlaWdodCAvIDIpXHJcbiAgICAgICAgLy8gfSwge1xyXG4gICAgICAgIC8vICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgICAgIC8vIH0pLnN0YXJ0KClcclxuICAgICAgICBpZiAodGhpcy5oaXQgJiYgdGhpcy5ub2RlLmJsb2NrdHlwZSA9PSAnbGFyZ2UnKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUueCA9IHRvdWNoTG9jLnggLSB0aGlzLm5vZGUucGFyZW50LndpZHRoIC8gMlxyXG4gICAgICAgICAgdGhpcy5ub2RlLnkgPSB0b3VjaExvYy55IC0gdGhpcy5ub2RlLnBhcmVudC5oZWlnaHQgLyAyXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAvLyDop6bmkbjkuovku7bnm5HlkKxcclxuICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCBmdW5jdGlvbiAodG91Y2gsIGV2ZW50KSB7XHJcbiAgICAgIHZhciB0b3VjaExvYyA9IHRvdWNoLmdldExvY2F0aW9uKCk7XHJcbiAgICAgIGlmICh0aGlzLmhpdCAmJiB0aGlzLm5vZGUuYmxvY2t0eXBlID09ICdsYXJnZScpIHtcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB0b3VjaC5nZXREZWx0YSgpLng7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gdG91Y2guZ2V0RGVsdGEoKS55O1xyXG4gICAgICAgIHRvdWNoTG9jLnggPSB0b3VjaExvYy54IC0gdGhpcy5ub2RlLnBhcmVudC53aWR0aCAvIDJcclxuICAgICAgICB0b3VjaExvYy55ID0gdG91Y2hMb2MueSAtIHRoaXMubm9kZS5wYXJlbnQuaGVpZ2h0IC8gMlxyXG4gICAgICAgIGlmICh0b3VjaExvYy54ID4gMCAmJiB0b3VjaExvYy55ID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gTWF0aC5hdGFuKHRvdWNoTG9jLnkgLyB0b3VjaExvYy54KSAvIE1hdGguUEkgKiAxODAgKyA5MCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPCAwICYmIHRvdWNoTG9jLnkgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBNYXRoLmF0YW4oLXRvdWNoTG9jLnggLyB0b3VjaExvYy55KSAvIE1hdGguUEkgKiAxODAgKyAxODAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54IDwgMCAmJiB0b3VjaExvYy55IDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gTWF0aC5hdGFuKC10b3VjaExvYy55IC8gLXRvdWNoTG9jLngpIC8gTWF0aC5QSSAqIDE4MCArIDI3MCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPiAwICYmIHRvdWNoTG9jLnkgPCAwKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBNYXRoLmF0YW4odG91Y2hMb2MueCAvIC10b3VjaExvYy55KSAvIE1hdGguUEkgKiAxODAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54ID09IDAgJiYgdG91Y2hMb2MueSA+IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDE4MCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPT0gMCAmJiB0b3VjaExvYy55IDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gMCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPiAwICYmIHRvdWNoTG9jLnkgPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gOTAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54IDwgMCAmJiB0b3VjaExvYy55ID09IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDI3MCAtIDIyLjVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIC8vIOinpuaRuOS6i+S7tue7k+adn1xyXG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xyXG4gICAgICBpZiAodGhpcy5oaXQgJiYgdGhpcy5ub2RlLmJsb2NrdHlwZSA9PSAnbGFyZ2UnKSB7XHJcbiAgICAgICAgdGhpcy5oaXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8g6K6w5b2V5b2T5YmN5pS+572u55qE5L2N572uXHJcbiAgICAgICAgbGV0IGN1cnJlbnRpbmRleCA9IC0xO1xyXG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGdsb2JhbC5vdXRzaWRlcG9pbnRzXHJcblxyXG4gICAgICAgIC8vIOayoeacieenu+WKqOWIsOWchueOr+ebruagh+S9jee9ruWMuuWfn++8jOenu+WKqOWIsOWIneWni+S9jee9rlxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCAqIHRoaXMubm9kZS54ICsgdGhpcy5ub2RlLnkgKiB0aGlzLm5vZGUueSA+IDEwNzQgKiAxMDc0IC8gNCB8fCB0aGlzLm5vZGUueCAqIHRoaXMubm9kZVxyXG4gICAgICAgICAgLnggKyB0aGlzLm5vZGUueSAqIHRoaXMubm9kZS55IDwgNTc0ICogNTc0IC8gNCkge1xyXG5cclxuICAgICAgICAgIGlmICh0b3VjaC5nZXRMb2NhdGlvbigpLnggLSB0aGlzLm5vZGUucGFyZW50LndpZHRoIC8gMiA8IDApXHJcbiAgICAgICAgICAgIHRoaXMuZWFzZVRvKHRoaXMuX29sZFBvcy54LCB0aGlzLl9vbGRQb3MueSwgMzM3LjUsIC4yKVxyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmVhc2VUbyh0aGlzLl9vbGRQb3MueCwgdGhpcy5fb2xkUG9zLnksIC0yMi41LCAuMilcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIOenu+WKqOWIsOS6huWchueOr+ebruagh+S9jee9ruWMuuWfn1xyXG4gICAgICAgICAgaWYgKHRoaXMubm9kZS54ID4gMCAmJiB0aGlzLm5vZGUueSA8IDApIGN1cnJlbnRpbmRleCA9IHRoaXMubm9kZS54IDwgLXRoaXMubm9kZS55ID8gMCA6IDFcclxuICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA+IDAgJiYgdGhpcy5ub2RlLnkgPiAwKSBjdXJyZW50aW5kZXggPSB0aGlzLm5vZGUueCA+IHRoaXMubm9kZS55ID8gMiA6IDNcclxuICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IDAgJiYgdGhpcy5ub2RlLnkgPiAwKSBjdXJyZW50aW5kZXggPSAtdGhpcy5ub2RlLnggPCB0aGlzLm5vZGUueSA/IDQgOiA1XHJcbiAgICAgICAgICBpZiAodGhpcy5ub2RlLnggPCAwICYmIHRoaXMubm9kZS55IDwgMCkgY3VycmVudGluZGV4ID0gLXRoaXMubm9kZS54ID4gLXRoaXMubm9kZS55ID8gNiA6IDdcclxuXHJcbiAgICAgICAgICAvLyDmoIforrDlvZPliY3kvY3nva7mmK/lkKbkuLrnqbpcclxuICAgICAgICAgIGxldCBpc2VtcHR5ID0gdHJ1ZVxyXG5cclxuICAgICAgICAgIC8vIOWcqOWvueW6lOWchueOr+W3suaUvue9rueahOaVsOe7hOS4reafpeaJvlxyXG4gICAgICAgICAgZ2xvYmFsLm91dHNpZGVibG9ja3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaW5kZXggPT0gY3VycmVudGluZGV4KSBpc2VtcHR5ID0gZmFsc2UgLy8g5om+5Yiw6K+05piO5b2T5YmN5L2N572u5LiN5Y+v55SoXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIC8vIOW9k+WJjeS9jee9ruiLpeS4uuepulxyXG4gICAgICAgICAgaWYgKGlzZW1wdHkgJiYgdGhpcy5ub2RlLnggIT0gMCAmJiB0aGlzLm5vZGUueSAhPSAwKSB7XHJcblxyXG4gICAgICAgICAgICAvL+iuoeeul+aXi+i9rOinkuW6plxyXG4gICAgICAgICAgICBnbG9iYWwuTGNoYW5nZWFuZ2xlICs9IDQ1ICogcGFyc2VJbnQodGhpcy5nYW1lLnJvdGF0ZUdyaWRzTC5zdHJpbmcpXHJcblxyXG4gICAgICAgICAgICAvL+iuoeeul+Wdl+eahOecn+ato+S9jee9rlxyXG4gICAgICAgICAgICBsZXQgbiA9IChjdXJyZW50aW5kZXggKyBnbG9iYWwuTGNoYW5nZXBvc2l0aW9uKSAlIDhcclxuICAgICAgICAgICAgaWYgKG4gPCAwKVxyXG4gICAgICAgICAgICAgIG4gKz0gOFxyXG5cclxuICAgICAgICAgICAgLy8gLy/mm7TmlLnlnZfnmoTniLboioLngrlcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmdhbWUub3V0c2lkZS5hZGRDaGlsZCh0aGlzLm5vZGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gLy/mlL7nva7lnZdcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLnggPSBwb2ludHNbbl0ueFxyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUueSA9IHBvaW50c1tuXS55XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5hbmdsZSA9IHBvaW50c1tuXS5hXHJcblxyXG4gICAgICAgICAgICAvL+aUvue9ruWdl+eahOe8k+WKqOaViOaenFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKC4yLCB7XHJcbiAgICAgICAgICAgICAgeDogcG9pbnRzW2N1cnJlbnRpbmRleF0ueCxcclxuICAgICAgICAgICAgICB5OiBwb2ludHNbY3VycmVudGluZGV4XS55LFxyXG4gICAgICAgICAgICAgIGFuZ2xlOiBwb2ludHNbY3VycmVudGluZGV4XS5hLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgICAgICAgICB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAvL+aUvue9ruWdl1xyXG4gICAgICAgICAgICAgIHRoaXMubm9kZS54ID0gcG9pbnRzW25dLnhcclxuICAgICAgICAgICAgICB0aGlzLm5vZGUueSA9IHBvaW50c1tuXS55XHJcbiAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gcG9pbnRzW25dLmFcclxuXHJcbiAgICAgICAgICAgICAgLy/mm7TmlLnlnZfnmoTniLboioLngrlcclxuICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5nYW1lLm91dHNpZGUuYWRkQ2hpbGQodGhpcy5ub2RlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIC8v546v5peL6L2s55qE57yT5Yqo5pWI5p6cXHJcbiAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5nYW1lLm91dHNpZGUpLnRvKE1hdGguYWJzKHBhcnNlSW50KHRoaXMuZ2FtZS5yb3RhdGVHcmlkc0wuc3RyaW5nKSkgLyA0LCB7XHJcbiAgICAgICAgICAgICAgICBhbmdsZTogZ2xvYmFsLkxjaGFuZ2VhbmdsZVxyXG4gICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgICAgICAgICAgICB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5kZWxldGVCbG9jaygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOaSreaUvumfs+aViFxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmdhbWUucm90YXRlQXVkaW8sIGZhbHNlKTtcclxuICAgICAgICAgICAgICB9KS5zdGFydCgpXHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KClcclxuXHJcbiAgICAgICAgICAgIC8vIOaehOmAoOW9k+WJjeWdl+eahOWvueixoe+8jOeUqOS6juS/neWtmOWcqOWchueOr+WvueixoeaVsOe7hOS4rVxyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSB7XHJcbiAgICAgICAgICAgICAgaW5kZXg6IGN1cnJlbnRpbmRleCwgLy8g5Z2X55qE5L2N572u5bqP5Y+3XHJcbiAgICAgICAgICAgICAgY29sb3I6IHRoaXMubm9kZS5jb2xvci5fdmFsLCAvLyDlnZfnmoTpopzoibJcclxuICAgICAgICAgICAgICByb3RhdGVHcmlkc0w6IHRoaXMuZ2FtZS5yb3RhdGVHcmlkc0wuc3RyaW5nLCAvLyDlnZfnmoTovazliqjmoLzmlbBcclxuICAgICAgICAgICAgICBibG9ja2l0ZW06IHRoaXNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coYmxvY2spXHJcbiAgICAgICAgICAgIC8vIOS/neWtmOWcqOWchueOr+WvueixoeaVsOe7hOS4rVxyXG4gICAgICAgICAgICBnbG9iYWwub3V0c2lkZWJsb2Nrcy5wdXNoKGJsb2NrKVxyXG5cclxuICAgICAgICAgICAgLy8g5pKt5pS+6Z+z5pWIXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5nYW1lLnBsYWNlQXVkaW8sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIC8v546v5peL6L2s55qE57yT5Yqo5pWI5p6cXHJcbiAgICAgICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMuZ2FtZS5vdXRzaWRlKS50byhNYXRoLmFicyhwYXJzZUludCh0aGlzLmdhbWUucm90YXRlR3JpZHNMLnN0cmluZykpIC8gNCwge1xyXG4gICAgICAgICAgICAvLyAgIGFuZ2xlOiBnbG9iYWwuTGNoYW5nZWFuZ2xlXHJcbiAgICAgICAgICAgIC8vIH0sIHtcclxuICAgICAgICAgICAgLy8gICBlYXNpbmc6ICdxdWFkSW4nXHJcbiAgICAgICAgICAgIC8vIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuZ2FtZS5kZWxldGVCbG9jaygpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAvLyDmkq3mlL7pn7PmlYhcclxuICAgICAgICAgICAgLy8gICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuZ2FtZS5yb3RhdGVBdWRpbywgZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyB9KS5zdGFydCgpXHJcblxyXG4gICAgICAgICAgICAvL+iuoeeul+WcqOaVsOe7hOS4reeahOS9jee9rlxyXG4gICAgICAgICAgICBnbG9iYWwuTGNoYW5nZXBvc2l0aW9uIC09IHBhcnNlSW50KHRoaXMuZ2FtZS5yb3RhdGVHcmlkc0wuc3RyaW5nKVxyXG5cclxuICAgICAgICAgICAgLy/mm7TmlrDmlbDnu4TkuK3miYDmnInlnZfnmoTkvY3nva5cclxuICAgICAgICAgICAgZ2xvYmFsLm91dHNpZGVibG9ja3MuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICBpdGVtLmluZGV4ID0gKGl0ZW0uaW5kZXggKyBwYXJzZUludCh0aGlzLmdhbWUucm90YXRlR3JpZHNMLnN0cmluZykpICUgODtcclxuICAgICAgICAgICAgICBpZiAoaXRlbS5pbmRleCA8IDApXHJcbiAgICAgICAgICAgICAgICBpdGVtLmluZGV4ICs9IDhcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnbG9iYWwub3V0c2lkZWJsb2NrczogXCIpXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZ2xvYmFsLm91dHNpZGVibG9ja3MpXHJcblxyXG4gICAgICAgICAgICAvLyDlsIblvZPliY3lnZforr7nva7kuLrkuI3lj6/ngrnlh7tcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmJsb2NrdHlwZSA9ICdvdXRzaWRlJ1xyXG5cclxuICAgICAgICAgICAgLy8g5pS+572u5qyh5pWw5YqgMVxyXG4gICAgICAgICAgICBnbG9iYWwuY291bnQrK1xyXG5cclxuICAgICAgICAgICAgLy8g5aaC5p6c5LiJ5Liq5Z2X5Z2H5bey5pS+572u5a6M5q+V77yM5YiZ6YeN5paw55Sf5oiQ5LiJ5Liq5Z2XXHJcbiAgICAgICAgICAgIGlmIChnbG9iYWwuY291bnQgIT0gMCAmJiBnbG9iYWwuY291bnQgJSAzID09IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLmdhbWUuc3Bhd25CbG9jaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDlvZPliY3kvY3nva7oi6XkuI3kuLrnqbrvvIznp7vliqjliLDliJ3lp4vkvY3nva5cclxuICAgICAgICAgICAgaWYgKHRvdWNoLmdldExvY2F0aW9uKCkueCAtIHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyIDwgMClcclxuICAgICAgICAgICAgICB0aGlzLmVhc2VUbyh0aGlzLl9vbGRQb3MueCwgdGhpcy5fb2xkUG9zLnksIDMzNy41LCAuMilcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIHRoaXMuZWFzZVRvKHRoaXMuX29sZFBvcy54LCB0aGlzLl9vbGRQb3MueSwgLTIyLjUsIC4yKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgLy8g57yT5Yqo5Ye95pWwXHJcbiAgZWFzZVRvOiBmdW5jdGlvbiAoeCwgeSwgYSwgdCkge1xyXG4gICAgY2MudHdlZW4odGhpcy5ub2RlKS50byh0LCB7XHJcbiAgICAgIHBvc2l0aW9uOiBjYy52Mih4LCB5KSxcclxuICAgICAgYW5nbGU6IGFcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuc3RhcnQoKVxyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZSgpIHtcclxuICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IGZhbHNlO1xyXG4gICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCk7XHJcbiAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUpO1xyXG4gICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xyXG4gIH0sXHJcblxyXG5cclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/global.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '553cdnosyJFc7cf1iknMyNV', 'global');
// scripts/global.js

"use strict";

module.exports = {
  count: 0,
  score: 0,
  highscore: 0,
  // 用于记录圆环中全部块的位置
  outsidepoints: [],
  besidepoints: [],
  insidepoints: [],
  // 用于记录圆环中已经存在的块的位置
  outsideblocks: [],
  besideblocks: [],
  insideblocks: [],
  Lchangeposition: 0,
  Lchangeangle: 0,
  Mchangeposition: 0,
  Mchangeangle: 0,
  Schangeposition: 0,
  Schangeangle: 0
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjb3VudCIsInNjb3JlIiwiaGlnaHNjb3JlIiwib3V0c2lkZXBvaW50cyIsImJlc2lkZXBvaW50cyIsImluc2lkZXBvaW50cyIsIm91dHNpZGVibG9ja3MiLCJiZXNpZGVibG9ja3MiLCJpbnNpZGVibG9ja3MiLCJMY2hhbmdlcG9zaXRpb24iLCJMY2hhbmdlYW5nbGUiLCJNY2hhbmdlcG9zaXRpb24iLCJNY2hhbmdlYW5nbGUiLCJTY2hhbmdlcG9zaXRpb24iLCJTY2hhbmdlYW5nbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNmQyxFQUFBQSxLQUFLLEVBQUUsQ0FEUTtBQUVmQyxFQUFBQSxLQUFLLEVBQUUsQ0FGUTtBQUdmQyxFQUFBQSxTQUFTLEVBQUUsQ0FISTtBQUtmO0FBQ0FDLEVBQUFBLGFBQWEsRUFBRSxFQU5BO0FBT2ZDLEVBQUFBLFlBQVksRUFBRSxFQVBDO0FBUWZDLEVBQUFBLFlBQVksRUFBRSxFQVJDO0FBVWY7QUFDQUMsRUFBQUEsYUFBYSxFQUFFLEVBWEE7QUFZZkMsRUFBQUEsWUFBWSxFQUFFLEVBWkM7QUFhZkMsRUFBQUEsWUFBWSxFQUFFLEVBYkM7QUFlZkMsRUFBQUEsZUFBZSxFQUFFLENBZkY7QUFnQmZDLEVBQUFBLFlBQVksRUFBRSxDQWhCQztBQWtCZkMsRUFBQUEsZUFBZSxFQUFFLENBbEJGO0FBbUJmQyxFQUFBQSxZQUFZLEVBQUUsQ0FuQkM7QUFxQmZDLEVBQUFBLGVBQWUsRUFBRSxDQXJCRjtBQXNCZkMsRUFBQUEsWUFBWSxFQUFFO0FBdEJDLENBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBjb3VudDogMCxcclxuICBzY29yZTogMCxcclxuICBoaWdoc2NvcmU6IDAsXHJcblxyXG4gIC8vIOeUqOS6juiusOW9leWchueOr+S4reWFqOmDqOWdl+eahOS9jee9rlxyXG4gIG91dHNpZGVwb2ludHM6IFtdLFxyXG4gIGJlc2lkZXBvaW50czogW10sXHJcbiAgaW5zaWRlcG9pbnRzOiBbXSxcclxuXHJcbiAgLy8g55So5LqO6K6w5b2V5ZyG546v5Lit5bey57uP5a2Y5Zyo55qE5Z2X55qE5L2N572uXHJcbiAgb3V0c2lkZWJsb2NrczogW10sXHJcbiAgYmVzaWRlYmxvY2tzOiBbXSxcclxuICBpbnNpZGVibG9ja3M6IFtdLFxyXG5cclxuICBMY2hhbmdlcG9zaXRpb246IDAsXHJcbiAgTGNoYW5nZWFuZ2xlOiAwLFxyXG5cclxuICBNY2hhbmdlcG9zaXRpb246IDAsXHJcbiAgTWNoYW5nZWFuZ2xlOiAwLFxyXG5cclxuICBTY2hhbmdlcG9zaXRpb246IDAsXHJcbiAgU2NoYW5nZWFuZ2xlOiAwLFxyXG5cclxufTtcclxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/middleBlock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a53709PMr5OnZS+CYNpn/Ws', 'middleBlock');
// scripts/middleBlock.js

"use strict";

var global = require('global');

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
    cc.director.getCollisionManager().enabled = true;
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

        if (this.hit && this.node.blocktype == 'middle') {
          this.node.x = touchLoc.x - this.node.parent.width / 2;
          this.node.y = touchLoc.y - this.node.parent.height / 2;
        }
      }
    }, this); // 触摸事件监听

    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (touch, event) {
      var touchLoc = touch.getLocation();

      if (this.hit && this.node.blocktype == 'middle') {
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

      if (this.hit && this.node.blocktype == 'middle') {
        this.hit = false; // 记录当前放置的位置

        var currentindex = -1;
        var points = global.besidepoints; // 没有移动到圆环目标位置区域，移动到初始位置

        if (this.node.x * this.node.x + this.node.y * this.node.y > 774 * 774 / 4 || this.node.x * this.node.x + this.node.y * this.node.y < 274 * 274 / 4) {
          if (touch.getLocation().x - this.node.parent.width / 2 < 0) this.easeTo(this._oldPos.x, this._oldPos.y, 337.5, .2);else this.easeTo(this._oldPos.x, this._oldPos.y, -22.5, .2);
        } else {
          // 移动到了圆环目标位置区域
          if (this.node.x > 0 && this.node.y < 0) currentindex = this.node.x < -this.node.y ? 0 : 1;
          if (this.node.x > 0 && this.node.y > 0) currentindex = this.node.x > this.node.y ? 2 : 3;
          if (this.node.x < 0 && this.node.y > 0) currentindex = -this.node.x < this.node.y ? 4 : 5;
          if (this.node.x < 0 && this.node.y < 0) currentindex = -this.node.x > -this.node.y ? 6 : 7; // 标记当前位置是否为空

          var isempty = true; // 在对应圆环已放置的数组中查找

          global.besideblocks.forEach(function (item) {
            if (item.index == currentindex) isempty = false; // 找到说明当前位置不可用
          }); // 当前位置若为空

          if (isempty && this.node.x != 0 && this.node.y != 0) {
            //计算旋转角度
            global.Mchangeangle += 45 * parseInt(this.game.rotateGridsM.string); //计算块的真正位置

            var n = (currentindex + global.Mchangeposition) % 8;
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

              _this.game.beside.addChild(_this.node); //环旋转的缓动效果


              cc.tween(_this.game.beside).to(Math.abs(parseInt(_this.game.rotateGridsM.string)) / 4, {
                angle: global.Mchangeangle
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
              rotateGridsM: this.game.rotateGridsM.string,
              // 块的转动格数
              blockitem: this
            }; // 保存在圆环对象数组中

            global.besideblocks.push(block); // 播放音效

            cc.audioEngine.playEffect(this.game.placeAudio, false); //计算在数组中的位置

            global.Mchangeposition -= parseInt(this.game.rotateGridsM.string); //更新数组中所有块的位置

            global.besideblocks.forEach(function (item) {
              item.index = (item.index + parseInt(_this.game.rotateGridsM.string)) % 8;
              if (item.index < 0) item.index += 8;
            }); //console.log("global.besideblocks: ")
            //console.log(global.besideblocks)
            // 将当前块设置为不可点击

            this.node.blocktype = 'beside'; // 放置次数加1

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWlkZGxlQmxvY2suanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY29sb3IiLCJjb2xsaWRlciIsInR5cGUiLCJQb2x5Z29uQ29sbGlkZXIiLCJibG9ja3R5cGUiLCJzdGFydCIsIl9vbGRQb3MiLCJub2RlIiwicG9zaXRpb24iLCJvbkxvYWQiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwiaGl0Iiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJ0b3VjaCIsImV2ZW50IiwidG91Y2hMb2MiLCJnZXRMb2NhdGlvbiIsIkludGVyc2VjdGlvbiIsInBvaW50SW5Qb2x5Z29uIiwid29ybGQiLCJwb2ludHMiLCJjb25zb2xlIiwibG9nIiwieCIsInBhcmVudCIsIndpZHRoIiwieSIsImhlaWdodCIsIlRPVUNIX01PVkUiLCJnZXREZWx0YSIsImFuZ2xlIiwiTWF0aCIsImF0YW4iLCJQSSIsIlRPVUNIX0VORCIsImN1cnJlbnRpbmRleCIsImJlc2lkZXBvaW50cyIsImVhc2VUbyIsImlzZW1wdHkiLCJiZXNpZGVibG9ja3MiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiTWNoYW5nZWFuZ2xlIiwicGFyc2VJbnQiLCJnYW1lIiwicm90YXRlR3JpZHNNIiwic3RyaW5nIiwibiIsIk1jaGFuZ2Vwb3NpdGlvbiIsInR3ZWVuIiwidG8iLCJhIiwiZWFzaW5nIiwiY2FsbCIsInJlbW92ZUZyb21QYXJlbnQiLCJiZXNpZGUiLCJhZGRDaGlsZCIsImFicyIsImRlbGV0ZUJsb2NrIiwiYXVkaW9FbmdpbmUiLCJwbGF5RWZmZWN0Iiwicm90YXRlQXVkaW8iLCJibG9jayIsIl92YWwiLCJibG9ja2l0ZW0iLCJwdXNoIiwicGxhY2VBdWRpbyIsImNvdW50Iiwic3Bhd25CbG9jayIsInQiLCJ2MiIsIm9uRGlz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O0FBL01NLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnbG9iYWwgPSByZXF1aXJlKCdnbG9iYWwnKTtcclxuXHJcbmNjLkNsYXNzKHtcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgY29sb3I6ICcnLFxyXG4gICAgY29sbGlkZXI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuUG9seWdvbkNvbGxpZGVyXHJcbiAgICB9LFxyXG4gICAgYmxvY2t0eXBlOiAnJ1xyXG4gIH0sXHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5fb2xkUG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5fb2xkUG9zKVxyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaGl0ID0gZmFsc2U7XHJcblxyXG4gICAgLy8g6Kem5pG45LqL5Lu25byA5aeLXHJcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcclxuICAgICAgdmFyIHRvdWNoTG9jID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcclxuICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5wb2ludEluUG9seWdvbih0b3VjaExvYywgdGhpcy5jb2xsaWRlci53b3JsZC5wb2ludHMpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub2RlLmJsb2NrdHlwZSk7XHJcbiAgICAgICAgdGhpcy5oaXQgPSB0cnVlO1xyXG4gICAgICAgIC8vIOWQr+eUqOe8k+WKqOWKqOeUu1xyXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oLjE1LCB7XHJcbiAgICAgICAgLy8gICBwb3NpdGlvbjogY2MudjIodG91Y2hMb2MueCAtIHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyLCB0b3VjaExvYy55IC0gdGhpcy5ub2RlLnBhcmVudC5oZWlnaHQgLyAyKVxyXG4gICAgICAgIC8vIH0sIHtcclxuICAgICAgICAvLyAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgICAgICAvLyB9KS5zdGFydCgpXHJcbiAgICAgICAgaWYgKHRoaXMuaGl0ICYmIHRoaXMubm9kZS5ibG9ja3R5cGUgPT0gJ21pZGRsZScpIHtcclxuICAgICAgICAgIHRoaXMubm9kZS54ID0gdG91Y2hMb2MueCAtIHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyXHJcbiAgICAgICAgICB0aGlzLm5vZGUueSA9IHRvdWNoTG9jLnkgLSB0aGlzLm5vZGUucGFyZW50LmhlaWdodCAvIDJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIC8vIOinpuaRuOS6i+S7tuebkeWQrFxyXG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcclxuICAgICAgdmFyIHRvdWNoTG9jID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcclxuICAgICAgaWYgKHRoaXMuaGl0ICYmIHRoaXMubm9kZS5ibG9ja3R5cGUgPT0gJ21pZGRsZScpIHtcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB0b3VjaC5nZXREZWx0YSgpLng7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gdG91Y2guZ2V0RGVsdGEoKS55O1xyXG4gICAgICAgIHRvdWNoTG9jLnggPSB0b3VjaExvYy54IC0gdGhpcy5ub2RlLnBhcmVudC53aWR0aCAvIDJcclxuICAgICAgICB0b3VjaExvYy55ID0gdG91Y2hMb2MueSAtIHRoaXMubm9kZS5wYXJlbnQuaGVpZ2h0IC8gMlxyXG4gICAgICAgIGlmICh0b3VjaExvYy54ID4gMCAmJiB0b3VjaExvYy55ID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gTWF0aC5hdGFuKHRvdWNoTG9jLnkgLyB0b3VjaExvYy54KSAvIE1hdGguUEkgKiAxODAgKyA5MCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPCAwICYmIHRvdWNoTG9jLnkgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBNYXRoLmF0YW4oLXRvdWNoTG9jLnggLyB0b3VjaExvYy55KSAvIE1hdGguUEkgKiAxODAgKyAxODAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54IDwgMCAmJiB0b3VjaExvYy55IDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gTWF0aC5hdGFuKC10b3VjaExvYy55IC8gLXRvdWNoTG9jLngpIC8gTWF0aC5QSSAqIDE4MCArIDI3MCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPiAwICYmIHRvdWNoTG9jLnkgPCAwKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBNYXRoLmF0YW4odG91Y2hMb2MueCAvIC10b3VjaExvYy55KSAvIE1hdGguUEkgKiAxODAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54ID09IDAgJiYgdG91Y2hMb2MueSA+IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDE4MCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPT0gMCAmJiB0b3VjaExvYy55IDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gMCAtIDIyLjVcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoTG9jLnggPiAwICYmIHRvdWNoTG9jLnkgPT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gOTAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54IDwgMCAmJiB0b3VjaExvYy55ID09IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDI3MCAtIDIyLjVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIC8vIOinpuaRuOS6i+S7tue7k+adn1xyXG4gICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xyXG4gICAgICBpZiAodGhpcy5oaXQgJiYgdGhpcy5ub2RlLmJsb2NrdHlwZSA9PSAnbWlkZGxlJykge1xyXG4gICAgICAgIHRoaXMuaGl0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIOiusOW9leW9k+WJjeaUvue9rueahOS9jee9rlxyXG4gICAgICAgIGxldCBjdXJyZW50aW5kZXggPSAtMTtcclxuICAgICAgICBjb25zdCBwb2ludHMgPSBnbG9iYWwuYmVzaWRlcG9pbnRzXHJcblxyXG4gICAgICAgIC8vIOayoeacieenu+WKqOWIsOWchueOr+ebruagh+S9jee9ruWMuuWfn++8jOenu+WKqOWIsOWIneWni+S9jee9rlxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCAqIHRoaXMubm9kZS54ICsgdGhpcy5ub2RlLnkgKiB0aGlzLm5vZGUueSA+IDc3NCAqIDc3NCAvIDQgfHwgdGhpcy5ub2RlLnggKiB0aGlzLm5vZGUueCArXHJcbiAgICAgICAgICB0aGlzLm5vZGUueSAqIHRoaXMubm9kZS55IDwgMjc0ICogMjc0IC8gNCkge1xyXG5cclxuICAgICAgICAgIGlmICh0b3VjaC5nZXRMb2NhdGlvbigpLnggLSB0aGlzLm5vZGUucGFyZW50LndpZHRoIC8gMiA8IDApXHJcbiAgICAgICAgICAgIHRoaXMuZWFzZVRvKHRoaXMuX29sZFBvcy54LCB0aGlzLl9vbGRQb3MueSwgMzM3LjUsIC4yKVxyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmVhc2VUbyh0aGlzLl9vbGRQb3MueCwgdGhpcy5fb2xkUG9zLnksIC0yMi41LCAuMilcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIOenu+WKqOWIsOS6huWchueOr+ebruagh+S9jee9ruWMuuWfn1xyXG4gICAgICAgICAgaWYgKHRoaXMubm9kZS54ID4gMCAmJiB0aGlzLm5vZGUueSA8IDApIGN1cnJlbnRpbmRleCA9IHRoaXMubm9kZS54IDwgLXRoaXMubm9kZS55ID8gMCA6IDFcclxuICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA+IDAgJiYgdGhpcy5ub2RlLnkgPiAwKSBjdXJyZW50aW5kZXggPSB0aGlzLm5vZGUueCA+IHRoaXMubm9kZS55ID8gMiA6IDNcclxuICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IDAgJiYgdGhpcy5ub2RlLnkgPiAwKSBjdXJyZW50aW5kZXggPSAtdGhpcy5ub2RlLnggPCB0aGlzLm5vZGUueSA/IDQgOiA1XHJcbiAgICAgICAgICBpZiAodGhpcy5ub2RlLnggPCAwICYmIHRoaXMubm9kZS55IDwgMCkgY3VycmVudGluZGV4ID0gLXRoaXMubm9kZS54ID4gLXRoaXMubm9kZS55ID8gNiA6IDdcclxuXHJcbiAgICAgICAgICAvLyDmoIforrDlvZPliY3kvY3nva7mmK/lkKbkuLrnqbpcclxuICAgICAgICAgIGxldCBpc2VtcHR5ID0gdHJ1ZVxyXG5cclxuICAgICAgICAgIC8vIOWcqOWvueW6lOWchueOr+W3suaUvue9rueahOaVsOe7hOS4reafpeaJvlxyXG4gICAgICAgICAgZ2xvYmFsLmJlc2lkZWJsb2Nrcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5pbmRleCA9PSBjdXJyZW50aW5kZXgpIGlzZW1wdHkgPSBmYWxzZSAvLyDmib7liLDor7TmmI7lvZPliY3kvY3nva7kuI3lj6/nlKhcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgLy8g5b2T5YmN5L2N572u6Iul5Li656m6XHJcbiAgICAgICAgICBpZiAoaXNlbXB0eSAmJiB0aGlzLm5vZGUueCAhPSAwICYmIHRoaXMubm9kZS55ICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8v6K6h566X5peL6L2s6KeS5bqmXHJcbiAgICAgICAgICAgIGdsb2JhbC5NY2hhbmdlYW5nbGUgKz0gNDUgKiBwYXJzZUludCh0aGlzLmdhbWUucm90YXRlR3JpZHNNLnN0cmluZylcclxuXHJcbiAgICAgICAgICAgIC8v6K6h566X5Z2X55qE55yf5q2j5L2N572uXHJcbiAgICAgICAgICAgIGxldCBuID0gKGN1cnJlbnRpbmRleCArIGdsb2JhbC5NY2hhbmdlcG9zaXRpb24pICUgOFxyXG4gICAgICAgICAgICBpZiAobiA8IDApXHJcbiAgICAgICAgICAgICAgbiArPSA4XHJcblxyXG4gICAgICAgICAgICAvL+aUvue9ruWdl+eahOe8k+WKqOaViOaenFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKC4yLCB7XHJcbiAgICAgICAgICAgICAgeDogcG9pbnRzW2N1cnJlbnRpbmRleF0ueCxcclxuICAgICAgICAgICAgICB5OiBwb2ludHNbY3VycmVudGluZGV4XS55LFxyXG4gICAgICAgICAgICAgIGFuZ2xlOiBwb2ludHNbY3VycmVudGluZGV4XS5hLFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgICAgICAgICB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAvL+aUvue9ruWdl1xyXG4gICAgICAgICAgICAgIHRoaXMubm9kZS54ID0gcG9pbnRzW25dLnhcclxuICAgICAgICAgICAgICB0aGlzLm5vZGUueSA9IHBvaW50c1tuXS55XHJcbiAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gcG9pbnRzW25dLmFcclxuXHJcbiAgICAgICAgICAgICAgLy/mm7TmlLnlnZfnmoTniLboioLngrlcclxuICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5nYW1lLmJlc2lkZS5hZGRDaGlsZCh0aGlzLm5vZGUpO1xyXG5cclxuICAgICAgICAgICAgICAvL+eOr+aXi+i9rOeahOe8k+WKqOaViOaenFxyXG4gICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuZ2FtZS5iZXNpZGUpLnRvKE1hdGguYWJzKHBhcnNlSW50KHRoaXMuZ2FtZS5yb3RhdGVHcmlkc00uc3RyaW5nKSkgLyA0LCB7XHJcbiAgICAgICAgICAgICAgICBhbmdsZTogZ2xvYmFsLk1jaGFuZ2VhbmdsZVxyXG4gICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgICAgICAgICAgICB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5kZWxldGVCbG9jaygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOaSreaUvumfs+aViFxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmdhbWUucm90YXRlQXVkaW8sIGZhbHNlKTtcclxuICAgICAgICAgICAgICB9KS5zdGFydCgpXHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KClcclxuXHJcbiAgICAgICAgICAgIC8vIOaehOmAoOW9k+WJjeWdl+eahOWvueixoe+8jOeUqOS6juS/neWtmOWcqOWchueOr+WvueixoeaVsOe7hOS4rVxyXG4gICAgICAgICAgICBsZXQgYmxvY2sgPSB7XHJcbiAgICAgICAgICAgICAgaW5kZXg6IGN1cnJlbnRpbmRleCwgLy8g5Z2X55qE5L2N572u5bqP5Y+3XHJcbiAgICAgICAgICAgICAgY29sb3I6IHRoaXMubm9kZS5jb2xvci5fdmFsLCAvLyDlnZfnmoTpopzoibJcclxuICAgICAgICAgICAgICByb3RhdGVHcmlkc006IHRoaXMuZ2FtZS5yb3RhdGVHcmlkc00uc3RyaW5nLCAvLyDlnZfnmoTovazliqjmoLzmlbBcclxuICAgICAgICAgICAgICBibG9ja2l0ZW06IHRoaXNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5L+d5a2Y5Zyo5ZyG546v5a+56LGh5pWw57uE5LitXHJcbiAgICAgICAgICAgIGdsb2JhbC5iZXNpZGVibG9ja3MucHVzaChibG9jaylcclxuXHJcbiAgICAgICAgICAgIC8vIOaSreaUvumfs+aViFxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuZ2FtZS5wbGFjZUF1ZGlvLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvL+iuoeeul+WcqOaVsOe7hOS4reeahOS9jee9rlxyXG4gICAgICAgICAgICBnbG9iYWwuTWNoYW5nZXBvc2l0aW9uIC09IHBhcnNlSW50KHRoaXMuZ2FtZS5yb3RhdGVHcmlkc00uc3RyaW5nKVxyXG5cclxuICAgICAgICAgICAgLy/mm7TmlrDmlbDnu4TkuK3miYDmnInlnZfnmoTkvY3nva5cclxuICAgICAgICAgICAgZ2xvYmFsLmJlc2lkZWJsb2Nrcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgIGl0ZW0uaW5kZXggPSAoaXRlbS5pbmRleCArIHBhcnNlSW50KHRoaXMuZ2FtZS5yb3RhdGVHcmlkc00uc3RyaW5nKSkgJSA4XHJcbiAgICAgICAgICAgICAgaWYgKGl0ZW0uaW5kZXggPCAwKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5pbmRleCArPSA4XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2xvYmFsLmJlc2lkZWJsb2NrczogXCIpXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZ2xvYmFsLmJlc2lkZWJsb2NrcylcclxuXHJcbiAgICAgICAgICAgIC8vIOWwhuW9k+WJjeWdl+iuvue9ruS4uuS4jeWPr+eCueWHu1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYmxvY2t0eXBlID0gJ2Jlc2lkZSdcclxuXHJcbiAgICAgICAgICAgIC8vIOaUvue9ruasoeaVsOWKoDFcclxuICAgICAgICAgICAgZ2xvYmFsLmNvdW50KytcclxuXHJcbiAgICAgICAgICAgIC8vIOWmguaenOS4ieS4quWdl+Wdh+W3suaUvue9ruWujOavle+8jOWImemHjeaWsOeUn+aIkOS4ieS4quWdl1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsLmNvdW50ICE9IDAgJiYgZ2xvYmFsLmNvdW50ICUgMyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5nYW1lLnNwYXduQmxvY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5b2T5YmN5L2N572u6Iul5LiN5Li656m677yM56e75Yqo5Yiw5Yid5aeL5L2N572uXHJcbiAgICAgICAgICAgIGlmICh0b3VjaC5nZXRMb2NhdGlvbigpLnggLSB0aGlzLm5vZGUucGFyZW50LndpZHRoIC8gMiA8IDApXHJcbiAgICAgICAgICAgICAgdGhpcy5lYXNlVG8odGhpcy5fb2xkUG9zLngsIHRoaXMuX29sZFBvcy55LCAzMzcuNSwgLjIpXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICB0aGlzLmVhc2VUbyh0aGlzLl9vbGRQb3MueCwgdGhpcy5fb2xkUG9zLnksIC0yMi41LCAuMilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIC8vIOe8k+WKqOWHveaVsFxyXG4gIGVhc2VUbzogZnVuY3Rpb24gKHgsIHksIGEsIHQpIHtcclxuICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8odCwge1xyXG4gICAgICBwb3NpdGlvbjogY2MudjIoeCwgeSksXHJcbiAgICAgIGFuZ2xlOiBhXHJcbiAgICB9LCB7XHJcbiAgICAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgIH0pLnN0YXJ0KClcclxuICB9LFxyXG5cclxuXHJcbiAgb25EaXNhYmxlKCkge1xyXG4gICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gZmFsc2U7XHJcbiAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUKTtcclxuICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSk7XHJcbiAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XHJcbiAgfSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/smallBlock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc21hbGxCbG9jay5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJyZXF1aXJlIiwiY2hhbmdlcG9zaXRpb24iLCJjaGFuZ2VhbmdsZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY29sb3IiLCJjb2xsaWRlciIsInR5cGUiLCJQb2x5Z29uQ29sbGlkZXIiLCJibG9ja3R5cGUiLCJzdGFydCIsIl9vbGRQb3MiLCJub2RlIiwicG9zaXRpb24iLCJvbkxvYWQiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwiaGl0Iiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJ0b3VjaCIsImV2ZW50IiwidG91Y2hMb2MiLCJnZXRMb2NhdGlvbiIsIkludGVyc2VjdGlvbiIsInBvaW50SW5Qb2x5Z29uIiwid29ybGQiLCJwb2ludHMiLCJjb25zb2xlIiwibG9nIiwieCIsInBhcmVudCIsIndpZHRoIiwieSIsImhlaWdodCIsIlRPVUNIX01PVkUiLCJnZXREZWx0YSIsImFuZ2xlIiwiTWF0aCIsImF0YW4iLCJQSSIsIlRPVUNIX0VORCIsImN1cnJlbnRpbmRleCIsImluc2lkZXBvaW50cyIsImVhc2VUbyIsImlzZW1wdHkiLCJpbnNpZGVibG9ja3MiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiU2NoYW5nZWFuZ2xlIiwicGFyc2VJbnQiLCJnYW1lIiwicm90YXRlR3JpZHNTIiwic3RyaW5nIiwibiIsIlNjaGFuZ2Vwb3NpdGlvbiIsInR3ZWVuIiwidG8iLCJhIiwiZWFzaW5nIiwiY2FsbCIsInJlbW92ZUZyb21QYXJlbnQiLCJpbnNpZGUiLCJhZGRDaGlsZCIsImFicyIsImRlbGV0ZUJsb2NrIiwiYXVkaW9FbmdpbmUiLCJwbGF5RWZmZWN0Iiwicm90YXRlQXVkaW8iLCJibG9jayIsIl92YWwiLCJibG9ja2l0ZW0iLCJwdXNoIiwicGxhY2VBdWRpbyIsImNvdW50Iiwic3Bhd25CbG9jayIsInQiLCJ2MiIsIm9uRGlzYWJsZSIsImVuYWJsZWREZWJ1Z0RyYXciLCJvZmYiLCJvbkRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFwQjs7QUFFQSxJQUFJQyxjQUFjLEdBQUcsQ0FBckIsRUFBdUI7O0FBQ3ZCLElBQUlDLFdBQVcsR0FBRyxDQUFsQixFQUFvQjs7QUFFcEJDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBRVBDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxLQUFLLEVBQUUsRUFERztBQUVWQyxJQUFBQSxRQUFRLEVBQUU7QUFDUixpQkFBUyxJQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTztBQUZELEtBRkE7QUFNVkMsSUFBQUEsU0FBUyxFQUFFO0FBTkQsR0FGTDtBQVdQQyxFQUFBQSxLQVhPLG1CQVdDO0FBQ04sU0FBS0MsT0FBTCxHQUFlLEtBQUtDLElBQUwsQ0FBVUMsUUFBekIsQ0FETSxDQUVOO0FBQ0QsR0FkTTtBQWdCUEMsRUFBQUEsTUFoQk8sb0JBZ0JFO0FBQ1BiLElBQUFBLEVBQUUsQ0FBQ2MsUUFBSCxDQUFZQyxtQkFBWixHQUFrQ0MsT0FBbEMsR0FBNEMsSUFBNUMsQ0FETyxDQUVQOztBQUNBLFNBQUtDLEdBQUwsR0FBVyxLQUFYLENBSE8sQ0FLUDs7QUFDQSxTQUFLTixJQUFMLENBQVVPLEVBQVYsQ0FBYWxCLEVBQUUsQ0FBQ21CLElBQUgsQ0FBUUMsU0FBUixDQUFrQkMsV0FBL0IsRUFBNEMsVUFBVUMsS0FBVixFQUFpQkMsS0FBakIsRUFBd0I7QUFDbEUsVUFBSUMsUUFBUSxHQUFHRixLQUFLLENBQUNHLFdBQU4sRUFBZjs7QUFDQSxVQUFJekIsRUFBRSxDQUFDMEIsWUFBSCxDQUFnQkMsY0FBaEIsQ0FBK0JILFFBQS9CLEVBQXlDLEtBQUtuQixRQUFMLENBQWN1QixLQUFk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TU8sdUJBOE1LO0FBQ1Z0RixJQUFBQSxjQUFjLEdBQUcsQ0FBakI7QUFDQUMsSUFBQUEsV0FBVyxHQUFHLENBQWQ7QUFDRDtBQWpOTSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnZ2xvYmFsJyk7XHJcblxyXG5sZXQgY2hhbmdlcG9zaXRpb24gPSAwIC8v55So5LqO6K6h566X5Zyo5pWw57uE5Lit55qE5L2N572uXHJcbmxldCBjaGFuZ2VhbmdsZSA9IDAgLy/nlKjkuo7orqHnrpfop5LluqZcclxuXHJcbmNjLkNsYXNzKHtcclxuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgcHJvcGVydGllczoge1xyXG4gICAgY29sb3I6ICcnLFxyXG4gICAgY29sbGlkZXI6IHtcclxuICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgdHlwZTogY2MuUG9seWdvbkNvbGxpZGVyXHJcbiAgICB9LFxyXG4gICAgYmxvY2t0eXBlOiAnJ1xyXG4gIH0sXHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5fb2xkUG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5fb2xkUG9zKVxyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcclxuICAgIHRoaXMuaGl0ID0gZmFsc2U7XHJcblxyXG4gICAgLy8g6Kem5pG45LqL5Lu25byA5aeLXHJcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcclxuICAgICAgdmFyIHRvdWNoTG9jID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcclxuICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5wb2ludEluUG9seWdvbih0b3VjaExvYywgdGhpcy5jb2xsaWRlci53b3JsZC5wb2ludHMpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ub2RlLmJsb2NrdHlwZSk7XHJcbiAgICAgICAgdGhpcy5oaXQgPSB0cnVlO1xyXG4gICAgICAgIC8vIOWQr+eUqOe8k+WKqOWKqOeUu1xyXG4gICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oLjE1LCB7XHJcbiAgICAgICAgLy8gICBwb3NpdGlvbjogY2MudjIodG91Y2hMb2MueCAtIHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyLCB0b3VjaExvYy55IC0gdGhpcy5ub2RlLnBhcmVudC5oZWlnaHQgLyAyKVxyXG4gICAgICAgIC8vIH0sIHtcclxuICAgICAgICAvLyAgIGVhc2luZzogJ3F1YWRJbidcclxuICAgICAgICAvLyB9KS5zdGFydCgpXHJcbiAgICAgICAgaWYgKHRoaXMuaGl0ICYmIHRoaXMubm9kZS5ibG9ja3R5cGUgPT0gJ3NtYWxsJykge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLnggPSB0b3VjaExvYy54IC0gdGhpcy5ub2RlLnBhcmVudC53aWR0aCAvIDJcclxuICAgICAgICAgIHRoaXMubm9kZS55ID0gdG91Y2hMb2MueSAtIHRoaXMubm9kZS5wYXJlbnQuaGVpZ2h0IC8gMlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgLy8g6Kem5pG45LqL5Lu255uR5ZCsXHJcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xyXG4gICAgICB2YXIgdG91Y2hMb2MgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICBpZiAodGhpcy5oaXQgJiYgdGhpcy5ub2RlLmJsb2NrdHlwZSA9PSAnc21hbGwnKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdG91Y2guZ2V0RGVsdGEoKS54O1xyXG4gICAgICAgIHRoaXMubm9kZS55ICs9IHRvdWNoLmdldERlbHRhKCkueTtcclxuICAgICAgICB0b3VjaExvYy54ID0gdG91Y2hMb2MueCAtIHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyXHJcbiAgICAgICAgdG91Y2hMb2MueSA9IHRvdWNoTG9jLnkgLSB0aGlzLm5vZGUucGFyZW50LmhlaWdodCAvIDJcclxuICAgICAgICBpZiAodG91Y2hMb2MueCA+IDAgJiYgdG91Y2hMb2MueSA+IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IE1hdGguYXRhbih0b3VjaExvYy55IC8gdG91Y2hMb2MueCkgLyBNYXRoLlBJICogMTgwICsgOTAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54IDwgMCAmJiB0b3VjaExvYy55ID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gTWF0aC5hdGFuKC10b3VjaExvYy54IC8gdG91Y2hMb2MueSkgLyBNYXRoLlBJICogMTgwICsgMTgwIC0gMjIuNVxyXG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2hMb2MueCA8IDAgJiYgdG91Y2hMb2MueSA8IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IE1hdGguYXRhbigtdG91Y2hMb2MueSAvIC10b3VjaExvYy54KSAvIE1hdGguUEkgKiAxODAgKyAyNzAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54ID4gMCAmJiB0b3VjaExvYy55IDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gTWF0aC5hdGFuKHRvdWNoTG9jLnggLyAtdG91Y2hMb2MueSkgLyBNYXRoLlBJICogMTgwIC0gMjIuNVxyXG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2hMb2MueCA9PSAwICYmIHRvdWNoTG9jLnkgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAxODAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54ID09IDAgJiYgdG91Y2hMb2MueSA8IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDAgLSAyMi41XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaExvYy54ID4gMCAmJiB0b3VjaExvYy55ID09IDApIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDkwIC0gMjIuNVxyXG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2hMb2MueCA8IDAgJiYgdG91Y2hMb2MueSA9PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAyNzAgLSAyMi41XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAvLyDop6bmkbjkuovku7bnu5PmnZ9cclxuICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcclxuICAgICAgaWYgKHRoaXMuaGl0ICYmIHRoaXMubm9kZS5ibG9ja3R5cGUgPT0gJ3NtYWxsJykge1xyXG4gICAgICAgIHRoaXMuaGl0ID0gZmFsc2U7XHJcbiAgICAgICAgLy8g6K6w5b2V5b2T5YmN5pS+572u55qE5L2N572uXHJcbiAgICAgICAgbGV0IGN1cnJlbnRpbmRleCA9IC0xO1xyXG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGdsb2JhbC5pbnNpZGVwb2ludHNcclxuXHJcbiAgICAgICAgLy8g5rKh5pyJ56e75Yqo5Yiw5ZyG546v55uu5qCH5L2N572u5Yy65Z+f77yM56e75Yqo5Yiw5Yid5aeL5L2N572uXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS54ICogdGhpcy5ub2RlLnggKyB0aGlzLm5vZGUueSAqIHRoaXMubm9kZS55ID4gNDc0ICogNDc0IC8gNCkge1xyXG4gICAgICAgICAgaWYgKHRvdWNoLmdldExvY2F0aW9uKCkueCAtIHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyIDwgMClcclxuICAgICAgICAgICAgdGhpcy5lYXNlVG8odGhpcy5fb2xkUG9zLngsIHRoaXMuX29sZFBvcy55LCAzMzcuNSwgLjIpXHJcbiAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZWFzZVRvKHRoaXMuX29sZFBvcy54LCB0aGlzLl9vbGRQb3MueSwgLTIyLjUsIC4yKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgLy8g56e75Yqo5Yiw5LqG5ZyG546v55uu5qCH5L2N572u5Yy65Z+fXHJcbiAgICAgICAgICBpZiAodGhpcy5ub2RlLnggPiAwICYmIHRoaXMubm9kZS55IDwgMCkgY3VycmVudGluZGV4ID0gdGhpcy5ub2RlLnggPCAtdGhpcy5ub2RlLnkgPyAwIDogMVxyXG4gICAgICAgICAgaWYgKHRoaXMubm9kZS54ID4gMCAmJiB0aGlzLm5vZGUueSA+IDApIGN1cnJlbnRpbmRleCA9IHRoaXMubm9kZS54ID4gdGhpcy5ub2RlLnkgPyAyIDogM1xyXG4gICAgICAgICAgaWYgKHRoaXMubm9kZS54IDwgMCAmJiB0aGlzLm5vZGUueSA+IDApIGN1cnJlbnRpbmRleCA9IC10aGlzLm5vZGUueCA8IHRoaXMubm9kZS55ID8gNCA6IDVcclxuICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IDAgJiYgdGhpcy5ub2RlLnkgPCAwKSBjdXJyZW50aW5kZXggPSAtdGhpcy5ub2RlLnggPiAtdGhpcy5ub2RlLnkgPyA2IDogN1xyXG5cclxuICAgICAgICAgIC8vIOagh+iusOW9k+WJjeS9jee9ruaYr+WQpuS4uuepulxyXG4gICAgICAgICAgbGV0IGlzZW1wdHkgPSB0cnVlXHJcblxyXG4gICAgICAgICAgLy8g5Zyo5a+55bqU5ZyG546v5bey5pS+572u55qE5pWw57uE5Lit5p+l5om+XHJcbiAgICAgICAgICBnbG9iYWwuaW5zaWRlYmxvY2tzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmluZGV4ID09IGN1cnJlbnRpbmRleCkgaXNlbXB0eSA9IGZhbHNlIC8vIOaJvuWIsOivtOaYjuW9k+WJjeS9jee9ruS4jeWPr+eUqFxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAvLyDlvZPliY3kvY3nva7oi6XkuLrnqbpcclxuICAgICAgICAgIGlmIChpc2VtcHR5ICYmIHRoaXMubm9kZS54ICE9IDAgJiYgdGhpcy5ub2RlLnkgIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy/orqHnrpfml4vovazop5LluqZcclxuICAgICAgICAgICAgZ2xvYmFsLlNjaGFuZ2VhbmdsZSArPSA0NSAqIHBhcnNlSW50KHRoaXMuZ2FtZS5yb3RhdGVHcmlkc1Muc3RyaW5nKVxyXG5cclxuICAgICAgICAgICAgLy/orqHnrpflnZfnmoTnnJ/mraPkvY3nva5cclxuICAgICAgICAgICAgbGV0IG4gPSAoY3VycmVudGluZGV4ICsgZ2xvYmFsLlNjaGFuZ2Vwb3NpdGlvbikgJSA4XHJcbiAgICAgICAgICAgIGlmIChuIDwgMClcclxuICAgICAgICAgICAgICBuICs9IDhcclxuXHJcbiAgICAgICAgICAgIC8v5pS+572u5Z2X55qE57yT5Yqo5pWI5p6cXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oLjIsIHtcclxuICAgICAgICAgICAgICB4OiBwb2ludHNbY3VycmVudGluZGV4XS54LFxyXG4gICAgICAgICAgICAgIHk6IHBvaW50c1tjdXJyZW50aW5kZXhdLnksXHJcbiAgICAgICAgICAgICAgYW5nbGU6IHBvaW50c1tjdXJyZW50aW5kZXhdLmEsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICBlYXNpbmc6ICdxdWFkSW4nXHJcbiAgICAgICAgICAgIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8v5pS+572u5Z2XXHJcbiAgICAgICAgICAgICAgdGhpcy5ub2RlLnggPSBwb2ludHNbbl0ueFxyXG4gICAgICAgICAgICAgIHRoaXMubm9kZS55ID0gcG9pbnRzW25dLnlcclxuICAgICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSBwb2ludHNbbl0uYVxyXG5cclxuICAgICAgICAgICAgICAvL+abtOaUueWdl+eahOeItuiKgueCuVxyXG4gICAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgICB0aGlzLmdhbWUuaW5zaWRlLmFkZENoaWxkKHRoaXMubm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgIC8v546v5peL6L2s55qE57yT5Yqo5pWI5p6cXHJcbiAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5nYW1lLmluc2lkZSkudG8oTWF0aC5hYnMocGFyc2VJbnQodGhpcy5nYW1lLnJvdGF0ZUdyaWRzUy5zdHJpbmcpKSAvIDQsIHtcclxuICAgICAgICAgICAgICAgIGFuZ2xlOiBnbG9iYWwuU2NoYW5nZWFuZ2xlXHJcbiAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgICAgICAgICAgIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmRlbGV0ZUJsb2NrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5pKt5pS+6Z+z5pWIXHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuZ2FtZS5yb3RhdGVBdWRpbywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgIH0pLnN0YXJ0KClcclxuICAgICAgICAgICAgfSkuc3RhcnQoKVxyXG5cclxuICAgICAgICAgICAgLy8g5p6E6YCg5b2T5YmN5Z2X55qE5a+56LGh77yM55So5LqO5L+d5a2Y5Zyo5ZyG546v5a+56LGh5pWw57uE5LitXHJcbiAgICAgICAgICAgIGxldCBibG9jayA9IHtcclxuICAgICAgICAgICAgICBpbmRleDogY3VycmVudGluZGV4LCAvLyDlnZfnmoTkvY3nva7luo/lj7dcclxuICAgICAgICAgICAgICBjb2xvcjogdGhpcy5ub2RlLmNvbG9yLl92YWwsIC8vIOWdl+eahOminOiJslxyXG4gICAgICAgICAgICAgIHJvdGF0ZUdyaWRzUzogdGhpcy5nYW1lLnJvdGF0ZUdyaWRzUy5zdHJpbmcsIC8vIOWdl+eahOi9rOWKqOagvOaVsFxyXG4gICAgICAgICAgICAgIGJsb2NraXRlbTogdGhpc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDkv53lrZjlnKjlnIbnjq/lr7nosaHmlbDnu4TkuK1cclxuICAgICAgICAgICAgZ2xvYmFsLmluc2lkZWJsb2Nrcy5wdXNoKGJsb2NrKVxyXG5cclxuICAgICAgICAgICAgLy8g5pKt5pS+6Z+z5pWIXHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5nYW1lLnBsYWNlQXVkaW8sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8v6K6h566X5Zyo5pWw57uE5Lit55qE5L2N572uXHJcbiAgICAgICAgICAgIGdsb2JhbC5TY2hhbmdlcG9zaXRpb24gLT0gcGFyc2VJbnQodGhpcy5nYW1lLnJvdGF0ZUdyaWRzUy5zdHJpbmcpXHJcblxyXG4gICAgICAgICAgICAvL+abtOaWsOaVsOe7hOS4reaJgOacieWdl+eahOS9jee9rlxyXG4gICAgICAgICAgICBnbG9iYWwuaW5zaWRlYmxvY2tzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgaXRlbS5pbmRleCA9IChpdGVtLmluZGV4ICsgcGFyc2VJbnQodGhpcy5nYW1lLnJvdGF0ZUdyaWRzUy5zdHJpbmcpKSAlIDhcclxuICAgICAgICAgICAgICBpZiAoaXRlbS5pbmRleCA8IDApXHJcbiAgICAgICAgICAgICAgICBpdGVtLmluZGV4ICs9IDhcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnbG9iYWwuaW5zaWRlYmxvY2tzOiBcIilcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhnbG9iYWwuaW5zaWRlYmxvY2tzKVxyXG5cclxuICAgICAgICAgICAgLy8g5bCG5b2T5YmN5Z2X6K6+572u5Li65LiN5Y+v54K55Ye7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ibG9ja3R5cGUgPSAnaW5zaWRlJ1xyXG5cclxuICAgICAgICAgICAgLy8g5pS+572u5qyh5pWw5YqgMVxyXG4gICAgICAgICAgICBnbG9iYWwuY291bnQrK1xyXG5cclxuICAgICAgICAgICAgLy8g5aaC5p6c5LiJ5Liq5Z2X5Z2H5bey5pS+572u5a6M5q+V77yM5YiZ6YeN5paw55Sf5oiQ5LiJ5Liq5Z2XXHJcbiAgICAgICAgICAgIGlmIChnbG9iYWwuY291bnQgIT0gMCAmJiBnbG9iYWwuY291bnQgJSAzID09IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLmdhbWUuc3Bhd25CbG9jaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDlvZPliY3kvY3nva7oi6XkuI3kuLrnqbrvvIznp7vliqjliLDliJ3lp4vkvY3nva5cclxuICAgICAgICAgICAgaWYgKHRvdWNoLmdldExvY2F0aW9uKCkueCAtIHRoaXMubm9kZS5wYXJlbnQud2lkdGggLyAyIDwgMClcclxuICAgICAgICAgICAgICB0aGlzLmVhc2VUbyh0aGlzLl9vbGRQb3MueCwgdGhpcy5fb2xkUG9zLnksIDMzNy41LCAuMilcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIHRoaXMuZWFzZVRvKHRoaXMuX29sZFBvcy54LCB0aGlzLl9vbGRQb3MueSwgLTIyLjUsIC4yKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgLy8g57yT5Yqo5Ye95pWwXHJcbiAgZWFzZVRvOiBmdW5jdGlvbiAoeCwgeSwgYSwgdCkge1xyXG4gICAgY2MudHdlZW4odGhpcy5ub2RlKS50byh0LCB7XHJcbiAgICAgIHBvc2l0aW9uOiBjYy52Mih4LCB5KSxcclxuICAgICAgYW5nbGU6IGFcclxuICAgIH0sIHtcclxuICAgICAgZWFzaW5nOiAncXVhZEluJ1xyXG4gICAgfSkuc3RhcnQoKVxyXG4gIH0sXHJcblxyXG4gIG9uRGlzYWJsZSgpIHtcclxuICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IGZhbHNlO1xyXG4gICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCk7XHJcbiAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUpO1xyXG4gICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xyXG4gIH0sXHJcblxyXG4gIG9uRGVzdHJveSgpIHtcclxuICAgIGNoYW5nZXBvc2l0aW9uID0gMFxyXG4gICAgY2hhbmdlYW5nbGUgPSAwXHJcbiAgfVxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
