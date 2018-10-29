import Tool from './Tool';
import dragBounds from './mixins/dragBounds';
import cursor from './mixins/cursor';
import { deepMixin } from '../decorators/mixin';
import Rectangle from '../graphic/shape/Rectangle';
import { CustomizeMouseEvent } from '../Whiteboard/EventType';

interface Pointer {
  dragRect: Rectangle
}

/**
 * Pointer of whiteboard.
 *
 * Inject following behaviors for tool 'Pointer'
 * 1) 当拖拽时生成“拖拽框”，默认时红色
 * 2) 在鼠标移动时生成一个“指挥棒”，并实时发送“指挥棒”位置数据
 * 3）需要能够在接收端看到“拖拽框”
 */
@deepMixin(
  dragBounds(
    {
      strokeStyle: '#f00',
      lineWidth: 2,
    },
    true
  )
)
@deepMixin(
  cursor('https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png', {
    x: 11,
    y: -12,
  })
)
class Pointer extends Tool {
  onMouseMove(event: CustomizeMouseEvent) {
    const { point } = event;
    this.globalCtx.emit('pointer:move', [point.x, point.y]);
  }
  onMouseUp() {
    this.globalCtx.emit('pointer:draw', this.dragRect.toJSON());
  }
}

export default Pointer;
