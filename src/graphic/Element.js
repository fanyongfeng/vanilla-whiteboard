/**
 * Base of all shapes
 */
import Rect from '../types/Rect'

export default class Element {

  selectable = true;

  stroke = null;
  strokeWidth = 1;
  x = 0;
  y = 0;
  width = 0;
  height = 0;

  constructor(shape){
    // /this.shape = Object.assign({}, shape);
  }

  getBBox(){
    return new Rect(this.x, this.y, this.width, this.height);
  }
  
  buildPath(ctx, shape) {
    throw "This method must be implemented!";
  }

  render(ctx){
    this.buildPath(ctx, this.shape);
  }
}