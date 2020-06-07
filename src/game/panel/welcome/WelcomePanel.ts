import * as PIXI from "pixi.js"
import {GameContainer} from "../../../core/gamecore";
import {Container, Sprite} from "pixi.js-legacy";
import {AssetsPack, Managers} from "../../../config";
import {GameEvents} from "../../../provider/gameDataDefinations";

class WelcomePanel extends GameContainer {

    text:PIXI.Text;
    style = new PIXI.TextStyle({
        fontSize: 25,
        fill: "#240f02",
        fontStyle: "italic",
        align: "center",
        miterLimit: 0,
        breakWords:true,
    });

    closeButton: Sprite;

    constructor(text:string) {
        super();
        this.addChild(new Sprite(PIXI.utils.TextureCache[AssetsPack.Background.panelBack]));

        this.closeButton = new Sprite(PIXI.utils.TextureCache[AssetsPack.button.closeButton])
        this.closeButton.x = (this.width - this.closeButton.width) >> 1;
        this.closeButton.y = (this.height - this.closeButton.height) - 20;
        this.closeButton.interactive = true;
        this.addChild(this.closeButton);

        this.text = new PIXI.Text(text, this.style);
        this.text.canvas.width = this.width;
        this.text.x = (this.width - this.text.width) >> 1;
        this.text.y = 40
        this.addChild(this.text);
    }
}

export default WelcomePanel;