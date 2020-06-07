import * as PIXI from "pixi.js"
import {GameContainer} from "../../../core/gamecore";
import {Sprite} from "pixi.js-legacy";
import {AssetsPack} from "../../../config";

class ManagerItem extends GameContainer {
    closeButton: Sprite;

    style = new PIXI.TextStyle({
        fontSize: 25,
        fill: "#240f02",
        fontStyle: "italic",
        align: "left",
        miterLimit: 0,
    });

    constructor(manager: any) {
        super();

        const hireButton = new Sprite(PIXI.utils.TextureCache[AssetsPack.button.hireButton]);
        this.name = manager.name;

        const managerTitle = new PIXI.Text(manager.name, this.style);
        managerTitle.x = hireButton.width + 20;
        const managerDescription = new PIXI.Text(manager.description + ' $' + manager.hireCost, {
            ...this.style,
            fontSize: 15
        });
        managerDescription.y = managerTitle.height;
        managerDescription.x = managerTitle.x;

        this.addChild(managerTitle);
        this.addChild(managerDescription);
        hireButton.y = (this.height - hireButton.height)/2;
        this.addChild(hireButton);
    }
}

export default ManagerItem;