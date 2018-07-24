import Rect from '../graphic/shape/Rect';
import Line from '../graphic/shape/Line';
import Arrow from '../graphic/shape/Arrow';
import Triangle from '../graphic/shape/Triangle';
import Ellipse from '../graphic/shape/Ellipse';

import items from '../store/items';

export default class ShapeTool { 
  
  constructor(canvas){
    this.canvas = document.getElementById('canvas');
  }

  onMouseDown(event) { 
    this.currentShape = new Ellipse();
    this.currentShape.startPoint = event.point;
  }

  onMouseMove(event) { 

    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    items.items.forEach(item=>item.render(ctx));
    
    this.currentShape.endPoint = event.point;
    this.currentShape.buildPath(ctx);
  }

  onMouseUp(event) { 
    if(this.currentShape.endPoint) {
      items.add(this.currentShape);
    }
    this.currentShape = null;
  }

  set styles(value){

  }

  get styles(){
    return;
  }
}