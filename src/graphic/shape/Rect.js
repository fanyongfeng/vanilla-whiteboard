import Path from "../Path"

export default class Rect extends Path {
  shape = {
    r: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }

  buildPath(ctx, shape) {
    var x = shape.x;
    var y = shape.y;
    var width = shape.width;
    var height = shape.height;
    
    ctx.rect(x, y, width, height);
    ctx.closePath();
    return;
  }
}