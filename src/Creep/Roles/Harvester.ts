export class Harvester {

    public static Run(creep: Creep) {

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
                const eligibleTargets: StructureConstant[] = [
                    STRUCTURE_SPAWN,
                    STRUCTURE_EXTENSION,
                    STRUCTURE_CONTAINER,
                ];

                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: structure => (
                        eligibleTargets.includes(structure.structureType) &&
                        ('store' in structure) &&
                        (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    )
                }).sort((a, b) => eligibleTargets.indexOf(a.structureType) - eligibleTargets.indexOf(b.structureType));

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
