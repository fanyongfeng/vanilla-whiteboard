

/**
 * Component Grid.
 */
export default class Grid {
  minor = false;

  constructor(minor) {
    this.minor = minor;
  }

  draw(ctx, width, height) {
    this._ctx = ctx
    ctx.save();
    //preset context2d styles
    ctx.lineWidth = 0.5;
    ctx.fontSize = 10;
    ctx.font = "9px serif";

    //draw vertical lines
    if (this.minor) this.drawManorGrid(ctx, width, height);
    this.drawMajorGrid(ctx, width, height);
    ctx.restore();
  }

  drawMajorGrid(ctx, width, height) {
    ctx.strokeStyle = "#c0c0c0";
    let x = 0;
    while (x < width) {
      x += 50;
      this.drawLine(ctx, x, 0, x, height);
      this.drawPixelText(ctx, x.toString(), x, 9);
    }
    //draw horizontal lines
    let y = 0;
    while (y < height) {
      y += 50;
      this.drawLine(ctx, 0, y, width, y);
      this.drawPixelText(ctx, y.toString(), 0, y);
    }
  }

  drawManorGrid(ctx, width, height) {
    ctx.strokeStyle = "#f0f0f0";
    let x = 0;
    while (x < width) {
      x += 10;
      this.drawLine(ctx, x, 0, x, height);
    }
    //draw horizontal lines
    let y = 0;
    while (y < height) {
      y += 10;
      this.drawLine(ctx, 0, y, width, y);
    }
  }


  drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
  }

  drawPixelText(ctx, text, x, y) {
    ctx.fillText(text, x, y);
  }
}
