import * as PIXI from "pixi.js"
import Container = PIXI.Container;
import App from "../app";
import Game from "../game/Game";

export type GameCell = {
    state?: any;
    setState?(state: any): void;
    getState?(): any;
    onFrame?(): void;
    setup?(): void;
    onRenderRequest?(oldState: any, newState: any): void;
}

export class GameContainer extends Container implements GameCell {
    state: any = {}

    start(app:App) {
        app.addFrame(this.onFrame.bind(this));
    }

    onFrame() {

    }

    onRenderRequest(oldState: any, newState: any) {
    }

    setState(state: any): void {
        const oldState = {...this.state};

        if (state != undefined && state) {
            this.state = Object.assign(this.state, state);
        }

        this.onRenderRequest(oldState, this.state);
    }

    getState(): any {
        return this.state;
    }
}