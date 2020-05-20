class Score extends egret.TextField{
    private _text: string = '';
    constructor() {
        super();
        this.init();
    }

    private init() {
        this.text = this._text;
        this.size = 50;
        this.textColor = 0x000000;
        this.bold = true;
    }

    public get scoreText() {
        return this._text;
    }

    public set scoreText(val: string) {
        this._text = val;
        this.init();
    }
}