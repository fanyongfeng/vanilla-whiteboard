import { MouseEvent, keyCode } from './EventType';
import throttle from '../util/throttle';
import { addListener, removeListener } from '../util/dom';
import Layer from './Layer';

import Point from '../graphic/types/Point';
import Tool from '../tools';

// bind both mouse & touch event.
// const mousedown = 'mousedown touchstart';
// const mousemove = 'mousemove touchmove';
// const mouseup = 'mouseup touchend';

const mousedown = 'mousedown';
const mousemove = 'mousemove';
const mouseup = 'mouseup';

/**
 * Determine if the distance between the two points is less than a value
 * @param prev
 * @param next
 * @param distance, default value is 5
 */
function throttleDistance(prev: Point, next: Point, distance = 5): boolean {
  if (!prev) return true;
  return !next.nearby(prev, distance);
}

export default class EventHandler {
  // private isDragging = false;
  private isMouseDown = false;
  private lastPoint!: Point; //绑定流程和一般拖拽类似
  private _currentTool!: Tool;
  keyModifiers: {[key: string]: boolean} = {};
  layer!: Layer;
  canvas!: HTMLCanvasElement;
  context!: IContext;

  set tool(tool) {
    this._currentTool = tool;
    if (this._currentTool) {
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
  
  /**
   * Bind mouseEvent and keyboardEvent to layer
   * @param layer the instance of Layer
   */
  bind(layer: Layer) {
    this.layer = layer;
    this.canvas = layer.el;
    this.onMouseMove = throttle(this.onMouseMove, 0).bind(this); //
    this.onMouseUp = this.onMouseUp.bind(this);

    const canvas = this.canvas;
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

  onKeyDown(event: KeyboardEvent) {
    let keyModifiers = this.keyModifiers;

    keyModifiers[event.key] = true;
    const eventKey = ['z', 'y', 'a'];
    // windows keyboard or mac keyboard
    if (keyModifiers.control || keyModifiers.meta) {
      // if (!toolAvailable && eventKey.includes(event.key)) return;
      if (eventKey.includes(event.key)) return;
      const isRedo = keyModifiers.meta ? keyModifiers.shift && event.key === 'z' : event.key === 'y';
      if (isRedo) {
        window.commands.redo();
      } else if (event.key === 'z') {
        window.commands.undo();
      } else if (event.key === 'a') {
        window.items.selectAll();
        event.preventDefault();
      }
    }

    if (event.keyCode === keyCode.DELETE) {
      window.items.deleteSelected();
    }
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

    const distance = this.context.settings.distance;

    if (distance && !throttleDistance(point, this.lastPoint, distance)) return;
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
