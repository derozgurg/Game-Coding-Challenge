import * as PIXI from "pixi.js"
import {AssetsPack} from '../../../config';

class BuyUpgradeButton extends PIXI.Sprite {

    text: PIXI.Text

    constructor(process: number = 0) {
        super(PIXI.utils.TextureCache[AssetsPack.button.upgradeButton]);
        this.setup();
    }

    setup() {
        this.text = new PIXI.Text('BUY $0', {fontSize: 15, fontWeight: 'bold', fill: 0x000000});
        this.text.x = 10;
        this.text.y = 5;
        this.addChild(this.text);
    }
}

export default BuyUpgradeButton;

