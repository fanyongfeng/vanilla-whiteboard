import Tool from './Tool';
import ShapeText from '../graphic/shape/Text';
import { deepMixin } from '../decorators/mixin';
import itemCreator from './mixins/itemCreator';

/**
 * Tool to input text on whiteboard
 */
@deepMixin(itemCreator())
export default class Text extends Tool {

  public currentShape!: ShapeText;
  constructor(type) {
    super(type);
    window.drawText = this.drawText.bind(this); // for test
  }

  onMouseDown(event) {
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
