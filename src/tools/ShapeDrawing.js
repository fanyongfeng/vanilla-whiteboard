import Rect from '../graphic/shape/Rect';
import Line from '../graphic/shape/Line';
import Arrow from '../graphic/shape/Arrow';
import Triangle from '../graphic/shape/Triangle';

export default class ShapeTool { 
  
  constructor(canvas){
    this.canvas = document.getElementById('canvas');
  }

  onMouseDown(event) { 
    this.currentShape = new Triangle();
    this.currentShape.startPoint = event.point;
  }

  onMouseMove(event) { 

    let ctx = this.canvas.getContext('2d');

    ctx.strokeStyle = '#c69';
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.currentShape.endPoint = event.point;

    this.currentShape.buildPath(ctx);
  }

  onMouseUp(event) { 

  }

  set styles(value){

  }

  get styles(){
    return;
  }
}