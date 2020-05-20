class GameScene extends egret.DisplayObjectContainer{
    //小人
    private role: Role;
    //积分
    private score: Score;
    //积分
    private scoreNum: number = 0;
    //block容器
    private blockContainer: egret.DisplayObjectContainer;
    // 下一个盒子方向(1靠右侧出现/-1靠左侧出现)
	public direction: number = 1;
    // 判断是否是按下状态
	private isPress = false;
    //开始时间
    private startTime: number = 0;
    //按压时间
    private time: number = 0;
    //小人速度
    private speed: number = 0.5;
    // 随机盒子距离跳台的距离
	private minDistance = 240;
	private maxDistance = 400;
    // tanθ角度值
	public tanAngle: number = 0.556047197640118;
    // 当前的盒子（最新出现的盒子）
	private currentBlock: Block;
    // 当前的盒子（最新出现的盒子）
	private prevBlock: Block;
    // 落脚点
    private targetPos = {
        x: 0,
        y: 0
    };
    // 左侧跳跃点
	private leftOrigin = { "x": 180, "y": 512 };
	// 右侧跳跃点
	private rightOrigin = { "x": 505, "y": 512 };
    // 按下的音频
	private pushVoice: egret.Sound;
	// 按下音频的SoundChannel对象
	private pushSoundChannel: egret.SoundChannel;
	// 弹跳的音频
	private jumpVoice: egret.Sound;

    constructor(){
        super();
        this.init();
        this.reset();
    }

    private init(){
        // 初始化音频
		this.pushVoice = RES.getRes('push_mp3');
		this.jumpVoice = RES.getRes('jump_mp3');

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    public reset() {
        this.removeChildren();
        let bg = Utils.createBitmapByName('bg_jpg');
        this.addChild(bg);

        this.addScore();

        this.blockContainer = new egret.DisplayObjectContainer();
        this.addChild(this.blockContainer);
        this.blockContainer.removeChildren();

        Utils.blocks = [];
        let blockNode = this.createBlock();
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
    }

    public touchBegin() {
        // 播放按下的音频
		this.pushSoundChannel = this.pushVoice.play(0, 1);

        this.startTime = new Date().getTime();
        // 变形
        egret.Tween.get(this.role).to({
            scaleY: 0.5,
            scaleX: 1.5
        }, 3000)
        egret.Tween.get(this.prevBlock).to({
            scaleY: 0.5
        }, 3000)

        this.isPress = true;
    }

    public touchEnd() {
        let endTime = new Date().getTime();
        this.time = endTime - this.startTime;
        let time = 0;
        // if(this.time / 2 > 350){
        //     time = 350;
        // }else if(this.time / 2 < 300){
        //     time = 300;
        // }else{
        //     time = this.time / 2;
        // }
        time = 400
        // 判断是否是在按下状态
		if (!this.isPress) {
			return;
		}
        // 立刻让屏幕不可点,等小人落下后重新可点
        this.touchEnabled = false;
        // 停止播放按压音频,并且播放弹跳音频
		this.pushSoundChannel.stop()
		this.jumpVoice.play(0, 1);
        // 清除所有动画
		egret.Tween.removeAllTweens();

        egret.Tween.get(this.prevBlock).to({
            scaleY: 1
        }, time)

        this.isPress = false;
        this.targetPos.x = this.role.x + this.time * this.speed * this.direction;
        this.targetPos.y = this.role.y + this.time * this.speed * (this.currentBlock.y - this.role.y) / (this.currentBlock.x - this.role.x) * this.direction - 162;

        // 执行跳跃动画
        this.role.anchorOffsetY = this.role.height - 12
        this.role.y -= 162;
		egret.Tween.get(this).to({ factor: 1 }, time).call(() => {
			this.role.scaleY = 1;
			this.role.scaleX = 1;
			this.time = 0;
            this.role.y += 162;
			// 判断跳跃是否成功
			this.jumpResult();
            this.role.anchorOffsetY = this.role.height - 12 + 162
            
		});

        // 执行小人空翻动画
        
		egret.Tween.get(this.role).to({ rotation: this.direction > 0 ? 360 : -360 }, time).call(() => {
			this.role.rotation = 0
		}).call(() => {
			// this.role.anchorOffsetY = this.role.height / 2;
		});
    }

    private jumpResult() {
        // console.log(Math.pow(this.currentBlock.x - this.role.x, 2) + Math.pow(this.currentBlock.y - this.role.y, 2) <= 70 * 70)
        // console.log(this.currentBlock.isHit(this.targetPos.x, this.targetPos.y))
        console.log(this.role.x - this.currentBlock.x)
        let distance = Math.pow(this.currentBlock.x - this.role.x, 2) + Math.pow(this.currentBlock.y - (this.role.y), 2);
        let s = 0;
        if(distance <= 70 * 70){
            //更新积分
            if(distance <= 15 * 15){
                this.scoreNum += 2;
                s = 2;
            }else{
                this.scoreNum ++;
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
			}, 1000).call(() => {
				// 开始创建下一个方块
				this.addBlock();
				// 让屏幕重新可点;
				this.touchEnabled = true;
			})
        }else {
            if(this.direction > 0){
                if(this.role.x - this.currentBlock.x > 70){
                    console.log('正外')
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
                if(this.role.x - this.currentBlock.x < -70){
                    console.log('正内')
                    this.blockContainer.swapChildren(this.role, this.prevBlock);
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
            }else{
                if(this.role.x - this.currentBlock.x > 58){
                    console.log('负内')
                    this.blockContainer.swapChildren(this.role, this.prevBlock);
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
                if(this.role.x - this.currentBlock.x < -58){
                    console.log('负外')
                    this.blockContainer.swapChildren(this.role, this.currentBlock);
                }
            }
            egret.Tween.get(this.role).wait( 200 ).to({ y: this.role.y + 100  }, 1000).call(() => {
                GameControler.instance.gameOverAdd();
            });
			// 失败,弹出重新开始的panel
		}
    }

    private update(x, y) {
		egret.Tween.removeAllTweens();
		for (var i: number = Utils.blocks.length - 1; i >= 0; i--) {
			var blockNode = Utils.blocks[i];
			if (blockNode.x + (blockNode.width - 222) < 0 || blockNode.x - 222 > this.width || blockNode.y - 78 > Utils.stageHeight) {
				// 方块超出屏幕,从显示列表中移除
				this.blockContainer.removeChild(blockNode);
				Utils.blocks.splice(i, 1);
				// 添加到回收数组中
				Utils.reblocks.push(blockNode);
			} else {
				// 没有超出屏幕的话,则移动
				egret.Tween.get(blockNode).to({
					x: blockNode.x - x,
					y: blockNode.y - y
				}, 1000)
			}
		}
	}

    // 添加一个方块
	private addBlock() {
        this.prevBlock = this.currentBlock;
		// 随机一个方块
        let blockNode = this.createBlock();
		// 设置位置
		let distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
		if (this.direction > 0) {
			blockNode.x = this.currentBlock.x + distance;
			blockNode.y = this.currentBlock.y - distance * this.tanAngle;
		} else {
			blockNode.x = this.currentBlock.x - distance;
			blockNode.y = this.currentBlock.y - distance * this.tanAngle;
		}
		this.currentBlock = blockNode;
        this.blockContainer.swapChildren(this.role, this.currentBlock);
	}

    // 工厂方法,创建一个方块
	private createBlock() {
		var blockNode = null;
		if (Utils.reblocks.length) {
			// 回收池里面有,则直接取
			blockNode = Utils.reblocks.splice(0, 1)[0];
		} else {
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
	}

    private addScore() {
        this.score = new Score();
        this.score.scoreText = this.scoreNum.toString();
        this.addChild(this.score);
        this.score.x = 50;
        this.score.y = 50;
    }

    //添加factor的set,get方法,注意用public  
	public get factor(): number {
		return 0;
	}
    //计算方法参考 二次贝塞尔公式  
	public set factor(value: number) {
		this.role.x = (1 - value) * (1 - value) * this.role.x + 2 * value * (1 - value) * (this.role.x + this.targetPos.x) / 3 * (this.direction > 0 ? 1 : 2) + value * value * (this.targetPos.x);
		this.role.y = (1 - value) * (1 - value) * this.role.y + 2 * value * (1 - value) * (this.targetPos.y - 250) + value * value * (this.targetPos.y);
	}
}