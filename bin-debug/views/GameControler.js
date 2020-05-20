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
var GameControler = (function (_super) {
    __extends(GameControler, _super);
    function GameControler() {
        var _this = _super.call(this) || this;
        _this.gameStart = new GameStart();
        return _this;
    }
    Object.defineProperty(GameControler, "instance", {
        get: function () {
            if (!this.gameControler) {
                this.gameControler = new GameControler();
            }
            return this.gameControler;
        },
        enumerable: true,
        configurable: true
    });
    GameControler.prototype.setStage = function (s) {
        this._stage = s;
    };
    /**开始游戏场景 */
    GameControler.prototype.gameStartAdd = function () {
        if (this.gameStart && this.gameStart.parent) {
            this._stage.removeChild(this.gameStart);
        }
        this._stage.addChild(this.gameStart);
    };
    /**游戏场景 */
    GameControler.prototype.gameSceneAdd = function () {
        if (this.gameStart && this.gameStart.parent) {
            this._stage.removeChild(this.gameStart);
        }
        if (this.gameOver && this.gameOver.parent) {
            this._stage.removeChild(this.gameOver);
        }
        if (this.gameScene && this.gameScene.parent) {
            this._stage.removeChild(this.gameScene);
        }
        this.gameScene = new GameScene();
        this._stage.addChild(this.gameScene);
    };
    /**游戏结束场景 */
    GameControler.prototype.gameOverAdd = function () {
        if (this.gameOver && this.gameOver.parent) {
            this._stage.removeChild(this.gameOver);
        }
        this.gameOver = new GameOver();
        this._stage.addChild(this.gameOver);
    };
    return GameControler;
}(egret.DisplayObjectContainer));
__reflect(GameControler.prototype, "GameControler");
//# sourceMappingURL=GameControler.js.map