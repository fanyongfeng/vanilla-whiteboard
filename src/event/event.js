import {MouseEvent, KeyEvent} from './EventType';
import FreeDrawing from '../tools/FreeDrawing';
import ShapeDrawing from '../tools/ShapeDrawing';
import Selection from '../tools/Selection';
import throttle from '../util/throttle';
import {addListener, removeListener} from '../util/dom';

let touchEventNames = [
  'touchstart', 'touchend', 'touchmove'
];

const keyCode = {
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


//绑定流程和一般拖拽类似
let lastPoint;
function throttleDistance(point, distance = 10){
  if(!lastPoint) return true;
  return !point.nearby(lastPoint, distance);
}

const canvasStatus = {
  isSelectionMode:  true
}

let handlers = {

  isDragging: false,
  isMouseDown: false,

  bind(layer) {

    this.currentTool = new ShapeDrawing('rectangle'),
    // this.currentTool = new FreeDrawing,
    this.selection = new Selection(this.context);
    let canvas = this.canvas = layer.el;
    this.onMouseDown = this.onMouseDown.bind(this);
    // this.onMouseMove = this.onMouseMove.bind(this);

    this.onMouseMove = throttle(this.onMouseMove, 10).bind(this); //

    this.onMouseUp = this.onMouseUp.bind(this);

    addListener(canvas, 'mousedown', this.onMouseDown);
    addListener(canvas, 'mousemove', this.onMouseMove);


    addListener(canvas, 'keydown', this.onKeyDown);
    addListener(canvas, 'keypress', this.onKeyPress);
    addListener(canvas, 'keyup', this.onKeyUp);
  },

  keyModifiers: {},

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

    if(event.key === keyCode.DELETE) {
      items.deleteSelect();
    }
  },

  onKeyPress(event) {},
  onKeyUp(event) {
    if ((event.key === 'delete' || event.key === 'backspace') && tools.currentTool.type === toolTypes.SELECTOR) {
      if (!toolAvailable) return false;
      commands.delete();
    }
    keyModifiers[event.key] = false;
  },

  onMouseDown(event) {
    event.preventDefault();
    this.isMouseDown = true;

    this._handleDown(new MouseEvent(event));
    addListener(document, 'mouseup', this.onMouseUp);
    addListener(document, 'mousemove', this.onMouseMove);
    removeListener(this.canvas, 'mousemove', this.onMouseMove);
  },

  onMouseUp(event) {

    event.preventDefault();

    this.isMouseDown = false;
    this.isDragging = false;
    this._handleUp();

    removeListener(document, 'mouseup', this.onMouseUp);
    removeListener(document, 'mousemove', this.onMouseMove);
    addListener(this.canvas, 'mousemove', this.onMouseMove);
  },

  onMouseMove(event) {
    event.preventDefault();

    let ev = new MouseEvent(event);
    if(!throttleDistance(ev.point, 10)) return;
    lastPoint = ev.point;

    if (typeof event.touches !== 'undefined' && event.touches.length > 1) {
      return;
    }

    if (this.isMouseDown) {
      this.isDragging = true;
      this._handleDragging(ev);
    } else {
      this._handleMove(ev);
    }

  },

  _handleDown(event) {
    if(canvasStatus.isSelectionMode){
      this.selection.onMouseDown(event);
    } else {
      this.currentTool.onMouseDown(event);
    }
  },

  _handleDragging(event) {

    if(canvasStatus.isSelectionMode){
      this.selection.onMouseDrag(event);
    } else {
      this.currentTool.onMouseMove(event);
    }
    this.refreshCanvas();
  },

  _handleMove(event) {
    this.selection.onMouseMove(event);
  },

  _handleUp(event) {
    this.currentTool.onMouseUp(event);
    this.selection.onMouseUp(event);
  }
}

export default handlers;



