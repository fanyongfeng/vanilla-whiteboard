import { tsid } from '../util/id';
import Style from './types/Style';
import Point from './types/Point';
import Matrix from './types/Matrix';
import { memoizable, observeProps } from '../decorators/memoized';
import emittable from '../decorators/emitter';


// 白板所有元素的父类
@emittable()
@memoizable()
@observeProps(
  {
    selected: { type: Boolean, default: false },
    style: { type: Style, default: null }
  }
)
class Item {

  /**
   * Composite rule used for canvas globalCompositeOperation
   * possible value:
   * [ 'source-over','source-in','source-out','source-atop',
   *   'destination-over','destination-in','destination-out','destination-atop',
   *   'lighter', 'copy','xor', 'multiply', 'screen', 'overlay', 'darken',
   *   'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
   *   'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
   * ]
   *
   * @type String
   * @default
   */
  globalCompositeOperation = 'source-over';
  selectable = true;
  scaleMode = "free"; //no-scale, free, proportion
  layer = null;  //inject when it is added on layer.


  constructor(options) {
    if (options) {
      let { type, typeId, id, style, ...rest } = options;

      this.type = type || this.constructor.name;
      this.typeId = typeId || -Infinity;
      this.id = id || tsid();
      this.style = new Style(style);

      this.handleRest(rest);
    } else {
      this.style = new Style();
    }

    this.matrix = new Matrix();
  }

  handleRest(preset) {
    //FIXME: 优化机制
    if (!preset) return;

    Object.keys(preset).forEach(key => {
      let item = preset[key];
      this[key] = item;
    });
  }

  /**
   * Get bounds of current item.
   */
  get bounds() {
    throw new Error("getter bounds must be overwrite!");
    return null;
  }

  /**
   * Get bounds with stroke of current item.
   */
  get strokeBounds() {
    return this.bounds;
  }

  /**
   * Get position based-on center point of current item.
   */
  get position() {
    return this.bounds.center;
  }

  /**
   * Set position of current item.
   */
  set position(value) {
    this.setPosition(value.x, value.y);
  }

  setPosition(x, y) {
    return this.translate(Point.instantiate(x, y).subtract(this.position));
  }

  /**
   * Translate to point.
   * @param {Point} point
   */
  translate(point) {
    let mx = new Matrix();
    return this.transform(mx.translate(point));
  }

  /**
   * Scale current item.
   * @param {Number} sx horizantal
   * @param {Number | undefined} sy, if it not set, use sx by default.
   * @param {Point} point Base point.
   */
  scale(sx, sy, point = null) {
    if (typeof sx !== 'number')
      throw new TypeError("param 'sx' of scale must be number!");

    if (this.scaleMode === 'proportion') {
      let scaleRadio = Math.min(sx, sy);
      sx = sy = scaleRadio;
    }

    let mx = new Matrix();
    if (typeof sy === 'undefined') sy = sx;
    point = point || this.bounds.center;
    return this.transform(mx.scale(sx, sy, point));
  }

  /**
   * Rotate current item.
   * @param {Number} deg, degree of Rotation.
   * @param {Point} point, Base point.
   */
  rotate(deg, point = null) {
    if (typeof deg !== 'number')
      throw new TypeError("param 'deg' of rotate must be number!");

    let mx = new Matrix();
    point = point || this.bounds.center;
    return this.transform(mx.rotate(deg, point));
  }

  transform(matrix) {
    //TODO: transform stroke & bounds.

    if (matrix) {
      //注意矩阵multify 顺序
      this.matrix = this.matrix.prepend(matrix);
    }

    this.transformContent(matrix);
    this.changed();
    return this;
  }

  /**
   * Transform group & compoundPath & Segment of path;
   * @param {*} matrix
   */
  transformContent(matrix) {
    if (this.children) {
      this.children.forEach(item => item.transform(matrix));
      this.matrix.reset();
    }
  }

  /**
   * If point in the bounds of item.
   * @param {Point} point
   */
  containsPoint(point) {
    return this.bounds.containsPoint(point);
  }

  _draw(ctx) {
    throw new Error("Abstract method must be overwrite!");
  }

  /**
   * Draw item on specified canvas context.
   * @param {*} ctx
   */
  draw(ctx) {
    ctx.save();
    this.style.apply(ctx);
    ctx.globalCompositeOperation = this.globalCompositeOperation;
    // ctx.globalCompositeOperation = 'xor';
    this.matrix.applyToContext(ctx);
    this._draw(ctx);
    ctx.restore();

    if (this.selected) this.drawBoundRect(ctx);
    return this;
  }

  /**
   *  Get JSON format data, in [typeId, id, JSONData, style]
   *  e.g. [6, 9909959950, [[345, 234], [603, 436]], {"c":"#da64e2","w":5,"f":20}];
   */
  toJSON() {
    return [
      this.typeId,
      this.id,
      this._toJSON(),
      this.style.toShortJSON()
    ]
  }

  /**
   * remove from collection of layers;
   */
  remove() {
    this.layer && this.layer.items.remove(this);
  }

  /**
   * 绘制边界矩形
   * @param {*} ctx
   */
  drawBoundRect(ctx) {
    ctx.save();
    ctx.strokeStyle = '#009dec';
    ctx.lineWidth = 1;
    ctx.strokeRect.apply(ctx, this.strokeBounds.toJSON());
    ctx.restore();
  }
}

export default Item;
