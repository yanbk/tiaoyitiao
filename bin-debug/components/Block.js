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
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super.call(this) || this;
        _this.area = new egret.Sprite();
        _this.initView();
        return _this;
    }
    Block.prototype.initView = function () {
        var blockimg = Utils.createBitmapByName(Utils.blockimg[Math.floor(Math.random() * 3)]);
        this.addChild(blockimg);
        this.area.graphics.beginFill(0x0000ff, 0);
        this.area.graphics.moveTo(224, 0);
        this.area.graphics.lineTo(358, 78);
        this.area.graphics.lineTo(224, 156);
        this.area.graphics.lineTo(90, 78);
        this.area.graphics.lineTo(224, 0);
        this.area.graphics.endFill();
        this.addChild(this.area);
    };
    Block.prototype.isHit = function (x, y) {
        // console.log(x,y,this.area.x,this.area.y)
        var ishit = this.area.hitTestPoint(x, y);
        return ishit;
    };
    return Block;
}(egret.Sprite));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=Block.js.map