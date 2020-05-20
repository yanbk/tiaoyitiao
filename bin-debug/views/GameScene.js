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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        //积分
        _this.scoreNum = 0;
        // 下一个盒子方向(1靠右侧出现/-1靠左侧出现)
        _this.direction = 1;
        // 判断是否是按下状态
        _this.isPress = false;
        //开始时间
        _this.startTime = 0;
        //按压时间
        _this.time = 0;
        //小人速度
        _this.speed = 0.5;
        // 随机盒子距离跳台的距离
        _this.minDistance = 240;
        _this.maxDistance = 400;
        // tanθ角度值
        _this.tanAngle = 0.556047197640118;
        // 落脚点
        _this.targetPos = {
            x: 0,
            y: 0
        };
        // 左侧跳跃点
        _this.leftOrigin = { "x": 180, "y": 512 };
        // 右侧跳跃点
        _this.rightOrigin = { "x": 505, "y": 512 };
        _this.init();
        _this.reset();
        return _this;
    }
    GameScene.prototype.init = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    GameScene.prototype.reset = function () {
        this.removeChildren();
        var bg = Utils.createBitmapByName('bg_jpg');
        this.addChild(bg);
        this.addScore();
        this.blockContainer = new egret.DisplayObjectContainer();
        this.addChild(this.blockContainer);
        this.blockContainer.removeChildren();
        Utils.blocks = [];
        var blockNode = this.createBlock();
        blockNode.x = 200;
        blockNode.y = Utils.stageHeight / 2 + blockNode.height + 162;
        this.currentBlock = blockNode;
        this.role = new Role();
        this.blockContainer.addChild(this.role);
        this.role.anchorOffsetX = this.role.width / 2;
        this.role.anchorOffsetY = this.role.height - 12 + 162;
        // 摆正小人的位置
        this.role.y = this.currentBlock.y;
        this.role.x = this.currentBlock.x;
        this.direction = 1;
        this.addBlock();
    };
    GameScene.prototype.touchBegin = function () {
        this.startTime = new Date().getTime();
        // 变形
        egret.Tween.get(this.role).to({
            scaleY: 0.5,
            scaleX: 1.5
        }, 3000);
        egret.Tween.get(this.prevBlock).to({
            scaleY: 0.5
        }, 3000);
        this.isPress = true;
    };
    GameScene.prototype.touchEnd = function () {
        var _this = this;
        var endTime = new Date().getTime();
        this.time = endTime - this.startTime;
        var time = 0;
        // if(this.time / 2 > 350){
        //     time = 350;
        // }else if(this.time / 2 < 300){
        //     time = 300;
        // }else{
        //     time = this.time / 2;
        // }
        time = 400;
        // 判断是否是在按下状态
        if (!this.isPress) {
            return;
        }
        // 立刻让屏幕不可点,等小人落下后重新可点
        this.touchEnabled = false;
        // 清除所有动画
        egret.Tween.removeAllTweens();
        egret.Tween.get(this.prevBlock).to({
            scaleY: 1
        }, time);
        this.isPress = false;
        this.targetPos.x = this.role.x + this.time * this.speed * this.direction;
        this.targetPos.y = this.role.y + this.time * this.speed * (this.currentBlock.y - this.role.y) / (this.currentBlock.x - this.role.x) * this.direction - 162;
        // 执行跳跃动画
        this.role.anchorOffsetY = this.role.height - 12;
        this.role.y -= 162;
        egret.Tween.get(this).to({ factor: 1 }, time).call(function () {
            _this.role.scaleY = 1;
            _this.role.scaleX = 1;
            _this.time = 0;
            _this.role.y += 162;
            // 判断跳跃是否成功
            _this.jumpResult();
            _this.role.anchorOffsetY = _this.role.height - 12 + 162;
        });
        // 执行小人空翻动画
        egret.Tween.get(this.role).to({ rotation: this.direction > 0 ? 360 : -360 }, time).call(function () {
            _this.role.rotation = 0;
        }).call(function () {
            // this.role.anchorOffsetY = this.role.height / 2;
        });
    };
    GameScene.prototype.jumpResult = function () {
        var _this = this;
        // console.log(Math.pow(this.currentBlock.x - this.role.x, 2) + Math.pow(this.currentBlock.y - this.role.y, 2) <= 70 * 70)
        // console.log(this.currentBlock.isHit(this.targetPos.x, this.targetPos.y))
        console.log(this.role.x - this.currentBlock.x);
        var distance = Math.pow(this.currentBlock.x - this.role.x, 2) + Math.pow(this.currentBlock.y - (this.role.y), 2);
        var s = 0;
        if (distance <= 70 * 70) {
            //更新积分
            if (distance <= 15 * 15) {
                this.scoreNum += 2;
                s = 2;
            }
            else {
                this.scoreNum++;
                s = 1;
            }
            this.score.scoreText = this.scoreNum.toString();
            // 随机下一个方块出现的位置
            this.direction = Math.random() > 0.5 ? 1 : -1;
            // 当前方块要移动到相应跳跃点的距离
            var blockX, blockY;
            blockX = this.direction > 0 ? this.leftOrigin.x : this.rightOrigin.x;
            blockY = Utils.stageHeight / 2 + this.currentBlock.height + 162;
            // 小人要移动到的点.
            var roleX, roleY;
            roleX = this.role.x - (this.currentBlock.x - blockX);
            roleY = this.role.y - (this.currentBlock.y - blockY);
            // 更新页面
            this.update(this.currentBlock.x - blockX, this.currentBlock.y - blockY);
            this.role.score = s;
            // 更新小人的位置
            egret.Tween.get(this.role).to({
                x: roleX,
                y: roleY
            }, 1000).call(function () {
                // 开始创建下一个方块
                _this.addBlock();
                // 让屏幕重新可点;
                _this.touchEnabled = true;
            });
        }
        else {
            if (this.direction > 0) {
                if (this.role.x - this.currentBlock.x > 70) {
                    console.log('正外');
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
                if (this.role.x - this.currentBlock.x < -70) {
                    console.log('正内');
                    this.blockContainer.swapChildren(this.role, this.prevBlock);
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
            }
            else {
                if (this.role.x - this.currentBlock.x > 58) {
                    console.log('负内');
                    this.blockContainer.swapChildren(this.role, this.prevBlock);
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
                if (this.role.x - this.currentBlock.x < -58) {
                    console.log('负外');
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
            }
            egret.Tween.get(this.role).wait(200).to({ y: this.role.y + 100 }, 1000).call(function () {
                GameControler.instance.gameOverAdd();
            });
            // 失败,弹出重新开始的panel
        }
    };
    GameScene.prototype.update = function (x, y) {
        egret.Tween.removeAllTweens();
        for (var i = Utils.blocks.length - 1; i >= 0; i--) {
            var blockNode = Utils.blocks[i];
            if (blockNode.x + (blockNode.width - 222) < 0 || blockNode.x - 222 > this.width || blockNode.y - 78 > Utils.stageHeight) {
                // 方块超出屏幕,从显示列表中移除
                this.blockContainer.removeChild(blockNode);
                Utils.blocks.splice(i, 1);
                // 添加到回收数组中
                Utils.reblocks.push(blockNode);
            }
            else {
                // 没有超出屏幕的话,则移动
                egret.Tween.get(blockNode).to({
                    x: blockNode.x - x,
                    y: blockNode.y - y
                }, 1000);
            }
        }
    };
    // 添加一个方块
    GameScene.prototype.addBlock = function () {
        this.prevBlock = this.currentBlock;
        // 随机一个方块
        var blockNode = this.createBlock();
        // 设置位置
        var distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
        if (this.direction > 0) {
            blockNode.x = this.currentBlock.x + distance;
            blockNode.y = this.currentBlock.y - distance * this.tanAngle;
        }
        else {
            blockNode.x = this.currentBlock.x - distance;
            blockNode.y = this.currentBlock.y - distance * this.tanAngle;
        }
        this.currentBlock = blockNode;
        this.blockContainer.swapChildren(this.role, this.currentBlock);
    };
    // 工厂方法,创建一个方块
    GameScene.prototype.createBlock = function () {
        var blockNode = null;
        if (Utils.reblocks.length) {
            // 回收池里面有,则直接取
            blockNode = Utils.reblocks.splice(0, 1)[0];
        }
        else {
            // 回收池里面没有,则重新创建
            blockNode = new Block();
        }
        this.blockContainer.addChild(blockNode);
        // 设置方块的锚点
        blockNode.anchorOffsetX = 222;
        blockNode.anchorOffsetY = 240;
        // 把新创建的block添加进入blockArr里
        Utils.blocks.push(blockNode);
        return blockNode;
    };
    GameScene.prototype.addScore = function () {
        this.score = new Score();
        this.score.scoreText = this.scoreNum.toString();
        this.addChild(this.score);
        this.score.x = 50;
        this.score.y = 50;
    };
    Object.defineProperty(GameScene.prototype, "factor", {
        //添加factor的set,get方法,注意用public  
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式  
        set: function (value) {
            this.role.x = (1 - value) * (1 - value) * this.role.x + 2 * value * (1 - value) * (this.role.x + this.targetPos.x) / 3 * (this.direction > 0 ? 1 : 2) + value * value * (this.targetPos.x);
            this.role.y = (1 - value) * (1 - value) * this.role.y + 2 * value * (1 - value) * (this.targetPos.y - 250) + value * value * (this.targetPos.y);
        },
        enumerable: true,
        configurable: true
    });
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map