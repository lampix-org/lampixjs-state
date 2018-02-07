import { IState, IStateManager } from './types';
import State from './State';

type PrivateStateManager = {
  [stateName: string]: IState
};

const states: PrivateStateManager = {};

class StateManager implements IStateManager {
  addState = (stateName) => {
    if (states[stateName]) {
      console.error(`State ${stateName} already exists.`);
      return null;
    }

    const state = new State(stateName);
    states[stateName] = state;
    return state;
  }

  getState = (stateName) => states[stateName] || null;
  changeToState = (stateName) => null;
}

export default StateManager;
