import core from '@lampix/core';
import { Rect, positionClassifierCallback, prePositionClassifierCallback } from '@lampix/core/lib/types';
import rectanglesToClassifierRectangles from './rectangles-to-classifier-rectangles';

export default (
  classifier: string,
  areas: Rect[],
  cb: positionClassifierCallback,
  preCb: prePositionClassifierCallback
) => {
  const rectangles = rectanglesToClassifierRectangles(classifier, areas);
  core.registerPositionClassifier(rectangles, cb, preCb);
};
