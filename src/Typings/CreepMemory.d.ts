declare global {

    interface CreepMemory {
        role: string;
        /** @deprecated Refactor to 'state' */ task: string;
        state: string;
    }

}

export {}
