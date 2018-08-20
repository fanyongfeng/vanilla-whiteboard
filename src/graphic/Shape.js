import Path from './Path';
import Point from './types/Point';
import Rect from './types/Rect';

/**
 * The base class of 'two points shapes' that build with start-point & end-point.
 * 通常情况下，图形都是由拖动行为绘制的
 */
export default class Shape extends Path {


  /**
   * 用与从JSON构造出Shape实例 
   * 
   * @param {Object} options 配置项
   * @param {Array} points, startPoint , endPoint 
   */
  static instantiate(options, [sp, ep]) {

    let startPoint = new Point(sp[0], sp[1]);
    let endPoint = new Point(ep[0], ep[1]);

    return new this(options, startPoint, endPoint);
  }

  constructor(options, sp = null, ep = null) {
    super(options);

    this.startPoint = sp || new Point;
    this.endPoint = ep || new Point;
    this.buildPath();
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

  transformContent(matrix) {
    // also apply to start & end point.
    matrix.applyToPoint(this.startPoint);
    matrix.applyToPoint(this.endPoint);
    super.transformContent(matrix);
  }

  _toJSON() {
    return [
      [this.startPoint.x, this.startPoint.y],
      [this.endPoint.x, this.endPoint.y],
    ];
  }
}
