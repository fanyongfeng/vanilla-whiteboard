import Shape from '../Shape';
import Point from '../types/Point';

export default class Line extends Shape {
  public dash: Array<number> = [];

  constructor(options, sp?: Point, ep?: Point) {
    super(options, sp, ep);
    this.style.dashArray = this.dash || [];
  }

  protected _buildPath() {
    const { x, y } = this.startPoint;
    const { x: ex, y: ey } = this.endPoint;

    this.moveTo(x, y).lineTo(ex, ey);

    //NOTE: DO NOT 'closePath' on dash-line
    //  this.closePath()
  }
}
