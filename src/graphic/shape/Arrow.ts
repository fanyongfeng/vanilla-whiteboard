/**
 * Arrow shape
 */
import Shape from '../Shape';
import Point from '../types/Point';

function calcArrow(sx: number, sy: number, ex: number, ey: number) {
  let l = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2)),
    e0 = ex - (((ex - sx) * Math.cos(0.5) - (ey - sy) * Math.sin(0.5)) * 10) / l,
    e1 = ey - (((ey - sy) * Math.cos(0.5) + (ex - sx) * Math.sin(0.5)) * 10) / l,
    e2 = ex - (((ex - sx) * Math.cos(0.5) + (ey - sy) * Math.sin(0.5)) * 10) / l,
    e3 = ey - (((ey - sy) * Math.cos(0.5) - (ex - sx) * Math.sin(0.5)) * 10) / l;

  return [new Point(e0, e1), new Point(ex, ey), new Point(e2, e3)];
}
export default class Arrow extends Shape {
  _buildPath() {
    let { x: sx, y: sy } = this.startPoint;
    let { x: ex, y: ey } = this.endPoint;

    let points = calcArrow(sx, sy, ex, ey);

    this.moveTo(sx, sy)
      .lineTo(ex, ey)
      .moveTo(points[0])
      .lineTo(points[1])
      .lineTo(points[2]);
  }
}
