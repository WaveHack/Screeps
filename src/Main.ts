import {GameManager} from "./Managers/GameManager";

GameManager.init();

//noinspection JSUnusedGlobalSymbols
export function loop() {
    GameManager.tick();
}
