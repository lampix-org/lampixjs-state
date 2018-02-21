import { IStateManager } from '../types';

import State from '../State';
import core from '@lampix/core';
import sleep from '../utils/sleep';

const states: Map<string, State> = new Map();

class StateManager implements IStateManager {
  currentState: State;

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

  async changeToState(stateName: string, delay: number = 0): Promise<void> {
    if (!states.has(stateName)) {
      throw new Error(`State ${stateName} does not exist.`);
    }

    if (this.currentState) {
      core.unregisterMovementHandler();
      core.unregisterSimpleClassifier();
      core.unregisterPositionClassifier();
    }

    await sleep(delay);

    this.currentState = states.get(stateName);
    this.currentState.areaGroups.forEach((areaGroup) => areaGroup.registerEvents());
  }
}

export { StateManager };
