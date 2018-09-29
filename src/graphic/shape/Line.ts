import Shape from '../Shape';
import Point from '../types/Point';

export default class Line extends Shape {

  public dash: boolean;
  constructor(options, sp?: Point, ep?: Point) {
    super(options, sp, ep);
    this.style.dashArray = this.dash || [];
  }

  _buildPath() {
    let { x, y } = this.startPoint;
    let { x: ex, y: ey } = this.endPoint;

    this.moveTo(x, y).lineTo(ex, ey);

    //NOTE: DO NOT 'closePath' on dash-line
    //  this.closePath()
  }
}
