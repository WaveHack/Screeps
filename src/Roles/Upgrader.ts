export class Upgrader {

    static Run(creep: Creep) {

        if ((creep.memory.task === 'harvest') && (creep.store.getFreeCapacity() === 0)) {
            creep.memory.task = 'upgrade';
        }

        if ((creep.memory.task === 'upgrade') && (creep.store[RESOURCE_ENERGY] === 0)) {
            creep.memory.task = 'harvest';
        }

        switch (creep.memory.task) {
            case 'harvest':
                const targetSource = creep.pos.findClosestByPath(FIND_SOURCES);

                if (targetSource === null) {
                    return;
                }

                if (creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                break;

            case 'upgrade':
                const targetController = creep.room.controller;

                if (targetController !== undefined) {
                    if (creep.upgradeController(targetController) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetController, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                break;
        }
    }

}
