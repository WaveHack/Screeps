import {Upgrader} from "../../Creep/Roles/Upgrader";
import {State} from "../../Creep/States/State";
import {HarvestEnergy} from "../../Creep/States/HarvestEnergy";
import {DeliverEnergy} from "../../Creep/States/DeliverEnergy";
import {ConstructBuilding} from "../../Creep/States/ConstructBuilding";
import {GatherEnergy} from "../../Creep/States/GatherEnergy";
import {RepairStructure} from "../../Creep/States/RepairStructure";
import {UpgradeController} from "../../Creep/States/UpgradeController";

export class StateManager {

    private static availableStates: State[] = [
        new ConstructBuilding(),
        new DeliverEnergy(),
        new GatherEnergy(),
        new HarvestEnergy(),
        new RepairStructure(),
        new UpgradeController(),
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

    public static Tick(creep: Creep): void {
        this.GetState(creep)?.Tick(creep);
    }

}
