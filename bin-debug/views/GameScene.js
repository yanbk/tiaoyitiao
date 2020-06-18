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
        //连击次数
        _this.continues = 0;
        //是否连击
        _this.isContinue = false;
        _this.init();
        _this.reset();
        return _this;
    }
    GameScene.prototype.init = function () {
        // 初始化音频
        this.pushVoice = RES.getRes('push_mp3');
        this.jumpVoice = RES.getRes('jump_mp3');
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    GameScene.prototype.reset = function () {
        this.isContinue = false;
        this.continues = 0;
        Utils.normalNum = 0;
        Utils.perfectNum = 0;
        Utils.continuousNum = 0;
        Utils.total = 0;
        Utils.blocks = [];
        this.removeChildren();
        var bg = new egret.Sprite();
        bg.graphics.beginFill(0x606165);
        bg.graphics.drawRect(0, 0, Utils.stageWidth, Utils.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        this.addScore();
        this.blockContainer = new egret.DisplayObjectContainer();
        this.addChild(this.blockContainer);
        this.blockContainer.removeChildren();
        var blockNode = this.createBlock();
        blockNode.x = 200;
        blockNode.y = Utils.stageHeight / 2 + blockNode.height + 165;
        this.currentBlock = blockNode;
        this.effFunc1();
        this.effFunc2();
        this.role = new Role();
        this.blockContainer.addChild(this.role);
        this.role.anchorOffsetX = this.role.width / 2;
        this.role.anchorOffsetY = this.role.height - 16 + 165;
        // 摆正小人的位置
        this.role.y = this.currentBlock.y;
        this.role.x = this.currentBlock.x;
        this.direction = 1;
        this.addBlock();
    };
    GameScene.prototype.touchBegin = function () {
        // 播放按下的音频
        this.pushSoundChannel = this.pushVoice.play(0, 1);
        this.startTime = new Date().getTime();
        // 变形
        egret.Tween.get(this.role).to({
            scaleY: 0.5,
            scaleX: 1.5
        }, 3000);
        egret.Tween.get(this.prevBlock).to({
            scaleY: 0.7
        }, 3000);
        this.isPress = true;
        this.blockContainer.addChild(this.eff1);
        this.blockContainer.swapChildren(this.role, this.eff1);
        this.eff1.x = this.role.x;
        this.eff1.y = this.role.y;
    };
    GameScene.prototype.touchEnd = function () {
        var _this = this;
        var endTime = new Date().getTime();
        this.time = endTime - this.startTime;
        var time = 400;
        // 判断是否是在按下状态
        if (!this.isPress) {
            return;
        }
        // 立刻让屏幕不可点,等小人落下后重新可点
        this.touchEnabled = false;
        // 停止播放按压音频,并且播放弹跳音频
        this.pushSoundChannel.stop();
        this.jumpVoice.play(0, 1);
        // 清除所有动画
        egret.Tween.removeAllTweens();
        this.blockContainer.addChild(Utils.tuowei);
        this.blockContainer.swapChildren(this.role, Utils.tuowei);
        Utils.tuowei.start();
        egret.Tween.get(this.prevBlock).to({
            scaleY: 1
        }, time);
        this.isPress = false;
        this.targetPos.x = this.role.x + this.time * this.speed * this.direction;
        this.targetPos.y = this.role.y + this.time * this.speed * (this.currentBlock.y - this.role.y) / (this.currentBlock.x - this.role.x) * this.direction - 165;
        // 执行跳跃动画
        this.role.anchorOffsetY = this.role.height - 16;
        this.role.y -= 165;
        egret.Tween.get(this).to({ factor: 1 }, time).call(function () {
            _this.time = 0;
            _this.role.y += 165;
            // 判断跳跃是否成功
            _this.jumpResult();
            _this.role.anchorOffsetY = _this.role.height - 16 + 165;
        });
        // this.role.rotation = this.direction > 0 ? 30 : -30
        egret.Tween.get(this.role).to({
            rotation: this.direction > 0 ? 60 : -60
        }, time).call(function () {
            _this.role.rotation = 0;
        });
        this.blockContainer.removeChild(this.eff1);
    };
    GameScene.prototype.jumpResult = function () {
        var distance = Math.pow(this.currentBlock.x - this.role.x, 2) + Math.pow(this.currentBlock.y - (this.role.y), 2);
        var s = 0;
        if (distance <= 70 * 70) {
            //更新积分
            if (distance <= 10 * 10) {
                if (this.isContinue) {
                    this.continues += 1;
                }
                else {
                    this.continues = 1;
                }
                this.scoreNum += 2 * this.continues;
                s = 2 * this.continues;
                this.isContinue = true;
                Utils.perfectNum += 1;
                if (this.continues > Utils.continuousNum) {
                    Utils.continuousNum = this.continues;
                }
                this.currentBlock.perfect = true;
            }
            else {
                this.scoreNum++;
                s = 1;
                this.isContinue = false;
                Utils.normalNum += 1;
            }
            this.score.scoreText = this.scoreNum.toString();
            Utils.total = this.scoreNum;
            this.role.score = s;
            this.updatePage();
            egret.Tween.get(this.role).to({
                scaleX: 1,
                scaleY: 1
            }, 100);
        }
        else {
            // if(this.direction > 0){
            //     if(this.role.x - this.currentBlock.x > 58){
            //         // console.log('正外')
            //         this.blockContainer.swapChildren(this.role, this.currentBlock);
            //     }
            //     if(this.role.x - this.currentBlock.x < -70){
            //         // console.log('正内')
            //         this.blockContainer.swapChildren(this.role, this.prevBlock);
            //         this.blockContainer.swapChildren(this.role, this.currentBlock);
            //     }
            // }else{
            //     if(this.role.x - this.currentBlock.x > 58){
            //         // console.log('负内')
            //         this.blockContainer.swapChildren(this.role, this.prevBlock);
            //         this.blockContainer.swapChildren(this.role, this.currentBlock);
            //     }
            //     if(this.role.x - this.currentBlock.x < -58){
            //         // console.log('负外')
            //         this.blockContainer.swapChildren(this.role, this.currentBlock);
            //     }
            // }
            // egret.Tween.get(this.role).to({ y: this.role.y + 100  }, 1000).call(() => {
            //     GameControler.instance.gameOverAdd();
            // });
            this.role.scaleY = 1;
            this.role.scaleX = 1;
            GameControler.instance.gameOverAdd();
        }
        if (Utils.tuowei.parent) {
            Utils.tuowei.stop();
            Utils.tuowei.parent.removeChild(Utils.tuowei);
        }
        this.blockContainer.addChild(this.eff2);
        this.eff2.animation.play("newAnimation", 1).timeScale = 3;
        // this.blockContainer.swapChildren(this.role, this.eff2);
        this.eff2.x = this.role.x;
        this.eff2.y = this.role.y;
    };
    GameScene.prototype.updatePage = function () {
        var _this = this;
        // 随机下一个方块出现的位置
        this.direction = Math.random() > 0.5 ? 1 : -1;
        // 当前方块要移动到相应跳跃点的距离
        var blockX, blockY;
        blockX = this.direction > 0 ? this.leftOrigin.x : this.rightOrigin.x;
        blockY = Utils.stageHeight / 2 + this.currentBlock.height + 165;
        // 小人要移动到的点.
        var roleX, roleY;
        roleX = this.role.x - (this.currentBlock.x - blockX);
        roleY = this.role.y - (this.currentBlock.y - blockY);
        // 更新页面
        this.update(this.currentBlock.x - blockX, this.currentBlock.y - blockY);
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
        // egret.Tween.get(this.eff2).to({
        // 	x: this.role.x,
        // 	y: this.role.y
        // }, 1000)
    };
    GameScene.prototype.update = function (x, y) {
        // egret.Tween.removeAllTweens();
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
        // 把新创建的block添加进入blockArr里
        Utils.blocks.push(blockNode);
        return blockNode;
    };
    GameScene.prototype.addScore = function () {
        this.score = new Score();
        this.score.scoreTitle = '得分';
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
            this.role.x = (1 - value) * (1 - value) * this.role.x + 2 * value * (1 - value) * (this.role.x + this.targetPos.x) / 5 * (this.direction > 0 ? 2 : 3) + value * value * (this.targetPos.x);
            this.role.y = (1 - value) * (1 - value) * this.role.y + 2 * value * (1 - value) * (this.targetPos.y - 250) + value * value * (this.targetPos.y);
            Utils.tuowei.emitterX = this.role.x;
            Utils.tuowei.emitterY = this.role.y;
        },
        enumerable: true,
        configurable: true
    });
    GameScene.prototype.effFunc1 = function () {
        this.eff1 = Utils.egretFactory.buildArmatureDisplay("eff1");
        this.eff1.anchorOffsetY = 190;
        this.eff1.animation.play("newAnimation");
    };
    GameScene.prototype.effFunc2 = function () {
        this.eff2 = Utils.egretFactory.buildArmatureDisplay("eff2");
        this.eff2.anchorOffsetY = 150;
        this.eff2.addEventListener(dragonBones.EventObject.COMPLETE, this.eff2Complete, this);
    };
    GameScene.prototype.eff2Complete = function () {
        this.blockContainer.removeChild(this.eff2);
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map