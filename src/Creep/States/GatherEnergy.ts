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

        if (source === null) {
            // Use remaining energy
            if (creep.store[RESOURCE_ENERGY] > 0) {
                return StateManager.PopState(creep);
            }

            const flag = Game.flags['Parking'];

            if (flag !== null) {
                if (!creep.pos.inRangeTo(flag, 1)) {
                    creep.moveTo(Game.flags['Parking']);
                }
            }

            return;
            //return StateManager.PushState(creep, 'harvest_energy');
        }

        if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffe56d'}});
        }
    }

}
