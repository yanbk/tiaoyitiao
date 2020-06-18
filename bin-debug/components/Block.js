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
        _this._perfect = false;
        _this.initView();
        return _this;
    }
    Block.prototype.initView = function () {
        var random = Math.floor(Math.random() * 12);
        var blockimg = Utils.createBitmapByName(Utils.blockimg[random]);
        this.addChild(blockimg);
        // 设置方块的锚点
        if (random > 6) {
            this.anchorOffsetX = 227;
        }
        else {
            this.anchorOffsetX = 219;
        }
        this.anchorOffsetY = 242;
        this.eff3 = Utils.egretFactory.buildArmatureDisplay("eff3");
        this.eff3.anchorOffsetX = -220;
        this.eff3.anchorOffsetY = -70;
        this.eff3.addEventListener(dragonBones.EventObject.COMPLETE, this.eff3Complete, this);
    };
    Object.defineProperty(Block.prototype, "perfect", {
        get: function () {
            return this._perfect;
        },
        set: function (val) {
            this._perfect = val;
            if (val) {
                this.addChild(this.eff3);
                this.eff3.animation.play("newAnimation", 1).timeScale = 2;
            }
        },
        enumerable: true,
        configurable: true
    });
    Block.prototype.eff3Complete = function () {
        this.removeChild(this.eff3);
    };
    return Block;
}(egret.Sprite));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=Block.js.map