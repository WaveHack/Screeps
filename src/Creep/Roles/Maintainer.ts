import {Role} from "./Role";
import {State} from "../States/State";
import {RepairStructure} from "../States/RepairStructure";

export class Maintainer implements Role {

    public id: string = 'maintainer';

    public name: string = 'MNT-';

    public body: BodyPartConstant[] = [WORK, CARRY, MOVE];

    public initialState: State = new RepairStructure();

}
