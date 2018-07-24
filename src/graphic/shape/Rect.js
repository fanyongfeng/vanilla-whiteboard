import Shape from "../Shape"
import Point from "../../types/Point";

export default class Rect extends Shape {

  type = 'rectangle';

  radius = 2;

  buildPath(ctx) {

    let { x, y, width, height } = this.bounds;

    let radius = this.radius;

    let shortLine = Math.min(width, height);
    if (radius > shortLine / 2) radius = shortLine / 2;
    let isRounded = radius !== 0;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    isRounded && ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - radius);
    isRounded && ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);
    ctx.lineTo(x + radius, y + height);
    isRounded && ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + radius);
    isRounded && ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.closePath();

    ctx.stroke();

    return;
  }
}