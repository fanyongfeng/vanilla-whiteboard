import Shape from "../Shape";

export default class Line extends Shape {

  constructor(...args){
    super(...args);
    this.style.dashArray = this.dash || [];
  }

  _buildPath() {
    this.moveTo(this.startPoint.clone())
      .lineTo(this.endPoint.clone());

    //NOTE: DO NOT 'closePath' on dashline
    //  this.closePath()
  }
}
