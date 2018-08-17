import Shape from "../Shape"
import Point from "../types/Point";

export default class Rectangle extends Shape {

  radius = 0;

  _buildPath() {

    let { x, y } = this.startPoint;
    let { x: ex, y: ey } = this.endPoint;
    let width = Math.abs(x - ex);
    let height = Math.abs(y - ey);

    let radius = this.radius || 0;

    let shortLine = Math.min(width, height);
    if (radius > shortLine / 2) radius = shortLine / 2;
    let isRounded = radius !== 0;

    this.moveTo(new Point(x + radius, y));
    this.lineTo(new Point(ex - radius, y));
    //isRounded && this.arc(ex - radius, y + radius, radius, -Math.PI / 2, 0);
    isRounded && this.arcTo(new Point(ex, y), new Point(ex, y + radius), radius);

    this.lineTo(new Point(ex, ey - radius));
    // isRounded && this.arc(ex - radius, ey - radius, radius, 0, Math.PI / 2);
    isRounded && this.arcTo(new Point(ex, ey), new Point(ex - radius, ey), radius);

    this.lineTo(new Point(x + radius, ey));
    //isRounded && this.arc(x + radius, ey - radius, radius, Math.PI / 2, Math.PI);
    isRounded && this.arcTo(new Point(x, ey), new Point(x, ey - radius), radius);

    this.lineTo(new Point(x, y + radius));
    // isRounded && this.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    isRounded && this.arcTo(new Point(x, y), new Point(x + radius, y), radius);
    this.closePath();

    return this;
  }
}

window.Rectangle = Rectangle
