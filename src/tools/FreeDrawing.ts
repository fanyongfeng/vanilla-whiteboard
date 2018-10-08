import Tool from './Tool';
import cursor from './mixins/cursor';
import { deepMixin } from '../decorators/mixin';
import itemCreator from './mixins/itemCreator';

import Point from '../graphic/types/Point';
import Shape from '../graphic/Shape';
import { CustomizeMouseEvent } from '../Whiteboard/EventType';


const markerCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/pen.3ec0e0e7.png';
const highlighterCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/mark_pen.901db183.png';

/**
 * Base class og marker tool & highlighter tool.
 */
class FreeDrawing extends Tool {
  // _style = {};

  private lastPoint!: Point;
  public currentShape!: Shape | null
  /**
   * Invoked on mouse down
   * @param event
   */
  onMouseDown(event: CustomizeMouseEvent) {
    if (!this.currentShape) return;
    this.currentShape.moveTo(event.point);
    this.lastPoint = event.point;
  }

  /**
   * Invoked on mouse move
   * @param event
   */
  onMouseDrag(event: CustomizeMouseEvent) {
    if (!this.currentShape) return;
    const point = event.point;
    const midPoint = point.midPointFrom(this.lastPoint);
    this.currentShape.quadraticCurveTo(this.lastPoint, midPoint);
    this.lastPoint = point;
  }

  /**
   * Invoked on mouse up
   */
  onMouseUp(_event: CustomizeMouseEvent) {
    if (!this.currentShape) return;
    this.currentShape.simplify();
    this.globalCtx.emit('item:add', this.currentShape.toJSON());
    this.currentShape = null;
  }
}

/**
 * 白板笔工具
 *
 * Inject following behaviors for tool 'Marker'
 * 1) 当mousedown时新建Item
 * 2) 在鼠标移动时生成一个“白板笔”光标
 */
@deepMixin(itemCreator())
@deepMixin(cursor(markerCursor, { x: 13, y: -15 }))
class Marker extends FreeDrawing {}

/**
 * 荧光笔工具
 *
 * Inject following behaviors for tool 'Marker'
 * 1) 当mousedown时新建Item
 * 2) 在鼠标移动时生成一个“荧光笔”光标
 */
@deepMixin(itemCreator())
@deepMixin(cursor(highlighterCursor, { x: 12, y: -12 }))
class Highlighter extends FreeDrawing {}

export { Marker, Highlighter };
