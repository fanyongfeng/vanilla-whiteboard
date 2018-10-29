import Item from '../Item';
import { observeProps } from '../../decorators/memoized';
import Rect from '../types/Rect';

// const defaultOptions = {
//   showX: true,
//   showY: true,
//   mode: 'numeric',
//   position: 'center',
// };

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
  private minX = 0;
  private minY = 0;

  protected showX!: boolean;
  protected showY!: boolean;

  constructor(options = {}) {
    super(options);
  }

  /**
   * draw X axis
   * @param ctx
   * @param width
   * @param height
   */
  drawXAxis(ctx: CanvasRenderingContext2D, width: number, height: number) {
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

  drawYAxis(ctx: CanvasRenderingContext2D, width: number, height: number) {
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

  drawMarkY(ctx: CanvasRenderingContext2D, x: number, y: number, mark: number) {
    ctx.moveTo(x, y);
    ctx.lineTo(x - 4, y);
    ctx.fillText(mark.toString(), x - 12, y - 6);
  }

  drawMark(ctx: CanvasRenderingContext2D, x: number, y: number, mark: number) {
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 4);
    ctx.fillText(mark.toString(), x - 3, y + 15);
  }

  drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }

  protected _draw(ctx: CanvasRenderingContext2D): Item {
    let { width, height } = this.layer;
    ctx.lineWidth = 1;
    // ctx.fontSize = 10;
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
    return this;
  }

  /**
   * just for ts lint, no sense
   */
  protected _toJSON() {
    return [];
  }

  /**
   * just for ts lint, no sense
   */
  get bounds(): Rect { return new Rect(0, 0, 0, 0) }
}
