import {
  Rect,
  movementCallback,
  simpleClassifierCallback,
  prePositionClassifierCallback,
  positionClassifierCallback
} from '@lampix/core/lib/esm/types';
import { IAreaGroup, IEventEnabler } from './types';

import EventTypes from './EventTypes.enum';

import noop from './utils/noop';
import registerMovement from './StateManager/utils/register-movement';
import registerSimpleClassifier from './StateManager/utils/register-simple-classifier';
import registerPositionClassifier from './StateManager/utils/register-position-classifier';

class AreaGroup implements IAreaGroup {
  areas: Rect[];
  classifier: string;
  callback: {
    type: EventTypes,
    onEvent: movementCallback | simpleClassifierCallback | positionClassifierCallback | null,
    preEvent: prePositionClassifierCallback | null
  };

  constructor(areas: Rect[]) {
    this.areas = areas;
    this.classifier = null;
    this.callback = {
      type: EventTypes.NONE,
      onEvent: null,
      preEvent: null
    };
  }

  addArea(area: Rect): AreaGroup {
    this.areas.push(area);
    return this;
  }

  removeAreas(identifier: { propName: string, propValue: string | number }): AreaGroup {
    const { propName, propValue } = identifier;

    if (propName === undefined) {
      // TODO: Invariant
      console.error('propName can not be undefined. This will remove all the areas.');
      return;
    }

    this.areas = this.areas.filter((area) => !(area[propName] === propValue));
    return this;
  }

  onMovement(onMovement: movementCallback): IEventEnabler {
    this.callback.type = EventTypes.MOVEMENT;
    this.callback.onEvent = onMovement;
    this.callback.preEvent = null;
    this.classifier = null;

    return {
      enable: () => registerMovement(
        this.areas,
        onMovement
      )
    };
  }

  onSimpleClassification(
    classifier: string,
    onClassification: simpleClassifierCallback
  ): IEventEnabler {
    this.callback.type = EventTypes.SIMPLE_CLASSIFIER;
    this.callback.onEvent = onClassification;
    this.callback.preEvent = null;
    this.classifier = classifier;

    return {
      enable: () => registerSimpleClassifier(
        classifier,
        this.areas,
        onClassification
      )
    };
  }

  onPositionClassification(
    classifier: string,
    onClassification: positionClassifierCallback,
    preClassification: prePositionClassifierCallback
  ): IEventEnabler {
    this.callback.type = EventTypes.POSITION_CLASSIFIER;
    this.callback.onEvent = onClassification;
    this.callback.preEvent = preClassification || noop;
    this.classifier = classifier;

    return {
      enable: () => registerPositionClassifier(
        classifier,
        this.areas,
        onClassification,
        preClassification
      )
    };
  }

  registerEvents(): void {
    switch (this.callback.type) {
      case EventTypes.NONE: {
        break;
      }
      case EventTypes.MOVEMENT: {
        registerMovement(
          this.areas,
          this.callback.onEvent as movementCallback
        );
        break;
      }
      case EventTypes.SIMPLE_CLASSIFIER: {
        registerSimpleClassifier(
          this.classifier,
          this.areas,
          this.callback.onEvent as simpleClassifierCallback
        );
        break;
      }
      case EventTypes.POSITION_CLASSIFIER: {
        registerPositionClassifier(
          this.classifier,
          this.areas,
          this.callback.onEvent as positionClassifierCallback,
          this.callback.preEvent
        );
        break;
      }
    }
  }
}

export default AreaGroup;
