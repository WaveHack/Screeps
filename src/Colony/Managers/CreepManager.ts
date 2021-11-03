import {Builder} from "../../Creep/Roles/Builder";
import {Harvester} from "../../Creep/Roles/Harvester";
import {Upgrader} from "../../Creep/Roles/Upgrader";

export class CreepManager {

    static RunCreeps(): void {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];

            if (creep.memory.role === 'builder') {
                Builder.Run(creep);
            }

            if (creep.memory.role === 'harvester') {
                Harvester.Run(creep);
            }

            if (creep.memory.role === 'upgrader') {
                Upgrader.Run(creep);
            }
        }
    }

}
