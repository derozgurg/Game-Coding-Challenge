import * as PIXI from "pixi.js"
import {AssetsPack} from '../../../config';
import Sprite = PIXI.Sprite;


class ForSale extends Sprite {

    title: string;
    price: string;

    constructor(title: string, price: string, enabled: boolean) {
        super(PIXI.utils.TextureCache[AssetsPack.Background.BusinessBuyLockedBack]);
        if (enabled) {
            this.texture = PIXI.utils.TextureCache[AssetsPack.Background.BusinessBuyBack];
        }

        this.title = title;
        this.price = price;
        this.setup();
    }

    setup() {
        let title = new PIXI.Text(this.title, {fontSize: 15, fill: 0x000000});
        title.x = (this.width - title.width) >> 1;
        title.y = (this.height - title.height * 2) >> 1;
        this.addChild(title);
        let price = new PIXI.Text(`$${this.price}`, {fontSize: 15, fill: 0x000000});
        price.x = (this.width - price.width) >> 1;
        price.y = title.y + title.height
        this.addChild(price);
    }
}

export default ForSale;

