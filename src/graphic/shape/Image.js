import Element from "../Element"
export default class Image extends Element { 

  loaded = false;

  get src(){

  }

  set src(ref) {

  }

  loadImage(url, callback, context, crossOrigin){
    if (!url) {
      callback && callback.call(context, url);
      return;
    }

    var img = document.createElement('img');

    /** @ignore */
    var onLoadCallback = function () {
      callback && callback.call(context, img);
      img = img.onload = img.onerror = null;
    };

    img.onload = onLoadCallback;
    /** @ignore */
    img.onerror = function() {
      fabric.log('Error loading ' + img.src);
      callback && callback.call(context, null, true);
      img = img.onload = img.onerror = null;
    };

    if (url.indexOf('data') !== 0 && crossOrigin) {
      img.crossOrigin = crossOrigin;
    }

    img.src = url;
  }

  onLoaded(image){
    this.loaded = true;

    let width = image ? image.naturalWidth || image.width : 0;
    let height = image ? image.naturalHeight || image.height : 0;
  }

  renderStroke(){
    
    var x = -this.width / 2,
    y = -this.height / 2,
    w = this.width,
    h = this.height;

    ctx.save();
    this._setStrokeStyles(ctx, this);

    ctx.beginPath();
    fabric.util.drawDashedLine(ctx, x, y, x + w, y, this.strokeDashArray);
    fabric.util.drawDashedLine(ctx, x + w, y, x + w, y + h, this.strokeDashArray);
    fabric.util.drawDashedLine(ctx, x + w, y + h, x, y + h, this.strokeDashArray);
    fabric.util.drawDashedLine(ctx, x, y + h, x, y, this.strokeDashArray);
    ctx.closePath();
    ctx.restore();
  }

  drawImage(image, point) {
    this.ctx.drawImage(image, point.x, point.y);
  }

  draw(){
    this.drawImage();
    this.renderStroke();
  }
}