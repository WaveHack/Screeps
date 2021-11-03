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
                const sources = creep.room.find(FIND_SOURCES);
                const targetSource = sources[0];

                if (creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                break;

            case 'deliver':
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: structure => {
                        return (
                            ((structure.structureType === STRUCTURE_SPAWN) || (structure.structureType === STRUCTURE_EXTENSION))
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
