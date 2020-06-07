import * as PIXI from "pixi.js"
import {AssetsPack} from '../../../config';
import Sprite = PIXI.Sprite;


class ProceedButton extends Sprite {

    incomeText: PIXI.Text;
    countText:PIXI.Text;

    constructor() {
        super(PIXI.utils.TextureCache[AssetsPack.button.proceedButton]);
        this.setup();
    }

    setup() {
        this.countText =  new PIXI.Text('      ', {fontSize: 15, align: 'center', fontWeight: "bold", fill: 0x000000});
        this.countText.x = -50;
        this.countText.y = (this.height - this.countText.height) >> 1;
        this.addChild(this.countText);

        this.incomeText = new PIXI.Text('', {fontSize: 15, align: 'center', fontWeight: "bold", fill: 0x000000});
        this.incomeText.x = 5;
        this.incomeText.y = (this.height - this.incomeText.height) >> 1;
        this.addChild(this.incomeText);
    }
}

export default ProceedButton;

