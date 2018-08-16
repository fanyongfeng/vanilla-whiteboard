import Path from './Path';
import Point from './types/Point';
import Rect from './types/Rect';

/**
 * The base class of shapes that build with start-point & end-point.
 * 通常情况下，图形都是由拖动行为绘制的
 */
export default class Shape extends Path {

  /**
   * 用与从JSON构造出Shape实例
   * @param {*} segments
   */
  static instantiate([sp, ep]) {
    let startPoint = new Point(sp[0], sp[1]);
    let endPoint = new Point(ep[0], ep[1]);

    return new this(startPoint, endPoint);
  }

  constructor(sp, ep, style) {
    super(style);
    this.startPoint = sp;
    this.endPoint = ep;
  }

  _buildPath(){
    throw new Error('must overwrite!');
  }

  buildPath(){
    this.clear();
    this._buildPath();
    this.markAsDirty();
  }

  // override bounds for dragging-shapes
  get bounds() {
    let frm = this.startPoint,
      x = frm.x,
      y = frm.y,
      width,
      height;

    let to = this.endPoint;
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

    return new Rect(x, y, width, height, this);
  }

  setPosition(x, y){
    super.setPosition(x, y);
  }

  toJSON() {
    return [this.type, [
      [this.startPoint.x, this.startPoint.y],
      [this.endPoint.x, this.endPoint.y],
    ]];
  }
}
