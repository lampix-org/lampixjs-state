import { IStateManager } from './types';
import State from './State';

type PrivateStateManager = {
  [stateName: string]: State
};

const states: PrivateStateManager = {};

class StateManager implements IStateManager {
  addState = (stateName: string): State => {
    if (states[stateName]) {
      console.warn(`State ${stateName} already exists.`);
      return states[stateName];
    }

    const state = new State(stateName);
    states[stateName] = state;
    return state;
  }

  getState = (stateName: string): State => states[stateName] || null;
  changeToState = (stateName: string): void => console.warn(stateName);
}

export { StateManager };
