import Tool from './Tool';
import Shape from '../graphic/Shape'
import dragBounds from './mixins/dragBounds';
import { deepMixin } from '../decorators/mixin';
import itemCreator from './mixins/itemCreator';

import { CustomizeMouseEvent } from '../Whiteboard/EventType';

/**
 * 绘制两点图形工具
 */
@deepMixin(
  dragBounds({
    strokeStyle: 'rgb(255,163,0)',
    lineWidth: 1,
  })
)
@deepMixin(itemCreator())
class ShapeDrawing extends Tool {

  public currentShape!: Shape | null;

  onMouseDown(event: CustomizeMouseEvent) {
    if (!this.currentShape) return;
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
  }

  onMouseDrag(event: CustomizeMouseEvent) {
    if (!this.currentShape) return;
    this.currentShape.endPoint = event.point;
  }

  onMouseUp(_event: CustomizeMouseEvent) {
    if (!this.currentShape) return;
    this.globalCtx.emit('item:add', this.currentShape.toJSON());
    this.currentShape = null;  // think about that; beforeMouseDown will refresh this.currentShape
  }
}

export default ShapeDrawing;
