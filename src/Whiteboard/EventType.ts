/**
 * Custom Mouse Event Class
 */

import Point from '../graphic/types/Point';
import { MouseOrTouchEvent } from './EventHandler';


/**
 * Mouse Event Class
 */
export class CustomizeMouseEvent {

  private _point!: Point;
  public originEvent: MouseOrTouchEvent;
  public type: string;
  public target: EventTarget | null;
  public offsetX!: number;
  public offsetY!: number;
  private zoom: number;

  constructor(originEvent: MouseOrTouchEvent, zoom: number) {
    this.originEvent = originEvent;
    this.type = originEvent.type;
    this.target = originEvent.target;
    this.zoom = zoom;
    if (originEvent instanceof TouchEvent && originEvent.targetTouches.length > 0 && !!this.target) {
      const rect = this.target.getBoundingClientRect();
      this.offsetX = originEvent.targetTouches[0].clientX - rect.left;
      this.offsetY = originEvent.targetTouches[0].clientY - rect.top;
    }
    if (originEvent instanceof MouseEvent) this.offsetX = originEvent.offsetX;
    if (originEvent instanceof MouseEvent) this.offsetY = originEvent.offsetY;
  }

  get point() {
    if (!this._point) {
      this._point = new Point(this.offsetX * (1/this.zoom), this.offsetY * (1/this.zoom));
    }
    return this._point;
  }

  get delta() {
    if (this.originEvent instanceof MouseEvent) {
      return new Point(this.originEvent.movementX, this.originEvent.movementY);
    }
    return new Point(0, 0);
  }

  toString() {
    return (
      "{ type: '" +
      this.type +
      "', point: " +
      this.point +
      ', target: ' +
      this.target +
      (this.delta ? ', delta: ' + this.delta : '') +
      ' }'
    );
  }
}

/**
 * Keyboard Event Class
 */
export class KeyEvent {

  public originEvent: KeyboardEvent;
  public type: string;
  public target: EventTarget | null;
  public key: string;
  public keyCode: number;

  constructor(originEvent: KeyboardEvent) {
    this.originEvent = originEvent;
    this.type = originEvent.type;
    this.target = originEvent.target;
    this.key = originEvent.key;
    this.keyCode = originEvent.keyCode;
  }

  toString() {
    return "{ type: '" + this.type + "', key: " + this.key + ', target: ' + this.target + ' }';
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
  NUMPAD_DOT: 110,
};
