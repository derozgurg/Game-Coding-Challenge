import * as PIXI from "pixi.js"
import TimeBar from './TimeBar';
import {AssetsPack} from "../../../config";
import BuyUpgradeButton from './BuyUpgradeButton';
import Container = PIXI.Container;
import {GameContainer} from "../../../core/gamecore";
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import ForSale from "./ForSale";
import ProceedButton from "./ProceedButton";
import Time from "./Time";
import {GameEvents} from "../../../provider/gameDataDefinations";

class BusinessContent extends GameContainer {
    businessBack: Sprite;
    forSale: ForSale;
    bar: TimeBar;
    data: any;
    upgradeButton: BuyUpgradeButton;
    proceedButton: ProceedButton;
    started: boolean;
    time:Time;

    constructor(businessConfig: any) {
        super();

        this.data = businessConfig;
        this.setup();
    }

    setup() {
        this.businessBack = new Sprite(PIXI.utils.TextureCache[AssetsPack.Background.BusinessHolder]);
        this.bar = new TimeBar(0);
        this.bar.x = 84;
        this.bar.y = 32;

        this.upgradeButton = new BuyUpgradeButton();
        this.upgradeButton.x = 83;
        this.upgradeButton.y = 77;

        this.proceedButton = new ProceedButton();
        this.proceedButton.x = 84;
        this.proceedButton.y = 32;

        this.time = new Time('00:00:00');
        this.time.x = 243;
        this.time.y = 39;
    }

    setOwnedMode() {

        this.addChild(this.businessBack);
        this.addChild(this.proceedButton);
        this.addChild(this.bar);
        this.addChild(this.upgradeButton);
        this.addChild(this.time);
        this.removeChild(this.forSale);
        this.forSale.removeAllListeners();
        this.forSale = null;

        if (this.state.hasOwnProperty('level')) {
            this.proceedButton.incomeText.text = this.data.levels[this.state.level].income;
        }

        this.proceedButton.interactive = true;
        this.proceedButton.addListener('click', this.handlerOnClickProceed.bind(this));

        this.upgradeButton.interactive = true;
        this.upgradeButton.addListener('click', this.handlerOnClickUpgrade.bind(this));
    }

    setForSaleMode(enabled: boolean = false) {

        this.forSale = new ForSale(this.data.id, this.data.price, enabled);
        this.removeChildren();
        this.removeChild(this.businessBack);
        this.removeChild(this.bar);
        this.removeChild(this.upgradeButton);
        this.addChild(this.forSale);

        if (enabled) {
            this.forSale.interactive = true;
            this.forSale.addListener('click', this.handlerOnClickBuy.bind(this));

        }
    }

    handlerOnClickBuy() {
        this.emit(GameEvents.BUSINESS_BUY_REQUEST, this);
    }

    handlerOnClickProceed() {
        this.emit(GameEvents.BUSINESS_PROCEED_REQUEST, this);
    }
    handlerOnClickUpgrade() {
        this.emit(GameEvents.BUSINESS_UPGRADE_REQUEST, this);
    }
}

export default BusinessContent