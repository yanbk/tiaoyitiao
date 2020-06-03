class Score extends egret.TextField{
    private _text: string = '';
    private _name: string = '';
    constructor() {
        super();
        this.init();
    }

    private init() {
        this.text = this._name + ': ' + this._text;
        this.size = 30;
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

    public get name() {
        return this._name;
    }

    public set name(val: string) {
        this._name = val;
        this.init();
    }
}