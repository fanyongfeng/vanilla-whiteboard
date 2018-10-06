import Item, { ItemOptions } from '../Item';
import Rect from '../types/Rect';
import { observeProps } from '../../decorators/memoized';

const viewWidth = 1000;
const viewHeight = 800;
/**
 * The Raster item represents an image.
 * Image transform 靠 ? , 而非指定的初始x, y;
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
  align: { type: String, default: 'start' },
  /**
   * If has box-shadow, like css box-shadow.
   */
  shadow: { type: Boolean, default: true },
})
class Img extends Item {
  static instantiate(options: Partial<ItemOptions>, src: string) {
    return new Img(options, src);
  }

  private initBounds!: Rect;
  private _src: string;
  public loaded = false;
  readonly strokeDashArray: number[] = [0, 1];
  private image!: HTMLImageElement;
  private naturalWidth = 0;
  private naturalHeight = 0;

  public align!: 'center' | 'start';
  public shadow!: boolean;
  public alpha!: number;
  public ctx!: CanvasRenderingContext2D;

  constructor(options: Partial<ItemOptions>, src: string) {
    super(options);
    this._src = src;
    this.loadImage();
  }

  set src(_src) {
    this.loaded = false;
    this._src = _src;
  }

  get src() {
    return this._src;
  }

  get bounds() {
    let bound = this.initBounds.clone();
    this.matrix.applyToRect(bound);
    bound.owner = this;
    return bound;
  }

  /**
   * Load image & trigger callback;
   * @param fn callback
   */
  public loadImage(fn?: () => void) {
    if (!this.src && this.image && this.loaded) return;

    const img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = this.src;

    img.onload = () => {
      this.loaded = !!(img && img.src && img.complete);
      this.naturalWidth = img ? img.naturalWidth || img.width : 0;
      this.naturalHeight = img ? img.naturalHeight || img.height : 0;

      //TODO:Emit load event
      this.initBounds = this.calcInitBounds();

      fn && fn.call(this, img);
      img.onload = img.onerror = () => {};
    };

    img.onerror = () => {
      console.warn(`can't load image '${this.src}'`);
      //TODO:Emit error event
      img.onload = img.onerror = () => {};
    };

    this.image = img;
  }

  /**
   * 通过图像原始大小，算出宽高及起始位置，并返回bounds.(保持图片原始宽高比)
   */
  calcInitBounds() {
    const viewRadio =  viewWidth / viewHeight;
    const imgRadio = this.naturalWidth / this.naturalHeight;

    let x, y, width, height;

    if (this.naturalHeight < viewHeight && this.naturalWidth <  viewWidth) {
      width = this.naturalWidth;
      height = this.naturalHeight;
      x = this.align === 'center' ? ( viewWidth - width) / 2 : 0;
      y = this.align === 'center' ? (viewHeight - height) / 2 : 0;
    } else if (imgRadio > viewRadio) {
      width =  viewWidth;
      height =  viewWidth / imgRadio;
      x = 0;
      y = this.align === 'center' ? (viewHeight - height) / 2 : 0;
    } else {
      height = viewHeight;
      width = height * imgRadio;
      y = 0;
      x = this.align === 'center' ? ( viewWidth - width) / 2 : 0;
    }

    return new Rect(x, y, width, height, this);
  }

  /**
   * Get Image Data of specified area from canvas.
   * @return {TypedArray} data
   */
  get imageData(): ImageData {
    let { x, y, width, height } = this.bounds;
    if (this.ctx) {
      return this.ctx.getImageData(x, y, width, height);
    } else {
      return new ImageData(0, 0);
    }
  }

  /**
   * Set TypedArray Data to canvas.
   * @param {TypedArray} data
   */
  set imageData(data: ImageData) {
    let { x, y } = this.bounds;
    this.ctx && this.ctx.putImageData(data, x, y);
  }

  /**
   * 参考
   * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
   *
   * void ctx.drawImage(image, dx, dy); // 画布起始位置
   * void ctx.drawImage(image, dx, dy, dWidth, dHeight);// 画布起始位置，和绘制大小（用于缩放）
   * void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); // 原始图片其实位置及大小
   *
   * @param ctx
   */
  public drawImageAndStroke(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.initBounds;

    if (this.shadow) {
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 8;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.image, x, y, width, height);
  }

  protected _draw(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    if (this.loaded) {
      this.drawImageAndStroke(ctx);
    } else {
      this.loadImage(() => this.drawImageAndStroke(ctx));
    }
  }

  protected _toJSON() {
    return [this._src];
  }
}

export default Img;
