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
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: structure => {
                        return (
                            (
                                (structure.structureType === STRUCTURE_SPAWN) ||
                                (structure.structureType === STRUCTURE_EXTENSION) ||
                                (structure.structureType === STRUCTURE_CONTAINER)
                            )
                            && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                        )
                    }
                })

                if (targets.length === 0) {
                    const spawn = Game.spawns['Spawn1'];
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ff0000'}});
                    return;
                }

                var target = targets[0];

                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                break;
        }
    }

}
