import {AbstractManager} from "./AbstractManager";
import {AdvisorManager} from "./AdvisorManager";

export class GameManager extends AbstractManager {

    static init(): void {
        console.log('GameManager.init');

        AdvisorManager.init();
    }

    static tick(): void {
        console.log('GameManager.tick');

        AdvisorManager.tick();
    }

}
