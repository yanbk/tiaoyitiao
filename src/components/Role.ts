class Role extends egret.Sprite{
    private _score = 0;
    constructor(){
        super();
        this.initView();
        this.changeScore();
        // this.eff();
    }

    private initView() {
        let role = Utils.createBitmapByName('piece_png');
        this.addChild(role);
    }

    private changeScore(){
        if(this._score == 0){
            return;
        }
        let addScore: egret.TextField = new egret.TextField();
        addScore.width = this.width;
        addScore.text = '+' + this._score;
        addScore.textColor = 0x333333;
        addScore.textAlign = 'center';
        addScore.size = 30;
        addScore.bold = true;
        addScore.y = 0;
        addScore.alpha = 1;
        this.addChild(addScore);

        egret.Tween.get(addScore).to({
            y: -50,
            alpha: 1
        }, 500).call(() => {
            this.removeChild(addScore);
        })
    }

    public get score(){
        return this._score
    }
    public set score(val: number){
        this._score = val;
        this.changeScore();
    }
}