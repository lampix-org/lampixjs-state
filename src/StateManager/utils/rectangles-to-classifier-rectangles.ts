import {
  Rect
} from '@lampix/core/lib/types';

export default (classifier: string, rectangles: Rect[]): Rect[] =>
  rectangles.map((rectangle) => {
    const classifierRectangle = {
      ...rectangle,
      classifier
    };

    return classifierRectangle;
  });
