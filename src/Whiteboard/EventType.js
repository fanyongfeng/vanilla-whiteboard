/**
 * Custom Mouse Event Class
 */

import Point from '../graphic/types/Point';

/**
 * Mouse Event Class
 */
export class MouseEvent {

  constructor(originEvent) {
    this.originEvent = originEvent;
    this.type = originEvent.type;
    this.target = originEvent.target;
    this.offsetX = originEvent.offsetX;
    this.offsetY = originEvent.offsetY;
  }

  _point = null;
  get point() {
    if (!this._point) {
      this._point = new Point(this.offsetX, this.offsetY);
    }
    return this._point;
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
 * Keyboard Event Class
 */
export class KeyEvent {
  constructor(originEvent) {
    this.originEvent = originEvent;
    this.type = originEvent.type;
    this.target = originEvent.target;
    this.key = originEvent.key;
    this.keyCode = originEvent.keyCode;
  }

  toString() {
    return "{ type: '" + this.type
      + "', key: " + this.key
      + ', target: ' + this.target
      + ' }';
  }
}

export const keyCode = {
  INSERT: 45,
  DELETE: 46,
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  END: 35,
  HOME: 36,
  SPACEBAR: 32,
  PAGEUP: 33,
  PAGEDOWN: 34,
  F2: 113,
  F10: 121,
  F12: 123,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_DOT: 110
}

