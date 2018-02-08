import {
  Rect,
  movementCallback,
  positionClassifierCallback,
  prePositionClassifierCallback,
  simpleClassifierCallback
} from '@lampix/core/lib/esm/types';

/**
 * A zone can have >= 1 areas defined
 */
export interface IAreaGroup {
  areas: Rect[];
  callbacks: {
    onEvent: movementCallback | simpleClassifierCallback | positionClassifierCallback | null;
    preEvent: prePositionClassifierCallback | null
  };
  onMovement: (callback: movementCallback) => void;
  onSimpleClassification: (classifier: string, callback: simpleClassifierCallback) => void;
  onPositionClassification: (
    classifier: string,
    preClassification: prePositionClassifierCallback,
    onClassification: positionClassifierCallback
  ) => void;
}

export interface IState {
  name: string;
  areaGroups: { // A zone can have >=1 areas
    [areaGroupName: string]: IAreaGroup
  };
  addAreaGroup: (areaGroupName: string, areas: Rect[]) => IAreaGroup;
  getAreaGroup: (areaGroupName: string) => IAreaGroup;
}

export interface IStateManager {
  addState: (stateName: string) => IState;
  getState: (stateName: string) => IState | null;
  changeToState: (stateName: string) => void;
}
