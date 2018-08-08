import Point from './types/Point';
import Rect from './types/Rect';
import { LineSegment, BezierSegment, MoveSegment, QuadraticSegment, ArcSegment } from './types/Segment';
import Style from './types/Style';
import Matrix from './types/Matrix';

import fitCurve from './algorithm/fitCurve';
import smoothCurve from './algorithm/smoothCurve';
import memoized from '../decorators/memoized'

import {tsid} from '../util/id';

const _selected = Symbol('selected');
const _segments = Symbol('_segments');

/**
 * A full path and base class of all single path shapes.
 */
class Path {

  [_segments] = [];
  [_selected] = false;
  startPoint = null;
  contextPoint = null;
  isClose = false;

  constructor(style) {
    this.id = tsid();
    this._style = new Style(style);
  }

  get segments() {
    return this[_segments];
  }

  get selected() {
    return this[_selected];
  }

  set selected(val) {
    this[_selected] = val;
  }

  /**
   * style of current path
   */
  get style() {
    return this._style;
  }

  set style(value) {
    this._style = value;
    //mark-as-dirty
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

  get strokeBounds() {
    return this.bounds.expand(this.style.lineWidth / 2);
  }

  drawBoundRect() {
    let ctx = this._ctx;
    ctx.save();
    ctx.strokeStyle = '#009dec';
    ctx.lineWidth = 1;
    ctx.strokeRect.apply(ctx, this.strokeBounds.toJSON());
    ctx.restore();
  }

  simplify() {
    let segments = fitCurve(this.segments.map(item => item.point), 1);
    this[_segments] = ([this[_segments][0]]).concat(segments);
    return this;
  }

  smooth() {
    let segment = smoothCurve(this.segments, this.isClose);
    this[_segments] = segment;
    return this;
  }

  containPoint(point) {
    let seg = this.segments.find(item => item.containPoint(point, this.style.lineWidth));
    return !!seg;
  }

  get position(){
    return this.bounds.center;
  }

  set position(value){
    this.setPosition(value.x, value.y);
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
    this._ctx = ctx;

    ctx.beginPath();
    this.style.apply(ctx);

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
        case 'z':
        case 'Z':
          ctx.closePath();
      }
    }

    //ctx.fill();
    ctx.stroke();

    this.segments.forEach(segment=>segment.draw(ctx));
    if(this.selected) this.drawBoundRect();
  }

  toJSON() {
    return this.segments.map(item => item.toJSON());
  }

  toString() {
    let segmentSVG = this.segments.map(item => item.toString()).join(' ');
    return `<path d="${segmentSVG} ${this.isClose ? 'z' : ''}"></path>`;
  }
}

export default Path;
