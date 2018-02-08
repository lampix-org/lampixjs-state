import { IState } from './types';
import { Rect } from '@lampix/core/lib/esm/types';
import AreaGroup from './AreaGroup';

class State implements IState {
  name: string;
  areaGroups: { [areaGroupName: string]: AreaGroup };

  constructor(name: string) {
    this.name = name;
    this.areaGroups = {};
  }

  addAreaGroup(areaGroupName: string, areas: Rect[]) {
    const areaGroup = new AreaGroup(areas);
    return this.areaGroups[areaGroupName] = areaGroup;
  }

  getAreaGroup(areaGroupName: string) {
    return this.areaGroups[areaGroupName] || null;
  }
}

export default State;
