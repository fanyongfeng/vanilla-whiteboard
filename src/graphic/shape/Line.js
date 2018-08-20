import Shape from "../Shape";

export default class Line extends Shape {

  constructor(...args){
    super(...args);
    this.style.dashArray = this.dash || [];
  }

  _buildPath() {
    let {x, y} = this.startPoint;
    let { x: ex, y: ey } = this.endPoint;

    this.moveTo(x, y)
      .lineTo(ex, ey);

    //NOTE: DO NOT 'closePath' on dash-line
    //  this.closePath()
  }
}
