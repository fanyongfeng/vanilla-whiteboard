
export default class Triangle {

  constructor(rect){
    this.bounds = rect;
  }

  renderControllers(point){

  }

  render(ctx) {
    ctx.strokeColor = '#009dec';
    
    ctx.beginPath();

    ctx.lineTo(this.startPoint.x, this.endPoint.y);
    ctx.lineTo((this.startPoint.x + this.endPoint.x) / 2, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);

    ctx.stroke();
    ctx.closePath();

    return;
  }
}