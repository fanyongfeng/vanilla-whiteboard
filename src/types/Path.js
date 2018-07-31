import Point from './Point';
import Rect from './Rect';
import fitCurve from '../util/fitCurve';
import smoothCurve from '../util/smoothCurve';
import {Segment, LineSegment, BezierSegment, MoveSegment, QuadraticSegment} from './Segment';

/**
 * A full path 
 */
class Path {

  _segments = [];

  startPoint = null;
  contextPoint= null;
  isClose = false;

  constructor(point) {
    this.startPoint = point;
  }

  get segments() {
    return this._segments;
  }

  get style(){

  }

  add(segment) {
    segment.contextPoint = this.contextPoint;
    this.segments.push(segment);
    this.contextPoint= segment.point;
  }

  get bounds() {
    return new Rect(0, 0, 0, 0);
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this.segments.length; i < len; i++) {
      yield this.segments[i];
    }
  }

  clear() {
    this.segments = [];
  }

  arc(x, y, r, sa, ea) {
    let segment = new Command('A');
    segment.arc = [x, y, r, sa, ea];
    this.add(segment);
    return this;
    // segment
  }

  moveTo(point) {
    let segment = new MoveSegment(point);
    this.add(segment);
    return this;
  }

  lineTo(point) {
    let segment = new LineSegment(point);
    this.add(segment);
    return this;
  }

  /**
   * Support chaining-call
   * @param {*} cp1 
   * @param {*} cp2 
   * @param {*} point 
   */
  bezierCurveTo(cp1, cp2, point) {
    let segment = new BezierSegment(cp1, cp2, point);
    this.add(segment);
    return this;
  }

  quadraticCurveTo(cp, point) { //二阶转三阶

    let current = this.contextPoint;

    // This is exact:
    // If we have the three quad points: A E D,
    // and the cubic is A B C D,
    // B = E + 1/3 (A - E)
    // C = E + 1/3 (D - E)
    this.bezierCurveTo(
      cp.add(current.subtract(cp).multiply(1 / 3)),
      cp.add(point.subtract(cp).multiply(1 / 3)),
      point
    );
    return this;
  }

  quadraticCurveTo2(cp, point) {
    let segment = new QuadraticSegment(cp, point);
    this.add(segment);
    return this;
  }

  closePath() {
    this.isClose = true;
  }

  /**
   * get bounds of path.
   */
  get bounds() {
    let x1 = Infinity,
      x2 = -x1,
      y1 = x1,
      y2 = x2;

    for (let i = 0, l = this.segments.length; i < l; i++) {
      let bound = this.segments[i].bounds;

      let xn = bound.x,
        yn = bound.y,
        xx = bound.x + bound.width,
        yx = bound.y + bound.height;

      if (xn < x1) x1 = xn;
      if (xx > x2) x2 = xx;
      if (yn < y1) y1 = yn;
      if (yx > y2) y2 = yx;
    }

    return new Rect(x1, y1, x2 - x1, y2 - y1);

  }

  drawBoundRect(){
    let {x, y, width, height} = this.bounds;

    this._ctx.beginPath();
    this._ctx.strokeStyle = '#669'
    this._ctx.lineCap = "round";
    this._ctx.lineWidth = 1;
    this._ctx.moveTo(x, y);
    this._ctx.lineTo(x + width , y);
    this._ctx.lineTo(x + width, y + height);
    this._ctx.lineTo(x, y + height);
    this._ctx.lineTo(x, y);
    this._ctx.stroke();
  }

  toJSON() {
    return this.segments.map(item => item.toJSON());
  }

  toString() {
    let segmentSVG = this.segments.map(item => item.toString()).join(' ');
    return `<path d="${segmentSVG} ${this.isClose ? 'z' : ''}"></path>`;
  }

  simplify() {
    let segments = fitCurve(this.segments.map(item => item.point), 5);
    this._segments = ([this._segments[0]]).concat(segments);

    return this._segments;
  }

  smooth() {
    let segment = smoothCurve(this.segments, this.isClose);
    this._segments = segment;
    return this._segments;
  }

  applyStyle(ctx){
    ctx.strokeStyle = '#c69'
    ctx.lineCap = "round";
    ctx.fillStyle = "blue";
    ctx.lineWidth = 3;
    ctx.beginPath();
  }

  draw(ctx) {
    let segment;

    this._ctx = ctx;

    ctx.beginPath();
    this.applyStyle(ctx);

    for (let i = 0, len = this.segments.length; i < len; ++i) {

      segment = this.segments[i];

      switch (segment.command) { // first letter
        case 'm':
        case 'M': // moveTo, absolute
          ctx.moveTo(segment.point.x, segment.point.y);
          break;
        case 'a':
        case 'A':
          ctx.arc.apply(ctx, [...segment.arc]);
          break;
        case 'l':
        case 'L': // lineto, absolute
          ctx.lineTo.apply(ctx, segment.args);
          break;
        case 'q':
        case 'Q':
          ctx.quadraticCurveTo.apply(ctx, segment.args);
          break;
        case 'c':
        case 'C':
          ctx.bezierCurveTo.apply(ctx, segment.args);
          break;
        case 'z':
        case 'Z':
          ctx.closePath();
      }
    }
    ctx.stroke();
  }
}

window.Path = Path;

export default Path;