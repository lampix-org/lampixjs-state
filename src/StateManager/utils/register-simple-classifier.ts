import core from '@lampix/core';
import { Rect, simpleClassifierCallback } from '@lampix/core/lib/types';
import rectanglesToClassifierRectangles from './rectangles-to-classifier-rectangles';

export default (classifier: string, areas: Rect[], cb: simpleClassifierCallback) => {
  const rectangles = rectanglesToClassifierRectangles(classifier, areas);
  core.registerSimpleClassifier(rectangles, cb);
};
