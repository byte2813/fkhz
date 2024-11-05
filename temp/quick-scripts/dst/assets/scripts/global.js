
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