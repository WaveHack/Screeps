import {Role} from "./Role";
import {State} from "../States/State";
import {DeliverEnergy} from "../States/DeliverEnergy";

export class Harvester implements Role {

    public id: string = 'harvester';

    public name: string = 'HARV-';

    public body: BodyPartConstant[] = [WORK, CARRY, MOVE];

    public initialState: State = new DeliverEnergy();

}
