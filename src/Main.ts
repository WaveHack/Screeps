import {MemoryManager} from "./Colony/Managers/MemoryManager";
import {CreepManager} from "./Colony/Managers/CreepManager";
import {SpawnManager} from "./Colony/Managers/SpawnManager";

//noinspection JSUnusedGlobalSymbols
export function loop() {
    MemoryManager.CleanupInactiveCreeps();
    SpawnManager.SpawnCreeps();
    CreepManager.RunCreeps();
}
