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
    return this.bounds.expand(this.style.strokeWidth);
  }

  buildPath(ctx, shape) {
    //throw "This method must be implemented!";
  }

  draw(ctx) {
    let command, cp, currentPoint;

    ctx.strokeStyle = '#c69'
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (var i = 0, len = this.path.commands.length; i < len; ++i) {

      command = this.path.commands[i];

      switch (command.name) { // first letter
        case 'm':
        case 'M': // moveTo, absolute
          ctx.moveTo(command.point.x, command.point.y);
          break;
        case 'a':
        case 'A':
          ctx.arc.apply(ctx, [...command.arc]);
          break;
        case 'l':
        case 'L': // lineto, absolute
          ctx.lineTo(command.point.x, command.point.y);
          break;
        case 'q':
        case 'Q':
          ctx.quadraticCurveTo(
            command.controlA.x,
            command.controlA.y,
            command.point.x, 
            command.point.y
          );
          break;
        case 'c':
        case 'C':
          ctx.bezierCurveTo(
            command.controlA.x,
            command.controlA.y,
            command.controlB.x,
            command.controlB.y,
            command.point.x, 
            command.point.y
          );
          break;
        case 'z':
        case 'Z':
          ctx.closePath();
      }
    }
    ctx.stroke();
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