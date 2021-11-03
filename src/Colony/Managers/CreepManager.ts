import {StateManager} from "./StateManager";

export class CreepManager {

    static RunCreeps(): void {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];

            StateManager.Tick(creep);
        }
    }

}
