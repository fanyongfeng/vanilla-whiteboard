import Element from "../Element"

export default class Triangle extends Element {

  anti = false;

  buildPath(ctx) {

    var widthBy2 = this.width / 2,
        heightBy2 = this.height / 2;

      ctx.beginPath();
      ctx.moveTo(-widthBy2, heightBy2);
      ctx.lineTo(0, -heightBy2);
      ctx.lineTo(widthBy2, heightBy2);
      ctx.closePath();

    
    return;
  }
}