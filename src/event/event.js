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

import {addListener, removeListener} from '../util/dom'

import canvasStatus from '../canvasStatus'
//绑定流程和一般拖拽类似

function throttleDistance(dis){

}


let handlers = {

  isDragging: false,
  isMouseDown: false,

  bind(canvas) {

    // this.currentTool = new ShapeDrawing,
    this.currentTool = new FreeDrawing,
    this.selection = new Selection;

    this.canvas = canvas;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    addListener(canvas, 'mousedown', this.onMouseDown);
    addListener(canvas, 'mousemove', this.onMouseMove);


    addListener(canvas, 'keydown', this.onKeyDown);
    addListener(canvas, 'keypress', this.onKeyPress);
    addListener(canvas, 'keyup', this.onKeyUp);
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
    } else {
      this._handleMove(new MouseEvent(event));
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



