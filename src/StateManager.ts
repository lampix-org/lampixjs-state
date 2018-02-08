import { IStateManager } from './types';
import State from './State';

const states: Map<string, State> = new Map();

class StateManager implements IStateManager {
  addState = (stateName: string): State => {
    if (states.has(stateName)) {
      console.warn(`State ${stateName} already exists.`);
      return states.get(stateName);
    }

    const state = new State(stateName);
    states.set(stateName, state);
    return state;
  }

  getState = (stateName: string): State => states.get(stateName) || null;
  changeToState = (stateName: string): void => console.warn(stateName);
}

export { StateManager };
