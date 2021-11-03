import {State} from "./State";
import {StateManager} from "../../Colony/Managers/StateManager";

export class RepairStructure implements State {

    public id: string = 'repair_structure';

    public Tick(creep: Creep): void {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            return StateManager.PushState(creep, 'gather_energy');
        }

        const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => structure.hits < structure.hitsMax
        });

        if (structure === null) {
            return;
        }

        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

}
