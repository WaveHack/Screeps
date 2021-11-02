export class Upgrader {

    static Run(creep: Creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            const targetSource = sources[0];

            if (creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource);
            }
        } else {
            const targetController = creep.room.controller;

            if (targetController !== undefined) {
                if (creep.upgradeController(targetController) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetController);
                }
            }
        }
    }

}
