import {
  Rect,
  movementCallback,
  positionClassifierCallback,
  prePositionClassifierCallback,
  simpleClassifierCallback
} from '@lampix/core/lib/esm/types';
import EventTypes from './EventTypes.enum';

/**
 * A zone can have >= 1 areas defined
 */
export interface IAreaGroup {
  areas: Rect[];
  callback: {
    type: EventTypes,
    onEvent: movementCallback | simpleClassifierCallback | positionClassifierCallback | null;
    preEvent: prePositionClassifierCallback | null
  };
  classifier: string;
  onMovement: (callback: movementCallback) => void;
  onSimpleClassification: (classifier: string, callback: simpleClassifierCallback) => void;
  onPositionClassification: (
    classifier: string,
    onClassification: positionClassifierCallback,
    preClassification: prePositionClassifierCallback
  ) => void;
}

export interface IState {
  name: string;
  areaGroups: Map<string, IAreaGroup>;
  addAreaGroup: (areaGroupName: string, areas: Rect[]) => IAreaGroup;
  getAreaGroup: (areaGroupName: string) => IAreaGroup;
}

export interface IStateManager {
  currentState: IState;
  addState: (stateName: string) => IState;
  getState: (stateName: string) => IState | null;
  changeToState: (stateName: string) => void;
}
