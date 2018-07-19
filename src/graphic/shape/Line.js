import Element from "../Element"
import Point from "../../types/Point"

export default class Line extends Element {
  constructor(p1, p2){
    super();

    this.startPoint = p1;
    this.endPoint = p2;
  }

  buildPath(ctx) {

    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y)
    ctx.lineTo(this.endPoint.x, this.endPoint .y);
    ctx.closePath();
    
    return;
  }
}