export class Maintainer {

    public static Run(creep: Creep) {

        if ((creep.memory.task === 'harvest') && (creep.store.getFreeCapacity() === 0)) {
            creep.memory.task = 'repair';
        }

        if ((creep.memory.task === 'repair') && (creep.store[RESOURCE_ENERGY] === 0)) {
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

            case 'repair':
                const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => structure.hits < structure.hitsMax
                });

                if (structure === null) {
                    return;
                }

                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                break;
        }
    }

}
