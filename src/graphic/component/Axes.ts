import Item from '../Item';
import { observeProps } from '../../decorators/memoized';

const defaultOptions = {
  showX: true,
  showY: true,
  mode: 'numeric',
  position: 'center',
};

const gap = 50; //in pixels

/**
 * 简单坐标轴
 * simple axes
 */
@observeProps({
  /**
   * 是否有Sub grid
   */
  showX: { type: Boolean, default: true },
  showY: { type: Boolean, default: true },
})
export default class Axes extends Item {
  private minX: number = 0;
  private minY: number = 0;

  protected showX: boolean;
  protected showY: boolean;

  constructor(options = {}) {
    super(options);
  }

  drawXAxis(ctx, width, height) {
    this.drawLine(ctx, 0, height / 2, width, height / 2);

    let mark = this.minX;
    let x = 10;

    while (x < width) {
      x += gap;
      mark++;
      this.drawMark(ctx, x, height / 2, mark);
    }

    ctx.stroke();
  }

  drawYAxis(ctx, width, height) {
    this.drawLine(ctx, width / 2, height, width / 2, 0);
    let mark = this.minY;
    let y = height;

    while (y > 0) {
      y -= gap;
      mark++;
      this.drawMarkY(ctx, width / 2, y, mark);
    }

    ctx.stroke();
  }

  drawMarkY(ctx, x, y, mark) {
    ctx.moveTo(x, y);
    ctx.lineTo(x - 4, y);
    ctx.fillText(mark.toString(), x - 12, y - 6);
  }

  drawMark(ctx, x, y, mark) {
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 4);
    ctx.fillText(mark.toString(), x - 3, y + 15);
  }

  drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }

  protected _draw(ctx) {
    let { width, height } = this.layer;
    ctx.lineWidth = 1;
    ctx.fontSize = 10;
    ctx.font = '9px serif';
    ctx.strokeStyle = '#000';

    this.minX = -Math.floor(width / gap / 2);
    this.minY = -Math.floor(height / gap / 2);

    if (this.showX) {
      this.drawXAxis(ctx, width, height);
    }

    if (this.showY) {
      this.drawYAxis(ctx, width, height);
    }
  }
}
