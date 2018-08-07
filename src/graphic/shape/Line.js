import Point from "../types/Point"
import Shape from "../Shape";

export default class Line extends Shape {
  static type = 'line';

  dash = [];
  constructor(sp, ep){
    super(sp, ep);
    // this.style.dash = dash;
  }

  buildPath() {
    this.moveTo(this.startPoint)
      .lineTo(this.endPoint)
      .closePath();

    return this;
  }
}
