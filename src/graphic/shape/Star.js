


import Shape from "../Shape";
import Point from "../types/Point";

const radio = 0.5;
/**
 * Shape star
 */
export default class Star extends Shape {

  _buildPath() {
    let center = this.startPoint.midPointFrom(this.endPoint),
      points = 10,
      radius1 = this.startPoint.getDistance(this.endPoint) / 2,
      radius2 = radius1 * radio,
      step = 360 / points,
      vector = new Point(0, -1),
      firstPoint;

    for (let i = 0; i < points; i++) {
      let point = center.add(vector.rotate(step * i).multiply(i % 2 ? radius2 : radius1));

      if(i === 0) {
        this.moveTo(point);
        firstPoint = point;
        continue;
      }
      this.lineTo(point);
    }
    this.lineTo(firstPoint);
    this.closePath();
  }
}
