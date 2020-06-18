class Utils {
    public static stageWidth: number;
    public static stageHeight: number;
    public static blockimg: Array<string> = ["f1_png", "f2_png", "f3_png", "f4_png", "f5_png", "f6_png", "f7_png", "y1_png", "y2_png", "y3_png", "y4_png", "y5_png"];
    public static blocks: any = [];
    public static reblocks: any = [];
    public static normalNum: number = 0;
    public static perfectNum: number = 0;
    public static continuousNum: number = 0;
    public static total: number = 0;
    public static egretFactory: dragonBones.EgretFactory;
    public static tuowei: any;

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