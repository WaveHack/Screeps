import {State} from "../States/State";

export interface Role {

    id: string;

    name: string;

    body: BodyPartConstant[];

    initialState: State;

}
