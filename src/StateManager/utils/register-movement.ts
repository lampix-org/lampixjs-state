import core from '@lampix/core';
import { Rect, movementCallback } from '@lampix/core/lib/esm/types';

export default (areas: Rect[], cb: movementCallback) => {
  core.registerMovement(areas, cb);
};
