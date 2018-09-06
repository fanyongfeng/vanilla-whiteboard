import { LineSegment, BezierSegment, MoveSegment, QuadraticSegment, ArcSegment } from './types/Segment';
import Point from './types/Point';
import fitCurve from './algorithm/fitCurve';
import smoothCurve from './algorithm/smoothCurve';
import { memoized, observeProps } from '../decorators/memoized';
import Item from './Item';

const _segments = Symbol('_segments');
const _points = Symbol('_points');
/**
 * A full path and base class of all single path shapes.
 * 所有绘制图形的父类
 */
@observeProps({
  fill: { type: Boolean, default: false },
  showAuxiliary: { type: Boolean, default: true },
  stroke: { type: Boolean, default: true },
})
class Path extends Item {
  //props
  [_segments] = [];
  [_points] = [];
  contextPoint = null;
  isClose = false;

  get segments() {
    return this[_segments];
  }

  get points() {
    return this[_points];
  }

  /**
   * Add Segement in path.
   * @param {Segment} segment
   */
  add(segment) {
    segment.owner = this;
    segment.contextPoint = this.contextPoint;
    this.segments.push(segment);
    this.contextPoint = segment.point;
    this.changed();
  }

  /*
  * Implements iterator.
  **/
  *[Symbol.iterator]() {
    for (let i = 0, len = this.segments.length; i < len; i++) {
      yield this.segments[i];
    }
  }

  clear() {
    this[_segments] = [];
  }

  arc(x, y, r, sa, ea) {
    const segment = new ArcSegment();
    segment.arc = [x, y, r, sa, ea];
    this.add(segment);
    return this;
  }

  /**
   * Append  Arc Segment
   * @param {Point} cp1
   * @param {Point} cp2
   * @param {Number} radius
   */
  arcTo(cp1, cp2, radius) {
    const segment = new ArcSegment(cp1, cp2, radius);
    this.add(segment);
    return this;
  }

  /**
   * Append Move segment for current path.
   *
   * @param {Number} x
   * @param {Number} y
   */
  moveTo(x, y) {
    const point = Point.instantiate(x, y);
    const segment = new MoveSegment(point);
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
    const point = Point.instantiate(x, y);
    const segment = new LineSegment(point);
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
    const segment = new BezierSegment(cp1, cp2, point);
    this.add(segment);
    return this;
  }

  /**
   *
   * @param {*} cp
   * @param {*} point
   */
  quadraticCurveTo(cp, point) {
    //二阶转三阶

    let current = this.contextPoint;

    // This is exact:
    // If we have the three quad points: A E D,
    // and the cubic is A B C D,
    // B = E + 1/3 (A - E)
    // C = E + 1/3 (D - E)
    this.bezierCurveTo(cp.add(current.subtract(cp).multiply(1 / 3)), cp.add(point.subtract(cp).multiply(1 / 3)), point);
    return this;
  }

  quadraticCurveTo2(cp, point) {
    const segment = new QuadraticSegment(cp, point);
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
    return this.uniteBoundsOfChildren(this.segments);
  }

  /**
   * Get bounds with stroke.
   */
  get strokeBounds() {
    return this.bounds.expand(this.style.lineWidth / 2);
  }

  /**
   * get length of path
   */
  @memoized()
  get length() {
    return this.segments.reduce((arr, item) => (arr += item.length), 0);
  }

  /**
   * Simplify current path, and rebuild segments
   */
  simplify() {
    //不优化小于3个点的曲线
    if (this.segments.length < 3) return this;

    const segments = fitCurve(this.segments.map(item => item.point), 1);
    this[_segments] = [this[_segments][0]].concat(segments);
    this.changed();
    return this;
  }

  /**
   * Smooth current path, and rebuild segments
   */
  smooth() {
    const segments = smoothCurve(this.segments, this.isClose);
    this[_segments] = segments;
    this.changed();
    return this;
  }

  /**
   * If point in path.
   * @param {Point} point
   */
  containsPoint(point) {
    // If point not in bounds of path, return false.
    if (!super.containsPoint(point)) return false;
    if (this.fill) return true;

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

      switch (
        segment.command // first letter
      ) {
        case 'm':
        case 'M': // moveTo, absolute
          ctx.moveTo(segment.point.x, segment.point.y);
          break;
        case 'a':
        case 'A':
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

    if (this.isClose) ctx.closePath();

    //和svg不同，svg 的fillColor 会自动fill, canvas 则通过API控制
    if (this.fill && this.style.hasFill)
      // 如果fill 模式为true, 则 执行fill
      ctx.fill(this.style.fillRule);

    if (this.stroke && this.style.hasStroke)
      // 如果stroke 模式为true, 则 执行stroke
      ctx.stroke();

    if (this.showAuxiliary) this.segments.forEach(segment => segment.draw(ctx));
  }

  _toJSON() {
    return this.segments.map(item => item.toJSON());
  }

  toString() {
    const segmentSVG = this.segments.map(item => item.toString()).join(' ');
    return `<path d="${segmentSVG} ${this.isClose ? 'z' : ''}"></path>`;
  }
}

export default Path;
