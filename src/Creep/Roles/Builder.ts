import {Role} from "./Role";
import {State} from "../States/State";
import {ConstructBuilding} from "../States/ConstructBuilding";

export class Builder implements Role {

    public id: string = 'builder';

    public name: string = 'BLD-';

    public body: BodyPartConstant[] = [WORK, CARRY, MOVE];

    public initialState: State = new ConstructBuilding();

}
