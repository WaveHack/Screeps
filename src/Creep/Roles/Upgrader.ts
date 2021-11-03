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
                const source = creep.pos.findClosestByPath(FIND_SOURCES);

                if (source === null) {
                    return;
                }

                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
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
