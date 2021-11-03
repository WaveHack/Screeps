import {Builder} from "../../Creep/Roles/Builder";
import {Upgrader} from "../../Creep/Roles/Upgrader";
import {Role} from "../../Creep/Roles/Role";
import {Harvester} from "../../Creep/Roles/Harvester";

export class SpawnManager {

    public static SpawnCreeps(): void {
        const spawn = Game.spawns['Spawn1'];

        if (spawn.spawning !== null) {
            return;
        }

        const builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
        const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
        const maintainers = _.filter(Game.creeps, creep => creep.memory.role === 'maintainer');
        const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');

        if (harvesters.length < 2) {
            return this.SpawnCreep(new Harvester());
        }

        if (builders.length < 3) {
            const sites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);

            if (sites.length > 0) {
                const newName = ('Builder' + Game.time);

                if (spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'builder', task: 'harvest', states: []}}) === OK) {
                    console.log(`INFO: Spawning new Builder: ${newName}`);
                    return;
                }
            }
        }

        if (maintainers.length < 2) {
            const newName = ('Maintainer' + Game.time);

            if (spawn.spawnCreep([WORK, CARRY, MOVE], newName,  {memory: {role: 'maintainer', task: 'harvest', states: []}}) === OK) {
                console.log(`INFO: Spawning new Maintainer: ${newName}`);
                return;
            }
        }

        if (upgraders.length < 5) {
            const newName = ('Upgrader' + Game.time);

            if (spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', task: 'harvest', states: []}}) === OK) {
                console.log(`INFO: Spawning new Upgrader: ${newName}`);
                return;
            }
        }
    }

    private static SpawnCreep(role: Role): void {
        const spawn = Game.spawns['Spawn1'];
        const name = (role.name + Game.time);

        const result = spawn.spawnCreep(role.body, name, {
            memory: {
                role: role.id,
                states: [role.initialState.id],
            }
        });

        if (result === OK) {
            console.log(`INFO: Spawning new ${role.name}: ${name}`);
        }
    }

}
