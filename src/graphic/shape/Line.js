import Point from "../../types/Point"
import Shape from "../Shape";

export default class Line extends Shape {
  
  type = 'line';

  dash = [];

  buildPath(ctx) {

    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
    ctx.closePath();

    return;
  }
}