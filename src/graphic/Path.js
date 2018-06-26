/**
 * Base of all shapes
 */
export default class Path {
  constructor(shape){
    // /this.shape = Object.assign({}, shape);
  }

  getBounds(){
    return new Rect();
  }
  buildPath(ctx, shape) {
    throw "This method must be implemented!";
  }
  render(ctx){
    this.buildPath(ctx, this.shape);

  }
}