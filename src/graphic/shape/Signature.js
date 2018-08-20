import Path from "../Path"
import Point from "../types/Point"

export default class Signature extends Path {

  _drawDot (point) {
    let {x, y} = point;
    const ctx = this._ctx;
    const size = this.dotSize;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  };
}
