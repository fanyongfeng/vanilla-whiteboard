import Point from '../types/Point';
import Shape from '../Shape';

export default class ChatBox extends Shape {
  _buildPath() {
    let { x: sx, y: sy } = this.startPoint;
    let { x: ex, y: ey } = this.endPoint;
    let s1x = (sx + ex) / 2;
    let s2y = sy + ((ey - sy) * 3) / 4;
    let s3x = sx + (ex - sx) / 4;
    let s3y = sy + ((ey - sy) * 3) / 8;
    let s4x = sx + ((ex - sx) * 3) / 8;

    this.moveTo(s1x, sy)
      .quadraticCurveTo(new Point(sx, sy), new Point(sx, s3y))
      .quadraticCurveTo(new Point(sx, s2y), new Point(s3x, s2y))
      .quadraticCurveTo(new Point(s3x, ey), new Point(sx, ey))
      .quadraticCurveTo(new Point(s4x, ey), new Point(s4x, s2y))
      .quadraticCurveTo(new Point(ex, s2y), new Point(ex, s3y))
      .quadraticCurveTo(new Point(ex, sy), new Point(s1x, sy))
      .closePath();
  }
}
