import * as PIXI from "pixi.js"
import EventEmitter = PIXI.utils.EventEmitter;
import {GAME_SAVE_TIME} from "../config";
import {BusinessState, GameEvents, GameState, ManagerData} from "./gameDataDefinations";


const initialState: GameState = {
    cash: 0,
    time: 0,
    managers: [],
    businesses: {
        hot_dog: {
            id: 'hot_dog',
            owned: true,
            level: 0,
            income: 1,
            count: 1,
            upgradeOdd:0.28,
            upgradeOddFraction:0.02,
            upgradePrice: 4
        }
    }
}

//todo I would implement some kind of reducer method to optimize the state management
class GameProvider extends EventEmitter {
    state: GameState;

    constructor() {
        super();
        const data = localStorage.getItem('game')
        this.state = data ? JSON.parse(data) : initialState;
        console.log(this.state);
    }

    start() {
        setInterval(() => {
            this.state.time = new Date().getTime();
            localStorage.setItem('game', JSON.stringify(this.state));
        }, GAME_SAVE_TIME);
    }

    setState(state: GameState) {
        this.state = Object.assign(this.state, state);
        this.emit(GameEvents.STATE_CHANGED, this.state);
    }

    setBusinessState(id: string, businessState: BusinessState) {
        const currentBusinnessState = this.state.businesses[id] || {};
        this.state.businesses[id] = Object.assign(currentBusinnessState, businessState);
        this.emit(GameEvents.BUSINESS_STATE_CHANGED, {id, ...this.state.businesses[id]});
    }

    hasManager(business: string) {
        if (!this.state.managers || this.state.managers.length == 0) {
            return false;
        }

        return this.state.managers.map(manager=>manager.business).includes(business);
    }

    hireManager(manager:ManagerData){
        if(!this.state.managers){
            this.state.managers = [];
        }

        this.state.managers.push({business:manager.business});
        this.setState({cash:this.state.cash-manager.hireCost});
    }


}

export default new GameProvider();
