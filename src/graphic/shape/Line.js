import Element from "../Element"
import Point from "../../types/Point"

export default class Line extends Element {

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