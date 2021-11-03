export class Builder {

    static Run(creep: Creep) {

        if ((creep.memory.task === 'harvest') && (creep.store.getFreeCapacity() === 0)) {
            creep.memory.task = 'build';
        }

        if ((creep.memory.task === 'build') && (creep.store[RESOURCE_ENERGY] === 0)) {
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

            case 'build':
                const sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

                if (sites.length === 0) {
                    return;
                }

                const targetSite = sites[0];

                if (creep.build(targetSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSite, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                break;
        }
    }

}