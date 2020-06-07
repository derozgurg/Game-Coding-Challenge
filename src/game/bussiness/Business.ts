import * as PIXI from "pixi.js"
import BusinessContent from "./components/BusinessContent";
import gameProvider from "../../provider/gameProvider";
import moment = require("moment");
import Game from "../Game";
import {BusinessState, GameEvents} from "../../provider/gameDataDefinations";
import BusinessTimer from "./BusinessTimer";

interface Business {
    state: BusinessState
}


class Business extends BusinessContent implements Business {
    timer = new BusinessTimer();

    constructor(businessConfig: any) {
        super(businessConfig);
        this.setState({});

    }

    start() {
        gameProvider.addListener(GameEvents.BUSINESS_STATE_CHANGED, this.handleGameBusinessChanged.bind(this));
        if (this.state.inProgress) {
            this.startProcess(this.state.remainingTime);
        }
        this.started = true;
    }

    startProcess(remainingTime?: number) {
        const incomeDuration = this.data.levels[this.state.level].incomeDuration;
        gameProvider.setBusinessState(this.data.id, {inProgress: true, remainingTime: incomeDuration});

        const that = this;
        this.timer.start((remainingTime: number) => {
                gameProvider.setBusinessState(this.data.id, {remainingTime});
            },
            50,
            incomeDuration,
            () => {
                gameProvider.setBusinessState(this.data.id, {inProgress: false});
                this.emit(GameEvents.BUSINESS_INCOME, that);
            }, remainingTime);
    }

    handleGameBusinessChanged(businessState: BusinessState) {
        if (businessState.id === this.data.id) {
            this.setState(businessState);
        }
    }

    onRenderRequest(oldState: BusinessState, newState: BusinessState) {

        if (!oldState.owned) {
            if (this.state.owned) {
                this.setOwnedMode();
            } else {
                this.setForSaleMode(this.state.enabledForSale);
            }
        }

        if (oldState.level != newState.level && this.state.level) {
            this.proceedButton.incomeText.text = this.data.levels[this.state.level].income;
        }

        if (this.state.inProgress) {
            const {remainingTime} = this.state;
            const duration = moment.duration(remainingTime);
            const h = "0" + duration.hours();
            const m = "0" + duration.minutes();
            const s = "0" + duration.seconds();
            this.time.text = `${h.substr(-2)}:${m.substr(-2)}:${s.substr(-2)}`;
            const incomeDuration = this.data.levels[this.state.level].incomeDuration;
            this.bar.process = ((incomeDuration - remainingTime) / incomeDuration) - .01;
        }

        if (oldState.inProgress && !newState.inProgress) {
            this.bar.process = 0;
        }

        if (oldState.income != newState.income) {
            this.proceedButton.incomeText.text = '$' + this.state.income;
        }

        if (oldState.count != newState.count) {
            this.proceedButton.countText.text = this.state.count + '/' + this.data.levels[this.state.level].total;
        }

        if (oldState.upgradePrice != newState.upgradePrice) {
            this.upgradeButton.text.text = 'BUY $' + this.state.upgradePrice;
        }
    }
}

export default Business;