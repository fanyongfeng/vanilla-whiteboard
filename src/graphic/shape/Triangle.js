
import Shape from "../Shape";
import Point from "../types/Point";

export default class Triangle extends Shape {

  type = 'triangle';
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