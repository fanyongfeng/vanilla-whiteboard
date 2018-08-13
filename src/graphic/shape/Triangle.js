
import Shape from "../Shape";
import Point from "../types/Point";

export default class Triangle extends Shape {

  static type = 'triangle';
  anti = false;

  buildPath() {

    let sp = new Point(this.startPoint.x, this.endPoint.y);
    let to = new Point((this.startPoint.x + this.endPoint.x) / 2, this.startPoint.y);

    this.moveTo(sp)
      .lineTo(to)
      .lineTo(this.endPoint)
      .lineTo(sp)
      .closePath();

    return this;
  }
}

export class RightTriangle extends Shape {
  static type = 'rightTriangle';
  anti = false;

  buildPath() {
    let sp ,to;
    if(this.anti) {
      sp = this.startPoint;
      to = new Point(this.startPoint.x, this.endPoint.y);
    } else {
      sp = new Point(this.startPoint.x, this.endPoint.y);
      to = new Point(this.startPoint.y, this.endPoint.x);
    }

    this.moveTo(sp)
      .lineTo(to)
      .lineTo(this.endPoint)
      .lineTo(sp)
      .closePath();

    return this;
  }

}