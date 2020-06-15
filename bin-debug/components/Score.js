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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this) || this;
        _this._text = '';
        _this._title = '';
        _this.init();
        return _this;
    }
    Score.prototype.init = function () {
        this.text = this._title + '：' + this._text;
        this.size = 34;
        this.textColor = 0x000000;
        this.bold = true;
    };
    Object.defineProperty(Score.prototype, "scoreText", {
        get: function () {
            return this._text;
        },
        set: function (val) {
            this._text = val;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "scoreTitle", {
        get: function () {
            return this._title;
        },
        set: function (val) {
            this._title = val;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    return Score;
}(egret.TextField));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map