let mouseEventNames = [
  'click', 'dblclick', 'mousewheel', 'mouseout',
  'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

let touchEventNames = [
  'touchstart', 'touchend', 'touchmove'
];

import MouseEvent from './MouseEvent'
import Point from '../types/Point'

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

  getAngle(){
    var cp = new Point(0, 0);
    var sp = new Point(0, 200);
    var ep = new Point(-300, 300);


    var disCS = cp.distanceFrom(sp);
    var disCE = cp.distanceFrom(ep);
    var disSE = sp.distanceFrom(ep);

    var resultRadian = Math.acos(((Math.pow(disCS, 2)) + (Math.pow(disCE, 2)) - (Math.pow(disSE, 2))) / (2 * disCS * disCE));

    //angle in degrees
    var resultDegree = resultRadian * 180 / Math.PI;
    console.log(resultRadian, resultDegree);

  },

  _handleDown(event){
    var ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = '#c69'
    ctx.lineCap = "round";
    ctx.lineWidth = 10;

    ctx.beginPath();

    ctx.moveTo(event.offsetX, event.offsetY);
    lastPoint = new Point(event.offsetX, event.offsetY);
  },

  _handleDragging(event){
    let ctx = this.canvas.getContext('2d');
    //ctx.clearRect(10, 10, event.offsetX, event.offsetY);
    // ctx.strokeRect(10, 10, event.offsetX, event.offsetY);
    //ctx.lineTo(event.offsetX, event.offsetY);

    var point = new Point(event.offsetX, event.offsetY);
    var midPoint = point.midPointFrom(lastPoint);

    if(this.oldEnd) {
      ctx.beginPath();
      ctx.moveTo(this.oldEnd.x, this.oldEnd.y);
    }

    // ctx.lineTo(midPoint.x, midPoint.y);
    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
    this.oldEnd = midPoint;
    
    ctx.stroke();
    

    lastPoint = new Point(event.offsetX, event.offsetY);
  },

  _handleMove(){

  },

  _handleUp(){
    this.oldEnd = null;
    var ctx = this.canvas.getContext('2d');
    ctx.closePath();
  }
}

export default handlers;



