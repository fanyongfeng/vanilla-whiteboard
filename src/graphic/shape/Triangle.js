import Element from "../Element"

export default class Triangle extends Element {

  anti = false;

  buildPath(ctx) {

    let frm = this.startPoint,
      x = frm.x,
      y = frm.y,
      width,
      height;

    let to = this.endPoint;
    width = to.x - x;
    height = to.y - y;
    // Check if horizontal or vertical order needs to be reversed.
    if (width < 0) {
      x = to.x;
      width = -width;
    }
    if (height < 0) {
      y = to.y;
      height = -height;
    }

    var widthBy2 = width / 2,
      heightBy2 = height / 2;

    ctx.beginPath();
    
    ctx.moveTo(-widthBy2, heightBy2);
    ctx.lineTo(0, -heightBy2);
    ctx.lineTo(widthBy2, heightBy2);

    ctx.stroke();

    ctx.closePath();


    return;
  }
}