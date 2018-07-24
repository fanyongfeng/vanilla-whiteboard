/**
 * Custom Mouse Event Class
 */

 import Point from '../types/Point';
 
export default class MouseEvent {
  constructor(originEvent){
    this.originEvent = originEvent;
    this.type = originEvent.type;
    this.target = originEvent.target;
    this.offsetX = originEvent.offsetX; 
    this.offsetY = originEvent.offsetY;
    this.point = new Point(event.offsetX, event.offsetY);
  }

  get delta() {
    if(typeof this.originEvent.movementX !== 'undefined') {
      return {
        x : this.originEvent.movementX, 
        y : this.originEvent.movementY, 
      }
    }
  }

  toString() {
    return "{ type: '" + this.type
            + "', point: " + this.point
            + ', target: ' + this.target
            + (this.delta ? ', delta: ' + this.delta : '')
            + ' }';
  }
}