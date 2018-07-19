/**
 * 
 */

import hookable from '../decorators/hookable';
@hookable
export default class CanvasMgr {
  constructor(element) {
    this.canvas = element;
    this.width = element.width;
    this.height = element.height;
    this.ctx = element.getContext('2d');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    return this;
  }

  renderAll(){

  }
  scale(){
    
  }
} 