class GameControler extends egret.DisplayObjectContainer{
    private gameStart: GameStart;
    private gameScene: GameScene;
    private gameOver: GameOver;

    public _stage: egret.DisplayObjectContainer;

    private static gameControler: GameControler;   
    public static get instance(){
        if(!this.gameControler){
           this.gameControler = new GameControler(); 
        }
        return this.gameControler;
    }

    public constructor(){
        super();
        this.gameStart = new GameStart();
    }

    public setStage(s: egret.DisplayObjectContainer){
        this._stage = s;
    }

    /**开始游戏场景 */
	public gameStartAdd():void {
		if(this.gameStart && this.gameStart.parent) {
			this._stage.removeChild(this.gameStart);
		}
		this._stage.addChild(this.gameStart);
	}

    /**游戏场景 */
	public gameSceneAdd():void {
		if(this.gameStart && this.gameStart.parent) {
			this._stage.removeChild(this.gameStart);
		}
        if(this.gameOver && this.gameOver.parent) {
			this._stage.removeChild(this.gameOver);
		}
        if(this.gameScene && this.gameScene.parent) {
			this._stage.removeChild(this.gameScene);
		}
        this.gameScene = new GameScene();
		this._stage.addChild(this.gameScene);
	}

    /**游戏结束场景 */
	public gameOverAdd():void {
        if(this.gameOver && this.gameOver.parent) {
			this._stage.removeChild(this.gameOver);
		}
        this.gameOver = new GameOver();
		this._stage.addChild(this.gameOver);
	}

}