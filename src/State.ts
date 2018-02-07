import { IState, IAreaGroup } from './types';
import AreaGroup from './AreaGroup';

class State implements IState {
  name: string;
  areaGroups: {};

  constructor(name: string) {
    this.name = name;
    this.areaGroups = {};
  }

  addAreaGroup(areaGroupName, areas) {
    const areaGroup = new AreaGroup(areas);
    return this.areaGroups[areaGroupName] = areaGroup;
  }

  getAreaGroup(areaGroupName) {
    return this.areaGroups[areaGroupName] || null;
  }
}

export default State;
