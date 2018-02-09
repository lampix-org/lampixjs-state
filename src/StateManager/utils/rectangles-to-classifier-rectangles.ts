import {
  Rect,
  ClassifierRect
} from '@lampix/core/lib/esm/types';

export default (classifier: string, rectangles: Rect[]): ClassifierRect[] =>
  rectangles.map((rectangle) => {
    const classifierRectangle = {
      ...rectangle,
      classifier
    };

    return classifierRectangle;
  });
