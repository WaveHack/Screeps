export class MemoryManager {

    public static CleanupInactiveCreeps(): void {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`DEBUG: Clearing non-existing creep memory: ${name}`);
            }
        }
    }

}
