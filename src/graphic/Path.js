
import { LineSegment, BezierSegment, MoveSegment, QuadraticSegment, ArcSegment } from './types/Segment';
import Point from './types/Point';
import Rect from './types/Rect';
import fitCurve from './algorithm/fitCurve';
import smoothCurve from './algorithm/smoothCurve';
import { memoized, changed } from '../decorators/memoized'
import Item from './Item';

const _segments = Symbol('_segments');

/**
 * A full path and base class of all single path shapes.
 * 所有矢量图形的父类
 */
class Path extends Item {

  //props
  [_segments] = [];
  startPoint = null;
  contextPoint = null;
  isClose = false;
  showAuxiliary = false;

  get segments() {
    return this[_segments];
  }

  _fill = false;
  get fill(){
    return this._fill;
  }

  @changed()
  set fill(val){
    if(typeof val!== 'boolean') throw new TypeError("setter 'fill' accept boolean value!");

    this._fill = val;
    return this;
  }


  _stroke = true; // default is true
  get stroke(){
    return this._stroke;
  }

  @changed()
  set stroke(val){
    if(typeof val!== 'boolean') throw new TypeError("setter 'stroke' accept boolean value!");

    this._stroke = val;
    return this;
  }

  add(segment) {
    segment.owner = this;
    segment.contextPoint = this.contextPoint;
    this.segments.push(segment);
    this.contextPoint = segment.point;
    this.markAsDirty();
  }

  *[Symbol.iterator]() {
    for (let i = 0, len = this.segments.length; i < len; i++) {
      yield this.segments[i];
    }
  }

  clear() {
    this[_segments] = [];
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

  /**
   * Append Move segment for current path.
   *
   * @param {Number} x
   * @param {Number} y
   */
  moveTo(x, y) {
    let point = Point.instantiate(x, y);
    let segment = new MoveSegment(point);
    this.add(segment);
    return this;
  }

  /**
   * Append LineTo segment for current path.
   *
   * @param {Number} x
   * @param {Number} y
   */
  lineTo(x, y) {
    let point = Point.instantiate(x, y);
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

  /**
   *
   * @param {*} cp
   * @param {*} point
   */
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
  @memoized()
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

  get strokeBounds() {
    return this.bounds.expand(this.style.lineWidth / 2);
  }

  /**
   * get length of path
   */
  @memoized()
  get length(){
    return this.segments.reduce((arr, item) => arr += item.length, 0);
  }

  simplify() {
    //不优化小于3个点的曲线
    if (this.segments.length < 3) return this;

    let segments = fitCurve(this.segments.map(item => item.point), 1);
    this[_segments] = ([this[_segments][0]]).concat(segments);
    this.markAsDirty();
    return this;
  }

  smooth() {
    let segments = smoothCurve(this.segments, this.isClose);
    this[_segments] = segments;
    return this;
  }

  /**
   * If point in path.
   * @param {Point} point
   */
  containsPoint(point) {
    // If point not in bounds of path, return false.
    if (!super.containsPoint(point)) return false;

    let seg = this.segments.find(item => item.containsPoint(point, this.style.lineWidth));
    return !!seg;
  }

  transformContent(matrix) {
    this.segments.forEach(item => {
      item.transformCoordinates(matrix);
    });
    this.matrix.reset();
  }

  _draw(ctx) {

    ctx.beginPath();

    for (let i = 0, segment, len = this.segments.length; i < len; ++i) {

      segment = this.segments[i];

      switch (segment.command) { // first letter
        case 'm':
        case 'M': // moveTo, absolute
          ctx.moveTo(segment.point.x, segment.point.y);
          break;
        case 'a':
        case 'A':
          // ctx.arc.apply(ctx, [...segment.arc]);
          ctx.arcTo.apply(ctx, segment.args);
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
      }
    }

    if (this.isClose)
      ctx.closePath();

    //和svg不同，svg 的fillColor 会自动fill, canvas 则通过API控制
    if (this.fill && this.style.hasFill) // 如果fill 模式为true, 则 执行fill
      ctx.fill(this.style.fillRule);

    if (this.stroke && this.style.hasStroke) // 如果stroke 模式为true, 则 执行stroke
      ctx.stroke();

    if (this.showAuxiliary)
      this.segments.forEach(segment => segment.draw(ctx));
  }

  _toJSON() {
    return this.segments.map(item => item.toJSON());
  }

  toString() {
    let segmentSVG = this.segments.map(item => item.toString()).join(' ');
    return `<path d="${segmentSVG} ${this.isClose ? 'z' : ''}"></path>`;
  }
}

export default Path;
