import Element from "../Element"
import Point from "../../types/Point"

export default class Writing extends Element {
  points = []

  buildPath(){
    var ctx  = this.canvas.contextTop, i, len,
        p1 = this._points[0],
        p2 = this._points[1];

    this._saveAndTransform(ctx);
    ctx.beginPath();

    if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
      var width = this.width / 1000;
      p1 = new Point(p1.x, p1.y);
      p2 = new Point(p2.x, p2.y);
      p1.x -= width;
      p2.x += width;
    }
    ctx.moveTo(p1.x, p1.y);

    for (i = 1, len = this._points.length; i < len; i++) {
      this._drawSegment(ctx, p1, p2);
      p1 = this._points[i];
      p2 = this._points[i + 1];
    }

    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
    ctx.restore();

  }

  curveTo(point){

  }

  _drawSegment(p1, p2){

  }
}