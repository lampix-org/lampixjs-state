import {
  Rect,
  movementCallback,
  positionClassifierCallback,
  prePositionClassifierCallback,
  simpleClassifierCallback
} from '@lampix/core/lib/esm/types';
import EventTypes from './EventTypes.enum';

export interface IEventEnabler {
  enable: () => void;
}

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
  onMovement: (callback: movementCallback) => IEventEnabler;
  onSimpleClassification: (classifier: string, callback: simpleClassifierCallback) => IEventEnabler;
  onPositionClassification: (
    classifier: string,
    onClassification: positionClassifierCallback,
    preClassification: prePositionClassifierCallback
  ) => IEventEnabler;
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
  changeToState: (stateName: string, delay: number) => Promise<void>;
}
