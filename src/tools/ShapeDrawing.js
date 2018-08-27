import Tool from './Tool';
import {createItem}  from '../graphic/ItemFactory';
import { deepMixin } from '../decorators/mixin';
import itemCreator from './mixins/itemCreator';

@deepMixin(itemCreator())
export default class ShapeDrawing extends Tool{

  onMouseDown(event) {
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
  }

  onMouseDrag(event) {
    this.currentShape.endPoint = event.point;
  }

  onMouseUp(event) {
    //this.emit('add', [this.currentShape.toJSON()])
    this.currentShape = null;
  }
}
