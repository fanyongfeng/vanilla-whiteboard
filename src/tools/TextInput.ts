import Tool from './Tool';
import Style from '../graphic/types/Style';
import ShapeText, { drawTextImg } from '../graphic/shape/Text';
import { createItem } from '../graphic/ItemFactory';

/**
 * Tool to input text on whiteboard
 */

export default class Text extends Tool {
  
  private _style!: Style;
  public currentShape!: ShapeText;
  constructor(type) {
    super(type);
    window.drawText = this.drawText.bind(this); // for test
  }

  onMouseDown(event) {
    this.currentShape = createItem(this.type);
    this.currentShape.editable = true;
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
    window.items.add(this.currentShape);
    // this.currentShape.editable = false;
  }

  set style(value: Style) {
    this._style = value;
  }

  get style() {
    return this._style;
  }

  drawText() {
    window.items.filter(item => item.type === this.type).map(item => {
      drawTextImg(item.input, this.layer.ctx);
    });
  }

  /**
   * set all Text disabled
   * toolChanged
   */
  public toolChanged() {
    window.items.filter(item => item.type === this.type).map(item => {
      item.editable = false;
    });
  }
}
