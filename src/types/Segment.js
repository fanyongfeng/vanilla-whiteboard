import Point from './Point';
import Rect from './Rect';

const POINT_WIDTH = 4;
const OFFSET = POINT_WIDTH / 2;
export class Segment {
  /**
   * record start point via context
   */
  contextPoint = null;
  point = null;

  nearby() {
    return false;
  }
  get points() {
    return [this.point];
  }

  get strokeBounds() {

  }

  get bounds() {
    return new Rect(this.point.x, this.point.y, 0, 0);
  }

  drawPoint(ctx, point){
    if(!point) return;
    ctx.strokeRect(point.x - OFFSET, point.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
  }

  drawControlPoint(ctx, point, controlPoint) {
    if(!controlPoint) return;
    ctx.fillRect(controlPoint.x - OFFSET, controlPoint.y - OFFSET, POINT_WIDTH, POINT_WIDTH);

    ctx.moveTo(point.x, point.y)
    ctx.lineTo(controlPoint.x, controlPoint.y)
  }

  /**
   * tmp method for debugger bezier
   * @param {*} ctx 
   */
  draw(ctx) {

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

  // Converted from code found here:
  // http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
  // 
  _calcBoundsOfBeizer(x0, y0, x1, y1, x2, y2, x3, y3) {
    const tvalues = [], bounds = [[], []];
    let a, b, c, t;

    for (let i = 0; i < 2; ++i) {
      if (i === 0) {
        b = 6 * x0 - 12 * x1 + 6 * x2;
        a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
        c = 3 * x1 - 3 * x0;
      } else {
        b = 6 * y0 - 12 * y1 + 6 * y2;
        a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
        c = 3 * y1 - 3 * y0;
      }
      if (Math.abs(a) < 1e-12) {
        if (Math.abs(b) < 1e-12) {
          continue;
        }
        t = -c / b;
        if (t > 0 && t < 1) {
          tvalues.push(t);
        }
        continue;
      }
      const b2ac = b * b - 4 * c * a;
      const sqrtb2ac = Math.sqrt(b2ac);
      if (b2ac < 0) continue;

      const t1 = (-b + sqrtb2ac) / (2 * a);
      if (t1 > 0 && t1 < 1) {
        tvalues.push(t1);
      }
      const t2 = (-b - sqrtb2ac) / (2 * a);
      if (t2 > 0 && t2 < 1) {
        tvalues.push(t2);
      }
    }

    let j = tvalues.length;
    const jlen = j;
    let mt;
    while (j--) {
      t = tvalues[j];
      mt = 1 - t;
      bounds[0][j] = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
      bounds[1][j] = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
    }

    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    bounds[0].length = bounds[1].length = jlen + 2;

    let x = Math.min.apply(0, bounds[0]);

    let y = Math.min.apply(0, bounds[1]);
    let w = Math.max.apply(0, bounds[0]) - x;
    let h = Math.max.apply(0, bounds[1]) - y;

    return new Rect(x, y, w, h);

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
    return this._calcBoundsOfBeizer.apply(this, this.fullArgs);
  }

  get points() {
    return [this.contextPoint, this.control1, this.control1, this.point];
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
  get points() {
    return [this.contextPoint, this.control, this.point];
  }
}

export class ArcSegment extends Segment {
  command = 'A';

  constructor(cp, point) {
    super();
    this.control = cp;
    this.point = point;
  }
  get points() {
    return [this.contextPoint, this.control, this.point];
  }
}