export class MemoryManager {

    static CleanupInactiveCreeps(): void {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`Clearing non-existing creep memory: ${name}`);
            }
        }
    }

}
