class Utils {
    public static stageWidth: number;
    public static stageHeight: number;
    public static blockimg: Array<string> = ["block1_png", "block2_png", "block3_png"];
    public static blocks: any = [];
    public static reblocks: any = [];
    public static normalNum: number = 0;
    public static perfectNum: number = 0;
    public static continuousNum: number = 0;
    public static total: number = 0;

    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static setClick(btn: any, func: Function){
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    }
}