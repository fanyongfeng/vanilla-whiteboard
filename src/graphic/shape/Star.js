


import Shape from "../Shape";
import Point from "../types/Point";

export default class Star extends Shape {

  type = 'star';
  anti = false;

  buildPath() {
    let center = Point.readNamed(arguments, 'center'),
        points = Base.readNamed(arguments, 'points') * 2,
        radius1 = Base.readNamed(arguments, 'radius1'),
        radius2 = Base.readNamed(arguments, 'radius2'),
        step = 360 / points,
        vector = new Point(0, -1),
        segments = new Array(points);
    for (var i = 0; i < points; i++)
        segments[i] = new Segment(center.add(vector.rotate(step * i)
                .multiply(i % 2 ? radius2 : radius1)));
    return createPath(segments, true, arguments);
  }
}
