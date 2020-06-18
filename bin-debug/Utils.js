var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Utils.setClick = function (btn, func) {
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    };
    Utils.blockimg = ["f1_png", "f2_png", "f3_png", "f4_png", "f5_png", "f6_png", "f7_png", "y1_png", "y2_png", "y3_png", "y4_png", "y5_png"];
    Utils.blocks = [];
    Utils.reblocks = [];
    Utils.normalNum = 0;
    Utils.perfectNum = 0;
    Utils.continuousNum = 0;
    Utils.total = 0;
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map