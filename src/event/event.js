let mouseEventNames = [
  'click', 'dblclick', 'mousewheel', 'mouseout',
  'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

let touchEventNames = [
  'touchstart', 'touchend', 'touchmove'
];

import MouseEvent from './MouseEvent'
import KeyEvent from './KeyEvent'
import Point from '../types/Point'
import Rect from '../graphic/shape/Rect';

import FreeDrawing from '../tools/FreeDrawing';
import ShapeDrawing from '../tools/ShapeDrawing';

import Selection from '../tools/Selection';

//绑定流程和一般拖拽类似

function throttleDistance(dis){
  
}

let lastPoint = null;
/**
 * Bind Events
 */
function addListener(element, eventType, handler) {
  if (!element) return;

  let events = eventType.split(' ');
  if (events.length > 1) {
    for (let i = 0; i < events.length; i++) {
      addListener(element, events[i], handler);
    }
    return;
  }

  if (element.addEventListener) {
    element.addEventListener(eventType, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventType, handler);
  } else {
    element['on' + eventType] = handler;
  }
}

function removeListener(element, eventType, handler) {
  if (!element) return;

  let events = eventType.split(' ');
  if (events.length > 1) {
    for (let i = 0; i < events.length; i++) {
      removeListener(element, events[i], handler);
    }
    return;
  }

  if (element.removeEventListener) {
    element.removeEventListener(eventType, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + eventType, handler);
  } else {
    element['on' + eventType] = null;
  }
}


let handlers = {

  isDragging: false,
  isMouseDown: false,
  currentTool: new FreeDrawing,
  //currentTool: new ShapeDrawing,
  selection: new Selection,

  bind(canvas) {
    this.canvas = canvas;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    addListener(document, 'mousedown', this.onMouseDown);
    addListener(this.canvas, 'mousemove', this.onMouseMove);


    addListener(this.canvas, 'keydown', this.onKeyDown);
    addListener(this.canvas, 'keypress', this.onKeyPress);
    addListener(this.canvas, 'keyup', this.onKeyUp);
  },

  onKeyDown(event) {},
  onKeyPress(event) {},
  onKeyUp(event) {},

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

    if (typeof event.touches !== 'undefined' && event.touches.length > 1) {
      return;
    }

    if (this.isMouseDown) {
      this.isDragging = true;
      this._handleDragging(new MouseEvent(event));
    }

    this._handleMove(new MouseEvent(event));
  },


  _handleDown(event) {
    this.currentTool.onMouseDown(event);
    // this.selection.onMouseDown(event);

  },

  _handleDragging(event) {
    this.currentTool.onMouseMove(event);
  },

  _handleMove(event) {
    this.selection.onMouseMove(event);
  },

  _handleUp(event) {
    this.currentTool.onMouseUp(event);
  }
}

export default handlers;



