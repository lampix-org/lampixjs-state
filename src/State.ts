import { IState } from './types';
import { Rect } from '@lampix/core/lib/types';
import AreaGroup from './AreaGroup';

class State implements IState {
  name: string;
  areaGroups: Map<string, AreaGroup>;
  constructor(name: string) {
    this.name = name;
    this.areaGroups = new Map();
  }

  addAreaGroup(areaGroupName: string, areas: Rect[]) {
    const areaGroup = new AreaGroup(areas);
    this.areaGroups.set(areaGroupName, areaGroup);
    return areaGroup;
  }

  getAreaGroup(areaGroupName: string) {
    return this.areaGroups.get(areaGroupName) || null;
  }
}

export default State;
