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
    Utils.blockimg = ["block1_png", "block2_png", "block3_png"];
    Utils.blocks = [];
    Utils.reblocks = [];
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map