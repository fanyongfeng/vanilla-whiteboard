import Rect from '../graphic/shape/Rect';
import Line from '../graphic/shape/Line';
import Arrow from '../graphic/shape/Arrow';
import Triangle from '../graphic/shape/Triangle';
import Ellipse from '../graphic/shape/Ellipse';

import items from '../store/items';

const ctorList = [Rect, Line, Arrow, Triangle, Ellipse];
export default class ShapeDrawing {

  _style = {};

  constructor(type){
    let pathCtor = ctorList.find(ctor => {
      return ctor.type === type
    });
    if(!pathCtor) throw new Error("Can't find specified shape");

    this.pathCtor = pathCtor;
  }

  onMouseDown(event) {
    let options = this.style;
    this.currentShape = new this.pathCtor(options);
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
    this._style  = value;
  }

  get styles(){
    return this._style;
  }
}
