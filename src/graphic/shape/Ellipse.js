import Shape from "../Shape"

export default class Ellipse extends Shape {
  type = 'ellipse';

  buildPath(ctx, shape) {

    /* "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf) */

    let k = 0.5522848;
    let x = this.bounds.center.x;
    let y = this.bounds.center.y;
    let a = this.bounds.width / 2;
    let b = this.bounds.height / 2;
    let ox = a * k; // 水平控制点偏移量
    let oy = b * k; // 垂直控制点偏移量
    // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
    
    ctx.beginPath();
    ctx.moveTo(x - a, y);
    ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
    ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
    ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
    ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
    ctx.stroke();
    ctx.closePath();

    return;
  }
}