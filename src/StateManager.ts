import {
  movementCallback,
  simpleClassifierCallback,
  positionClassifierCallback,
  Rect,
  ClassifierRect
} from '@lampix/core/lib/esm/types';
import { IStateManager } from './types';

import core from '@lampix/core';
import State from './State';
import EventTypes from './EventTypes.enum';
import sleep from 'utils/sleep';

const rectanglesToClassifierRectangles = (classifier: string, rectangles: Rect[]): ClassifierRect[] =>
  rectangles.map((rectangle) => {
    const classifierRectangle = {
      ...rectangle,
      classifier
    };

    return classifierRectangle;
  });

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
          core.registerMovement(areaGroup.areas, areaGroup.callback.onEvent as movementCallback);
          break;
        }
        case EventTypes.SIMPLE_CLASSIFIER: {
          const areas = rectanglesToClassifierRectangles(
            areaGroup.classifier,
            areaGroup.areas
          );
          core.registerSimpleClassifier(
            areas,
            areaGroup.callback.onEvent as simpleClassifierCallback
          );
          break;
        }
        case EventTypes.POSITION_CLASSIFIER: {
          const areas = rectanglesToClassifierRectangles(
            areaGroup.classifier,
            areaGroup.areas
          );
          core.registerPositionClassifier(
            areas,
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
