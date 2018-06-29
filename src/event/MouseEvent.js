/**
 * Custom Mouse Event Class
 */

let mouseEventNames = [
  'click', 'dblclick', 'mousewheel', 'mouseout',
  'mouseup', 'mousedown', 'mousemove', 'contextmenu'
];

let touchEventNames = [
  'touchstart', 'touchend', 'touchmove'
];


export default class MouseEvent {
  constructor(originEvent){
    this.originEvent = originEvent;
  }

  get delta() {
    if(typeof this.originEvent.movementX !== 'undefined') {
      return {
        x : this.originEvent.movementX, 
        y : this.originEvent.movementY, 
      }
    }
  }
}