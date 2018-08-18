import Shape from "../Shape";

export default class Line extends Shape {

  constructor(sp, ep){
    super(sp, ep);
  }

  _buildPath() {
    this.moveTo(this.startPoint.clone())
      .lineTo(this.endPoint.clone())
      .closePath();

    return this;
  }
}
