import {MemoryManager} from "./Managers/MemoryManager";
import {CreepManager} from "./Managers/CreepManager";
import {SpawnManager} from "./Managers/SpawnManager";

//noinspection JSUnusedGlobalSymbols
export function loop() {
    MemoryManager.CleanupInactiveCreeps();
    SpawnManager.SpawnCreeps();
    CreepManager.RunCreeps();
}
