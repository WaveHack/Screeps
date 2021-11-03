import {Builder} from "../../Creep/Roles/Builder";
import {Harvester} from "../../Creep/Roles/Harvester";
import {Upgrader} from "../../Creep/Roles/Upgrader";

export class SpawnManager {

    static SpawnCreeps(): void {
        const spawn = Game.spawns['Spawn1'];

        if (spawn.spawning !== null) {
            return;
        }

        const builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
        const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
        const maintainers = _.filter(Game.creeps, creep => creep.memory.role === 'maintainer');
        const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');

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

        if (maintainers.length < 2) {
            const newName = ('Maintainer' + Game.time);

            if (spawn.spawnCreep([WORK, CARRY, MOVE], newName,  {memory: {role: 'maintainer', task: 'harvest'}}) === OK) {
                console.log(`Spawning new Maintainer: ${newName}`);
                return;
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
