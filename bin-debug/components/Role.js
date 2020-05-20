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
        _this.initView();
        return _this;
    }
    Role.prototype.initView = function () {
        var role = Utils.createBitmapByName('piece_png');
        this.addChild(role);
    };
    return Role;
}(egret.Sprite));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map