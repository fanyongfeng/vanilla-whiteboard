
import Point from "../types/Point"
import Shape from "../Shape";

export default class ChatBox extends Shape {

  fill = false;

  _buildPath() {

    let {x, y} = this.startPoint;
    let { x: ex, y: ey } = this.endPoint;
    let s1x = (x + ex) / 2;
    let s2y = y + (ey - y) * 3 / 4;
    let s3x = x + (ex - x) / 4;
    let s3y = y + (ey - y) * 3 / 8;
    let s4x = x + (ex - x) * 3 / 8;


    this.moveTo(s1x, y)
      .quadraticCurveTo(new Point(x, y), new Point(x, s3y))
      .quadraticCurveTo(new Point(x, s2y), new Point(s3x, s2y))
      .quadraticCurveTo(new Point(s3x, ey),new Point(x, ey))
      .quadraticCurveTo(new Point(s4x, ey), new Point(s4x, s2y))
      .quadraticCurveTo(new Point(ex, s2y), new Point(ex, s3y))
      .quadraticCurveTo(new Point(ex, y), new Point(s1x, y))
      .closePath();
  }
}
