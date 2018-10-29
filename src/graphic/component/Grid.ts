import Item from '../Item';
import { observeProps } from '../../decorators/memoized';
import Rect from '../types/Rect';

/**
 * 简单网格
 * Component Grid.
 */
@observeProps({
  /**
   * 是否有Sub grid
   */
  minor: { type: Boolean, default: true },
})
export default class Grid extends Item {

  public minor!: Boolean;
  protected _draw(ctx: CanvasRenderingContext2D) {
    let { width, height } = this.layer;
    ctx.save();
    //preset context2d styles
    ctx.lineWidth = 1;
    // ctx.fontSize = 10;
    ctx.font = '9px serif';

    //draw vertical lines
    if (this.minor) this.drawMinorGrid(ctx, width, height);
    this.drawMajorGrid(ctx, width, height);
    ctx.restore();
    return this;
  }

  private drawMajorGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
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

  private drawMinorGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
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

  private drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  private drawPixelText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
    ctx.fillText(text, x, y);
  }

  /**
   * just for ts lint, no sense
   */
  public _toJSON() {
    return [];
  }

  /**
   * just for ts lint, no sense
   */
  public get bounds(): Rect { return new Rect(0, 0, 0, 0) }
}
