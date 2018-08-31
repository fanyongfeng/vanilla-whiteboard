import Item from '../Item';

/**
 * 简单网格
 * Component Grid.
 * options: {
 *  minor: false, // If minor grid is shown
 * }
 */
export default class Grid extends Item {
  draw(ctx) {
    let { width, height } = this.layer;
    ctx.save();
    //preset context2d styles
    ctx.lineWidth = 1;
    ctx.fontSize = 10;
    ctx.font = '9px serif';

    //draw vertical lines
    if (this.minor) this.drawMinorGrid(ctx, width, height);
    this.drawMajorGrid(ctx, width, height);
    ctx.restore();
  }

  drawMajorGrid(ctx, width, height) {
    ctx.strokeStyle = '#c0c0c0';
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

  drawMinorGrid(ctx, width, height) {
    ctx.strokeStyle = '#f0f0f0';
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
    ctx.stroke();
  }

  drawPixelText(ctx, text, x, y) {
    ctx.fillText(text, x, y);
  }
}
