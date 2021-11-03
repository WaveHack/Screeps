import {State} from "./State";
import {StateManager} from "../../Colony/Managers/StateManager";

export class HarvestEnergy implements State {

    public id: string = 'harvest_energy';

    public Tick(creep: Creep): void {
        if (creep.store.getFreeCapacity() === 0) {
            return StateManager.PopState(creep);
        }

        const source = creep.pos.findClosestByPath(FIND_SOURCES);

        if (source === null) {
            return;
        }

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffe56d'}});
        }
    }

}
