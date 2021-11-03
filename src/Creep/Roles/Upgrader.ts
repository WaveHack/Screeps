import {Role} from "./Role";
import {State} from "../States/State";
import {UpgradeController} from "../States/UpgradeController";

export class Upgrader implements Role {

    public id: string = 'upgrader';

    public name: string = 'UPG-';

    public body: BodyPartConstant[] = [WORK, CARRY, MOVE];

    public initialState: State = new UpgradeController();

}
