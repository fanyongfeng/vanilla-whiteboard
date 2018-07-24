import Point from '../types/Point'

// values: Marker & Highlighter
export default class FreeDrawing {

  constructor(canvas){
    this.canvas = document.getElementById('canvas');
  }

  lastPoint = null;

  /**
    * Invoked on mouse down
    * @param {Object} pointer
    */
  onMouseDown(event) {
    var ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = '#c69'
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    this.lastPoint = new Point(event.offsetX, event.offsetY);
  }

  /**
   * Inovoked on mouse move
   * @param {Object} pointer
   */
  onMouseMove(event) {
    let ctx = this.canvas.getContext('2d');

    var point = new Point(event.offsetX, event.offsetY);
    var midPoint = point.midPointFrom(this.lastPoint);

    if(this.oldEnd) {
      ctx.beginPath();
      ctx.moveTo(this.oldEnd.x, this.oldEnd.y);
    }

    // ctx.lineTo(midPoint.x, midPoint.y);
    ctx.quadraticCurveTo(this.lastPoint.x, this.lastPoint.y, midPoint.x, midPoint.y);
    this.oldEnd = midPoint;
    
    ctx.stroke();

    this.lastPoint = new Point(event.offsetX, event.offsetY);
  }
  /**
   * Invoked on mouse up
   */
  onMouseUp() {
    this.oldEnd = null;
    var ctx = this.canvas.getContext('2d');
    ctx.closePath();
  }

  _drawSegment(ctx, p1, p2) {
    var midPoint = p1.midPointFrom(p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    return midPoint;
  }
}