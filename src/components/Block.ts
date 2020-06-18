class Block extends egret.Sprite{
    private eff3: dragonBones.EgretArmatureDisplay;
    private _perfect: boolean = false;
    constructor(){
        super();
        this.initView();
    }

    private initView(){
        let random = Math.floor(Math.random() * 12);
        let blockimg = Utils.createBitmapByName(Utils.blockimg[random]);
        this.addChild(blockimg);
        // 设置方块的锚点
        if (random > 6) {
            this.anchorOffsetX = 227;

        } else {
            this.anchorOffsetX = 219;
        }
		this.anchorOffsetY = 242;

        

        this.eff3 = Utils.egretFactory.buildArmatureDisplay("eff3");
        
        this.eff3.anchorOffsetX = -220;
        this.eff3.anchorOffsetY = -70;

        this.eff3.addEventListener(dragonBones.EventObject.COMPLETE, this.eff3Complete, this);
    }

    public get perfect() {
        return this._perfect;
    }

    public set perfect(val: boolean) {
        this._perfect = val;
        if (val) {
            this.addChild(this.eff3);
            this.eff3.animation.play("newAnimation", 1).timeScale = 2;
        }
    }

    private eff3Complete() {
        this.removeChild(this.eff3);
    }
}