import Point from './Point';
import Rect from './Rect';

class Command {

  controlA = null;
  controlB = null;
  point = null;

  constructor(name) {
    this.name = name; // M, L, Q, C
  }

  toJSON() {

  }

  toString() {

  }
}

/**
 * A full path 
 */
export default class Path {
  constructor() {
    this._commands = [];
  }

  get commands() {
    return this._commands;
  }

  add(command) {
    this._commands.push(command);
  }

  get bounds() {
    return new Rect(0, 0, 0, 0);
  }

  simplify() {

  }

  smooth() {

  }

  clear() {
    this._commands = [];
  }

  arc(x, y, r, sa, ea) {
    var cmd = new Command('A');
    cmd.arc = [x, y, r, sa, ea];
    this._commands.push(cmd);
    return this;
    // cmd
  }

  moveTo(point) {
    var cmd = new Command('M');
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  lineTo(point) {
    var cmd = new Command('L');
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  bezierCurveTo(cp1, cp2, point) {

    var cmd = new Command('C');
    cmd.controlA = cp1;
    cmd.controlB = cp2;
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  quadraticCurveTo2(cp, point) { //二阶转三阶

    // This is exact:
    // If we have the three quad points: A E D,
    // and the cubic is A B C D,
    // B = E + 1/3 (A - E)
    // C = E + 1/3 (D - E)
    this.bezierCurveTo(
      cp.add(current.subtract(cp).multiply(1 / 3)),
      cp.add(point.subtract(cp).multiply(1 / 3)),
      to
    );
    return this;
  }

  quadraticCurveTo(cp, point) {

    var cmd = new Command('Q');
    cmd.controlA = cp;
    cmd.point = point;
    this._commands.push(cmd);
    return this;
  }

  closePath() {
    var cmd = new Command('Z');
    this._commands.push(cmd);
    return this;
  }

  get bounds() {
    let x1 = Infinity,
      x2 = -x1,
      y1 = x1,
      y2 = x2;
    for (var i = 0, l = segments.length; i < l; i++) {
      var segment = segments[i].point;

      if (xn < x1) x1 = xn;
      if (xx > x2) x2 = xx;
      if (yn < y1) y1 = yn;
      if (yx > y2) y2 = yx;
    }
    return new Rectangle(x1, y1, x2 - x1, y2 - y1);
  }

  toJSON() {
    return this._commands.map(item => {
      var ret = [];
      if (item.point) ret.push(item.point.toJSON());
      if (item.controlA) ret.push(item.controlA.toJSON());
      if (item.controlB) ret.push(item.controlB.toJSON());
      return ret;
    });
  }

  toString() {
    return this._commands.map(item => {
      var ret = [];
      ret.push(item.name);
      if (item.controlA) ret.push(item.controlA.x, item.controlA.y);
      if (item.controlB) ret.push(item.controlB.x, item.controlB.y);
      if (item.point) ret.push(item.point.x, item.point.y);
      if (item.arc) ret.push.apply(ret, item.arc);
      return ret.join(' ');
    }).join(',');
  }
}