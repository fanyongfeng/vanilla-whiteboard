import Path from "../Path"

export default class Line extends Path {
  shape = {
    x: 0,
    y: 0,
  }

  buildPath(ctx, shape) {
    ctx.moveTo(x, y)
    
    ctx.lineTo(x, y, width, height);
    ctx.closePath();
    return;
  }
}