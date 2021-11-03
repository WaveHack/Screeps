import {Builder} from "../../Creep/Roles/Builder";
import {Harvester} from "../../Creep/Roles/Harvester";
import {Upgrader} from "../../Creep/Roles/Upgrader";
import {Maintainer} from "../../Creep/Roles/Maintainer";

export class CreepManager {

    static RunCreeps(): void {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];

            switch (creep.memory.role) {
                case 'builder': Builder.Run(creep); break;
                case 'harvester': Harvester.Run(creep); break;
                case 'maintainer': Maintainer.Run(creep); break;
                case 'upgrader': Upgrader.Run(creep); break;
            }
        }
    }

}
