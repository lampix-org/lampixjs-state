# Lampix State Manager

`@lampix/state` is a plugin based on `@lampix/core` that helps with transitioning from one state of the application to another. In this case, a state refers simply to the areas that have (Lampix) event handlers registered for them, such as movement detectors, simple or position classifiers.

## Table of Contents

- [Installation](#implementation)
- [API](#api)
  - [State Manager](#state-manager)
  - [State](#state)
  - [AreaGroup](#area-group)
- [Contributing](#contributing)
- [License](#license)


## Installation

`npm install --save @lampix/state`

### Usage

`import lampixStateManager from '@lampix/state';`

OR

`const lampixStateManager = require('@lampix/state');`

OR

`<script src="<path_to_installation_point>/@lampix/state/umd/index.js"></script>`

### API

#### State Manager

`currentState: State`

`addState(stateName: string): State`

`getState(stateName: string): State`

`changeToState(stateName: string[, delay: number]): Promise<void>`

Clears the currently registered events, waits for the specified number of milliseconds (default 0) to pass and goes through the area groups in the new state to register their specific events.

**Note**: If you want to register events on one area group at a time, see [AreaGroup API](#area-group).

#### State

`name: string`

`areaGroups: Map<string, AreaGroup>`

A state may have multiple named area groups, each with its own event type (movement, simple or position classifier).

**Note**: Currently, you should limit a state to three areas, one for each event type. Lampix does not work with individual areas, but with groups of them (see example). If you require special handling for a specific area in an [AreaGroup](#area-group), Lampix provides the index of the rectangle handling the event.

```
import core from '@lampix/core';

const rect1 = { posX: 0, posY: 0, width: 50, height: 50 };
const rect2 = { posX: 100, posY: 0, width: 50, height: 50 };

// Tell Lampix where to look for movement
core.registerMovement([rect1, rect2], (rectIndex) => {
  switch (rectIndex) {
    case 0:
      console.log('Movement in rect1');
      break;
    case 1:
      console.log('Movement in rect2');
      break;
    default:
      break;
  }
});

const rect3 = { posX: 13, posY: 26, width: 50, height: 50 };
const rect4 = { posX: 100, posY: 100, width: 50, height: 50 };

// CAUTION: This will make Lampix only know about rect3 and 4!
core.registerMovement([rect3, rect4], (rectIndex) => {
  // What happened to rect1 and 2? :(
});
```

`addAreaGroup(areaGroupName: string, areas: Rect[]): AreaGroup`
`getAreaGroup(areaGroupName: string): AreaGroup`

#### Area Group

`areas: Rect[]`
`onMovement(callback: (rectIndex: number, outlines: Outline[])): IEventEnabler`

Binds the callback to the area group. This does not notify Lampix of the event.  
This function returns a function that tells Lampix to register the event for this group immediately.

`onSimpleClassification(classifier: string, onClassification: (rectIndex: number, classTag: string)): IEventEnabler`

Binds the callback to the area group. This does not notify Lampix of the event.  
This function returns a function that tells Lampix to register the event for this group immediately.

`onPositionClassification(classifier: string, onClassification: (rectIndex: number, classifiedObjects: ClassifiedObject[]), preClassification: (rectIndex: number, objects: Outline[]))`

Binds the callback to the area group. This does not notify Lampix of the event.  
This function returns a function that tells Lampix to register the event for this group immediately.

`registerEvents()`

Notifies Lampix of the relationship between the event type, event handler and areas.

`addArea(area: Rect[])`
`removeAreas(identifier: { propName: string, propValue: any })`

Removes areas that match the given identifier. To easily identify a rectangle in a group of them, we suggest adding a specific property to look for, such as `name` or `id`.

## Example

### Using .enable()

```
import stateManager from '@lampix/state';

const rect1 = { posX: 0, posY: 0, width: 50, height: 50 };
const rect2 = { posX: 100, posY: 0, width: 50, height: 50 };

stateManager
  .addState('state-name')
  .addAreaGroup('area-group-name', [rect1, rect2])
  .onMovement((rectIndex) => {
    console.log('We\'ve got movement, lads!');
  }) // At this point, Lampix is not aware of the rectangles or the callback
  .enable(); // This registers the area group and event handler with Lampix
```

### Using .changeToState()

```
import stateManager from '@lampix/state';

const rect1 = { posX: 0, posY: 0, width: 50, height: 50 };
const rect2 = { posX: 100, posY: 0, width: 50, height: 50 };

stateManager
  .addState('state-name')
  .addAreaGroup('area-group-name', [rect1, rect2])
  .onMovement((rectIndex) => {
    console.log('We\'ve got movement, lads!');
  }); // At this point, Lampix is not aware of the rectangles or the callback

stateManager
  .changeToState('state-name', 1000)
  .then(() => console.log('Hooray! We have changed state after a 1000ms delay!'));

stateManager
  .changeToState('this-state-does-not-exist')
  .catch((error) => console.log(error.message)); // State this-state-does-not-exist does not exist
```

## Contributing

Open an issue first to discuss potential changes/additions.

**[Back to top](#table-of-contents)**

## License

#### MIT License

#### Copyright (c) 2017-2018 Lampix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

**[Back to top](#table-of-contents)**
