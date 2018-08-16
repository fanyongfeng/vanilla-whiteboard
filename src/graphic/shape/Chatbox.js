
import Point from "../types/Point"
import Shape from "../Shape";

export default class Chatbox extends Shape {

  dash = [];
  constructor(sp, ep){
    super(sp, ep);
    // this.style.dash = dash;
  }

  _buildPath() {

    // ctx.moveTo(75,25);
    // ctx.quadraticCurveTo(25,25,25,62.5);
    // ctx.quadraticCurveTo(25,100,50,100);
    // ctx.quadraticCurveTo(50,120,30,125);
    // ctx.quadraticCurveTo(60,120,65,100);
    // ctx.quadraticCurveTo(125,100,125,62.5);
    // ctx.quadraticCurveTo(125,25,75,25);

    this.moveTo(this.startPoint)
      .lineTo(this.endPoint)
      .closePath();

    return this;
  }
}
