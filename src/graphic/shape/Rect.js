import Shape from "../Shape"
import Point from "../../types/Point";

export default class Rect extends Shape {

  type = 'rectangle';

  radius = 0;

  buildPath() {

    let { x, y, width, height } = this.bounds;

    let radius = this.radius;

    let shortLine = Math.min(width, height);
    if (radius > shortLine / 2) radius = shortLine / 2;
    let isRounded = radius !== 0;

    this.path.moveTo(new Point(x + radius, y));
    this.path.lineTo(new Point(x + width - radius, y));
    isRounded && this.path.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0);

    this.path.lineTo(new Point(x + width, y + height - radius));
    isRounded && this.path.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);

    this.path.lineTo(new Point(x + radius, y + height));
    isRounded && this.path.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);

    this.path.lineTo(new Point(x, y + radius));
    isRounded && this.path.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    this.path.closePath();


    return;
  }
}