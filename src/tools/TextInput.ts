import Tool from './Tool';
import Style from '../graphic/types/Style';
import ShapeText from '../graphic/shape/Text';
import { createItem } from '../graphic/ItemFactory';

/**
 * Tool to input text on whiteboard
 */
export default class Text extends Tool {

  public currentShape!: ShapeText;
  constructor(type) {
    super(type);
    window.drawText = this.drawText.bind(this); // for test
  }

  onMouseDown(event) {
    this.currentShape = createItem(this.type, {});
    this.currentShape.editable = true;
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
    this.items.add(this.currentShape);
    this.globalCtx.emit('item:add', this.currentShape.toJSON());
    this.currentShape.onTyping = value => this.globalCtx.emit('item:typing', value);
  }

  drawText() {
    this.items.filter(item => item.type === this.type).map(item => item.drawTextImg())
  }

  /**
   * set all Text disabled
   * toolChanged
   */
  public toolChanged({ type }) {
    this.items.filter(item => item.type === this.type).map(item => {
      item.editable = type === this.type;
    });
  }
}
