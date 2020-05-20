class GameStart extends egret.DisplayObjectContainer{
    constructor() {
        super();
        this.init();
    }

    private init() {
        let startBtn = Utils.createBitmapByName('start_btn_png');
        this.addChild(startBtn);
        startBtn.x = (Utils.stageWidth - startBtn.width) / 2;
        startBtn.y = 900;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
            GameControler.instance.gameSceneAdd();
        }, this);
    }
}