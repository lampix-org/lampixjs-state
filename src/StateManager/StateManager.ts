import {
  movementCallback,
  simpleClassifierCallback,
  positionClassifierCallback,
} from '@lampix/core/lib/esm/types';
import { IStateManager } from '../types';

import State from '../State';
import EventTypes from '../EventTypes.enum';

import core from '@lampix/core';
import sleep from 'utils/sleep';
import registerMovement from './utils/register-movement';
import registerSimpleClassifier from './utils/register-simple-classifier';
import registerPositionClassifier from './utils/register-position-classifier';

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
    this.currentState.areaGroups.forEach((areaGroup) => {
      switch (areaGroup.callback.type) {
        case EventTypes.NONE: {
          break;
        }
        case EventTypes.MOVEMENT: {
          registerMovement(
            areaGroup.areas,
            areaGroup.callback.onEvent as movementCallback
          );
          break;
        }
        case EventTypes.SIMPLE_CLASSIFIER: {
          registerSimpleClassifier(
            areaGroup.classifier,
            areaGroup.areas,
            areaGroup.callback.onEvent as simpleClassifierCallback
          );
          break;
        }
        case EventTypes.POSITION_CLASSIFIER: {
          registerPositionClassifier(
            areaGroup.classifier,
            areaGroup.areas,
            areaGroup.callback.onEvent as positionClassifierCallback,
            areaGroup.callback.preEvent
          );
          break;
        }
      }
    });
  }
}

export { StateManager };
