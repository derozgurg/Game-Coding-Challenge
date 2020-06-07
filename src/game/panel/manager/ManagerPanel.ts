import * as PIXI from "pixi.js"
import {GameContainer} from "../../../core/gamecore";
import {Container, Sprite} from "pixi.js-legacy";
import {AssetsPack, Managers} from "../../../config";
import ManagerItem from "./ManagerItem";
import {GameEvents} from "../../../provider/gameDataDefinations";

class ManagerPanel extends GameContainer {
    public static NAME = 'ManagerPanel';


    closeButton: Sprite;

    constructor() {
        super();
        this.name = ManagerPanel.NAME;
        this.addChild(new Sprite(PIXI.utils.TextureCache[AssetsPack.Background.panelBack]));
        this.setup();
    }

    setup() {
        this.closeButton = new Sprite(PIXI.utils.TextureCache[AssetsPack.button.closeButton])
        this.closeButton.x = (this.width - this.closeButton.width) >> 1;
        this.closeButton.y = (this.height - this.closeButton.height) - 20;
        this.closeButton.interactive = true;
        this.addChild(this.closeButton);

        const list = new Container();
        list.x = 25;
        list.y = 20;
        this.addChild(list);
        const that = this;
        let i = 0;

        for (let manager of Managers) {
            const managerItem = new ManagerItem(manager);
            managerItem.interactive = true;
            managerItem.y = (managerItem.height + 20) * i;
            managerItem.on('click', () => {
                that.emit(GameEvents.MANAGER_HIRE_REQUEST, manager);
            });
            list.addChild(managerItem);
            i++;
        }
    }
}

export default ManagerPanel;