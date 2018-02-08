import {
  Rect,
  ClassifierRect,
  movementCallback,
  simpleClassifierCallback,
  prePositionClassifierCallback,
  positionClassifierCallback
} from '@lampix/core/lib/esm/types';
import { IAreaGroup } from './types';
import core from '@lampix/core';
import noop from 'utils/noop';
import EventTypes from './EventTypes.enum';

const rectanglesToClassifierRectangles = (classifier: string, rectangles: Rect[]): ClassifierRect[] =>
  rectangles.map((rectangle) => {
    const classifierRectangle = {
      ...rectangle,
      classifier
    };

    return classifierRectangle;
  });

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

    core.registerMovement(this.areas, onMovement);
  }

  onSimpleClassification(
    classifier: string,
    onClassification: simpleClassifierCallback
  ) {
    this.callback.onEvent = onClassification;
    this.callback.preEvent = null;
    this.classifier = classifier;

    const classifierRectangles = rectanglesToClassifierRectangles(classifier, this.areas);
    core.registerSimpleClassifier(classifierRectangles, onClassification);
  }

  onPositionClassification(
    classifier: string,
    onClassification: positionClassifierCallback,
    preClassification: prePositionClassifierCallback
  ) {
    this.callback.onEvent = onClassification;
    this.callback.preEvent = preClassification || noop;
    this.classifier = classifier;

    const classifierRectangles = rectanglesToClassifierRectangles(classifier, this.areas);
    core.registerPositionClassifier(classifierRectangles, onClassification, preClassification);
  }
}

export default AreaGroup;
