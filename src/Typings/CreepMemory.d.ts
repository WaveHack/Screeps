declare global {

    interface CreepMemory {
        role: string;
        /** @deprecated Refactor to 'states' */ task?: string;
        states: string[];
    }

}

export {}
