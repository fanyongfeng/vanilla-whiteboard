import Item from "../Item"
import Rect from '../types/Rect';
import Point from '../types/Point';
import Matrix from '../types/Matrix';

/**
 * The Raster item represents an image.
 */
export default class Image extends Item {

  _src = null;
  loaded = false;
  strokeDashArray = [0, 1];
  x = 100;
  y = 100;
  _bounds = null;
  align = 'center'; // start.
  matrix = new Matrix;

  constructor(src) {
    super();
    this._src = src;
  }

  set src(src) {
    this.loaded = false;
    this._src = src;
  }

  get src() {
    return this._src;
  }

  get bounds() {
    return this._bounds;
  }

  loadImage(url, ctx) {
    if (!url) return;

    // let img = new window.Image;
    let img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;

    img.onload = () => {
      console.log('load', this.loaded);

      this.loaded = img && img.src && img.complete;
      this.naturalWidth = img ? img.naturalWidth || img.width : 0;
      this.naturalHeight = img ? img.naturalHeight || img.height : 0;

      //TODO:Emit load event
      this._bounds = this.calcInitBounds();


      let { x, y, width, height } = this._bounds;
          //draw stroke;
      this.moveTo(new Point(x, y))
        .lineTo(new Point(x + width, y))
        .lineTo(new Point(x + width, y + height))
        .lineTo(new Point(x, y + height))
        .lineTo(new Point(x, y));

      this.drawImageAndStroke(ctx);
      img = img.onload = img.onerror = null;
    };

    img.onerror = function () {
      console.warn(`can't load image${img.src}`);
      //TODO:Emit error event
      img = img.onload = img.onerror = null;
    };

    this._image = img;
  }

  getImageData() {
    let { x, y, width, height } = this.bounds;
    return this._ctx.getImageData(x, y, width, height);
  }

  setImageData(data) {
    let { x, y } = this.bounds;
    this._ctx.putImageData(data, x, y);
  }

  toJSON() {
    return [this.src];
  }

  /**
   * 通过图像原始大小，算出宽高及起始位置，并返回bounds.(保持图片原始宽高比)
   */
  calcInitBounds() {

    const viewWidth = 1000;
    const viewHeight = 800;
    const viewRadio = viewWidth / viewHeight;
    const imgRadio = this.naturalWidth / this.naturalHeight;

    let x, y, width, height;

    if (this.naturalHeight < viewHeight && this.naturalWidth < viewWidth) {
      width = this.naturalWidth;
      height = this.naturalHeight;
      x = this.align === 'center' ? (viewWidth - width) / 2 : 0;
      y = this.align === 'center' ? (viewHeight - height) / 2 : 0;
    } else if(imgRadio > viewRadio) {
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

  containsPoint(point) {
    return this.bounds.containsPoint(point);
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
    let { x, y, width, height } = this.bounds;

    ctx.save();
    this.matrix.applyToContext(ctx);
    ctx.drawImage(this._image, x, y, width, height);
    ctx.restore();

    //TODO: transform bounds.

    if(this.selected) this.drawBoundRect(ctx);
  }

  draw(ctx) {
    this._ctx = ctx;

    if (this.loaded) {
      this.drawImageAndStroke(ctx);
    } else {
      this.loadImage(this._src, ctx);
    }
  }
}
