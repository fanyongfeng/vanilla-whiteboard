let mouseEventNames = [
  'click', 'dblclick', 'mousewheel', 'mouseout',
  'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

let touchEventNames = [
  'touchstart', 'touchend', 'touchmove'
];

import MouseEvent from './MouseEvent'

//绑定流程和一般拖拽类似

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

    if(this.isMouseDown) {
      this.isDragging = true;
      this._handleDragging(new MouseEvent(event));
    }

    this._handleMove(new MouseEvent(event));
  },

  _handleDown(event){
    var ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = '#c69'
    ctx.lineCap = "round";
    ctx.lineWidth = 10

    ctx.beginPath();

    ctx.moveTo(event.offsetX, event.offsetY);
  },

  _handleDragging(event){
    var ctx = this.canvas.getContext('2d');
    // ctx.clearRect(10, 10, event.offsetX, event.offsetY);
    // ctx.strokeRect(10, 10, event.offsetX, event.offsetY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  },

  _handleMove(){

  },

  _handleUp(){
    var ctx = this.canvas.getContext('2d');
    ctx.closePath();
  }
}

export default handlers;



