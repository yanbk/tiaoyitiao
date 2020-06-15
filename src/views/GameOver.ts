class GameOver extends eui.Component implements  eui.UIComponent{
    private againBtn: eui.Image;
    private normalNum:eui.Label;
    private normalScore:eui.Label;
    private perfectNum:eui.Label;
    private perfectScore:eui.Label;
    private continuousNum:eui.Label;
    private continuousScore:eui.Label;
    private awardScore:eui.Label;
    private total:eui.Label;

    constructor(){
        super();
        this.skinName = 'GameOverSkin';
        this.init();
    }
    private init() {
        this.normalNum.text = Utils.normalNum.toString();
        this.normalScore.text = Utils.normalNum.toString();
        this.perfectNum.text = Utils.perfectNum.toString();
        this.perfectScore.text = (Utils.perfectNum * 2).toString();
        this.continuousNum.text = Utils.continuousNum.toString();
        this.continuousScore.text = ((2 + Utils.continuousNum * 2) * Utils.continuousNum / 2).toString();
        this.awardScore.text = (Utils.total - Utils.normalNum - Utils.perfectNum * 2).toString();
        this.total.text = (Utils.total + Utils.total - Utils.normalNum - Utils.perfectNum * 2).toString();

        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            GameControler.instance.gameSceneAdd();
        }, this);
    }

    private textShow(title, num, score, size, left, top) {
        let txt = new  egret.TextField();
        this.addChild(txt);
        txt.text = title + '          ' + num + '         ' + score;
        txt.size = size;
        txt.x = left;
        txt.y = top;
    }
}