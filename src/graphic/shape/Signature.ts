import Path from '../Path';
import point from '../types/Point';

export default class Signature extends Path {
  private _ctx!: CanvasRenderingContext2D;
  public dotSize!: number;

  protected _drawDot(point: point) {
    let { x, y } = point;
    const ctx = this._ctx;
    const size = this.dotSize;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }

  protected _draw(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    //TODO: calc width of Dot.
  }
}
