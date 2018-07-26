
import Shape from "../Shape";
import Point from "../../types/Point";

export default class Triangle extends Shape {

  anti = false;

  buildPath() {

    let sp = new Point(this.startPoint.x, this.endPoint.y);
    let to = new Point((this.startPoint.x + this.endPoint.x) / 2, this.startPoint.y);

    this.path.moveTo(sp);
    this.path.lineTo(to);
    this.path.lineTo(this.endPoint);
    this.path.lineTo(sp);

    this.path.closePath();

    return;
  }
}