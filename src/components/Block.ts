class Block extends egret.Sprite{
    private area = new egret.Sprite();
    constructor(){
        super();
        this.initView();
    }

    private initView(){
        let blockimg = Utils.createBitmapByName(Utils.blockimg[Math.floor(Math.random() * 3)]);
        this.addChild(blockimg);
        this.area.graphics.beginFill( 0x0000ff, 0 );
        this.area.graphics.moveTo(224, 0);
        this.area.graphics.lineTo(358, 78);
        this.area.graphics.lineTo(224, 156);
        this.area.graphics.lineTo(90, 78);
        this.area.graphics.lineTo(224, 0);
        this.area.graphics.endFill();
        this.addChild(this.area);
    }

    public isHit(x, y) {
        // console.log(x,y,this.area.x,this.area.y)
        var ishit: boolean = this.area.hitTestPoint(x, y);
        return ishit;
    }
}