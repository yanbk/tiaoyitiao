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
        _this.skinName = 'GameOverSkin';
        _this.init();
        return _this;
    }
    GameOver.prototype.init = function () {
        this.normalNum.text = Utils.normalNum.toString();
        this.normalScore.text = Utils.normalNum.toString();
        this.perfectNum.text = Utils.perfectNum.toString();
        this.perfectScore.text = (Utils.perfectNum * 2).toString();
        this.continuousNum.text = Utils.continuousNum.toString();
        this.continuousScore.text = ((2 + Utils.continuousNum * 2) * Utils.continuousNum / 2).toString();
        this.awardScore.text = (Utils.total - Utils.normalNum - Utils.perfectNum * 2).toString();
        this.total.text = (Utils.total + Utils.total - Utils.normalNum - Utils.perfectNum * 2).toString();
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameControler.instance.gameSceneAdd();
        }, this);
    };
    GameOver.prototype.textShow = function (title, num, score, size, left, top) {
        var txt = new egret.TextField();
        this.addChild(txt);
        txt.text = title + '          ' + num + '         ' + score;
        txt.size = size;
        txt.x = left;
        txt.y = top;
    };
    return GameOver;
}(eui.Component));
__reflect(GameOver.prototype, "GameOver", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameOver.js.map