import {State} from "./State";
import {StateManager} from "../../Colony/Managers/StateManager";

export class ConstructBuilding implements State {

    public id: string = 'construct_building';

    public Tick(creep: Creep): void {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            return StateManager.PushState(creep, 'gather_energy');
        }

        const sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

        if (sites.length === 0) {
            return;
        }

        // todo: sort by closest construction site in range?
        const site = sites[0];

        if (creep.build(site) == ERR_NOT_IN_RANGE) {
            creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

}
