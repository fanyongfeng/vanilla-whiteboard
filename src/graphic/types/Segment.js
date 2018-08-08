import Point from './Point';
import Rect from './Rect';
import { containStroke, containStrokeArc, calcBoundsOfBezier } from '../algorithm/calcCurve';

const POINT_WIDTH = 4;
const OFFSET = POINT_WIDTH / 2;
export class Segment {
  /**
   * record start point via context
   */
  contextPoint = null;
  point = null;
  owner = null;

  nearby() {
    return false;
  }

  get points() {
    return [this.point];
  }

  get strokeBounds() {
    return this.bounds.expand(this.style.lineWidth) / 2;
  }

  get bounds() {
    return new Rect(this.point.x, this.point.y, 0, 0);
  }

  transformCoordinates(matrix) {

    let point = this.point,
      control1 = this.control1 || null,
      control2 = this.control2 || null;

    matrix.transformPoint(point);

    if (control1) {
      matrix.transformPoint(control1);
    }

    if (control2) {
      matrix.transformPoint(control2);
    }
  }

  containPoint() { return false; }

  drawPoint(ctx, point) {
    if (!point) return;
    ctx.strokeRect(point.x - OFFSET, point.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
  }

  drawControlPoint(ctx, point, controlPoint) {
    if (!controlPoint) return;
    ctx.fillRect(controlPoint.x - OFFSET, controlPoint.y - OFFSET, POINT_WIDTH, POINT_WIDTH);

    ctx.moveTo(point.x, point.y)
    ctx.lineTo(controlPoint.x, controlPoint.y)
  }

  /**
   * tmp method for debugger bezier
   * @param {*} ctx
   */
  draw(ctx) {

    // ctx.save();
    ctx.fillStyle = "#4f80ff";
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#5887ff';
    ctx.beginPath();
    this.drawPoint(ctx, this.point);
    this.drawPoint(ctx, this.contextPoint);


    this.drawControlPoint(ctx, this.point, this.control);
    this.drawControlPoint(ctx, this.contextPoint, this.control1);
    this.drawControlPoint(ctx, this.point, this.control2);

    ctx.stroke();
    // ctx.restore();
  }

  /**
   * Arguments fot Canvas context api.
   */
  get args() {
    return this.points.slice(1).reduce((acc, item) => {
      [].push.apply(acc, item.toJSON())
      return acc;
    }, []);
  }

  /**
   * return point data as JSON-format:
   */
  toJSON() {
    return this.points.map(p => p.toJSON());
  }

  toString() {
    return `${this.command} ${this.args.join(' ')}`;
  }
}

/**
 * DO NOT draw segment ,just move.
 */
export class MoveSegment extends Segment {
  command = 'M';
  constructor(point) {
    super();
    this.point = point;
  }

}

export class LineSegment extends Segment {
  command = 'L';
  constructor(point) {
    super();
    this.point = point;
  }

  get bounds() {
    let frm = this.contextPoint,
      x = frm.x,
      y = frm.y,
      width,
      height;

    let to = this.point;
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

  get length() {
    let sub = this.contextPoint.subtract(this.point);
    return Math.sqrt(sub.x * sub.x + sub.y * sub.y);
  }

  get points() {
    return [this.contextPoint, this.point];
  }
}

/**
 * 3 阶贝塞尔
 */
export class BezierSegment extends Segment {

  command = 'C';
  constructor(cp1, cp2, point) {
    super();
    this.control1 = cp1;
    this.control2 = cp2;
    this.point = point;
  }

  containPoint(point, lineWidth) {
    let ret = containStroke(
      this.contextPoint.x, this.contextPoint.y,
      this.control1.x, this.control1.y,
      this.control2.x, this.control2.y,
      this.point.x, this.point.y,
      lineWidth, point.x, point.y
    )
    return ret;
  }


  get fullArgs() {
    return [
      this.contextPoint.x, this.contextPoint.y,
      this.control1.x, this.control1.y,
      this.control2.x, this.control2.y,
      this.point.x, this.point.y
    ]
  }

  get bounds() {
    return calcBoundsOfBezier.apply(null, this.fullArgs);
  }

  get points() {
    return [this.contextPoint, this.control1, this.control2, this.point];
  }
}

/**
 * 2 阶贝塞尔
 */
export class QuadraticSegment extends Segment {
  command = 'Q';
  constructor(cp, point) {
    super();
    this.control = cp;
    this.point = point;
  }

  get bounds() {
    //转成三阶算
    return calcBoundsOfBezier(this.fullArgs);
  }

  get points() {
    return [this.contextPoint, this.control, this.point];
  }
}

export class ArcSegment extends Segment {
  command = 'A';
  radius = 0;

  constructor(cp1, cp2, radius) {
    super();
    this.control1 = cp1;
    this.control2 = cp2;
    this.point = cp1;
    this.radius = radius;
  }

  get args() {
    return [
      this.control1.x, this.control1.y,
      this.control2.x, this.control2.y,
      this.radius
    ]
  }

  get points() {
    return [this.contextPoint, this.control1, this.point];
  }
}
