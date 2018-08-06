import Point from './Point';
import Rect from './Rect';
import fitCurve from '../util/fitCurve';
import smoothCurve from '../util/smoothCurve';
import { Segment, LineSegment, BezierSegment, MoveSegment, QuadraticSegment, ArcSegment } from './Segment';
import memoized from '../decorators/memoized'
import Style from './Style';
import Matrix from './Matrix';
import hookable from '../decorators/hookable'

/**
 * A full path
 */
@hookable
class Path {

  _segments = [];
  _style = null;

  path2dObj = undefined;
  startPoint = null;
  contextPoint = null;
  isClose = false;

  constructor(options) {

    // this._style = new Style({
    //   strokeStyle: options.color,
    //   lineWidth: options.width,
    //   lineCap: options.strokeLineCap,
    //   miterLimit: options.strokeMiterLimit,
    //   lineJoin: options.strokeLineJoin,
    // });

    //TODO:Use Path2D,
    if (typeof Path2D !== 'undefined') {
      // this.path2dObj = new Path2D();
    }
  }

  static instantiate(segments) {

    let path = new Path;

    segments.forEach(seg => {
      let segment;
      if (seg.length == 1) {
        segment = new MoveSegment(new Point(seg[0][0], seg[0][1]) );
      } else if (seg.length == 4) {
        segment = new BezierSegment(new Point(seg[1][0], seg[1][1]), new Point(seg[2][0], seg[2][1]), new Point(seg[3][0], seg[3][1]));
      }
      path.add(segment)
    });

    return path;
  }

  get segments() {
    return this._segments;
  }

  /**
   * style of current path
   */
  get style() {
    return _style;
  }

  add(segment) {
    segment.owner = this;
    segment.contextPoint = this.contextPoint;
    this.segments.push(segment);
    this.contextPoint = segment.point;
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this.segments.length; i < len; i++) {
      yield this.segments[i];
    }
  }

  clear() {
    this._segments = [];
  }

  arc(x, y, r, sa, ea) {
    let segment = new ArcSegment();
    segment.arc = [x, y, r, sa, ea];
    this.add(segment);
    return this;
    // segment
  }

  arcTo(cp1, cp2, radius) {
    let segment = new ArcSegment(cp1, cp2, radius);
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
   * get bounds of path. It's a memoized getter for performance.
   */
  // @memoized()
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

    return new Rect(x1, y1, x2 - x1, y2 - y1, this);

  }

  drawBoundRect() {
    const POINT_WIDTH = 4;
    const OFFSET = POINT_WIDTH / 2;
    const boundsPoi = [
      'topLeft',
      'topCenter',
      'topRight',
      'rightCenter',
      'bottomRight',
      'bottomCenter',
      'bottomLeft',
      'leftCenter',
    ];

    let ctx = this._ctx;

    ctx.fillStyle = "#009dec";
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#96cef6';
    ctx.beginPath();

    let lastPoint = this.bounds[boundsPoi[boundsPoi.length -2]];
    ctx.moveTo(lastPoint.x, lastPoint.y);
    boundsPoi.forEach(key => {
      let point = this.bounds[key];
      ctx.lineTo(point.x, point.y);
      ctx.fillRect(point.x - OFFSET, point.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
      lastPoint = point;
    })
    ctx.stroke();
  }

  toJSON() {
    return this.segments.map(item => item.toJSON());
  }

  toString() {
    let segmentSVG = this.segments.map(item => item.toString()).join(' ');
    return `<path d="${segmentSVG} ${this.isClose ? 'z' : ''}"></path>`;
  }

  simplify() {
    let segments = fitCurve(this.segments.map(item => item.point), 1);
    this._segments = ([this._segments[0]]).concat(segments);
    return this;
  }

  smooth() {
    let segment = smoothCurve(this.segments, this.isClose);
    this._segments = segment;
    return this._segments;
  }

  containPoint(point) {
    let seg = this.segments.find(item => item.containPoint(point, 30));
    return !!seg;
  }

  applyStyle(ctx) {
    ctx.strokeStyle = '#c69'
    ctx.lineCap = "round";
    ctx.fillStyle = "blue";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.beginPath();
  }

  get position(){
    return this.bounds.center;
  }

  set position(value){
    this.translate(value.subtract(this.position));
  }

  setPosition(x, y){
    this.translate(Point.instantiate(x, y).subtract(this.position));
  }

  translate(point){
    let mx = new Matrix();
    return this.transform(mx.translate(point));
  }

  scale(sx, sy, point){
    let mx = new Matrix();
    point = point || this.bounds.center;
    return this.transform(mx.scale(sx, sy, point));
  }

  rotate(deg, point) {
    let mx = new Matrix();
    point = point || this.bounds.center;
    return this.transform(mx.rotate(deg, point));
  }

  transform(matrix){

    this.transformContent(matrix);
    return this;
    // this.emit('changed');
    //TODO:markAsDrity
  }

  transformContent(matrix){
    this.segments.forEach(item=>{
      item.transformCoordinates(matrix);
    });
  }

  draw(ctx) {
    let segment;

    this._ctx = ctx;

    ctx.beginPath();
    this.applyStyle(ctx);

    let ctxOrPath = this.path2dObj || ctx;

    for (let i = 0, len = this.segments.length; i < len; ++i) {

      segment = this.segments[i];

      switch (segment.command) { // first letter
        case 'm':
        case 'M': // moveTo, absolute
          ctxOrPath.moveTo(segment.point.x, segment.point.y);
          break;
        case 'a':
        case 'A':
          // ctxOrPath.arc.apply(ctxOrPath, [...segment.arc]);
          ctxOrPath.arcTo.apply(ctxOrPath, segment.args);
          break;
        case 'l':
        case 'L': // lineto, absolute
          ctxOrPath.lineTo.apply(ctxOrPath, segment.args);
          break;
        case 'q':
        case 'Q':
          ctxOrPath.quadraticCurveTo.apply(ctxOrPath, segment.args);
          break;
        case 'c':
        case 'C':
          ctxOrPath.bezierCurveTo.apply(ctxOrPath, segment.args);
          break;
        case 'z':
        case 'Z':
          ctxOrPath.closePath();
      }
    }

    // ctx.stroke(this.path2dObj);
    ctx.stroke();

    for (let i = 0, len = this.segments.length; i < len; ++i) {
      segment = this.segments[i];
      segment.draw(ctx);
    }
    this.drawBoundRect();
  }
}

export default Path;
