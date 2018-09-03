import { MouseEvent, KeyEvent, keyCode } from './EventType';
import throttle from '../util/throttle';
import { addListener, removeListener } from '../util/dom';

// bind both mouse & touch event.
// const mousedown = 'mousedown touchstart';
// const mousemove = 'mousemove touchmove';
// const mouseup = 'mouseup touchend';

const mousedown = 'mousedown';
const mousemove = 'mousemove';
const mouseup = 'mouseup';

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
  keyModifiers = {};
  lastPoint = null; //绑定流程和一般拖拽类似
  _currentTool = null;

  constructor() {}

  set tool(tool) {
    this._currentTool = tool;
    if (tool) {
      this._currentTool.layer = this.layer;
      this._currentTool.globalCtx = this.context;
      this.layer.clear();
    }
  }

  get tool() {
    return this._currentTool;
  }

  get inverseMatrix() {
    return this.layer.matrix.inverse();
  }

  bind(layer) {
    this.layer = layer;
    this.canvas = layer.el;
    this.onMouseMove = throttle(this.onMouseMove, 0).bind(this); //
    this.onMouseUp = this.onMouseUp.bind(this);

    let canvas = this.canvas;
    addListener(canvas, mousedown, this.onMouseDown.bind(this));
    addListener(canvas, mousemove, this.onMouseMove);
    addListener(canvas, 'mouseenter', this.onMouseEnter.bind(this));
    addListener(canvas, 'mouseleave', this.onMouseLeave.bind(this));
    addListener(canvas, 'keydown', this.onKeyDown.bind(this));
    addListener(canvas, 'keypress', this.onKeyPress.bind(this));
    addListener(canvas, 'keyup', this.onKeyUp.bind(this));
  }

  unbind() {
    removeListener(document, mouseup, this.onMouseUp);
    removeListener(document, mousemove, this.onMouseMove);
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
    return true;
  }

  onKeyPress(event) {}

  onKeyUp(event) {
    if (
      (event.keyCode === keyCode.DELETE || event.keyCode === keyCode.BACKSPACE) &&
      this._currentTool.type === toolTypes.SELECTOR
    ) {
      if (!toolAvailable) return;
      commands.delete();
    }
    keyModifiers[event.key] = false;
  }

  _getMouseEvent(event) {
    let _event = new MouseEvent(event);
    let point = _event.point;
    this.inverseMatrix.applyToPoint(point);
    return _event;
  }

  onMouseDown(event) {
    event.preventDefault();

    let _event = this._getMouseEvent(event);

    if (this.invokeToolSlotHandler('onBeforeMouseDown', _event) === false) return;

    this.isMouseDown = true;
    this.draggingTriggered = 0;

    this.invokeToolSlotHandler('onMouseDown', _event);

    addListener(document, mouseup, this.onMouseUp);
    addListener(document, mousemove, this.onMouseMove);
    removeListener(this.canvas, mousemove, this.onMouseMove);
  }

  onMouseUp(event) {
    event.preventDefault();

    this.isMouseDown = false;
    this.isDragging = false;

    this.invokeToolSlotHandler('onMouseUp', this._getMouseEvent(event));

    removeListener(document, mouseup, this.onMouseUp);
    removeListener(document, mousemove, this.onMouseMove);
    addListener(this.canvas, mousemove, this.onMouseMove);
  }

  onMouseMove(event) {
    event.preventDefault();

    let _event = this._getMouseEvent(event),
      point = _event.point;

    // if(!throttleDistance(point, 10)) return;
    if (_event.target !== this.canvas) return;

    let contain = this.layer.bounds.containsPoint(point);
    if (!contain) return;

    if (typeof event.touches !== 'undefined' && event.touches.length > 1) {
      return;
    }

    // mouseenter, mouseleave.

    if (this.isMouseDown) {
      this.isDragging = true;
      if (this.draggingTriggered === 0 && this.invokeToolSlotHandler('onBeforeMouseDrag', _event) === false) return;

      this.draggingTriggered++;
      this.invokeToolSlotHandler('onMouseDrag', _event);
    } else {
      this.invokeToolSlotHandler('onMouseMove', _event);
    }
    this.lastPoint = point;
  }

  onMouseEnter(event) {
    this.invokeToolSlotHandler('onMouseEnter', event);
  }

  onMouseLeave(event) {
    this.invokeToolSlotHandler('onMouseLeave', event);
  }

  /**
   * Call handler of current tool.
   * @param {String} name Name of handler
   * @param  {...any} args arguments
   */
  invokeToolSlotHandler(name, event) {
    if (!this.tool || typeof this.tool[name] !== 'function') return null; //ensure return undefined when handler is null.
    // if(process.env.NODE_ENV === 'development')
    //   console.log(this.tool.type, name, 'triggered!');
    return this.tool[name](event);
  }
}
