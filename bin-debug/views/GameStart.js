var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GameStart.prototype.init = function () {
        var bg = Utils.createBitmapByName('bg_jpg');
        this.addChild(bg);
        var startBtn = Utils.createBitmapByName('start_btn_png');
        this.addChild(startBtn);
        startBtn.x = (Utils.stageWidth - startBtn.width) / 2;
        startBtn.y = 900;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameControler.instance.gameSceneAdd();
        }, this);
    };
    return GameStart;
}(egret.DisplayObjectContainer));
__reflect(GameStart.prototype, "GameStart");
//# sourceMappingURL=GameStart.js.map