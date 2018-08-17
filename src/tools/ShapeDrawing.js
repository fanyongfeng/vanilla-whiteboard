import Tool from './Tool';
import {createItem}  from '../graphic/ItemFactory';

export default class ShapeDrawing extends Tool{

  _style = {};

  constructor(type) {
    super();
    this.type = type;
  }

  onMouseDown(event) {
    this.currentShape = createItem(this.type, this.style);
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
    items.add(this.currentShape);
  }

  onMouseDrag(event) {
    this.currentShape.endPoint = event.point;
    this.currentShape.buildPath();
  }

  onMouseMove(event){

  }

  onMouseUp(event) {
    this.currentShape = null;
  }

  set styles(value) {
    this._style = value;
  }

  get styles() {
    return this._style;
  }
}
