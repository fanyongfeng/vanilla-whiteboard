import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import cursor from './mixins/cursor';
import selectable from './mixins/selectable';
import { deepMixin } from '../decorators/mixin';
/**
 * Eraser， 橡皮擦工具
 *
 * 1) 当鼠标点击时，删除选中元素
 * 2) 当拖拽时生成“拖拽框”，并在鼠标释放时删除所有选中元素
 * 3）当在移动时显示光标为“橡皮擦”
 */
@deepMixin(selectable()) //decorator 作用与class越近越早生效
@deepMixin(dragBounds())
@deepMixin(
  cursor('https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png', {
    x: 8,
    y: -8, //magic number for appropriate offset of eraser image.
  })
)
export default class Eraser extends Tool {
  onMouseUp() {
    this.items.deleteSelected();
  }
}
