import Element from "../Element"

export default class Triangle extends Element {

  anti = false;

  buildPath(ctx) {

    ctx.beginPath();

    ctx.closePath();
    
    return;
  }
}