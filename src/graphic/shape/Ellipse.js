import Shape from "../Shape"
import Point from "../../types/Point";

export default class Ellipse extends Shape {
  type = 'ellipse';

  buildPath() {

    /* "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf) */

    let kappa = 0.5522848;
    let x = this.bounds.center.x;
    let y = this.bounds.center.y;
    let a = this.bounds.width / 2;
    let b = this.bounds.height / 2;
    let ox = a * kappa; // 水平控制点偏移量
    let oy = b * kappa; // 垂直控制点偏移量
    // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
    
    this.path.moveTo(new Point(x - a, y))
      .bezierCurveTo(new Point(x - a, y - oy), new Point(x - ox, y - b), new Point(x, y - b))
      .bezierCurveTo(new Point(x + ox, y - b), new Point(x + a, y - oy), new Point(x + a, y))
      .bezierCurveTo(new Point(x + a, y + oy), new Point(x + ox, y + b), new Point(x, y + b))
      .bezierCurveTo(new Point(x - ox, y + b), new Point(x - a, y + oy), new Point(x - a, y));
    
    this.path.closePath();

    return;
  }
}