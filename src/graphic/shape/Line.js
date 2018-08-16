import Point from "../types/Point"
import Shape from "../Shape";

export default class Line extends Shape {

  dash = [];
  constructor(sp, ep){
    super(sp, ep);

    if(this.dash.length)
      this.style.dashArray = dash;
  }

  _buildPath() {
    this.moveTo(this.startPoint)
      .lineTo(this.endPoint)
      .closePath();

    return this;
  }
}
