import App from './app';
import * as PIXI from "pixi.js"
import Game from './game/Game';

(async () => {
    const game = new Game(await App.getApp());
    game.start();
})()




