import {Builder} from "../../Creep/Roles/Builder";
import {Upgrader} from "../../Creep/Roles/Upgrader";
import {Role} from "../../Creep/Roles/Role";
import {Harvester} from "../../Creep/Roles/Harvester";
import {Maintainer} from "../../Creep/Roles/Maintainer";

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

        if (harvesters.length < 4) {
            return this.SpawnCreep(new Harvester());
        }

        if (builders.length < 3) {
            const sites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);

            if (sites.length > 0) {
                return this.SpawnCreep(new Builder());
            }
        }

        if (maintainers.length < 2) {
            return this.SpawnCreep(new Maintainer());
        }

        if (upgraders.length < 5) {
            return this.SpawnCreep(new Upgrader());
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
