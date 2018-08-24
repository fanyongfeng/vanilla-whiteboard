import Item from '../Item';

const defaultOptions = {
  showX: true,
  showY: true,
  mode: "numeric",
  position: "center",
}

const gap = 50; //in pixels

/**
 * 简单坐标轴
 * simple axes
 */
export default class Axes extends Item {

  constructor(options = {}) {
    super(options);
    this.options = Object.assign({}, defaultOptions, options);
  }

  drawXAxis(ctx, width, height) {

    this.drawLine(ctx, 0, height/2, width, height/2);
    //TODO:render arrow;

    let mark = this.minX;
    let x = 10;

    while (x < width) {
      x += gap;
      mark++;
      this.drawMark(ctx, x, height / 2, mark);
    }

    ctx.stroke();
  }

  drawYAxis(ctx, width, height) {
    this.drawLine(ctx,  width /2 , height, width /2 , 0);
    let mark = this.minY;
    let y = height;

    while (y > 0) {
      y -= gap;
      mark++;
      this.drawMarkY(ctx, width /2, y, mark);
    }

    ctx.stroke();
  }

  drawMarkY(ctx, x, y, mark){
    ctx.moveTo(x, y);
    ctx.lineTo(x - 4, y);
    ctx.fillText(mark.toString(), x - 12, y - 6);
  }

  drawMark(ctx, x, y, mark){
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 4);
    ctx.fillText(mark.toString(), x - 3, y + 15);
  }

  drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }

  draw(ctx) {
    let {width, height} = this.layer;
    ctx.lineWidth = 1;
    ctx.fontSize = 10;
    ctx.font = "9px serif";
    ctx.strokeStyle = "#000";

    this.minX = -parseInt(width / gap / 2);
    this.minY = -parseInt(height / gap / 2);

    if (this.options.showX) {
      this.drawXAxis(ctx, width, height);
    }

    if (this.options.showY) {
      this.drawYAxis(ctx, width, height);
    }
  }
}
