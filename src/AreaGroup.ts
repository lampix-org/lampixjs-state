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
  callbacks: {
    onEvent: movementCallback | simpleClassifierCallback | positionClassifierCallback | null,
    preEvent: prePositionClassifierCallback | null
  };

  constructor(areas: Rect[]) {
    this.areas = areas;
    this.callbacks = {
      onEvent: null,
      preEvent: null
    };
  }

  onMovement(onMovement: movementCallback) {
    this.callbacks.onEvent = onMovement;
    this.callbacks.preEvent = null;

    core.registerMovement(this.areas, onMovement);
  }

  onSimpleClassification(
    classifier: string,
    onClassification: simpleClassifierCallback
  ) {
    this.callbacks.onEvent = onClassification;
    this.callbacks.preEvent = null;

    const classifierRectangles = rectanglesToClassifierRectangles(classifier, this.areas);
    core.registerSimpleClassifier(classifierRectangles, onClassification);
  }

  onPositionClassification(
    classifier: string,
    preClassification: prePositionClassifierCallback,
    onClassification: positionClassifierCallback
  ) {
    this.callbacks.onEvent = onClassification || noop;
    this.callbacks.preEvent = preClassification || noop;

    const classifierRectangles = rectanglesToClassifierRectangles(classifier, this.areas);
    core.registerPositionClassifier(classifierRectangles, onClassification, preClassification);
  }
}

export default AreaGroup;
