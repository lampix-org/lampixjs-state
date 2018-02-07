import { IAreaGroup } from './types';
import { Rect, ClassifierRect } from '@lampix/core/lib/esm/types';
import core from '@lampix/core';

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

  constructor(areas: Rect[]) {
    this.areas = areas;
  }

  onMovement(callback) {
    core.registerMovement(this.areas, callback);
  }

  onSimpleClassification(classifier, onClassification) {
    const classifierRectangles = rectanglesToClassifierRectangles(classifier, this.areas);
    core.registerSimpleClassifier(classifierRectangles, onClassification);
  }

  onPositionClassification(classifier, onClassification, beforeClassification) {
    const classifierRectangles = rectanglesToClassifierRectangles(classifier, this.areas);
    core.registerPositionClassifier(classifierRectangles, onClassification, beforeClassification);
  }
}

export default AreaGroup;
