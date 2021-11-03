import {Builder} from "../../Creep/Roles/Builder";
import {Harvester} from "../../Creep/Roles/Harvester";
import {Maintainer} from "../../Creep/Roles/Maintainer";
import {Upgrader} from "../../Creep/Roles/Upgrader";
import {State} from "../../Creep/States/State";
import {HarvestEnergy} from "../../Creep/States/HarvestEnergy";
import {DeliverEnergy} from "../../Creep/States/DeliverEnergy";

export class StateManager {

    private static availableStates: State[] = [
        new DeliverEnergy(),
        new HarvestEnergy(),
    ];

    private static statesById: { [key: string]: State } = {};

    public static Init(): void {
        for (const state of this.availableStates) {
            this.statesById[state.id] = state;
        }
    }

    public static GetStateById(id: string): State {
        return this.statesById[id];
    }

    public static GetState(creep: Creep): State | null {
        const states = creep.memory.states;

        if (states.length === 0) {
            return null;
        }

        const activeStateId = _.last(states);

        return this.GetStateById(activeStateId);
    }

    public static ChangeState(creep: Creep, stateId: string): void {
        creep.memory.states = [stateId];
    }

    public static PushState(creep: Creep, stateId: string): void {
        creep.memory.states.push(stateId);
    }

    public static PopState(creep: Creep): void {
        if (creep.memory.states.length > 0) {
            creep.memory.states.pop();
        }
    }

    public static TickNew(creep: Creep): void {
        this.GetState(creep)?.Tick(creep);
    }

    public static Tick(creep: Creep): void {
        // new FSM-based state ticking
        if ('states' in creep.memory && creep.memory.states.length > 0) {
            this.TickNew(creep);
            return;
        }

        switch (creep.memory.role) {
            case 'builder':
                Builder.Run(creep);
                break;
            case 'maintainer':
                Maintainer.Run(creep);
                break;
            case 'upgrader':
                Upgrader.Run(creep);
                break;
        }
    }

}
