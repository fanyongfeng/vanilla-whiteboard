import Shape from "../Shape";

export default class Line extends Shape {

  dash = [];
  constructor(sp, ep){
    super(sp, ep);

    if(this.dash.length)
      this.style.dashArray = dash;
  }

  _buildPath() {
    this.moveTo(this.startPoint.clone())
      .lineTo(this.endPoint.clone())
      .closePath();

    return this;
  }
}
