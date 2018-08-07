import Point from "../types/Point"
import Shape from "../Shape";

export default class Line extends Shape {

  type = 'line';
  dash = [];

  buildPath() {

    this.moveTo(this.startPoint)
      .lineTo(this.endPoint)
      .closePath();

    return;
  }
}
