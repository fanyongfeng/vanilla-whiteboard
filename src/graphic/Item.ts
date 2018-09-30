import { tsid } from '../util/id';
import Style from './types/Style';
import Point from './types/Point';
import Rect from './types/Rect';
import Matrix from './types/Matrix';
import { memoizable, observeProps } from '../decorators/memoized';
import emittable from '../decorators/emitter';

export interface ItemOptions {
  type: IToolType,
  typeId: number,
  id: number,
  style: object,
  [key: string]: any
}

// 白板所有元素的父类
@emittable()
@memoizable()
@observeProps({
  selected: { type: Boolean, default: false },
  style: { type: Style, default: null },
})
abstract class Item {
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
  globalCompositeOperation = 'source-over'; //'xor'
  filter = 'blur(5px)'; //experiment feature.
  scaleMode = 'free'; //no-scale, free, proportion

  layer?: any = {}; //inject when it is added on layer.
  type?: IToolType;
  typeId?: number;
  id?: number;

  style;
  matrix: IMatrix;
  selected: boolean = false;
  children: IItem[] = [];

  constructor(options?: Partial<ItemOptions>) {
    if (options) {
      const { type, typeId, id, style, ...rest } = options;
      type && (this.type = type);
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
    if (!preset) return;

    Object.keys(preset).forEach(key => {
      let item = preset[key];
      this[key] = item;
    });
  }

  /**
   * Unite bounds of children , and return a new Rect.
   * @param {Array} children
   */
  uniteBoundsOfChildren(children): IRect {
    let x1 = Infinity,
      x2 = -x1,
      y1 = x1,
      y2 = x2;

    for (let i = 0, l = children.length; i < l; i++) {
      let bound = children[i].bounds;

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

  /**
   * Get bounds of current item.
   */
  abstract get bounds(): Rect

  /**
   * Get bounds with stroke of current item.
   */
  get strokeBounds() {
    return this.bounds;
  }

  /**
   * Get position based-on center point of current item.
   */
  get position(): Point {
    return this.bounds.center;
  }

  /**
   * Set position of current item.
   */
  set position(value: Point) {
    this.setPosition(value.x, value.y);
  }

  setPosition(x, y) {
    return this.translate(Point.instantiate(x, y).subtract(this.position));
  }

  /**
   * Translate to point.
   * @param point Translate delta.
   */
  translate(point: Point) {
    let mx = new Matrix();
    return this.transform(mx.translate(point));
  }


  /**
 * Scale current item, base on center of item.
 * @param scale horizontal & vertical scale ratio
 */
  public scale(scale: number)

  /**
 * Scale current item.
 * @param scale horizontal & vertical scale ratio
 * @param point Base point.
 */
  public scale(scale: number, point: Point)
  /**
 * Scale current item, base on center of item.
 * @param sx horizontal
 * @param sy, if it not set, use sx by default.
 */
  public scale(sx: number, sy: number)
  /**
 * Scale current item.
 * @param sx horizontal
 * @param sy vertical scale ratio
 * @param point Base point.
 */
  public scale(sx: number, sy: number, point: Point)
  public scale(sx: number, sy?: number | Point, point?: Point) {
    if (typeof sx !== 'number') throw new TypeError("param 'sx' of scale must be number!");

    if (typeof sy !== 'number') sy = sx;
    if (this.scaleMode === 'proportion') {
      let scaleRadio = Math.min(sx, sy);
      sx = sy = scaleRadio;
    }

    let mx = new Matrix();
    point = point || this.bounds.center;
    return this.transform(mx.scale(sx, sy, point));
  }

  /**
   * Rotate current item.
   * @param deg degree of Rotation.
   * @param point Base point.
   */
  rotate(deg: number, point?: IPoint) {
    if (typeof deg !== 'number') throw new TypeError("param 'deg' of rotate must be number!");
    let mx = new Matrix();
    point = point || this.bounds.center;
    return this.transform(mx.rotate(deg, point));
  }

  transform(matrix: IMatrix) {
    if (matrix) {
      //注意矩阵multify 顺序
      this.matrix = this.matrix.prepend(matrix);
    }

    this.transformContent(matrix);
    // @ts-ignore
    this.changed();
    return this;
  }

  /**
   * Transform group & compoundPath & Segment of path;
   * @param {*} matrix
   */
  transformContent(matrix: IMatrix) {
    if (this.children) {
      this.children.forEach(item => item.transform(matrix));
      this.matrix.reset();
    }
  }

  /**
   * If point in the bounds of item.
   * @param {Point} point
   */
  containsPoint(point: IPoint) {
    return this.bounds.containsPoint(point);
  }

  protected abstract _draw(ctx: CanvasRenderingContext2D);

  /**
   * Draw item on specified canvas context.
   *
   * @param ctx context of current canvas.
   *
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    this.style.apply(ctx);
    ctx.globalCompositeOperation = this.globalCompositeOperation;
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
    return [this.typeId, this.id, this._toJSON(), this.style.toShortJSON()];
  }

  protected _toJSON() {
    throw new Error('_toJSON method must be overwrite!');
  }

  /**
   * remove from collection of layers;
   */
  remove() {
    this.layer && this.layer.items.remove(this);
  }

  /**
   * 绘制边界矩形
   * @param ctx
   */
  drawBoundRect(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = '#009dec';
    ctx.lineWidth = 1;
    ctx.strokeRect.apply(ctx, this.strokeBounds.toJSON());
    ctx.restore();
  }
}

export default Item;
