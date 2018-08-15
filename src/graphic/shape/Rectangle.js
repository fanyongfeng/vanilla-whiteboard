import Shape from "../Shape"
import Point from "../types/Point";

export default class Rectangle extends Shape {

  static type = 'rectangle';

  radius = 0;

  _buildPath() {

    let { x, y, width, height } = this.bounds;

    let radius = this.radius;

    let shortLine = Math.min(width, height);
    if (radius > shortLine / 2) radius = shortLine / 2;
    let isRounded = radius !== 0;

    this.moveTo(new Point(x + radius, y));
    this.lineTo(new Point(x + width - radius, y));
    //isRounded && this.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0);
    isRounded && this.arcTo(new Point(x + width, y),new Point(x + width, y + radius), radius);

    this.lineTo(new Point(x + width, y + height - radius));
    // isRounded && this.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);
    isRounded && this.arcTo(new Point(x + width, y + height), new Point(x + width - radius,  y + height), radius);

    this.lineTo(new Point(x + radius, y + height));
    //isRounded && this.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
    isRounded && this.arcTo(new Point(x, y + height), new Point(x, y + height - radius), radius);

    this.lineTo(new Point(x, y + radius));
    // isRounded && this.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    isRounded && this.arcTo(new Point(x, y), new Point(x + radius, y), radius);
    this.closePath();

    return this;
  }
}
