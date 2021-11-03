import {State} from "./State";
import {StateManager} from "../../Colony/Managers/StateManager";

export class DeliverEnergy implements State {

    public id: string = 'deliver_energy';

    public Tick(creep: Creep): void {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            return StateManager.PushState(creep, 'harvest_energy');
        }

        const eligibleTargets: StructureConstant[] = [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_CONTAINER,
        ];

        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => (
                eligibleTargets.includes(structure.structureType) &&
                ('store' in structure) &&
                (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
            )
        }).sort((a, b) => eligibleTargets.indexOf(a.structureType) - eligibleTargets.indexOf(b.structureType));

        if (targets.length === 0) {
            // todo: get rid of hardcoded spawn name
            const spawn = Game.spawns['Spawn1'];
            creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ff0000'}});
            return;
        }

        const target = targets[0];

        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }

}
