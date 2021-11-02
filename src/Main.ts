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
