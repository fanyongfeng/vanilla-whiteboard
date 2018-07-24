import Element from './Element';
import Point from '../types/Point';
import Rect from '../types/Rect';

/**
 * The base class of shapes that build with start-point & end-point.
 */
export default class Shape extends Element {

  static getInstance([sp, ep]) {
    let startPoint = new Point(sp[0], sp[1]);
    let endPoint = new Point(ep[0], ep[1]);

    return new ctor(startPoint, endPoint);
  }


  constructor(sp, ep) {
    super();
    this.startPoint = sp;
    this.endPoint = ep;
  }

  get bounds() {
    let frm = this.startPoint,
      x = frm.x,
      y = frm.y,
      width,
      height;

    let to = this.endPoint;
    width = to.x - x;
    height = to.y - y;
    // Check if horizontal or vertical order needs to be reversed.
    if (width < 0) {
      x = to.x;
      width = -width;
    }
    if (height < 0) {
      y = to.y;
      height = -height;
    }
    return new Rect(x, y, width, height);
  }

  get data() {
    return [
      [this.startPoint.x, this.startPoint.y],
      [this.endPoint.x, this.endPoint.y],
    ]
  }

  toString() {
    return JSON.stringify(this.data);
  }
}