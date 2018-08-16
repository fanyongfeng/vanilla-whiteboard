
import Shape from "../Shape";
import Point from "../types/Point";

export default class Triangle extends Shape {

  anti = false;
  right = false;

  _buildPath() {
    let sp, to;

    if (this.right) {
      if (this.anti) {
        sp = this.startPoint;
        to = new Point(this.startPoint.x, this.endPoint.y);
      } else {
        sp = new Point(this.startPoint.x, this.endPoint.y);
        to = new Point(this.startPoint.y, this.endPoint.x);
      }
    } else {
      sp = new Point(this.startPoint.x, this.endPoint.y);
      to = new Point((this.startPoint.x + this.endPoint.x) / 2, this.startPoint.y);
    }

    this.moveTo(sp)
      .lineTo(to)
      .lineTo(this.endPoint)
      .lineTo(sp)
      .closePath();

    return this;
  }
}

