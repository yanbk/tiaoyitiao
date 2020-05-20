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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GameOver.prototype.init = function () {
        var _that = this;
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.5);
        shp.graphics.drawRect(0, 0, Utils.stageWidth, Utils.stageHeight);
        shp.graphics.endFill();
        this.addChild(shp);
        var againBtn = Utils.createBitmapByName('restart_btn_png');
        this.addChild(againBtn);
        againBtn.x = (Utils.stageWidth - againBtn.width) / 2;
        againBtn.y = 900;
        againBtn.touchEnabled = true;
        againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameControler.instance.gameSceneAdd();
        }, this);
    };
    return GameOver;
}(egret.DisplayObjectContainer));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map