class GameOver extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.init();
    }
    private init() {
        var _that = this;
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x000000, 0.5);
        shp.graphics.drawRect( 0, 0, Utils.stageWidth, Utils.stageHeight );
        shp.graphics.endFill();
        this.addChild(shp);

        let againBtn = Utils.createBitmapByName('restart_btn_png');
        this.addChild(againBtn);
        againBtn.x = (Utils.stageWidth - againBtn.width) / 2;
        againBtn.y = 900;
        againBtn.touchEnabled = true;
        againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            GameControler.instance.gameSceneAdd();
        }, this);
    }
}