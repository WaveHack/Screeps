import {MemoryManager} from "./Colony/Managers/MemoryManager";
import {CreepManager} from "./Colony/Managers/CreepManager";
import {SpawnManager} from "./Colony/Managers/SpawnManager";
import {StateManager} from "./Colony/Managers/StateManager";

//noinspection JSUnusedGlobalSymbols
export function loop() {
    StateManager.Init();
    MemoryManager.CleanupInactiveCreeps();
    SpawnManager.SpawnCreeps();
    CreepManager.RunCreeps();
}
