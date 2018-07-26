import Shape from "../Shape"
import Point from "../../types/Point";

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

  type = 'arrow';

  buildPath() {

    let points = calcArrow(this.startPoint, this.endPoint);

    this.path.moveTo(this.startPoint)
    this.path.lineTo(this.endPoint);

    this.path.moveTo(points[0]);
    this.path.lineTo(points[1]);
    this.path.lineTo(points[2]);

    this.path.closePath();
  }
}