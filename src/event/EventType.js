/**
 * Custom Mouse Event Class
 */

import Point from '../graphic/types/Point';

export class MouseEvent {

  constructor(originEvent) {
    this.originEvent = originEvent;
    this.type = originEvent.type;
    this.target = originEvent.target;
    this.offsetX = originEvent.offsetX;
    this.offsetY = originEvent.offsetY;
    this.point = new Point(originEvent.offsetX, originEvent.offsetY);
  }

  get delta() {
    if (typeof this.originEvent.movementX !== 'undefined') {
      return new Point(this.originEvent.movementX, this.originEvent.movementY);
    }
    return new Point(0, 0);
  }

  toString() {
    return "{ type: '" + this.type
      + "', point: " + this.point
      + ', target: ' + this.target
      + (this.delta ? ', delta: ' + this.delta : '')
      + ' }';
  }
}

/**
 * Mouse Event Class
 */
export class KeyEvent {
  constructor(originEvent) {
    this.originEvent = originEvent;
  }

}
