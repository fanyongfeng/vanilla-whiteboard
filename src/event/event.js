let mouseEventNames = [
  'click', 'dblclick', 'mousewheel', 'mouseout',
  'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

let touchEventNames = [
  'touchstart', 'touchend', 'touchmove'
];

import MouseEvent from './MouseEvent'
import Point from '../types/Point'
import Rect from '../graphic/shape/Rect';

import FreeDrawing from '../tools/FreeDrawing';
import ShapeDrawing from '../tools/ShapeDrawing';

//绑定流程和一般拖拽类似

let lastPoint = null;
/**
 * Bind Events
 */
function addListener(element, eventType, handler) {
  if(!element) return;

  var events = eventType.split(' ');
  if (events.length > 1) {
      for (var i = 0; i < events.length; i++) {
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
  if(!element) return;

  var events = eventType.split(' ');
  if (events.length > 1) {
      for (var i = 0; i < events.length; i++) {
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


var handlers = {

  isDragging: false,
  isMouseDown: false,
  currentTool: new ShapeDrawing,

  bind(canvas){
    this.canvas = canvas;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    
    addListener(document, 'mousedown', this.onMouseDown);
  },

  onMouseDown(event){
    event.preventDefault();
    this.isMouseDown = true;

    this._handleDown(new MouseEvent(event));
    addListener(document, 'mouseup', this.onMouseUp);
    addListener(document, 'mousemove', this.onMouseMove);
    removeListener(this.canvas, 'mousemove', this.onMouseMove);
  },

  onMouseUp(event){

    event.preventDefault();

    this.isMouseDown = false;
    this.isDragging = false;
    this._handleUp();

    removeListener(document, 'mouseup', this.onMouseUp);
    removeListener(document, 'mousemove', this.onMouseMove);
    addListener(this.canvas, 'mousemove', this.onMouseMove);
  },

  onMouseMove (event) {
    event.preventDefault();

    if (typeof event.touches !== 'undefined' && event.touches.length > 1) {
      return;
    }

    if(this.isMouseDown) {
      this.isDragging = true;
      this._handleDragging(new MouseEvent(event));
    }

    this._handleMove(new MouseEvent(event));
  },


  _handleDown(event){
    this.currentTool.onMouseDown(event);
  },

  _handleDragging(event){
    this.currentTool.onMouseMove(event);
  },

  _handleMove(){

  },

  _handleUp(){
    this.currentTool.onMouseUp(event);
  }
}

export default handlers;


