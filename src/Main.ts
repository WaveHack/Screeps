import {Harvester} from "./Roles/Harvester";

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
    }

}
