import { CustomizeMouseEvent, keyCode } from './EventType';
import throttle from '../util/throttle';
import { addListener, removeListener } from '../util/dom';
// import Layer from './Layer';
import OperationLayer from './OperateLayer';

import Point from '../graphic/types/Point';
import Tool from '../tools/Tool';

// bind both mouse & touch event.
// const mousedown = 'mousedown touchstart';
// const mousemove = 'mousemove touchmove';
// const mouseup = 'mouseup touchend';

export type MouseOrTouchEvent = MouseEvent | TouchEvent;

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
  layer!: OperationLayer;
  canvas!: HTMLCanvasElement;
  context!: IContext;
  draggingTriggered!: number

  set tool(tool) {
    const isChanged = (!!this._currentTool && this._currentTool.type) !== tool.type;
    isChanged && this.invokeToolSlotHandler('toolChanged', { type: tool.type }); // notice pre tool
    this._currentTool = tool;
    if (this._currentTool) {
      this._currentTool.layer = this.layer;
      this._currentTool.globalCtx = this.context;
      this.layer.clear();
    }
    isChanged && this.invokeToolSlotHandler('toolChanged', { type: tool.type }); // notice next tool
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
  bind(layer: OperationLayer) {
    this.layer = layer;
    this.canvas = layer.el;
    this.onMouseMove = throttle(this.onMouseMove, 0).bind(this); //
    this.onMouseUp = this.onMouseUp.bind(this);

    const canvas = this.canvas;
    //TODO: 改为箭头函数，private， readonly
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

  onKeyPress(event: KeyboardEvent) {
    console.log(event);
  }

  onKeyUp(event: KeyboardEvent) {
    if (
      (event.keyCode === keyCode.DELETE || event.keyCode === keyCode.BACKSPACE)
      // this._currentTool.type === toolTypes.SELECTOR
    ) {
      // if (!toolAvailable) return;
      window.commands.delete();
    }
    this.keyModifiers[event.key] = false;
  }

  private getMouseEvent(event: MouseOrTouchEvent) {
    const _event = new CustomizeMouseEvent(event, this.context.zoom);
    const point = _event.point;
    this.inverseMatrix.applyToPoint(point);
    return _event;
  }

  onMouseDown(event: MouseOrTouchEvent) {
    event.preventDefault();

    const _event = this.getMouseEvent(event);

    if (this.invokeToolSlotHandler('onBeforeMouseDown', _event) === false) return;

    this.isMouseDown = true;
    this.draggingTriggered = 0;

    this.invokeToolSlotHandler('onMouseDown', _event);

    addListener(document, mouseup, this.onMouseUp);
    addListener(document, mousemove, this.onMouseMove);
    removeListener(this.canvas, mousemove, this.onMouseMove);
  }

  onMouseUp(event: MouseOrTouchEvent) {
    event.preventDefault();

    this.isMouseDown = false;
    // this.isDragging = false;

    this.invokeToolSlotHandler('onMouseUp', this.getMouseEvent(event));

    removeListener(document, mouseup, this.onMouseUp);
    removeListener(document, mousemove, this.onMouseMove);
    addListener(this.canvas, mousemove, this.onMouseMove);
  }

  onMouseMove = (event: MouseOrTouchEvent) => {
    event.preventDefault();

    let _event = this.getMouseEvent(event),
      point = _event.point;

    const distance = this.context.settings.distance;

    if (distance && !throttleDistance(point, this.lastPoint, distance)) return;
    if (_event.target !== this.canvas) return;

    let contain = this.layer.bounds.containsPoint(point);
    if (!contain) return;
    //@ts-ignore
    if (typeof event.touches !== 'undefined' && event.touches.length > 1) {
      return;
    }

    // mouseenter, mouseleave.

    if (this.isMouseDown) {
      // this.isDragging = true;
      if (this.draggingTriggered === 0 && this.invokeToolSlotHandler('onBeforeMouseDrag', _event) === false) return;

      this.draggingTriggered++;
      this.invokeToolSlotHandler('onMouseDrag', _event);
    } else {
      this.invokeToolSlotHandler('onMouseMove', _event);
    }
    this.lastPoint = point;
  }

  onMouseEnter(event: MouseOrTouchEvent) {
    this.invokeToolSlotHandler('onMouseEnter', event);
  }

  onMouseLeave(event: MouseOrTouchEvent) {
    this.invokeToolSlotHandler('onMouseLeave', event);
  }

  /**
   * Call handler of current tool.
   * @param {String} name Name of handler
   * @param  {...any} args arguments
   */
  invokeToolSlotHandler(name: string, data: any) {
    if (!this.tool || typeof this.tool[name] !== 'function') return null; //ensure return undefined when handler is null.
    // if(!IS_PRODUCTION)
    //   console.log(this.tool.type, name, 'triggered!');
    return this.tool[name](data);
  }
}
