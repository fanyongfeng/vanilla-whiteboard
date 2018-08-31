import Tool from './Tool';
import cursor from './mixins/cursor';
import { deepMixin } from '../decorators/mixin';
import itemCreator from './mixins/itemCreator';

const markerCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/pen.3ec0e0e7.png';
const highlighterCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/mark_pen.901db183.png';

/**
 * Base class og marker tool & highlighter tool.
 */
class FreeDrawing extends Tool {
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
    this.globalCtx.emit('item:add', this.currentShape.toJSON());
    this.currentShape = null;
  }
}

/**
 * 白板笔工具
 */
@deepMixin(itemCreator())
@deepMixin(cursor(markerCursor, { x: 13, y: -15 }))
export class Marker extends FreeDrawing {}

/**
 * 荧光笔工具
 */
@deepMixin(itemCreator())
@deepMixin(cursor(highlighterCursor, { x: 12, y: -12 }))
export class Highlighter extends FreeDrawing {}
