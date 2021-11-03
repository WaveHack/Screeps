import {Builder} from "../Roles/Builder";
import {Harvester} from "../Roles/Harvester";
import {Upgrader} from "../Roles/Upgrader";

export class SpawnManager {

    static SpawnCreeps(): void {
        const spawn = Game.spawns['Spawn1'];

        if (spawn.spawning !== null) {
            return;
        }

        const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
        const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
        const builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');

        if (harvesters.length < 2) {
            const newName = ('Harvester' + Game.time);

            if (spawn.spawnCreep([WORK, CARRY, MOVE], newName,  {memory: {role: 'harvester', task: 'harvest'}}) === OK) {
                console.log(`Spawning new Harvester: ${newName}`);
                return;
            }
        }

        if (builders.length < 3) {
            const sites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);

            if (sites.length > 0) {
                const newName = ('Builder' + Game.time);

                if (spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'builder', task: 'harvest'}}) === OK) {
                    console.log(`Spawning new Builder: ${newName}`);
                    return;
                }
            }
        }

        if (upgraders.length < 5) {
            const newName = ('Upgrader' + Game.time);

            if (spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', task: 'harvest'}}) === OK) {
                console.log(`Spawning new Upgrader: ${newName}`);
                return;
            }
        }
    }

}
