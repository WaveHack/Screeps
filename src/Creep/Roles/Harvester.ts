export class Harvester {

    static Run(creep: Creep) {

        if ((creep.memory.task === 'harvest') && (creep.store.getFreeCapacity() === 0)) {
            creep.memory.task = 'deliver';
        }

        if ((creep.memory.task === 'deliver') && (creep.store[RESOURCE_ENERGY] === 0)) {
            creep.memory.task = 'harvest';
        }

        switch (creep.memory.task) {
            case 'harvest':
                const source = creep.pos.findClosestByPath(FIND_SOURCES);

                if (source === null) {
                    return;
                }

                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                break;

            case 'deliver':
                const targetPriority: StructureConstant[] = [
                    STRUCTURE_SPAWN,
                    STRUCTURE_EXTENSION,
                    STRUCTURE_CONTAINER,
                ];

                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: structure => {
                        return (
                            (structure instanceof StructureContainer) &&
                            targetPriority.includes(structure.structureType) &&
                            (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                        )
                    }
                }).sort((a, b) => targetPriority.indexOf(a.structureType) - targetPriority.indexOf(b.structureType));

                if (targets.length === 0) {
                    const spawn = Game.spawns['Spawn1'];
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ff0000'}});
                    return;
                }

                const target = targets[0];

                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                break;
        }
    }

}
