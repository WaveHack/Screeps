import {State} from "./State";
import {StateManager} from "../../Colony/Managers/StateManager";

export class GatherEnergy implements State {

    public id: string = 'gather_energy';

    public Tick(creep: Creep): void {
        if (creep.store.getFreeCapacity() === 0) {
            return StateManager.PopState(creep);
        }

        const eligibleStructures: StructureConstant[] = [
            STRUCTURE_CONTAINER,
        ];

        const source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => (
                eligibleStructures.includes(structure.structureType) &&
                ('store' in structure) &&
                (structure.store[RESOURCE_ENERGY] > 0)
            )
        });

        // No more free energy in containers. Harvest some instead!
        if (source === null) {
            return;
            // return StateManager.PushState(creep, 'harvest_energy');
        }

        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffe56d'}});
        }
    }

}
