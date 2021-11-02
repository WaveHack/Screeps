export class Harvester {

    static Run(creep: Creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.room.find(FIND_SOURCES);
            const targetSource = sources[0];

            if (creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource);
            }
        } else {
            const targetSpawn = Game.spawns['Spawn1'];

            if (creep.transfer(targetSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSpawn);
            }
        }
    }

}
