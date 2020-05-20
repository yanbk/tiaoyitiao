class Role extends egret.Sprite{
    constructor(){
        super();
        this.initView();
    }

    private initView(){
        let role = Utils.createBitmapByName('piece_png');
        this.addChild(role);
    }
}