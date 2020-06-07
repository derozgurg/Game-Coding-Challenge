import * as PIXI from 'pixi.js-legacy'
import { AssetsPack, STAGE_SIZE } from './config';

class App {
    private static app:App;
    pixiApp: PIXI.Application;
    frameEvents: Array<Function> = [];

    constructor(pixiApp:PIXI.Application){
        this.pixiApp = pixiApp;
        this.start();
    }

    start(){
        this.pixiApp.ticker.add(() => {
            for(let onFrame of this.frameEvents){
                onFrame(onFrame);
            }
        });
    }

    static getApp(): Promise<App | undefined> {
        if (this.app) {
            return Promise.resolve(this.app);
        }
        return new Promise((resolve, reject) => {
            let type = "WebGL"
            if(!PIXI.utils.isWebGLSupported()){
                type = "Canvas";
            }

            PIXI.utils.sayHello(type);

            const pixiApp = new PIXI.Application({
                width: STAGE_SIZE.width,
                antialias: true,
                height: STAGE_SIZE.height,
            });

            pixiApp.renderer.backgroundColor = 0xFFFFFF;

            window.document.addEventListener('DOMContentLoaded', () => {
                window.document.body.appendChild(pixiApp.view);
                const loader = PIXI.Loader.shared;
                let assets: any = [];
                Object.values(AssetsPack).forEach(x => {
                    Object.values(x).forEach(asset => {
                        if (!assets.includes(asset)) {
                            assets.push(asset);
                            loader.add(asset);
                        }
                    });
                });

                loader.load(() => {
                    this.app = new App(pixiApp);
                    resolve(this.app);
                });
            });
        });
    }

    addFrame(frameCall: Function) {
        this.frameEvents.push(frameCall)
    }
}

export default App;
