import Element from "../Element"

export default class Rect extends Element {

  radius = 0;

  buildPath(ctx) {
    var x = this.x;
    var y = this.y;
    var width = this.width;
    var height = this.height;
    let radius = this.radius;

    let shortLine = Math.min(width, height);
    if(radius > shortLine / 2) radius = shortLine / 2;
    let isRounded = radius !== 0;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    isRounded && ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0);
    ctx.lineTo(x + width, y + height - radius);
    isRounded && ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2);
    ctx.lineTo(x + radius, y + height);
    isRounded && ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + radius);
    isRounded && ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.closePath();
    
    return;
  }
}