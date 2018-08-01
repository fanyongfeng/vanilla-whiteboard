/**
 * Base of all shapes
 */
import Rect from '../types/Rect';
import Style from './Style';
import { tsid, uid } from '../util/id';
import Path from '../types/Path';

const _selected = Symbol('selected');

export default class Element {

  selectable = true;
  strokeColor = null;
  strokeWidth = 1;
  _style = new Style();
  group = null;

  constructor() {
    this.id = tsid();
    this[_selected] = false;
    this.path = new Path();
  }

  drawBoundRect() {
    let ctx = this.ctx;
    let { x, y, width, height } = this.strokeBounds;

    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#009dec";
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
  }

  get selected() {
    return this[_selected];
  }

  set selected(val) {
    this.drawBoundRect();
    this[_selected] = val;
  }

  get style() {
    return {
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
    }
  }

  set style(val) {
    this.strokeColor = val.strokeColor;
    this.strokeWidth = val.strokeWidth;
  }

  get bounds() {
    return this.path.bounds;
  }

  get strokeBounds() {
    return this.bounds.expand(this.style.strokeWidth) / 2;
  }

  buildPath(ctx, shape) {
    //throw "This method must be implemented!";
  }

  drawPath(){

  }

  draw(ctx) {

    ctx.strokeStyle = '#c69'
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.beginPath();
    this.path.draw(ctx);
  }

  render(ctx) {
    this.ctx = ctx;
    this.draw(ctx);
  }

  toJSON() {
    return this.path.toJSON();
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}