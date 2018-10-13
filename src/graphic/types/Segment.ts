import Rect from './Rect';
import Point from './Point';
import Matrix from './Matrix';

import { containStroke, containStrokeArc, containStrokeLine, calcBoundsOfBezier } from '../algorithm/calcCurve';

const POINT_WIDTH = 4;
const OFFSET = POINT_WIDTH / 2;
export abstract class Segment {
  /**
   * record start point via context
   */
  command!: string;
  contextPoint!: Point;
  point!: Point;
  owner: IItem | null = null;
  // style: IStyle;
  control!: Point;
  control1!: Point;
  control2!: Point;

  nearby() {
    return false;
  }

  get points() {
    return [this.point];
  }

  // get strokeBounds() {
  // return this.bounds.expand(this.style.lineWidth) / 2;
  // return this.bounds.expand(this.style.lineWidth);
  // }

  get bounds(): Rect {
    return new Rect(this.point.x, this.point.y, 0, 0);
  }

  get length() {
    return 0;
  }

  transformCoordinates(matrix: Matrix) {
    let point = this.point,
      control1 = this.control1 || null,
      control2 = this.control2 || null;

    matrix.applyToPoint(point);

    if (control1) {
      matrix.applyToPoint(control1);
    }

    if (control2) {
      matrix.applyToPoint(control2);
    }
  }

  abstract containsPoint(point: Point, lineWidth: number);

  drawPoint(ctx: CanvasRenderingContext2D, point?: Point) {
    if (!point) return;
    ctx.strokeRect(point.x - OFFSET, point.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
  }

  drawControlPoint(ctx: CanvasRenderingContext2D, point: Point, controlPoint?: Point) {
    if (!controlPoint) return;
    ctx.fillRect(controlPoint.x - OFFSET, controlPoint.y - OFFSET, POINT_WIDTH, POINT_WIDTH);

    ctx.moveTo(point.x, point.y);
    ctx.lineTo(controlPoint.x, controlPoint.y);
  }

  /**
   * tmp method for debugger bezier
   * @param ctx
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#4f80ff';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#5887ff';
    ctx.beginPath();
    this.drawPoint(ctx, this.point);
    this.drawPoint(ctx, this.contextPoint);

    this.drawControlPoint(ctx, this.point, this.control);
    this.drawControlPoint(ctx, this.contextPoint, this.control1);
    this.drawControlPoint(ctx, this.point, this.control2);

    ctx.stroke();
  }

  /**
   * Arguments fot Canvas context api.
   */
  get args(): Point[] | number[] {
    return this.points.slice(1).reduce((acc, item) => {
      [].push.apply(acc, item.toJSON());
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
  containsPoint() {
  }
}

export class LineSegment extends Segment {
  command = 'L';
  constructor(point) {
    super();
    this.point = point;
  }

  containsPoint(point: Point, lineWidth: number): boolean {
    return containStrokeLine(
      this.contextPoint.x,
      this.contextPoint.y,
      this.point.x,
      this.point.y,
      lineWidth,
      point.x,
      point.y
    );
  }

  get bounds(): Rect {
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
    return this.contextPoint.subtract(this.point).length;
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

  containsPoint(point: Point, lineWidth: number) {
    return containStroke(
      this.contextPoint.x,
      this.contextPoint.y,
      this.control1.x,
      this.control1.y,
      this.control2.x,
      this.control2.y,
      this.point.x,
      this.point.y,
      lineWidth,
      point.x,
      point.y
    );
  }

  get fullArgs() {
    return [
      this.contextPoint.x,
      this.contextPoint.y,
      this.control1.x,
      this.control1.y,
      this.control2.x,
      this.control2.y,
      this.point.x,
      this.point.y,
    ];
  }

  get bounds() {
    return calcBoundsOfBezier.apply(null, this.fullArgs);
  }

  get points() {
    return [this.contextPoint, this.control1, this.control2, this.point];
  }

  _calcPoint(t, start, c1, c2, end) {
    return (
      start * (1.0 - t) * (1.0 - t) * (1.0 - t) +
      3.0 * c1 * (1.0 - t) * (1.0 - t) * t +
      3.0 * c2 * (1.0 - t) * t * t +
      end * t * t * t
    );
  }

  /**
   * 算出近似值
   */
  get length() {
    const steps = 10;
    let length = 0;
    let px;
    let py;

    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const cx = this._calcPoint(t, this.contextPoint.x, this.control1.x, this.control2.x, this.point.x);
      const cy = this._calcPoint(t, this.contextPoint.y, this.control1.y, this.control2.y, this.point.y);
      if (i > 0) {
        const xdiff = cx - px;
        const ydiff = cy - py;
        length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      }
      px = cx;
      py = cy;
    }

    return length;
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

  containsPoint() { }

  // get bounds() {
  //   //转成三阶算
  //   return calcBoundsOfBezier(this.fullArgs);
  // }

  get length() {
    //转成三阶算
    return this.contextPoint.subtract(this.point).length;
  }

  get points() {
    return [this.contextPoint, this.control, this.point];
  }
}

export class ArcSegment extends Segment {
  command = 'A';
  arc!: number[];
  radius = 0;

  constructor(cp1?: Point, cp2?: Point, radius?: number) { // TODO: problem
    super();
    cp1 && (this.control1 = cp1);
    cp2 && (this.control2 = cp2);
    cp1 && (this.point = cp1);
    radius && (this.radius = radius);
  }

  containsPoint(point: Point, lineWidth: number): boolean {
    return containStrokeArc(
      this.contextPoint.x,
      this.contextPoint.y,
      this.control1.x,
      this.control1.y,
      this.control2.x,
      !!this.control2.y,
      // this.point.x,
      // this.point.y,
      lineWidth,
      point.x,
      point.y
    );
  }

  get args() {
    return [this.control1.x, this.control1.y, this.control2.x, this.control2.y, this.radius];
  }

  get points() {
    return [this.contextPoint, this.control1, this.point];
  }

  get length() {
    return 0;
  }
}
