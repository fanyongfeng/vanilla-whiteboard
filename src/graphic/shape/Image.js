import Item from "../Item"
import Rect from '../types/Rect';
import { observeProps } from '../../decorators/memoized';


const viewWidth = 1000;
const viewHeight = 800;
/**
 * The Raster item represents an image.
 * Image transform 靠 matrix , 而非指定的初始x, y;
 */
@observeProps({
  /**
   * Set alpha of image, between 0 and 1.
   */
  alpha: { type: Number, default: 1 },
  /**
   * align of image in whiteboard
   * possible values:
   *  1)center
   *  2)start
   */
  align: { type: String, default: "start" },
  /**
   * If has box-shadow, like css box-shadow.
   */
  shadow: { type: Boolean, default: true },
})
export default class Image extends Item {

  static instantiate(options, src) {
    return new this(options, src);
  }

  _src = null;
  _bounds = null;
  loaded = false;
  strokeDashArray = [0, 1];

  constructor(options, src) {
    super(options);
    if (src) {
      this.src = src;
      this.loadImage();
    }
  }

  set src(src) {
    this.loaded = false;
    this._src = src;
  }

  get src() {
    return this._src;
  }

  get bounds() {
    let bound = this._initBounds.clone();
    this.matrix.applyToRect(bound);
    bound.owner = this;
    return bound;
  }

  /**
   * Load image & trigger callback;
   * @param {Function} fn callback
   */
  loadImage(fn) {
    if (!this.src && this._image && this.loaded) return;

    // let img = new window.Image;
    let img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = this.src;

    img.onload = () => {
      // console.log('load');

      this.loaded = img && img.src && img.complete;
      this.naturalWidth = img ? img.naturalWidth || img.width : 0;
      this.naturalHeight = img ? img.naturalHeight || img.height : 0;

      //TODO:Emit load event
      this._initBounds = this.calcInitBounds();

      fn && fn.call(this, img);
      img = img.onload = img.onerror = null;
    };

    img.onerror = function () {
      console.warn(`can't load image '${this.src}'`);
      //TODO:Emit error event
      img = img.onload = img.onerror = null;
    };

    this._image = img;
  }


  /**
   * 通过图像原始大小，算出宽高及起始位置，并返回bounds.(保持图片原始宽高比)
   */
  calcInitBounds() {

    const viewRadio = viewWidth / viewHeight;
    const imgRadio = this.naturalWidth / this.naturalHeight;

    let x, y, width, height;

    if (this.naturalHeight < viewHeight && this.naturalWidth < viewWidth) {
      width = this.naturalWidth;
      height = this.naturalHeight;
      x = this.align === 'center' ? (viewWidth - width) / 2 : 0;
      y = this.align === 'center' ? (viewHeight - height) / 2 : 0;
    } else if (imgRadio > viewRadio) {
      width = viewWidth;
      height = viewWidth / imgRadio;
      x = 0
      y = this.align === 'center' ? (viewHeight - height) / 2 : 0;
    } else {
      height = viewHeight;
      width = height * imgRadio;
      y = 0;
      x = this.align === 'center' ? (viewWidth - width) / 2 : 0;
    }

    return new Rect(x, y, width, height, this);
  }

  /**
   * Get Image Data of specified area from canvas.
   * @return {TypedArray} data
   */
  get imageData() {
    let { x, y, width, height } = this.bounds;
    return this._ctx.getImageData(x, y, width, height);
  }

  /**
   * Set TypedArray Data to canvas.
   * @param {TypedArray} data
   */
  set imageData(data) {
    let { x, y } = this.bounds;
    this._ctx.putImageData(data, x, y);
  }

  /**
   * 参考
   * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
   *
   * void ctx.drawImage(image, dx, dy); // 画布起始位置
   * void ctx.drawImage(image, dx, dy, dWidth, dHeight);// 画布起始位置，和绘制大小（用于缩放）
   * void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); // 原始图片其实位置及大小
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawImageAndStroke(ctx) {
    let { x, y, width, height } = this._initBounds;

    if (this.shadow) {
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 8;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this._image, x, y, width, height);
  }

  _draw(ctx) {
    this._ctx = ctx;

    if (this.loaded) {
      this.drawImageAndStroke(ctx);
    } else {
      this.loadImage(() => this.drawImageAndStroke(ctx));
    }
  }

  _toJSON() {
    return [this.src];
  }
}
