
import Shape from "../Shape";
import Point from "../types/Point";

/**
 * 支持等腰，直角三角形
 */
export default class Triangle extends Shape {

  // anti = false;
  // right = false;

  _buildPath() {
    let p1, p2, p3 = this.endPoint.clone();

    if (this.right) {
      if (this.anti) {
        p1 = new Point(this.startPoint.x, this.endPoint.y);
        p2 = new Point(this.startPoint.y, this.endPoint.x);
      } else {
        p1 = this.startPoint.clone();
        p2 = new Point(this.startPoint.x, this.endPoint.y);
      }
    } else {
      p1 = new Point(this.startPoint.x, this.endPoint.y);
      p2 = new Point((this.startPoint.x + this.endPoint.x) / 2, this.startPoint.y);
    }

    this.moveTo(p1)
      .lineTo(p2)
      .lineTo(p3)
      .lineTo(p1)
      .closePath();
  }
}

