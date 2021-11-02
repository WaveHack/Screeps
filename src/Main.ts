import {Harvester} from "./Roles/Harvester";
import {Upgrader} from "./Roles/Upgrader";

//noinspection JSUnusedGlobalSymbols
export function loop() {

    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log(`Clearing non-existing creep memory: ${name}`);
        }
    }

    const spawn = Game.spawns['Spawn1'];

    const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
    const upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');

    if (!spawn.spawning) {
        if (harvesters.length < 2) {
            const newName = ('Harvester' + Game.time);
            console.log(`Spawning new Harvester: ${newName}`);
            spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
        }

        if (upgraders.length < 5) {
            const newName = ('Upgrader' + Game.time);
            console.log(`Spawning new Upgrader: ${newName}`);
            spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader'}});
        }
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        if (creep.memory.role === 'harvester') {
            Harvester.Run(creep);
        }

        if (creep.memory.role === 'upgrader') {
            Upgrader.Run(creep);
        }
    }

}
