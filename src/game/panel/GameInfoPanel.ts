import * as PIXI from "pixi.js"
import Container = PIXI.Container;
import {GameContainer} from "../../core/gamecore";
import Sprite = PIXI.Sprite;
import gameProvider from "../../provider/gameProvider";

class GameInfoPanel extends GameContainer {
    text: PIXI.Text;
    style = new PIXI.TextStyle({
        fontSize: 30,
        dropShadow: true,
        dropShadowBlur: -9,
        dropShadowColor: "#ffd8d1",
        dropShadowDistance: 0,
        fill: "#ff7b00",
        fontStyle: "italic",
        fontWeight: "bold",
        letterSpacing: 2,
        miterLimit: 0,
        align: 'center',
        stroke: "#802700",
        strokeThickness: 5
    });

    _width: number

    constructor(cash: number, _width: number) {
        super();
        this.text = new PIXI.Text('$' + cash.toFixed(2), this.style)
        this.addChild(this.text);
        this._width = _width;
        this.text.x = (this._width - this.text.width) / 2;
    }

    onRenderRequest(oldState: any, newState: any) {
        this.text.text = `$${this.state?.cash.toFixed(2)}`;
        this.text.x = (this._width - this.text.width) / 2;
    }
}

export default GameInfoPanel