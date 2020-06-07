import * as PIXI from "pixi.js"
import { AssetsPack } from '../../../config';

class TimeBar extends PIXI.Sprite {
    _process: number
    mask: PIXI.Graphics;

    constructor(process: number = 0) {
        super(PIXI.utils.TextureCache[AssetsPack.Background.TimeBar]);
        this._process = process;
        this.setup();
    }

    setup() {
        this.mask = new PIXI.Graphics();
        this.mask.beginFill(0x555555);
        this.mask.drawRect(0, 0, this.width * this.process, this.height);
        this.mask.endFill();
        this.addChild(this.mask);
    }

    set process(value: number) {
        this._process = value > 1 ? 1 : value;
        this.mask.clear();
        this.mask.beginFill(0x555555);
        this.mask.drawRect(0, 0, this.width * this.process, this.height);
        this.mask.endFill();
    }

    get process(): number {
        return this._process;
    }
}

export default TimeBar;

