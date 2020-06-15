class Score extends egret.TextField{
    private _text: string = '';
    private _title: string = '';
    constructor() {
        super();
        this.init();
    }

    private init() {
        this.text = this._title + '：' + this._text;
        this.size = 34;
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

    public get scoreTitle() {
        return this._title;
    }

    public set scoreTitle(val: string) {
        this._title = val;
        this.init();
    }
}