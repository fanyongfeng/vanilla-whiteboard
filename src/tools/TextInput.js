
import Tool from './Tool';
import { drawTextImg } from '../graphic/shape/Text';
import { createItem }  from '../graphic/ItemFactory';

/**
 * Tool to input text on whiteboard
 */

export default class Text extends Tool {

  constructor(type) {
    super(type);
    window.drawText = this.drawText.bind(this);
  }

  onMouseDown(event) {
    this.currentShape = createItem(this.type);
    this.currentShape.editable = true;
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
    items.add(this.currentShape);
    setTimeout(() => {
      // this.currentShape.editable = false;
      this.currentShape.input.focus();
    }, 50);
  }

  set style(value) {
    this._style = value;
  }

  get style() {
    return this._style;
  }

  drawText() {
    items.filter(item => item.type === this.type).map(item => {
      drawTextImg(item.input, this.layer.ctx);
    });
  }

}
