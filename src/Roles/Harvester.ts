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
                const targetSpawn = Game.spawns['Spawn1'];

                // if (targetSpawn.store[RESOURCE_ENERGY] < targetSpawn.store.getCapacity(RESOURCE_ENERGY)) {
                    if (creep.transfer(targetSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetSpawn, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                // }
                break;
        }
    }

}
