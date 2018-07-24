
import Shape from "../Shape";

export default class Triangle extends Shape {

  anti = false;

  buildPath(ctx) {

    ctx.beginPath();

    ctx.moveTo(this.startPoint.x, this.endPoint.y);
    ctx.lineTo((this.startPoint.x + this.endPoint.x) / 2, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.lineTo(this.startPoint.x, this.endPoint.y);

    ctx.stroke();
    ctx.closePath();

    return;
  }
}