import Path from "../Path"
import Rect from '../types/Rect';
import Point from '../types/Point';

export default class Image extends Path {
  _src = null;
  loaded = false;
  strokeDashArray = [0, 1];
  x = 10;
  y = 10;

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
    return new Rect(this.x, this.y, this.width, this.height);
  }

  loadImage(url, callback, context) {
    if (!url) {
      callback && callback.call(context, url);
      return;
    }

    let img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;

    img.onload = () => {
      this.loaded = true;
      this.width = img ? img.naturalWidth || img.width : 0;
      this.height = img ? img.naturalHeight || img.height : 0;

      callback && callback.call(context, img);
      img = img.onload = img.onerror = null;
    };

    img.onerror = function () {
      callback && callback.call(context, null, true);
      img = img.onload = img.onerror = null;
    };

    this._image = img;
  }

  drawDashedLine() {

  }

  getImageData() {
    return this._ctx.getImageData(this.x, this.y,this.width, this.height);
  }

  setImageData(data) {
    this._ctx.putImageData(data, this.x, this.y);
  }

  toJSON(){
    return [this.src];
  }

  renderStroke(ctx) {

    let x = -this.width / 2,
      y = -this.height / 2,
      w = this.width,
      h = this.height;

    ctx.save();
    // this._setStrokeStyles(ctx, this);

    ctx.beginPath();
    this.drawDashedLine(ctx, x, y, x + w, y, this.strokeDashArray);
    this.drawDashedLine(ctx, x + w, y, x + w, y + h, this.strokeDashArray);
    this.drawDashedLine(ctx, x + w, y + h, x, y + h, this.strokeDashArray);
    this.drawDashedLine(ctx, x, y + h, x, y, this.strokeDashArray);
    ctx.closePath();
    ctx.restore();
  }

  drawImage(ctx) {
    ctx.drawImage(this._image, this.x, this.y);
  }

  draw(ctx) {
    this._ctx = ctx;

    if (this.loaded) {
      this.drawImage(ctx);
      this.renderStroke(ctx);
    } else {
      this.loadImage(this._src, () => {
        this.drawImage(ctx);
        this.renderStroke(ctx);
      });

    }
  }
}
