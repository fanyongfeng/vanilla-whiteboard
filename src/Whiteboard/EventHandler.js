import { MouseEvent, KeyEvent, keyCode } from './EventType';
import tools from '../tools';
import throttle from '../util/throttle';
import { addListener, removeListener } from '../util/dom';

// bind both mouse & touch event.
const mousedown = 'mousedown touchstart';
const mousemove = 'mousemove touchmove';
const mouseup = 'mouseup touchend';

/**
 *
 * @param {Point} prev
 * @param {Point} next
 * @param {Number} distance, default value is 10
 */
function throttleDistance(prev, next, distance = 10) {
  if (!prev) return true;
  return !next.nearby(prev, distance);
}

export default class EventHandler {

  isDragging = false;
  isMouseDown = false;
  keyModifiers = {}
  lastPoint = null; //绑定流程和一般拖拽类似
  _currentTool = null;

  constructor() {

  }

  set tool(tool) {
    this._currentTool = tool;
    if (tool) this._currentTool.layer = this.layer;
  }

  get tool() {
    return this._currentTool;
  }

  bind(layer) {
    this.layer = layer;
    let canvas = this.canvas = layer.el;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = throttle(this.onMouseMove, 0).bind(this); //
    this.onMouseUp = this.onMouseUp.bind(this);

    addListener(canvas, 'mousedown', this.onMouseDown);
    addListener(canvas, 'mousemove', this.onMouseMove);
    addListener(canvas, 'mouseenter', this.onMouseEnter);
    addListener(canvas, 'mouseleave', this.onMouseLeave);
    addListener(canvas, 'keydown', this.onKeyDown);
    addListener(canvas, 'keypress', this.onKeyPress);
    addListener(canvas, 'keyup', this.onKeyUp);
  }

  onKeyDown(event) {
    let keyModifiers = this.keyModifiers;

    keyModifiers[event.key] = true;
    const eventKey = ['z', 'y', 'a'];
    // windows keyboard
    if (keyModifiers.control) {
      if (!toolAvailable && eventKey.includes(event.key)) return false;
      if (event.key === 'z') {
        commands.undo();
      } else if (event.key === 'y') {
        commands.redo();
      } else if (event.key === 'a') {
        items.selectAll();
        event.preventDefault();
      }
    }

    // mac keyboard
    if (keyModifiers.meta) {
      if (!toolAvailable && eventKey.includes(event.key)) return false;
      if (keyModifiers.shift && event.key === 'z') {
        commands.redo();
      } else if (event.key === 'z') {
        commands.undo();
      } else if (event.key === 'a') {
        items.selectAll();
        event.preventDefault();
      }
    }

    if (event.keyCode === keyCode.DELETE) {
      items.deleteSelected();
    }
  }

  onKeyPress(event) {

  }

  onKeyUp(event) {
    if ((event.keyCode === keyCode.DELETE || event.keyCode === keyCode.BACKSPACE) &&
      tools._currentTool.type === toolTypes.SELECTOR) {

      if (!toolAvailable) return false;
      commands.delete();
    }
    keyModifiers[event.key] = false;
  }

  onMouseDown(event) {
    event.preventDefault();
    this.isMouseDown = true;

    this.callToolSlotHandler('onMouseDown', new MouseEvent(event));

    addListener(document, 'mouseup', this.onMouseUp);
    addListener(document, 'mousemove', this.onMouseMove);
    removeListener(this.canvas, 'mousemove', this.onMouseMove);
  }

  onMouseUp(event) {
    event.preventDefault();

    this.isMouseDown = false;
    this.isDragging = false;


    this.callToolSlotHandler('onMouseUp', new MouseEvent(event));

    removeListener(document, 'mouseup', this.onMouseUp);
    removeListener(document, 'mousemove', this.onMouseMove);
    addListener(this.canvas, 'mousemove', this.onMouseMove);
  }

  onMouseMove(event) {
    event.preventDefault();

    let ev = new MouseEvent(event),
      point = ev.point;

    // if(!throttleDistance(point, 10)) return;
    if (ev.target !== this.canvas) return;

    let contain = this.context.bounds.containsPoint(point);
    if (!contain) return;

    if (typeof event.touches !== 'undefined' && event.touches.length > 1) {
      return;
    }

    // mouseenter, mouseleave.

    if (this.isMouseDown) {
      this.isDragging = true;
      this.callToolSlotHandler('onMouseDrag', ev);
    }

    this.callToolSlotHandler('onMouseMove', ev);
    this.lastPoint = point;
  }

  onMouseEnter(event) {
    this.callToolSlotHandler('onMouseEnter', event);
  }

  onMouseLeave(event) {
    this.callToolSlotHandler('onMouseLeave', event);
  }

  /**
   * Call hanlder of tool
   * @param {String} name Name of hanlder
   * @param  {...any} args arguments
   */
  callToolSlotHandler(name, ...args) {
    return this.tool &&
      typeof this.tool[name] === 'function' &&
      this.tool[name].apply(this.tool, ...args);
  }
}

