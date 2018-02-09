import {
  Rect,
  movementCallback,
  simpleClassifierCallback,
  prePositionClassifierCallback,
  positionClassifierCallback
} from '@lampix/core/lib/esm/types';
import { IAreaGroup, IEventEnabler } from './types';

import EventTypes from './EventTypes.enum';

import core from '@lampix/core';
import noop from 'utils/noop';
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

  onMovement(onMovement: movementCallback): IEventEnabler {
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
}

export default AreaGroup;
