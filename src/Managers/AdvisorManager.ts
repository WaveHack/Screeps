import {AbstractManager} from "./AbstractManager";

export class AdvisorManager extends AbstractManager {

    static init(): void {
        console.log('AdvisorManager.init');
    }

    static tick(): void {
        console.log('AdvisorManager.tick');
    }

}
