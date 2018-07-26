import Element from "../Element"

export default class Arc extends Element {
  shape = {
      cx: 100,
      cy: 100,
      r: 30,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: true
  }

  buildPath(ctx, shape) {
    
    let x = shape.cx;
    let y = shape.cy;
    let r = Math.max(shape.r, 0);
    let startAngle = shape.startAngle;
    let endAngle = shape.endAngle;
    let clockwise = shape.clockwise;

    let unitX = Math.cos(startAngle);
    let unitY = Math.sin(startAngle);

    ctx.moveTo(unitX * r + x, unitY * r + y);
    ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
  }
}