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
    this.items.add(this.currentShape);
  }

  onMouseDrag(event) {
    this.currentShape.endPoint = event.point;
  }

  onMouseMove(event){

  }

  onMouseUp(event) {
    //this.emit('add', [this.currentShape.toJSON()])
    this.currentShape = null;
  }

  set style(value) {
    this._style = value;
  }

  get style() {
    return this._style;
  }
}
