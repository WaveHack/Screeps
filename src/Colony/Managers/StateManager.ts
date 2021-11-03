import {Builder} from "../../Creep/Roles/Builder";
import {Harvester} from "../../Creep/Roles/Harvester";
import {Maintainer} from "../../Creep/Roles/Maintainer";
import {Upgrader} from "../../Creep/Roles/Upgrader";

export class StateManager {

    public static Tick(creep: Creep): void {
        switch (creep.memory.role) {
            case 'builder': Builder.Run(creep); break;
            case 'harvester': Harvester.Run(creep); break;
            case 'maintainer': Maintainer.Run(creep); break;
            case 'upgrader': Upgrader.Run(creep); break;
        }
    }

}
