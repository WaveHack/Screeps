import {State} from "./State";
import {StateManager} from "../../Colony/Managers/StateManager";

export class UpgradeController implements State {

    public id: string = 'upgrade_controller';

    public Tick(creep: Creep): void {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            return StateManager.PushState(creep, 'harvest_energy');
        }

        const targetController = creep.room.controller;

        if (targetController === undefined) {
            return;
        }

        if (creep.upgradeController(targetController) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetController, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

}
