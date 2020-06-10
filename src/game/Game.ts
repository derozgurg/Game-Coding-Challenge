import BusinessContent from "./bussiness/components/BusinessContent";
import * as PIXI from "pixi.js"
import {AssetsPack, BusinessConfig, STAGE_SIZE} from '../config';
import App from '../app';
import GameInfoPanel from "./panel/GameInfoPanel";
import gameProvider from "../provider/gameProvider";
import Texture = PIXI.Texture;
import Sprite = PIXI.Sprite;
import EventEmitter = PIXI.utils.EventEmitter;
import Container = PIXI.Container;
import {GameContainer} from "../core/gamecore";
import Business from "./bussiness/Business";
import ManagerPanel from "./panel/manager/ManagerPanel";
import {GameEvents, GameState, ManagerData} from "../provider/gameDataDefinations";
import WelcomePanel from "./panel/welcome/WelcomePanel";

//todo I would separate game scene from game logic
class Game {
    stage: PIXI.Container;
    businessHolder: PIXI.Container;
    infoPanel: GameInfoPanel;
    businesses: Array<Business> = [];

    constructor(app: App) {
        this.stage = app.pixiApp.stage;
        this.stage.addChild(new Sprite(PIXI.utils.TextureCache[AssetsPack.Background.background]));
        this.setup();
    }

    setup() {
        this.setupInfoPanel();
        this.setupBusinessHolder();
    }

    start() {
        const that = this;

        const doStart = () => {
            for (let business of that.businesses) {
                gameProvider.start();
                business.start();
            }

            gameProvider.addListener(GameEvents.STATE_CHANGED, that.onGameStateUpdated.bind(that));
            console.log('Game started...');
        }

        if (gameProvider.state.managers && gameProvider.state.managers.length > 0) {
            let totalIncome = 0;
            for (let manager of gameProvider.state.managers) {
                for (let business of this.businesses) {
                    if (manager.business == business.data.id) {
                        if (business.state.owned) {
                            const elapsedTime = new Date().getTime() - gameProvider.state.time;
                            const incomeDuration = business.data.levels[business.state.level].incomeDuration;
                            const income = business.state.income;
                            totalIncome += Math.floor(elapsedTime / incomeDuration) * income;
                        }
                    }
                }
            }

            gameProvider.setState({cash: gameProvider.state.cash + totalIncome});

            const welcomePanel = new WelcomePanel(`When you are away.\n your managers made \n$${totalIncome}`);
            welcomePanel.x = (this.stage.width - welcomePanel.width) /2 ;
            welcomePanel.y = 150;
            welcomePanel.closeButton.interactive= true;

            welcomePanel.closeButton.on('click',()=>{
                welcomePanel.removeAllListeners();
                that.stage.removeChild(welcomePanel);
                doStart();
            });
            this.stage.addChild(welcomePanel);
        }else{
            doStart();
        }
    }

    setupInfoPanel() {
        this.infoPanel = new GameInfoPanel(gameProvider.state.cash, this.stage.width);
        this.infoPanel.y = 40;
        this.stage.addChild(this.infoPanel);

        const managersButton = new Sprite(PIXI.utils.TextureCache[AssetsPack.button.managersButton]);
        managersButton.name = 'managerButton';
        managersButton.x = (this.stage.width - managersButton.width) / 2;
        managersButton.y = 60 + this.infoPanel.height
        managersButton.interactive = true;
        managersButton.addListener('click', this.handleOnManagersClick.bind(this));
        this.stage.addChild(managersButton);
    }

    setupBusinessHolder() {
        const marginX = 60;
        const marginY = 35;
        this.businessHolder = new PIXI.Container();

        for (let i = 0; i < BusinessConfig.length; i++) {
            const businessData = BusinessConfig[i];

            const business = new Business(businessData);
            const businessState = gameProvider.state.businesses[business.data.id];
            business.setState(businessState);
            business.y = i * (business.height + marginY);
            if (i > 1) {
                business.y = (i - 2) * (business.height + marginY);
                business.x = marginX + business.width;
            }

            this.businessHolder.addChild(business);
            this.businesses.push(business);
            business.addListener(GameEvents.BUSINESS_BUY_REQUEST, this.handleBusinessBuyRequest.bind(this));
            business.addListener(GameEvents.BUSINESS_PROCEED_REQUEST, this.handleBusinessProceedRequest.bind(this));
            business.addListener(GameEvents.BUSINESS_INCOME, this.handleBusinessIncome.bind(this));
            business.addListener(GameEvents.BUSINESS_UPGRADE_REQUEST, this.handleUpgradeBusinessRequest.bind(this));
        }

        this.businessHolder.x = (720 - this.businessHolder.width) / 2;
        this.businessHolder.y = 220;
        this.stage.addChild(this.businessHolder);
    }

