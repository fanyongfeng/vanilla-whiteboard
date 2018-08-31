import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import { deepMixin } from '../decorators/mixin';
import itemCreator from './mixins/itemCreator';

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
export default class ShapeDrawing extends Tool {
  onMouseDown(event) {
    this.currentShape.startPoint = this.currentShape.endPoint = event.point;
  }

  onMouseDrag(event) {
    this.currentShape.endPoint = event.point;
  }

  onMouseUp(event) {
    this.globalCtx.emit('item:add', this.currentShape.toJSON());
    this.currentShape = null;
  }
}
