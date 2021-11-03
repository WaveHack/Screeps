import {Builder} from "../Roles/Builder";
import {Harvester} from "../Roles/Harvester";
import {Upgrader} from "../Roles/Upgrader";

export class SpawnManager {

    static spawn: StructureSpawn = Game.spawns['Spawn1'];

    static SpawnCreeps(): void {
        if (this.spawn.spawning) {
            return;
        }

        const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
        const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
        const builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');

        if (harvesters.length < 2) {
            const newName = ('Harvester' + Game.time);

            if (this.spawn.spawnCreep([WORK, CARRY, MOVE], newName,  {memory: {role: 'harvester', task: 'harvest'}}) === OK) {
                console.log(`Spawning new Harvester: ${newName}`);
                return;
            }
        }

        if (builders.length < 3) {
            const sites = this.spawn.room.find(FIND_MY_CONSTRUCTION_SITES);

            if (sites.length > 0) {
                const newName = ('Builder' + Game.time);

                if (this.spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'builder', task: 'harvest'}}) === OK) {
                    console.log(`Spawning new Builder: ${newName}`);
                    return;
                }
            }
        }

        if (upgraders.length < 6) {
            const newName = ('Upgrader' + Game.time);

            if (this.spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', task: 'harvest'}}) === OK) {
                console.log(`Spawning new Upgrader: ${newName}`);
                return;
            }
        }
    }

}