    getBusinessById(id: string): Business {
        //todo Array.find
        const index = this.businesses.map(business => business.data.id).indexOf(id);
        return this.businesses[index];
    }

    handleBusinessBuyRequest(business: Business) {
        //todo purchase comfirmation
        const cash = gameProvider.state.cash;
        gameProvider.setBusinessState(business.data.id, {
            level: 0,
            income: business.data.income,
            upgradePrice: business.data.upgradePrice,
            count: 1,
            owned: true
        });

        gameProvider.setState({cash: cash - business.data.price});
        business.removeAllListeners(GameEvents.BUSINESS_BUY_REQUEST);
    }

    handleBusinessIncome(business: Business) {
        const cash = gameProvider.state.cash + business.state.income;
        gameProvider.setState({cash});
        if (gameProvider.hasManager(business.data.id)) {
            this.handleBusinessProceedRequest(business);
        }
    }

    handleBusinessProceedRequest(business: Business) {
        if (business.state.inProgress) {
            return;
        }
        business.startProcess();
    }

    handleOnManagersClick() {
        if (!this.stage.getChildByName(ManagerPanel.NAME)) {
            const managerPanel = new ManagerPanel();
            managerPanel.x = (this.stage.width - managerPanel.width) / 2;
            managerPanel.y = 150;
            managerPanel.addListener(GameEvents.MANAGER_HIRE_REQUEST, this.handleManagerHireRequest.bind(this));
            managerPanel.closeButton.addListener('click', this.handleCloseManagers.bind(this));
            this.stage.addChild(managerPanel);
        }
    }

    handleCloseManagers() {
        const managerPanel = this.stage.getChildByName(ManagerPanel.NAME)
        managerPanel.removeAllListeners();
        this.stage.removeChild(managerPanel);
    }

    //todo in game alert box
    handleManagerHireRequest(manager: ManagerData) {
        //todo already hired managers should not be shown in the panel.
        if (gameProvider.hasManager(manager.business)) {
            return alert('You have already hired this manager.');
        }

        if (!this.getBusinessById(manager.business).state.owned) {
            return alert('You must buy this business before hire a manager for it.');
        }

        //todo if user don't have enough money managers should be disabled.
        if (manager.hireCost > gameProvider.state.cash) {
            return alert('You have not enough cash to hire this manager.');
        }

        gameProvider.hireManager(manager);
        const business = this.getBusinessById(manager.business);
        business.startProcess();
        this.handleCloseManagers();
    }

    handleUpgradeBusinessRequest(business: Business) {

        const {upgradePrice} = business.state

        if (gameProvider.state.cash < upgradePrice) {
            return alert('You have not enough cash to buy new upgrade.');
        }
        let level = business.state.level;

        const upgradeOdd = business.state.upgradeOdd || business.data.firstUpgradeOdd;

        const newUpgradePrice = upgradePrice + upgradeOdd;
        const levelConfig = business.data.levels[level]
        let upgradeFraction = business.state.upgradeOddFraction;

        const newUpgradeOdd = +upgradeOdd + upgradeFraction;

        if (Number.isInteger(levelConfig.addPeriod / business.state.count)) {
            upgradeFraction += newUpgradeOdd;
        }
        let count = business.state.count + 1;

        if (count >= levelConfig.total) {
            if(level+1 < business.data.levels.length){
                level++;
            }else{
                return alert('You have finished the business (there is no more level for this business)');
            }
        }

        gameProvider.setBusinessState(business.data.id, {
            count: count,
            income: count * business.data.income,
            level: level,
            upgradeOdd: newUpgradeOdd,
            upgradeOddFraction: upgradeFraction,
            upgradePrice: Number(newUpgradePrice.toFixed(2))
        });

        gameProvider.setState({cash: gameProvider.state.cash - upgradePrice});
    }

    //todo I would use some action name or reducer to optimize process of update components.
    //todo I may try to use some kind of subscription pattern instead of using update
    onGameStateUpdated(state: GameState) {
        this.infoPanel.setState({cash: state.cash});

        for (let business of this.businesses) {
            if (!business.state.owned && !business.state.enabledForSale) {
                if (state.cash >= business.data.price) {
                    gameProvider.setBusinessState(business.data.id, {enabledForSale: true});
                }
            }
        }
    }
}

export default Game;
