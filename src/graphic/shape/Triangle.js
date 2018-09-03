import Shape from '../Shape';
import { observeProps } from '../../decorators/memoized';

/**
 * 支持等腰，直角三角形
 */
@observeProps({
  /**
   * 当直角三角形时，确定直角的方向
   */
  anti: { type: Boolean, default: true },
  /**
   * 是否是直角三角形
   */
  right: { type: Boolean, default: false },
})
class Triangle extends Shape {
  _buildPath() {
    let t1x, t1y, t2x, t2y;
    let { x: sx, y: sy } = this.startPoint;
    let { x: ex, y: ey } = this.endPoint;

    if (this.right) {
      if (this.anti) {
        t1x = ex;
        t1y = sy;
        t2x = sx;
        t2y = ey;
      } else {
        t1x = t2x = sx;
        t1y = sy;
        t2y = ey;
      }
    } else {
      t1x = sx;
      t1y = ey;
      t2x = (sx + ex) / 2;
      t2y = sy;
    }

    this.moveTo(t1x, t1y)
      .lineTo(t2x, t2y)
      .lineTo(ex, ey)
      .lineTo(t1x, t1y)
      .closePath();
  }
}

export default Triangle;
