import * as PIXI from "pixi.js"
import {AssetsPack} from '../../../config';
import Sprite = PIXI.Sprite;


class Time extends PIXI.Text {

    constructor(text:string) {
        super(text, {fontSize: 15, fontWeight: "bold", fill: 0x000000});
    }
}

export default Time;

