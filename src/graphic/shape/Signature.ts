import Path from '../Path';

export default class Signature extends Path {
  private _ctx: CanvasRenderingContext2D;
  public dotSize: number;

  _drawDot(point) {
    let { x, y } = point;
    const ctx = this._ctx;
    const size = this.dotSize;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }

  _draw(ctx) {
    //TODO: calc width of Dot.
  }
}
