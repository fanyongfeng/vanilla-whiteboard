import Rect from '../graphic/shape/Rect';
import Line from '../graphic/shape/Line';
import Arrow from '../graphic/shape/Arrow';
import Triangle from '../graphic/shape/Triangle';
import Ellipse from '../graphic/shape/Ellipse';

import items from '../store/items';

export default class ShapeDrawing {

  constructor(name){
    this.shapeCtor = name;
  }

  onMouseDown(event) {
    let options = this.style;
    this.currentShape = new Rect(options);
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
    items.add(this.currentShape);
  }

  onMouseMove(event) {

    this.currentShape.endPoint = event.point;

    this.currentShape.clear();
    this.currentShape.buildPath();
  }

  onMouseUp(event) {
    this.currentShape = null;
  }

  set styles(value){

  }

  get styles(){
    return;
  }
}
