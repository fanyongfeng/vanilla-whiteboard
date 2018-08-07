import Shape from "../Shape"
import Point from "../types/Point";

function calcArrow(sp, ep) {
  let points = [];
  let l = Math.sqrt(Math.pow((ep.x - sp.x), 2) + Math.pow((ep.y - sp.y), 2)),
    e0 = (ep.x - ((ep.x - sp.x) * Math.cos(0.5) - (ep.y - sp.y) * Math.sin(0.5)) * 10 / l),
    e1 = (ep.y - ((ep.y - sp.y) * Math.cos(0.5) + (ep.x - sp.x) * Math.sin(0.5)) * 10 / l),
    e2 = (ep.x - ((ep.x - sp.x) * Math.cos(0.5) + (ep.y - sp.y) * Math.sin(0.5)) * 10 / l),
    e3 = (ep.y - ((ep.y - sp.y) * Math.cos(0.5) - (ep.x - sp.x) * Math.sin(0.5)) * 10 / l);

  return [
    new Point(e0, e1),
    new Point(ep.x, ep.y),
    new Point(e2, e3)
  ];
}
export default class Arrow extends Shape {
  static type = 'arrow';

  buildPath() {

    let points = calcArrow(this.startPoint, this.endPoint);

    this.moveTo(this.startPoint)
      .lineTo(this.endPoint)
      .moveTo(points[0])
      .lineTo(points[1])
      .lineTo(points[2])
      .closePath();
  }
}
