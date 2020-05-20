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
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this._score = 0;
        var role = Utils.createBitmapByName('piece_png');
        _this.addChild(role);
        _this.initView();
        return _this;
    }
    Role.prototype.initView = function () {
        var _this = this;
        if (this._score == 0) {
            return;
        }
        var addScore = new egret.TextField();
        addScore.width = this.width;
        addScore.text = '+' + this._score;
        addScore.textColor = 0x333333;
        addScore.textAlign = 'center';
        addScore.size = 30;
        addScore.bold = true;
        addScore.y = 0;
        addScore.alpha = 1;
        this.addChild(addScore);
        egret.Tween.get(addScore).to({
            y: -50,
            alpha: 1
        }, 500).call(function () {
            _this.removeChild(addScore);
        });
    };
    Object.defineProperty(Role.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (val) {
            this._score = val;
            this.initView();
        },
        enumerable: true,
        configurable: true
    });
    return Role;
}(egret.Sprite));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map