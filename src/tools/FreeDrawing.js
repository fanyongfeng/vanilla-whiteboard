import Tool from './Tool';
import Image from '../graphic/shape/Image';
import { createItem } from '../graphic/ItemFactory';
import cursor from './mixins/cursor';
import { deepMixin } from '../decorators/mixin';
import itemCreator from './mixins/itemCreator';

const markerCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/pen.3ec0e0e7.png';
const highlighterCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png';

// values: Marker & Highlighter

@deepMixin(itemCreator())
@deepMixin(cursor(highlighterCursor))
export default class FreeDrawing extends Tool {
  _style = {};

  lastPoint = null;
  /**
    * Invoked on mouse down
    * @param {Object} pointer
    */
  onMouseDown(event) {
    this.currentShape.moveTo(event.point);
    this.lastPoint = event.point;
  }

  /**
   * Invoked on mouse move
   * @param {Object} pointer
   */
  onMouseDrag(event) {
    var point = event.point;
    var midPoint = point.midPointFrom(this.lastPoint);
    this.currentShape.quadraticCurveTo(this.lastPoint, midPoint);
    this.lastPoint = point;
  }

  /**
   * Invoked on mouse up
   */
  onMouseUp(event) {
    this.currentShape.simplify();
    this.currentShape = null;
  }
}
