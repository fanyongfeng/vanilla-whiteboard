import { MouseEvent, KeyEvent, keyCode } from './EventType';
import tools from '../tools';
import throttle from '../util/throttle';
import { addListener, removeListener } from '../util/dom';

// bind both mouse & touch event.
const mousedown = 'mousedown touchstart';
const mousemove = 'mousemove touchmove';
const mouseup = 'mouseup touchend';

const keyModifiers = {};

//绑定流程和一般拖拽类似
let lastPoint;

function throttleDistance(point, distance = 10) {
  if (!lastPoint) return true;
  return !point.nearby(lastPoint, distance);
}
export default class EventHandler {

  isDragging = false;
  isMouseDown = false;
  keyModifiers = {}

  constructor(){

  }

  set tool(tool) {
    this.currentTool = tool;
  }

  bind(layer) {

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
      tools.currentTool.type === toolTypes.SELECTOR) {

      if (!toolAvailable) return false;
      commands.delete();
    }
    keyModifiers[event.key] = false;
  }

  onMouseDown(event) {
    event.preventDefault();
    this.isMouseDown = true;

    this._handleDown(new MouseEvent(event));
    addListener(document, 'mouseup', this.onMouseUp);
    addListener(document, 'mousemove', this.onMouseMove);
    removeListener(this.canvas, 'mousemove', this.onMouseMove);
  }

  onMouseUp(event) {
    event.preventDefault();

    this.isMouseDown = false;
    this.isDragging = false;
    this._handleUp();

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
      this._handleDragging(ev);
    } else {
      this._handleMove(ev);
    }

    lastPoint = point;
  }

  onMouseEnter(){

  }

  onMouseLeave(){

  }

  _handleMouseEnter(){
    this.currentTool.cursor;
  }

  _handleMouseLeave(){

  }

  _handleDown(event) {
    this.currentTool.onMouseDown(event);
  }

  _handleDragging(event) {
    this.currentTool.onMouseDrag(event);
  }

  _handleMove(event) {
    this.currentTool && this.currentTool.onMouseMove(event);
  }

  _handleUp(event) {
    this.currentTool && this.currentTool.onMouseUp(event);
  }
}

