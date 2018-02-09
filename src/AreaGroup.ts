import {
  Rect,
  movementCallback,
  simpleClassifierCallback,
  prePositionClassifierCallback,
  positionClassifierCallback
} from '@lampix/core/lib/esm/types';
import { IAreaGroup } from './types';
import noop from 'utils/noop';
import EventTypes from './EventTypes.enum';

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

  onMovement(onMovement: movementCallback) {
    this.callback.onEvent = onMovement;
    this.callback.preEvent = null;
    this.classifier = null;
  }

  onSimpleClassification(
    classifier: string,
    onClassification: simpleClassifierCallback
  ) {
    this.callback.onEvent = onClassification;
    this.callback.preEvent = null;
    this.classifier = classifier;
  }

  onPositionClassification(
    classifier: string,
    onClassification: positionClassifierCallback,
    preClassification: prePositionClassifierCallback
  ) {
    this.callback.onEvent = onClassification;
    this.callback.preEvent = preClassification || noop;
    this.classifier = classifier;
  }
}

export default AreaGroup;
