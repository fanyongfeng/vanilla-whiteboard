import Path from "../Path"
import Point from '../types/Point';
import { BezierSegment, MoveSegment } from '../types/Segment';

/**
 * Shapes create by: pen, marker, highlighter, etc.
 */
export default class Writing extends Path {
  type = 'writing';

  static instantiate(segments) {
    let instance = new Writing;

    segments.forEach(seg => {
      let segment;
      if (seg.length == 1) {
        segment = new MoveSegment(new Point(seg[0][0], seg[0][1]) );
      } else if (seg.length == 4) {
        segment = new BezierSegment(new Point(seg[1][0], seg[1][1]), new Point(seg[2][0], seg[2][1]), new Point(seg[3][0], seg[3][1]));
      }
      instance.add(segment)
    });

    return instance;
  }
}
