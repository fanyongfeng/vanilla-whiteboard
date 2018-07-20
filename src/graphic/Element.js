/**
 * Base of all shapes
 */
import Rect from '../types/Rect';
import Style from './Style';

export default class Element {

  selectable = true;

  stroke = null;
  strokeWidth = 1;
  _bounds = new Rect(0,0,0,0);
  _style = new Style();

  constructor(shape){
    // /this.shape = Object.assign({}, shape);
  }

  get style(){
    
  }

  get bounds(){
    return new Rect(this.x, this.y, this.width, this.height);
  }
  
  buildPath(ctx, shape) {
    throw "This method must be implemented!";
  }

  render(ctx){
    this.buildPath(ctx, this.shape);
  }
}